import { offerings } from "@/data/offerings";
import { OfferingCard } from "@/components/home/offering-card";

export function OfferingsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10">
        <p className="text-sm font-medium text-primary">Everything on offer</p>
        <h2 className="mt-2 font-heading text-2xl tracking-tight sm:text-3xl">
          {offerings.length.toString().padStart(2, "0")}
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
