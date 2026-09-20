// product-form.tsx
"use client";

import { useActionState, useRef, useState } from "react";
import { X, Plus, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";
import type { ProductFormState } from "../schema";

export interface FormDivision {
  id: string;
  slug: string;
  name: string;
  categories: Array<{ id: string; slug: string; name: string }>;
}

export interface FormBrand {
  id: string;
  slug: string;
  name: string;
}

export interface ProductFormProps {
  divisions: FormDivision[];
  brands: FormBrand[];
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  submitLabel?: string;
}

const NEW_BRAND_VALUE = "__new__";

function ProductForm({ divisions, brands, action, submitLabel = "Create Product" }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(action, {
    success: false,
  });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [divisionId, setDivisionId] = useState("");

  const [brandSelectValue, setBrandSelectValue] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const isAddingNewBrand = brandSelectValue === NEW_BRAND_VALUE;

  const [specs, setSpecs] = useState<Array<{ label: string; value: string }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<Array<{ file: File; url: string }>>([]);

  const selectedDivision = divisions.find((d) => d.id === divisionId);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function syncFileInput(files: File[]) {
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    if (fileInputRef.current) fileInputRef.current.files = dt.files;
    setPreviews(files.map((f) => ({ file: f, url: URL.createObjectURL(f) })));
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files ?? []);
    syncFileInput([...previews.map((p) => p.file), ...newFiles]);
  }

  function removeImage(index: number) {
    syncFileInput(previews.filter((_, i) => i !== index).map((p) => p.file));
  }

  function addSpecRow() {
    setSpecs((s) => [...s, { label: "", value: "" }]);
  }

  function updateSpecRow(index: number, field: "label" | "value", value: string) {
    setSpecs((s) => s.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function removeSpecRow(index: number) {
    setSpecs((s) => s.filter((_, i) => i !== index));
  }

  const specsJson = JSON.stringify(
    Object.fromEntries(specs.filter((s) => s.label.trim() && s.value.trim()).map((s) => [s.label, s.value])),
  );

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      {state.formError ? (
        <p className="bg-danger/10 text-danger rounded-md px-4 py-3 text-sm">{state.formError}</p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="mt-1.5"
          />
          {state.fieldErrors?.title ? (
            <p className="text-danger mt-1 text-xs">{state.fieldErrors.title[0]}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));
              setSlugTouched(true);
            }}
            required
            className="mt-1.5"
          />
          <p className="text-muted mt-1 text-xs">Product page will be at /products/{slug || "..."}</p>
          {state.fieldErrors?.slug ? (
            <p className="text-danger mt-1 text-xs">{state.fieldErrors.slug[0]}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="summary">Summary</Label>
          <Input id="summary" name="summary" required className="mt-1.5" placeholder="Short line shown on product cards" />
          {state.fieldErrors?.summary ? (
            <p className="text-danger mt-1 text-xs">{state.fieldErrors.summary[0]}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            className="mt-1.5"
            placeholder="Full detail shown on the product page"
          />
          <p className="text-muted mt-1 text-xs">
            Supports Markdown formatting — <code>**bold text**</code>, and bullet lists starting each line with{" "}
            <code>* </code>.
          </p>
        </div>

        <div>
          <Label htmlFor="price">Price (USD)</Label>
          <Input id="price" name="price" type="text" inputMode="decimal" placeholder="Leave blank for 'Contact us for pricing'" className="mt-1.5" />
          {state.fieldErrors?.price ? (
            <p className="text-danger mt-1 text-xs">{state.fieldErrors.price[0]}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="brandId">Brand</Label>
          <Select
            id="brandId"
            name={isAddingNewBrand ? undefined : "brandId"}
            value={brandSelectValue}
            onChange={(e) => setBrandSelectValue(e.target.value)}
            className="mt-1.5"
          >
            <option value="">None</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
            <option value={NEW_BRAND_VALUE}>+ Add new brand...</option>
          </Select>

          {isAddingNewBrand ? (
            <div className="mt-2 flex items-center gap-2">
              <Input
                name="newBrandName"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="New brand name"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => {
                  setBrandSelectValue("");
                  setNewBrandName("");
                }}
                aria-label="Cancel adding new brand"
                className="text-muted hover:text-danger shrink-0"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
          <p className="text-muted mt-1 text-xs">
            {isAddingNewBrand
              ? "This brand will be created and saved for future products too."
              : "Don't see the brand you need? Choose \"+ Add new brand\" above."}
          </p>
        </div>

        <div>
          <Label htmlFor="divisionId">Division</Label>
          <Select
            id="divisionId"
            name="divisionId"
            value={divisionId}
            onChange={(e) => setDivisionId(e.target.value)}
            required
            className="mt-1.5"
          >
            <option value="">Select a division</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
          {state.fieldErrors?.divisionId ? (
            <p className="text-danger mt-1 text-xs">{state.fieldErrors.divisionId[0]}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="categoryId">Category</Label>
          <Select
            id="categoryId"
            name="categoryId"
            defaultValue=""
            disabled={!selectedDivision || selectedDivision.categories.length === 0}
            className="mt-1.5"
          >
            <option value="">None</option>
            {selectedDivision?.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <Checkbox name="featured" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <Checkbox name="isActive" defaultChecked />
          Active (visible on the live site)
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Specifications</Label>
          <Button type="button" variant="outline" size="sm" onClick={addSpecRow}>
            <Plus className="size-3.5" aria-hidden="true" />
            Add spec
          </Button>
        </div>
        {specs.length > 0 ? (
          <div className="flex flex-col gap-2">
            {specs.map((row, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder="Label (e.g. Engine)"
                  value={row.label}
                  onChange={(e) => updateSpecRow(i, "label", e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Value (e.g. Perkins Stage 3B)"
                  value={row.value}
                  onChange={(e) => updateSpecRow(i, "value", e.target.value)}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeSpecRow(i)}
                  aria-label="Remove spec"
                  className="text-muted hover:text-danger shrink-0 px-1"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-xs">No specs added yet.</p>
        )}
        <input type="hidden" name="specs" value={specsJson} />
      </div>

      <div>
        <Label>Images</Label>
        <div className="mt-1.5 flex flex-wrap gap-3">
          {previews.map((p, i) => (
            <div key={p.url} className="border-border relative size-24 overflow-hidden rounded-md border">
              {/* Plain <img>, not next/image — next/image doesn't support
                  blob: URLs (what URL.createObjectURL produces for a local
                  file preview), only http(s) sources. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                aria-label="Remove image"
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </div>
          ))}
          <label className="border-border text-muted hover:text-ink flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed text-xs">
            <ImagePlus className="size-5" aria-hidden="true" />
            Add
            <input
              ref={fileInputRef}
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFilesSelected}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

export { ProductForm };
