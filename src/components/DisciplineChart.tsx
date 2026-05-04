import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { provaPaulista2026, provaPaulista2025, progressionMappings } from "@/data/examData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DisciplineData {
  disciplina: string;
  acertos2026: number;
  acertos2025: number | null;
}

function findTurma2025(turma2026: string) {
  const mappings = progressionMappings.filter((m) => m.turma2026 === turma2026);
  if (mappings.length === 0) return [];
  return mappings
    .map((m) => provaPaulista2025.find((r) => r.turma === m.turma2025))
    .filter(Boolean);
}

export function DisciplineChart({ selectedTurma }: { selectedTurma: string | null }) {
  const turma2026 = selectedTurma
    ? provaPaulista2026.find((r) => r.turma === selectedTurma)
    : null;

  let data: DisciplineData[];

  if (turma2026 && selectedTurma) {
    // Find corresponding 2025 turma(s)
    const turmas2025 = findTurma2025(selectedTurma);

    // Aggregate 2025 disciplines from mapped turmas
    const disc2025: Record<string, { sum: number; count: number }> = {};
    turmas2025.forEach((t) => {
      if (!t) return;
      Object.entries(t.disciplinas).forEach(([d, v]) => {
        if (v > 0) {
          if (!disc2025[d]) disc2025[d] = { sum: 0, count: 0 };
          disc2025[d].sum += v;
          disc2025[d].count += 1;
        }
      });
    });

    // Collect all discipline keys
    const allDiscs = new Set<string>();
    Object.keys(turma2026.disciplinas).forEach((d) => allDiscs.add(d));
    Object.keys(disc2025).forEach((d) => allDiscs.add(d));

    data = Array.from(allDiscs)
      .filter((d) => (turma2026.disciplinas[d] || 0) > 0 || disc2025[d])
      .map((d) => ({
        disciplina: d,
        acertos2026: +((turma2026.disciplinas[d] || 0) * 100).toFixed(1),
        acertos2025: disc2025[d]
          ? +((disc2025[d].sum / disc2025[d].count) * 100).toFixed(1)
          : null,
      }))
      .sort((a, b) => b.acertos2026 - a.acertos2026);
  } else {
    // School-wide averages
    const buildAvg = (records: typeof provaPaulista2026) => {
      const discMap: Record<string, { sum: number; count: number }> = {};
      records.forEach((r) => {
        Object.entries(r.disciplinas).forEach(([d, v]) => {
          if (v > 0) {
            if (!discMap[d]) discMap[d] = { sum: 0, count: 0 };
            discMap[d].sum += v;
            discMap[d].count += 1;
          }
        });
      });
      return discMap;
    };

    const avg2026 = buildAvg(provaPaulista2026);
    const avg2025 = buildAvg(provaPaulista2025);

    const allDiscs = new Set<string>();
    Object.keys(avg2026).forEach((d) => allDiscs.add(d));
    Object.keys(avg2025).forEach((d) => allDiscs.add(d));

    data = Array.from(allDiscs)
      .map((d) => ({
        disciplina: d,
        acertos2026: avg2026[d] ? +((avg2026[d].sum / avg2026[d].count) * 100).toFixed(1) : 0,
        acertos2025: avg2025[d] ? +((avg2025[d].sum / avg2025[d].count) * 100).toFixed(1) : null,
      }))
      .sort((a, b) => b.acertos2026 - a.acertos2026);
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Desempenho por Disciplina {selectedTurma ? `— ${selectedTurma}` : "— Média Geral"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">Prova Paulista 2025 vs 2026</p>
      </CardHeader>
      <CardContent>
        <div style={{ height: Math.max(400, data.length * 45) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <YAxis type="category" dataKey="disciplina" tick={{ fontSize: 12 }} width={70} />
              <Tooltip formatter={(v: any, name: any) => [`${v}%`, name === "acertos2025" ? "2025" : "2026"]} />
              <Legend
                formatter={(value: string) => (value === "acertos2025" ? "Prova Paulista 2025" : "Prova Paulista 2026")}
              />
              <Bar dataKey="acertos2025" fill="oklch(0.65 0.15 200)" radius={[0, 4, 4, 0]} name="acertos2025" />
              <Bar dataKey="acertos2026" fill="oklch(0.45 0.18 250)" radius={[0, 4, 4, 0]} name="acertos2026" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
