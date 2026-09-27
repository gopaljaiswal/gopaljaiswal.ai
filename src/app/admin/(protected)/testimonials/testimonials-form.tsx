"use client";

import { useActionState, useState } from "react";
import { ArrayEditor, Field, inputClass, textareaClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { TestimonialsContent, Testimonial } from "@/data/testimonials";
import { saveTestimonials } from "./actions";

export function TestimonialsForm({ initial }: { initial: TestimonialsContent }) {
  const [state, formAction] = useActionState(saveTestimonials, undefined);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initial.testimonials);
  const [ratingSummary, setRatingSummary] = useState(initial.ratingSummary);

  const payload: TestimonialsContent = { testimonials, ratingSummary };

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Rating summary</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Rating (e.g. 5.0 / 5)">
            <input
              className={inputClass}
              value={ratingSummary.rating}
              onChange={(e) => setRatingSummary({ ...ratingSummary, rating: e.target.value })}
            />
          </Field>
          <Field label="Rating count (e.g. 52 ratings)">
            <input
              className={inputClass}
              value={ratingSummary.ratingCount}
              onChange={(e) => setRatingSummary({ ...ratingSummary, ratingCount: e.target.value })}
            />
          </Field>
          <Field label="Bookings (e.g. 300+ sessions)">
            <input
              className={inputClass}
              value={ratingSummary.bookings}
              onChange={(e) => setRatingSummary({ ...ratingSummary, bookings: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Testimonials</h2>
        <ArrayEditor
          items={testimonials}
          onChange={setTestimonials}
          itemLabel="testimonial"
          newItem={() => ({
            id: crypto.randomUUID(),
            quote: "",
            name: "Anonymous",
            sessionTopic: "",
            source: "topmate" as const,
          })}
          renderItem={(item, _i, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Name">
                  <input className={inputClass} value={item.name} onChange={(e) => update({ name: e.target.value })} />
                </Field>
                <Field label="Session topic">
                  <input
                    className={inputClass}
                    value={item.sessionTopic}
                    onChange={(e) => update({ sessionTopic: e.target.value })}
                  />
                </Field>
                <Field label="Source">
                  <select
                    className={inputClass}
                    value={item.source}
                    onChange={(e) => update({ source: e.target.value as Testimonial["source"] })}
                  >
                    <option value="topmate">Topmate</option>
                    <option value="propeers">Propeers</option>
                  </select>
                </Field>
              </div>
              <Field label="Quote">
                <textarea className={textareaClass} value={item.quote} onChange={(e) => update({ quote: e.target.value })} />
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
