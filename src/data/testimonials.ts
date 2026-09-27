import { z } from "zod";
import { getContent } from "@/lib/content";

export const testimonialSourceSchema = z.enum(["topmate", "propeers"]);
export type TestimonialSource = z.infer<typeof testimonialSourceSchema>;

export const testimonialSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  sessionTopic: z.string().min(1),
  source: testimonialSourceSchema.default("topmate"),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const ratingSummarySchema = z.object({
  rating: z.string().min(1),
  ratingCount: z.string().min(1),
  bookings: z.string().min(1),
});
export type RatingSummary = z.infer<typeof ratingSummarySchema>;

export const testimonialsContentSchema = z.object({
  testimonials: z.array(testimonialSchema),
  ratingSummary: ratingSummarySchema,
});
export type TestimonialsContent = z.infer<typeof testimonialsContentSchema>;

export async function getTestimonialsContent(): Promise<TestimonialsContent> {
  const data = await getContent<TestimonialsContent>("testimonials");
  if (!data) throw new Error("testimonials content not seeded");
  return data;
}
