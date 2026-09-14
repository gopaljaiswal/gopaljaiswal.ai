import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ quote, name, sessionTopic }: Testimonial) {
  return (
    <Card className="card-interactive h-full border-border/70 py-5">
      <CardContent>
        <div className="flex items-center justify-between">
          <Quote className="size-5 text-primary/70" />
          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">&ldquo;{quote}&rdquo;</p>
        <p className="mt-4 text-xs font-medium text-muted-foreground">
          {name} · {sessionTopic}
        </p>
      </CardContent>
    </Card>
  );
}
