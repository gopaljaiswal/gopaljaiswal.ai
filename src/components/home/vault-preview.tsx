import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { vaultQuestions } from "@/data/vault";
import { VaultQuestionCard } from "@/components/vault/vault-question-card";

export function VaultPreview() {
  const preview = vaultQuestions.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
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
    </section>
  );
}
