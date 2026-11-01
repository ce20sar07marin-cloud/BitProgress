import type { SQLiteDatabase } from "expo-sqlite";

export interface DBLeccion {
  id_leccion: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  nivel: string;
  xp_recompensa: number;
  estado: number;
}

export interface DBEvaluacion {
  id_evaluacion: number;
  id_leccion: number;
  titulo: string;
  descripcion: string;
  puntaje_minimo: number;
}

export interface DBPregunta {
  id_pregunta: number;
  id_evaluacion: number;
  enunciado: string;
  tipo_pregunta: string;
  puntaje: number;
  orden_pregunta: number;
}

export interface DBRespuesta {
  id_respuesta: number;
  id_pregunta: number;
  texto_respuesta: string;
  es_correcta: number;
}

export interface DBProgreso {
  id_progreso: number;
  id_usuario: number;
  id_leccion: number;
  leccion_completada: number;
  evaluacion_aprobada: number;
  puntuacion: number;
  fecha_completado: string;
}

export async function getLecciones(db: SQLiteDatabase): Promise<DBLeccion[]> {
  return db.getAllAsync<DBLeccion>("SELECT * FROM Leccion WHERE estado = 1");
}

export async function getLeccionById(db: SQLiteDatabase, id: number): Promise<DBLeccion | null> {
  return db.getFirstAsync<DBLeccion>("SELECT * FROM Leccion WHERE id_leccion = ?", id);
}

export async function getEvaluaciones(db: SQLiteDatabase): Promise<DBEvaluacion[]> {
  return db.getAllAsync<DBEvaluacion>("SELECT * FROM Evaluacion");
}

export async function getEvaluacionById(db: SQLiteDatabase, id: number): Promise<DBEvaluacion | null> {
  return db.getFirstAsync<DBEvaluacion>("SELECT * FROM Evaluacion WHERE id_evaluacion = ?", id);
}

export async function getEvaluacionByLeccionId(db: SQLiteDatabase, leccionId: number): Promise<DBEvaluacion | null> {
  return db.getFirstAsync<DBEvaluacion>("SELECT * FROM Evaluacion WHERE id_leccion = ?", leccionId);
}

export async function getPreguntas(db: SQLiteDatabase, evaluacionId: number): Promise<DBPregunta[]> {
  return db.getAllAsync<DBPregunta>(
    "SELECT * FROM Pregunta WHERE id_evaluacion = ? ORDER BY orden_pregunta",
    evaluacionId
  );
}

export async function getRespuestas(db: SQLiteDatabase, preguntaId: number): Promise<DBRespuesta[]> {
  return db.getAllAsync<DBRespuesta>(
    "SELECT * FROM Respuesta WHERE id_pregunta = ?",
    preguntaId
  );
}

export async function getProgresoUsuario(db: SQLiteDatabase, usuarioId: number): Promise<DBProgreso[]> {
  return db.getAllAsync<DBProgreso>(
    "SELECT * FROM Progreso WHERE id_usuario = ?",
    usuarioId
  );
}

export async function getProgresoLeccion(db: SQLiteDatabase, usuarioId: number, leccionId: number): Promise<DBProgreso | null> {
  return db.getFirstAsync<DBProgreso>(
    "SELECT * FROM Progreso WHERE id_usuario = ? AND id_leccion = ?",
    usuarioId,
    leccionId
  );
}

export async function saveLeccionCompletada(
  db: SQLiteDatabase,
  usuarioId: number,
  leccionId: number,
  xpGanado: number
) {
  const existing = await getProgresoLeccion(db, usuarioId, leccionId);

  if (existing) {
    await db.runAsync(
      "UPDATE Progreso SET leccion_completada = 1, puntuacion = MAX(puntuacion, ?), fecha_completado = ? WHERE id_progreso = ?",
      xpGanado,
      new Date().toISOString(),
      existing.id_progreso
    );
  } else {
    await db.runAsync(
      "INSERT INTO Progreso (id_usuario, id_leccion, leccion_completada, evaluacion_aprobada, puntuacion, fecha_completado) VALUES (?, ?, 1, 0, ?, ?)",
      usuarioId,
      leccionId,
      xpGanado,
      new Date().toISOString()
    );
  }
}

