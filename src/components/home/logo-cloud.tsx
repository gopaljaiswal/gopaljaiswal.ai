import { logos } from "@/data/logos";

export function LogoCloud() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
        Mentees now at
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map((logo) => (
          <span
            key={logo.name}
            className="font-heading text-lg text-muted-foreground/70 grayscale transition-colors hover:text-foreground"
          >
            {logo.name}
          </span>
        ))}
      </div>
    </section>
  );
}
