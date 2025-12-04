import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySession } from '@/lib/data';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    redirect('/auth/login');
  }

  const user = await getUserBySession(sessionId);
  if (!user) {
    redirect('/auth/login');
  }

  // Redirect based on role
  if (user.role === 'admin') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/client');
  }
}