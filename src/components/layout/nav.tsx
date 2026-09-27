"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Tech Interview Guide", href: "/guide", variant: "tint" as const },
  { label: "Services", href: "/#services", variant: "solid" as const },
  { label: "Testimonials", href: "/testimonials", variant: "plain" as const },
  { label: "Blogs", href: "/blog", variant: "plain" as const },
];

type NavProps = {
  profileName: string;
};

export function Nav({ profileName }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-gradient-brand font-heading text-lg font-semibold tracking-tight">
          {profileName}
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => {
            if (link.variant === "solid") {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-gradient-brand rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-[0_6px_20px_-8px_color-mix(in_oklch,var(--brand-from)_70%,transparent)] transition-transform hover:scale-105"
                >
                  {link.label}
                </Link>
              );
            }
            if (link.variant === "tint") {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Admin sign in" render={<Link href="/admin/login" />}>
            <LogIn className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-10 flex flex-col gap-6 px-4">
                {navLinks.map((link) =>
                  link.variant === "solid" ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="bg-gradient-brand w-fit rounded-full px-4 py-2 text-base font-semibold text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={link.variant === "tint" ? "text-base font-medium text-primary" : "text-base font-medium"}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground"
                >
                  Admin sign in
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
