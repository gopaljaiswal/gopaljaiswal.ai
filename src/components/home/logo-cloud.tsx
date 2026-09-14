import { logos } from "@/data/logos";

export function LogoCloud({ compact = false }: { compact?: boolean }) {
  const track = [...logos, ...logos];

  return (
    <section className={`mx-auto max-w-6xl px-4 sm:px-6 ${compact ? "py-8" : "py-16"}`}>
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
        Mentees now at
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-x-14">
          {track.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="font-heading text-lg text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
