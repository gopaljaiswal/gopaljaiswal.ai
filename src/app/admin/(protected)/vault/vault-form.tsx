"use client";

import { useActionState, useState } from "react";
import { ArrayEditor, Field, inputClass, textareaClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { VaultContent, VaultQuestion, Difficulty } from "@/data/vault";
import { saveVault } from "./actions";

const difficulties: Difficulty[] = ["Fundamental", "Intermediate", "Advanced"];

export function VaultForm({ initial }: { initial: VaultContent }) {
  const [state, formAction] = useActionState(saveVault, undefined);
  const [vaultQuestions, setVaultQuestions] = useState<VaultQuestion[]>(initial.vaultQuestions);
  const [vaultPricing, setVaultPricing] = useState(initial.vaultPricing);

  const payload: VaultContent = { vaultQuestions, vaultPricing };

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Pricing</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Price">
            <input
              className={inputClass}
              value={vaultPricing.price}
              onChange={(e) => setVaultPricing({ ...vaultPricing, price: e.target.value })}
            />
          </Field>
          <Field label="List price">
            <input
              className={inputClass}
              value={vaultPricing.listPrice}
              onChange={(e) => setVaultPricing({ ...vaultPricing, listPrice: e.target.value })}
            />
          </Field>
          <Field label="Discount label">
            <input
              className={inputClass}
              value={vaultPricing.discountLabel}
              onChange={(e) => setVaultPricing({ ...vaultPricing, discountLabel: e.target.value })}
            />
          </Field>
          <Field label="Access label">
            <input
              className={inputClass}
              value={vaultPricing.accessLabel}
              onChange={(e) => setVaultPricing({ ...vaultPricing, accessLabel: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Questions</h2>
        <ArrayEditor
          items={vaultQuestions}
          onChange={setVaultQuestions}
          itemLabel="question"
          newItem={(): VaultQuestion => ({
            id: `P${Math.floor(Math.random() * 90 + 10)}`,
            domain: "",
            difficulty: "Fundamental",
            question: "",
            teaser: "",
            answer: "",
          })}
          renderItem={(item, _i, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="ID">
                  <input className={inputClass} value={item.id} onChange={(e) => update({ id: e.target.value })} />
                </Field>
                <Field label="Domain">
                  <input className={inputClass} value={item.domain} onChange={(e) => update({ domain: e.target.value })} />
                </Field>
                <Field label="Difficulty">
                  <select
                    className={inputClass}
                    value={item.difficulty}
                    onChange={(e) => update({ difficulty: e.target.value as Difficulty })}
                  >
                    {difficulties.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Question">
                <input className={inputClass} value={item.question} onChange={(e) => update({ question: e.target.value })} />
              </Field>
              <Field label="Teaser">
                <textarea className={textareaClass} value={item.teaser} onChange={(e) => update({ teaser: e.target.value })} />
              </Field>
              <Field label="Full answer (optional)">
                <textarea
                  className={textareaClass}
                  value={item.answer ?? ""}
                  onChange={(e) => update({ answer: e.target.value })}
                />
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
