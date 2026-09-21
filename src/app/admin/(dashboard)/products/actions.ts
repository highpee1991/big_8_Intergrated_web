// src/app/admin/(dashboard)/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/slugify";
import { productFormSchema, type ProductFormState } from "./schema";

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
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

// Resolves the product's brand: either an existing brand's id, or , if the
// admin used the "+ Add new brand" option , creates the brand on the fly
// and returns its new id. upsert (by slug) means submitting the same new
// brand name twice never creates a duplicate.
async function resolveBrandId(brandId: string | undefined, newBrandName: string | null) {
  if (newBrandName?.trim()) {
    const brand = await prisma.brand.upsert({
      where: { slug: slugify(newBrandName) },
      update: {},
      create: {
        slug: slugify(newBrandName),
        name: newBrandName.trim(),
        // No real logo yet for a brand created inline , a plain placeholder
        // keeps the required field satisfied; swap it for a real logo
        // later directly in Supabase, or once a "manage brands" admin page exists.
        logoUrl: "/images/brands/placeholder.png",
      },
    });
    return brand.id;
  }
  return brandId || null;
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = productFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description") || undefined,
    price: formData.get("price") || undefined,
    divisionId: formData.get("divisionId"),
    categoryId: formData.get("categoryId") || undefined,
    brandId: formData.get("brandId") || undefined,
    featured: formData.get("featured") === "on",
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Please fix the errors below.",
    };
  }

  const values = parsed.data;

  const price = values.price?.trim() ? values.price.trim() : null;
  if (price !== null && Number.isNaN(Number(price))) {
    return {
      success: false,
      fieldErrors: { price: ["Price must be a number."] },
      formError: "Please fix the errors below.",
    };
  }

  let specs: Record<string, string> | null = null;
  const specsRaw = formData.get("specs");
  if (typeof specsRaw === "string" && specsRaw.trim()) {
    try {
      specs = JSON.parse(specsRaw);
    } catch {
      specs = null;
    }
  }

  const imageFiles = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);

  let imageUrls: string[] = [];
  try {
    imageUrls = await Promise.all(imageFiles.map((file) => uploadImageToCloudinary(file)));
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return { success: false, formError: "Image upload failed. Please try again." };
  }

  const newBrandName = formData.get("newBrandName") as string | null;

  try {
    const brandId = await resolveBrandId(values.brandId, newBrandName);

    const product = await prisma.product.create({
      data: {
        title: values.title,
        slug: values.slug,
        summary: values.summary,
        description: values.description || null,
        price,
        specs: specs ?? undefined,
        divisionId: values.divisionId,
        categoryId: values.categoryId || null,
        brandId,
        featured: values.featured ?? false,
        isActive: values.isActive ?? true,
        images: {
          create: imageUrls.map((url, i) => ({ url, alt: values.title, position: i })),
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath(`/products/${product.slug}`);
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
      return {
        success: false,
        fieldErrors: { slug: ["This slug is already in use , choose a different one."] },
        formError: "Please fix the errors below.",
      };
    }
    console.error("Product creation failed:", err);
    return { success: false, formError: "Something went wrong. Please try again." };
  }

  redirect("/admin/products");
}

export async function updateProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const previousSlug = formData.get("previousSlug") as string;
  if (!id) return { success: false, formError: "Missing product id." };

  const parsed = productFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description") || undefined,
    price: formData.get("price") || undefined,
    divisionId: formData.get("divisionId"),
    categoryId: formData.get("categoryId") || undefined,
    brandId: formData.get("brandId") || undefined,
    featured: formData.get("featured") === "on",
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Please fix the errors below.",
    };
  }

  const values = parsed.data;

  const price = values.price?.trim() ? values.price.trim() : null;
  if (price !== null && Number.isNaN(Number(price))) {
    return {
      success: false,
      fieldErrors: { price: ["Price must be a number."] },
      formError: "Please fix the errors below.",
    };
  }

  let specs: Record<string, string> | null = null;
  const specsRaw = formData.get("specs");
  if (typeof specsRaw === "string" && specsRaw.trim()) {
    try {
      specs = JSON.parse(specsRaw);
    } catch {
      specs = null;
    }
  }

  // Existing images the admin removed in the UI , deleted explicitly here
  // rather than replacing the whole image set, so images left untouched
  // keep their original id/position instead of being deleted and recreated.
  let deleteImageIds: string[] = [];
  const deleteImageIdsRaw = formData.get("deleteImageIds");
  if (typeof deleteImageIdsRaw === "string" && deleteImageIdsRaw.trim()) {
    try {
      deleteImageIds = JSON.parse(deleteImageIdsRaw);
    } catch {
      deleteImageIds = [];
    }
  }

  const newImageFiles = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);

  let newImageUrls: string[] = [];
  try {
    newImageUrls = await Promise.all(newImageFiles.map((file) => uploadImageToCloudinary(file)));
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return { success: false, formError: "Image upload failed. Please try again." };
  }

  const newBrandName = formData.get("newBrandName") as string | null;

  try {
    const remainingCount = await prisma.productImage.count({
      where: { productId: id, id: { notIn: deleteImageIds } },
    });

    const brandId = await resolveBrandId(values.brandId, newBrandName);

    await prisma.product.update({
      where: { id },
      data: {
        title: values.title,
        slug: values.slug,
        summary: values.summary,
        description: values.description || null,
        price,
        specs: specs ?? undefined,
        divisionId: values.divisionId,
        categoryId: values.categoryId || null,
        brandId,
        featured: values.featured ?? false,
        isActive: values.isActive ?? true,
        images: {
          deleteMany: deleteImageIds.length > 0 ? { id: { in: deleteImageIds } } : undefined,
          create: newImageUrls.map((url, i) => ({
            url,
            alt: values.title,
            position: remainingCount + i,
          })),
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath(`/products/${values.slug}`);
    if (previousSlug && previousSlug !== values.slug) {
      revalidatePath(`/products/${previousSlug}`);
    }
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
      return {
        success: false,
        fieldErrors: { slug: ["This slug is already in use , choose a different one."] },
        formError: "Please fix the errors below.",
      };
    }
    console.error("Product update failed:", err);
    return { success: false, formError: "Something went wrong. Please try again." };
  }

  redirect("/admin/products");
}