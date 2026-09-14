import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PostSummary } from "@/lib/blog";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="card-interactive h-full border-border/70 py-6">
        <CardHeader>
          <p className="text-xs text-muted-foreground">
            {post.date} · {post.readingTime}
          </p>
          <h3 className="mt-1 font-heading text-lg tracking-tight">{post.title}</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
