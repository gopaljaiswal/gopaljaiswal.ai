"use server";

import { redirect } from "next/navigation";
import { servicesContentSchema } from "@/data/services";
import { setContent } from "@/lib/content";

export async function saveServices(_prevState: { error?: string } | undefined, formData: FormData) {
  const raw = String(formData.get("payload") ?? "{}");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Malformed form data." };
  }

  const result = servicesContentSchema.safeParse(parsed);
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid data." };
  }

  await setContent("services", result.data);
  redirect("/admin/services?saved=1");
}
