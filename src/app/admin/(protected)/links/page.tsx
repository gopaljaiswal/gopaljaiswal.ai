import { getLinks } from "@/data/links";
import { getLogosContent } from "@/data/logos";
import { getOfferings } from "@/data/offerings";
import { LinksForm } from "./links-form";
import { LogosForm } from "./logos-form";
import { OfferingsForm } from "./offerings-form";

export default async function AdminLinksPage() {
  const [links, logos, offerings] = await Promise.all([getLinks(), getLogosContent(), getOfferings()]);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-heading text-2xl tracking-tight">Links & Logos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          External profile links, mentee companies, and the homepage offering cards.
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-heading text-lg tracking-tight">External links</h2>
        <LinksForm initial={links} />
      </section>

      <section className="border-t border-border/60 pt-10">
        <h2 className="mb-3 font-heading text-lg tracking-tight">Mentee companies</h2>
        <LogosForm initial={logos} />
      </section>

      <section className="border-t border-border/60 pt-10">
        <h2 className="mb-3 font-heading text-lg tracking-tight">Homepage offerings</h2>
        <OfferingsForm initial={offerings} />
      </section>
    </div>
  );
}
