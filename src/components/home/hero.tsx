import Link from "next/link";
import { MapPin, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile, education, certifications } from "@/data/profile";
import { links } from "@/data/links";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-[8%] -z-10 h-[420px] w-[420px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_55%,transparent)] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[6%] -z-10 h-[380px] w-[380px] rounded-full bg-[color-mix(in_oklch,var(--brand-to)_55%,transparent)] blur-[120px]"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 md:flex-row md:items-center md:gap-12">
        <div className="avatar-ring-gradient shrink-0 rounded-full p-[3px] shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--brand-from)_65%,transparent)]">
          <Avatar className="size-28 border-2 border-background sm:size-36">
            <AvatarImage src="/avatar.jpg" alt={profile.name} />
            <AvatarFallback className="bg-accent font-heading text-2xl text-accent-foreground sm:text-3xl">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <div>
          <p className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-3.5" />
            {profile.name}
            {profile.location && (
              <span className="inline-flex items-center gap-1 font-normal text-muted-foreground">
                <span aria-hidden>·</span>
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
            )}
          </p>
          <h1 className="mt-2 font-heading text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-gradient-brand">{profile.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{profile.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{education.school}</Badge>
            {certifications.slice(0, 3).map((cert) => (
              <Badge key={cert} variant="secondary">
                {cert}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-gradient-brand border-0 text-white hover:opacity-90"
              render={<Link href={links.topmate} target="_blank" rel="noreferrer" />}
            >
              Book a 1:1
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/vault" />}>
              Explore the vault
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
