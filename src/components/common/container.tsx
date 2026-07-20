import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "content" = 1280px (default, most sections). "wide" = 1440px (hero, wide grids). */
  width?: "content" | "wide";
  as?: React.ElementType;
}

function Container({ className, width = "content", as: Tag = "div", ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        width === "content" ? "max-w-(--container-content)" : "max-w-(--container-wide)",
        className
      )}
      {...props}
    />
  );
}

export { Container };
