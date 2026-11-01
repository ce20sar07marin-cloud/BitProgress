import { useCallback, useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSQLiteContext } from "expo-sqlite";

import ProgressBar from "@/components/ProgressBar";
import Quiz from "@/components/lesson/Quiz";
import type { QuizData } from "@/types/lesson";
import { font, radius, shadow, spacing } from "@/constants/theme";
import { useXP } from "@/context/XPContext";
import {
  getEvaluacionByExternalId,
  getPreguntasConRespuestas,
  getProgresoLeccion,
  saveEvaluacionCompletada,
  type DBPregunta,
  type DBRespuesta,
} from "@/database/queries";
import { useColors } from "@/hooks/useColors";
import { useUser } from "@/context/UserContext";

import ExitModal from "@/components/lesson/ExitModal";

interface EvalPage {
  id: string;
  title: string;
  quiz: QuizData;
}

interface DoneEvalModalProps {
  visible: boolean;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  onConfirm: () => void;
}

function DoneEvalModal({
  visible,
  correctCount,
  totalQuestions,
  xpEarned,
  onConfirm,
}: DoneEvalModalProps) {
  const colors = useColors();
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  if (!visible) return null;

  return (
    <View style={modalStyles.overlay}>
      <View style={[modalStyles.modal, { backgroundColor: colors.surface }]}>
        <Image
          source={require("@/assets/images/XPtotal.png")}
          style={modalStyles.xpImage}
          resizeMode="contain"
        />
        <Text style={[modalStyles.title, { color: colors.textMain }]}>
          ¡Evaluación completada!
        </Text>
        <Text style={[modalStyles.score, { color: colors.primary }]}>
          {percentage}%
        </Text>
        <Text style={[modalStyles.detail, { color: colors.textSecondary }]}>
          {correctCount}/{totalQuestions} respuestas correctas
        </Text>
        <Text style={[modalStyles.xpText, { color: colors.primary }]}>
          +{xpEarned} XP
        </Text>
        <TouchableOpacity
          style={[modalStyles.button, { backgroundColor: colors.primary }]}
          onPress={onConfirm}
          activeOpacity={0.7}
        >
          <Text
            style={[modalStyles.buttonText, { color: colors.textOnPrimary }]}
          >
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modal: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: "center",
    width: "85%",
    gap: spacing.md,
    ...shadow.lg,
  },
  xpImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    textAlign: "center",
  },
  score: {
    fontSize: 48,
    fontWeight: font.weight.bold,
  },
  detail: {
    fontSize: font.size.base,
  },
  xpText: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
  },
  buttonText: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
});

function buildQuizData(
  pregunta: DBPregunta,
  respuestas: DBRespuesta[],
): QuizData {
  const tipo = pregunta.tipo_pregunta;

  if (tipo === "multiple-choice" || tipo === "true-false") {
    return {
      type: tipo,
      question: pregunta.enunciado,
      options: respuestas.map((r) => ({
        label: r.texto_respuesta,
        isCorrect: r.es_correcta === 1,
      })),
    };
  }

  if (tipo === "ordering") {
    return {
      type: "ordering",
      question: pregunta.enunciado,
      correctOrder: respuestas
        .sort((a, b) => a.id_respuesta - b.id_respuesta)
        .map((r) => r.texto_respuesta),
    };
  }

  if (tipo === "fill-blank") {
    const correctAnswers = respuestas
      .filter((r) => r.es_correcta === 1)
      .map((r) => r.texto_respuesta);
    return {
      type: "fill-blank",
      question: pregunta.enunciado,
      blankAnswer:
        correctAnswers.length > 1 ? correctAnswers : (correctAnswers[0] ?? ""),
    };
  }

  return { type: "multiple-choice", question: pregunta.enunciado, options: [] };
}

