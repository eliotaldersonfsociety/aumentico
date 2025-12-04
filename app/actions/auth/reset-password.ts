'use server';

import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function validateResetToken(token: string) {
  try {
    const userResult = await db.select().from(users).where(eq(users.resetToken, token)).limit(1);

    if (userResult.length === 0) {
      return { valid: false };
    }

    const user = userResult[0];

    if (!user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
      return { valid: false, expired: true };
    }

    return { valid: true, email: user.email };
  } catch (error) {
    console.error('Validate reset token error:', error);
    return { valid: false };
  }
}

export async function resetPassword(formData: FormData) {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  if (!token || !password) {
    return { error: 'Token and password are required' };
  }

  try {
    // Validate token
    const validation = await validateResetToken(token);
    if (!validation.valid) {
      return { error: 'Invalid or expired token' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear reset token
    await db.update(users).set({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiresAt: null,
    }).where(eq(users.resetToken, token));

    return { message: 'Password reset successfully' };
  } catch (error) {
    console.error('Reset password error:', error);
    return { error: 'An error occurred. Please try again.' };
  }
}