import { getStats } from "@/data/stats";
import { StatCard } from "@/components/home/stat-card";

export async function StatsRow() {
  const stats = await getStats();

  return (
    <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
