import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/ui/Screen";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Spacing } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";
import { Card } from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/icon-symbol";

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
  50: "Season Exclusive Avatar",
};

export default function BattlePassScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
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
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>Loading Combat Pass…</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={false}>
      <ScreenHeader title="Alpha Season Combat Pass" onBack={() => router.replace("/(tabs)")} />

      <Card style={styles.header}>
        <View style={styles.statsRow}>
          <Animated.View style={{ transform: [{ scale: starAnim }] }}>
            <Text style={[styles.statBadge, { backgroundColor: colors.accentMuted, color: colors.accent }]}>
              Tier {pass?.current_tier ?? 1} / 50
            </Text>
          </Animated.View>
          <View style={[styles.statBadgeRow, { backgroundColor: colors.accentMuted }]}>
            <IconSymbol name="star" size={12} color={colors.accent} />
            <Text style={[styles.statBadgeText, { color: colors.accent }]}>
              {pass?.current_stars ?? 0} Stars
            </Text>
          </View>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: colors.background }]}>
          <View style={[styles.progressFill, { width: `${((pass?.current_stars ?? 0) % 10) * 10}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.progressLabel, { color: colors.textMuted }]}>{starsToNextTier} stars to next tier</Text>
      </Card>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 50 }, (_, i) => i + 1).map(tier => {
          const claimed = isClaimed(tier);
          const reachable = isReachable(tier);
          const reward = TIER_REWARDS[tier];
          const isPremium = tier % 2 === 0;

          return (
            <Card
              key={tier}
              style={[
                styles.tierCard,
                claimed && { backgroundColor: colors.accentMuted, borderColor: colors.success },
                reachable && !claimed && { borderColor: colors.primary },
                isPremium && { borderColor: colors.accent },
              ]}
              onPress={() => claimTier(tier)}
              disabled={claimed || !reachable || claiming === tier}
            >
              <Text style={[styles.tierNum, { color: colors.primary }]}>T{tier}</Text>
              {isPremium && <IconSymbol name="star" size={10} color={colors.accent} style={{ marginVertical: 2 }} />}
              {reward && <Text style={[styles.tierReward, { color: colors.textMuted }]}>{reward}</Text>}
              {claimed ? (
                <Text style={[styles.claimedTag, { color: colors.success }]}>✓ Claimed</Text>
              ) : reachable ? (
                <Text style={[styles.claimTag, { backgroundColor: colors.primary, color: colors.onPrimary }]}>Claim</Text>
              ) : (
                <IconSymbol name="lock.fill" size={12} color={colors.textMuted} style={{ marginTop: 4 }} />
              )}
            </Card>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, fontFamily: "monospace" },
  header: { marginHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  statBadge: { fontSize: 12, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statBadgeRow: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statBadgeText: { fontSize: 12, fontWeight: "600" },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressLabel: { fontSize: 11, marginTop: 6 },
  grid: { padding: Spacing.lg, flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between", paddingBottom: Spacing.xxxl },
  tierCard: {
    width: "30%",
    padding: 10,
    alignItems: "center",
    minHeight: 100,
    marginBottom: 5,
    marginRight: 0, // override default card marginRight
  },
  tierNum: { fontSize: 13, fontWeight: "700", marginBottom: 2 },
  tierReward: { fontSize: 9, textAlign: "center", marginTop: 2, marginBottom: 4 },
  claimedTag: { fontSize: 10, fontWeight: "700" },
  claimTag: { fontSize: 10, fontWeight: "700", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 4, overflow: "hidden" }
});
