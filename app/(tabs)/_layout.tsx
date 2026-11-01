import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import type { ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { font } from "@/constants/theme";
import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const icon =
    (name: React.ComponentProps<typeof Ionicons>["name"]) =>
    ({ color, size }: { focused: boolean; color: ColorValue; size: number }) =>
      <Ionicons name={name} size={size} color={color} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          height: 70 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom + 4,
        },
        tabBarLabelStyle: {
          fontSize: font.size.xs - 1,
          fontWeight: font.weight.semibold,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Inicio", tabBarIcon: icon("home") }}
      />
      <Tabs.Screen
        name="evaluaciones"
        options={{ title: "Evaluar", tabBarIcon: icon("clipboard-outline") }}
      />
      <Tabs.Screen
        name="glossary"
        options={{ title: "Glosario", tabBarIcon: icon("book") }}
      />
      <Tabs.Screen
        name="calculator"
        options={{ title: "Calc", tabBarIcon: icon("calculator") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Perfil", tabBarIcon: icon("person") }}
      />
    </Tabs>
  );
}
