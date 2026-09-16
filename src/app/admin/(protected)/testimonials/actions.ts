"use server";

import { redirect } from "next/navigation";
import { testimonialsContentSchema } from "@/data/testimonials";
import { setContent } from "@/lib/content";

export async function saveTestimonials(_prevState: { error?: string } | undefined, formData: FormData) {
  const raw = String(formData.get("payload") ?? "{}");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Malformed form data." };
  }

  const result = testimonialsContentSchema.safeParse(parsed);
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid data." };
  }

  await setContent("testimonials", result.data);
  redirect("/admin/testimonials?saved=1");
}
