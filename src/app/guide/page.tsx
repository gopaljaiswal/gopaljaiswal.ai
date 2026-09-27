import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PricingCard } from "@/components/vault/pricing-card";
import { DigitalProducts } from "@/components/guide/digital-products";
import { getProfileContent } from "@/data/profile";
import { getVaultContent } from "@/data/vault";
import { getServices } from "@/data/services";
import { flattenQuestions } from "@/lib/vault-nav";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getProfileContent();
  return { title: `Tech Interview Guide — ${profile.name}` };
}

export default async function GuidePage() {
  const [{ vaultQuestions }, { digitalProducts }] = await Promise.all([
    getVaultContent(),
    getServices(),
  ]);
  const first = flattenQuestions(vaultQuestions)[0];

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm font-medium text-primary">Resources</p>
        <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
          <span className="text-gradient-brand">Tech Interview Guide</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Digital products, question banks, and answers to the questions senior, staff and
          principal interviews actually turn on — pick a topic on the left, or start from the
          first question below.
        </p>
        {first && (
          <Link
            href={`/guide/${first.id}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Start reading
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>

      <div id="resources" className="scroll-mt-24 py-8">
        <h2 className="mb-6 font-heading text-xl tracking-tight">Digital products</h2>
        <DigitalProducts products={digitalProducts} />
      </div>

      <div className="border-t border-border/60 py-8">
        <PricingCard />
      </div>
    </div>
  );
}
