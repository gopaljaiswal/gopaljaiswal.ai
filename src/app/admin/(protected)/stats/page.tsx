import { getStats } from "@/data/stats";
import { StatsForm } from "./stats-form";

export default async function AdminStatsPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">Stats</h1>
      <p className="mt-1 text-sm text-muted-foreground">The stats row shown on the homepage.</p>
      <div className="mt-6">
        <StatsForm initial={stats} />
      </div>
    </div>
  );
}
