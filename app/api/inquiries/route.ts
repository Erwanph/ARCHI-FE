import { env, waitUntil } from 'cloudflare:workers';
import { eq } from 'drizzle-orm';
import { inquiries, inquiryRateLimits } from '@/db/schema';
import { getDb } from '@/db';
import { INQUIRY_RECIPIENT } from '@/lib/business-profile';
import { sendInquiryEmail } from '@/lib/inquiry-email';

/*
 * Inquiries are delivered two ways, whichever the deployment supports:
 *  - email to the ARCHI team through Resend (RESEND_API_KEY), and
 *  - a row in Cloudflare D1 when the `DB` binding exists (Cloudflare builds).
 * A submission succeeds when at least one of them succeeds.
 */

const allowedTypes = new Set(['buyer', 'supplier', 'general']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

async function hashIdentity(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

// Fallback when there is no database (e.g. Vercel): per-instance memory.
const recentAttempts = new Map<string, number[]>();
function checkMemoryRateLimit(identity: string) {
  const now = Date.now();
  const attempts = (recentAttempts.get(identity) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (attempts.length >= RATE_LIMIT_MAX_ATTEMPTS) return false;
  attempts.push(now);
  recentAttempts.set(identity, attempts);
  if (recentAttempts.size > 5000) recentAttempts.clear();
  return true;
}

async function checkRateLimit(identity: string) {
  const db = getDb();
  const identityHash = await hashIdentity(identity);
  const now = new Date();
  const existing = await db.query.inquiryRateLimits.findFirst({
    where: eq(inquiryRateLimits.identityHash, identityHash),
  });

  if (
    existing &&
    now.getTime() - existing.windowStart.getTime() < RATE_LIMIT_WINDOW_MS
  ) {
    if (existing.attemptCount >= RATE_LIMIT_MAX_ATTEMPTS) return false;
    await db
      .update(inquiryRateLimits)
      .set({
        attemptCount: existing.attemptCount + 1,
        lastAttemptAt: now,
      })
      .where(eq(inquiryRateLimits.identityHash, identityHash));
    return true;
  }

  await db
    .insert(inquiryRateLimits)
    .values({ identityHash, windowStart: now, attemptCount: 1, lastAttemptAt: now })
    .onConflictDoUpdate({
      target: inquiryRateLimits.identityHash,
      set: { windowStart: now, attemptCount: 1, lastAttemptAt: now },
    });
  return true;
}

async function notifyInquiryCreated({
  inquiryId,
  inquiryType,
  createdAt,
}: {
  inquiryId: string;
  inquiryType: string;
  createdAt: Date;
}) {
  const rawUrl = env.INQUIRY_NOTIFICATION_WEBHOOK_URL?.trim();
  if (!rawUrl) return;

  let webhookUrl: URL;
  try {
    webhookUrl = new URL(rawUrl);
  } catch {
    console.warn('Inquiry notification is not configured with a valid URL.');
    return;
  }
  if (webhookUrl.protocol !== 'https:') {
    console.warn('Inquiry notification requires an HTTPS destination.');
    return;
  }

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  const token = env.INQUIRY_NOTIFICATION_WEBHOOK_TOKEN?.trim();
  if (token) headers.authorization = `Bearer ${token}`;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event: 'inquiry.created',
        inquiryId,
        inquiryType,
        createdAt: createdAt.toISOString(),
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.warn('Inquiry notification delivery was not accepted.', {
        inquiryId,
        status: response.status,
      });
    }
  } catch {
    console.warn('Inquiry notification delivery failed.', { inquiryId });
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: 'Invalid inquiry data.' }, { status: 400 });
  }

  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const inquiryType = clean(body.inquiryType, 20);
  const name = clean(body.name, 100);
  const company = clean(body.company, 120);
  const email = clean(body.email, 180).toLowerCase();
  const country = clean(body.country, 100);
  const productInterest = clean(body.productInterest, 180);
  const details = clean(body.details, 3000);
  const consent = body.consent === true;

  if (
    !allowedTypes.has(inquiryType) ||
    name.length < 2 ||
    company.length < 2 ||
    !emailPattern.test(email) ||
    country.length < 2 ||
    details.length < 20 ||
    !consent
  ) {
    return Response.json(
      { ok: false, message: 'Please check the required inquiry details.' },
      { status: 422 },
    );
  }

  const hasDatabase = Boolean(env.DB);
  const emailKey = env.RESEND_API_KEY?.trim();
  if (!hasDatabase && !emailKey) {
    console.error('Inquiry delivery is not configured: set RESEND_API_KEY or deploy with a D1 binding.');
    return Response.json(
      { ok: false, message: 'The inquiry could not be sent. Please try again shortly.' },
      { status: 503 },
    );
  }

  try {
    let withinLimit: boolean;
    try {
      withinLimit = hasDatabase ? await checkRateLimit(email) : checkMemoryRateLimit(email);
    } catch (error) {
      // A database that is bound but not migrated must not block email delivery.
      console.error('Rate-limit storage unavailable; using in-memory limit.', String(error));
      withinLimit = checkMemoryRateLimit(email);
    }
    if (!withinLimit) {
      return Response.json(
        { ok: false, message: 'Too many recent attempts. Please try again later.' },
        { status: 429 },
      );
    }

    const inquiryId = crypto.randomUUID();
    const createdAt = new Date();

    let stored = false;
    if (hasDatabase) {
      try {
        await getDb().insert(inquiries).values({
          id: inquiryId,
          inquiryType: inquiryType as 'buyer' | 'supplier' | 'general',
          name,
          company,
          email,
          country,
          productInterest: productInterest || null,
          details,
          consent,
          status: 'new',
          createdAt,
        });
        stored = true;
      } catch (error) {
        console.error('Inquiry could not be stored', error);
      }
    }

    const emailed = emailKey
      ? await sendInquiryEmail(
          { inquiryType, name, company, email, country, productInterest, details, createdAt },
          {
            apiKey: emailKey,
            to: env.INQUIRY_EMAIL_TO?.trim() || INQUIRY_RECIPIENT,
            from: env.INQUIRY_EMAIL_FROM?.trim() || 'ARCHI Website <onboarding@resend.dev>',
          },
        )
      : false;

    if (!stored && !emailed) {
      return Response.json(
        { ok: false, message: 'The inquiry could not be sent. Please try again shortly.' },
        { status: 503 },
      );
    }

    console.info('Inquiry received.', { inquiryId, inquiryType, stored, emailed });
    if (stored) waitUntil(notifyInquiryCreated({ inquiryId, inquiryType, createdAt }));
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Inquiry submission failed', error);
    return Response.json(
      { ok: false, message: 'The inquiry could not be sent. Please try again shortly.' },
      { status: 503 },
    );
  }
}
