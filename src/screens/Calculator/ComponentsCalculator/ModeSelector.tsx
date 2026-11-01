import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";

interface Props {
  mode: "binary" | "decimal";
  setMode: (value: "binary" | "decimal") => void;
}

export default function ModeSelector({ mode, setMode }: Props) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: mode === "binary" ? colors.primary : colors.primarySoft }]}
        onPress={() => setMode("binary")}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, { color: mode === "binary" ? colors.textOnPrimary : colors.primary }]}>
          Binario → Decimal
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: mode === "decimal" ? colors.primary : colors.primarySoft }]}
        onPress={() => setMode("decimal")}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, { color: mode === "decimal" ? colors.textOnPrimary : colors.primary }]}>
          Decimal → Binario
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  text: {
    textAlign: "center",
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
  },
});
