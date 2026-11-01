import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";

interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.primarySoft }]}>
      <Text style={[styles.text, { color: colors.primary }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    alignSelf: "flex-start",
    flexShrink: 0,
  },
  text: {
    fontSize: font.size.xs,
    fontWeight: font.weight.bold,
  },
});

export default Badge;
