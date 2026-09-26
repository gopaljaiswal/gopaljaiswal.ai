import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { logout } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";

const sections = [
  { label: "Dashboard", href: "/admin" },
  { label: "Profile", href: "/admin/profile" },
  { label: "Services", href: "/admin/services" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Stats", href: "/admin/stats" },
  { label: "Vault", href: "/admin/vault" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Links & Logos", href: "/admin/links" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row">
      <aside className="shrink-0 lg:w-48">
        <p className="mb-3 font-heading text-sm font-semibold text-muted-foreground">Admin</p>
        <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-4">
          <Button type="submit" variant="outline" size="sm" className="w-full">
            Log out
          </Button>
        </form>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
