import { z } from "zod";
import { getContent } from "@/lib/content";

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  tagline: z.string().min(1),
  bio: z.string().min(1),
  initials: z.string().min(1).max(4),
});
export type Profile = z.infer<typeof profileSchema>;

export const educationSchema = z.object({
  school: z.string().min(1),
  years: z.string().min(1),
  detail: z.string().min(1),
});
export type Education = z.infer<typeof educationSchema>;

export const profileContentSchema = z.object({
  profile: profileSchema,
  education: educationSchema,
  certifications: z.array(z.string()),
});
export type ProfileContent = z.infer<typeof profileContentSchema>;

export async function getProfileContent(): Promise<ProfileContent> {
  const data = await getContent<ProfileContent>("profile");
  if (!data) throw new Error("profile content not seeded");
  return data;
}
