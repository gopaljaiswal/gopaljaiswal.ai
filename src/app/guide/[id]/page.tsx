import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProfileContent } from "@/data/profile";
import { getVaultContent, type Difficulty } from "@/data/vault";
import { flattenQuestions } from "@/lib/vault-nav";

const difficultyStyles: Record<Difficulty, string> = {
  Fundamental: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Advanced: "border-rose-500/30 bg-rose-500/10 text-rose-400",
};

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { vaultQuestions } = await getVaultContent();
  return vaultQuestions.map((q) => ({ id: q.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const [{ vaultQuestions }, { profile }] = await Promise.all([getVaultContent(), getProfileContent()]);
  const question = vaultQuestions.find((q) => q.id === id);
  if (!question) return {};
  return { title: `${question.question} — ${profile.name}` };
}

export default async function GuideQuestionPage({ params }: Params) {
  const { id } = await params;
  const { vaultQuestions } = await getVaultContent();
  const question = vaultQuestions.find((q) => q.id === id);
  if (!question) notFound();

  const ordered = flattenQuestions(vaultQuestions);
  const index = ordered.findIndex((q) => q.id === id);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next = index < ordered.length - 1 ? ordered[index + 1] : null;

  return (
    <article>
      <p className="text-xs text-muted-foreground">{question.domain}</p>
      <h1 className="mt-2 font-heading text-2xl tracking-tight sm:text-3xl">{question.question}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge className={difficultyStyles[question.difficulty]} variant="outline">
          {question.difficulty}
        </Badge>
        <Badge variant="outline">{question.id}</Badge>
      </div>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-heading">
        <p className="leading-relaxed text-foreground/90">{question.answer ?? question.teaser}</p>
      </div>

      <div className="mt-12 grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/guide/${prev.id}`}
            className="card-interactive flex flex-col rounded-xl border border-border/70 bg-card px-4 py-3"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" />
              Previous
            </span>
            <span className="mt-1 text-sm font-medium">{prev.question}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/guide/${next.id}`}
            className="card-interactive flex flex-col rounded-xl border border-border/70 bg-card px-4 py-3 sm:items-end sm:text-right"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Next
              <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 text-sm font-medium">{next.question}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
