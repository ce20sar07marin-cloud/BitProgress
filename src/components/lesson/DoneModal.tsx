import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, shadow, spacing } from "@/constants/theme";

interface Props {
  visible: boolean;
  lessonTitle: string;
  xpEarned: number;
  onConfirm: () => void;
}

export default function DoneModal({ visible, lessonTitle, xpEarned, onConfirm }: Props) {
  const colors = useColors();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <View style={[styles.xpBadge, { backgroundColor: colors.primarySoft }]}>
            <Image source={require("@/assets/images/XPtotal.png")} style={styles.xpImage} />
            <Text style={[styles.xpAmount, { color: colors.primary }]}>+{xpEarned} XP</Text>
          </View>

          <Text style={[styles.title, { color: colors.textMain }]}>¡Lección completada!</Text>

          <Text style={[styles.message, { color: colors.textSecondary }]}>
            Felicidades, completaste "{lessonTitle}". Sigue aprendiendo para dominar las redes.
          </Text>

          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onConfirm} activeOpacity={0.7}>
            <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>Volver al inicio</Text>
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
    width: "85%",
    borderRadius: radius.xxl,
    padding: spacing.xl,
    alignItems: "center",
    ...shadow.lg,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  xpImage: {
    width: 44,
    height: 44,
  },
  xpAmount: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
  },
  title: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  message: {
    fontSize: font.size.md,
    marginBottom: spacing.xl,
    lineHeight: 22,
    textAlign: "center",
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
