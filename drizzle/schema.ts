import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  role: text('role').notNull().default('client'), // 'admin' or 'client'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  password: text('password').notNull(),
  balance: real('balance').notNull().default(0),
  resetToken: text('reset_token'),
  resetTokenExpiresAt: integer('reset_token_expires_at', { mode: 'timestamp' }),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  servicio: text('servicio').notNull(),
  categoria: text('categoria').notNull(),
  tipo: text('tipo').notNull(),
  cantidad: integer('cantidad').notNull(),
  link: text('link'),
  precioUsd: real('precio_usd').notNull(),
  precioCop: real('precio_cop').notNull(),
  customComments: text('custom_comments'),
  paymentProof: text('payment_proof'),
  status: text('status').notNull().default('pendiente'), // 'pendiente', 'en proceso', 'finalizado'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey().default(1),
  exchangeRate: text('exchange_rate').notNull().default('4200'),
});