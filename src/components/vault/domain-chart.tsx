import { vaultQuestions } from "@/data/vault";

export function DomainChart() {
  const counts = new Map<string, number>();
  for (const q of vaultQuestions) {
    counts.set(q.domain, (counts.get(q.domain) ?? 0) + 1);
  }
  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, n]) => n));

  return (
    <div className="space-y-2.5">
      {entries.map(([domain, count]) => (
        <div key={domain} className="flex items-center gap-3">
          <span className="w-56 shrink-0 truncate text-xs text-muted-foreground">{domain}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="w-4 shrink-0 text-right text-xs text-muted-foreground">{count}</span>
        </div>
      ))}
    </div>
  );
}
