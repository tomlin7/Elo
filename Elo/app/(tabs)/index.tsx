import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Share
} from "react-native";
import { useRouter } from "expo-router";
import { authService } from "../../src/utils/auth.ts";
import { useProfileStore, ProfileData } from "../../src/store/profileStore.ts";
import { useThemeStore } from "../../src/store/themeStore.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCapsuleRow } from "@/components/ui/StatCapsuleRow";
import { Spacing, Radius, Typography } from "@/constants/design";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface ModeProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const DisciplineCard: React.FC<ModeProps & { colors: ReturnType<typeof useThemeStore.getState>["colors"] }> = ({ label, isActive, onPress, colors }) => {
  return (
    <Card 
      onPress={onPress}
      style={[
        styles.discCard,
        isActive && { borderColor: colors.primary }
      ]}
    >
      <Text style={[styles.discLabelText, { color: colors.textMuted }, isActive && { color: colors.primary }]}>
        {label}
      </Text>
      {isActive && (
        <View style={[styles.pointsBadge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.pointsText, { color: colors.onPrimary }]}>+100</Text>
        </View>
      )}
    </Card>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const { profile, setProfile } = useProfileStore();

  const [loading, setLoading] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [activeEvents, setActiveEvents] = useState<string[]>([]);
  const [activeDisc, setActiveDisc] = useState("MATH");
  const bannerPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    checkAuth();
    fetchLiveOps();
  }, []);

  const fetchLiveOps = () => {
    const SERVER = "http://10.0.2.2:8080";
    fetch(`${SERVER}/api/events/active`)
      .then(r => r.json())
      .then(data => {
        setActiveEvents(data.events || []);
        if ((data.events || []).length > 0) {
          Animated.loop(
            Animated.sequence([
              Animated.timing(bannerPulse, { toValue: 1.03, duration: 700, useNativeDriver: true }),
              Animated.timing(bannerPulse, { toValue: 1.0, duration: 700, useNativeDriver: true }),
            ])
          ).start();
        }
      })
      .catch(() => {});

    if (profile?.id) {
      fetch(`${SERVER}/api/profile/challenges?playerId=${profile.id}`)
        .then(r => r.json())
        .then(data => setChallenges(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  };

  const checkAuth = async () => {
    try {
      const res = await authService.loginGuest();
      const profileData: ProfileData = {
        id: res.id,
        username: res.username,
        elo: res.elo,
        credits: (res as any).credits || 0,
        xp: (res as any).xp || 0,
        level: (res as any).level || 1,
        dailyStreak: (res as any).daily_streak || 0,
        lastPlayedDate: (res as any).last_played_date || null,
        completedTodayCount: (res as any).completed_today_count || 0,
        unlockedThemes: JSON.parse((res as any).unlocked_themes || '["dark"]'),
        activeTitle: (res as any).active_title || ""
      };
      setProfile(profileData);
    } catch (e) {
      console.log("Auto guest login failed, need username setup.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboard = async () => {
    setErrorMsg("");
    const cleanUsername = usernameInput.trim().replace(/[^a-zA-Z0-9]/g, "");

    if (cleanUsername.length < 3 || cleanUsername.length > 14) {
      setErrorMsg("Username must be between 3 and 14 alphanumeric characters.");
      return;
    }

    setSubmitting(true);
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const res = await authService.loginGuest(cleanUsername);
      const profileData: ProfileData = {
        id: res.id,
        username: res.username,
        elo: res.elo,
        credits: (res as any).credits || 0,
        xp: (res as any).xp || 0,
        level: (res as any).level || 1,
        dailyStreak: (res as any).daily_streak || 0,
        lastPlayedDate: (res as any).last_played_date || null,
        completedTodayCount: (res as any).completed_today_count || 0,
        unlockedThemes: JSON.parse((res as any).unlocked_themes || '["dark"]'),
        activeTitle: (res as any).active_title || ""
      };
      setProfile(profileData);
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to set username. Try another one.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFindMatch = () => {
    if (!profile) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: "/battle",
      params: { playerId: profile.id }
    });
  };

  const handlePrivateMatch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/private-lobby");
  };

  const triggerReferral = () => {
    Share.share({
      message: "Duel me in mental math on Elo! Use invite link to join and claim 50 Pies instantly."
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textMuted }]}>Loading Profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.keyboardContainer, { backgroundColor: colors.background }]}
      >
        <SafeAreaView style={styles.onboardSafeArea}>
          <StatusBar style="light" />
          <View style={styles.onboardContent}>
            <Text style={[styles.brandTitle, { color: colors.primary }]}>ELO</Text>
            <Text style={[styles.brandSubtitle, { color: colors.textMuted }]}>1v1 MENTAL MATH DUEL</Text>

            <Card style={styles.card}>
              <Text style={[styles.onboardLabel, { color: colors.text }]}>Choose your username</Text>
              <Text style={[styles.onboardDesc, { color: colors.textMuted }]}>
                This username will be visible on the global leaderboard. Max 14 characters.
              </Text>

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.cardBorder, color: colors.text }]}
                value={usernameInput}
                onChangeText={(text) => setUsernameInput(text.replace(/[^a-zA-Z0-9]/g, ""))}
                placeholder="Username"
                placeholderTextColor={colors.textMuted}
                maxLength={14}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {errorMsg ? <Text style={[styles.errorText, { color: colors.accent }]}>{errorMsg}</Text> : null}

              <Button
                label="CLAIM USERNAME"
                onPress={handleOnboard}
                disabled={submitting}
                loading={submitting}
                style={styles.submitBtn}
              />
            </Card>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.streakWarning, { backgroundColor: colors.accent }]}>
          <Text style={[styles.streakWarningText, { color: colors.onPrimary }]}>ALERTS: Turn on alerts to preserve your daily streaks!</Text>
        </View>

        <StatCapsuleRow
          stats={[
            { icon: "dollarsign.circle.fill", value: `${profile.credits} Pies` },
            { icon: "bolt", value: `${profile.dailyStreak} Streaks` },
            { icon: "star", value: `${profile.xp} XP` },
          ]}
        />

        <SectionLabel>ONLINE DUELISTS</SectionLabel>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.onlineTray}>
          <View style={styles.onlineUser}>
            <View style={[styles.onlineRing, { borderColor: colors.primary, backgroundColor: colors.cardBg }]}>
              <Text style={[styles.onlineInitial, { color: colors.text }]}>U</Text>
            </View>
            <Text style={[styles.onlineUsername, { color: colors.textMuted }]}>YOU</Text>
          </View>
          <View style={styles.onlineUser}>
            <View style={[styles.onlineRing, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
              <Text style={[styles.onlineInitial, { color: colors.text }]}>A</Text>
            </View>
            <Text style={[styles.onlineUsername, { color: colors.textMuted }]}>UserA</Text>
          </View>
          <View style={styles.onlineUser}>
            <View style={[styles.onlineRing, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
              <Text style={[styles.onlineInitial, { color: colors.text }]}>B</Text>
            </View>
            <Text style={[styles.onlineUsername, { color: colors.textMuted }]}>UserB</Text>
          </View>
        </ScrollView>

        <Card style={styles.questEngine}>
          <Text style={[styles.questEngineTitle, { color: colors.textMuted }]}>Starter Quest</Text>
          <View style={styles.stepsHorizon}>
            <Text style={[styles.activeQuestStep, { color: colors.primary }]}>Puzzle</Text>
            <View style={[styles.activeQuestLine, { backgroundColor: colors.primary }]} />
            <Text style={[styles.inactiveQuestStep, { color: colors.textMuted }]}>Memory</Text>
            <View style={[styles.inactiveQuestLine, { backgroundColor: colors.cardBorder }]} />
            <Text style={[styles.inactiveQuestStep, { color: colors.textMuted }]}>Math</Text>
            <IconSymbol name="card-giftcard" size={16} color={colors.primary} style={{ marginLeft: 8 }} />
          </View>
        </Card>

        <SectionLabel>DUEL DISCIPLINE</SectionLabel>
        <View style={styles.discGrid}>
          {["MATH", "MEMORY", "PUZZLE", "LOGIC"].map(d => (
            <DisciplineCard
              key={d}
              label={d}
              isActive={activeDisc === d}
              onPress={() => setActiveDisc(d)}
              colors={colors}
            />
          ))}
        </View>

        <SectionLabel>CHALLENGE DUELS</SectionLabel>
        <View style={styles.duelCardContainer}>
          <Card style={styles.duelVariantCard} onPress={handleFindMatch}>
            <View style={styles.variantHeader}>
              <Text style={[styles.variantTitle, { color: colors.text }]}>Sprint Duels</Text>
              <View style={[styles.badgeAmber, { backgroundColor: colors.accent }]}>
                <Text style={[styles.badgeAmberText, { color: colors.onPrimary }]}>JUST PLAYED</Text>
              </View>
            </View>
            <Text style={[styles.variantDescription, { color: colors.textMuted }]}>
              High-velocity race to solve mathematical anomalies in under 60 seconds.
            </Text>
          </Card>

          <Card style={styles.duelVariantCard} onPress={() => router.push("/tournament-lobby")}>
            <View style={styles.variantHeader}>
              <Text style={[styles.variantTitle, { color: colors.text }]}>Fast & First Duels</Text>
            </View>
            <Text style={[styles.variantDescription, { color: colors.textMuted }]}>
              Synchronized matches where the first response captures point dominance.
            </Text>
          </Card>
        </View>

        <Card style={styles.referralCard} onPress={triggerReferral} variant="dashed">
          <Text style={[styles.referralTitle, { color: colors.primary }]}>Invite Friends — Claim 50 Pies</Text>
          <Text style={[styles.referralDesc, { color: colors.textMuted }]}>Share your custom link to boost e-sport credentials.</Text>
        </Card>

        <View style={styles.navBlock}>
          <Button style={styles.optionBtn} label="COMBAT PASS" onPress={() => router.push("/battle-pass")} />
          <Button style={styles.optionBtn} label="ANALYTICS HUD" onPress={() => router.push("/analytics")} />
          <Button style={styles.optionBtn} label="SETTINGS & OPTIONS" onPress={() => router.push("/settings")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: Spacing.xxxl },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, fontSize: 14, fontFamily: "monospace" },
  keyboardContainer: { flex: 1 },
  onboardSafeArea: { flex: 1 },
  onboardContent: { flex: 1, paddingHorizontal: Spacing.xl, justifyContent: "center", alignItems: "center" },
  brandTitle: { ...Typography.hero },
  brandSubtitle: { fontSize: 12, fontWeight: "700", letterSpacing: 4, marginBottom: Spacing.xxl },
  card: { width: "100%", padding: Spacing.xl },
  onboardLabel: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  onboardDesc: { fontSize: 13, lineHeight: 18, marginBottom: 20 },
  input: {
    width: "100%", height: 50, borderWidth: 2,
    borderRadius: Radius.md, paddingHorizontal: Spacing.lg, fontSize: 15,
    marginBottom: Spacing.lg
  },
  errorText: { fontSize: 13, marginBottom: Spacing.lg },
  submitBtn: { width: "100%", height: 50 },
  streakWarning: { paddingVertical: 8, paddingHorizontal: Spacing.lg, alignItems: "center" },
  streakWarningText: { fontSize: 11, fontWeight: "800" },
  onlineTray: { paddingLeft: Spacing.lg, marginBottom: Spacing.xl, flexDirection: "row" },
  onlineUser: { alignItems: "center", marginRight: Spacing.lg },
  onlineRing: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  onlineInitial: { fontSize: 14, fontWeight: "700" },
  onlineUsername: { fontSize: 10, fontWeight: "600", marginTop: 4 },
  questEngine: { marginHorizontal: Spacing.lg, marginBottom: Spacing.xl },
  questEngineTitle: { fontSize: 11, fontWeight: "800", textTransform: "uppercase", marginBottom: Spacing.md },
  stepsHorizon: { flexDirection: "row", alignItems: "center" },
  activeQuestStep: { fontSize: 13, fontWeight: "800" },
  inactiveQuestStep: { fontSize: 13, fontWeight: "700" },
  activeQuestLine: { flex: 1, height: 2, marginHorizontal: 8 },
  inactiveQuestLine: { flex: 1, height: 2, marginHorizontal: 8 },
  discGrid: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Spacing.lg, marginBottom: Spacing.xl },
  discCard: {
    width: "23%", height: 85,
    justifyContent: "center", alignItems: "center"
  },
  discLabelText: { fontSize: 11, fontWeight: "800" },
  pointsBadge: { position: "absolute", bottom: -6, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 },
  pointsText: { fontSize: 8, fontWeight: "900" },
  duelCardContainer: { paddingHorizontal: Spacing.lg, marginBottom: 20 },
  duelVariantCard: { marginBottom: Spacing.md },
  variantHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  variantTitle: { fontSize: 15, fontWeight: "700" },
  badgeAmber: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  badgeAmberText: { fontSize: 9, fontWeight: "900" },
  variantDescription: { fontSize: 12, lineHeight: 16 },
  referralCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.xl },
  referralTitle: { fontSize: 14, fontWeight: "800", marginBottom: 4 },
  referralDesc: { fontSize: 12 },
  navBlock: { paddingHorizontal: Spacing.lg },
  optionBtn: { width: "100%", height: 52, marginBottom: Spacing.md }
});
