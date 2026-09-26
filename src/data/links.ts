import { z } from "zod";
import { getContent } from "@/lib/content";

export const linksSchema = z.object({
  topmate: z.string().min(1),
  calendly: z.string().min(1),
  linkedin: z.string().min(1),
  twitter: z.string().min(1),
  substack: z.string().min(1),
  email: z.string().min(1),
});
export type Links = z.infer<typeof linksSchema>;

export async function getLinks(): Promise<Links> {
  const data = await getContent<Links>("links");
  if (!data) throw new Error("links content not seeded");
  return data;
}
