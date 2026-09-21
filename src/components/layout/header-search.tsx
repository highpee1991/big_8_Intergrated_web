// src/components/layout/header-search.tsx
//
// Persistent search entry point, visible in the header on every page ,
// not just on /products. Expands from an icon into an input on click,
// submits by navigating to /products?q=<value>, where the filter bar
// picks up the query param and applies it as the initial search term.
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

function HeaderSearch() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;
    router.push(`/products?q=${encodeURIComponent(query)}`);
    setOpen(false);
    setValue("");
  }

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {open ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
              placeholder="Search products..."
              aria-label="Search products"
              className="h-9 w-full rounded-full border border-border bg-card px-4 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </motion.form>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close search" : "Search products"}
        className="text-ink/70 hover:text-ink hover:bg-surface ml-1 inline-flex size-9 items-center justify-center rounded-full transition-colors"
      >
        {open ? <X className="size-4.5" aria-hidden="true" /> : <Search className="size-4.5" aria-hidden="true" />}
      </button>
    </div>
  );
}

export { HeaderSearch };
