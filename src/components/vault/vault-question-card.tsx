import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { VaultQuestion } from "@/data/vault";

export function VaultQuestionCard({ question, difficulty, domain, teaser, answer, locked, id }: VaultQuestion) {
  return (
    <Card className="border-border/70 py-5">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{id}</p>
          <h3 className="mt-1 font-heading text-base font-medium tracking-tight">{question}</h3>
        </div>
        {locked ? (
          <Lock className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <Badge className="shrink-0" variant="secondary">
            Open free
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{difficulty}</Badge>
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
