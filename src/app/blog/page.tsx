import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Blog — ${profile.name}`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/3 -z-10 h-[320px] w-[320px] rounded-full bg-[color-mix(in_oklch,var(--brand-to)_35%,transparent)] blur-[120px]"
      />

      <p className="text-sm font-medium text-primary">04 / Free</p>
      <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">
        <span className="text-gradient-brand">Essays</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Long-form writing on engineering, system design, and career growth.
      </p>

      <Reveal className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
