import Link from "next/link";
import { ExternalLink, Link2 } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { getProfileContent } from "@/data/profile";
import { getLinks } from "@/data/links";

export async function Footer() {
  const [{ profile }, links] = await Promise.all([getProfileContent(), getLinks()]);

  const socials = [
    { label: "LinkedIn", href: links.linkedin, color: "#0A66C2", node: <Link2 className="size-3" /> },
    { label: "Topmate", href: links.topmate, color: undefined, node: <ExternalLink className="size-3" /> },
    { label: "X", href: links.twitter, color: undefined, node: <BrandIcon brand="x" className="size-3" /> },
    { label: "Substack", href: links.substack, color: "#FF6719", node: <BrandIcon brand="substack" className="size-3" /> },
  ];

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ label, href, color, node }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <span
                className="bg-gradient-brand flex size-6 items-center justify-center rounded-full text-white"
                style={color ? { backgroundImage: "none", backgroundColor: color } : undefined}
              >
                {node}
              </span>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
