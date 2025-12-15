'use server';

import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users, sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';

// ==== OPTIMIZACIÓN IMPORTANTE PARA TURSO ====
// Evita row-reads altos al asegurar un índice:
///  Asegúrate que users.email sea UNIQUE en tu schema:
// email: text("email").notNull().unique()
//
// ============================================

export async function loginForCheckout(formData: FormData) {
  try {
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString() || '';

    if (!email || !password) {
      return { error: 'Email y contraseña son requeridos' };
    }

    // ================================
    //   1) OBTENER USUARIO (UNA SOLA QUERY)
    // ================================
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        name: users.name,
        role: users.role,
        balance: users.balance,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || !user.password) {
      // Prevenimos timing leaks usando un compare falso
      await compare(password, '$2a$10$invalidinvalidinvalidinvalidinv');
      return { error: 'Credenciales incorrectas' };
    }

    // ================================
    //   2) COMPARAR CONTRASEÑA
    // ================================
    const passwordMatch = await compare(password, String(user.password));

    if (!passwordMatch) {
      return { error: 'Credenciales incorrectas' };
    }

    // ================================
    //   3) CREAR SESIÓN (UNA SOLA MUTACIÓN)
    // ================================
    const sessionId = randomUUID();
    const expiresAt = Math.floor((new Date(Date.now() + 7 * 86400 * 1000)).getTime() / 1000); // 7 días

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt,
    });

    // ================================
    //   4) GUARDAR COOKIE
    // ================================
    (await cookies()).set('session', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    // ================================
    //   5) RETORNO FINAL
    // ================================
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        balance: user.balance,
      },
    };

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Algo salió mal, intenta nuevamente' };
  }
}
