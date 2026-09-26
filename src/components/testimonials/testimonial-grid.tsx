import { getTestimonialsContent } from "@/data/testimonials";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";

export async function TestimonialGrid({ limit }: { limit?: number }) {
  const { testimonials } = await getTestimonialsContent();
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <TestimonialCard key={t.id} {...t} />
      ))}
    </div>
  );
}
