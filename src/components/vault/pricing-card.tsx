import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getVaultContent } from "@/data/vault";
import { flattenQuestions } from "@/lib/vault-nav";

export async function PricingCard() {
  const { vaultQuestions } = await getVaultContent();
  const domainCount = new Set(vaultQuestions.map((q) => q.domain)).size;
  const firstId = flattenQuestions(vaultQuestions)[0]?.id;

  return (
    <Card className="border-primary/30 py-6 shadow-[0_30px_60px_-32px_color-mix(in_oklch,var(--brand-from)_50%,transparent)]">
      <CardHeader>
        <Badge className="bg-gradient-brand w-fit border-0 text-white">Fully open</Badge>
        <h3 className="mt-2 font-heading text-xl tracking-tight">Every interview answer, free</h3>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-2 text-center text-xs text-muted-foreground">
          <div className="rounded-lg border border-border/70 py-2">
            <p className="font-heading text-lg text-foreground">{vaultQuestions.length}</p>
            answers
          </div>
          <div className="rounded-lg border border-border/70 py-2">
            <p className="font-heading text-lg text-foreground">{domainCount}</p>
            domains
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          No sign-up, no paywall — every answer below is open to read.
        </p>

        {firstId && (
          <Button
            className="bg-gradient-brand w-full border-0 text-white hover:opacity-90"
            render={<Link href={`/guide/${firstId}`} />}
          >
            Browse all questions
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
