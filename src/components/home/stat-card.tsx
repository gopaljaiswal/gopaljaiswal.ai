import Link from "next/link";
import type { Stat } from "@/data/stats";

export function StatCard({ label, value, href }: Stat) {
  const content = (
    <div className="rounded-xl border border-border/70 bg-card px-5 py-4">
      <p className="font-heading text-xl font-medium tracking-tight sm:text-2xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
