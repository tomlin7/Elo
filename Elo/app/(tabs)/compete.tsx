import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { getBackendUrls } from "../../src/utils/auth.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { useThemeStore } from "../../src/store/themeStore.ts";
import { Spacing, Typography } from "@/constants/design";

interface LeaderboardPlayer {
  id: string;
  username: string;
  elo: number;
}

export default function LeaderboardScreen() {
  const { colors } = useThemeStore();
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setError(false);
    try {
      const urls = getBackendUrls();
      const res = await fetch(`${urls.http}/api/leaderboard`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPlayers(data);
    } catch (e) {
      console.error("Failed to fetch leaderboard:", e);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    fetchLeaderboard();
  };

  const rankColors = [colors.accent, colors.textMuted, "#B45309"];

  const renderItem = ({ item, index }: { item: LeaderboardPlayer; index: number }) => {
    const rank = index + 1;
    const isTopThree = rank <= 3;

    return (
      <View style={[styles.rankItem, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.rankLeft}>
          <View
            style={[
              styles.rankBadge,
              { backgroundColor: colors.cardBorder },
              isTopThree && { backgroundColor: rankColors[rank - 1] }
            ]}
          >
            <Text style={[styles.rankText, { color: colors.textMuted }, isTopThree && { color: colors.onPrimary }]}>
              {rank}
            </Text>
          </View>
          <Text style={[styles.usernameText, { color: colors.text }]}>{item.username}</Text>
        </View>

        <View style={styles.rankRight}>
          <Text style={[styles.eloText, { color: colors.success }]}>{item.elo}</Text>
          <Text style={[styles.eloLabel, { color: colors.textMuted }]}>ELO</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>GLOBAL RANKINGS</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>TOP 50 DUELISTS</Text>
        </View>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.errorText, { color: colors.danger }]}>Failed to load rankings.</Text>
            <Text style={[styles.errorSubtext, { color: colors.textMuted }]}>Pull down to refresh</Text>
          </View>
        ) : players.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>No rankings recorded yet.</Text>
            <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>Be the first to duel!</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlashList
              data={players}
              renderItem={renderItem}
              estimatedItemSize={72}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              contentContainerStyle={{ paddingBottom: Spacing.xl }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg },
  header: { marginBottom: Spacing.xl, marginTop: Spacing.md },
  headerTitle: { ...Typography.title, fontSize: 24 },
  headerSubtitle: { ...Typography.label, marginTop: 2, textTransform: "uppercase" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { flex: 1, width: "100%" },
  rankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  rankLeft: { flexDirection: "row", alignItems: "center" },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rankText: { fontSize: 14, fontWeight: "800" },
  usernameText: { fontSize: 16, fontWeight: "700" },
  rankRight: { alignItems: "flex-end" },
  eloText: { fontSize: 18, fontWeight: "900" },
  eloLabel: { fontSize: 9, fontWeight: "700", letterSpacing: 1, marginTop: 2 },
  errorText: { fontSize: 16, fontWeight: "700" },
  errorSubtext: { fontSize: 13, marginTop: 4 },
  emptyText: { fontSize: 16, fontWeight: "700" },
  emptySubtext: { fontSize: 13, marginTop: 4 },
});
