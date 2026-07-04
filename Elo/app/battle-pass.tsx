import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";

const SERVER = "http://10.0.2.2:8080";

interface CombatPass {
  current_stars: number;
  current_tier: number;
  is_premium_unlocked: number;
  claimed_tiers_mask: string;
}

const TIER_REWARDS: Record<number, string> = {
  1: "10 Credits",
  5: "Neon Ghost Title",
  10: "Cyberpunk Arena Skin",
  15: "50 Credits",
  20: "Particle Burst FX",
  25: "200 Credits",
  30: "Ghost Rank Badge",
  35: "100 Credits",
  40: "Spectral Aura FX",
  45: "300 Credits",
  50: "⭐ Season Exclusive Avatar",
};

export default function BattlePassScreen() {
  const [pass, setPass] = useState<CombatPass | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<number | null>(null);
  const playerId = "guest_player";

  const starAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchPass();
  }, []);

  const fetchPass = () => {
    fetch(`${SERVER}/api/profile/battlepass?playerId=${playerId}`)
      .then(r => r.json())
      .then(data => {
        setPass(data);
        setLoading(false);
        Animated.spring(starAnim, { toValue: 1, useNativeDriver: true, tension: 60 }).start();
      })
      .catch(() => setLoading(false));
  };

  const claimTier = (tier: number) => {
    if (!pass) return;
    const claimed = pass.claimed_tiers_mask.split(",").filter(Boolean);
    if (claimed.includes(tier.toString())) return;
    if (pass.current_tier < tier) return;

    setClaiming(tier);
    fetch(`${SERVER}/api/profile/battlepass/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId, tier }),
    })
      .then(r => r.json())
      .then(() => { fetchPass(); setClaiming(null); })
      .catch(() => setClaiming(null));
  };

  const isClaimed = (tier: number) => {
    if (!pass) return false;
    return pass.claimed_tiers_mask.split(",").filter(Boolean).includes(tier.toString());
  };

  const isReachable = (tier: number) => pass ? pass.current_tier >= tier : false;

  const starsToNextTier = pass ? (10 - (pass.current_stars % 10)) : 10;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#818CF8" />
        <Text style={styles.loadingText}>Loading Combat Pass…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>⚔️ Alpha Season Combat Pass</Text>
        <View style={styles.statsRow}>
          <Animated.View style={{ transform: [{ scale: starAnim }] }}>
            <Text style={styles.statBadge}>Tier {pass?.current_tier ?? 1} / 50</Text>
          </Animated.View>
          <Text style={styles.statBadge}>⭐ {pass?.current_stars ?? 0} Stars</Text>
        </View>
        {/* Stars Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((pass?.current_stars ?? 0) % 10) * 10}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{starsToNextTier} stars to next tier</Text>
      </View>

      {/* Tier Grid */}
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 50 }, (_, i) => i + 1).map(tier => {
          const claimed = isClaimed(tier);
          const reachable = isReachable(tier);
          const reward = TIER_REWARDS[tier];
          const isPremium = tier % 2 === 0;

          return (
            <TouchableOpacity
              key={tier}
              style={[
                styles.tierCard,
                claimed && styles.tierClaimed,
                reachable && !claimed && styles.tierReachable,
                isPremium && styles.tierPremium,
              ]}
              onPress={() => claimTier(tier)}
              disabled={claimed || !reachable || claiming === tier}
              activeOpacity={0.75}
            >
              <Text style={styles.tierNum}>T{tier}</Text>
              {isPremium && <Text style={styles.premiumBadge}>★</Text>}
              {reward && <Text style={styles.tierReward}>{reward}</Text>}
              {claimed ? (
                <Text style={styles.claimedTag}>✓ Claimed</Text>
              ) : reachable ? (
                <Text style={styles.claimTag}>Claim</Text>
              ) : (
                <Text style={styles.lockedTag}>🔒</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F1A" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0F0F1A" },
  loadingText: { color: "#818CF8", marginTop: 12, fontFamily: "monospace" },
  header: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16, backgroundColor: "#1A1A2E" },
  title: { color: "#E0E7FF", fontSize: 20, fontWeight: "700", marginBottom: 12 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  statBadge: {
    backgroundColor: "#312E81", color: "#A5B4FC", fontSize: 12,
    fontWeight: "600", paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20,
  },
  progressTrack: { height: 6, backgroundColor: "#312E81", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#818CF8", borderRadius: 3 },
  progressLabel: { color: "#6B7280", fontSize: 11, marginTop: 6 },
  grid: { padding: 16, flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between" },
  tierCard: {
    width: "30%", backgroundColor: "#1E1B4B", borderRadius: 10,
    padding: 10, alignItems: "center", borderWidth: 1, borderColor: "#312E81",
    minHeight: 90,
  },
  tierClaimed: { backgroundColor: "#1A2E1A", borderColor: "#22C55E" },
  tierReachable: { borderColor: "#818CF8", backgroundColor: "#1E1B4B" },
  tierPremium: { borderColor: "#F59E0B" },
  tierNum: { color: "#6366F1", fontSize: 13, fontWeight: "700", marginBottom: 2 },
  premiumBadge: { color: "#F59E0B", fontSize: 10, fontWeight: "800" },
  tierReward: { color: "#C7D2FE", fontSize: 9, textAlign: "center", marginTop: 2, marginBottom: 4 },
  claimedTag: { color: "#22C55E", fontSize: 10, fontWeight: "700" },
  claimTag: {
    backgroundColor: "#4F46E5", color: "#fff", fontSize: 10,
    fontWeight: "700", paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8, marginTop: 4,
  },
  lockedTag: { color: "#4B5563", fontSize: 12, marginTop: 4 },
});
