import React from "react";
import { SafeAreaView, StyleSheet, View, type ViewProps } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "@/src/store/themeStore";

type ScreenProps = ViewProps & {
  edges?: boolean;
  statusBarStyle?: "light" | "dark" | "auto";
};

export function Screen({
  style,
  children,
  edges = true,
  statusBarStyle,
  ...props
}: ScreenProps) {
  const { colors, themeId } = useThemeStore();
  const barStyle = statusBarStyle ?? (themeId === "light" ? "dark" : "light");

  const content = (
    <>
      <StatusBar style={barStyle} />
      <View style={[styles.inner, { backgroundColor: colors.background }, style]} {...props}>
        {children}
      </View>
    </>
  );

  if (edges) {
    return <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>{content}</SafeAreaView>;
  }

  return content;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1 },
});
