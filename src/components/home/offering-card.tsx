import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Offering } from "@/data/offerings";

export function OfferingCard({ number, title, description, meta, ctaLabel, ctaHref }: Offering) {
  return (
    <Card className="card-interactive h-full gap-4 border-border/70 py-6">
      <CardHeader>
        <span className="font-heading text-sm text-muted-foreground">{number}</span>
        <h3 className="font-heading text-lg font-medium tracking-tight">{title}</h3>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-5">
        <div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.map((m) => (
              <Badge key={m} variant="secondary">
                {m}
              </Badge>
            ))}
          </div>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {ctaLabel}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
