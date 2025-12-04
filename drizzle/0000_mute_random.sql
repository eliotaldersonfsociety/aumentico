CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`servicio` text NOT NULL,
	`categoria` text NOT NULL,
	`tipo` text NOT NULL,
	`cantidad` integer NOT NULL,
	`link` text,
	`precio_usd` real NOT NULL,
	`precio_cop` real NOT NULL,
	`custom_comments` text,
	`payment_proof` text,
	`status` text DEFAULT 'pendiente' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`exchange_rate` text DEFAULT '4200' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`role` text DEFAULT 'client' NOT NULL,
	`created_at` integer NOT NULL,
	`password` text NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`reset_token` text,
	`reset_token_expires_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);