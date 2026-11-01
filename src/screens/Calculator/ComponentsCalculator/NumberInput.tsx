import { StyleSheet, Text, TextInput, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";

interface Props {
  value: string;
  onChange: (text: string) => void;
  mode: "binary" | "decimal";
}

export default function NumberInput({ value, onChange, mode }: Props) {
  const colors = useColors();

  return (
    <TextInput
      style={[styles.input, { borderColor: colors.borderInput, backgroundColor: colors.surface, color: colors.textMain }]}
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      placeholder={mode === "binary" ? "Ej: 11001100 (max 8 bits)" : "Ej: 200 (0-255)"}
      placeholderTextColor={colors.placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    fontSize: font.size.lg,
    marginVertical: spacing.sm,
  },
});
