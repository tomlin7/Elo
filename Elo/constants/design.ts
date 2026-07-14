/**
 * Elo design system — Matte Charcoal & Electric Lime
 * Shared spacing, typography, radii, and semantic palette tokens.
 */

export const Palette = {
  charcoal: "#161616",
  charcoalDeep: "#0A0A0C",
  surface: "#262626",
  border: "#333333",
  lime: "#8AFF29",
  limeDark: "#6BD41F",
  amber: "#FFD400",
  white: "#FFFFFF",
  muted: "#8E8E93",
  black: "#000000",
  danger: "#EF4444",
  success: "#00E676",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const Typography = {
  hero: { fontSize: 44, fontWeight: "900" as const, letterSpacing: 8 },
  title: { fontSize: 28, fontWeight: "900" as const, letterSpacing: 2 },
  heading: { fontSize: 18, fontWeight: "800" as const },
  subheading: { fontSize: 15, fontWeight: "700" as const },
  body: { fontSize: 14, fontWeight: "400" as const, lineHeight: 20 },
  bodyBold: { fontSize: 14, fontWeight: "700" as const },
  caption: { fontSize: 12, fontWeight: "600" as const, lineHeight: 16 },
  label: { fontSize: 11, fontWeight: "800" as const, letterSpacing: 1.5 },
  micro: { fontSize: 10, fontWeight: "700" as const },
  button: { fontSize: 13, fontWeight: "800" as const, letterSpacing: 0.5 },
} as const;

export const Layout = {
  screenPadding: Spacing.xl,
  cardPadding: Spacing.lg,
  buttonHeight: 48,
  inputHeight: 46,
  tabBarHeight: 56,
} as const;
