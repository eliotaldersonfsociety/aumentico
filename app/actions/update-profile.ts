'use server'

import { sql } from 'drizzle-orm'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

// 🧠 Función server action
export async function updateProfile(formData: {
  name: string
  email: string
  phone: string
  password?: string
}) {
  try {
    // 🔒 Leer la cookie de sesión
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value

    if (!session) {
      return { success: false, message: 'No autenticado' }
    }

    // Obtener user_id de la sesión
    const sessionResult = await db.all(sql`SELECT user_id, expires_at FROM sessions WHERE id = ${session}`);

    if (sessionResult.length === 0) {
      return { success: false, message: 'Sesión no encontrada' }
    }

    const sessionData = sessionResult[0] as any;
    if (!sessionData.expires_at || Number(sessionData.expires_at) < Date.now()) {
      return { success: false, message: 'Sesión expirada' }
    }

    const userId = sessionData.user_id;
    if (!userId) {
      return { success: false, message: 'Usuario no encontrado' }
    }

    // 🧾 Construir actualización
    const updateData: any = {
      name: formData.name,
      phone: formData.phone,
    }

    if (formData.password && formData.password.trim() !== '') {
      const hashed = await bcrypt.hash(formData.password, 10)
      updateData.password = hashed
    }

    // 🛠️ Actualizar en la base de datos
    const updates = Object.entries(updateData).map(([key, value]) => sql`${sql.identifier(key)} = ${value}`);
    const query = sql`UPDATE users SET ${sql.join(updates, sql`, `)} WHERE id = ${userId}`;
    await db.run(query);

    return { success: true, message: 'Perfil actualizado correctamente' }
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    return { success: false, message: 'Error interno del servidor' }
  }
}
