import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ quote, name, sessionTopic }: Testimonial) {
  return (
    <Card className="h-full border-border/70 py-5">
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/90">&ldquo;{quote}&rdquo;</p>
        <p className="mt-4 text-xs font-medium text-muted-foreground">
          {name} · {sessionTopic}
        </p>
      </CardContent>
    </Card>
  );
}
