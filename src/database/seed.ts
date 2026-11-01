import type { SQLiteDatabase } from "expo-sqlite";

import { lessonsData } from "@/constants/lessonsData";
import { evaluationsData } from "@/constants/evaluationsData";

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Leccion (
  id_leccion INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  contenido TEXT NOT NULL,
  nivel TEXT NOT NULL,
  xp_recompensa INTEGER NOT NULL,
  estado INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Evaluacion (
  id_evaluacion INTEGER PRIMARY KEY AUTOINCREMENT,
  id_leccion INTEGER NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  puntaje_minimo REAL NOT NULL,
  FOREIGN KEY (id_leccion) REFERENCES Leccion(id_leccion) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Pregunta (
  id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_evaluacion INTEGER NOT NULL,
  enunciado TEXT NOT NULL,
  tipo_pregunta TEXT NOT NULL,
  puntaje REAL NOT NULL,
  orden_pregunta INTEGER NOT NULL,
  FOREIGN KEY (id_evaluacion) REFERENCES Evaluacion(id_evaluacion) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Respuesta (
  id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pregunta INTEGER NOT NULL,
  texto_respuesta TEXT NOT NULL,
  es_correcta INTEGER NOT NULL CHECK(es_correcta IN (0,1)),
  FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Progreso (
  id_progreso INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  id_leccion INTEGER NOT NULL,
  leccion_completada INTEGER NOT NULL DEFAULT 0 CHECK(leccion_completada IN (0,1)),
  evaluacion_aprobada INTEGER NOT NULL DEFAULT 0 CHECK(evaluacion_aprobada IN (0,1)),
  puntuacion REAL DEFAULT 0,
  fecha_completado TEXT,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_leccion) REFERENCES Leccion(id_leccion) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (id_usuario, id_leccion)
);

CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  xp_total INTEGER NOT NULL DEFAULT 0,
  fecha_registro TEXT NOT NULL,
  estado INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_progreso_usuario ON Progreso(id_usuario);
CREATE INDEX IF NOT EXISTS idx_progreso_leccion ON Progreso(id_leccion);
CREATE INDEX IF NOT EXISTS idx_pregunta_evaluacion ON Pregunta(id_evaluacion);
CREATE INDEX IF NOT EXISTS idx_respuesta_pregunta ON Respuesta(id_pregunta);
`;

export async function seedDatabase(db: SQLiteDatabase) {
  await db.execAsync(SCHEMA);

  const existing = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM Leccion"
  );
  if (existing && existing.count > 0) return;

  await db.withTransactionAsync(async () => {
    for (const lesson of lessonsData) {
      const result = await db.runAsync(
        "INSERT INTO Leccion (external_id, titulo, descripcion, contenido, nivel, xp_recompensa, estado) VALUES (?, ?, ?, ?, ?, ?, ?)",
        lesson.id,
        lesson.title,
        lesson.pages[0]?.content.slice(0, 100) ?? "",
        JSON.stringify(lesson.pages),
        lesson.moduleId,
        20,
        1
      );
      const lessonId = result.lastInsertRowId;

      const evaluation = evaluationsData.find((e) => e.moduleId === lesson.moduleId && e.id === lesson.id);
      if (!evaluation) continue;

      const evalResult = await db.runAsync(
        "INSERT INTO Evaluacion (id_leccion, titulo, descripcion, puntaje_minimo) VALUES (?, ?, ?, ?)",
        lessonId,
        evaluation.title,
        "Evaluacion del modulo",
        75.0
      );
      const evalId = evalResult.lastInsertRowId;

      for (const page of evaluation.pages) {
        if (!page.quiz) continue;
        const q = page.quiz;

        const pregResult = await db.runAsync(
          "INSERT INTO Pregunta (id_evaluacion, enunciado, tipo_pregunta, puntaje, orden_pregunta) VALUES (?, ?, ?, ?, ?)",
          evalId,
          q.question,
          q.type,
          10.0,
          evaluation.pages.indexOf(page) + 1
        );
        const pregId = pregResult.lastInsertRowId;

        if (q.options) {
          for (const opt of q.options) {
            await db.runAsync(
              "INSERT INTO Respuesta (id_pregunta, texto_respuesta, es_correcta) VALUES (?, ?, ?)",
              pregId,
              opt.label,
              opt.isCorrect ? 1 : 0
            );
          }
        }

        if (q.correctOrder) {
          for (let i = 0; i < q.correctOrder.length; i++) {
            await db.runAsync(
              "INSERT INTO Respuesta (id_pregunta, texto_respuesta, es_correcta) VALUES (?, ?, ?)",
              pregId,
              q.correctOrder[i],
              1
            );
          }
        }

        if (q.blankAnswer) {
          const blank = Array.isArray(q.blankAnswer) ? q.blankAnswer[0] : q.blankAnswer;
          await db.runAsync(
            "INSERT INTO Respuesta (id_pregunta, texto_respuesta, es_correcta) VALUES (?, ?, ?)",
            pregId,
            blank,
            1
          );
        }
      }
    }

    await db.runAsync(
      "INSERT INTO Usuario (nombre, apellido, correo, password_hash, xp_total, fecha_registro, estado) VALUES (?, ?, ?, ?, ?, ?, ?)",
      "Usuario",
      "Default",
      "default@bitprogress.app",
      "",
      0,
      new Date().toISOString(),
      1
    );
  });
}
