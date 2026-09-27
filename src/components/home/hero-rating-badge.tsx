import { Star } from "lucide-react";
import { getTestimonialsContent } from "@/data/testimonials";

export async function HeroRatingBadge() {
  const { ratingSummary } = await getTestimonialsContent();

  return (
    <div className="mt-3 flex flex-col gap-1">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 py-1.5 pr-4 pl-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-amber-400/20">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
        </span>
        <span className="font-heading text-base font-semibold text-foreground">{ratingSummary.rating}</span>
        <span aria-hidden className="text-border">
          |
        </span>
        <span className="text-sm font-medium text-muted-foreground">{ratingSummary.ratingCount}</span>
        <span aria-hidden className="text-border">
          ·
        </span>
        <span className="text-sm font-medium text-muted-foreground">{ratingSummary.bookings}</span>
      </div>
      <p className="pl-2 text-xs text-muted-foreground/70">Across Topmate &amp; Propeers</p>
    </div>
  );
}
