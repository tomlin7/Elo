import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, type ViewProps } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useThemeStore } from "@/src/store/themeStore";

type CardProps = ViewProps & {
  variant?: "default" | "dashed";
  onPress?: () => void;
  activeOpacity?: number;
};

export function Card({ style, variant = "default", onPress, children, ...props }: CardProps) {
  const { colors } = useThemeStore();
  const [isPressed, setIsPressed] = useState(false);

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

  const CardComponent = onPress ? TouchableOpacity : View;
  const cardProps = onPress
    ? {
        onPress,
        onPressIn: () => setIsPressed(true),
        onPressOut: () => setIsPressed(false),
        activeOpacity: 1,
      }
    : {};

  const innerDimensionsStyle = {
    width: width ? "100%" : undefined,
    height: height ? "100%" : undefined,
  };

  return (
    <View style={[styles.shadowContainer, containerStyle]}>
      {!isPressed && (
        <View style={[styles.shadowBlock, { backgroundColor: "#000000" }]} />
      )}
      <CardComponent
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
            borderStyle: variant === "dashed" ? "dashed" : "solid",
          },
          innerDimensionsStyle,
          innerStyle,
          isPressed && { transform: [{ translateX: 7 }, { translateY: 7 }] },
        ]}
        {...cardProps}
        {...props}
      >
        {children}
      </CardComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative",
    marginBottom: 7,
    marginRight: 7,
  },
  shadowBlock: {
    position: "absolute",
    top: 7,
    left: 7,
    right: -7,
    bottom: -7,
    borderRadius: Radius.lg,
  },
  card: {
    borderWidth: 3,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
});
