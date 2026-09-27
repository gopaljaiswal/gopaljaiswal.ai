import type { Metadata } from "next";
import Link from "next/link";
import {
  Coffee,
  MessageCircle,
  FileText,
  Code2,
  Presentation,
  Sparkles,
  Briefcase,
  Rocket,
  Package,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { getProfileContent } from "@/data/profile";
import { getServices } from "@/data/services";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getProfileContent();
  return { title: `Coaching — ${profile.name}` };
}

const serviceIcons = [Coffee, MessageCircle, FileText, Code2, Presentation, Sparkles, Briefcase, Rocket];

export default async function CoachingPage() {
  const { oneOnOneServices, coachingPackage, priorityDM } = await getServices();

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/4 -z-10 h-[340px] w-[340px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_35%,transparent)] blur-[120px]"
      />

      <div>
        <p className="text-sm font-medium text-primary">Coaching</p>
        <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
          <span className="text-gradient-brand">Mock interviews & career mentorship</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Live 1:1 sessions, booked directly on Topmate — pick a format below, or send a quick
          question if you&apos;re not sure where to start.
        </p>
      </div>

      <section id="mock-interviews" className="scroll-mt-24 py-12">
        <h2 className="mb-6 font-heading text-xl tracking-tight">1:1 sessions</h2>
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {oneOnOneServices.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <Card key={service.name} className="card-interactive flex flex-col border-border/70 py-6">
                  <CardHeader>
                    <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-lg text-white">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="mt-2 font-heading text-lg tracking-tight">{service.name}</h3>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground/70">{service.durationMinutes} min video call</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-lg">
                        <IndianRupee className="mb-0.5 inline size-4" />
                        {service.price.toLocaleString("en-IN")}
                      </span>
                      <Link
                        href={service.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Book a session
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section id="mentorship" className="scroll-mt-24 border-t border-border/60 py-12">
        <h2 className="mb-6 font-heading text-xl tracking-tight">Coaching package & ongoing support</h2>

        <Reveal>
          <Card className="border-primary/30 py-6 shadow-[0_30px_60px_-32px_color-mix(in_oklch,var(--brand-from)_50%,transparent)]">
            <CardHeader>
              <Badge className="bg-gradient-brand w-fit border-0 text-white">
                <Package className="size-3.5" />
                4-session package
              </Badge>
              <h3 className="mt-2 font-heading text-xl tracking-tight">{coachingPackage.name}</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm text-muted-foreground">{coachingPackage.description}</p>
              <div className="flex items-center gap-4">
                <span className="font-heading text-2xl">
                  <IndianRupee className="mb-0.5 inline size-5" />
                  {coachingPackage.price.toLocaleString("en-IN")}
                </span>
                <Button
                  className="bg-gradient-brand border-0 text-white hover:opacity-90"
                  render={<Link href={coachingPackage.href} target="_blank" rel="noreferrer" />}
                >
                  Book the package
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card className="card-interactive border-border/70 py-6">
            <CardHeader>
              <h3 className="font-heading text-base tracking-tight">{priorityDM.name}</h3>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{priorityDM.description}</p>
              <Button
                size="sm"
                variant="outline"
                render={<Link href={priorityDM.href} target="_blank" rel="noreferrer" />}
              >
                <IndianRupee className="size-3.5" />
                {priorityDM.price}
              </Button>
            </CardContent>
          </Card>

          <Card className="card-interactive border-border/70 py-6">
            <CardHeader>
              <h3 className="font-heading text-base tracking-tight">Not sure what you need?</h3>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Message directly and I&apos;ll point you to the right session.
              </p>
              <Button size="sm" render={<Link href="https://topmate.io/gopal_jaiswal12/" target="_blank" rel="noreferrer" />}>
                View profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
