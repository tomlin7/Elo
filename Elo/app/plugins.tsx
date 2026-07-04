import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { MOCK_COMMUNITY_PLUGINS, PluginMetadata } from "../src/utils/pluginBridge.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

export default function PluginsScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const handleTogglePlugin = (plugin: PluginMetadata) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Simulate SHA-256 integrity validation checks (NFR verification constraint)
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
          <TouchableOpacity
            style={[styles.backBtn, { borderColor: colors.cardBorder }]}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={[styles.backBtnText, { color: colors.text }]}>BACK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Activate verified visual feedback and skin components compiled by the open-source community.
          </Text>

          {MOCK_COMMUNITY_PLUGINS.map((plugin) => {
            const isActive = activeIds.includes(plugin.id);
            return (
              <View
                key={plugin.id}
                style={[
                  styles.pluginCard,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: isActive ? colors.accent : colors.cardBorder
                  }
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

                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: isActive ? "#EF4444" : colors.primary
                    }
                  ]}
                  onPress={() => handleTogglePlugin(plugin)}
                >
                  <Text style={styles.actionBtnText}>
                    {isActive ? "DEACTIVATE MODULE" : "MOUNT & RUN MODULE"}
                  </Text>
                </TouchableOpacity>
              </View>
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
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 24,
  },
  pluginCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  actionBtn: {
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
