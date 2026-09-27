import { z } from "zod";
import { getContent } from "@/lib/content";

export const linksSchema = z.object({
  topmate: z.string().min(1),
  linkedin: z.string().min(1),
  instagram: z.string().min(1),
  propeers: z.string().min(1),
  email: z.string().min(1),
  // The one primary conversion CTA used in the hero and closing banner —
  // routed at a specific bookable service, not a generic profile link.
  primaryCtaLabel: z.string().min(1),
  primaryCtaHref: z.string().min(1),
});
export type Links = z.infer<typeof linksSchema>;

export async function getLinks(): Promise<Links> {
  const data = await getContent<Links>("links");
  if (!data) throw new Error("links content not seeded");
  return data;
}
