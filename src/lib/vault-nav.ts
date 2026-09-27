import type { VaultQuestion } from "@/data/vault";

export function groupByDomain(questions: VaultQuestion[]): [string, VaultQuestion[]][] {
  const byDomain = new Map<string, VaultQuestion[]>();
  for (const q of questions) {
    const list = byDomain.get(q.domain) ?? [];
    list.push(q);
    byDomain.set(q.domain, list);
  }
  return Array.from(byDomain.entries()).sort((a, b) => b[1].length - a[1].length);
}

export function flattenQuestions(questions: VaultQuestion[]): VaultQuestion[] {
  return groupByDomain(questions).flatMap(([, items]) => items);
}
