import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

type CardProps = ViewProps & {
  variant?: "default" | "dashed";
};

export function Card({ style, variant = "default", children, ...props }: CardProps) {
  const { colors } = useThemeStore();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
          borderStyle: variant === "dashed" ? "dashed" : "solid",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
});
