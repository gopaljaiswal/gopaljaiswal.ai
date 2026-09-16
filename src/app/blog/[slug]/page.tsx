import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { getProfileContent } from "@/data/profile";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [post, { profile }] = await Promise.all([getPostBySlug(slug), getProfileContent()]);
  if (!post) return {};

  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs text-muted-foreground">
        {post.date} · {post.readingTime}
      </p>
      <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">{post.title}</h1>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
