// src/components/ui/select.tsx
//
// A plain native <select>, styled to match Input exactly. Deliberately not
// a Radix/custom-dropdown component , a native select is fully accessible,
// works with keyboards and screen readers for free, and needs zero extra
// dependencies. Reach for this anywhere a simple single-choice dropdown is
// needed; build something fancier only if a specific design calls for it.
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={invalid || undefined}
          className={cn(
            "flex h-11 w-full appearance-none rounded-md border border-border bg-card px-4 pr-10 text-sm text-ink",
            "transition-colors duration-base",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            invalid && "border-danger focus-visible:outline-danger",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
