// app/actions/settings.ts
'use server';

import { db } from '@/lib/db';
import { settings } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function getSettings() {
  const result = await db.select().from(settings).limit(1);

  if (result.length === 0) {
    return {
      exchangeRate: '4200',
    };
  }

  return {
    exchangeRate: result[0].exchangeRate || '4200',
  };
}

export async function updateSettings(data: {
  exchangeRate: string;
}) {
  await db
    .insert(settings)
    .values({ id: 1, exchangeRate: data.exchangeRate })
    .onConflictDoUpdate({
      target: settings.id,
      set: { exchangeRate: data.exchangeRate },
    });

  return { success: true };
}
