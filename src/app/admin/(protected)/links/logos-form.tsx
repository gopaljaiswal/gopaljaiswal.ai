"use client";

import { useActionState, useState } from "react";
import { ArrayEditor, Field, inputClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { LogosContent, Logo } from "@/data/logos";
import { saveLogos } from "./actions";

function LogoListEditor({
  items,
  onChange,
  itemLabel,
}: {
  items: Logo[];
  onChange: (items: Logo[]) => void;
  itemLabel: string;
}) {
  return (
    <ArrayEditor
      items={items}
      onChange={onChange}
      itemLabel={itemLabel}
      newItem={() => ({ name: "", initials: "", color: "#7C3AED" })}
      renderItem={(item, _i, update) => (
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Name">
            <input className={inputClass} value={item.name} onChange={(e) => update({ name: e.target.value })} />
          </Field>
          <Field label="Initials">
            <input className={inputClass} value={item.initials} onChange={(e) => update({ initials: e.target.value })} />
          </Field>
          <Field label="Color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="h-9 w-12 shrink-0 rounded border border-border bg-background"
                value={item.color}
                onChange={(e) => update({ color: e.target.value })}
              />
              <input className={inputClass} value={item.color} onChange={(e) => update({ color: e.target.value })} />
            </div>
          </Field>
        </div>
      )}
    />
  );
}

export function LogosForm({ initial }: { initial: LogosContent }) {
  const [state, formAction] = useActionState(saveLogos, undefined);
  const [logos, setLogos] = useState<Logo[]>(initial.logos);

  const payload: LogosContent = { logos };

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Mentees now at</h3>
        <LogoListEditor items={logos} onChange={setLogos} itemLabel="company" />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
