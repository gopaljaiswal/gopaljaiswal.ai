import { z } from "zod";
import readingTime from "reading-time";
import { getContent } from "@/lib/content";

export const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  excerpt: z.string().min(1),
  tags: z.array(z.string()),
  content: z.string().min(1),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

export type PostSummary = Omit<BlogPost, "content"> & { readingTime: string };

async function getAllBlogPosts(): Promise<BlogPost[]> {
  const data = await getContent<BlogPost[]>("blogPosts");
  return data ?? [];
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await getAllBlogPosts();
  return posts
    .map(({ content, ...rest }) => ({ ...rest, readingTime: readingTime(content).text }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, readingTime: readingTime(post.content).text };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return posts.map((p) => p.slug);
}
