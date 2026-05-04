import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { provaPaulista2026 } from "@/data/examData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function DisciplineChart({ selectedTurma }: { selectedTurma: string | null }) {
  const turma = selectedTurma
    ? provaPaulista2026.find((r) => r.turma === selectedTurma)
    : null;

  // If a specific turma is selected, show its disciplines
  // Otherwise show school-wide average per discipline
  let data: { disciplina: string; acertos: number }[];

  if (turma) {
    data = Object.entries(turma.disciplinas)
      .filter(([, v]) => v > 0)
      .map(([d, v]) => ({ disciplina: d, acertos: +(v * 100).toFixed(1) }))
      .sort((a, b) => b.acertos - a.acertos);
  } else {
    // Aggregate all disciplines across all classes
    const discMap: Record<string, { sum: number; count: number }> = {};
    provaPaulista2026.forEach((r) => {
      Object.entries(r.disciplinas).forEach(([d, v]) => {
        if (v > 0) {
          if (!discMap[d]) discMap[d] = { sum: 0, count: 0 };
          discMap[d].sum += v;
          discMap[d].count += 1;
        }
      });
    });
    data = Object.entries(discMap)
      .map(([d, { sum, count }]) => ({ disciplina: d, acertos: +((sum / count) * 100).toFixed(1) }))
      .sort((a, b) => b.acertos - a.acertos);
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Desempenho por Disciplina {selectedTurma ? `— ${selectedTurma}` : "— Média Geral"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">Prova Paulista 2026</p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <YAxis type="category" dataKey="disciplina" tick={{ fontSize: 12 }} width={55} />
              <Tooltip formatter={(v: any) => `${v}%`} />
              <Bar dataKey="acertos" fill="oklch(0.45 0.18 250)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
