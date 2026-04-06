DROP INDEX `users_username_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `usernameUniqueIndex` ON `users` (lower("username"));