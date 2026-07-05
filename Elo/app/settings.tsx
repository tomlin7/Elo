import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Clipboard
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { useProfileStore } from "../src/store/profileStore.ts";
import { getBackendUrls } from "../src/utils/auth.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
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

  const copyAttestation = () => {
    Clipboard.setString(profile?.id || "guest_player");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied", "Attestation key signature copied to clipboard.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>OPERATIONS & IDENTITY</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.backBtnText}>BACK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Attestation Signature Banner */}
          <View style={styles.attestationBanner}>
            <Text style={styles.attestationLabel}>Attested Corporate Identity</Text>
            <Text style={styles.attestationName}>DHEERAJ CHARAUNGON</Text>
            <TouchableOpacity style={styles.copyRow} onPress={copyAttestation}>
              <Text style={styles.attestationId} numberOfLines={1}>
                {profile?.id || "dhe-17832-attestation-signature"}
              </Text>
              <View style={styles.copyBadge}>
                <Text style={styles.copyBadgeText}>COPY</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Widget Embedding Layer */}
          <View style={styles.widgetCard}>
            <Text style={styles.widgetTitle}>Streak Widget Companion</Text>
            <Text style={styles.widgetDesc}>
              Embed your active daily streak indicators directly on the device home-screen launcher layer.
            </Text>
            <TouchableOpacity style={styles.widgetBtn} onPress={() => Alert.alert("Widget Shortcut", "Hold down on your home launcher screen to add ELO telemetry widgets.")}>
              <Text style={styles.widgetBtnText}>INSTALL COMPANION</Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Terms Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>CCPA / GDPR Consent Status</Text>
            <Text style={styles.descText}>Version ACCEPTED: v1.0.0</Text>
            <Text style={styles.descText}>
              Timestamp: {profile ? new Date(profile.privacy_consent_timestamp || Date.now()).toLocaleDateString() : "Now"}
            </Text>
            <Text style={styles.legalDetail}>
              We commit to collecting mathematical solving cadence data only for cheat verification. No telemetry variables map to private identifiers.
            </Text>
          </View>

          {/* Webhook Registry Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Developer Portal (Webhooks)</Text>
            <Text style={styles.descText}>
              Link outbound hooks to trigger external integrations on tournament finishes.
            </Text>

            <Text style={styles.inputLabel}>Target Webhook URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://yourserver.com/webhook"
              placeholderTextColor="#8E8E93"
              value={webhookUrl}
              onChangeText={setWebhookUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.inputLabel}>Secret Signature Token</Text>
            <TextInput
              style={styles.input}
              placeholder="secret_token"
              placeholderTextColor="#8E8E93"
              value={webhookSecret}
              onChangeText={setWebhookSecret}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={handleRegisterWebhook}
              disabled={loading}
            >
              <Text style={styles.btnText}>REGISTER WEBHOOK</Text>
            </TouchableOpacity>
          </View>

          {/* Right to be Forgotten Settings */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Right to Be Forgotten</Text>
            <Text style={styles.descText}>
              Cascades purges through users database tables, match telemetries, and archives.
            </Text>

            <TouchableOpacity
              style={styles.btnDelete}
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
  safeArea: { flex: 1, backgroundColor: "#161616" },
  container: { flex: 1, paddingTop: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginBottom: 20 },
  headerTitle: { fontSize: 16, fontWeight: "900", letterSpacing: 0.5, color: "#8AFF29" },
  backBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#333", backgroundColor: "#262626" },
  backBtnText: { fontSize: 12, fontWeight: "800", color: "#FFFFFF" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  
  // Attestation Banner
  attestationBanner: { backgroundColor: "#262626", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#333", marginBottom: 24 },
  attestationLabel: { color: "#8E8E93", fontSize: 10, fontWeight: "800", textTransform: "uppercase", marginBottom: 4 },
  attestationName: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", marginBottom: 8 },
  copyRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#161616", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, justifyContent: "space-between" },
  attestationId: { color: "#8E8E93", fontSize: 12, flex: 1, marginRight: 8, fontFamily: "monospace" },
  copyBadge: { backgroundColor: "#8AFF29", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  copyBadgeText: { color: "#000000", fontSize: 9, fontWeight: "900" },

  // Widget Companion
  widgetCard: { backgroundColor: "#262626", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#333", marginBottom: 24 },
  widgetTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", marginBottom: 6 },
  widgetDesc: { color: "#8E8E93", fontSize: 12, lineHeight: 16, marginBottom: 12 },
  widgetBtn: { height: 36, backgroundColor: "#8AFF29", borderRadius: 10, justifyContent: "center", alignItems: "center" },
  widgetBtnText: { color: "#000000", fontSize: 11, fontWeight: "800" },

  // Cards
  sectionCard: { borderWidth: 1, borderColor: "#333", backgroundColor: "#262626", borderRadius: 20, padding: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: "800", color: "#FFFFFF", marginBottom: 6 },
  descText: { fontSize: 13, color: "#8E8E93" },
  legalDetail: { fontSize: 11, color: "#8E8E93", marginTop: 12, lineHeight: 16 },
  inputLabel: { fontSize: 12, fontWeight: "700", color: "#FFFFFF", marginTop: 12, marginBottom: 6 },
  input: { height: 46, borderWidth: 1, borderColor: "#333", backgroundColor: "#161616", borderRadius: 10, paddingHorizontal: 14, color: "#FFFFFF", marginBottom: 16, fontSize: 13 },
  btnPrimary: { height: 46, borderRadius: 12, backgroundColor: "#8AFF29", justifyContent: "center", alignItems: "center", marginTop: 8 },
  btnText: { color: "#000000", fontSize: 13, fontWeight: "800", letterSpacing: 0.5 },
  btnDelete: { height: 46, borderRadius: 12, backgroundColor: "#FFD400", justifyContent: "center", alignItems: "center", marginTop: 8 }
});
