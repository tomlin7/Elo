import React from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import { Spacing, Typography } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

export function SectionLabel({ style, ...props }: TextProps) {
  const { colors } = useThemeStore();
  return (
    <Text
      style={[styles.label, { color: colors.textMuted }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    ...Typography.label,
    marginLeft: Spacing.lg,
    marginBottom: Spacing.sm + 2,
    textTransform: "uppercase",
  },
});
