import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { PostForm } from "./post-form";

type Params = { params: Promise<{ slug: string }> };

export default async function AdminBlogEditPage({ params }: Params) {
  const { slug } = await params;
  const isNew = slug === "new";

  const post = isNew
    ? { slug: "", title: "", date: new Date().toISOString().slice(0, 10), excerpt: "", tags: [], content: "" }
    : await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">{isNew ? "New post" : post.title}</h1>
      <div className="mt-6">
        <PostForm initial={post} isNew={isNew} />
      </div>
    </div>
  );
}
