import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb() {
  if (!env.DB) {
    throw new Error(
      'Cloudflare D1 binding `DB` is unavailable. It exists on Cloudflare deployments (see the `d1` binding in vite.config.ts); Vercel builds have no D1, so inquiries cannot be stored there.',
    );
  }

  return drizzle(env.DB, { schema });
}
