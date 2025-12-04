// app/actions/auth/logout.ts
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function logout() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (sessionId) {
      // Eliminación directa sin leer la sesión → 0 row-reads
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    }

    // Invalidar cookie correctamente
    cookieStore.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    redirect('/auth/login');
    
  } catch (error) {
    console.error('Logout error:', error);

    // Incluso si falla la DB, debemos borrar cookie
    const cookieStore = await cookies();
    cookieStore.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    redirect('/auth/login');
  }
}
