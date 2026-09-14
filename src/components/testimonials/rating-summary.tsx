import { ratingSummary } from "@/data/testimonials";

export function RatingSummary() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
      <span className="font-heading text-lg text-foreground">★ {ratingSummary.rating}</span>
      <span>{ratingSummary.ratingCount}</span>
      <span>·</span>
      <span>{ratingSummary.bookings}</span>
    </div>
  );
}
