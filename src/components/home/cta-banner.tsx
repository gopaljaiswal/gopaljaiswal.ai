import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfileContent } from "@/data/profile";
import { getLinks } from "@/data/links";

export async function CtaBanner() {
  const [{ profile }, links] = await Promise.all([getProfileContent(), getLinks()]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="bg-gradient-brand relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-16 sm:py-20">
        <div
          aria-hidden
          className="bg-grid-fade pointer-events-none absolute inset-0 opacity-30"
        />
        <h2 className="relative font-heading text-2xl tracking-tight text-white sm:text-4xl">
          Ready to level up your system design & career?
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
          Book a session with {profile.name}, or get lifetime access to the interview guide —
          start wherever fits where you are right now.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
            className="border-0 bg-white text-[oklch(0.2_0.03_285)] hover:bg-white/90"
            render={<Link href={links.primaryCtaHref} target="_blank" rel="noreferrer" />}
          >
            {links.primaryCtaLabel}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10"
            render={<Link href="/guide" />}
          >
            Get lifetime access
          </Button>
        </div>
      </div>
    </section>
  );
}
