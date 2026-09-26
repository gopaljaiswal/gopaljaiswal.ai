"use client";

import { useActionState, useState } from "react";
import { ArrayEditor, Field, inputClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { Stat, StatIcon } from "@/data/stats";
import { saveStats } from "./actions";

const icons: StatIcon[] = ["Star", "Quote", "CalendarCheck", "Building2", "GraduationCap", "Trophy"];

export function StatsForm({ initial }: { initial: Stat[] }) {
  const [state, formAction] = useActionState(saveStats, undefined);
  const [stats, setStats] = useState<Stat[]>(initial);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="payload" value={JSON.stringify(stats)} />

      <ArrayEditor
        items={stats}
        onChange={setStats}
        itemLabel="stat"
        newItem={(): Stat => ({ icon: "Star", label: "", value: "" })}
        renderItem={(item, _i, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Icon">
              <select
                className={inputClass}
                value={item.icon}
                onChange={(e) => update({ icon: e.target.value as StatIcon })}
              >
                {icons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Value">
              <input className={inputClass} value={item.value} onChange={(e) => update({ value: e.target.value })} />
            </Field>
            <Field label="Label">
              <input className={inputClass} value={item.label} onChange={(e) => update({ label: e.target.value })} />
            </Field>
            <Field label="Link (optional)">
              <input
                className={inputClass}
                value={item.href ?? ""}
                onChange={(e) => update({ href: e.target.value || undefined })}
              />
            </Field>
          </div>
        )}
      />

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
