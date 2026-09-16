"use server";

import { redirect } from "next/navigation";
import { profileContentSchema } from "@/data/profile";
import { setContent } from "@/lib/content";

export async function saveProfile(_prevState: { error?: string } | undefined, formData: FormData) {
  const raw = String(formData.get("payload") ?? "{}");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Malformed form data." };
  }

  const result = profileContentSchema.safeParse(parsed);
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid data." };
  }

  await setContent("profile", result.data);
  redirect("/admin/profile?saved=1");
}
