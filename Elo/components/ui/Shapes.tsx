import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";

interface ShapeProps {
  color: string;
  size?: number;
  style?: ViewStyle;
}

// 8-pointed starburst
export const StarburstShape: React.FC<ShapeProps> = ({ color, size = 60, style }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <Path
      d="M50 0 L55 35 L90 20 L65 45 L100 50 L65 55 L90 80 L55 65 L50 100 L45 65 L10 80 L35 55 L0 50 L35 45 L10 20 L45 35 Z"
      fill={color}
    />
  </Svg>
);

// Sharp zig-zag
export const ZigZagShape: React.FC<ShapeProps> = ({ color, size = 60, style }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <Path
      d="M 5,80 L 25,20 L 45,80 L 65,20 L 85,80 L 95,50"
      fill="none"
      stroke={color}
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Combined smooth dumbbell / capsule shape
export const DumbbellShape: React.FC<ShapeProps> = ({ color, size = 60, style }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <Path
      d="M 25 20 C 40 20, 45 45, 50 45 C 55 45, 60 20, 75 20 C 90 20, 100 32, 100 50 C 100 68, 90 80, 75 80 C 60 80, 55 55, 50 55 C 45 55, 40 80, 25 80 C 10 80, 0 68, 0 50 C 0 32, 10 20, 25 20 Z"
      fill={color}
    />
  </Svg>
);

// Standard smooth heart shape
export const HeartShape: React.FC<ShapeProps> = ({ color, size = 60, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
    />
  </Svg>
);

// 4-pointed sparkle star
export const SparkleShape: React.FC<ShapeProps> = ({ color, size = 60, style }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <Path
      d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z"
      fill={color}
    />
  </Svg>
);

// Daily Challenge Puzzle Graphics
export const SudokuIllustration = () => (
  <Svg width={64} height={64} viewBox="0 0 100 100">
    <Rect x="0" y="0" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.6" />
    <Rect x="26" y="0" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.8" />
    <Rect x="52" y="0" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.4" />
    <Rect x="78" y="0" width="20" height="20" rx="4" fill="#A6E3A1" opacity="1" />
    <Rect x="0" y="26" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.9" />
    <Rect x="26" y="26" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.3" />
    <Rect x="52" y="26" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.7" />
    <Rect x="78" y="26" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.5" />
    <Rect x="0" y="52" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.5" />
    <Rect x="26" y="52" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.9" />
    <Rect x="52" y="52" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.4" />
    <Rect x="78" y="52" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.8" />
    <Rect x="0" y="78" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.8" />
    <Rect x="26" y="78" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.5" />
    <Rect x="52" y="78" width="20" height="20" rx="4" fill="#A6E3A1" opacity="1" />
    <Rect x="78" y="78" width="20" height="20" rx="4" fill="#A6E3A1" opacity="0.3" />
  </Svg>
);

export const CrossMathIllustration = () => (
  <Svg width={64} height={64} viewBox="0 0 100 100">
    <Rect x="38" y="0" width="24" height="100" rx="6" fill="#89B4FA" opacity="0.4" />
    <Rect x="0" y="38" width="100" height="24" rx="6" fill="#89B4FA" opacity="0.6" />
    <Rect x="38" y="38" width="24" height="24" rx="6" fill="#89B4FA" opacity="1" />
    <Path d="M12 12 h10 M17 7 v10" stroke="#CDD6F4" strokeWidth="4" strokeLinecap="round" />
    <Path d="M78 78 h10 M83 73 v10" stroke="#CDD6F4" strokeWidth="4" strokeLinecap="round" />
  </Svg>
);

export const KenKenIllustration = () => (
  <Svg width={64} height={64} viewBox="0 0 100 100">
    <Rect x="5" y="5" width="40" height="40" rx="8" fill="none" stroke="#F9E2AF" strokeWidth="6" />
    <Rect x="50" y="5" width="45" height="85" rx="8" fill="none" stroke="#F9E2AF" strokeWidth="6" />
    <Rect x="5" y="50" width="40" height="40" rx="8" fill="none" stroke="#F9E2AF" strokeWidth="6" opacity="0.5" />
  </Svg>
);

export const MathMazeIllustration = () => (
  <Svg width={64} height={64} viewBox="0 0 100 100">
    <Path d="M 20 20 L 50 80 L 80 20" fill="none" stroke="#CBA6F7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="20" cy="20" r="12" fill="#CBA6F7" />
    <Circle cx="50" cy="80" r="12" fill="#CDD6F4" />
    <Circle cx="80" cy="20" r="12" fill="#CBA6F7" />
  </Svg>
);

interface CompositionProps {
  type: "slide1" | "slide2" | "slide3" | "sprint" | "first" | "miniDecor";
  size?: number;
}

export const ShapesComposition: React.FC<CompositionProps> = ({ type, size = 120 }) => {
  switch (type) {
    case "slide1":
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <StarburstShape color="#F9E2AF" size={size * 0.5} style={styles.topRight} />
          <DumbbellShape color="#CBA6F7" size={size * 0.6} style={styles.bottomLeft} />
        </View>
      );
    case "slide2":
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <ZigZagShape color="#89B4FA" size={size * 0.5} style={styles.topLeft} />
          <SparkleShape color="#A6E3A1" size={size * 0.5} style={styles.bottomRight} />
        </View>
      );
    case "slide3":
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <HeartShape color="#F38BA8" size={size * 0.5} style={styles.center} />
          <StarburstShape color="#F9E2AF" size={size * 0.4} style={styles.bottomLeft} />
        </View>
      );
    case "sprint":
      return (
        <View style={styles.inlineBox}>
          <ZigZagShape color="#89B4FA" size={32} />
          <StarburstShape color="#F9E2AF" size={24} style={{ marginLeft: 8 }} />
        </View>
      );
    case "first":
      return (
        <View style={styles.inlineBox}>
          <DumbbellShape color="#CBA6F7" size={38} />
          <SparkleShape color="#A6E3A1" size={22} style={{ marginLeft: 8 }} />
        </View>
      );
    case "miniDecor":
      return (
        <View style={styles.miniRow}>
          <SparkleShape color="#A6E3A1" size={16} />
          <ZigZagShape color="#89B4FA" size={18} style={{ marginLeft: 6 }} />
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  box: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  inlineBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  topLeft: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  center: {
    position: "absolute",
  },
});
