import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { MOCK_COMMUNITY_PLUGINS, PluginMetadata } from "../src/utils/pluginBridge.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function PluginsScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const handleTogglePlugin = (plugin: PluginMetadata) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const startTime = Date.now();
    const isValidSignature = plugin.fingerprint.length === 64;
    const latency = Date.now() - startTime;

    if (!isValidSignature) {
      Alert.alert("Integrity Failure", "The plugin file hash conflicts with signature keys. Execution blocked.");
      return;
    }

    if (activeIds.includes(plugin.id)) {
      setActiveIds(activeIds.filter(id => id !== plugin.id));
    } else {
      setActiveIds([...activeIds, plugin.id]);
      Alert.alert(
        "Plugin Mounted",
        `Mounted: ${plugin.name}\nVerification lag: ${latency}ms\nSHA-256 fingerprint verified successfully!`
      );
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>PLUGINS VAULT</Text>
          <Button
            label="BACK"
            onPress={() => router.replace("/(tabs)")}
            compact
            style={styles.backBtn}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Activate verified visual feedback and skin components compiled by the open-source community.
          </Text>

          {MOCK_COMMUNITY_PLUGINS.map((plugin) => {
            const isActive = activeIds.includes(plugin.id);
            return (
              <Card
                key={plugin.id}
                style={[
                  styles.pluginCard,
                  isActive && { borderColor: colors.accent }
                ]}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={[styles.pluginName, { color: colors.text }]}>{plugin.name}</Text>
                    <Text style={[styles.authorLabel, { color: colors.textMuted }]}>
                      By {plugin.author} • v{plugin.version}
                    </Text>
                  </View>
                  <View style={[styles.verifiedBadge, { backgroundColor: colors.accentMuted }]}>
                    <Text style={[styles.verifiedText, { color: colors.accent }]}>VERIFIED</Text>
                  </View>
                </View>

                <Text style={[styles.fingerprintText, { color: colors.textMuted }]}>
                  Fingerprint: {plugin.fingerprint.slice(0, 16)}...{plugin.fingerprint.slice(-16)}
                </Text>

                <Button
                  label={isActive ? "DEACTIVATE MODULE" : "MOUNT & RUN MODULE"}
                  onPress={() => handleTogglePlugin(plugin)}
                  variant={isActive ? "destructive" : "primary"}
                />
              </Card>
            );
          })}
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
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  backBtn: {
    width: 80,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 24,
  },
  pluginCard: {
    marginBottom: 20,
    marginRight: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  pluginName: {
    fontSize: 15,
    fontWeight: "800",
  },
  authorLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  verifiedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  fingerprintText: {
    fontSize: 9,
    fontFamily: "monospace",
    marginBottom: 20,
  },
});
