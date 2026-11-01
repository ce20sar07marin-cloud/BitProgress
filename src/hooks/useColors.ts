import { useTheme } from "@/context/ThemeContext";

const light = {
  primary: "#6D4AFF",
  primaryDark: "#5C3AE6",
  primarySoft: "#E8E0FF",
  primarySoftAlt: "#F0EBFF",

  background: "#F8F7FC",
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

  shadow: "rgba(109,74,255,0.10)",

  overlay: "rgba(0,0,0,0.45)",

  tabBarBg: "#FFFFFF",
  tabBarBorder: "#DDD8EC",
  tabBarActive: "#6D4AFF",
  tabBarInactive: "#5A5470",
} as const;

const dark = {
  primary: "#6D4AFF",
  primaryDark: "#5C3AE6",
  primarySoft: "#2A2640",
  primarySoftAlt: "#322E4A",

  background: "#17161D",
  surface: "#23212B",
  surfaceWarm: "#2A2834",

  textMain: "#F4F1FF",
  textSecondary: "#9E99AD",
  textOnPrimary: "#FFFFFF",
  placeholder: "#6E6A7E",

  border: "#353246",
  borderFocus: "#6D4AFF",
  borderInput: "#3D3A50",

  success: "#34D399",
  successSoft: "#1A2E24",
  error: "#F87171",
  errorSoft: "#2E1A1A",

  disabled: "#353246",
  disabledText: "#6E6A7E",

  illustrationBg: "#2A2640",
  illustrationBgAlt: "#322E4A",

  shadow: "rgba(0,0,0,0.3)",

  overlay: "rgba(0,0,0,0.65)",

  tabBarBg: "#23212B",
  tabBarBorder: "#353246",
  tabBarActive: "#6D4AFF",
  tabBarInactive: "#6E6A7E",
} as const;

export type AppColors = Record<keyof typeof light, string>;

export function useColors(): AppColors {
  const { isDark } = useTheme();
  return isDark ? dark : light;
}