export async function saveEvaluacionCompletada(
  db: SQLiteDatabase,
  usuarioId: number,
  leccionId: number,
  puntuacion: number,
  aprobada: boolean
) {
  const existing = await getProgresoLeccion(db, usuarioId, leccionId);

  if (existing) {
    await db.runAsync(
      "UPDATE Progreso SET evaluacion_aprobada = ?, puntuacion = MAX(puntuacion, ?), fecha_completado = ? WHERE id_progreso = ?",
      aprobada ? 1 : 0,
      puntuacion,
      new Date().toISOString(),
      existing.id_progreso
    );
  } else {
    await db.runAsync(
      "INSERT INTO Progreso (id_usuario, id_leccion, leccion_completada, evaluacion_aprobada, puntuacion, fecha_completado) VALUES (?, ?, 0, ?, ?, ?)",
      usuarioId,
      leccionId,
      aprobada ? 1 : 0,
      puntuacion,
      new Date().toISOString()
    );
  }
}

export async function updateUsuarioXP(
  db: SQLiteDatabase,
  usuarioId: number,
  xpTotal: number
) {
  await db.runAsync(
    "UPDATE Usuario SET xp_total = ? WHERE id_usuario = ?",
    xpTotal,
    usuarioId
  );
}

export async function getUsuario(db: SQLiteDatabase, usuarioId: number) {
  return db.getFirstAsync<{ xp_total: number }>(
    "SELECT xp_total FROM Usuario WHERE id_usuario = ?",
    usuarioId
  );
}

export async function getLeccionesCompletadasCount(db: SQLiteDatabase, usuarioId: number): Promise<number> {
  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM Progreso WHERE leccion_completada = 1 AND id_usuario = ?",
    usuarioId
  );
  return result?.count ?? 0;
}

export async function isLeccionCompletada(db: SQLiteDatabase, titulo: string, usuarioId: number): Promise<boolean> {
  const result = await db.getFirstAsync<{ leccion_completada: number }>(
    `SELECT p.leccion_completada
     FROM Progreso p
     JOIN Leccion l ON l.id_leccion = p.id_leccion
     WHERE l.titulo = ? AND p.id_usuario = ?`,
    titulo,
    usuarioId
  );
  return result?.leccion_completada === 1;
}

export async function isLeccionCompletadaByExternalId(
  db: SQLiteDatabase,
  externalId: string,
  usuarioId: number
): Promise<boolean> {
  const result = await db.getFirstAsync<{ leccion_completada: number }>(
    `SELECT p.leccion_completada
     FROM Progreso p
     JOIN Leccion l ON l.id_leccion = p.id_leccion
     WHERE l.external_id = ? AND p.id_usuario = ?`,
    externalId,
    usuarioId
  );
  return result?.leccion_completada === 1;
}

export interface LessonSummary {
  external_id: string;
  titulo: string;
  nivel: string;
}

export async function getLeccionesResumen(db: SQLiteDatabase): Promise<LessonSummary[]> {
  return db.getAllAsync<LessonSummary>(
    "SELECT external_id, titulo, nivel FROM Leccion WHERE estado = 1"
  );
}

export interface DBLeccionCompleta extends DBLeccion {
  pages_json: string;
}

export async function getLeccionByExternalId(
  db: SQLiteDatabase,
  externalId: string
): Promise<DBLeccionCompleta | null> {
  return db.getFirstAsync<DBLeccionCompleta>(
    "SELECT *, contenido as pages_json FROM Leccion WHERE external_id = ?",
    externalId
  );
}

export interface EvalSummary {
  id_evaluacion: number;
  external_id: string;
  titulo: string;
  nivel: string;
  id_leccion: number;
}

export async function getEvaluacionesResumen(db: SQLiteDatabase): Promise<EvalSummary[]> {
  return db.getAllAsync<EvalSummary>(
    `SELECT e.id_evaluacion, e.titulo, l.nivel, l.external_id, e.id_leccion
     FROM Evaluacion e
     JOIN Leccion l ON l.id_leccion = e.id_leccion`
  );
}

export async function getEvaluacionByExternalId(
  db: SQLiteDatabase,
  externalId: string
): Promise<DBEvaluacion | null> {
  return db.getFirstAsync<DBEvaluacion>(
    `SELECT e.*
     FROM Evaluacion e
     JOIN Leccion l ON l.id_leccion = e.id_leccion
     WHERE l.external_id = ?`,
    externalId
  );
}

export async function resetAllProgress(db: SQLiteDatabase, usuarioId: number) {
  await db.runAsync("DELETE FROM Progreso WHERE id_usuario = ?", usuarioId);
  await db.runAsync("UPDATE Usuario SET xp_total = 0 WHERE id_usuario = ?", usuarioId);
}

