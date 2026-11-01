import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";

interface Props {
  binary: string;
}

export default function BinaryDisplay({ binary }: Props) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>Representación binaria:</Text>
      <View style={[styles.binaryBox, { backgroundColor: colors.primarySoft }]}>
        <Text style={[styles.binary, { color: colors.primary }]}>{binary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  label: {
    fontSize: font.size.sm,
    marginBottom: spacing.xs,
  },
  binaryBox: {
    borderRadius: radius.md,
    padding: spacing.md,
  },
  binary: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    letterSpacing: 2,
  },
});
