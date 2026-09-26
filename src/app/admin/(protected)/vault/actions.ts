"use server";

import { redirect } from "next/navigation";
import { vaultContentSchema } from "@/data/vault";
import { setContent } from "@/lib/content";

export async function saveVault(_prevState: { error?: string } | undefined, formData: FormData) {
  const raw = String(formData.get("payload") ?? "{}");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Malformed form data." };
  }

  const result = vaultContentSchema.safeParse(parsed);
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid data." };
  }

  await setContent("vault", result.data);
  redirect("/admin/vault?saved=1");
}
