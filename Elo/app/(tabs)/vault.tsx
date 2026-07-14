import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useProfileStore } from "../../src/store/profileStore.ts";
import { useThemeStore, ThemeId } from "../../src/store/themeStore.ts";
import { getBackendUrls } from "../../src/utils/auth.ts";
import * as Haptics from "expo-haptics";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing, Radius, Typography } from "@/constants/design";

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
    } catch (err) {
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
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
          <View style={[styles.badge, { backgroundColor: colors.cardBorder }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{item.type.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={[styles.itemDesc, { color: colors.textMuted }]}>{item.description}</Text>

        <View style={styles.cardFooter}>
          {isUnlocked ? (
            <Button
              label={isActive ? "ACTIVE" : "EQUIP"}
              variant={isActive ? "ghost" : "secondary"}
              onPress={() => handleSelect(item)}
              loading={loadingItemId === item.id}
              disabled={loadingItemId !== null || isActive}
              compact
              style={styles.actionBtn}
            />
          ) : (
            <Button
              label={`BUY - ${item.cost} CREDITS`}
              variant="primary"
              onPress={() => handlePurchase(item)}
              loading={loadingItemId === item.id}
              disabled={loadingItemId !== null}
              compact
              style={styles.buyBtn}
            />
          )}
        </View>
      </Card>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>COSMETICS VAULT</Text>
          <View style={[styles.creditsBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <IconSymbol name="dollarsign.circle.fill" size={14} color={colors.primary} style={{ marginRight: 6 }} />
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  title: {
    ...Typography.title,
    fontSize: 22,
  },
  creditsBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.md,
    borderWidth: 2,
  },
  creditsText: {
    fontSize: 20,
    fontWeight: "900",
  },
  creditsLabel: {
    ...Typography.caption,
    fontSize: 10,
    textTransform: "uppercase",
  },
  list: {
    paddingBottom: Spacing.xxxl,
  },
  card: {
    marginBottom: Spacing.lg,
    marginRight: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  itemName: {
    ...Typography.heading,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  badgeText: {
    ...Typography.caption,
    fontSize: 9,
    textTransform: "uppercase",
  },
  itemDesc: {
    ...Typography.body,
    marginBottom: Spacing.lg,
  },
  cardFooter: {
    alignItems: "flex-end",
  },
  buyBtn: {
    paddingHorizontal: Spacing.lg,
    height: 38,
  },
  actionBtn: {
    paddingHorizontal: Spacing.lg,
    height: 38,
  },
});
