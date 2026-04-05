CREATE TABLE `activation_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`value` text NOT NULL,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL
);
