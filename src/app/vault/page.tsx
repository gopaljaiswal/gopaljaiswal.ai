import type { Metadata } from "next";
import { PricingCard } from "@/components/vault/pricing-card";
import { DomainChart } from "@/components/vault/domain-chart";
import { VaultQuestionList } from "@/components/vault/vault-question-list";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Resource Vault — ${profile.name}`,
};

export default function VaultPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div
        aria-hidden
        className="bg-grid-fade pointer-events-none absolute inset-0 -z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/3 -z-10 h-[340px] w-[340px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_35%,transparent)] blur-[120px]"
      />

      <div className="mb-4">
        <p className="text-sm font-medium text-primary">01 / Paid resource</p>
        <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
          <span className="text-gradient-brand">The System Design & Engineering Vault</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Answers to the questions senior, staff and principal interviews actually turn on:
          framing, trade-offs, failure modes, and the language to explain them.
        </p>
      </div>

      <Reveal>
        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h2 className="mb-4 font-heading text-lg tracking-tight">By domain</h2>
            <DomainChart />
          </div>
          <PricingCard />
        </div>
      </Reveal>

      <div id="vault-questions" className="scroll-mt-24 pt-8">
        <h2 className="mb-6 font-heading text-xl tracking-tight">Every question</h2>
        <VaultQuestionList />
      </div>
    </div>
  );
}
