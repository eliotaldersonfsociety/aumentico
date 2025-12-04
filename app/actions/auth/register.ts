// app/actions/auth/register.ts
'use server';

import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { hash } from 'bcryptjs';
import { z } from 'zod';

// 📌 Validación estricta
const registerSchema = z.object({
  name: z.string().min(2, 'Nombre inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'Teléfono inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export async function register(formData: FormData) {
  try {
    // 1️⃣ Sanitización
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

    // 2️⃣ Comprobar si el email ya existe (1 row-read)
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return { error: 'Este email ya está registrado' };
    }

    // 3️⃣ Hashear contraseña
    const hashedPassword = await hash(password, 10);

    // 4️⃣ Insertar usuario (1 write)
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'client',
      balance: 0,
    });

    // 5️⃣ Redirigir de forma segura
    redirect('/auth/login?success=registered');

  } catch (err) {
    console.error('Register error:', err);
    return { error: 'Ocurrió un error inesperado. Intenta nuevamente.' };
  }
}
