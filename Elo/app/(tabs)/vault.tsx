import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useProfileStore } from "../../src/store/profileStore.ts";
import { useThemeStore, ThemeId, THEMES } from "../../src/store/themeStore.ts";
import { getBackendUrls } from "../../src/utils/auth.ts";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Rect } from "react-native-svg";
import * as Haptics from "expo-haptics";

interface ShopItem {
  id: string;
  name: string;
  type: "theme" | "title" | "border";
  cost: number;
  description: string;
  themeId?: ThemeId;
  borderSvg?: React.ReactNode;
}

export default function CosmeticsVault() {
  const { profile, updateStats } = useProfileStore();
  const { themeId, setTheme, colors } = useThemeStore();
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const shopItems: ShopItem[] = [
    // Themes
    {
      id: "dracula",
      name: "Dracula Mode",
      type: "theme",
      cost: 200,
      description: "Gothic dark purple backdrop with neon highlights.",
      themeId: "dracula"
    },
    {
      id: "nord",
      name: "Nord Frost",
      type: "theme",
      cost: 400,
      description: "Arctic, cool grey-blue palette for clean focus.",
      themeId: "nord"
    },
    {
      id: "cyberpunk",
      name: "Neon Cyberpunk",
      type: "theme",
      cost: 800,
      description: "High-contrast synthetic pink & glowing cyan.",
      themeId: "cyberpunk"
    },
    {
      id: "light",
      name: "Monochrome Light",
      type: "theme",
      cost: 150,
      description: "Sleek, clinical white style.",
      themeId: "light"
    },
    // Titles
    {
      id: "title_genius",
      name: "Math Genius",
      type: "title",
      cost: 100,
      description: "Title badge displayed in matchmaking lobbies."
    },
    {
      id: "title_speedy",
      name: "Speed Demon",
      type: "title",
      cost: 300,
      description: "Title badge for ultra-fast arithmetic solvers."
    },
    {
      id: "title_champion",
      name: "Grandmaster",
      type: "title",
      cost: 600,
      description: "Elite title badge reserved for math champions."
    }
  ];

  const handlePurchase = async (item: ShopItem) => {
    if (!profile) return;
    if (profile.credits < item.cost) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Insufficient Credits", "Earn credits by completing daily streak matches and leveling up!");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoadingItemId(item.id);

    try {
      const urls = getBackendUrls();
      const res = await fetch(`${urls.http}/api/shop/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: profile.id,
          itemId: item.id,
          cost: item.cost
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Purchase failed");
      }

      const data = await res.json();
      
      // Update local Zustand store
      updateStats({
        credits: profile.credits - item.cost,
        unlockedThemes: data.unlockedThemes
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success!", `${item.name} is now unlocked!`);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to make purchase");
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleSelect = async (item: ShopItem) => {
    if (!profile) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoadingItemId(item.id);

    try {
      const urls = getBackendUrls();
      const targetTheme = item.type === "theme" ? item.themeId : profile.unlockedThemes.includes(themeId) ? themeId : "dark";
      const targetTitle = item.type === "title" ? item.name : profile.activeTitle;

      const res = await fetch(`${urls.http}/api/shop/select-theme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: profile.id,
          themeId: targetTheme,
          activeTitle: targetTitle
        })
      });

      if (!res.ok) throw new Error("Selection failed");

      // Update local state
      if (item.type === "theme" && item.themeId) {
        setTheme(item.themeId);
      }
      updateStats({
        activeTitle: targetTitle
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err: any) {
      Alert.alert("Error", "Failed to select item");
    } finally {
      setLoadingItemId(null);
    }
  };

  const renderItem = ({ item }: { item: ShopItem }) => {
    if (!profile) return null;

    const isTheme = item.type === "theme";
    const isUnlocked = isTheme 
      ? (item.id === "dark" || profile.unlockedThemes.includes(item.id))
      : profile.unlockedThemes.includes(item.id);

    const isActive = isTheme
      ? themeId === item.themeId
      : profile.activeTitle === item.name;

    return (
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{item.type.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={[styles.itemDesc, { color: colors.textMuted }]}>{item.description}</Text>

        <View style={styles.cardFooter}>
          {isUnlocked ? (
            <TouchableOpacity
              style={[
                styles.actionBtn,
                isActive ? { backgroundColor: colors.accentMuted, borderColor: colors.accent } : { backgroundColor: "rgba(255,255,255,0.05)", borderColor: colors.cardBorder }
              ]}
              onPress={() => handleSelect(item)}
              disabled={loadingItemId !== null || isActive}
            >
              {loadingItemId === item.id ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={[styles.actionText, { color: isActive ? colors.accent : colors.text }]}>
                  {isActive ? "ACTIVE" : "EQUIP"}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.buyBtn, { backgroundColor: colors.primary }]}
              onPress={() => handlePurchase(item)}
              disabled={loadingItemId !== null}
            >
              {loadingItemId === item.id ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buyBtnText}>BUY - {item.cost} CREDITS</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>COSMETICS VAULT</Text>
          <View style={[styles.creditsBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.creditsText, { color: colors.accent }]}>
              {profile ? profile.credits : 0} 
            </Text>
            <Text style={[styles.creditsLabel, { color: colors.textMuted }]}> CREDITS</Text>
          </View>
        </View>

        <FlatList
          data={shopItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  creditsBox: {
    flexDirection: "row",
    alignItems: "baseline",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  creditsText: {
    fontSize: 20,
    fontWeight: "900",
  },
  creditsLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "800",
  },
  badge: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  itemDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    alignItems: "flex-end",
  },
  buyBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
