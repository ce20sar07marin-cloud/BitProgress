import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, shadow, spacing } from "@/constants/theme";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitModal({ visible, onConfirm, onCancel }: Props) {
  const colors = useColors();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.textMain }]}>Salir de la lección</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>
            Si sales ahora perderás tu avance en esta página. ¿Deseas salir?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={[styles.cancelText, { color: colors.primary }]}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmButton, { backgroundColor: colors.error }]} onPress={onConfirm}>
              <Text style={[styles.confirmText, { color: colors.textOnPrimary }]}>Salir</Text>
            </TouchableOpacity>
          </View>
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
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadow.lg,
  },
  title: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: font.size.md,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  confirmButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  cancelText: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
  },
  confirmText: {
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
  },
});
