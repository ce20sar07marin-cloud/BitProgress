import type { SQLiteDatabase } from "expo-sqlite";

export interface DBUsuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  password_hash: string;
  xp_total: number;
  fecha_registro: string;
  estado: number;
  avatar: string;
}

export async function getUsuarioByEmail(
  db: SQLiteDatabase,
  correo: string
): Promise<DBUsuario | null> {
  return db.getFirstAsync<DBUsuario>(
    "SELECT * FROM Usuario WHERE correo = ? AND estado = 1",
    correo
  );
}

export async function getUsuarioById(
  db: SQLiteDatabase,
  id: number
): Promise<DBUsuario | null> {
  return db.getFirstAsync<DBUsuario>(
    "SELECT * FROM Usuario WHERE id_usuario = ?",
    id
  );
}

export async function createUsuario(
  db: SQLiteDatabase,
  nombre: string,
  correo: string,
  password: string,
  avatar: string
): Promise<number> {
  const result = await db.runAsync(
    "INSERT INTO Usuario (nombre, apellido, correo, password_hash, xp_total, fecha_registro, estado, avatar) VALUES (?, ?, ?, ?, 0, ?, 1, ?)",
    nombre,
    "",
    correo,
    password,
    new Date().toISOString(),
    avatar
  );
  return result.lastInsertRowId;
}

export async function loginUsuario(
  db: SQLiteDatabase,
  correo: string,
  password: string
): Promise<DBUsuario | null> {
  return db.getFirstAsync<DBUsuario>(
    "SELECT * FROM Usuario WHERE correo = ? AND password_hash = ? AND estado = 1",
    correo,
    password
  );
}

export async function existeCorreo(
  db: SQLiteDatabase,
  correo: string
): Promise<boolean> {
  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM Usuario WHERE correo = ?",
    correo
  );
  return (result?.count ?? 0) > 0;
}

export async function resetPassword(
  db: SQLiteDatabase,
  correo: string,
  newPassword: string
): Promise<boolean> {
  const result = await db.runAsync(
    "UPDATE Usuario SET password_hash = ? WHERE correo = ? AND estado = 1",
    newPassword,
    correo
  );
  return result.changes > 0;
}

export async function deleteUsuario(
  db: SQLiteDatabase,
  usuarioId: number
): Promise<void> {
  await db.runAsync("DELETE FROM Progreso WHERE id_usuario = ?", usuarioId);
  await db.runAsync("DELETE FROM Usuario WHERE id_usuario = ?", usuarioId);
}

export async function changePassword(
  db: SQLiteDatabase,
  usuarioId: number,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = await db.getFirstAsync<DBUsuario>(
    "SELECT * FROM Usuario WHERE id_usuario = ? AND password_hash = ?",
    usuarioId,
    currentPassword
  );
  if (!user) {
    return { success: false, error: "La contraseña actual es incorrecta" };
  }
  await db.runAsync(
    "UPDATE Usuario SET password_hash = ? WHERE id_usuario = ?",
    newPassword,
    usuarioId
  );
  return { success: true };
}
