import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

type CardProps = ViewProps & {
  variant?: "default" | "dashed";
};

export function Card({ style, variant = "default", children, ...props }: CardProps) {
  const { colors } = useThemeStore();

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
    height,
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
    height,
    alignSelf,
    position,
    top,
    left,
    right,
    bottom,
  };

  return (
    <View style={[styles.shadowContainer, containerStyle]}>
      <View style={[styles.shadowBlock, { backgroundColor: "#000000" }]} />
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
            borderStyle: variant === "dashed" ? "dashed" : "solid",
          },
          innerStyle,
        ]}
        {...props}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative",
    marginBottom: 5,
    marginRight: 5,
  },
  shadowBlock: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    borderRadius: Radius.lg,
  },
  card: {
    borderWidth: 2,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
});
