import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { Layout, Radius, Typography } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  compact?: boolean;
};

export function Button({
  label,
  variant = "primary",
  loading = false,
  compact = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors } = useThemeStore();

  const palette = {
    primary: { bg: colors.primary, text: colors.onPrimary, border: colors.primary },
    secondary: { bg: colors.cardBg, text: colors.text, border: colors.cardBorder },
    destructive: { bg: colors.danger, text: colors.onPrimary, border: colors.danger },
    ghost: { bg: "transparent", text: colors.textMuted, border: colors.cardBorder },
  }[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        compact && styles.compact,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          opacity: disabled || loading ? 0.6 : 1,
        },
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: Layout.buttonHeight,
    borderRadius: Radius.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  compact: {
    height: 38,
    borderRadius: Radius.sm,
  },
  label: {
    ...Typography.button,
  },
});
