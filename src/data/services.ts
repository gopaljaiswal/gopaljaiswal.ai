import { z } from "zod";
import { getContent } from "@/lib/content";

export const oneOnOneServiceSchema = z.object({
  name: z.string().min(1),
  durationMinutes: z.number().int().positive(),
  price: z.number().nonnegative(),
  href: z.string().url(),
});
export type OneOnOneService = z.infer<typeof oneOnOneServiceSchema>;

export const namedOfferSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  href: z.string().url(),
});

export const digitalProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  href: z.string().url(),
});
export type DigitalProduct = z.infer<typeof digitalProductSchema>;

export const servicesContentSchema = z.object({
  oneOnOneServices: z.array(oneOnOneServiceSchema),
  coachingPackage: namedOfferSchema,
  priorityDM: namedOfferSchema,
  digitalProducts: z.array(digitalProductSchema),
});
export type ServicesContent = z.infer<typeof servicesContentSchema>;

export async function getServices(): Promise<ServicesContent> {
  const data = await getContent<ServicesContent>("services");
  if (!data) throw new Error("services content not seeded");
  return data;
}
