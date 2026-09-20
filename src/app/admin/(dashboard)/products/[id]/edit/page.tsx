// src/app/admin/(dashboard)/products/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getDivisionsWithCategories } from "@/lib/services/industries.service";
import { getAllBrandsForAdmin, getProductByIdForAdmin } from "@/lib/services/products.service";
import { ProductForm } from "../../components/product-form";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, divisionsRaw, brands] = await Promise.all([
    getProductByIdForAdmin(id),
    getDivisionsWithCategories(),
    getAllBrandsForAdmin(),
  ]);

  if (!product) notFound();

  const divisions = divisionsRaw.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    categories: (d.categories ?? []).map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
  }));

  return (
    <main className="p-8">
      <h1 className="font-display text-ink text-2xl font-semibold">Edit Product</h1>
      <p className="text-ink-muted mt-1 text-sm">{product.title}</p>

      <div className="mt-6">
        <ProductForm
          divisions={divisions}
          brands={brands}
          action={updateProduct}
          submitLabel="Save Changes"
          defaultValues={{
            id: product.id,
            title: product.title,
            slug: product.slug,
            summary: product.summary,
            description: product.description,
            price: product.price,
            divisionId: product.divisionId,
            categoryId: product.categoryId,
            brandId: product.brandId,
            featured: product.featured,
            isActive: product.isActive,
            specs: product.specs,
            existingImages: product.images,
          }}
        />
      </div>
    </main>
  );
}
