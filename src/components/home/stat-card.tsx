import Link from "next/link";
import { Star, Users, CalendarCheck, Building2, GraduationCap, Trophy } from "lucide-react";
import type { Stat } from "@/data/stats";

const icons = { Star, Users, CalendarCheck, Building2, GraduationCap, Trophy };

export function StatCard({ icon, label, value, href }: Stat) {
  const Icon = icons[icon];

  const content = (
    <div className="card-interactive group flex flex-col gap-2 rounded-xl border border-border/70 bg-card px-5 py-4">
      <span className="text-primary">
        <Icon className="size-4" />
      </span>
      <p className="font-heading text-xl font-medium tracking-tight sm:text-2xl">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
