import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import Card from "@/components/Card";
import { font, spacing } from "@/constants/theme";
import { useColors } from "@/hooks/useColors";

import BinaryDisplay from "./ComponentsCalculator/BinaryDisplay";
import CalculatorButton from "./ComponentsCalculator/CalculatorButton";
import ModeSelector from "./ComponentsCalculator/ModeSelector";
import NumberInput from "./ComponentsCalculator/NumberInput";
import ResultCard from "./ComponentsCalculator/ResultCard";

export default function CalculatorScreen() {
  const [mode, setMode] = useState<"binary" | "decimal">("binary");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const colors = useColors();

  const convert = () => {
    if (!value) return;

    if (mode === "binary") {
      if (!/^[01]+$/.test(value)) return;
      const decimal = parseInt(value, 2);
      setResult(decimal.toString());
    } else {
      const num = Number(value);
      if (num < 0 || num > 255 || !Number.isInteger(num)) return;
      const binary = num.toString(2).padStart(8, "0");
      setResult(binary);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textMain }]}>
        Calculadora
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Conversor Binario - Decimal
      </Text>

      <Card>
        <ModeSelector mode={mode} setMode={setMode} />
        <NumberInput value={value} onChange={setValue} mode={mode} />
        <CalculatorButton title="CONVERTIR" onPress={convert} />
        <ResultCard result={result} />
        {mode === "decimal" && <BinaryDisplay binary={result} />}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl + 40,
  },
  title: {
    fontSize: font.size.title,
    fontWeight: font.weight.bold,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: font.size.md,
    marginBottom: spacing.lg,
  },
});
