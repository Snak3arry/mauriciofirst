import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { provaPaulista2025, provaPaulista2026, progressionMappings } from "@/data/examData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export function ProgressionChart() {
  const data = progressionMappings
    .filter((m, i, arr) => {
      // Deduplicate 2026 turmas (e.g. 2ª SERIE B has 2 sources)
      return arr.findIndex(a => a.turma2026 === m.turma2026) === i;
    })
    .map((m) => {
      const rec2025 = provaPaulista2025.find((r) => r.turma === m.turma2025);
      const rec2026 = provaPaulista2026.find((r) => r.turma === m.turma2026);

      // For 2ª SERIE B which has 2 source classes, average them
      const sources2025 = progressionMappings
        .filter(pm => pm.turma2026 === m.turma2026)
        .map(pm => provaPaulista2025.find(r => r.turma === pm.turma2025))
        .filter(Boolean);

      const avg2025 = sources2025.length > 0
        ? sources2025.reduce((s, r) => s + r!.acertos, 0) / sources2025.length
        : 0;

      return {
        turma: m.turma2026,
        "Paulista 2025": +(avg2025 * 100).toFixed(1),
        "Paulista 2026": rec2026 ? +(rec2026.acertos * 100).toFixed(1) : 0,
      };
    });

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Evolução: Prova Paulista 2025 → 2026</CardTitle>
        <p className="text-sm text-muted-foreground">Comparativo por grupo de progressão de turmas</p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="turma" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Legend />
              <Bar dataKey="Paulista 2025" fill="oklch(0.45 0.18 250)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Paulista 2026" fill="oklch(0.55 0.15 160)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
