// src/app/admin/(dashboard)/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllProductsForAdmin } from "@/lib/services/products.service";
import { DeleteProductButton } from "./components/delete-product-button";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <main className="p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-ink text-2xl font-semibold">Products</h1>
          <p className="text-ink-muted mt-1 text-sm">{products.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" aria-hidden="true" />
            New Product
          </Link>
        </Button>
      </div>

      <div className="border-border bg-card mt-6 overflow-hidden rounded-lg border">
        {products.length === 0 ? (
          <p className="text-ink-muted p-8 text-center text-sm">
            No products yet — click &quot;New Product&quot; to add your first one.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border text-muted border-b text-left font-mono text-xs uppercase tracking-widest">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Division / Category</th>
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-surface relative size-11 shrink-0 overflow-hidden rounded-md">
                        {product.image ? (
                          <Image
                            src={product.image.url}
                            alt={product.image.alt}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-ink truncate font-medium">{product.title}</p>
                        <p className="text-muted truncate text-xs">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-ink-muted px-5 py-3">
                    {product.divisionName}
                    {product.categoryName ? (
                      <span className="text-muted"> / {product.categoryName}</span>
                    ) : null}
                  </td>
                  <td className="text-ink-muted px-5 py-3">{product.brandName ?? "—"}</td>
                  <td className="text-ink-muted px-5 py-3">{product.priceLabel}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant={product.isActive ? "success" : "default"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {product.featured ? <Badge variant="primary">Featured</Badge> : null}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        aria-label={`Edit ${product.title}`}
                        className="text-muted hover:text-primary inline-flex size-8 items-center justify-center rounded-md transition-colors"
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                      </Link>
                      <DeleteProductButton id={product.id} title={product.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
