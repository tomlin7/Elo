import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

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
          <Text style={[styles.icon, { color: colors.primary }]}>{stat.icon}</Text>
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
    borderWidth: 1,
  },
  icon: {
    fontSize: 14,
    fontWeight: "800",
    marginRight: 6,
  },
  value: {
    fontSize: 12,
    fontWeight: "700",
  },
});
