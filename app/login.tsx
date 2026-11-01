import { useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { font, radius, spacing } from "@/constants/theme";
import { useColors } from "@/hooks/useColors";
import { useUser } from "@/context/UserContext";
import {
  loginUsuario,
  createUsuario,
  existeCorreo,
  getUsuarioById,
  resetPassword,
} from "@/database/userQueries";
import { containsProfanity } from "@/utils/profanityFilter";

const AVATARS = [
  { key: "boy", label: "Chico", source: require("@/assets/images/Avatar/PerfilBoy.png") },
  { key: "girl", label: "Chica", source: require("@/assets/images/Avatar/PerfilGirl.png") },
] as const;

type Tab = "login" | "register" | "forgot";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colors = useColors();
  const db = useSQLiteContext();
  const { setUsuario } = useUser();

  const [tab, setTab] = useState<Tab>("login");

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("boy");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!correo.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }
    setLoading(true);
    try {
      const user = await loginUsuario(db, correo.trim().toLowerCase(), password);
      if (!user) {
        setError("Correo o contraseña incorrectos");
        setLoading(false);
        return;
      }
      setUsuario(user);
      router.replace("/(tabs)");
    } catch {
      setError("Error al iniciar sesión");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setError("");
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return;
    }
    if (containsProfanity(nombre)) {
      setError("No se puede registrar ese nombre");
      return;
    }
    setLoading(true);
    try {
      const exists = await existeCorreo(db, correo.trim().toLowerCase());
      if (exists) {
        setError("Este correo ya está registrado");
        setLoading(false);
        return;
      }
      const newId = await createUsuario(
        db,
        nombre.trim(),
        correo.trim().toLowerCase(),
        password,
        selectedAvatar
      );
      const user = await getUsuarioById(db, newId);
      if (user) {
        setUsuario(user);
        router.replace("/(tabs)");
      }
    } catch {
      setError("Error al crear la cuenta");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetSuccess(false);
    if (!correo.trim()) {
      setError("Ingresá tu correo electrónico");
      return;
    }
    setLoading(true);
    try {
      const exists = await existeCorreo(db, correo.trim().toLowerCase());
      if (!exists) {
        setError("No existe una cuenta con ese correo");
        setLoading(false);
        return;
      }
      await resetPassword(db, correo.trim().toLowerCase(), "1234");
      setResetSuccess(true);
    } catch {
      setError("Error al restablecer la contraseña");
    }
    setLoading(false);
  };

  const isLogin = tab === "login";

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing.xxl, paddingBottom: insets.bottom + spacing.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appName, { color: colors.primary }]}>BitProgress</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Aprende redes paso a paso
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, isLogin && { borderBottomColor: colors.primary }]}
              onPress={() => { setTab("login"); setError(""); setResetSuccess(false); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, { color: isLogin ? colors.primary : colors.textSecondary }]}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === "register" && { borderBottomColor: colors.primary }]}
              onPress={() => { setTab("register"); setError(""); setResetSuccess(false); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, { color: tab === "register" ? colors.primary : colors.textSecondary }]}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>

          {!isLogin && tab !== "forgot" && (
            <>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Nombre</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.borderInput, color: colors.textMain, backgroundColor: colors.background }]}
                placeholder="Tu nombre"
                placeholderTextColor={colors.placeholder}
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words"
              />

              <Text style={[styles.label, { color: colors.textSecondary }]}>Elige tu avatar</Text>
              <View style={styles.avatarRow}>
                {AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av.key;
                  return (
                    <TouchableOpacity
                      key={av.key}
                      style={[
                        styles.avatarOption,
                        {
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected ? colors.primarySoft : colors.background,
                        },
                      ]}
                      onPress={() => setSelectedAvatar(av.key)}
                      activeOpacity={0.7}
                    >
                      <Image source={av.source} style={styles.avatarImage} resizeMode="contain" />
                      <Text style={[styles.avatarLabel, { color: isSelected ? colors.primary : colors.textSecondary }]}>
                        {av.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          {tab === "forgot" && (
            <>
              <View style={[styles.forgotHeader, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="key-outline" size={32} color={colors.primary} />
                <Text style={[styles.forgotTitle, { color: colors.textMain }]}>Restablecer contraseña</Text>
                <Text style={[styles.forgotSubtitle, { color: colors.textSecondary }]}>
                  Ingresá el correo de tu cuenta y te enviaremos la contraseña temporal.
                </Text>
              </View>
            </>
          )}

          {tab !== "forgot" && (
            <>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Correo</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.borderInput, color: colors.textMain, backgroundColor: colors.background }]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={colors.placeholder}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={[styles.label, { color: colors.textSecondary }]}>Contraseña</Text>
              <View style={[styles.passwordRow, { borderColor: colors.borderInput, backgroundColor: colors.background }]}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.textMain }]}
                  placeholder="••••"
                  placeholderTextColor={colors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {tab === "forgot" && (
            <>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Correo</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.borderInput, color: colors.textMain, backgroundColor: colors.background }]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={colors.placeholder}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </>
          )}

          {tab === "forgot" && resetSuccess && (
            <View style={[styles.successBox, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
              <Text style={[styles.successText, { color: "#2E7D32" }]}>
                Contraseña restablecida a "1234". Recomendamos cambiarla después de iniciar sesión.
              </Text>
            </View>
          )}

          {error ? (
            <View style={[styles.errorBox, { backgroundColor: colors.errorSoft }]}>
              <Ionicons name="alert-circle" size={18} color={colors.error} />
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}

          {isLogin && (
            <TouchableOpacity
              onPress={() => { setTab("forgot"); setError(""); setResetSuccess(false); }}
              style={styles.forgotLink}
              activeOpacity={0.7}
            >
              <Text style={[styles.forgotLinkText, { color: colors.primary }]}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: loading ? colors.disabled : colors.primary }]}
            onPress={tab === "forgot" ? handleForgotPassword : isLogin ? handleLogin : handleRegister}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={[styles.submitText, { color: colors.textOnPrimary }]}>
              {loading ? "Cargando..." : tab === "forgot" ? "Restablecer" : isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </Text>
          </TouchableOpacity>

          {tab === "forgot" && (
            <TouchableOpacity
              onPress={() => { setTab("login"); setError(""); setResetSuccess(false); }}
              style={styles.backLink}
              activeOpacity={0.7}
            >
              <Text style={[styles.backLinkText, { color: colors.primary }]}>
                Volver al inicio de sesión
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: font.size.title,
    fontWeight: font.weight.bold,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: font.size.md,
    marginTop: 4,
  },
  card: {
    width: "100%",
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.xl,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E1EF",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
  },
  label: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.size.base,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: radius.md,
  },
  passwordInput: {
    flex: 1,
    padding: spacing.md,
    fontSize: font.size.base,
  },
  eyeBtn: {
    padding: spacing.md,
  },
  avatarRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  avatarOption: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  avatarImage: {
    width: 64,
    height: 64,
  },
  avatarLabel: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
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
  forgotHeader: {
    alignItems: "center",
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  forgotTitle: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
  forgotSubtitle: {
    fontSize: font.size.sm,
    textAlign: "center",
  },
  forgotLink: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  forgotLinkText: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
  },
  backLink: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  backLinkText: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
  },
  submitBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: radius.lg,
    marginTop: spacing.xl,
  },
  submitText: {
    fontSize: font.size.base,
    fontWeight: font.weight.bold,
  },
});
