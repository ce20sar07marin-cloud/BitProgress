import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";

interface Props {
  result: string;
}

export default function ResultCard({ result }: Props) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.illustrationBg }]}>
      <Text style={[styles.title, { color: colors.textMain }]}>Resultado</Text>
      <Text style={[styles.result, { color: colors.primary }]}>{result || "Sin resultado"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    marginTop: spacing.md,
  },
  title: {
    fontSize: font.size.lg,
    fontWeight: font.weight.bold,
  },
  result: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    marginTop: spacing.sm,
  },
});
