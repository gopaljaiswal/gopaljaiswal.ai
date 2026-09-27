import Link from "next/link";
import { Sparkles, CheckCircle2, Bird } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HighlightedBio } from "@/components/home/highlighted-bio";
import { IntegrationsRow } from "@/components/home/integrations-row";
import { TargetCompanies } from "@/components/home/target-companies";
import { HeroRatingBadge } from "@/components/home/hero-rating-badge";
import { getProfileContent } from "@/data/profile";
import { getLinks } from "@/data/links";

const helpItems = [
  "DSA — Data Structures & Algorithms",
  "LLD — Low-Level Design",
  "HLD — High-Level Design",
  "Agentic AI & LLMs",
  "Resume Review",
  "Mock Interviews",
  "Software Engineering Interview Prep",
];

export async function Hero() {
  const [{ profile }, links] = await Promise.all([getProfileContent(), getLinks()]);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="hero-blob-a pointer-events-none absolute -top-48 left-[8%] -z-10 h-[420px] w-[420px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_55%,transparent)] blur-[120px]"
      />
      <div
        aria-hidden
        className="hero-blob-b pointer-events-none absolute -top-32 right-[6%] -z-10 h-[380px] w-[380px] rounded-full bg-[color-mix(in_oklch,var(--brand-to)_55%,transparent)] blur-[120px]"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-8 pb-16 sm:px-6 sm:pt-10 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex flex-1 flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          <div className="fade-up-avatar avatar-ring-gradient shrink-0 rounded-full p-[3px] shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--brand-from)_65%,transparent)]">
            <Avatar className="size-28 border-2 border-background sm:size-36">
              <AvatarImage src="/avatar.jpg" alt={profile.name} />
              <AvatarFallback className="bg-accent font-heading text-2xl text-accent-foreground sm:text-3xl">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="fade-up-stagger">
            <p className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-3.5" />
              {profile.name}
            </p>
            <h1 className="mt-2 font-heading text-2xl leading-tight tracking-tight sm:text-3xl md:text-4xl">
              <span className="text-gradient-brand-live">{profile.headline}</span>
            </h1>
            <TargetCompanies />
            <p className="mt-3 text-sm font-medium text-muted-foreground">{profile.title}</p>
            <p className="mt-4 max-w-2xl text-lg text-foreground/90">{profile.tagline}</p>
            <HeroRatingBadge />
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/90">
              <HighlightedBio text={profile.bio} />
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-gradient-brand border-0 text-white hover:opacity-90"
                render={<Link href={links.primaryCtaHref} target="_blank" rel="noreferrer" />}
              >
                {links.primaryCtaLabel}
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/guide" />}>
                Explore the interview guide
              </Button>
            </div>

            <IntegrationsRow links={links} />
          </div>
        </div>

        <div className="hidden shrink-0 lg:block lg:w-72">
          <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-[0_20px_60px_-30px_color-mix(in_oklch,var(--brand-from)_45%,transparent)] backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">How I help you</p>
            <h2 className="mt-2 font-heading text-lg tracking-tight">
              Crack <span className="text-gradient-brand">product-based</span> companies
            </h2>
            <div className="relative mt-5">
              <span className="animate-bird-hop absolute -left-3 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-red-400 via-orange-400 to-yellow-300 shadow-[0_0_14px_rgba(251,146,60,0.75)]">
                <Bird className="size-3 text-white drop-shadow-sm" />
              </span>
              <ul className="space-y-3">
                {helpItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
