import { useCallback, useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProgressBar from "@/components/ProgressBar";
import Quiz from "@/components/lesson/Quiz";
import DoneModal from "@/components/lesson/DoneModal";
import ExitModal from "@/components/lesson/ExitModal";
import type { LessonConfig } from "@/types/lesson";
import { font, radius, shadow, spacing } from "@/constants/theme";
import { useXP } from "@/context/XPContext";
import { useColors } from "@/hooks/useColors";
import { useUser } from "@/context/UserContext";
import { useSQLiteContext } from "expo-sqlite";
import {
  saveLeccionCompletada,
  getProgresoLeccion,
} from "@/database/queries";

interface Props {
  lesson: LessonConfig;
}

export default function LessonView({ lesson }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addLessonXP } = useXP();
  const colors = useColors();
  const db = useSQLiteContext();
  const { userId } = useUser();

  const [lessonDbId, setLessonDbId] = useState<number | null>(null);
  const [lessonProgress, setLessonProgress] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const row = await db.getFirstAsync<{ id_leccion: number }>(
          "SELECT id_leccion FROM Leccion WHERE external_id = ?",
          lesson.id,
        );
        if (!cancelled && row) {
          setLessonDbId(row.id_leccion);

          // Fetch user progress for this lesson
          if (userId) {
            const existing = await getProgresoLeccion(db, userId, row.id_leccion);
            if (existing) {
              // Progress based on puntuacion (XP) out of max 20
              const progressPercent = (existing.puntuacion / 20) * 100;
              setLessonProgress(progressPercent);
            } else {
              setLessonProgress(0);
            }
          } else {
            setLessonProgress(0);
          }
        }
      } catch {}
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [lesson.id, db, userId, lessonDbId]);

  const [currentPage, setCurrentPage] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(true);
  const [xpEarned, setXpEarned] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const pages = lesson.pages;
  const totalPages = pages.length;
  const isLastPage = currentPage === totalPages - 1;
  const hasQuiz = !!pages[currentPage]?.quiz;

  useEffect(() => {
    setCanAdvance(false);
    setQuizCorrect(true);
  }, [currentPage]);

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

  const handleQuizAnswer = useCallback((correct: boolean) => {
    setQuizCorrect(correct);
    setCanAdvance(true);
  }, []);

  const handleNext = useCallback(async () => {
    if (isLastPage) {
      let earned = 0;
      try {
        if (lessonDbId) {
          const existing = await getProgresoLeccion(db, userId ?? 1, lessonDbId);
          const priorXP = existing?.puntuacion ?? 0;

          if (priorXP >= 20) {
            earned = 0;
          } else if (quizCorrect) {
            earned = priorXP >= 15 ? 5 : 20;
          } else {
            earned = priorXP >= 15 ? 0 : 15;
          }

          const totalXPForLesson = Math.min(priorXP + earned, 20);
          await saveLeccionCompletada(db, userId ?? 1, lessonDbId, totalXPForLesson);
        }

        if (earned > 0) {
          await addLessonXP(earned);
        }
      } catch {}
      setXpEarned(earned);
      setShowDoneModal(true);
    } else {
      setCurrentPage((p) => p + 1);
    }
  }, [isLastPage, addLessonXP, quizCorrect, db, lessonDbId]);

  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);
    router.back();
  }, [router]);

  const handleDone = useCallback(() => {
    setShowDoneModal(false);
    router.back();
  }, [router]);

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
          {!isLastPage && (
            <TouchableOpacity
              onPress={handleBack}
              style={[
                styles.iconButton,
                { backgroundColor: colors.primarySoft },
              ]}
            >
              <Ionicons name="arrow-back" size={20} color={colors.textMain} />
            </TouchableOpacity>
          )}
          {isLastPage && <View style={styles.iconButton} />}
          <Text style={[styles.pageIndicator, { color: colors.textSecondary }]}>
            {currentPage + 1}/{totalPages}
          </Text>
          {!isLastPage && (
            <TouchableOpacity
              onPress={() => setShowExitModal(true)}
              style={[
                styles.iconButton,
                { backgroundColor: colors.primarySoft },
              ]}
            >
              <Ionicons name="home" size={20} color={colors.textMain} />
            </TouchableOpacity>
          )}
          {isLastPage && <View style={styles.iconButton} />}
        </View>

        <ProgressBar
          progress={lessonProgress}
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
        {!hasQuiz && (
          <View
            style={[
              styles.contentCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.pageTitle, { color: colors.primary }]}>
              {page.title}
            </Text>
            <Text style={[styles.pageContent, { color: colors.textMain }]}>
              {page.content}
            </Text>

            {page.illustration && (
              <View
                style={[
                  styles.illustrationContainer,
                  { backgroundColor: colors.illustrationBg },
                ]}
              >
                <Image
                  source={page.illustration}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        )}

        {page.conceptBox && !hasQuiz && (
          <View
            style={[
              styles.conceptCard,
              {
                backgroundColor: colors.illustrationBg,
                borderColor: colors.primarySoft,
              },
            ]}
          >
            <Text style={[styles.conceptText, { color: colors.primary }]}>
              {page.conceptBox}
            </Text>
          </View>
        )}

        {page.quiz && (
          <Quiz quiz={page.quiz} onAnswer={handleQuizAnswer} />
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
            {
              backgroundColor: canAdvance
                ? colors.primary
                : colors.disabled,
            },
          ]}
          onPress={handleNext}
          disabled={!canAdvance}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.nextText,
              {
                color: canAdvance
                  ? colors.textOnPrimary
                  : colors.disabledText,
              },
            ]}
          >
            {isLastPage ? "Finalizar lección" : "Siguiente"}
          </Text>
          <Ionicons
            name={isLastPage ? "checkmark-circle" : "arrow-forward"}
            size={20}
            color={
              canAdvance ? colors.textOnPrimary : colors.disabledText
            }
          />
        </TouchableOpacity>
      </View>

      <ExitModal
        visible={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitModal(false)}
      />
      <DoneModal
        visible={showDoneModal}
        lessonTitle={lesson.title}
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
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  pageContent: {
    fontSize: font.size.base,
    lineHeight: 28,
  },
  conceptCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.xl,
  },
  conceptText: {
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
    textAlign: "center",
    lineHeight: 24,
  },
  illustrationContainer: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: "100%",
    height: 200,
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
