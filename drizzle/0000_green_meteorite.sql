CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`inquiry_type` text DEFAULT 'buyer' NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`email` text NOT NULL,
	`country` text NOT NULL,
	`product_interest` text,
	`details` text NOT NULL,
	`consent` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_inquiries_created_at` ON `inquiries` (`created_at`);