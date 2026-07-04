import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";

interface KeypadProps {
  onPress: (value: string) => void;
}

export function Keypad({ onPress }: KeypadProps) {
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
    <View style={styles.container}>
      {keys.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((key) => {
            const isDelete = key === "delete";
            const display = isDelete ? "⌫" : key;

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.65}
                style={[
                  styles.button,
                  isDelete && styles.deleteButton,
                  key === "-" && styles.minusButton,
                ]}
                onPress={() => handlePress(key)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    (isDelete || key === "-") && styles.specialButtonText,
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
    backgroundColor: "rgba(10, 10, 12, 0.95)",
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  deleteButton: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  minusButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  specialButtonText: {
    fontSize: 22,
    color: "#E2E8F0",
  },
});
