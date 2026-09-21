import { z } from "zod";

/**
 * Single source of truth for what a valid inquiry looks like , the
 * client form uses this for React Hook Form's resolver, and the server
 * action re-validates against the exact same schema. Never trust
 * client-side validation alone; the server action re-checks this
 * because form data can always be forged/bypassed.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more , at least 10 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;