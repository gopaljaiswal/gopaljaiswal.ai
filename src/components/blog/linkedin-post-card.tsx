import Link from "next/link";
import { Link2, ThumbsUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LinkedInPost } from "@/data/linkedin-posts";

export function LinkedInPostCard({ date, text, likes, url }: LinkedInPost) {
  return (
    <Card className="card-interactive border-border/70 py-6">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <Badge variant="secondary" className="flex w-fit items-center gap-1.5">
          <Link2 className="size-3.5" />
          From LinkedIn
        </Badge>
        <span className="text-xs text-muted-foreground">{date}</span>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ThumbsUp className="size-3.5" />
            {likes} reactions
          </span>
          <Link
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View on LinkedIn
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
