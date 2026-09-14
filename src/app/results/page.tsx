import type { Metadata } from "next";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { RatingSummary } from "@/components/testimonials/rating-summary";
import { LogoCloud } from "@/components/home/logo-cloud";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Results — ${profile.name}`,
};

export default function ResultsPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium text-primary">Results</p>
        <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
          1:1 mentoring — what people say
        </h1>
        <div className="mt-4">
          <RatingSummary />
        </div>

        <div className="mt-10">
          <TestimonialGrid />
        </div>
      </div>

      <LogoCloud />
    </div>
  );
}
