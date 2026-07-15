import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useThemeStore } from "../src/store/themeStore";
import { Radius, Spacing } from "@/constants/design";

interface KeypadProps {
  onPress: (value: string) => void;
}

export function Keypad({ onPress }: KeypadProps) {
  const { colors } = useThemeStore();

  const handlePress = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(value);
  };

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["-", "0", "delete"],
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderTopColor: colors.cardBorder }]}>
      {keys.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((key) => {
            const isDelete = key === "delete";
            const isMinus = key === "-";
            const display = isDelete ? "⌫" : key;

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.7}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => handlePress(key)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: colors.text },
                  ]}
                >
                  {display}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm + 2,
  },
  button: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
  },
});
