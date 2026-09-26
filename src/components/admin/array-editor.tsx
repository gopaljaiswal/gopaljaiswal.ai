"use client";

import type { ReactNode } from "react";
import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ArrayEditor<T>({
  items,
  onChange,
  newItem,
  renderItem,
  itemLabel = "item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => ReactNode;
  itemLabel?: string;
}) {
  function update(index: number, patch: Partial<T>) {
    const next = items.slice();
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = items.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <Card key={i} className="border-border/70 py-4">
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {itemLabel} {i + 1}
              </span>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, -1)} aria-label="Move up">
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, 1)} aria-label="Move down">
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(i)}
                  aria-label="Remove"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
            {renderItem(item, i, (patch) => update(i, patch))}
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={() => onChange([...items, newItem()])}>
        <Plus className="size-4" />
        Add {itemLabel}
      </Button>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
export const textareaClass = `${inputClass} min-h-20 resize-y`;
