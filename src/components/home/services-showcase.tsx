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
import { DigitalProducts } from "@/components/guide/digital-products";
import { getServices } from "@/data/services";

const serviceIcons = [Coffee, MessageCircle, FileText, Code2, Presentation, Sparkles, Briefcase, Rocket];

export async function ServicesShowcase() {
  const { oneOnOneServices, coachingPackage, priorityDM, digitalProducts } = await getServices();

  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-[300px] w-[300px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_30%,transparent)] blur-[110px]"
      />

      <div className="mb-10 text-center">
        <p className="text-sm font-medium text-primary">Services</p>
        <h2 className="mt-2 font-heading text-2xl tracking-tight sm:text-3xl">
          Everything you can <span className="text-gradient-brand">book, in one place</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Live 1:1 sessions, ongoing coaching, and free digital resources — pick what fits where
          you are right now.
        </p>
      </div>

      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Every session is a real conversation, not a script — the same depth I'd want if I were on
        the other side of the table.
      </p>
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

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
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
            <div className="flex shrink-0 items-center gap-4">
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

        <Card className="card-interactive border-border/70 py-6">
          <CardHeader>
            <h3 className="font-heading text-base tracking-tight">{priorityDM.name}</h3>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{priorityDM.description}</p>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              render={<Link href={priorityDM.href} target="_blank" rel="noreferrer" />}
            >
              <IndianRupee className="size-3.5" />
              {priorityDM.price}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h3 className="font-heading text-lg tracking-tight">Digital products</h3>
        <p className="mt-1 mb-5 max-w-2xl text-sm text-muted-foreground">
          Prep at your own pace — real interview questions and design resources, no session
          required.
        </p>
        <DigitalProducts products={digitalProducts} />
      </div>

      <div className="mt-10 text-center">
        <Button size="lg" variant="outline" render={<Link href="/coaching" />}>
          See all services & formats
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
