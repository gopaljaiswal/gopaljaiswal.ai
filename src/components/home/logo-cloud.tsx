import { ArrowRight } from "lucide-react";
import { logos, mentorFromCompanies, type Logo } from "@/data/logos";

function Badge({ initials, color, size = "sm" }: { initials: string; color: string; size?: "sm" | "lg" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-heading font-semibold text-white ${
        size === "lg" ? "size-9 text-xs" : "size-6 text-[10px]"
      }`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

function LogoPill({ name, initials, color }: Logo) {
  return (
    <span className="flex items-center gap-2.5 rounded-full border border-border/70 bg-card py-1.5 pr-4 pl-1.5 transition-colors hover:border-primary/40">
      <Badge initials={initials} color={color} size="lg" />
      <span className="font-heading text-base text-foreground/90">{name}</span>
    </span>
  );
}

export function LogoCloud({ compact = false }: { compact?: boolean }) {
  const track = [...logos, ...logos];

  return (
    <section className={`mx-auto max-w-6xl px-4 sm:px-6 ${compact ? "py-8" : "py-16"}`}>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <div className="flex items-center -space-x-2">
          {mentorFromCompanies.map((c) => (
            <Badge key={c.name} initials={c.initials} color={c.color} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground/80">
          Mentees from {mentorFromCompanies.map((c) => c.name).join(", ")}
        </span>
        <ArrowRight className="size-3.5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">now at</span>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-4">
          {track.map((logo, i) => (
            <LogoPill key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
