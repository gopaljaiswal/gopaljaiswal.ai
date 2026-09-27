import Link from "next/link";
import { ExternalLink, Link2, Users } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import type { Links } from "@/data/links";

export function IntegrationsRow({ links }: { links: Links }) {
  const items = [
    { label: "LinkedIn", href: links.linkedin, color: "#0A66C2", node: <Link2 className="size-4" /> },
    { label: "Topmate", href: links.topmate, color: undefined, node: <ExternalLink className="size-4" /> },
    { label: "Instagram", href: links.instagram, color: "#FF0069", node: <BrandIcon brand="instagram" className="size-4" /> },
    { label: "Propeers", href: links.propeers, color: undefined, node: <Users className="size-4" /> },
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {items.map(({ label, href, color, node }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="card-interactive flex items-center gap-2 rounded-full border border-border/70 bg-card py-1.5 pr-4 pl-1.5 text-sm font-medium transition-colors hover:border-primary/40"
        >
          <span
            className="bg-gradient-brand flex size-7 items-center justify-center rounded-full text-white"
            style={color ? { backgroundImage: "none", backgroundColor: color } : undefined}
          >
            {node}
          </span>
          {label}
        </Link>
      ))}
    </div>
  );
}
