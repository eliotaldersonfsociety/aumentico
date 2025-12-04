// app/actions/update-password.ts
'use server';

import { sql } from 'drizzle-orm';
import db from '@/lib/db';

export async function updateUserPassword(userId: string, newPassword: string) {
  // In production, hash the password
  const hashedPassword = newPassword; // Placeholder for hashing

  await db.run(sql`UPDATE users SET password = ${hashedPassword} WHERE id = ${userId}`);

  return { success: true };
}