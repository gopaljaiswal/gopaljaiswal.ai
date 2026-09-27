import { z } from "zod";
import { getContent } from "@/lib/content";

export const profileSchema = z.object({
  name: z.string().min(1),
  // Punchy, benefit-led H1. Kept separate from `title` so the hero headline
  // and the SEO <title>/credibility line can diverge on purpose.
  headline: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  tagline: z.string().min(1),
  bio: z.string().min(1),
  initials: z.string().min(1).max(4),
  tags: z.array(z.string().min(1)).default([]),
});
export type Profile = z.infer<typeof profileSchema>;

export const educationSchema = z.object({
  school: z.string().min(1),
  years: z.string().min(1),
  detail: z.string().min(1),
});
export type Education = z.infer<typeof educationSchema>;

export const careerStepSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  initials: z.string().min(1).max(4),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});
export type CareerStep = z.infer<typeof careerStepSchema>;

export const profileContentSchema = z.object({
  profile: profileSchema,
  education: educationSchema,
  certifications: z.array(z.string()),
  careerJourney: z.array(careerStepSchema).default([]),
});
export type ProfileContent = z.infer<typeof profileContentSchema>;

export async function getProfileContent(): Promise<ProfileContent> {
  const data = await getContent<ProfileContent>("profile");
  if (!data) throw new Error("profile content not seeded");
  return data;
}
