import { getOfferings } from "@/data/offerings";
import { OfferingCard } from "@/components/home/offering-card";

export async function OfferingsGrid() {
  const offerings = await getOfferings();

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_30%,transparent)] blur-[110px]"
      />
      <div className="mb-10">
        <p className="text-sm font-medium text-primary">Everything on offer</p>
        <h2 className="mt-2 font-heading text-2xl tracking-tight sm:text-3xl">
          <span className="text-gradient-brand">{offerings.length.toString().padStart(2, "0")}</span>{" "}
          ways to work together
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offerings.map((offering) => (
          <OfferingCard key={offering.number} {...offering} />
        ))}
      </div>
    </section>
  );
}
