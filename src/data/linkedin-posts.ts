import { z } from "zod";
import { getContent } from "@/lib/content";

export const linkedInPostSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  text: z.string().min(1),
  likes: z.number().int().nonnegative(),
  url: z.string().url(),
});
export type LinkedInPost = z.infer<typeof linkedInPostSchema>;

export async function getLinkedinPosts(): Promise<LinkedInPost[]> {
  const data = await getContent<LinkedInPost[]>("linkedinPosts");
  return data ?? [];
}
