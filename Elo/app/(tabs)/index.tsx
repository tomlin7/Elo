import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { authService } from "../../src/utils/auth.ts";
import { useProfileStore, ProfileData } from "../../src/store/profileStore.ts";
import { useThemeStore } from "../../src/store/themeStore.ts";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const { profile, setProfile } = useProfileStore();

  const [loading, setLoading] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await authService.loginGuest();
      // Map server response to ProfileData
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

  // Streak Flame Coloring logic
  const getFlameColor = (streak: number): string => {
    if (streak <= 0) return "rgba(255,255,255,0.15)";
    if (streak < 7) return "#B45309"; // Bronze
    if (streak < 30) return "#94A3B8"; // Silver
    return "#BD93F9"; // Cosmic Purple
  };

  // SVG Streak Flame rendering
  const renderStreakFlame = (streak: number) => {
    const color = getFlameColor(streak);
    return (
      <View style={styles.streakBox}>
        <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <Path
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            fill={color}
          />
          <Path
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            fill={streak > 0 ? "rgba(255,255,255,0.4)" : "none"}
          />
        </Svg>
        <Text style={[styles.streakText, { color: streak > 0 ? colors.text : colors.textMuted }]}>
          {streak} DAY STREAK
        </Text>
      </View>
    );
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
          <StatusBar style={themeId === "light" ? "dark" : "light"} />
          <View style={styles.onboardContent}>
            <Text style={[styles.brandTitle, { color: colors.primary }]}>ELO</Text>
            <Text style={[styles.brandSubtitle, { color: colors.textMuted }]}>1v1 MENTAL MATH DUEL</Text>

            <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.onboardLabel, { color: colors.text }]}>Choose your username</Text>
              <Text style={[styles.onboardDesc, { color: colors.textMuted }]}>
                This username will be visible on the global leaderboard. Max 14 characters.
              </Text>

              <TextInput
                style={[styles.input, { borderColor: colors.cardBorder, color: colors.text }]}
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
                style={[styles.submitBtn, { backgroundColor: colors.primary }]}
                onPress={handleOnboard}
                disabled={submitting}
                activeOpacity={0.8}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFF" />
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

  const xpProgress = profile.xp % 1000;
  const xpPercentage = (xpProgress / 1000) * 100;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: colors.primary }]}>ELO</Text>
          {renderStreakFlame(profile.dailyStreak)}
        </View>

        {/* Player Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={[styles.avatarCircle, { borderColor: colors.primary }]}>
            <Text style={[styles.avatarChar, { color: colors.primary }]}>
              {profile.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.usernameText, { color: colors.text }]}>{profile.username}</Text>
            <View style={styles.titleBadgeContainer}>
              <Text style={[styles.titleBadge, { color: colors.primary }]}>
                {profile.activeTitle || "DUELIST"}
              </Text>
            </View>
            <Text style={[styles.levelLabel, { color: colors.textMuted }]}>LEVEL {profile.level}</Text>
            
            {/* XP Progress Bar */}
            <View style={styles.xpBarContainer}>
              <View style={[styles.xpBar, { width: `${xpPercentage}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={[styles.xpText, { color: colors.textMuted }]}>{xpProgress} / 1000 XP</Text>
          </View>
          <View style={styles.eloContainer}>
            <Text style={[styles.eloValue, { color: colors.accent }]}>{profile.elo}</Text>
            <Text style={[styles.eloLabel, { color: colors.textMuted }]}>RATING</Text>
          </View>
        </View>

        {/* Stats and Currency Container */}
        <View style={styles.statsOverviewRow}>
          <View style={[styles.statsBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statsVal, { color: colors.accent }]}>{profile.credits}</Text>
            <Text style={[styles.statsLabel, { color: colors.textMuted }]}>CREDITS</Text>
          </View>
          <View style={[styles.statsBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statsVal, { color: colors.text }]}>{profile.completedTodayCount}/3</Text>
            <Text style={[styles.statsLabel, { color: colors.textMuted }]}>DAILY DUELS</Text>
          </View>
        </View>

        {/* Navigation Actions */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.duelButton, { backgroundColor: colors.primary }]}
            onPress={handleFindMatch}
            activeOpacity={0.85}
          >
            <Text style={styles.duelButtonText}>FIND RANKED DUEL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.duelButton, { backgroundColor: colors.accent, marginBottom: 12 }]}
            onPress={() => router.push("/tournament-lobby")}
            activeOpacity={0.85}
          >
            <Text style={styles.duelButtonText}>ENTER BLITZ TOURNAMENT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryActionBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg, marginBottom: 12 }]}
            onPress={handlePrivateMatch}
            activeOpacity={0.85}
          >
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>PRIVATE FRIENDLY DUEL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryActionBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg, marginBottom: 12 }]}
            onPress={() => router.push("/analytics")}
            activeOpacity={0.85}
          >
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>PERFORMANCE ANALYTICS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryActionBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
            onPress={() => router.push("/settings")}
            activeOpacity={0.85}
          >
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>SETTINGS & PRIVACY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  keyboardContainer: {
    flex: 1,
  },
  onboardSafeArea: {
    flex: 1,
  },
  onboardContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 54,
    fontWeight: "900",
    letterSpacing: 8,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 4,
    marginBottom: 40,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
  },
  onboardLabel: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  onboardDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginBottom: 16,
  },
  submitBtn: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 2,
  },
  streakBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 11,
    fontWeight: "800",
    marginLeft: 6,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarChar: {
    fontSize: 26,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "800",
  },
  titleBadgeContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  titleBadge: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 8,
  },
  xpBarContainer: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 3,
    width: "100%",
    marginTop: 4,
  },
  xpBar: {
    height: "100%",
    borderRadius: 3,
  },
  xpText: {
    fontSize: 9,
    fontWeight: "600",
    marginTop: 2,
  },
  eloContainer: {
    alignItems: "flex-end",
  },
  eloValue: {
    fontSize: 26,
    fontWeight: "900",
  },
  eloLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  statsOverviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  statsBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statsVal: {
    fontSize: 22,
    fontWeight: "900",
  },
  statsLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 4,
  },
  actionContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  duelButton: {
    width: "100%",
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 12,
  },
  duelButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  secondaryActionBtn: {
    width: "100%",
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
