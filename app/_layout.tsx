import { Suspense, useEffect, useState } from "react";

import { Text } from "react-native";

import { Asset } from "expo-asset";
import { Directory, File, Paths } from "expo-file-system";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { XPProvider } from "@/context/XPContext";
import { AchievementsProvider } from "@/context/AchievementsContext";
import { UserProvider, useUser } from "@/context/UserContext";

SplashScreen.preventAutoHideAsync();

// @ts-ignore – legacy defaultProps used for global font
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.style = { fontFamily: "Poppins_400Regular" };

const DB_NAME = "BitProgress.db";
const DB_VERSION = 5;

const TITLE_TO_ID: Record<string, string> = {
  "Que es una red": "b1",
  "Por que son importantes las redes": "b1-2",
  "Tipos de Redes Informaticas": "b1-3",
  "Tecnologias de Red que usamos diariamente": "b1-4",
  "Internet: La Red de Redes": "b1-5",
  "Aplicaciones Cotidianas de las Redes": "b1-6",
  "Conceptos Fundamentales de Redes": "b1-7",
  "Recorrido de un Dato en una Red": "b1-8",
  "Repaso General del Modulo": "b1-9",
  "Tipos de redes": "b2",
  "Dispositivos de red": "b3",
  "Direccionamiento IP": "i1",
  "Subredes y mascara": "i2",
  "Topologias de red": "i3",
  "Protocolos TCP/IP": "a1",
  "Puertos y servicios": "a2",
  "Seguridad en red": "a3",
};

async function copyBundledDBIfNeeded() {
  const sqliteDir = new Directory(Paths.document, "SQLite");

  try {
    if (!sqliteDir.exists) {
      await sqliteDir.create();
    }
  } catch {}

  const dbFile = new File(sqliteDir, DB_NAME);

  if (dbFile.exists && dbFile.size > 10000) return;

  try {
    if (dbFile.exists) dbFile.delete();
  } catch {}

  try {
    const wal = new File(sqliteDir, DB_NAME + "-wal");
    const shm = new File(sqliteDir, DB_NAME + "-shm");
    if (wal.exists) wal.delete();
    if (shm.exists) shm.delete();
  } catch {}

  try {
    const asset = Asset.fromModule(require("@/assets/database/BitProgress.db"));
    const downloaded = await asset.downloadAsync();

    if (downloaded?.localUri) {
      const sourceFile = new File(downloaded.localUri);
      await sourceFile.copy(dbFile, { overwrite: true });
    }
  } catch {}
}

async function migrateDB(db: SQLiteDatabase) {
  const tableExists = await db.getFirstAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='Leccion'",
  );
  if (!tableExists) return;

  const col = await db.getFirstAsync<{ name: string }>(
    "SELECT name FROM pragma_table_info('Leccion') WHERE name = 'external_id'",
  );
  if (!col) {
    await db.execAsync("ALTER TABLE Leccion ADD COLUMN external_id TEXT");

    const lessons = await db.getAllAsync<{
      id_leccion: number;
      titulo: string;
    }>("SELECT id_leccion, titulo FROM Leccion");
    for (const l of lessons) {
      const eid = TITLE_TO_ID[l.titulo];
      if (eid) {
        await db.runAsync(
          "UPDATE Leccion SET external_id = ? WHERE id_leccion = ?",
          eid,
          l.id_leccion,
        );
      }
    }
    await db.execAsync(
      "CREATE UNIQUE INDEX IF NOT EXISTS idx_leccion_external_id ON Leccion(external_id)",
    );
  }

  const VALID_IDS = ["b1", "b2", "b3", "i1", "i2", "i3", "a1", "a2", "a3"];
  const placeholders = VALID_IDS.map(() => "?").join(",");
  await db.runAsync(
    `DELETE FROM Evaluacion WHERE id_leccion NOT IN (SELECT id_leccion FROM Leccion WHERE external_id IN (${placeholders}))`,
    ...VALID_IDS,
  );

  const avatarCol = await db.getFirstAsync<{ name: string }>(
    "SELECT name FROM pragma_table_info('Usuario') WHERE name = 'avatar'",
  );
  if (!avatarCol) {
    await db.execAsync("ALTER TABLE Usuario ADD COLUMN avatar TEXT NOT NULL DEFAULT 'boy'");
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
}

async function onInitDB(db: SQLiteDatabase) {
  await migrateDB(db);
}

const LESSON_IDS = ["b1", "b2", "b3", "i1", "i2", "i3", "a1", "a2", "a3"];

function AppContent() {
  const { userId, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!userId) {
      router.replace("/login");
    }
  }, [userId, isLoading, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" options={{ animation: "fade" }} />
      {LESSON_IDS.map((id) => (
        <Stack.Screen
          key={id}
          name={`lesson/${id}`}
          options={{ animation: "slide_from_right" }}
        />
      ))}
      <Stack.Screen
        name="evaluation/[id]"
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) return;
    copyBundledDBIfNeeded()
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, [fontsLoaded]);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider>
      <UserProvider>
        <Suspense fallback={null}>
          <SQLiteProvider databaseName={DB_NAME} onInit={onInitDB}>
            <XPProvider>
              <FavoritesProvider>
                <AchievementsProvider>
                  <AppContent />
                </AchievementsProvider>
              </FavoritesProvider>
            </XPProvider>
          </SQLiteProvider>
        </Suspense>
      </UserProvider>
    </ThemeProvider>
  );
}
