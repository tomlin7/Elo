import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const [isPressed, setIsPressed] = useState(false);

  const palette = {
    primary: { bg: colors.primary, text: colors.onPrimary, border: "#000000" },
    secondary: { bg: colors.cardBg, text: colors.text, border: "#000000" },
    destructive: { bg: colors.danger, text: colors.onPrimary, border: "#000000" },
    ghost: { bg: "transparent", text: colors.textMuted, border: "transparent" },
  }[variant];

  const buttonHeight = compact ? 38 : Layout.buttonHeight;
  const borderRadius = compact ? Radius.sm : Radius.md;

  if (variant === "ghost") {
    return (
      <TouchableOpacity
        style={[
          styles.base,
          {
            height: buttonHeight,
            borderRadius: borderRadius,
            backgroundColor: palette.bg,
            borderColor: palette.border,
            borderWidth: 1,
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

  // Extract layout-related properties from style
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const {
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    flex,
    width,
    alignSelf,
    position,
    top,
    left,
    right,
    bottom,
    ...innerStyle
  } = flattenedStyle;

  const containerStyle = {
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    flex,
    width,
    alignSelf,
    position,
    top,
    left,
    right,
    bottom,
  };

  return (
    <View style={[styles.shadowContainer, containerStyle]}>
      {!isPressed && (
        <View style={[styles.shadowBlock, { borderRadius: borderRadius, backgroundColor: "#000000" }]} />
      )}
      <TouchableOpacity
        style={[
          styles.base,
          {
            height: buttonHeight,
            borderRadius: borderRadius,
            backgroundColor: palette.bg,
            borderColor: palette.border,
            borderWidth: 3,
            opacity: disabled || loading ? 0.6 : 1,
          },
          innerStyle,
          isPressed && { transform: [{ translateX: 6 }, { translateY: 6 }] },
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={1}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={palette.text} />
        ) : (
          <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative",
    marginBottom: 6,
    marginRight: 6,
  },
  shadowBlock: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
  },
  base: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  label: {
    ...Typography.button,
  },
});
