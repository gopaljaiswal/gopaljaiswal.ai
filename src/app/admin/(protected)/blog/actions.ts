"use server";

import { redirect } from "next/navigation";
import { blogPostSchema, type BlogPost } from "@/lib/blog";
import { getContent, setContent } from "@/lib/content";

async function getAllBlogPosts(): Promise<BlogPost[]> {
  const data = await getContent<BlogPost[]>("blogPosts");
  return data ?? [];
}

export async function saveBlogPost(
  originalSlug: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const raw = String(formData.get("payload") ?? "{}");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Malformed form data." };
  }

  const result = blogPostSchema.safeParse(parsed);
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid data." };
  }

  const posts = await getAllBlogPosts();
  const existingIndex = posts.findIndex((p) => p.slug === originalSlug);
  const duplicateSlug = posts.some((p, i) => p.slug === result.data.slug && i !== existingIndex);
  if (duplicateSlug) {
    return { error: `A post with slug "${result.data.slug}" already exists.` };
  }

  if (existingIndex >= 0) {
    posts[existingIndex] = result.data;
  } else {
    posts.push(result.data);
  }

  await setContent("blogPosts", posts);
  redirect(`/admin/blog/${result.data.slug}?saved=1`);
}

export async function deleteBlogPost(slug: string) {
  const posts = await getAllBlogPosts();
  await setContent(
    "blogPosts",
    posts.filter((p) => p.slug !== slug)
  );
  redirect("/admin/blog");
}
