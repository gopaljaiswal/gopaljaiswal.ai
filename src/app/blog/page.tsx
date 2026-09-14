import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Blog — ${profile.name}`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-primary">04 / Free</p>
      <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">Essays</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Long-form writing on engineering, system design, and career growth.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
