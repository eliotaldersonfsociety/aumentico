'use server';

import { getOrdersByUserId } from '@/lib/data';

export async function getClientOrders(userId: string) {
  return await getOrdersByUserId(userId);
}