"use server";

import { redirect } from "next/navigation";
import { linksSchema } from "@/data/links";
import { logosContentSchema } from "@/data/logos";
import { offeringSchema } from "@/data/offerings";
import { z } from "zod";
import { setContent } from "@/lib/content";

function parseOrError(raw: string) {
  try {
    return { value: JSON.parse(raw) as unknown, error: undefined };
  } catch {
    return { value: undefined, error: "Malformed form data." };
  }
}

export async function saveLinks(_prevState: { error?: string } | undefined, formData: FormData) {
  const { value, error } = parseOrError(String(formData.get("payload") ?? "{}"));
  if (error) return { error };

  const result = linksSchema.safeParse(value);
  if (!result.success) return { error: result.error.issues[0]?.message ?? "Invalid data." };

  await setContent("links", result.data);
  redirect("/admin/links?saved=links");
}

export async function saveLogos(_prevState: { error?: string } | undefined, formData: FormData) {
  const { value, error } = parseOrError(String(formData.get("payload") ?? "{}"));
  if (error) return { error };

  const result = logosContentSchema.safeParse(value);
  if (!result.success) return { error: result.error.issues[0]?.message ?? "Invalid data." };

  await setContent("logos", result.data);
  redirect("/admin/links?saved=logos");
}

export async function saveOfferings(_prevState: { error?: string } | undefined, formData: FormData) {
  const { value, error } = parseOrError(String(formData.get("payload") ?? "[]"));
  if (error) return { error };

  const result = z.array(offeringSchema).safeParse(value);
  if (!result.success) return { error: result.error.issues[0]?.message ?? "Invalid data." };

  await setContent("offerings", result.data);
  redirect("/admin/links?saved=offerings");
}
