import { Hero } from "@/components/home/hero";
import { StatsRow } from "@/components/home/stats-row";
import { OfferingsGrid } from "@/components/home/offerings-grid";
import { VaultPreview } from "@/components/home/vault-preview";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { RatingSummary } from "@/components/testimonials/rating-summary";
import { LogoCloud } from "@/components/home/logo-cloud";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsRow />
      <OfferingsGrid />
      <VaultPreview />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Results</p>
            <h2 className="mt-2 font-heading text-2xl tracking-tight sm:text-3xl">
              What people say after a session
            </h2>
            <div className="mt-3">
              <RatingSummary />
            </div>
          </div>
          <Link
            href="/results"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            See all reviews
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <TestimonialGrid limit={3} />
      </section>

      <LogoCloud />
    </>
  );
}
