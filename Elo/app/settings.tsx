import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { useProfileStore } from "../src/store/profileStore.ts";
import { getBackendUrls } from "../src/utils/auth.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const { profile, clearProfile } = useProfileStore();

  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterWebhook = async () => {
    if (!profile) return;
    if (!webhookUrl || !webhookSecret) {
      Alert.alert("Error", "Please fill in both Webhook URL and Secret Token.");
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const urls = getBackendUrls();
      const res = await fetch(`${urls.http}/api/developer/webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: profile.id,
          targetUrl: webhookUrl,
          secret: webhookSecret
        })
      });

      if (!res.ok) throw new Error();
      Alert.alert("Success", "Webhook successfully registered to your profile.");
      setWebhookUrl("");
      setWebhookSecret("");
    } catch {
      Alert.alert("Error", "Failed to register webhook. Verify network settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (!profile) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    Alert.alert(
      "⚠️ Delete Account?",
      "Initiating account deletion schedules a permanent erasure after a 7-day grace window. All matches, statistics, and theme assets will be purged. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm Deletion",
          style: "destructive",
          onPress: executeDeletionRequest
        }
      ]
    );
  };

  const executeDeletionRequest = async () => {
    if (!profile) return;
    setLoading(true);

    try {
      const urls = getBackendUrls();
      const res = await fetch(`${urls.http}/api/profile/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: profile.id })
      });

      if (!res.ok) throw new Error();
      
      Alert.alert(
        "Schedule Active",
        "Your account deletion grace timer is running. You will be logged out now.",
        [{ text: "OK", onPress: () => {
          clearProfile();
          router.replace("/");
        }}]
      );
    } catch {
      Alert.alert("Error", "Failed to schedule account deletion. Retry later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>OPERATIONS & PRIVACY</Text>
          <TouchableOpacity
            style={[styles.backBtn, { borderColor: colors.cardBorder }]}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={[styles.backBtnText, { color: colors.text }]}>BACK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Privacy Terms Section */}
          <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>CCPA / GDPR Consent Status</Text>
            <Text style={[styles.descText, { color: colors.textMuted }]}>
              Version ACCEPTED: v1.0.0
            </Text>
            <Text style={[styles.descText, { color: colors.textMuted }]}>
              Timestamp: {profile ? new Date(profile.privacy_consent_timestamp || Date.now()).toLocaleDateString() : "Now"}
            </Text>
            <Text style={[styles.legalDetail, { color: colors.textMuted }]}>
              We commit to collecting mathematical solving cadence data only for cheat verification. No telemetry variables map to private identifiers.
            </Text>
          </View>

          {/* Webhook Registry Section */}
          <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer Portal (Webhooks)</Text>
            <Text style={[styles.descText, { color: colors.textMuted, marginBottom: 16 }]}>
              Link outbound hooks to trigger external integrations on tournament finishes.
            </Text>

            <Text style={[styles.inputLabel, { color: colors.text }]}>Target Webhook URL</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.cardBorder, color: colors.text }]}
              placeholder="https://yourserver.com/webhook"
              placeholderTextColor={colors.textMuted}
              value={webhookUrl}
              onChangeText={setWebhookUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.inputLabel, { color: colors.text }]}>Secret Signature Token</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.cardBorder, color: colors.text }]}
              placeholder="secret_token"
              placeholderTextColor={colors.textMuted}
              value={webhookSecret}
              onChangeText={setWebhookSecret}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={[styles.btnPrimary, { backgroundColor: colors.primary }]}
              onPress={handleRegisterWebhook}
              disabled={loading}
            >
              <Text style={styles.btnText}>REGISTER WEBHOOK</Text>
            </TouchableOpacity>
          </View>

          {/* Right to be Forgotten Settings */}
          <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Right to Be Forgotten</Text>
            <Text style={[styles.descText, { color: colors.textMuted, marginBottom: 20 }]}>
              Cascades purges through users database tables, match telemetries, and season archives.
            </Text>

            <TouchableOpacity
              style={[styles.btnDelete, { backgroundColor: "#EF4444" }]}
              onPress={handleDeleteAccount}
              disabled={loading}
            >
              <Text style={styles.btnText}>DELETE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
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
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  descText: {
    fontSize: 13,
  },
  legalDetail: {
    fontSize: 11,
    marginTop: 12,
    lineHeight: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 13,
  },
  btnPrimary: {
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  btnDelete: {
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
