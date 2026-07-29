"use server";

import { prisma } from "@/lib/prisma";
import { resend, CONTACT_NOTIFY_EMAIL, CONTACT_FROM_EMAIL } from "@/lib/resend";
import { buildInquiryEmail } from "./email-template";
import { contactFormSchema } from "./schema";

export interface SubmitInquiryResult {
  success: boolean;
  /** Field-level errors keyed by field name, for the client to show
   *  under the relevant input — mirrors what React Hook Form expects. */
  fieldErrors?: Partial<Record<keyof typeof contactFormSchema.shape, string[]>>;
  formError?: string;
}

/**
 * Server Action — runs on the server even though it's called directly
 * from a client component's form submit. Re-validates with the same
 * Zod schema the client uses (never trust client-side validation alone),
 * then writes a row to the Inquiry table.
 *
 * `productId` is optional and unused by the general Contact page today —
 * it's there so a future "Request a Quote" button on a product detail
 * page can call this same action, passing which product the inquiry is
 * about, without needing a second, near-duplicate action.
 */
export async function submitInquiry(
  formData: FormData,
  productId?: string
): Promise<SubmitInquiryResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    message: formData.get("message"),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.inquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        message: parsed.data.message,
        productId: productId ?? null,
      },
    });
  } catch {
    // Deliberately generic — never leak DB error details to the client.
    return {
      success: false,
      formError: "Something went wrong sending your message. Please try again, or reach out directly using the contact details on this page.",
    };
  }

  // The inquiry is already saved at this point — that's the source of truth.
  // Email is a best-effort notification on top of it: if Resend has a hiccup,
  // the submission still succeeded and is sitting in the database either way,
  // so we log the email error instead of failing the whole submission.
  if (CONTACT_NOTIFY_EMAIL) {
    try {
      console.log(`Sending inquiry notification to ${CONTACT_NOTIFY_EMAIL}...`);
      const { subject, text, html } = buildInquiryEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: parsed.data.company,
        message: parsed.data.message,
        productId,
      });
      const { data, error } = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_NOTIFY_EMAIL,
        replyTo: parsed.data.email,
        subject,
        text,
        html,
      });

      if (error) {
        console.error("Resend rejected the notification (inquiry was still saved):", error);
      } else {
        console.log(`Inquiry notification sent — Resend id: ${data?.id}`);
      }
    } catch (err) {
      console.error("Resend notification threw (inquiry was still saved):", err);
    }
  } else {
    console.warn(
      "CONTACT_NOTIFY_EMAIL is not set — inquiry saved to the database, but no notification email was sent."
    );
  }

  return { success: true };
}