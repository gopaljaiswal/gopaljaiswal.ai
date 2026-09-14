import type { Metadata } from "next";
import Link from "next/link";
import { Presentation, Code2, MessageSquare, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: `Coaching — ${profile.name}`,
};

const mockInterviewFormats = [
  {
    icon: Presentation,
    name: "System Design (HLD)",
    description: "A full high-level design round with live feedback on trade-offs and communication.",
  },
  {
    icon: Code2,
    name: "DSA / LLD",
    description: "Coding and low-level design, graded the way an onsite loop actually grades it.",
  },
  {
    icon: MessageSquare,
    name: "Behavioural",
    description: "Story structure, leadership signals, and how to answer without rambling.",
  },
  {
    icon: Repeat,
    name: "Monthly deep-dive",
    description: "A recurring monthly session for ongoing, structured interview prep.",
  },
];

export default function CoachingPage() {
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
          Live 1:1 sessions — book a mock interview to pressure-test where you are, or ongoing
          mentorship to work through the bigger career decisions.
        </p>
      </div>

      <section id="mock-interviews" className="scroll-mt-24 py-12">
        <h2 className="mb-6 font-heading text-xl tracking-tight">02 / Mock interviews</h2>
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockInterviewFormats.map((format) => (
              <Card key={format.name} className="card-interactive border-border/70 py-6">
                <CardHeader>
                  <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-lg text-white">
                    <format.icon className="size-4" />
                  </span>
                  <h3 className="mt-2 font-heading text-lg tracking-tight">{format.name}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
        <Button
          size="lg"
          className="bg-gradient-brand mt-8 border-0 text-white hover:opacity-90"
          render={<Link href={links.topmate} target="_blank" rel="noreferrer" />}
        >
          Book a mock interview
        </Button>
      </section>

      <section id="mentorship" className="scroll-mt-24 border-t border-border/60 py-12">
        <h2 className="mb-4 font-heading text-xl tracking-tight">03 / Career mentorship</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Ongoing 1:1 guidance on levelling up, interview strategy, and career decisions —
          tailored to where you are today. TODO: describe your mentorship format, cadence, and
          what a session covers.
        </p>
        <Button
          size="lg"
          className="bg-gradient-brand mt-8 border-0 text-white hover:opacity-90"
          render={<Link href={links.calendly} target="_blank" rel="noreferrer" />}
        >
          Book mentorship
        </Button>
      </section>
    </div>
  );
}
