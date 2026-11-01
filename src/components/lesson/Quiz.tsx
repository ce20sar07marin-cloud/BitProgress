import { useCallback, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useColors } from "@/hooks/useColors";
import { QuizData } from "@/types/lesson";
import { font, radius, spacing } from "@/constants/theme";

interface QuizProps {
  quiz: QuizData;
  onAnswer: (correct: boolean, selected?: string) => void;
  locked?: boolean;
  lockedAnswer?: { selected: string; isCorrect: boolean } | null;
}

export default function Quiz({ quiz, onAnswer, locked, lockedAnswer }: QuizProps) {
  const colors = useColors();
  const [selected, setSelected] = useState<string | null>(
    lockedAnswer?.selected ?? null
  );
  const [answered, setAnswered] = useState(locked ?? false);
  const [isCorrect, setIsCorrect] = useState(lockedAnswer?.isCorrect ?? false);
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    quiz.options ? shuffleArray([...quiz.options]) : undefined
  );
  const [order, setOrder] = useState<string[]>(() =>
    quiz.correctOrder ? shuffleArray([...quiz.correctOrder]) : []
  );
  const [selectedOrderIdx, setSelectedOrderIdx] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (locked && lockedAnswer) {
      setSelected(lockedAnswer.selected);
      setAnswered(true);
      setIsCorrect(lockedAnswer.isCorrect);
      return;
    }
    setSelected(null);
    setAnswered(false);
    setIsCorrect(false);
    setInputValue("");
    setSelectedOrderIdx(null);
    setShuffledOptions(quiz.options ? shuffleArray([...quiz.options]) : undefined);
    if (quiz.correctOrder) setOrder(shuffleArray([...quiz.correctOrder]));
  }, [quiz, locked, lockedAnswer]);

  const handleSelect = useCallback(
    (option: string, correct: boolean) => {
      if (answered) return;
      setSelected(option);
      setAnswered(true);
      setIsCorrect(correct);
      onAnswer(correct, option);
    },
    [answered, onAnswer]
  );

  const handleOrderCheck = useCallback(() => {
    if (answered) return;
    const correct = JSON.stringify(order) === JSON.stringify(quiz.correctOrder);
    setAnswered(true);
    setIsCorrect(correct);
    onAnswer(correct, JSON.stringify(order));
  }, [answered, order, quiz.correctOrder, onAnswer]);

  const handleFillCheck = useCallback(() => {
    if (answered) return;
    const trimmed = inputValue.trim().toLowerCase();
    const answer = quiz.blankAnswer;
    let correct = false;
    if (Array.isArray(answer)) {
      correct = answer.some((a) => a.toLowerCase() === trimmed);
    } else {
      correct = trimmed === (answer ?? "").toLowerCase();
    }
    setAnswered(true);
    setIsCorrect(correct);
    onAnswer(correct, inputValue.trim());
  }, [answered, inputValue, quiz.blankAnswer, onAnswer]);

  const handleOrderTap = useCallback(
    (idx: number) => {
      if (answered) return;
      if (selectedOrderIdx === null) {
        setSelectedOrderIdx(idx);
      } else if (selectedOrderIdx === idx) {
        setSelectedOrderIdx(null);
      } else {
        const from = selectedOrderIdx;
        setSelectedOrderIdx(null);
        setOrder((prev) => {
          const next = [...prev];
          const [a] = next.splice(from, 1);
          next.splice(idx, 0, a);
          return next;
        });
      }
    },
    [answered, selectedOrderIdx]
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.textMain }]}>
        {quiz.question}
      </Text>

      {quiz.type === "multiple-choice" && shuffledOptions && (
        <View style={styles.options}>
          {shuffledOptions.map((opt) => {
            const isSelected = selected === opt.label;
            let bg = colors.surface;
            let border = colors.border;
            if (answered && isSelected) {
              bg = opt.isCorrect ? colors.successSoft : colors.errorSoft;
              border = opt.isCorrect ? colors.success : colors.error;
            } else if (answered && opt.isCorrect) {
              bg = colors.successSoft;
              border = colors.success;
            }
            return (
              <TouchableOpacity
                key={opt.label}
                style={[styles.option, { backgroundColor: bg, borderColor: border }]}
                onPress={() => handleSelect(opt.label, opt.isCorrect)}
                activeOpacity={0.7}
                disabled={locked}
              >
                <Text style={[styles.optionText, { color: colors.textMain }]}>
                  {opt.label}
                </Text>
                {answered && isSelected && (
                  <Ionicons
                    name={opt.isCorrect ? "checkmark-circle" : "close-circle"}
                    size={22}
                    color={opt.isCorrect ? colors.success : colors.error}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {quiz.type === "true-false" && shuffledOptions && (
        <View style={styles.tfRow}>
          {shuffledOptions.map((opt) => {
            const isSelected = selected === opt.label;
            let bg = colors.surface;
            let border = colors.border;
            if (answered && isSelected) {
              bg = opt.isCorrect ? colors.successSoft : colors.errorSoft;
              border = opt.isCorrect ? colors.success : colors.error;
            } else if (answered && opt.isCorrect) {
              bg = colors.successSoft;
              border = colors.success;
            }
            return (
              <TouchableOpacity
                key={opt.label}
                style={[styles.tfOption, { backgroundColor: bg, borderColor: border }]}
                onPress={() => handleSelect(opt.label, opt.isCorrect)}
                activeOpacity={0.7}
                disabled={locked}
              >
                <Ionicons
                  name={opt.label === "Verdadero" ? "checkmark" : "close"}
                  size={28}
                  color={
                    answered && isSelected
                      ? opt.isCorrect
                        ? colors.success
                        : colors.error
                      : colors.textSecondary
                  }
                />
                <Text style={[styles.tfText, { color: colors.textMain }]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {quiz.type === "ordering" && quiz.correctOrder && (
        <View style={styles.orderList}>
          {order.map((item, idx) => {
            const isSelected = selectedOrderIdx === idx;
            return (
              <TouchableOpacity
                key={`order-${idx}`}
                onPress={() => handleOrderTap(idx)}
                disabled={answered || locked}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.orderItem,
                    {
                      backgroundColor: isSelected ? colors.primarySoft : colors.surface,
                      borderColor: answered
                        ? item === quiz.correctOrder![idx]
                          ? colors.success
                          : colors.error
                        : isSelected
                        ? colors.primary
                        : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.orderIndex, { color: colors.primary }]}>
                    {idx + 1}
                  </Text>
                  <Text style={[styles.orderText, { color: colors.textMain }]}>{item}</Text>
                  {!answered && (
                    <Ionicons
                      name={isSelected ? "checkmark-circle" : "reorder-two"}
                      size={20}
                      color={isSelected ? colors.primary : colors.textSecondary}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          {!answered && !locked && (
            <TouchableOpacity
              style={[styles.checkBtn, { backgroundColor: colors.primary }]}
              onPress={handleOrderCheck}
              activeOpacity={0.7}
            >
              <Text style={[styles.checkBtnText, { color: colors.textOnPrimary }]}>
                Verificar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {quiz.type === "fill-blank" && (
        <View style={styles.fillContainer}>
          <TextInput
            style={[
              styles.fillInput,
              {
                borderColor: answered
                  ? isCorrect
                    ? colors.success
                    : colors.error
                  : colors.borderInput,
                color: colors.textMain,
                backgroundColor: colors.surface,
              },
            ]}
            placeholder="Escribe tu respuesta..."
            placeholderTextColor={colors.placeholder}
            value={inputValue}
            onChangeText={setInputValue}
            editable={!answered && !locked}
            autoCapitalize="none"
          />
          {!answered && !locked && (
            <TouchableOpacity
              style={[
                styles.checkBtn,
                {
                  backgroundColor: inputValue.trim() ? colors.primary : colors.disabled,
                },
              ]}
              onPress={handleFillCheck}
              disabled={!inputValue.trim()}
              activeOpacity={0.7}
            >
              <Text style={[styles.checkBtnText, { color: colors.textOnPrimary }]}>
                Verificar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {answered && (
        <View
          style={[
            styles.feedback,
            {
              backgroundColor: isCorrect ? colors.successSoft : colors.errorSoft,
              borderColor: isCorrect ? colors.success : colors.error,
            },
          ]}
        >
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={22}
            color={isCorrect ? colors.success : colors.error}
          />
          <Text
            style={[
              styles.feedbackText,
              { color: isCorrect ? colors.success : colors.error },
            ]}
          >
            {isCorrect ? "¡Correcto!" : "Incorrecto"}
          </Text>
        </View>
      )}

      {answered && quiz.explanation && (
        <View style={[styles.explanation, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.explanationText, { color: colors.primary }]}>
            {quiz.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  question: {
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    lineHeight: 26,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  optionText: {
    fontSize: font.size.base,
    flex: 1,
  },
  tfRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  tfOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  tfText: {
    fontSize: font.size.base,
    fontWeight: font.weight.medium,
  },
  orderList: {
    gap: spacing.sm,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  orderIndex: {
    fontSize: font.size.sm,
    fontWeight: font.weight.bold,
    width: 22,
    textAlign: "center",
  },
  orderText: {
    fontSize: font.size.base,
    flex: 1,
  },
  fillContainer: {
    gap: spacing.sm,
  },
  fillInput: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.size.base,
  },
  checkBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  checkBtnText: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  feedbackText: {
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
  },
  explanation: {
    borderRadius: radius.md,
    padding: spacing.md,
  },
  explanationText: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    lineHeight: 20,
  },
});