export async function isEvaluacionAprobadaByExternalId(
  db: SQLiteDatabase,
  externalId: string,
  usuarioId: number
): Promise<boolean> {
  const result = await db.getFirstAsync<{ evaluacion_aprobada: number }>(
    `SELECT p.evaluacion_aprobada
     FROM Progreso p
     JOIN Leccion l ON l.id_leccion = p.id_leccion
     WHERE l.external_id = ? AND p.id_usuario = ?`,
    externalId,
    usuarioId
  );
  return result?.evaluacion_aprobada === 1;
}

export async function getLeccionesCompletadasMap(
  db: SQLiteDatabase,
  usuarioId: number
): Promise<Record<string, boolean>> {
  const rows = await db.getAllAsync<{ external_id: string; leccion_completada: number }>(
    `SELECT l.external_id, COALESCE(p.leccion_completada, 0) as leccion_completada
     FROM Leccion l
     LEFT JOIN Progreso p ON p.id_leccion = l.id_leccion AND p.id_usuario = ?
     WHERE l.estado = 1`,
    usuarioId
  );
  const map: Record<string, boolean> = {};
  for (const r of rows) {
    map[r.external_id] = r.leccion_completada === 1;
  }
  return map;
}

export async function getPreguntasConRespuestas(
  db: SQLiteDatabase,
  evaluacionId: number
): Promise<{ preguntas: DBPregunta[]; respuestasMap: Record<number, DBRespuesta[]> }> {
  const preguntas = await getPreguntas(db, evaluacionId);
  if (preguntas.length === 0) return { preguntas, respuestasMap: {} };

  const ids = preguntas.map((p) => p.id_pregunta);
  const placeholders = ids.map(() => "?").join(",");
  const allRespuestas = await db.getAllAsync<DBRespuesta>(
    `SELECT * FROM Respuesta WHERE id_pregunta IN (${placeholders})`,
    ...ids
  );

  const respuestasMap: Record<number, DBRespuesta[]> = {};
  for (const r of allRespuestas) {
    if (!respuestasMap[r.id_pregunta]) respuestasMap[r.id_pregunta] = [];
    respuestasMap[r.id_pregunta].push(r);
  }

  return { preguntas, respuestasMap };
}

export async function getEvaluacionesData(
  db: SQLiteDatabase,
  usuarioId: number
): Promise<{
  summaries: EvalSummary[];
  progresoMap: Record<number, DBProgreso>;
  pregCountMap: Record<number, number>;
  unlockedMap: Record<string, boolean>;
}> {
  const summaries = await getEvaluacionesResumen(db);

  const progresoRows = await getProgresoUsuario(db, usuarioId);
  const progresoMap: Record<number, DBProgreso> = {};
  for (const p of progresoRows) {
    progresoMap[p.id_leccion] = p;
  }

  const countRows = await db.getAllAsync<{ id_evaluacion: number; count: number }>(
    `SELECT id_evaluacion, COUNT(*) as count FROM Pregunta GROUP BY id_evaluacion`
  );
  const pregCountMap: Record<number, number> = {};
  for (const c of countRows) {
    pregCountMap[c.id_evaluacion] = c.count;
  }

  const unlockedMap = await getLeccionesCompletadasMap(db, usuarioId);

  return { summaries, progresoMap, pregCountMap, unlockedMap };
}

export async function getProgresoMapByExternalId(
  db: SQLiteDatabase,
  usuarioId: number
): Promise<Record<string, { lessonDone: boolean; evalDone: boolean }>> {
  const rows = await db.getAllAsync<{
    external_id: string;
    leccion_completada: number;
    evaluacion_aprobada: number;
  }>(
    `SELECT l.external_id,
            COALESCE(p.leccion_completada, 0) as leccion_completada,
            COALESCE(p.evaluacion_aprobada, 0) as evaluacion_aprobada
     FROM Leccion l
     LEFT JOIN Progreso p ON p.id_leccion = l.id_leccion AND p.id_usuario = ?
     WHERE l.estado = 1`,
    usuarioId
  );
  const map: Record<string, { lessonDone: boolean; evalDone: boolean }> = {};
  for (const r of rows) {
    map[r.external_id] = {
      lessonDone: r.leccion_completada === 1,
      evalDone: r.evaluacion_aprobada === 1,
    };
  }
  return map;
}
