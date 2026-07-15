import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";
import { IconSymbol } from "@/components/ui/icon-symbol";

type Stat = { icon: string; value: string };

type StatCapsuleRowProps = {
  stats: Stat[];
};

export function StatCapsuleRow({ stats }: StatCapsuleRowProps) {
  const { colors } = useThemeStore();

  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View
          key={stat.value}
          style={[
            styles.capsule,
            { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
          ]}
        >
          <IconSymbol name={stat.icon as any} size={14} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={[styles.value, { color: colors.text }]}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg + 4,
    marginBottom: Spacing.lg + 4,
  },
  capsule: {
    flexDirection: "row",
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    alignItems: "center",
    borderWidth: 2,
  },
  value: {
    fontSize: 12,
    fontWeight: "700",
  },
});
