import React from "react";

import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useColors } from "@/hooks/useColors";
import { radius, shadow, spacing } from "@/constants/theme";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "illustration";
}

const Card = ({ children, style, variant = "default" }: CardProps) => {
  const colors = useColors();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        variant === "illustration" && { backgroundColor: colors.illustrationBg, borderColor: "transparent" },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginVertical: spacing.xs,
    ...shadow.sm,
  },
});

export default Card;
