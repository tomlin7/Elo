import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { useProfileStore } from "../src/store/profileStore.ts";
import { getBackendUrls } from "../src/utils/auth.ts";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Line, Path } from "react-native-svg";
import * as Haptics from "expo-haptics";

interface TelemetryStats {
  operationType: string;
  totalPresented: number;
  totalCorrect: number;
  averageSolveTimeMs: number;
}

interface MatchSummary {
  matchId: string;
  opponentUsername: string;
  isVictory: boolean;
  eloDelta: number;
  matchTimestamp: number;
  stats: TelemetryStats[];
}

export default function AnalyticsDashboardScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const { profile } = useProfileStore();

  const [history, setHistory] = useState<MatchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchSummary | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    if (!profile) return;
    try {
      const urls = getBackendUrls();
      const res = await fetch(`${urls.http}/api/profile/history?playerId=${profile.id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHistory(data.history || []);
      if (data.history && data.history.length > 0) {
        setSelectedMatch(data.history[0]);
      }
    } catch (err) {
      console.error("Failed to load match history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMatch = (match: MatchSummary) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMatch(match);
  };

  const renderSVGChart = (stats: TelemetryStats[]) => {
    // Generate SVG path coordinate strings using average solve times
    // Fallback coordinates if no stats are tracked yet
    const dataPoints = stats.length > 0
      ? stats.map(s => Math.min(2200, Math.max(200, s.averageSolveTimeMs)))
      : [800, 1200, 600, 1500, 700, 1100];

    const chartHeight = 120;
    const chartWidth = 280;
    
    // Normalize coordinates: map 200ms -> height 10, 2200ms -> height 110
    const points = dataPoints.map((val, idx) => {
      const x = (idx / (dataPoints.length - 1)) * chartWidth;
      const y = chartHeight - ((val - 200) / 2000) * (chartHeight - 20) - 10;
      return { x, y, val };
    });

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }

    return (
      <View style={styles.chartWrapper}>
        <Text style={[styles.chartTitle, { color: colors.textMuted }]}>RESPONSE TIME CURVE (ms)</Text>
        <Svg height={chartHeight} width={chartWidth} style={styles.svg}>
          {/* Horizontal Grid lines */}
          <Line x1="0" y1="20" x2={chartWidth} y2="20" stroke={colors.cardBorder} strokeWidth="1" strokeDasharray="4 4" />
          <Line x1="0" y1="60" x2={chartWidth} y2="60" stroke={colors.cardBorder} strokeWidth="1" strokeDasharray="4 4" />
          <Line x1="0" y1="100" x2={chartWidth} y2="100" stroke={colors.cardBorder} strokeWidth="1" strokeDasharray="4 4" />

          {/* Trend Line */}
          <Path d={pathD} fill="none" stroke={colors.primary} strokeWidth="3" />

          {/* Data Nodes */}
          {points.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r="4" fill={colors.accent} />
          ))}
        </Svg>
        <View style={styles.chartXLabels}>
          <Text style={[styles.xLabelText, { color: colors.textMuted }]}>Start</Text>
          <Text style={[styles.xLabelText, { color: colors.textMuted }]}>Mid</Text>
          <Text style={[styles.xLabelText, { color: colors.textMuted }]}>Finish</Text>
        </View>
      </View>
    );
  };

  const renderStatsMatrix = (stats: TelemetryStats[]) => {
    const finalStats = stats.length > 0 ? stats : [
      { operationType: "ADD_SUB", totalPresented: 12, totalCorrect: 11, averageSolveTimeMs: 650 },
      { operationType: "MULTIPLICATION", totalPresented: 8, totalCorrect: 7, averageSolveTimeMs: 1400 },
      { operationType: "DIVISION", totalPresented: 4, totalCorrect: 3, averageSolveTimeMs: 1850 }
    ];

    return (
      <View style={styles.matrixContainer}>
        <Text style={[styles.chartTitle, { color: colors.textMuted, marginBottom: 12 }]}>MATHEMATICAL OPERATION MATRIX</Text>
        
        {/* Table Headers */}
        <View style={[styles.matrixRow, styles.matrixHeader, { borderBottomColor: colors.cardBorder }]}>
          <Text style={[styles.cell, styles.cellLabel, { color: colors.text }]}>OP TYPE</Text>
          <Text style={[styles.cell, { color: colors.text, textAlign: "center" }]}>ACCURACY</Text>
          <Text style={[styles.cell, { color: colors.text, textAlign: "right" }]}>SOLVE TIME</Text>
        </View>

        {/* Rows */}
        {finalStats.map((item, idx) => {
          const accuracy = item.totalPresented > 0
            ? Math.round((item.totalCorrect / item.totalPresented) * 100)
            : 0;

          return (
            <View key={idx} style={[styles.matrixRow, { borderBottomColor: colors.cardBorder }]}>
              <Text style={[styles.cell, styles.cellLabel, { color: colors.text, fontWeight: "700" }]}>
                {item.operationType.replace("_", " ")}
              </Text>
              <Text style={[styles.cell, { color: colors.accent, textAlign: "center", fontWeight: "800" }]}>
                {accuracy}%
              </Text>
              <Text style={[styles.cell, { color: colors.text, textAlign: "right" }]}>
                {item.averageSolveTimeMs}ms
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.textMuted, marginTop: 12 }}>Crunching match feed analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>PERFORMANCE DASHBOARD</Text>
          <TouchableOpacity
            style={[styles.backBtn, { borderColor: colors.cardBorder }]}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={[styles.backBtnText, { color: colors.text }]}>BACK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Diagnostic charts for selected match */}
          {selectedMatch ? (
            <View style={[styles.analyticsCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.detailTitle, { color: colors.text }]}>
                VS {selectedMatch.opponentUsername}
              </Text>
              <Text style={[styles.detailStatus, { color: selectedMatch.isVictory ? colors.accent : colors.danger }]}>
                {selectedMatch.isVictory ? "VICTORY" : "DEFEAT"} ({selectedMatch.eloDelta >= 0 ? `+${selectedMatch.eloDelta}` : selectedMatch.eloDelta} Elo)
              </Text>

              {renderSVGChart(selectedMatch.stats)}
              {renderStatsMatrix(selectedMatch.stats)}
            </View>
          ) : (
            <View style={[styles.analyticsCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, padding: 30, alignItems: "center" }]}>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>No duel histories logged yet.</Text>
            </View>
          )}

          {/* Historical match list feed */}
          <Text style={[styles.feedTitle, { color: colors.text }]}>LAST 50 MATCHES</Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.matchId}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const isSelected = selectedMatch?.matchId === item.matchId;
              const dateStr = new Date(Number(item.matchTimestamp)).toLocaleDateString();

              return (
                <TouchableOpacity
                  style={[
                    styles.historyItem,
                    { backgroundColor: colors.cardBg, borderColor: isSelected ? colors.primary : colors.cardBorder }
                  ]}
                  onPress={() => handleSelectMatch(item)}
                >
                  <View>
                    <Text style={[styles.opponentName, { color: colors.text }]}>{item.opponentUsername}</Text>
                    <Text style={{ color: colors.textMuted, fontSize: 11 }}>{dateStr}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={[styles.statusText, { color: item.isVictory ? colors.accent : colors.danger }]}>
                      {item.isVictory ? "WIN" : "LOSS"}
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 12, fontWeight: "700" }}>
                      {item.eloDelta >= 0 ? `+${item.eloDelta}` : item.eloDelta} Elo
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  backBtnText: {
    fontSize: 12,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  analyticsCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "900",
  },
  detailStatus: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 24,
  },
  chartWrapper: {
    alignItems: "center",
    marginBottom: 28,
  },
  chartTitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    alignSelf: "flex-start",
  },
  svg: {
    marginTop: 12,
  },
  chartXLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
    marginTop: 6,
  },
  xLabelText: {
    fontSize: 10,
    fontWeight: "600",
  },
  matrixContainer: {
    width: "100%",
  },
  matrixRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  matrixHeader: {
    borderBottomWidth: 2,
    paddingBottom: 6,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
  },
  cellLabel: {
    flex: 1.5,
  },
  feedTitle: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  opponentName: {
    fontSize: 14,
    fontWeight: "700",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "900",
  },
});
