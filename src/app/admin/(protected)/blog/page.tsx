import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";

export default async function AdminBlogListPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl tracking-tight">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">Essays shown on /blog.</p>
        </div>
        <Button render={<Link href="/admin/blog/new" />}>
          <Plus className="size-4" />
          New post
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/admin/blog/${post.slug}`}>
            <Card className="card-interactive border-border/70 py-4">
              <CardHeader>
                <h2 className="font-heading text-base tracking-tight">{post.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {post.date} · {post.slug}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-sm text-muted-foreground">No posts yet.</p>}
      </div>
    </div>
  );
}