export default function EvaluationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addLessonXP } = useXP();
  const colors = useColors();
  const db = useSQLiteContext();
  const { userId } = useUser();

  const [pages, setPages] = useState<EvalPage[]>([]);
  const [evalDbId, setEvalDbId] = useState<number | null>(null);
  const [leccionId, setLeccionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!id) return;
        const evalRow = await getEvaluacionByExternalId(db, id);
        if (cancelled || !evalRow) return;

        const preguntas = await getPreguntasConRespuestas(db, evalRow.id_evaluacion);
        const evalPages: EvalPage[] = preguntas.preguntas.map((preg, i) => ({
          id: `eval-p${i + 1}`,
          title: `Pregunta ${i + 1}`,
          quiz: buildQuizData(preg, preguntas.respuestasMap[preg.id_pregunta] ?? []),
        }));

        setPages(evalPages);
        setEvalDbId(evalRow.id_evaluacion);
        setLeccionId(evalRow.id_leccion);
      } catch {}
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id, db]);

  const [currentPage, setCurrentPage] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [answeredPages, setAnsweredPages] = useState<
    Record<number, { selected: string; isCorrect: boolean }>
  >({});

  const totalPages = pages.length;
  const isLastPage = currentPage === totalPages - 1;
  const hasQuiz = !!pages[currentPage]?.quiz;
  const XP_PER_QUESTION = 10;

  useEffect(() => {
    if (answeredPages[currentPage]) {
      setCanAdvance(true);
    } else {
      setCanAdvance(false);
    }
  }, [currentPage, answeredPages]);

  useEffect(() => {
    if (hasQuiz) return;
    const timer = setTimeout(() => setCanAdvance(true), 1500);
    return () => clearTimeout(timer);
  }, [currentPage, hasQuiz]);

  const handleBack = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    } else {
      setShowExitModal(true);
    }
  }, [currentPage]);

  const handleQuizAnswer = useCallback(
    (correct: boolean, selected?: string) => {
      setCanAdvance(true);
      setTotalAnswered((prev) => prev + 1);
      if (correct) {
        setCorrectCount((prev) => prev + 1);
      }
      if (selected) {
        setAnsweredPages((prev) => ({
          ...prev,
          [currentPage]: { selected, isCorrect: correct },
        }));
      }
    },
    [currentPage],
  );

  const handleNext = useCallback(async () => {
    if (isLastPage) {
      const newPercentage = (correctCount / totalPages) * 100;
      const aprobada = newPercentage >= 75;

      let xpToAward = 0;
      try {
        if (leccionId) {
          const existing = await getProgresoLeccion(db, userId!, leccionId);
          const previousCorrect =
            existing && existing.puntuacion > 20
              ? Math.round((existing.puntuacion / 100) * totalPages)
              : 0;
          const newCorrect = correctCount;
          const improvement = Math.max(0, newCorrect - previousCorrect);
          xpToAward = Math.min(improvement * XP_PER_QUESTION, 80);
        }

        if (leccionId) {
          await saveEvaluacionCompletada(
            db,
            userId!,
            leccionId,
            newPercentage,
            aprobada,
          );
        }

        if (xpToAward > 0) {
          await addLessonXP(xpToAward);
        }
      } catch {}
      setXpEarned(xpToAward);
      setShowDoneModal(true);
    } else {
      setCurrentPage((p) => p + 1);
    }
  }, [isLastPage, correctCount, totalPages, leccionId, db, addLessonXP]);

  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);
    router.back();
  }, [router]);

  const handleDone = useCallback(() => {
    setShowDoneModal(false);
    router.back();
  }, [router]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          Cargando...
        </Text>
      </View>
    );
  }

  if (pages.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          Evaluación no encontrada
        </Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={[styles.backLinkText, { color: colors.primary }]}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const page = pages[currentPage];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[styles.headerFixed, { paddingTop: insets.top }]}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.iconButton, { backgroundColor: colors.primarySoft }]}
          >
            <Ionicons name="arrow-back" size={20} color={colors.textMain} />
          </TouchableOpacity>
          <Text style={[styles.pageIndicator, { color: colors.textSecondary }]}>
            {currentPage + 1}/{totalPages}
          </Text>
          <TouchableOpacity
            onPress={() => setShowExitModal(true)}
            style={[styles.iconButton, { backgroundColor: colors.primarySoft }]}
          >
            <Ionicons name="home" size={20} color={colors.textMain} />
          </TouchableOpacity>
        </View>

        <ProgressBar
          progress={totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: headerHeight + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.contentCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.pageTitle, { color: colors.primary }]}>
            {page.title}
          </Text>
          <Text style={[styles.pageContent, { color: colors.textSecondary }]}>
            Pregunta {currentPage + 1} de {totalPages}
          </Text>
        </View>

        {page.quiz && (
          <Quiz
            key={currentPage}
            quiz={page.quiz}
            onAnswer={handleQuizAnswer}
            locked={!!answeredPages[currentPage]}
            lockedAnswer={answeredPages[currentPage] ?? null}
          />
        )}
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: insets.bottom + spacing.sm,
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: canAdvance ? colors.primary : colors.disabled },
          ]}
          onPress={handleNext}
          disabled={!canAdvance}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.nextText,
              {
                color: canAdvance ? colors.textOnPrimary : colors.disabledText,
              },
            ]}
          >
            {isLastPage ? "Finalizar evaluación" : "Siguiente"}
          </Text>
          <Ionicons
            name={isLastPage ? "checkmark-circle" : "arrow-forward"}
            size={20}
            color={canAdvance ? colors.textOnPrimary : colors.disabledText}
          />
        </TouchableOpacity>
      </View>

      <ExitModal
        visible={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitModal(false)}
      />
      <DoneEvalModal
        visible={showDoneModal}
        correctCount={correctCount}
        totalQuestions={totalPages}
        xpEarned={xpEarned}
        onConfirm={handleDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: font.size.lg,
    marginBottom: spacing.lg,
  },
  backLink: {
    padding: spacing.md,
  },
  backLinkText: {
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
  },
  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pageIndicator: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  contentCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.xl,
    ...shadow.sm,
  },
  pageTitle: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    marginBottom: spacing.sm,
    letterSpacing: -0.3,
  },
  pageContent: {
    fontSize: font.size.base,
    lineHeight: 24,
  },
  bottomBar: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    flexShrink: 0,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: radius.lg,
    gap: spacing.sm,
    ...shadow.sm,
  },
  nextText: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
});
