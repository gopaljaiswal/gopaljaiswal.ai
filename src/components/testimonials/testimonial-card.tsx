import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Testimonial } from "@/data/testimonials";

const sourceStyles = {
  topmate: {
    card: "border-l-4 border-l-[#7C3AED] border-y-border/70 border-r-border/70",
    icon: "text-[#7C3AED]",
    stars: "text-[#7C3AED]",
    badge: "border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED]",
    label: "Topmate",
  },
  propeers: {
    card: "border-l-4 border-l-[#0EA5A5] border-y-border/70 border-r-border/70",
    icon: "text-[#0EA5A5]",
    stars: "text-[#0EA5A5]",
    badge: "border-[#0EA5A5]/30 bg-[#0EA5A5]/10 text-[#0EA5A5]",
    label: "Propeers",
  },
} as const;

export function TestimonialCard({ quote, name, sessionTopic, source }: Testimonial) {
  const style = sourceStyles[source];

  return (
    <Card className={`card-interactive h-full py-5 ${style.card}`}>
      <CardContent>
        <div className="flex items-center justify-between">
          <Quote className={`size-5 ${style.icon}`} />
          <div className={`flex gap-0.5 ${style.stars}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">&ldquo;{quote}&rdquo;</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground">
            {name} · {sessionTopic}
          </p>
          <Badge variant="outline" className={`shrink-0 text-[10px] ${style.badge}`}>
            {style.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
