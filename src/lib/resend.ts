// src/lib/resend.ts
//
// Single shared Resend client — import { resend } from "@/lib/resend"
// anywhere an email needs to be sent, rather than `new Resend(...)` inline.
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Where new inquiry notifications land. Point this at whatever inbox you
// want to test with right now — swap it for the real business inbox later,
// no code changes needed, just update the env var.
export const CONTACT_NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? "";

// Resend's sandbox sender — works immediately with zero setup, but can only
// send TO the email address you signed up to Resend with. Once you verify
// your own domain in the Resend dashboard, switch this to something like
// "Big 8 Intergrated <notifications@big8intergrated.com>" to send to anyone.
export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Big 8 Intergrated <onboarding@resend.dev>";