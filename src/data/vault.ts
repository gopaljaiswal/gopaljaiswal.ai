import { z } from "zod";
import { getContent } from "@/lib/content";

export const difficultySchema = z.enum(["Fundamental", "Intermediate", "Advanced"]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const vaultQuestionSchema = z.object({
  id: z.string().min(1),
  domain: z.string().min(1),
  difficulty: difficultySchema,
  question: z.string().min(1),
  teaser: z.string().min(1),
  answer: z.string().optional(),
});
export type VaultQuestion = z.infer<typeof vaultQuestionSchema>;

export const vaultPricingSchema = z.object({
  price: z.string().min(1),
  listPrice: z.string().min(1),
  discountLabel: z.string().min(1),
  accessLabel: z.string().min(1),
});
export type VaultPricing = z.infer<typeof vaultPricingSchema>;

export const vaultContentSchema = z.object({
  vaultQuestions: z.array(vaultQuestionSchema),
  vaultPricing: vaultPricingSchema,
});
export type VaultContent = z.infer<typeof vaultContentSchema>;

export async function getVaultContent(): Promise<VaultContent> {
  const data = await getContent<VaultContent>("vault");
  if (!data) throw new Error("vault content not seeded");
  return data;
}
