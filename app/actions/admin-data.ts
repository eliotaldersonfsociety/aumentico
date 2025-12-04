'use server';

import { db } from '@/lib/db';
import { orders, users } from '@/drizzle/schema';
import { sql, eq, sum, count, and, gte, lt } from 'drizzle-orm';

export async function getAdminStats() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  // Total ingresos (suma de precio_usd de todas las órdenes)
  const totalRevenueResult = await db
    .select({ total: sum(orders.precioUsd) })
    .from(orders);
  const totalRevenue = Number(totalRevenueResult[0]?.total) || 0;

  // Ingresos del mes actual
  const currentRevenueResult = await db
    .select({ total: sum(orders.precioUsd) })
    .from(orders)
    .where(sql`strftime('%m', datetime(${orders.createdAt}, 'unixepoch')) = ${currentMonth.toString().padStart(2, '0')} AND strftime('%Y', datetime(${orders.createdAt}, 'unixepoch')) = ${currentYear.toString()}`);
  const currentRevenue = Number(currentRevenueResult[0]?.total) || 0;

  // Ingresos del mes anterior
  const previousRevenueResult = await db
    .select({ total: sum(orders.precioUsd) })
    .from(orders)
    .where(sql`strftime('%m', datetime(${orders.createdAt}, 'unixepoch')) = ${previousMonth.toString().padStart(2, '0')} AND strftime('%Y', datetime(${orders.createdAt}, 'unixepoch')) = ${previousYear.toString()}`);
  const previousRevenue = Number(previousRevenueResult[0]?.total) || 0;

  // Cambio en ingresos
  const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(2) : '0';

  // Total órdenes
  const totalOrdersResult = await db
    .select({ total: count() })
    .from(orders);
  const totalOrders = Number(totalOrdersResult[0]?.total) || 0;

  // Órdenes del mes actual
  const currentOrdersResult = await db
    .select({ total: count() })
    .from(orders)
    .where(sql`strftime('%m', datetime(${orders.createdAt}, 'unixepoch')) = ${currentMonth.toString().padStart(2, '0')} AND strftime('%Y', datetime(${orders.createdAt}, 'unixepoch')) = ${currentYear.toString()}`);
  const currentOrders = Number(currentOrdersResult[0]?.total) || 0;

  // Órdenes del mes anterior
  const previousOrdersResult = await db
    .select({ total: count() })
    .from(orders)
    .where(sql`strftime('%m', datetime(${orders.createdAt}, 'unixepoch')) = ${previousMonth.toString().padStart(2, '0')} AND strftime('%Y', datetime(${orders.createdAt}, 'unixepoch')) = ${previousYear.toString()}`);
  const previousOrders = Number(previousOrdersResult[0]?.total) || 0;

  // Cambio en órdenes
  const ordersChange = previousOrders > 0 ? ((currentOrders - previousOrders) / previousOrders * 100).toFixed(2) : '0';

  // Total clientes (usuarios con role 'client')
  const totalClientsResult = await db
    .select({ total: count() })
    .from(users)
    .where(eq(users.role, 'client'));
  const totalClients = Number(totalClientsResult[0]?.total) || 0;

  // Clientes del mes actual
  const currentClientsResult = await db
    .select({ total: count() })
    .from(users)
    .where(and(
      eq(users.role, 'client'),
      sql`strftime('%m', datetime(${users.createdAt}, 'unixepoch')) = ${currentMonth.toString().padStart(2, '0')} AND strftime('%Y', datetime(${users.createdAt}, 'unixepoch')) = ${currentYear.toString()}`
    ));
  const currentClients = Number(currentClientsResult[0]?.total) || 0;

  // Clientes del mes anterior
  const previousClientsResult = await db
    .select({ total: count() })
    .from(users)
    .where(and(
      eq(users.role, 'client'),
      sql`strftime('%m', datetime(${users.createdAt}, 'unixepoch')) = ${previousMonth.toString().padStart(2, '0')} AND strftime('%Y', datetime(${users.createdAt}, 'unixepoch')) = ${previousYear.toString()}`
    ));
  const previousClients = Number(previousClientsResult[0]?.total) || 0;

  // Cambio en clientes
  const clientsChange = previousClients > 0 ? ((currentClients - previousClients) / previousClients * 100).toFixed(2) : '0';

  // Tasa de conversión (órdenes / clientes * 100)
  const conversionRate = totalClients > 0 ? (totalOrders / totalClients * 100).toFixed(2) : '0';

  // Tasa de conversión del mes actual
  const currentConversionRate = currentClients > 0 ? (currentOrders / currentClients * 100).toFixed(2) : '0';

  // Tasa de conversión del mes anterior
  const previousConversionRate = previousClients > 0 ? (previousOrders / previousClients * 100).toFixed(2) : '0';

  // Cambio en tasa de conversión
  const conversionChange = Number(previousConversionRate) > 0 ? ((Number(currentConversionRate) - Number(previousConversionRate)) / Number(previousConversionRate) * 100).toFixed(2) : '0';

  return {
    totalRevenue,
    totalOrders,
    totalClients,
    conversionRate,
    revenueChange,
    ordersChange,
    clientsChange,
    conversionChange,
  };
}

