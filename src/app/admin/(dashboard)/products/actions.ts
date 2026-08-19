// src/app/admin/(dashboard)/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return user;
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  // ProductImage rows cascade-delete automatically (onDelete: Cascade in
  // the schema) — no need to delete them separately here.
  await prisma.product.delete({ where: { id } });

  // Revalidate the admin table AND every public page this product could
  // appear on, so a deleted product actually disappears everywhere
  // immediately instead of lingering in a cached page.
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
