import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const inquiries = sqliteTable(
  'inquiries',
  {
    id: text('id').primaryKey(),
    inquiryType: text('inquiry_type', { enum: ['buyer', 'supplier', 'general'] })
      .notNull()
      .default('buyer'),
    name: text('name').notNull(),
    company: text('company').notNull(),
    email: text('email').notNull(),
    country: text('country').notNull(),
    productInterest: text('product_interest'),
    details: text('details').notNull(),
    consent: integer('consent', { mode: 'boolean' }).notNull(),
    status: text('status', { enum: ['new', 'reviewed', 'archived'] })
      .notNull()
      .default('new'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [index('idx_inquiries_created_at').on(table.createdAt)],
);

export const inquiryRateLimits = sqliteTable('inquiry_rate_limits', {
  identityHash: text('identity_hash').primaryKey(),
  windowStart: integer('window_start', { mode: 'timestamp_ms' }).notNull(),
  attemptCount: integer('attempt_count').notNull().default(1),
  lastAttemptAt: integer('last_attempt_at', { mode: 'timestamp_ms' }).notNull(),
});
