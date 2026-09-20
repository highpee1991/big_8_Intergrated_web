// src/app/admin/(dashboard)/products/new/page.tsx
import { getDivisionsWithCategories } from "@/lib/services/industries.service";
import { getAllBrandsForAdmin } from "@/lib/services/products.service";
import { ProductForm } from "../components/product-form";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const [divisionsRaw, brands] = await Promise.all([
    getDivisionsWithCategories(),
    getAllBrandsForAdmin(),
  ]);

  const divisions = divisionsRaw.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    categories: (d.categories ?? []).map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
  }));

  return (
    <main className="p-8">
      <h1 className="font-display text-ink text-2xl font-semibold">New Product</h1>
      <p className="text-ink-muted mt-1 text-sm">Add a new product to the catalog.</p>
      <div className="mt-6">
        <ProductForm divisions={divisions} brands={brands} action={createProduct} submitLabel="Create Product" />
      </div>
    </main>
  );
}
