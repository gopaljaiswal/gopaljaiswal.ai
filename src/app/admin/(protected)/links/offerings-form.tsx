"use client";

import { useActionState, useState } from "react";
import { ArrayEditor, Field, inputClass, textareaClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { Offering, OfferingIcon } from "@/data/offerings";
import { saveOfferings } from "./actions";

const icons: OfferingIcon[] = ["Library", "Mic", "Compass", "PenLine"];

export function OfferingsForm({ initial }: { initial: Offering[] }) {
  const [state, formAction] = useActionState(saveOfferings, undefined);
  const [offerings, setOfferings] = useState<Offering[]>(initial);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="payload" value={JSON.stringify(offerings)} />

      <ArrayEditor
        items={offerings}
        onChange={setOfferings}
        itemLabel="offering"
        newItem={(): Offering => ({
          number: String(offerings.length + 1).padStart(2, "0"),
          icon: "Library",
          title: "",
          description: "",
          meta: [],
          ctaLabel: "",
          ctaHref: "",
        })}
        renderItem={(item, _i, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-4">
              <Field label="Number">
                <input className={inputClass} value={item.number} onChange={(e) => update({ number: e.target.value })} />
              </Field>
              <Field label="Icon">
                <select
                  className={inputClass}
                  value={item.icon}
                  onChange={(e) => update({ icon: e.target.value as OfferingIcon })}
                >
                  {icons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Title">
                <input className={inputClass} value={item.title} onChange={(e) => update({ title: e.target.value })} />
              </Field>
              <Field label="Meta tags (comma-separated)">
                <input
                  className={inputClass}
                  value={item.meta.join(", ")}
                  onChange={(e) => update({ meta: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
            </div>
            <Field label="Description">
              <textarea
                className={textareaClass}
                value={item.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="CTA label">
                <input className={inputClass} value={item.ctaLabel} onChange={(e) => update({ ctaLabel: e.target.value })} />
              </Field>
              <Field label="CTA link">
                <input className={inputClass} value={item.ctaHref} onChange={(e) => update({ ctaHref: e.target.value })} />
              </Field>
            </div>
          </div>
        )}
      />

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
