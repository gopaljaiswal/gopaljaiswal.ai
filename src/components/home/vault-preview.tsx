import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { vaultQuestions } from "@/data/vault";
import { VaultQuestionCard } from "@/components/vault/vault-question-card";

export function VaultPreview() {
  const preview = vaultQuestions.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-secondary/30 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-[300px] w-[300px] rounded-full bg-[color-mix(in_oklch,var(--brand-to)_30%,transparent)] blur-[110px]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <Badge className="bg-gradient-brand mb-3 border-0 text-white">Flagship paid resource</Badge>
            <p className="text-sm font-medium text-primary">Inside the vault</p>
            <h2 className="mt-2 font-heading text-2xl tracking-tight sm:text-3xl">
              A sample of what&apos;s inside
            </h2>
          </div>
          <Link
            href="/vault"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            See all {vaultQuestions.length}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {preview.map((q) => (
            <VaultQuestionCard key={q.id} {...q} />
          ))}
        </div>

        <Link
          href="/vault"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
        >
          See all {vaultQuestions.length}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
