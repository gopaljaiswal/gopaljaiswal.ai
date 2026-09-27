import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Difficulty, VaultQuestion } from "@/data/vault";

const difficultyStyles: Record<Difficulty, string> = {
  Fundamental: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Advanced: "border-rose-500/30 bg-rose-500/10 text-rose-400",
};

export function VaultQuestionCard({ question, difficulty, domain, teaser, answer, id }: VaultQuestion) {
  return (
    <Card className="card-interactive border-border/70 py-5">
      <CardHeader>
        <p className="text-xs text-muted-foreground">{id}</p>
        <h3 className="mt-1 font-heading text-base font-medium tracking-tight">{question}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className={difficultyStyles[difficulty]} variant="outline">
            {difficulty}
          </Badge>
          <Badge variant="outline">{domain}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{answer ?? teaser}</p>
      </CardContent>
    </Card>
  );
}
