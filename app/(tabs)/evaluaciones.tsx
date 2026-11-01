import { useCallback, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSQLiteContext } from "expo-sqlite";

import Card from "@/components/Card";
import { font, radius, spacing } from "@/constants/theme";
import {
  getEvaluacionesData,
} from "@/database/queries";
import { useColors } from "@/hooks/useColors";
import { useUser } from "@/context/UserContext";

interface EvaluationItem {
  id: string;
  lessonId: string;
  title: string;
  nivel: string;
  unlocked: boolean;
  completed: boolean;
  aprobada: boolean | null;
  puntuacion: number;
  totalQuestions: number;
}

interface LevelGroup {
  nivel: string;
  color: string;
  data: EvaluationItem[];
}

const levelColors: Record<string, string> = {
  basic: "#34D399",
  intermediate: "#FBBF24",
  advanced: "#F87171",
};

const levelNames: Record<string, string> = {
  basic: "Básico",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export default function EvaluacionesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colors = useColors();
  const db = useSQLiteContext();
  const { userId } = useUser();
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadEvaluations();
    }, []),
  );

  const loadEvaluations = async () => {
    if (!userId) {
      setEvaluations([]);
      return;
    }
    try {
      const { summaries, progresoMap, pregCountMap, unlockedMap } = await getEvaluacionesData(db, userId);

      const items: EvaluationItem[] = summaries.map((evalData) => {
        const prog = progresoMap[evalData.id_leccion];
        return {
          id: evalData.external_id,
          lessonId: evalData.external_id,
          title: evalData.titulo,
          nivel: evalData.nivel,
          unlocked: unlockedMap[evalData.external_id] ?? false,
          completed: prog?.evaluacion_aprobada === 1,
          aprobada: prog?.evaluacion_aprobada === 1 ? true : null,
          puntuacion: prog?.puntuacion ?? 0,
          totalQuestions: pregCountMap[evalData.id_evaluacion] ?? 8,
        };
      });

      setEvaluations(items);
    } catch {}
  };

  const grouped: LevelGroup[] = [];
  for (const item of evaluations) {
    let group = grouped.find((g) => g.nivel === item.nivel);
    if (!group) {
      group = {
        nivel: item.nivel,
        color: levelColors[item.nivel] ?? "#6D4AFF",
        data: [],
      };
      grouped.push(group);
    }
    group.data.push(item);
  }

  return (
    <FlatList
      data={grouped}
      keyExtractor={(item) => item.nivel}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: insets.top + spacing.xl,
          paddingBottom: insets.bottom + spacing.xxl,
        },
      ]}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textMain }]}>
            Evaluaciones
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Pon a prueba tus conocimientos
          </Text>
        </View>
      }
      renderItem={({ item: group }) => (
        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <View style={[styles.levelDot, { backgroundColor: group.color }]} />
            <Text style={[styles.levelName, { color: colors.textMain }]}>
              {levelNames[group.nivel] ?? group.nivel}
            </Text>
          </View>

          {group.data.map((evalItem) => {
            const passed = evalItem.aprobada === true;

            return (
              <TouchableOpacity
                key={evalItem.id}
                onPress={() => {
                  if (evalItem.unlocked) {
                    router.push({
                      pathname: "/evaluation/[id]",
                      params: { id: evalItem.id },
                    });
                  }
                }}
                activeOpacity={evalItem.unlocked ? 0.7 : 1}
                disabled={!evalItem.unlocked}
              >
                <Card
                  style={[
                    styles.evalCard,
                    !evalItem.unlocked && { opacity: 0.5 },
                  ]}
                >
                  <View style={styles.evalRow}>
                    <View style={styles.evalInfo}>
                      <Text
                        style={[
                          styles.evalTitle,
                          {
                            color: evalItem.unlocked
                              ? colors.textMain
                              : colors.textSecondary,
                          },
                        ]}
                        numberOfLines={2}
                      >
                        {evalItem.title}
                      </Text>
                      <Text
                        style={[
                          styles.evalMeta,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {evalItem.totalQuestions} preguntas
                      </Text>
                    </View>

                    {evalItem.unlocked ? (
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor: passed
                              ? colors.successSoft
                              : evalItem.completed
                                ? colors.errorSoft
                                : colors.primarySoft,
                          },
                        ]}
                      >
                        <Ionicons
                          name={
                            passed
                              ? "checkmark-circle"
                              : evalItem.completed
                                ? "close-circle"
                                : "play-circle"
                          }
                          size={16}
                          color={
                            passed
                              ? colors.success
                              : evalItem.completed
                                ? colors.error
                                : colors.primary
                          }
                        />
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color: passed
                                ? colors.success
                                : evalItem.completed
                                  ? colors.error
                                  : colors.primary,
                            },
                          ]}
                        >
                          {passed
                            ? `${Math.round(evalItem.puntuacion)}%`
                            : evalItem.completed
                              ? "Reprobada"
                              : "Pendiente"}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: colors.primarySoft },
                        ]}
                      >
                        <Ionicons
                          name="lock-closed"
                          size={16}
                          color={colors.textSecondary}
                        />
                      </View>
                    )}
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: font.size.title,
    fontWeight: font.weight.bold,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: font.size.sm,
    marginTop: 4,
  },
  levelSection: {
    marginBottom: spacing.xl,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  levelName: {
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
  },
  evalCard: {
    marginTop: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  evalRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  evalInfo: {
    flex: 1,
  },
  evalTitle: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
  },
  evalMeta: {
    fontSize: font.size.xs,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: 4,
  },
  statusText: {
    fontSize: font.size.xs,
    fontWeight: font.weight.bold,
  },
});
