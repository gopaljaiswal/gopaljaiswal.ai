import { z } from "zod";
import { getContent } from "@/lib/content";

export const offeringIconSchema = z.enum(["Library", "Mic", "Compass", "PenLine"]);
export type OfferingIcon = z.infer<typeof offeringIconSchema>;

export const offeringSchema = z.object({
  number: z.string().min(1),
  icon: offeringIconSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  meta: z.array(z.string()),
  ctaLabel: z.string().min(1),
  ctaHref: z.string().min(1),
});
export type Offering = z.infer<typeof offeringSchema>;

export async function getOfferings(): Promise<Offering[]> {
  const data = await getContent<Offering[]>("offerings");
  if (!data) throw new Error("offerings content not seeded");
  return data;
}
