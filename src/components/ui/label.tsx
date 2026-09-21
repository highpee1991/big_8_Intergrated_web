import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-ink", className)}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };



/** Small, consistent validation-message treatment , used under any form
 *  field. role="alert" so screen readers announce it when it appears. */
function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="text-xs text-danger">
      {children}
    </p>
  );
}

export { FieldError };