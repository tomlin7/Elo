import React, { useState } from "react";
import {
  Alert,
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
import * as Haptics from "expo-haptics";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Layout, Radius, Spacing } from "@/constants/design";

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
        { text: "Confirm Deletion", style: "destructive", onPress: executeDeletionRequest }
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
    <Screen>
      <ScreenHeader title="OPERATIONS & IDENTITY" onBack={() => router.replace("/(tabs)")} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Card style={styles.block}>
          <Text style={[styles.attestationLabel, { color: colors.textMuted }]}>Attested Corporate Identity</Text>
          <Text style={[styles.attestationName, { color: colors.text }]}>DHEERAJ CHARAUNGON</Text>
          <TouchableOpacity
            style={[styles.copyRow, { backgroundColor: colors.background }]}
            onPress={copyAttestation}
          >
            <Text style={[styles.attestationId, { color: colors.textMuted }]} numberOfLines={1}>
              {profile?.id || "dhe-17832-attestation-signature"}
            </Text>
            <View style={[styles.copyBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.copyBadgeText, { color: colors.onPrimary }]}>COPY</Text>
            </View>
          </TouchableOpacity>
        </Card>

        <Card style={styles.block}>
          <Text style={[styles.widgetTitle, { color: colors.text }]}>Streak Widget Companion</Text>
          <Text style={[styles.widgetDesc, { color: colors.textMuted }]}>
            Embed your active daily streak indicators directly on the device home-screen launcher layer.
          </Text>
          <Button
            label="INSTALL COMPANION"
            compact
            onPress={() => Alert.alert("Widget Shortcut", "Hold down on your home launcher screen to add ELO telemetry widgets.")}
          />
        </Card>

        <Card style={styles.block}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>CCPA / GDPR Consent Status</Text>
          <Text style={[styles.descText, { color: colors.textMuted }]}>Version ACCEPTED: v1.0.0</Text>
          <Text style={[styles.descText, { color: colors.textMuted }]}>
            Timestamp: {profile ? new Date(profile.privacy_consent_timestamp || Date.now()).toLocaleDateString() : "Now"}
          </Text>
          <Text style={[styles.legalDetail, { color: colors.textMuted }]}>
            We commit to collecting mathematical solving cadence data only for cheat verification. No telemetry variables map to private identifiers.
          </Text>
        </Card>

        <Card style={styles.block}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer Portal (Webhooks)</Text>
          <Text style={[styles.descText, { color: colors.textMuted }]}>
            Link outbound hooks to trigger external integrations on tournament finishes.
          </Text>

          <Text style={[styles.inputLabel, { color: colors.text }]}>Target Webhook URL</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.cardBorder, backgroundColor: colors.background, color: colors.text }]}
            placeholder="https://yourserver.com/webhook"
            placeholderTextColor={colors.textMuted}
            value={webhookUrl}
            onChangeText={setWebhookUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={[styles.inputLabel, { color: colors.text }]}>Secret Signature Token</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.cardBorder, backgroundColor: colors.background, color: colors.text }]}
            placeholder="secret_token"
            placeholderTextColor={colors.textMuted}
            value={webhookSecret}
            onChangeText={setWebhookSecret}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Button label="REGISTER WEBHOOK" onPress={handleRegisterWebhook} loading={loading} />
        </Card>

        <Card style={styles.block}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Right to Be Forgotten</Text>
          <Text style={[styles.descText, { color: colors.textMuted }]}>
            Cascades purges through users database tables, match telemetries, and archives.
          </Text>
          <Button label="DELETE ACCOUNT" variant="destructive" onPress={handleDeleteAccount} loading={loading} />
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl },
  block: { marginBottom: Spacing.xl, borderRadius: Radius.xl },
  attestationLabel: { fontSize: 10, fontWeight: "800", textTransform: "uppercase", marginBottom: 4 },
  attestationName: { fontSize: 15, fontWeight: "800", marginBottom: 8 },
  copyRow: { flexDirection: "row", alignItems: "center", borderRadius: Radius.sm, paddingHorizontal: 10, paddingVertical: 8, justifyContent: "space-between" },
  attestationId: { fontSize: 12, flex: 1, marginRight: 8, fontFamily: "monospace" },
  copyBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  copyBadgeText: { fontSize: 9, fontWeight: "900" },
  widgetTitle: { fontSize: 14, fontWeight: "800", marginBottom: 6 },
  widgetDesc: { fontSize: 12, lineHeight: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: "800", marginBottom: 6 },
  descText: { fontSize: 13 },
  legalDetail: { fontSize: 11, marginTop: 12, lineHeight: 16 },
  inputLabel: { fontSize: 12, fontWeight: "700", marginTop: 12, marginBottom: 6 },
  input: { height: Layout.inputHeight, borderWidth: 1, borderRadius: Radius.sm + 2, paddingHorizontal: 14, marginBottom: 16, fontSize: 13 },
});
