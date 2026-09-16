"use client";

import { useActionState, useState } from "react";
import { Field, inputClass, textareaClass } from "@/components/admin/array-editor";
import { SaveButton } from "@/components/admin/save-button";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog";
import { saveBlogPost, deleteBlogPost } from "../actions";

export function PostForm({ initial, isNew }: { initial: BlogPost; isNew: boolean }) {
  const boundSave = saveBlogPost.bind(null, initial.slug);
  const [state, formAction] = useActionState(boundSave, undefined);
  const [post, setPost] = useState<BlogPost>(initial);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="payload" value={JSON.stringify(post)} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Slug (URL)">
            <input className={inputClass} value={post.slug} onChange={(e) => setPost({ ...post, slug: e.target.value })} />
          </Field>
          <Field label="Date (YYYY-MM-DD)">
            <input className={inputClass} value={post.date} onChange={(e) => setPost({ ...post, date: e.target.value })} />
          </Field>
        </div>
        <Field label="Title">
          <input className={inputClass} value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
        </Field>
        <Field label="Excerpt">
          <input className={inputClass} value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} />
        </Field>
        <Field label="Tags (comma-separated)">
          <input
            className={inputClass}
            value={post.tags.join(", ")}
            onChange={(e) => setPost({ ...post, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          />
        </Field>
        <Field label="Content (Markdown)">
          <textarea
            className={`${textareaClass} min-h-80 font-mono text-xs`}
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </Field>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
        <SaveButton label={isNew ? "Create post" : "Save"} />
      </form>

      {!isNew && (
        <form action={deleteBlogPost.bind(null, initial.slug)}>
          <Button type="submit" variant="outline" className="text-destructive hover:text-destructive">
            Delete post
          </Button>
        </form>
      )}
    </div>
  );
}
