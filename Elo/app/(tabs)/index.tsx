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
  TouchableOpacity,
  View,
  Share
} from "react-native";
import { useRouter } from "expo-router";
import { authService } from "../../src/utils/auth.ts";
import { useProfileStore, ProfileData } from "../../src/store/profileStore.ts";
import { useThemeStore } from "../../src/store/themeStore.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

interface ModeProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const DisciplineCard: React.FC<ModeProps> = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.discCard, isActive && styles.activeDiscCard]}
      activeOpacity={0.8}
    >
      <Text style={[styles.discLabelText, isActive && styles.activeDiscLabelText]}>
        {label}
      </Text>
      {isActive && (
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>+100</Text>
        </View>
      )}
    </TouchableOpacity>
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
      <View style={[styles.loadingContainer, { backgroundColor: "#161616" }]}>
        <ActivityIndicator size="large" color="#8AFF29" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.keyboardContainer, { backgroundColor: "#161616" }]}
      >
        <SafeAreaView style={styles.onboardSafeArea}>
          <StatusBar style="light" />
          <View style={styles.onboardContent}>
            <Text style={styles.brandTitle}>ELO</Text>
            <Text style={styles.brandSubtitle}>1v1 MENTAL MATH DUEL</Text>

            <View style={styles.card}>
              <Text style={styles.onboardLabel}>Choose your username</Text>
              <Text style={styles.onboardDesc}>
                This username will be visible on the global leaderboard. Max 14 characters.
              </Text>

              <TextInput
                style={styles.input}
                value={usernameInput}
                onChangeText={(text) => setUsernameInput(text.replace(/[^a-zA-Z0-9]/g, ""))}
                placeholder="Username"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                maxLength={14}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleOnboard}
                disabled={submitting}
                activeOpacity={0.8}
              >
                {submitting ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.submitBtnText}>CLAIM USERNAME</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: "#161616" }]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Streak Notification Banner */}
        <View style={styles.streakWarning}>
          <Text style={styles.streakWarningText}>⚠️ Turn on alerts to preserve your daily streaks!</Text>
        </View>

        {/* Global Telemetry Capsules */}
        <View style={styles.capsuleRow}>
          <View style={styles.capsule}>
            <Text style={styles.capsuleIcon}>π</Text>
            <Text style={styles.capsuleValue}>{profile.credits} Pies</Text>
          </View>
          <View style={styles.capsule}>
            <Text style={styles.capsuleIcon}>🔥</Text>
            <Text style={styles.capsuleValue}>{profile.dailyStreak} Streaks</Text>
          </View>
          <View style={styles.capsule}>
            <Text style={styles.capsuleIcon}>⬡</Text>
            <Text style={styles.capsuleValue}>{profile.xp} XP</Text>
          </View>
        </View>

        {/* Online Status tray */}
        <Text style={styles.sectionLabel}>ONLINE DUELISTS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.onlineTray}>
          <View style={styles.onlineUser}>
            <View style={[styles.onlineRing, { borderColor: "#8AFF29" }]}>
              <Text style={styles.onlineInitial}>U</Text>
            </View>
            <Text style={styles.onlineUsername}>YOU</Text>
          </View>
          <View style={styles.onlineUser}>
            <View style={[styles.onlineRing, { borderColor: "#262626" }]}>
              <Text style={styles.onlineInitial}>A</Text>
            </View>
            <Text style={styles.onlineUsername}>UserA</Text>
          </View>
          <View style={styles.onlineUser}>
            <View style={[styles.onlineRing, { borderColor: "#262626" }]}>
              <Text style={styles.onlineInitial}>B</Text>
            </View>
            <Text style={styles.onlineUsername}>UserB</Text>
          </View>
        </ScrollView>

        {/* Starter Quest Progress engine */}
        <View style={styles.questEngine}>
          <Text style={styles.questEngineTitle}>Starter Quest</Text>
          <View style={styles.stepsHorizon}>
            <Text style={styles.activeQuestStep}>Puzzle</Text>
            <View style={styles.activeQuestLine} />
            <Text style={styles.inactiveQuestStep}>Memory</Text>
            <View style={styles.inactiveQuestLine} />
            <Text style={styles.inactiveQuestStep}>Math</Text>
            <Text style={styles.rewardCrateIcon}>🎁</Text>
          </View>
        </View>

        {/* Discipline Mode selector grid */}
        <Text style={styles.sectionLabel}>DUEL DISCIPLINE</Text>
        <View style={styles.discGrid}>
          {["MATH", "MEMORY", "PUZZLE", "LOGIC"].map(d => (
            <DisciplineCard
              key={d}
              label={d}
              isActive={activeDisc === d}
              onPress={() => setActiveDisc(d)}
            />
          ))}
        </View>

        {/* Duel variants cards */}
        <Text style={styles.sectionLabel}>CHALLENGE DUELS</Text>
        <View style={styles.duelCardContainer}>
          <TouchableOpacity style={styles.duelVariantCard} onPress={handleFindMatch}>
            <View style={styles.variantHeader}>
              <Text style={styles.variantTitle}>Sprint Duels</Text>
              <View style={styles.badgeAmber}>
                <Text style={styles.badgeAmberText}>JUST PLAYED</Text>
              </View>
            </View>
            <Text style={styles.variantDescription}>
              High-velocity race to solve mathematical anomalies in under 60 seconds.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.duelVariantCard} onPress={() => router.push("/tournament-lobby")}>
            <View style={styles.variantHeader}>
              <Text style={styles.variantTitle}>Fast & First Duels</Text>
            </View>
            <Text style={styles.variantDescription}>
              Synchronized matches where the first response captures point dominance.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Referral Card */}
        <TouchableOpacity style={styles.referralCard} onPress={triggerReferral}>
          <Text style={styles.referralTitle}>⚡ Invite Friends — Claim 50 Pies</Text>
          <Text style={styles.referralDesc}>Share your custom link to boost e-sport credentials.</Text>
        </TouchableOpacity>

        {/* Options buttons */}
        <View style={styles.navBlock}>
          <TouchableOpacity style={styles.optionBtn} onPress={() => router.push("/battle-pass")}>
            <Text style={styles.optionText}>⚔️ COMBAT PASS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn} onPress={() => router.push("/analytics")}>
            <Text style={styles.optionText}>📊 ANALYTICS HUD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn} onPress={() => router.push("/settings")}>
            <Text style={styles.optionText}>⚙️ SETTINGS & OPTIONS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#8E8E93", marginTop: 12, fontSize: 14, fontFamily: "monospace" },
  keyboardContainer: { flex: 1 },
  onboardSafeArea: { flex: 1 },
  onboardContent: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  brandTitle: { fontSize: 44, fontWeight: "900", letterSpacing: 8, color: "#8AFF29" },
  brandSubtitle: { fontSize: 12, fontWeight: "700", letterSpacing: 4, color: "#8E8E93", marginBottom: 32 },
  card: { width: "100%", backgroundColor: "#262626", borderRadius: 20, padding: 24 },
  onboardLabel: { fontSize: 18, fontWeight: "700", color: "#FFFFFF", marginBottom: 8 },
  onboardDesc: { fontSize: 13, color: "#8E8E93", lineHeight: 18, marginBottom: 20 },
  input: {
    width: "100%", height: 50, backgroundColor: "#161616", borderWidth: 1,
    borderColor: "#333", borderRadius: 12, paddingHorizontal: 16, fontSize: 15,
    color: "#FFFFFF", marginBottom: 16
  },
  errorText: { color: "#FFD400", fontSize: 13, marginBottom: 16 },
  submitBtn: { width: "100%", height: 50, backgroundColor: "#8AFF29", borderRadius: 12, justifyContent: "center", alignItems: "center" },
  submitBtnText: { color: "#000000", fontSize: 15, fontWeight: "800", letterSpacing: 1 },

  // Streak warning
  streakWarning: { backgroundColor: "#FFD400", paddingVertical: 8, paddingHorizontal: 16, alignItems: "center" },
  streakWarningText: { color: "#000000", fontSize: 11, fontWeight: "800" },

  // Telemetry capsules
  capsuleRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 20, marginBottom: 20 },
  capsule: { flexDirection: "row", backgroundColor: "#262626", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignItems: "center", borderWidth: 1, borderColor: "#333" },
  capsuleIcon: { color: "#8AFF29", fontSize: 14, fontWeight: "800", marginRight: 6 },
  capsuleValue: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  // Status Tray
  sectionLabel: { color: "#8E8E93", fontSize: 11, fontWeight: "800", letterSpacing: 1.5, marginLeft: 16, marginBottom: 10 },
  onlineTray: { paddingLeft: 16, marginBottom: 24, flexDirection: "row" },
  onlineUser: { alignItems: "center", marginRight: 16 },
  onlineRing: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#262626" },
  onlineInitial: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  onlineUsername: { color: "#8E8E93", fontSize: 10, fontWeight: "600", marginTop: 4 },

  // Quest Engine
  questEngine: { backgroundColor: "#262626", marginHorizontal: 16, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#333", marginBottom: 24 },
  questEngineTitle: { color: "#8E8E93", fontSize: 11, fontWeight: "800", textTransform: "uppercase", marginBottom: 12 },
  stepsHorizon: { flexDirection: "row", alignItems: "center" },
  activeQuestStep: { color: "#8AFF29", fontSize: 13, fontWeight: "800" },
  inactiveQuestStep: { color: "#8E8E93", fontSize: 13, fontWeight: "700" },
  activeQuestLine: { flex: 1, height: 2, backgroundColor: "#8AFF29", marginHorizontal: 8 },
  inactiveQuestLine: { flex: 1, height: 2, backgroundColor: "#333", marginHorizontal: 8 },
  rewardCrateIcon: { fontSize: 16, marginLeft: 8 },

  // Selector grid
  discGrid: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 24 },
  discCard: {
    width: "22%", height: 85, backgroundColor: "#262626", borderRadius: 16,
    justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "transparent"
  },
  activeDiscCard: { borderColor: "#8AFF29" },
  discLabelText: { fontSize: 11, fontWeight: "800", color: "#8E8E93" },
  activeDiscLabelText: { color: "#8AFF29" },
  pointsBadge: { position: "absolute", bottom: -6, backgroundColor: "#8AFF29", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 },
  pointsText: { fontSize: 8, fontWeight: "900", color: "#000" },

  // Duel variant cards
  duelCardContainer: { paddingHorizontal: 16, marginBottom: 20 },
  duelVariantCard: { backgroundColor: "#262626", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#333", marginBottom: 12 },
  variantHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  variantTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  badgeAmber: { backgroundColor: "#FFD400", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  badgeAmberText: { color: "#000000", fontSize: 9, fontWeight: "900" },
  variantDescription: { color: "#8E8E93", fontSize: 12, lineHeight: 16 },

  // Referral Card
  referralCard: { backgroundColor: "#262626", marginHorizontal: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#333", borderStyle: "dashed", marginBottom: 24 },
  referralTitle: { color: "#8AFF29", fontSize: 14, fontWeight: "800", marginBottom: 4 },
  referralDesc: { color: "#8E8E93", fontSize: 12 },

  // Option buttons
  navBlock: { paddingHorizontal: 16 },
  optionBtn: { width: "100%", height: 52, backgroundColor: "#262626", borderWidth: 1, borderColor: "#333", borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  optionText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", letterSpacing: 0.5 }
});
