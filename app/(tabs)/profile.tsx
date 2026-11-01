import { useCallback, useState } from "react";

import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";

import Card from "@/components/Card";
import { useTheme } from "@/context/ThemeContext";
import { useXP } from "@/context/XPContext";
import { useUser } from "@/context/UserContext";
import { useAchievements } from "@/context/AchievementsContext";
import { achievements } from "@/constants/achievements";
import achievementImages from "@/data/achievements/images";
import { useColors } from "@/hooks/useColors";
import { font, radius, shadow, spacing } from "@/constants/theme";
import { resetAllProgress } from "@/database/queries";
import { getUsuarioById, deleteUsuario, changePassword, type DBUsuario } from "@/database/userQueries";

const AVATAR_IMAGES: Record<string, any> = {
  boy: require("@/assets/images/Avatar/PerfilBoy.png"),
  girl: require("@/assets/images/Avatar/PerfilGirl.png"),
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme } = useTheme();
  const colors = useColors();
  const { totalXP, resetXP } = useXP();
  const { userId, logout } = useUser();
  const { unlockedIds, isUnlocked, resetAchievements } = useAchievements();
  const db = useSQLiteContext();

  const [usuario, setUsuario] = useState<DBUsuario | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      getUsuarioById(db, userId).then((u) => {
        if (u) setUsuario(u);
      });
    }, [userId, db])
  );

  const handleResetProgress = () => {
    Alert.alert(
      "Borrar progreso",
      "Se eliminará todo tu progreso: lecciones completadas, evaluaciones y XP. Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            try {
              if (userId) await resetAllProgress(db, userId);
              await resetXP();
              await resetAchievements();
            } catch {}
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que querés cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Se eliminará tu cuenta y todo tu progreso permanentemente. Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              if (userId) {
                await deleteUsuario(db, userId);
                await resetAchievements();
              }
              await logout();
            } catch {}
          },
        },
      ]
    );
  };

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess(false);
    setShowPasswordModal(true);
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess(false);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Completa todos los campos");
      return;
    }
    if (newPassword.length < 4) {
      setPasswordError("La nueva contraseña debe tener al menos 4 caracteres");
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError("La nueva contraseña debe ser diferente a la actual");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    if (!userId) return;
    setSavingPassword(true);
    try {
      const result = await changePassword(db, userId, currentPassword, newPassword);
      if (!result.success) {
        setPasswordError(result.error ?? "Error al cambiar contraseña");
        setSavingPassword(false);
        return;
      }
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordError("Error al cambiar contraseña");
    }
    setSavingPassword(false);
  };

  const avatarSource = usuario?.avatar ? AVATAR_IMAGES[usuario.avatar] : null;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top + spacing.xl, paddingBottom: spacing.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.textMain }]}>Perfil</Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          style={[styles.menuBtn, { backgroundColor: colors.surface }]}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={colors.textMain} />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menuDropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { setMenuVisible(false); openPasswordModal(); }}
              activeOpacity={0.7}
            >
              <Ionicons name="key-outline" size={18} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.textMain }]}>Cambiar contraseña</Text>
            </TouchableOpacity>
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { setMenuVisible(false); handleResetProgress(); }}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={18} color="#E53935" />
              <Text style={[styles.menuItemText, { color: "#E53935" }]}>Borrar progreso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { setMenuVisible(false); handleDeleteAccount(); }}
              activeOpacity={0.7}
            >
              <Ionicons name="person-remove-outline" size={18} color="#B71C1C" />
              <Text style={[styles.menuItemText, { color: "#B71C1C" }]}>Eliminar cuenta</Text>
            </TouchableOpacity>
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { setMenuVisible(false); handleLogout(); }}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={18} color={colors.textSecondary} />
              <Text style={[styles.menuItemText, { color: colors.textSecondary }]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}

      <View style={styles.avatarSection}>
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          {avatarSource ? (
            <Image source={avatarSource} style={styles.avatarImage} resizeMode="contain" />
          ) : (
            <Ionicons name="person" size={48} color={colors.primary} />
          )}
        </View>
        <Text style={[styles.name, { color: colors.textMain }]}>
          {usuario?.nombre ?? "Estudiante"}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {usuario?.correo ?? "Aprendiz de redes"}
        </Text>
      </View>

      <Card>
        <View style={styles.statRow}>
          <Image source={require("@/assets/images/XPGanada.png")} style={styles.statIcon} />
          <View style={styles.statInfo}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>XP Total</Text>
            <Text style={[styles.statValue, { color: colors.textMain }]}>{totalXP} XP</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View style={styles.achievementsHeader}>
          <View style={styles.settingLeft}>
            <Ionicons name="trophy" size={20} color={colors.primary} />
            <Text style={[styles.settingLabel, { color: colors.textMain }]}>Logros</Text>
          </View>
          <Text style={[styles.achievementsCount, { color: colors.textSecondary }]}>
            {unlockedIds.length}/9
          </Text>
        </View>
        <View style={styles.achievementsGrid}>
          {achievements.map((ach) => {
            const unlocked = isUnlocked(ach.id);
            return (
              <View
                key={ach.id}
                style={[
                  styles.achievementFrame,
                  {
                    borderColor: unlocked ? colors.primary : colors.border,
                    backgroundColor: unlocked ? colors.primarySoft : colors.illustrationBg,
                  },
                ]}
              >
                {unlocked ? (
                  <Image source={achievementImages[ach.id]} style={styles.achievementImage} resizeMode="contain" />
                ) : (
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color={colors.border}
                  />
                )}
              </View>
            );
          })}
        </View>
      </Card>

      <Card>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon" size={20} color={colors.primary} />
            <Text style={[styles.settingLabel, { color: colors.textMain }]}>Modo oscuro</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.borderInput, true: colors.primarySoft }}
            thumbColor={isDark ? colors.primary : colors.surface}
          />
        </View>
      </Card>

      <Card>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={[styles.settingLabel, { color: colors.textMain }]}>Acerca de</Text>
          </View>
          <Text style={[styles.version, { color: colors.textSecondary }]}>v1.0.0</Text>
        </View>
      </Card>

      <Modal visible={showPasswordModal} transparent animationType="fade">
        <View style={[modalStyles.overlay, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[modalStyles.container, { backgroundColor: colors.surface }]}>
            <Text style={[modalStyles.title, { color: colors.textMain }]}>Cambiar contraseña</Text>

            <Text style={[modalStyles.label, { color: colors.textSecondary }]}>Contraseña actual</Text>
            <View style={[modalStyles.inputRow, { borderColor: colors.borderInput, backgroundColor: colors.background }]}>
              <TextInput
                style={[modalStyles.input, { color: colors.textMain }]}
                placeholder="••••"
                placeholderTextColor={colors.placeholder}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrent}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={modalStyles.eyeBtn}>
                <Ionicons name={showCurrent ? "eye-off" : "eye"} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={[modalStyles.label, { color: colors.textSecondary }]}>Nueva contraseña</Text>
            <View style={[modalStyles.inputRow, { borderColor: colors.borderInput, backgroundColor: colors.background }]}>
              <TextInput
                style={[modalStyles.input, { color: colors.textMain }]}
                placeholder="••••"
                placeholderTextColor={colors.placeholder}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowNew(!showNew)} style={modalStyles.eyeBtn}>
                <Ionicons name={showNew ? "eye-off" : "eye"} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={[modalStyles.label, { color: colors.textSecondary }]}>Confirmar contraseña</Text>
            <TextInput
              style={[modalStyles.inputSingle, { borderColor: colors.borderInput, color: colors.textMain, backgroundColor: colors.background }]}
              placeholder="••••"
              placeholderTextColor={colors.placeholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {passwordError ? (
              <View style={[modalStyles.errorBox, { backgroundColor: colors.errorSoft }]}>
                <Ionicons name="alert-circle" size={16} color={colors.error} />
                <Text style={[modalStyles.errorText, { color: colors.error }]}>{passwordError}</Text>
              </View>
            ) : null}

            {passwordSuccess ? (
              <View style={[modalStyles.successBox, { backgroundColor: "#E8F5E9" }]}>
                <Ionicons name="checkmark-circle" size={16} color="#2E7D32" />
                <Text style={[modalStyles.successText, { color: "#2E7D32" }]}>Contraseña cambiada correctamente</Text>
              </View>
            ) : null}

            <View style={modalStyles.buttons}>
              <TouchableOpacity
                style={[modalStyles.cancelBtn, { borderColor: colors.border }]}
                onPress={() => setShowPasswordModal(false)}
              >
                <Text style={[modalStyles.cancelText, { color: colors.textSecondary }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.saveBtn, { backgroundColor: savingPassword ? colors.disabled : colors.primary }]}
                onPress={handleChangePassword}
                disabled={savingPassword}
              >
                <Text style={[modalStyles.saveText, { color: colors.textOnPrimary }]}>
                  {savingPassword ? "Guardando..." : "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: font.size.title,
    fontWeight: font.weight.bold,
    letterSpacing: -0.5,
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  menuDropdown: {
    position: "absolute",
    top: 70,
    right: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    minWidth: 200,
    zIndex: 101,
    ...shadow.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuItemText: {
    fontSize: font.size.base,
    fontWeight: font.weight.medium,
  },
  menuDivider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  avatarImage: {
    width: 90,
    height: 90,
  },
  name: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
  },
  subtitle: {
    fontSize: font.size.md,
    marginTop: 2,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  statIcon: {
    width: 36,
    height: 36,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: font.size.sm,
  },
  statValue: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    marginTop: 2,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  settingLabel: {
    fontSize: font.size.base,
    fontWeight: font.weight.medium,
  },
  version: {
    fontSize: font.size.sm,
  },
  achievementsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  achievementsCount: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  achievementFrame: {
    flexBasis: "30%",
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  achievementImage: {
    width: "100%",
    height: "100%",
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  container: {
    width: "100%",
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  title: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: radius.md,
  },
  input: {
    flex: 1,
    padding: spacing.md,
    fontSize: font.size.base,
  },
  inputSingle: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.size.base,
  },
  eyeBtn: {
    padding: spacing.md,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  errorText: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    flex: 1,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  successText: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cancelBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: radius.lg,
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
  },
  saveBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    paddingVertical: 12,
  },
  saveText: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
});
