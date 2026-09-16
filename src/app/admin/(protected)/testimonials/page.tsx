import { getTestimonialsContent } from "@/data/testimonials";
import { TestimonialsForm } from "./testimonials-form";

export default async function AdminTestimonialsPage() {
  const data = await getTestimonialsContent();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">Testimonials</h1>
      <p className="mt-1 text-sm text-muted-foreground">Shown on the homepage and /results.</p>
      <div className="mt-6">
        <TestimonialsForm initial={data} />
      </div>
    </div>
  );
}
