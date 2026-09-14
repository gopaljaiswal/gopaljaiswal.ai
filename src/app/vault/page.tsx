import type { Metadata } from "next";
import { PricingCard } from "@/components/vault/pricing-card";
import { DomainChart } from "@/components/vault/domain-chart";
import { VaultQuestionList } from "@/components/vault/vault-question-list";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Resource Vault — ${profile.name}`,
};

export default function VaultPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-primary">01 / Paid resource</p>
        <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
          The System Design & Engineering Vault
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Answers to the questions senior, staff and principal interviews actually turn on:
          framing, trade-offs, failure modes, and the language to explain them.
        </p>
      </div>

      <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h2 className="mb-4 font-heading text-lg tracking-tight">By domain</h2>
          <DomainChart />
        </div>
        <PricingCard />
      </div>

      <div id="vault-questions" className="scroll-mt-24 pt-8">
        <h2 className="mb-6 font-heading text-xl tracking-tight">Every question</h2>
        <VaultQuestionList />
      </div>
    </div>
  );
}
