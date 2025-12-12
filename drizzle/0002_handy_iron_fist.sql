PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`servicio` text NOT NULL,
	`categoria` text NOT NULL,
	`tipo` text NOT NULL,
	`cantidad` integer NOT NULL,
	`link` text NOT NULL,
	`precio_usd` text NOT NULL,
	`precio_cop` text NOT NULL,
	`custom_comments` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`status` text DEFAULT 'pendiente',
	`payment_proof` text
);
--> statement-breakpoint
INSERT INTO `__new_orders`("id", "user_id", "servicio", "categoria", "tipo", "cantidad", "link", "precio_usd", "precio_cop", "custom_comments", "created_at", "status", "payment_proof") SELECT "id", "user_id", "servicio", "categoria", "tipo", "cantidad", "link", "precio_usd", "precio_cop", "custom_comments", "created_at", "status", "payment_proof" FROM `orders`;--> statement-breakpoint
DROP TABLE `orders`;--> statement-breakpoint
ALTER TABLE `__new_orders` RENAME TO `orders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` text DEFAULT 'sql`(strftime(''%Y-%m-%dT%H:%M:%fZ'', ''now''))`',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("id", "user_id", "expires_at", "created_at") SELECT "id", "user_id", "expires_at", "created_at" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_sessions_id` ON `sessions` (`id`);--> statement-breakpoint
DROP INDEX `users_email_unique`;--> statement-breakpoint
DROP INDEX "idx_sessions_id";--> statement-breakpoint
DROP INDEX "idx_users_email";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "phone" TO "phone" text NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_users_email` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT 'sql`(strftime(''%Y-%m-%dT%H:%M:%fZ'', ''now''))`';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "balance" TO "balance" integer NOT NULL;--> statement-breakpoint
CREATE TABLE `__new_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`exchange_rate` text DEFAULT '4200'
);
--> statement-breakpoint
INSERT INTO `__new_settings`("id", "exchange_rate") SELECT "id", "exchange_rate" FROM `settings`;--> statement-breakpoint
DROP TABLE `settings`;--> statement-breakpoint
ALTER TABLE `__new_settings` RENAME TO `settings`;