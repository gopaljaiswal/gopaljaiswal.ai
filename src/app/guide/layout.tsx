import { getVaultContent } from "@/data/vault";
import { GuideSidebar } from "@/components/guide/guide-sidebar";

export default async function GuideLayout({ children }: { children: React.ReactNode }) {
  const { vaultQuestions } = await getVaultContent();

  return (
    <div className="relative">
      <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/3 -z-10 h-[340px] w-[340px] rounded-full bg-[color-mix(in_oklch,var(--brand-from)_35%,transparent)] blur-[120px]"
      />

      <div className="mx-auto flex max-w-6xl gap-10 px-4 py-16 sm:px-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <GuideSidebar questions={vaultQuestions} />
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
