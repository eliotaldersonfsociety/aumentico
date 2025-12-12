// app/actions/auth/login.ts
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users, sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function login(prevState: any, formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString() || '',
    };

    const validated = loginSchema.safeParse(rawFormData);
    if (!validated.success) {
      return { error: 'Email o contraseña inválidos' };
    }

    const { email, password } = validated.data;

    // ===============================
    // 1) Obtener usuario (UNA SOLA QUERY)
    // ===============================
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
      // protege contra timing attacks
      await compare(password, '$2a$10$invalidinvalidinvalidinvalidinv');
      return { error: 'Credenciales incorrectas' };
    }

    // ===============================
    // 2) Comparar contraseña
    // ===============================
    const passwordMatch = await compare(password, String(user.password));
    if (!passwordMatch) {
      return { error: 'Credenciales incorrectas' };
    }

    // ===============================
    // 3) Crear sesión (1 sola escritura)
    // ===============================
    const sessionId = randomUUID();
    const expiresAt = Date.now() + 7 * 86400 * 1000; // 7 días

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt,
    });

    // ===============================
    // 4) Guardar cookie segura
    // ===============================
    (await cookies()).set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    // ===============================
    // 5) Redirección segura por rol
    // ===============================

    // Prevenimos user.role que venga vacío o manipulado
    const role = user.role ?? 'client';

    if (role === 'admin') {
      return { success: true, redirect: '/dashboard/admin' };
    } else {
      return { success: true, redirect: '/dashboard/client' };
    }

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Ocurrió un error inesperado, intenta nuevamente' };
  }
}
