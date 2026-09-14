import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Sign in — ${profile.name}`,
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="font-heading text-2xl tracking-tight">Sign in — coming soon</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Account sign-in for the vault isn&apos;t live yet. TODO: wire up real auth here (see the
        upgrade path in the project plan) before enabling this.
      </p>
      <Button className="mt-6" render={<Link href="/vault" />}>
        Back to the vault
      </Button>
    </div>
  );
}
