import { create } from "zustand";
import { appStorage } from "../utils/storage.ts";

export interface ThemeColors {
  background: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  accent: string;
  accentMuted: string;
  danger: string;
  success: string;
  correctFlash: string;
  wrongFlash: string;
}

export type ThemeId = "dark" | "dracula" | "nord" | "cyberpunk" | "light";

export const THEMES: Record<ThemeId, ThemeColors> = {
  dark: {
    background: "#09090B",
    cardBg: "#18181B",
    cardBorder: "#000000",
    text: "#FFFFFF",
    textMuted: "#71717A",
    primary: "#2563EB",
    onPrimary: "#FFFFFF",
    accent: "#F59E0B",
    accentMuted: "rgba(245, 158, 11, 0.15)",
    danger: "#EF4444",
    success: "#10B981",
    correctFlash: "rgba(16, 185, 129, 0.25)",
    wrongFlash: "rgba(239, 68, 68, 0.25)",
  },
  dracula: {
    background: "#282A36",
    cardBg: "#44475A",
    cardBorder: "#000000",
    text: "#F8F8F2",
    textMuted: "#6272A4",
    primary: "#BD93F9",
    onPrimary: "#000000",
    accent: "#50FA7B",
    accentMuted: "rgba(80, 250, 123, 0.2)",
    danger: "#FF5555",
    success: "#50FA7B",
    correctFlash: "rgba(80, 250, 123, 0.3)",
    wrongFlash: "rgba(255, 85, 85, 0.3)",
  },
  nord: {
    background: "#2E3440",
    cardBg: "#3B4252",
    cardBorder: "#000000",
    text: "#ECEFF4",
    textMuted: "#D8DEE9",
    primary: "#88C0D0",
    onPrimary: "#2E3440",
    accent: "#A3BE8C",
    accentMuted: "rgba(163, 190, 140, 0.2)",
    danger: "#BF616A",
    success: "#A3BE8C",
    correctFlash: "rgba(163, 190, 140, 0.3)",
    wrongFlash: "rgba(191, 97, 106, 0.3)",
  },
  cyberpunk: {
    background: "#120224",
    cardBg: "rgba(255, 0, 127, 0.05)",
    cardBorder: "#000000",
    text: "#FFFFFF",
    textMuted: "rgba(0, 240, 255, 0.5)",
    primary: "#FF007F",
    onPrimary: "#000000",
    accent: "#00F0FF",
    accentMuted: "rgba(0, 240, 255, 0.2)",
    danger: "#FF007F",
    success: "#00F0FF",
    correctFlash: "rgba(0, 240, 255, 0.3)",
    wrongFlash: "rgba(255, 0, 127, 0.3)",
  },
  light: {
    background: "#F8FAFC",
    cardBg: "#FFFFFF",
    cardBorder: "#000000",
    text: "#0F172A",
    textMuted: "#64748B",
    primary: "#4F46E5",
    onPrimary: "#FFFFFF",
    accent: "#059669",
    accentMuted: "rgba(5, 150, 105, 0.15)",
    danger: "#DC2626",
    success: "#059669",
    correctFlash: "rgba(5, 150, 105, 0.2)",
    wrongFlash: "rgba(220, 38, 38, 0.2)",
  }
};

interface ThemeState {
  themeId: ThemeId;
  colors: ThemeColors;
  setTheme: (id: ThemeId) => void;
}

const initialThemeId = (appStorage.getString("elo_selected_theme_id") as ThemeId) || "dark";

export const useThemeStore = create<ThemeState>((set) => ({
  themeId: initialThemeId,
  colors: THEMES[initialThemeId] || THEMES.dark,
  setTheme: (id: ThemeId) => {
    appStorage.set("elo_selected_theme_id", id);
    set({ themeId: id, colors: THEMES[id] });
  }
}));
