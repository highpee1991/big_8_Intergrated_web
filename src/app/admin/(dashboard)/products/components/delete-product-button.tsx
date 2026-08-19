// delete-product-button.tsx
"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "../actions";

export interface DeleteProductButtonProps {
  id: string;
  title: string;
}

function DeleteProductButton({ id, title }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteProduct(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={`Delete ${title}`}
      className="text-muted hover:text-danger inline-flex size-8 items-center justify-center rounded-md transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

export { DeleteProductButton };
