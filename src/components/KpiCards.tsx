import { Card, CardContent } from "@/components/ui/card";
import { provaPaulista2026, provaDiagnostica2026 } from "@/data/examData";
import { TrendingUp, TrendingDown, Users, Target } from "lucide-react";

export function KpiCards() {
  const totalAlunos2026 = provaPaulista2026.reduce((s, r) => s + r.totalAlunos, 0);
  const mediaAcertos2026 =
    provaPaulista2026.reduce((s, r) => s + r.acertos * r.totalAlunos, 0) / totalAlunos2026;
  const mediaParticipacao2026 =
    provaPaulista2026.reduce((s, r) => s + r.participacao * r.totalAlunos, 0) / totalAlunos2026;
  const mediaDiag =
    provaDiagnostica2026.reduce((s, r) => s + r.notaMedia * r.avaliados, 0) /
    provaDiagnostica2026.reduce((s, r) => s + r.avaliados, 0);

  const diff = mediaAcertos2026 - mediaDiag;

  const kpis = [
    {
      title: "Total de Alunos (2026)",
      value: totalAlunos2026.toString(),
      icon: Users,
      accent: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Média de Acertos — Paulista 2026",
      value: `${(mediaAcertos2026 * 100).toFixed(1)}%`,
      icon: Target,
      accent: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Taxa de Participação — 2026",
      value: `${(mediaParticipacao2026 * 100).toFixed(1)}%`,
      icon: Users,
      accent: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "Evolução Diagnóstica → Paulista",
      value: `${diff > 0 ? "+" : ""}${(diff * 100).toFixed(1)} p.p.`,
      icon: diff > 0 ? TrendingUp : TrendingDown,
      accent: diff > 0 ? "text-accent" : "text-destructive",
      bg: diff > 0 ? "bg-accent/10" : "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${kpi.bg}`}>
              <kpi.icon className={`h-6 w-6 ${kpi.accent}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground truncate">{kpi.title}</p>
              <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
