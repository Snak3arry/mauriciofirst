import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { provaPaulista2026, provaDiagnostica2026 } from "@/data/examData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Normalize turma names for matching (handles º/ª differences)
function normalizeTurma(t: string): string {
  return t.trim().replace(/[ºª]/g, "").toLowerCase();
}

export function DiagnosticChart({ selectedTurma }: { selectedTurma: string | null }) {
  const turmas = selectedTurma
    ? provaPaulista2026.filter((r) => r.turma === selectedTurma)
    : provaPaulista2026;

  const data = turmas.map((pp) => {
    const diag = provaDiagnostica2026.find((d) => normalizeTurma(d.turma) === normalizeTurma(pp.turma));
    return {
      turma: pp.turma,
      "Diagnóstica 2026": diag ? +(diag.notaMedia * 100).toFixed(1) : 0,
      "Paulista 2026": +(pp.acertos * 100).toFixed(1),
    };
  });

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Diagnóstica vs Paulista 2026</CardTitle>
        <p className="text-sm text-muted-foreground">Identificação de lacunas de aprendizagem</p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="turma" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <Tooltip formatter={(v: any) => `${v}%`} />
              <Legend />
              <Bar dataKey="Diagnóstica 2026" fill="oklch(0.65 0.2 45)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Paulista 2026" fill="oklch(0.55 0.15 160)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
