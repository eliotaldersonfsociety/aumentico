import { sqliteTable, AnySQLiteColumn, index, text, integer, uniqueIndex, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	phone: text().notNull(),
	role: text().default("client").notNull(),
	balance: integer().default(0).notNull(),
	createdAt: text("created_at").default("sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`").notNull(),
	resetToken: text("reset_token"),
	resetTokenExpiresAt: integer("reset_token_expires_at"),
},
(table) => [
	index("idx_users_email").on(table.email),
]);

export const sessions = sqliteTable("sessions", {
	id: text().primaryKey(),
	userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	expiresAt: integer("expires_at").notNull(),
	createdAt: text("created_at").default("sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`"),
},
(table) => [
	uniqueIndex("idx_sessions_id").on(table.id),
]);

export const orders = sqliteTable("orders", {
	id: text().primaryKey(),
	userId: text("user_id").notNull(),
	servicio: text().notNull(),
	categoria: text().notNull(),
	tipo: text().notNull(),
	cantidad: integer().notNull(),
	link: text().notNull(),
	precioUsd: text("precio_usd").notNull(),
	precioCop: text("precio_cop").notNull(),
	customComments: text("custom_comments"),
	createdAt: integer("created_at").default(sql`(unixepoch())`).notNull(),
	status: text().default("pendiente"),
	paymentProof: text("payment_proof"),
});

export const settings = sqliteTable("settings", {
	id: integer().primaryKey(),
	exchangeRate: text("exchange_rate").default("4200"),
});

export const blogPosts = sqliteTable("blog_posts", {
	id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text().notNull(),
	content: text().notNull(),
	excerpt: text(),
	imageUrl: text("image_url"),
	author: text().notNull(),
	createdAt: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

