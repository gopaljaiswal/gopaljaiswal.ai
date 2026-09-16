import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const sections = [
  { label: "Profile", href: "/admin/profile", description: "Name, title, bio, education, certifications." },
  { label: "Services", href: "/admin/services", description: "1:1 sessions, coaching package, priority DM, digital products." },
  { label: "Testimonials", href: "/admin/testimonials", description: "Reviews and the rating/booking summary." },
  { label: "Stats", href: "/admin/stats", description: "The homepage stats row." },
  { label: "Vault", href: "/admin/vault", description: "System design vault Q&A and pricing." },
  { label: "Blog", href: "/admin/blog", description: "Essays — add, edit, delete." },
  { label: "Links & Logos", href: "/admin/links", description: "External links, mentee companies, homepage offerings." },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">Admin</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit the content shown on the public site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="card-interactive h-full border-border/70 py-5">
              <CardHeader>
                <h2 className="font-heading text-base tracking-tight">{s.label}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
