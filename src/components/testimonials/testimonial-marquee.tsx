import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

const sourceStyles = {
  topmate: { text: "text-[#7C3AED]", ring: "ring-[#7C3AED]/20", bg: "bg-[#7C3AED]/10", label: "Topmate" },
  propeers: { text: "text-[#0EA5A5]", ring: "ring-[#0EA5A5]/20", bg: "bg-[#0EA5A5]/10", label: "Propeers" },
} as const;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "").concat(parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "").toUpperCase();
}

function MiniCard({ quote, name, source }: Testimonial) {
  const style = sourceStyles[source];
  return (
    <div className="card-interactive relative w-80 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-card px-5 py-4 shadow-sm">
      <Quote
        aria-hidden
        className="absolute -top-2 -right-2 size-16 text-foreground/[0.04]"
        fill="currentColor"
      />
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3 fill-current" />
        ))}
      </div>
      <p className="relative mt-2 line-clamp-3 text-[13px] leading-relaxed text-foreground/90">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="relative mt-3 flex items-center gap-2.5">
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ring-1 ${style.bg} ${style.text} ${style.ring}`}
        >
          {initialsOf(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">{name}</p>
          <p className={`text-[10px] ${style.text}`}>{style.label}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const track = [...testimonials, ...testimonials];
  // Long, content-proportional duration so the scroll stays readable no matter
  // how many testimonials there are — the shared .marquee-track default (28s)
  // was tuned for a handful of logos, not 50+ full sentences.
  const durationSeconds = Math.max(180, testimonials.length * 15);

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="marquee-track flex w-max items-stretch gap-4"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((t, i) => (
          <MiniCard key={`${t.id}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}
