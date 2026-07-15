import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Spacing, Typography } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
};

export function ScreenHeader({ title, subtitle, onBack, showBack = true }: ScreenHeaderProps) {
  const router = useRouter();
  const { colors } = useThemeStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.titles}>
        <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {showBack ? (
        <TouchableOpacity
          style={[styles.backBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
          onPress={handleBack}
        >
          <Text style={[styles.backText, { color: colors.text }]}>BACK</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  titles: { flex: 1, marginRight: Spacing.md },
  title: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  subtitle: {
    ...Typography.label,
    marginTop: 2,
    textTransform: "uppercase",
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  backText: {
    fontSize: 12,
    fontWeight: "800",
  },
});
