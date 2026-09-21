import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Used in "Why Choose Us" , a quiet, icon-led card with no accent bar,
 *  kept deliberately calmer than the division/product/brand cards. */
function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-2 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export { FeatureCard };
