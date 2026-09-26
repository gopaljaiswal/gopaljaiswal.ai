import { z } from "zod";
import { getContent } from "@/lib/content";

export const statIconSchema = z.enum(["Star", "Quote", "CalendarCheck", "Building2", "GraduationCap", "Trophy"]);
export type StatIcon = z.infer<typeof statIconSchema>;

export const statSchema = z.object({
  icon: statIconSchema,
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().url().optional().or(z.literal("#")),
});
export type Stat = z.infer<typeof statSchema>;

export const statsContentSchema = z.array(statSchema);

export async function getStats(): Promise<Stat[]> {
  const data = await getContent<Stat[]>("stats");
  if (!data) throw new Error("stats content not seeded");
  return data;
}
