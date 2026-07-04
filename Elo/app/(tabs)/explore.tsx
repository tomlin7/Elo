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

interface LeaderboardPlayer {
  id: string;
  username: string;
  elo: number;
}

export default function LeaderboardScreen() {
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

  const renderItem = ({ item, index }: { item: LeaderboardPlayer; index: number }) => {
    const rank = index + 1;
    const isTopThree = rank <= 3;
    const rankColors = ["#F59E0B", "#94A3B8", "#B45309"]; // Gold, Silver, Bronze

    return (
      <View style={styles.rankItem}>
        <View style={styles.rankLeft}>
          <View
            style={[
              styles.rankBadge,
              isTopThree && { backgroundColor: rankColors[rank - 1] }
            ]}
          >
            <Text style={[styles.rankText, isTopThree && styles.topRankText]}>
              {rank}
            </Text>
          </View>
          <Text style={styles.usernameText}>{item.username}</Text>
        </View>

        <View style={styles.rankRight}>
          <Text style={styles.eloText}>{item.elo}</Text>
          <Text style={styles.eloLabel}>ELO</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GLOBAL RANKINGS</Text>
          <Text style={styles.headerSubtitle}>TOP 50 DUELISTS</Text>
        </View>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#6366F1" />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Failed to load rankings.</Text>
            <Text style={styles.errorSubtext}>Pull down to refresh</Text>
          </View>
        ) : players.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No rankings recorded yet.</Text>
            <Text style={styles.emptySubtext}>Be the first to duel!</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlashList
              data={players}
              renderItem={renderItem}
              estimatedItemSize={72}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              contentContainerStyle={{ paddingBottom: 24 }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A0C",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#6366F1",
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  rankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  rankLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rankText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "800",
  },
  topRankText: {
    color: "#0A0A0C",
  },
  usernameText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  rankRight: {
    alignItems: "flex-end",
  },
  eloText: {
    color: "#10B981",
    fontSize: 18,
    fontWeight: "900",
  },
  eloLabel: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 2,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },
  errorSubtext: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 13,
    marginTop: 4,
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  emptySubtext: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 13,
    marginTop: 4,
  },
});