export async function getMonthlyRevenue() {
  const result = await db
    .select({
      month: sql<string>`strftime('%m', datetime(${orders.createdAt}, 'unixepoch'))`,
      revenue: sum(orders.precioUsd),
    })
    .from(orders)
    .groupBy(sql`strftime('%m', datetime(${orders.createdAt}, 'unixepoch'))`)
    .orderBy(sql`strftime('%m', datetime(${orders.createdAt}, 'unixepoch'))`);

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const data = [];
  for (let i = 0; i < 12; i++) {
    const monthName = months[i];
    const revenue = result.find(row => row.month === (i + 1).toString().padStart(2, '0'))?.revenue || 0;
    data.push({ month: monthName, revenue: Number(revenue) });
  }

  return data;
}

export async function getRecentOrders() {
  const result = await db
    .select({
      id: orders.id,
      servicio: orders.servicio,
      cantidad: orders.cantidad,
      precio_usd: orders.precioUsd,
      status: orders.status,
      created_at: orders.createdAt,
      user_name: users.name,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .orderBy(orders.createdAt)
    .limit(10);

  return result;
}

export async function getAllOrders() {
  const result = await db
    .select({
      id: orders.id,
      servicio: orders.servicio,
      cantidad: orders.cantidad,
      precio_usd: orders.precioUsd,
      status: orders.status,
      created_at: orders.createdAt,
      user_name: users.name,
      link: orders.link,
      payment_proof: orders.paymentProof,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .orderBy(orders.createdAt);

  return result;
}

export async function getAllCustomersWithOrders() {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      created_at: users.createdAt,
      balance: users.balance,
      orders_count: count(orders.id),
      total_spent: sql<number>`COALESCE(SUM(${orders.precioUsd}), 0)`,
    })
    .from(users)
    .leftJoin(orders, eq(users.id, orders.userId))
    .where(eq(users.role, 'client'))
    .groupBy(users.id, users.name, users.email, users.phone, users.createdAt, users.balance)
    .orderBy(users.createdAt);

  return result;
}

export async function getAdminDashboardStats() {
  // Total ventas (suma de precio_usd de todas las órdenes)
  const totalSalesResult = await db
    .select({ total: sum(orders.precioUsd) })
    .from(orders);
  const totalSales = Number(totalSalesResult[0]?.total) || 0;

  // Órdenes pendientes
  const pendingOrdersResult = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.status, 'pendiente'));
  const pendingOrders = Number(pendingOrdersResult[0]?.count) || 0;

  // Órdenes en proceso
  const inProcessOrdersResult = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.status, 'en proceso'));
  const inProcessOrders = Number(inProcessOrdersResult[0]?.count) || 0;

  return {
    totalSales,
    pendingOrders,
    inProcessOrders,
  };
}
