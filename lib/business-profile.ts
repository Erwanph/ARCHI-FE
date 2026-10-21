export type TeamMember = {
  name: string;
  role: 'founder' | 'coFounder';
  /** Square or portrait photo under /public, e.g. '/images/team/kenzie.jpg'. */
  photo?: string;
  /** Short biography in English; shown only when provided. */
  biography?: string;
  linkedin?: string;
  email?: string;
  /** Official institution name; shown as-is in every language. */
  education?: string;
};

export type VerifiedBusinessProfile = {
  legalName?: string;
  registration?: string;
  address?: string;
  email?: string;
  phone?: string;
  /** WhatsApp number in international format without "+" or spaces, e.g. '6281234567890'. */
  whatsapp?: string;
  marketsServed?: string[];
  team?: TeamMember[];
  certifications?: Array<{ name: string; evidenceUrl?: string }>;
  caseStudies?: Array<{ title: string; summary: string; url?: string }>;
};

/*
 * Public components render only the fields present here. Fill in details as
 * they are confirmed: the WhatsApp tab appears once `whatsapp` is set, and
 * each founder card shows a photo, biography and LinkedIn link when provided.
 */
export const verifiedBusinessProfile: VerifiedBusinessProfile = {
  whatsapp: '6287820042006',
  team: [
    { name: 'Kenzie', role: 'founder', email: 'kenzie.revano@archi.com', education: 'Institut Teknologi Bandung (ITB)' },
    { name: 'Erwan', role: 'coFounder', email: 'erwan.halomoan@archi.com', education: 'Institut Teknologi Bandung (ITB)' },
  ],
};

/*
 * Same click-to-chat link exporttani.com uses. When the number belongs to a
 * WhatsApp Business account, WhatsApp shows that account's verified name and
 * logo on the hand-off page, then opens the chat with the message prefilled.
 */
/** Where website inquiries are emailed (INQUIRY_EMAIL_TO overrides it). */
export const INQUIRY_RECIPIENT = 'kenzie.revano@archi.com';

export function whatsappHref(message: string) {
  const number = verifiedBusinessProfile.whatsapp?.replace(/\D/g, '');
  if (!number) return null;
  const query = new URLSearchParams({ phone: number, text: message, type: 'phone_number', app_absent: '0' });
  return `https://api.whatsapp.com/send/?${query}`;
}
