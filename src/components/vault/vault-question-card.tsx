import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Difficulty, VaultQuestion } from "@/data/vault";

const difficultyStyles: Record<Difficulty, string> = {
  Fundamental: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Advanced: "border-rose-500/30 bg-rose-500/10 text-rose-400",
};

export function VaultQuestionCard({ question, difficulty, domain, teaser, answer, locked, id }: VaultQuestion) {
  return (
    <Card className="card-interactive border-border/70 py-5">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{id}</p>
          <h3 className="mt-1 font-heading text-base font-medium tracking-tight">{question}</h3>
        </div>
        {locked ? (
          <Lock className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <Badge className="bg-gradient-brand shrink-0 border-0 text-white">Open free</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className={difficultyStyles[difficulty]} variant="outline">
            {difficulty}
          </Badge>
          <Badge variant="outline">{domain}</Badge>
        </div>

        {locked ? (
          <div className="relative">
            <p className="line-clamp-2 select-none text-sm text-muted-foreground/70 blur-[3px]">
              {answer ?? teaser}
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                Locked — get lifetime access
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{answer ?? teaser}</p>
        )}
      </CardContent>
    </Card>
  );
}
