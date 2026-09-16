"use client";

import { useMemo, useState } from "react";
import type { VaultQuestion } from "@/data/vault";
import { VaultQuestionCard } from "@/components/vault/vault-question-card";
import { DomainFilter } from "@/components/vault/domain-filter";

const ALL = "All domains";

export function VaultQuestionList({ questions }: { questions: VaultQuestion[] }) {
  const [domain, setDomain] = useState<string>(ALL);

  const domains = useMemo(
    () => [ALL, ...Array.from(new Set(questions.map((q) => q.domain)))],
    [questions]
  );

  const filtered = useMemo(
    () => (domain === ALL ? questions : questions.filter((q) => q.domain === domain)),
    [questions, domain]
  );

  return (
    <div>
      <DomainFilter domains={domains} active={domain} onChange={setDomain} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((q) => (
          <VaultQuestionCard key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
}
