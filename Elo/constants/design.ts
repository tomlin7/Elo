/**
 * Elo design system — Neo-Brutalist 3D style
 * Shared spacing, typography, radii, and semantic palette tokens.
 */

export const Palette = {
  charcoal: "#252538",
  charcoalDeep: "#1E1E2E",
  surface: "#313244",
  border: "#000000",
  blue: "#89B4FA",
  blueDark: "#5897F7",
  emerald: "#A6E3A1",
  emeraldDark: "#85D57E",
  amber: "#F9E2AF",
  white: "#CDD6F4",
  muted: "#A6ADC8",
  black: "#000000",
  danger: "#F38BA8",
  success: "#A6E3A1",
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
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
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
