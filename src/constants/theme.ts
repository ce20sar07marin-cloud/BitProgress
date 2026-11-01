import { Platform } from "react-native";

export const colors = {
  primary: "#6D4AFF",
  primaryDark: "#5C3AE6",
  primarySoft: "#E8E0FF",
  primarySoftAlt: "#F0EBFF",

  backgroundLight: "#F8F7FC",
  surface: "#FFFFFF",
  surfaceWarm: "#F5F3FA",

  textMain: "#1A1625",
  textSecondary: "#5A5470",
  textOnPrimary: "#FFFFFF",
  placeholder: "#9B95AD",

  border: "#DDD8EC",
  borderFocus: "#6D4AFF",
  borderInput: "#D0CAE3",

  success: "#10B981",
  successSoft: "#ECFDF5",
  error: "#EF4444",
  errorSoft: "#FEF2F2",

  disabled: "#CDC8DB",
  disabledText: "#8A849A",

  illustrationBg: "#EDE7FF",
  illustrationBgAlt: "#F5F1FF",
  illustrationOverlay: "rgba(255,255,255,0.12)",

  shadow: "rgba(109,74,255,0.10)",
  shadowDark: "rgba(0,0,0,0.06)",

  overlay: "rgba(0,0,0,0.45)",

  tabBarBg: "#FFFFFF",
  tabBarBorder: "#DDD8EC",
  tabBarActive: "#6D4AFF",
  tabBarInactive: "#5A5470",

  dark: {
    background: "#17161D",
    surface: "#23212B",
    text: "#F4F1FF",
    border: "#353246",
    textSecondary: "#9E99AD",
    surfaceAlt: "#2A2834",
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  full: 999,
} as const;

export const font = {
  family: {
    regular: "Poppins_400Regular" as const,
    medium: "Poppins_500Medium" as const,
    semibold: "Poppins_600SemiBold" as const,
    bold: "Poppins_700Bold" as const,
  },
  size: {
    xs: 11,
    sm: 13,
    md: 15,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const shadow = Platform.select({
  ios: {
    sm: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    md: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    lg: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
    },
  },
  android: {
    sm: { elevation: 2 },
    md: { elevation: 4 },
    lg: { elevation: 8 },
  },
  default: {
    sm: { boxShadow: `0 2px 8px ${colors.shadow}` },
    md: { boxShadow: `0 4px 16px ${colors.shadow}` },
    lg: { boxShadow: `0 8px 24px ${colors.shadow}` },
  },
}) as {
  sm: Record<string, unknown>;
  md: Record<string, unknown>;
  lg: Record<string, unknown>;
};

export const typography = {
  heading: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.textMain,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    color: colors.textMain,
  },
  body: {
    fontSize: font.size.base,
    fontWeight: font.weight.regular,
    color: colors.textMain,
    lineHeight: 24,
  },
  caption: {
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
  },
  label: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: colors.textMain,
  },
} as const;
