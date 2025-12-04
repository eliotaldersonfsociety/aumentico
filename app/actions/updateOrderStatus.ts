// app/actions/updateOrderStatus.ts
'use server';

import { db } from '@/lib/db';
import { orders } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  try {
    const result = await db
      .update(orders)
      .set({ status: newStatus })
      .where(eq(orders.id, orderId));

    if (result.rowsAffected && result.rowsAffected > 0) {
      return { success: true };
    } else {
      return { error: 'No se pudo actualizar el estado de la orden' };
    }
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return { error: error.message || 'Error al actualizar el estado' };
  }
}