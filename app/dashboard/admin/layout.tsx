// app/dashboard/admin/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { eq } from 'drizzle-orm';
import db from '@/lib/db';
import { sessions, users } from '@/drizzle/schema';
import { Sidebar } from '../../../components/dashboard/sidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    redirect('/auth/login');
  }

  // Validar sesión y obtener usuario
  const sessionResult = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);

  if (sessionResult.length === 0) {
    redirect('/auth/login');
  }

  const session = sessionResult[0];
  if (!session.expiresAt || session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    redirect('/auth/login');
  }

  const userResult = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);

  if (userResult.length === 0) {
    redirect('/auth/login');
  }

  const user = userResult[0];

  if (user.role !== 'admin') {
    redirect('/auth/login');
  }

  // Convierte a plain object
  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.145_0_0)]">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <main className="flex-1 px-4 md:px-8 pt-4 md:pt-32 transition-all duration-300 pb-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}