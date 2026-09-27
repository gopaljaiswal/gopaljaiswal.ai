"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { VaultQuestion } from "@/data/vault";
import { groupByDomain } from "@/lib/vault-nav";

export function GuideSidebar({ questions }: { questions: VaultQuestion[] }) {
  const pathname = usePathname();
  const domains = groupByDomain(questions);

  return (
    <nav className="space-y-6 text-sm">
      <Link
        href="/guide"
        className={
          pathname === "/guide"
            ? "block font-heading text-base font-semibold text-primary"
            : "block font-heading text-base font-semibold transition-colors hover:text-primary"
        }
      >
        Overview
      </Link>

      {domains.map(([domain, items]) => (
        <div key={domain}>
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{domain}</p>
          <ul className="space-y-1 border-l border-border/70 pl-3">
            {items.map((q) => {
              const active = pathname === `/guide/${q.id}`;
              return (
                <li key={q.id}>
                  <Link
                    href={`/guide/${q.id}`}
                    className={
                      active
                        ? "block rounded-md bg-primary/10 px-2 py-1.5 font-medium text-primary"
                        : "block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                    }
                  >
                    {q.question}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
