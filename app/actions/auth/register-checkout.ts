'use server';

import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users, sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { z } from 'zod';

// =========================
// 1) VALIDACIÓN ZOD
// =========================
const registerSchema = z.object({
  name: z.string().min(2, 'Nombre inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'Teléfono inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export async function registerForCheckout(formData: FormData) {
  try {
    // =========================
    // 2) Sanitización de campos
    // =========================
    const rawForm = {
      name: (formData.get('name') ?? '').toString().trim(),
      email: (formData.get('email') ?? '').toString().trim().toLowerCase(),
      phone: (formData.get('phone') ?? '').toString().trim(),
      password: (formData.get('password') ?? '').toString(),
    };

    const validated = registerSchema.safeParse(rawForm);
    if (!validated.success) {
      return { error: validated.error.issues[0].message };
    }

    const { name, email, phone, password } = validated.data;

    // =========================
    // 3) Verificar si ya existe (1 row-read)
    // =========================
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return { error: 'Este email ya está registrado' };
    }

    // =========================
    // 4) Hashear contraseña
    // =========================
    const hashedPassword = await hash(password, 10);

    // =========================
    // 5) INSERT del usuario (1 escritura)
    // =========================
    const userId = randomUUID();
    const [user] = await db
      .insert(users)
      .values({
        id: userId,
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'client',
        balance: 0,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        balance: users.balance,
      });

    // =========================
    // 6) Crear sesión
    // =========================
    const sessionId = randomUUID();
    const expiresAt = Math.floor((new Date(Date.now() + 7 * 86400 * 1000)).getTime() / 1000);

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt,
    });

    // =========================
    // 7) Guardar cookie segura
    // =========================
    (await cookies()).set('session', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 86400,
      path: '/',
    });

    return { success: true, user };

  } catch (err) {
    console.error('Register error:', err);
    return { error: 'Ocurrió un error al registrarte. Intenta nuevamente.' };
  }
}
