CREATE TABLE `inquiry_rate_limits` (
	`identity_hash` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`attempt_count` integer DEFAULT 1 NOT NULL,
	`last_attempt_at` integer NOT NULL
);
