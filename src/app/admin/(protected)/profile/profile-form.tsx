"use client";

import { useActionState, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import type { ProfileContent } from "@/data/profile";
import { saveProfile } from "./actions";

export function ProfileForm({ initial }: { initial: ProfileContent }) {
  const [state, formAction] = useActionState(saveProfile, undefined);
  const [profile, setProfile] = useState(initial.profile);
  const [education, setEducation] = useState(initial.education);
  const [certifications, setCertifications] = useState<string[]>(initial.certifications);

  const payload: ProfileContent = { profile, education, certifications };

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Profile</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input className={inputClass} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </Field>
          <Field label="Title">
            <input className={inputClass} value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              value={profile.location ?? ""}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
          </Field>
          <Field label="Initials (avatar fallback)">
            <input className={inputClass} value={profile.initials} onChange={(e) => setProfile({ ...profile, initials: e.target.value })} />
          </Field>
          <Field label="Tagline">
            <input className={inputClass} value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} />
          </Field>
        </div>
        <div className="mt-3">
          <Field label="Bio">
            <textarea className={textareaClass} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Education</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="School">
            <input className={inputClass} value={education.school} onChange={(e) => setEducation({ ...education, school: e.target.value })} />
          </Field>
          <Field label="Years">
            <input className={inputClass} value={education.years} onChange={(e) => setEducation({ ...education, years: e.target.value })} />
          </Field>
          <Field label="Detail">
            <input className={inputClass} value={education.detail} onChange={(e) => setEducation({ ...education, detail: e.target.value })} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">Certifications</h2>
        <div className="space-y-2">
          {certifications.map((cert, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={inputClass}
                value={cert}
                onChange={(e) => {
                  const next = certifications.slice();
                  next[i] = e.target.value;
                  setCertifications(next);
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setCertifications(certifications.filter((_, idx) => idx !== i))}
                aria-label="Remove"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setCertifications([...certifications, ""])}>
            <Plus className="size-4" />
            Add certification
          </Button>
        </div>
      </section>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SaveButton />
    </form>
  );
}
