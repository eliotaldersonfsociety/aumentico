// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from './lib/db';
import { sessions } from './drizzle/schema';
import { eq } from 'drizzle-orm';

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Buscar la sesión en la base de datos
  const result = await db
    .select({ userId: sessions.userId, expiresAt: sessions.expiresAt })
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const session = result[0];
  if (!session.expiresAt || session.expiresAt < new Date()) {
    // Sesión expirada
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('session');
    return response;
  }

  // Actualizar expires_at si quieres mantener la sesión activa
  await db
    .update(sessions)
    .set({ expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
    .where(eq(sessions.id, sessionId));

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protege todas las rutas bajo /dashboard
};
