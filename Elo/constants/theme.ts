/**
 * Legacy Expo theme bridge — delegates to the Elo design system.
 * Prefer useThemeStore() for runtime theming in app screens.
 */

import { Platform } from "react-native";
import { Palette } from "./design";

const tintColorLight = Palette.lime;
const tintColorDark = Palette.lime;

export const Colors = {
  light: {
    text: "#0F172A",
    background: "#F8FAFC",
    tint: tintColorLight,
    icon: Palette.muted,
    tabIconDefault: Palette.muted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: Palette.white,
    background: Palette.charcoal,
    tint: tintColorDark,
    icon: Palette.muted,
    tabIconDefault: Palette.muted,
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export { Palette, Spacing, Radius, Typography, Layout } from "./design";
