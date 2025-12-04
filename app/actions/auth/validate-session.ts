// app/actions/auth/validate-session.ts
'use server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users, sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function validateSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return { valid: false, user: null };
  }

  // Buscar la sesión en la base de datos
  const sessionResult = await db
    .select({ userId: sessions.userId, expiresAt: sessions.expiresAt })
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (sessionResult.length === 0) {
    return { valid: false, user: null };
  }

  const session = sessionResult[0];
  if (!session.expiresAt || session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return { valid: false, user: null };
  }

  // Buscar los datos del usuario
  const userResult = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      balance: users.balance,
      phone: users.phone,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (userResult.length === 0) {
    return { valid: false, user: null };
  }

  const user = userResult[0];

  if (user.role !== 'client' && user.role !== 'admin') {
    return { valid: false, user: null };
  }

  return {
    valid: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance,
      phone: user.phone,
      created_at: user.createdAt,
    },
  };
}
