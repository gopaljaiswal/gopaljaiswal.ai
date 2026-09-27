import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyCtaBar({ label, href }: { label: string; href: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 p-3 backdrop-blur sm:hidden">
      <Button
        size="lg"
        className="bg-gradient-brand w-full border-0 text-white hover:opacity-90"
        render={<Link href={href} target="_blank" rel="noreferrer" />}
      >
        {label}
      </Button>
    </div>
  );
}
