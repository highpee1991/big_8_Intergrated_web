// src/app/admin/login/actions.ts
"use server";
 
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
 
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
 
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
 
  if (error) {
    console.error("Supabase login failed:", error.status, error.code, error.message);
    redirect(`/admin/login?error=${encodeURIComponent("Invalid email or password.")}`);
  }
 
  redirect("/admin");
}
 