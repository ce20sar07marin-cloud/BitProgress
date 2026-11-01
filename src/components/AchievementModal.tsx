import { useEffect, useContext } from "react";

import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";
import { achievements } from "@/constants/achievements";
import achievementImages from "@/data/achievements/images";
import { useAchievements } from "@/context/AchievementsContext";

interface Props {
  visible: boolean;
  achievementId: string | null;
  onDismiss: () => void;
}

const PATTERN = [0, 100, 80, 100, 80, 200];

export default function AchievementModal({ visible, achievementId, onDismiss }: Props) {
  const colors = useColors();
  const { modalShownIds } = useAchievements();

  useEffect(() => {
    if (visible) {
      if (Platform.OS === "android") {
        Vibration.vibrate(PATTERN);
      } else {
        Vibration.vibrate();
      }
    }
  }, [visible]);

  const achievement = achievements.find((a) => a.id === achievementId);

  if (!achievement) {
    if (visible) onDismiss();
    return null;
  }

  // Verificar si este logro ya mostró su modal en la sesión actual o persistencia
  if (modalShownIds.includes(achievement.id)) {
    // Ya se mostró, cerrar el modal
    onDismiss();
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View style={[styles.container, { backgroundColor: colors.surface }]>
          <Text style={[styles.headerLabel, { color: colors.primary }]}>
            ¡Logro Desbloqueado!
          </Text>

          <View style={[styles.imageFrame, { borderColor: colors.primary }]}>
            <Image source={achievementImages[achievement.id]} style={styles.image} resizeMode="contain" />
          </View>

          <Text style={[styles.name, { color: colors.textMain }]}>
            {achievement.name}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => onDismiss(achievementId)}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>
              ¡Genial!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    borderRadius: radius.xxl,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.lg,
    ...shadow.lg,
  },
  headerLabel: {
    fontSize: font.size.lg,
    fontWeight: font.weight.bold,
    letterSpacing: -0.3,
  },
  imageFrame: {
    width: 140,
    height: 140,
    borderRadius: radius.xl,
    borderWidth: 3,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.lg,
    width: "100%",
    alignItems: "center",
    ...shadow.sm,
  },
  buttonText: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
});