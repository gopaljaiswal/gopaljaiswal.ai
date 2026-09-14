"use client";

import { useMemo, useState } from "react";
import { vaultQuestions } from "@/data/vault";
import { VaultQuestionCard } from "@/components/vault/vault-question-card";
import { DomainFilter } from "@/components/vault/domain-filter";

const ALL = "All domains";

export function VaultQuestionList() {
  const [domain, setDomain] = useState<string>(ALL);

  const domains = useMemo(
    () => [ALL, ...Array.from(new Set(vaultQuestions.map((q) => q.domain)))],
    []
  );

  const filtered = useMemo(
    () => (domain === ALL ? vaultQuestions : vaultQuestions.filter((q) => q.domain === domain)),
    [domain]
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
