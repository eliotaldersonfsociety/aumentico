// lib/data.ts
import { db } from '@/lib/db';
import { users, orders, sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export interface Order {
  id: string;
  servicio: string;
  categoria: string;
  tipo: string;
  cantidad: number;
  link: string;
  precio_usd: number;
  precio_cop: number;
  custom_comments: string | null;
  payment_proof: string | null;
  status: string;
  created_at: string;
}

// Obtiene el usuario a partir de una sesión válida
export async function getUserBySession(sessionId: string) {
  const sessionResult = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (sessionResult.length === 0) return null;

  const session = sessionResult[0];
  if (!session.expiresAt || session.expiresAt < new Date()) {
    // Opcional: limpiar sesión expirada
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }

  const userResult = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      balance: users.balance,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (userResult.length === 0) return null;

  return userResult[0];
}

// Obtiene las órdenes de un usuario
export async function getOrdersByUserId(userId: string) {
  const result = await db
    .select({
      id: orders.id,
      servicio: orders.servicio,
      categoria: orders.categoria,
      tipo: orders.tipo,
      cantidad: orders.cantidad,
      link: orders.link,
      precio_usd: orders.precioUsd,
      precio_cop: orders.precioCop,
      custom_comments: orders.customComments,
      payment_proof: orders.paymentProof,
      status: orders.status,
      created_at: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(orders.createdAt)
    .limit(10);

  return result;
}

// Actualiza el estado de una orden
export async function updateOrderStatus(orderId: string, newStatus: string) {
  const result = await db
    .update(orders)
    .set({ status: newStatus })
    .where(eq(orders.id, orderId));

  return result.rowsAffected && result.rowsAffected > 0;
}