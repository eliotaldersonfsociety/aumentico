'use server';

import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function forgotPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required' };
  }

  try {
    // Find user
    const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (userResult.length === 0) {
      // Don't reveal if email exists or not for security
      return { success: 'If the email exists, you will receive a reset link.' };
    }

    const user = userResult[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update user with reset token
    await db.update(users).set({
      resetToken,
      resetTokenExpiresAt: expiresAt,
    }).where(eq(users.id, user.id));

    // Send email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

    const emailResult = await resend.emails.send({
      from: 'noreply@aumentodeseguidores.com',
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset your password</h2>
          <p>Hi ${user.name},</p>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="${resetUrl}" style="background-color: #9333ea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p>This link will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best,<br>The Aumento Seguidores Team</p>
        </div>
      `,
    });

    return { success: 'If the email exists, you will receive a reset link.' };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { error: 'An error occurred. Please try again.' };
  }
}