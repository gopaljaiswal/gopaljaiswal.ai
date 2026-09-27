"use client";

import { useActionState, useState } from "react";
import { ArrayEditor, Field, inputClass, textareaClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { ServicesContent, OneOnOneService, DigitalProduct } from "@/data/services";
import { saveServices } from "./actions";

export function ServicesForm({ initial }: { initial: ServicesContent }) {
  const [state, formAction] = useActionState(saveServices, undefined);
  const [oneOnOneServices, setOneOnOneServices] = useState<OneOnOneService[]>(initial.oneOnOneServices);
  const [coachingPackage, setCoachingPackage] = useState(initial.coachingPackage);
  const [priorityDM, setPriorityDM] = useState(initial.priorityDM);
  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>(initial.digitalProducts);

  const payload: ServicesContent = { oneOnOneServices, coachingPackage, priorityDM, digitalProducts };

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">1:1 sessions</h2>
        <ArrayEditor
          items={oneOnOneServices}
          onChange={setOneOnOneServices}
          itemLabel="service"
          newItem={() => ({ name: "", description: "", durationMinutes: 30, price: 0, href: "" })}
          renderItem={(item, _i, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <input className={inputClass} value={item.name} onChange={(e) => update({ name: e.target.value })} />
                </Field>
                <Field label="Duration (minutes)">
                  <input
                    type="number"
                    className={inputClass}
                    value={item.durationMinutes}
                    onChange={(e) => update({ durationMinutes: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Price (₹)">
                  <input
                    type="number"
                    className={inputClass}
                    value={item.price}
                    onChange={(e) => update({ price: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Booking link">
                  <input className={inputClass} value={item.href} onChange={(e) => update({ href: e.target.value })} />
                </Field>
              </div>
              <Field label="One-line description">
                <textarea
                  className={textareaClass}
                  value={item.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </Field>
            </div>
          )}
        />
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Coaching package</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              value={coachingPackage.name}
              onChange={(e) => setCoachingPackage({ ...coachingPackage, name: e.target.value })}
            />
          </Field>
          <Field label="Price (₹)">
            <input
              type="number"
              className={inputClass}
              value={coachingPackage.price}
              onChange={(e) => setCoachingPackage({ ...coachingPackage, price: Number(e.target.value) })}
            />
          </Field>
          <Field label="Booking link">
            <input
              className={inputClass}
              value={coachingPackage.href}
              onChange={(e) => setCoachingPackage({ ...coachingPackage, href: e.target.value })}
            />
          </Field>
          <Field label="Description">
            <input
              className={inputClass}
              value={coachingPackage.description}
              onChange={(e) => setCoachingPackage({ ...coachingPackage, description: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Priority DM</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              value={priorityDM.name}
              onChange={(e) => setPriorityDM({ ...priorityDM, name: e.target.value })}
            />
          </Field>
          <Field label="Price (₹)">
            <input
              type="number"
              className={inputClass}
              value={priorityDM.price}
              onChange={(e) => setPriorityDM({ ...priorityDM, price: Number(e.target.value) })}
            />
          </Field>
          <Field label="Booking link">
            <input
              className={inputClass}
              value={priorityDM.href}
              onChange={(e) => setPriorityDM({ ...priorityDM, href: e.target.value })}
            />
          </Field>
          <Field label="Description">
            <input
              className={inputClass}
              value={priorityDM.description}
              onChange={(e) => setPriorityDM({ ...priorityDM, description: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Digital products</h2>
        <ArrayEditor
          items={digitalProducts}
          onChange={setDigitalProducts}
          itemLabel="product"
          newItem={() => ({ name: "", category: "", price: 0, originalPrice: undefined, href: "" })}
          renderItem={(item, _i, update) => (
            <div className="grid gap-3 sm:grid-cols-5">
              <Field label="Name">
                <input className={inputClass} value={item.name} onChange={(e) => update({ name: e.target.value })} />
              </Field>
              <Field label="Category">
                <input className={inputClass} value={item.category} onChange={(e) => update({ category: e.target.value })} />
              </Field>
              <Field label="Price (₹) — 0 = Free">
                <input
                  type="number"
                  className={inputClass}
                  value={item.price}
                  onChange={(e) => update({ price: Number(e.target.value) })}
                />
              </Field>
              <Field label="Original price (₹, optional — shown struck through)">
                <input
                  type="number"
                  className={inputClass}
                  value={item.originalPrice ?? ""}
                  onChange={(e) =>
                    update({ originalPrice: e.target.value === "" ? undefined : Number(e.target.value) })
                  }
                />
              </Field>
              <Field label="Link">
                <input className={inputClass} value={item.href} onChange={(e) => update({ href: e.target.value })} />
              </Field>
            </div>
          )}
        />
      </section>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
