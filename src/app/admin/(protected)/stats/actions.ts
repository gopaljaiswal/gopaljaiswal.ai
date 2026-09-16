"use server";

import { redirect } from "next/navigation";
import { statsContentSchema } from "@/data/stats";
import { setContent } from "@/lib/content";

export async function saveStats(_prevState: { error?: string } | undefined, formData: FormData) {
  const raw = String(formData.get("payload") ?? "[]");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Malformed form data." };
  }

  const result = statsContentSchema.safeParse(parsed);
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid data." };
  }

  await setContent("stats", result.data);
  redirect("/admin/stats?saved=1");
}
