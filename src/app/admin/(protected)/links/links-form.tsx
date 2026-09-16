"use client";

import { useActionState, useState } from "react";
import { Field, inputClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { Links } from "@/data/links";
import { saveLinks } from "./actions";

export function LinksForm({ initial }: { initial: Links }) {
  const [state, formAction] = useActionState(saveLinks, undefined);
  const [links, setLinks] = useState<Links>(initial);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="payload" value={JSON.stringify(links)} />
      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(links) as (keyof Links)[]).map((key) => (
          <Field key={key} label={key}>
            <input
              className={inputClass}
              value={links[key]}
              onChange={(e) => setLinks({ ...links, [key]: e.target.value })}
            />
          </Field>
        ))}
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
