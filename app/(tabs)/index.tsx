import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCallback, Fragment, useState } from "react";

import { useFocusEffect, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import AchievementModal from "@/components/AchievementModal";
import { font, radius, spacing } from "@/constants/theme";
import { useXP } from "@/context/XPContext";
import { useAchievements } from "@/context/AchievementsContext";
import {
  getLeccionesCompletadasCount,
  getLeccionesResumen,
  getLeccionesCompletadasMap,
} from "@/database/queries";
import { useColors } from "@/hooks/useColors";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "@/context/UserContext";

const TOTAL_LECCIONES = 9;

const LESSON_ORDER = ["b1", "b2", "b3", "i1", "i2", "i3", "a1", "a2", "a3"];

interface Module {
  id: string;
  title: string;
}

interface Level {
  id: string;
  name: string;
  color: string;
  modules: Module[];
}

const levelDefs: { id: string; name: string; color: string }[] = [
  { id: "basic", name: "Básico", color: "#34D399" },
  { id: "intermediate", name: "Intermedio", color: "#FBBF24" },
  { id: "advanced", name: "Avanzado", color: "#F87171" },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { totalXP } = useXP();
  const colors = useColors();
  const db = useSQLiteContext();
  const { userId } = useUser();
  const { pendingAchievementId, dismissAchievement, checkUnlocks, showAchievementModal, modalShownIds } = useAchievements();

  const [completedCount, setCompletedCount] = useState(0);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [levels, setLevels] = useState<Level[]>([]);

  const loadProgress = useCallback(async () => {
    if (!userId) {
      setCompletedCount(0);
      setCompletedMap({});
      return;
    }
    try {
      const count = await getLeccionesCompletadasCount(db, userId);
      setCompletedCount(count);

      const map = await getLeccionesCompletadasMap(db, userId);
      setCompletedMap(map);

      const lessons = await getLeccionesResumen(db);
      const titleMap: Record<string, string> = {};
      for (const l of lessons) {
        titleMap[l.external_id] = l.titulo;
      }

      const built: Level[] = levelDefs.map((ld) => ({
        ...ld,
        modules: LESSON_ORDER.filter((id) => id.startsWith(ld.id[0])).map(
          (id) => ({
            id,
            title: titleMap[id] ?? id,
          }),
        ),
      }));
      setLevels(built);
    } catch {}
  }, [db, userId]);

  // Ya no ejecutamos checkUnlocks aquí cada focus para evitar que el modal aparezca repetidamente.
  // El flujo es: completar evaluación → modal XP → cerrar → ir a lecciones → modal de logro aparece una sola vez
  useFocusEffect(
    useCallback(() => {
      loadProgress()
        .then(async () => {
          // No checkUnlocks aquí para evitar modales repetidos
        })
        .catch(() => {});
    }, [loadProgress]),
  );

  const isLessonUnlocked = useCallback(
    (lessonId: string): boolean => {
      const index = LESSON_ORDER.indexOf(lessonId);
      if (index === 0) return true;
      const prevId = LESSON_ORDER[index - 1];
      return completedMap[prevId] === true;
    },
    [completedMap],
  );

  const progressPercent = Math.round((completedCount / TOTAL_LECCIONES) * 100);

  return (
    <>
    <FlatList
      data={levels}
      keyExtractor={(item) => item.id}
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
        <View style={styles.greeting}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={[styles.title, { color: colors.textMain }]}>
                BitProgress
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Aprende redes paso a paso
              </Text>
            </View>
            <View
              style={[styles.xpBadge, { backgroundColor: colors.primarySoft }]}
            >
              <Image
                source={require("@/assets/images/XPGanada.png")}
                style={styles.xpIcon}
              />
              <Text style={[styles.xpValue, { color: colors.primary }]}>
                {totalXP}
              </Text>
            </View>
          </View>

          <View style={[styles.generalProgress, { marginTop: spacing.lg }]}>
            <View style={styles.generalProgressHeader}>
              <Text
                style={[
                  styles.generalProgressLabel,
                  { color: colors.textSecondary },
                ]}
              >
                Progreso general
              </Text>
              <Text
                style={[styles.generalProgressValue, { color: colors.primary }]}
              >
                {completedCount}/{TOTAL_LECCIONES} lecciones ({progressPercent}
                %)
              </Text>
            </View>
            <ProgressBar progress={progressPercent} />
          </View>
        </View>
      }
      renderItem={({ item: level }) => {
        return (
          <View style={styles.levelSection}>
            <View style={styles.levelHeader}>
              <View
                style={[styles.levelDot, { backgroundColor: level.color }]}
              />
              <Text style={[styles.levelName, { color: colors.textMain }]}>
                {level.name}
              </Text>
            </View>

            {level.modules.map((mod) => {
              const unlocked = isLessonUnlocked(mod.id);
              const completed = completedMap[mod.id] === true;

              return (
                <TouchableOpacity
                  key={mod.id}
                  onPress={() => {
                    if (unlocked) {
                      router.push(`/lesson/${mod.id}` as any);
                    }
                  }}
                  activeOpacity={unlocked ? 0.7 : 1}
                  disabled={!unlocked}
                >
                  <Card
                    style={[styles.moduleCard, !unlocked && { opacity: 0.5 }]}
                  >
                    <View style={styles.moduleRow}>
                      <View style={styles.moduleInfo}>
                        <Text
                          style={[
                            styles.moduleTitle,
                            {
                              color: unlocked
                                ? colors.textMain
                                : colors.textSecondary,
                            },
                          ]}
                        >
                          {mod.title}
                        </Text>
                      </View>
                      {completed ? (
                        <View
                          style={[
                            styles.checkBadge,
                            { backgroundColor: "#34D399" },
                          ]}
                        >
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        </View>
                      ) : !unlocked ? (
                        <View
                          style={[
                            styles.lockBadge,
                            { backgroundColor: colors.primarySoft },
                          ]}
                        >
                          <Ionicons
                            name="lock-closed"
                            size={14}
                            color={colors.textSecondary}
                          />
                        </View>
                      ) : null}
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    />
    <AchievementModal
      visible={pendingAchievementId !== null}
      achievementId={pendingAchievementId}
      onDismiss={dismissAchievement}
    />
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.xl,
  },
  greeting: {
    marginBottom: spacing.xxl,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
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
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  xpIcon: {
    width: 20,
    height: 20,
  },
  xpValue: {
    fontSize: font.size.sm,
    fontWeight: font.weight.bold,
  },
  generalProgress: {
    gap: spacing.sm,
  },
  generalProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  generalProgressLabel: {
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
  },
  generalProgressValue: {
    fontSize: font.size.xs,
    fontWeight: font.weight.bold,
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
    flex: 1,
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
  },
  moduleCard: {
    marginTop: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  lockBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
