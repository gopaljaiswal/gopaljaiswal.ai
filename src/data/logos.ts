import { z } from "zod";
import { getContent } from "@/lib/content";

export const logoSchema = z.object({
  name: z.string().min(1),
  initials: z.string().min(1).max(4),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});
export type Logo = z.infer<typeof logoSchema>;

export const logosContentSchema = z.object({
  logos: z.array(logoSchema),
});
export type LogosContent = z.infer<typeof logosContentSchema>;

export async function getLogosContent(): Promise<LogosContent> {
  const data = await getContent<LogosContent>("logos");
  if (!data) throw new Error("logos content not seeded");
  return data;
}
