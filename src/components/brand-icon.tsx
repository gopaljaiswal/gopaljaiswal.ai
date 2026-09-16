import { siX, siSubstack } from "simple-icons";

const icons = { x: siX, substack: siSubstack };

export function BrandIcon({ brand, className }: { brand: keyof typeof icons; className?: string }) {
  const icon = icons[brand];
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}
