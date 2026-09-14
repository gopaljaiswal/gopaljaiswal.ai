import Link from "next/link";
import { ArrowUpRight, Library, Mic, Compass, PenLine } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Offering } from "@/data/offerings";

const icons = { Library, Mic, Compass, PenLine };

export function OfferingCard({ number, icon, title, description, meta, ctaLabel, ctaHref }: Offering) {
  const Icon = icons[icon];

  return (
    <Card className="card-interactive h-full gap-4 border-border/70 py-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-lg text-white">
            <Icon className="size-4" />
          </span>
          <span className="text-gradient-brand font-heading text-sm font-semibold">{number}</span>
        </div>
        <h3 className="mt-2 font-heading text-lg font-medium tracking-tight">{title}</h3>
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
