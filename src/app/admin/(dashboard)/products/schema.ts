import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z
    .string()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  summary: z.string().min(2, "Summary is required."),
  description: z.string().optional(),
  price: z.string().optional(),
  divisionId: z.string().min(1, "Division is required."),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export interface ProductFormState {
  success: boolean;
  fieldErrors?: Partial<Record<keyof ProductFormValues, string[]>>;
  formError?: string;
}