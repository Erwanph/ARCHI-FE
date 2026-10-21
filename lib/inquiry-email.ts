/*
 * Delivers a new inquiry to the ARCHI team by email through Resend's HTTP API
 * (https://resend.com/docs/api-reference/emails/send-email). Replying to the
 * email answers the visitor directly (reply_to is their address).
 */

export type InquiryEmail = {
  inquiryType: string;
  name: string;
  company: string;
  email: string;
  country: string;
  productInterest: string;
  details: string;
  createdAt: Date;
};

const typeLabels: Record<string, string> = {
  buyer: 'Buyer / importer',
  supplier: 'Indonesian supplier',
  general: 'Strategic partner',
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

function compose(inquiry: InquiryEmail) {
  const type = typeLabels[inquiry.inquiryType] ?? inquiry.inquiryType;
  const rows: Array<[string, string]> = [
    ['Type', type],
    ['Name', inquiry.name],
    ['Company', inquiry.company],
    ['Email', inquiry.email],
    ['Country / market', inquiry.country],
    ['Product', inquiry.productInterest || '—'],
    ['Received', inquiry.createdAt.toISOString().replace('T', ' ').slice(0, 16) + ' UTC'],
  ];

  const subject = `New ${type.toLowerCase()} inquiry: ${inquiry.company} (${inquiry.country})`.slice(0, 180);
  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Requirement:',
    inquiry.details,
    '',
    '— Sent from the inquiry form on the ARCHI website. Reply to this email to answer the sender.',
  ].join('\n');
  const html = `<div style="font-family:Arial,sans-serif;color:#163829;max-width:620px">
  <h2 style="font-weight:normal;margin:0 0 16px">New inquiry from the ARCHI website</h2>
  <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="color:#7f6131;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
      )
      .join('\n    ')}
  </table>
  <p style="color:#7f6131;font-size:14px;margin:20px 0 6px">Requirement</p>
  <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(inquiry.details)}</p>
  <p style="color:#5e665b;font-size:12px;margin-top:24px">Reply to this email to answer ${escapeHtml(inquiry.name)} directly.</p>
</div>`;
  return { subject, text, html };
}

/** Returns true when Resend accepted the message. */
export async function sendInquiryEmail(
  inquiry: InquiryEmail,
  { apiKey, to, from }: { apiKey: string; to: string; from: string },
) {
  const { subject, text, html } = compose(inquiry);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((address) => address.trim()).filter(Boolean),
        reply_to: inquiry.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('Inquiry email was not accepted.', { status: response.status, detail: detail.slice(0, 300) });
      return false;
    }
    return true;
  } catch (error) {
    console.error('Inquiry email delivery failed.', { error: String(error) });
    return false;
  }
}
