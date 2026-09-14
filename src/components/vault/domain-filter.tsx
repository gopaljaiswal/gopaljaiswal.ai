"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DomainFilterProps = {
  domains: string[];
  active: string;
  onChange: (domain: string) => void;
};

export function DomainFilter({ domains, active, onChange }: DomainFilterProps) {
  return (
    <Tabs value={active} onValueChange={(v) => onChange(String(v))}>
      <TabsList variant="line" className="h-auto flex-wrap gap-1">
        {domains.map((domain) => (
          <TabsTrigger key={domain} value={domain} className="px-2.5 py-1.5 text-xs sm:text-sm">
            {domain}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
