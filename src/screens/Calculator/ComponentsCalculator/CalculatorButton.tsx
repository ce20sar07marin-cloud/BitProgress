import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, shadow, spacing } from "@/constants/theme";

interface Props {
  title: string;
  onPress: () => void;
}

export default function CalculatorButton({ title, onPress }: Props) {
  const colors = useColors();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.text, { color: colors.textOnPrimary }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: radius.lg,
    marginVertical: spacing.sm,
    ...shadow.sm,
  },
  text: {
    textAlign: "center",
    fontWeight: font.weight.bold,
    fontSize: font.size.base,
  },
});
