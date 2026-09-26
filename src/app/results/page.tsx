import type { Metadata } from "next";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { RatingSummary } from "@/components/testimonials/rating-summary";
import { LogoCloud } from "@/components/home/logo-cloud";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Results — ${profile.name}`,
};

export default function ResultsPage() {
  return (
    <div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-[340px] w-[340px] rounded-full bg-[color-mix(in_oklch,var(--brand-to)_35%,transparent)] blur-[120px]"
        />

        <p className="text-sm font-medium text-primary">Results</p>
        <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
          <span className="text-gradient-brand">1:1 mentoring — what people say</span>
        </h1>
        <div className="mt-4">
          <RatingSummary />
        </div>

        <Reveal className="mt-10">
          <TestimonialGrid />
        </Reveal>
      </div>

      <LogoCloud />
    </div>
  );
}
