"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/label"; 
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema";
import { submitInquiry } from "@/features/contact/actions";

export interface ContactFormProps {
  /** Set when this form is reused for a "Request a Quote" flow from a
   *  specific product page — ties the inquiry to that product. Omitted
   *  on the general Contact page. */
  productId?: string;
}

function ContactForm({ productId }: ContactFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setFormError(null);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.set(key, value ?? ""));

    const result = await submitInquiry(formData, productId);

    if (result.success) {
      setSubmitted(true);
      reset();
      return;
    }

    if (result.fieldErrors) {
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        if (messages?.[0]) {
          setError(field as keyof ContactFormValues, { message: messages[0] });
        }
      }
    }
    if (result.formError) setFormError(result.formError);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-success/30 bg-success/5 px-6 py-12 text-center">
        <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
        <p className="font-display text-lg font-semibold text-ink">Message sent</p>
        <p className="max-w-sm text-sm text-muted">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-2">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" invalid={!!errors.name} {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" invalid={!!errors.email} {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" type="tel" invalid={!!errors.phone} {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company (optional)</Label>
          <Input id="company" invalid={!!errors.company} {...register("company")} />
          <FieldError>{errors.company?.message}</FieldError>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" invalid={!!errors.message} {...register("message")} />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      <FieldError>{formError}</FieldError>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

export { ContactForm };