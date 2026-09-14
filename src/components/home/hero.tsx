import Link from "next/link";
import { MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile, education, certifications } from "@/data/profile";
import { links } from "@/data/links";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid-fade pointer-events-none absolute inset-0 -z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 md:flex-row md:items-center md:gap-12">
        <Avatar className="size-28 shrink-0 border border-border text-2xl shadow-[0_0_0_1px_oklch(1_0_0/6%),0_20px_50px_-20px_oklch(0.6_0.19_259/60%)] sm:size-36">
          <AvatarFallback className="bg-accent font-heading text-2xl text-accent-foreground sm:text-3xl">
            {profile.initials}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
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
            {profile.title}
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
              className="shadow-[0_10px_30px_-10px_oklch(0.6_0.19_259/70%)]"
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
