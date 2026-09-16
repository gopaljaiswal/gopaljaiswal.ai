"use client";

import { useActionState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-4">
      <Card className="w-full border-border/70 py-6">
        <CardHeader>
          <h1 className="font-heading text-xl tracking-tight">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to continue.</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input
              type="password"
              name="password"
              autoFocus
              required
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
