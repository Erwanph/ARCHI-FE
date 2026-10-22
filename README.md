# ARCHI — Frontend

The website of **ARCHI**, an Indonesia-rooted sourcing and trading brand: *Connecting Indonesian Origins to Global Market*.

It presents ARCHI's sourcing categories, process and company profile, takes structured inquiries from buyers, suppliers and partners, and hosts **Nusa**, an AI concierge that answers questions about products and the sourcing process.

## Highlights

- **14 languages, full site:** EN (default, unprefixed), ID, 中文, 日本語, 한국어, العربية (RTL), हिन्दी, ES, FR, DE, NL, PT-BR, TR, RU, with a flag dropdown and `hreflang` alternates.
- **Interactive, not heavy:**
  - Route planner on a pre-computed dotted world map.
  - Turnable sourcing dial, status explorer and brief-readiness meter.
  - Above-the-fold animation is CSS-only; Motion loads lazily.
- **Nusa assistant:** `/api/assistant` streams answers grounded in the site's own copy.
  - It uses free models through OpenRouter, trying them in order; Anthropic's Claude is an alternative.
  - Without a key, or when every model is unavailable, it answers in a keyword-based "quick answers" mode.
- **Honest by design:** every product detail carries a status (*Verified · On request · Pending supplier confirmation · Not yet published*). No invented stock, prices, MOQ or certifications.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [vinext](https://github.com/cloudflare/vinext): the Next.js App Router API on Vite 8, with React 19 and React Server Components |
| Styling & motion | Tailwind CSS v4, Motion 13 (`LazyMotion`), lucide-react |
| Inquiries | Emailed to the team via Resend; also stored with Drizzle ORM on Cloudflare D1 where available |
| AI | OpenRouter (free models, OpenAI-compatible API); `@anthropic-ai/sdk` as an alternative |
| Tooling | TypeScript, oxlint, oxfmt, sharp (image pipeline) |

## Getting started

Requires **Node.js 22.13 or newer**.

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev                  # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (Cloudflare target by default) |
| `npm run lint` / `npm run format` | Lint with oxlint / format with oxfmt |
| `npm run db:generate` | Generate Drizzle migrations from `db/schema.ts` |
| `npm run images` | Create AVIF/WebP variants of `public/images` and refresh `lib/image-manifest.json` |
| `npm run route-map` | Regenerate the dotted world map (`lib/route-map.json`) |
| `npm run icons` | Regenerate favicons from the "A" of the ARCHI wordmark |

For type-checking, run `npx tsc --noEmit`.

## Environment variables

All of these are optional and server-side only.

| Name | Purpose |
| --- | --- |
| `OPENROUTER_API_KEY` | Enables Nusa's live answers through OpenRouter's free models. Takes priority over `ANTHROPIC_API_KEY`. |
| `OPENROUTER_MODELS` | Optional comma-separated model list, tried in order. The default is `minimax/minimax-m3.1-flash:free`, `google/gemma-4-31b-it:free`, `google/gemma-4-26b-a4b-it:free`, `nvidia/nemotron-3-super-120b-a12b:free`, `openrouter/free`. |
| `ANTHROPIC_API_KEY` | Alternative: Nusa answers with Claude. Used only when `OPENROUTER_API_KEY` is empty. |
| `RESEND_API_KEY` | Emails each inquiry to the team. Required on Vercel, where there is no D1 database. |
| `INQUIRY_EMAIL_TO` | Recipient(s), comma-separated. The default is `kenzie.revano@archi.com`. |
| `INQUIRY_EMAIL_FROM` | Sender on a domain verified in Resend. The default, `onboarding@resend.dev`, only delivers to the Resend account owner's address. |
| `INQUIRY_NOTIFICATION_WEBHOOK_URL` | HTTPS endpoint that receives a metadata-only "inquiry created" event |
| `INQUIRY_NOTIFICATION_WEBHOOK_TOKEN` | Bearer token sent with that webhook |

Never commit real values. `.env*` files are git-ignored, except `.env.example`.

## Project structure

```text
app/[locale]/        Pages per language (home, origins, products, sourcing, about, contact, privacy)
app/api/             assistant (Nusa) and inquiries endpoints
components/          UI by area: home/, origins/, products/, sourcing/, about/, nusa/, motion/
lib/i18n/            Locale config and dictionaries (en.ts is the source; others must match its shape)
lib/assistant/       Nusa system prompt and offline fallback answers
lib/business-profile.ts   Verified company details: team, WhatsApp number, etc.
db/, drizzle/        Database schema and migrations
scripts/             Image, map and icon generators
proxy.ts             Language routing (vinext proxy; named so Vercel does not treat it as its own Routing Middleware): (English unprefixed, /en redirects, locale cookie)
```

## Content and configuration

- **Copy:** every visible string lives in `lib/i18n/dictionaries/`. Edit `en.ts` first. TypeScript fails the build if another locale is missing a key.
- **Company details:** fill in `lib/business-profile.ts`.
  - `whatsapp` (international format, digits only) powers the WhatsApp tab. It opens WhatsApp's click-to-chat page, which shows the business name and logo when the number is a WhatsApp Business account.
  - `INQUIRY_RECIPIENT` is where inquiries are emailed.
  - Founder cards show photo, biography, LinkedIn, email and education when they are provided.
- **Brand rule:** publish only what is verified. Prices, MOQ, capacity, certifications and markets served stay off the site until confirmed.

## Deployment

**Vercel:**
1. Import the repository. `vercel.json` already sets the build command (`NITRO_PRESET=vercel npm run build`).
2. Under Environment Variables, add `OPENROUTER_API_KEY` for Nusa's live answers and `RESEND_API_KEY` for inquiry emails.

> **Inquiries on Vercel:** Cloudflare D1 is not available on Vercel, so inquiries are delivered by email only. Without `RESEND_API_KEY` the form returns an error there.

**Cloudflare:** `npm run build` produces a Workers build with the D1 binding `DB`.

### Nusa on free models

- **Privacy setting:** many free models need OpenRouter's setting that lets providers log or train on prompts (OpenRouter → Settings → Privacy). The site's privacy page says so, and asks visitors not to share confidential data in the chat.
- **Rate limits:** free models have per-minute and per-day request limits, and individual free models can be retired at any time. Nusa then moves on to the next model, and finally to quick answers. You can change the list with `OPENROUTER_MODELS` without a code change.

## Translations

Translations were drafted for launch. Native speakers should review them before going live, especially AR, HI, JA and KO.

## License

Proprietary. © 2026 ARCHI. All rights reserved. See [LICENSE](LICENSE). The ARCHI name, logo and brand assets are not licensed for reuse.
