// src/features/contact/email-template.ts
//
// Builds the notification email sent to CONTACT_NOTIFY_EMAIL whenever
// someone submits the contact form or a product "Request a Quote". Kept
// separate from actions.ts so the template can be reused later (e.g. an
// auto-reply to the submitter) without duplicating this formatting logic.
//
// Both a plain-text and an HTML version are generated — HTML is what most
// clients render, but some strip HTML or fail to load it, so text is a
// genuine fallback, not just a formality. Both explicitly label every field,
// including "Message:", so nothing runs together regardless of how a client
// handles line breaks (Outlook's plain-text view is known to collapse blank
// lines used as separators).

export interface InquiryEmailInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  productId?: string | null;
}

export function buildInquiryEmail(input: InquiryEmailInput) {
  const subject = input.productId
    ? `New quote request (product: ${input.productId})`
    : "New contact form submission";

  const fields: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
  ];
  if (input.phone) fields.push(["Phone", input.phone]);
  if (input.company) fields.push(["Company", input.company]);
  if (input.productId) fields.push(["Product", input.productId]);

  const text = [
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    input.message,
  ].join("\n");

  const fieldRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:4px 12px 4px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:4px 0;color:#111827;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="font-size:18px;color:#111827;margin:0 0 16px;">${escapeHtml(subject)}</h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:20px;">
        ${fieldRows}
      </table>
      <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
        <p style="margin:0 0 6px;color:#6b7280;font-size:13px;font-weight:600;">Message</p>
        <p style="margin:0;color:#111827;font-size:14px;white-space:pre-wrap;line-height:1.5;">${escapeHtml(
          input.message,
        )}</p>
      </div>
    </div>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}