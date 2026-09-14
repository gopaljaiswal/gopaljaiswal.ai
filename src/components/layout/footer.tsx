import Link from "next/link";
import { Link2, ExternalLink, MessageCircle, Rss } from "lucide-react";
import { profile } from "@/data/profile";
import { links } from "@/data/links";

const socials = [
  { label: "LinkedIn", href: links.linkedin, icon: Link2 },
  { label: "Topmate", href: links.topmate, icon: ExternalLink },
  { label: "Twitter", href: links.twitter, icon: MessageCircle },
  { label: "Substack", href: links.substack, icon: Rss },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
