import Link from "next/link";
import { Download } from "lucide-react";
import type { DigitalProduct } from "@/data/services";

export function DigitalProducts({ products }: { products: DigitalProduct[] }) {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="mb-3 font-heading text-sm tracking-tight text-muted-foreground uppercase">
            {category}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.category === category)
              .map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card-interactive flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Download className="size-4 shrink-0 text-primary" />
                    {product.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium">
                    {product.price === 0 ? (
                      <span className="text-primary">Free</span>
                    ) : (
                      <span className="text-primary">₹{product.price}</span>
                    )}
                    {product.originalPrice !== undefined && product.originalPrice > product.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
