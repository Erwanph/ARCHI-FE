declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    INQUIRY_NOTIFICATION_WEBHOOK_URL?: string;
    INQUIRY_NOTIFICATION_WEBHOOK_TOKEN?: string;
    /** Resend key: emails each inquiry to the team (required where D1 is absent, e.g. Vercel). */
    RESEND_API_KEY?: string;
    /** Inquiry recipient(s), comma-separated. Defaults to INQUIRY_RECIPIENT. */
    INQUIRY_EMAIL_TO?: string;
    /** Sender, e.g. "ARCHI Website <inquiries@your-domain>"; the domain must be verified in Resend. */
    INQUIRY_EMAIL_FROM?: string;
    /** Nusa via OpenRouter (free models). Takes priority over ANTHROPIC_API_KEY. */
    OPENROUTER_API_KEY?: string;
    /** Optional comma-separated OpenRouter model list, tried in order. */
    OPENROUTER_MODELS?: string;
    /** Nusa via Anthropic directly. Without any key Nusa uses verified quick answers. */
    ANTHROPIC_API_KEY?: string;
  }
}
