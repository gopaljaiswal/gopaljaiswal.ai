import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { CareerJourney } from "@/components/home/career-journey";
import { TestimonialMarquee } from "@/components/testimonials/testimonial-marquee";
import { RatingSummary } from "@/components/testimonials/rating-summary";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { CtaBanner } from "@/components/home/cta-banner";
import { Reveal } from "@/components/reveal";
import { getTestimonialsContent } from "@/data/testimonials";

export default async function Home() {
  const { testimonials } = await getTestimonialsContent();

  return (
    <>
      {/* Hook */}
      <Hero />

      <Reveal>
        <CareerJourney />
      </Reveal>

      {/* Social proof, high up and moving */}
      <Reveal>
        <section className="relative overflow-hidden border-y border-border/60 bg-secondary/20 py-10">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          />
          <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <p className="text-sm font-medium text-primary">Testimonials</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
                  Trusted by <span className="text-gradient-brand">300+ engineers</span>
                </h2>
                <RatingSummary />
              </div>
            </div>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See all reviews
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <TestimonialMarquee testimonials={testimonials} />
        </section>
      </Reveal>

      <Reveal>
        <ServicesShowcase />
      </Reveal>

      {/* Final close */}
      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  );
}
