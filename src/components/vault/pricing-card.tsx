import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { vaultPricing } from "@/data/pricing";
import { vaultQuestions } from "@/data/vault";
import { links } from "@/data/links";

export function PricingCard() {
  const freeCount = vaultQuestions.filter((q) => !q.locked).length;
  const domainCount = new Set(vaultQuestions.map((q) => q.domain)).size;

  return (
    <Card className="border-primary/30 py-6 shadow-[0_30px_60px_-32px_color-mix(in_oklch,var(--brand-from)_50%,transparent)]">
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          Lifetime access
        </Badge>
        <h3 className="mt-2 font-heading text-xl tracking-tight">
          The System Design & Engineering Vault
        </h3>
        <p className="text-xs text-muted-foreground">
          {vaultPricing.rating} · {vaultPricing.ratingCount}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
          <div className="rounded-lg border border-border/70 py-2">
            <p className="font-heading text-lg text-foreground">{vaultQuestions.length}</p>
            answers
          </div>
          <div className="rounded-lg border border-border/70 py-2">
            <p className="font-heading text-lg text-foreground">{domainCount}</p>
            domains
          </div>
          <div className="rounded-lg border border-border/70 py-2">
            <p className="font-heading text-lg text-foreground">{freeCount}</p>
            open free
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl">{vaultPricing.price}</span>
          <span className="text-sm text-muted-foreground line-through">
            {vaultPricing.listPrice}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{vaultPricing.discountLabel}</p>
        <p className="text-xs text-muted-foreground">{vaultPricing.accessLabel}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="bg-gradient-brand flex-1 border-0 text-white hover:opacity-90"
            render={<Link href={links.topmate} target="_blank" rel="noreferrer" />}
          >
            Get lifetime access
          </Button>
          <Button variant="outline" className="flex-1" render={<Link href="#vault-questions" />}>
            Open free answers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
