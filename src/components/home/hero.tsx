import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { links } from "@/data/links";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 md:flex-row md:items-center md:gap-12">
      <Avatar className="size-28 shrink-0 border border-border text-2xl sm:size-36">
        <AvatarFallback className="bg-accent font-heading text-2xl text-accent-foreground sm:text-3xl">
          {profile.initials}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="text-sm font-medium text-primary">{profile.name}</p>
        <h1 className="mt-2 font-heading text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {profile.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{profile.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {profile.bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" render={<Link href={links.topmate} target="_blank" rel="noreferrer" />}>
            Book a 1:1
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/vault" />}>
            Explore the vault
          </Button>
        </div>
      </div>
    </section>
  );
}
