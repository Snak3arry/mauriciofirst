import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { provaPaulista2025, provaPaulista2026, provaDiagnostica2026, progressionMappings } from "@/data/examData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function PerformanceTable() {
  const rows = provaPaulista2026.map((pp26) => {
    const mapping = progressionMappings.find((m) => m.turma2026 === pp26.turma);
    const isLogistica = pp26.turma === "2ª TEC Logística";

    // Get 2025 data for comparison
    let acertos2025: number | null = null;
    if (mapping && !isLogistica) {
      const sources = progressionMappings
        .filter((m) => m.turma2026 === pp26.turma)
        .map((m) => provaPaulista2025.find((r) => r.turma === m.turma2025))
        .filter(Boolean);
      if (sources.length > 0) {
        acertos2025 = sources.reduce((s, r) => s + r!.acertos, 0) / sources.length;
      }
    }

    const diag = provaDiagnostica2026.find((d) => d.turma === pp26.turma);
    const diff = acertos2025 !== null ? pp26.acertos - acertos2025 : null;

    return {
      turma: pp26.turma,
      totalAlunos: pp26.totalAlunos,
      participacao: pp26.participacao,
      acertos2026: pp26.acertos,
      acertos2025,
      diagMedia: diag?.notaMedia ?? null,
      diff,
      isLogistica,
    };
  });

  // Sort by acertos descending
  rows.sort((a, b) => b.acertos2026 - a.acertos2026);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Desempenho por Turma</CardTitle>
        <p className="text-sm text-muted-foreground">Ranking e indicadores de evolução</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Turma</TableHead>
                <TableHead className="text-center">Alunos</TableHead>
                <TableHead className="text-center">Participação</TableHead>
                <TableHead className="text-center">Acertos 2026</TableHead>
                <TableHead className="text-center">Acertos 2025</TableHead>
                <TableHead className="text-center">Diagnóstica</TableHead>
                <TableHead className="text-center">Evolução</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.turma}>
                  <TableCell className="font-medium">{row.turma}</TableCell>
                  <TableCell className="text-center">{row.totalAlunos}</TableCell>
                  <TableCell className="text-center">{(row.participacao * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-center font-semibold">{(row.acertos2026 * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-center">
                    {row.acertos2025 !== null ? `${(row.acertos2025 * 100).toFixed(1)}%` : 
                      row.isLogistica ? <span className="text-muted-foreground text-xs">Sem ref.</span> : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.diagMedia !== null ? `${(row.diagMedia * 100).toFixed(1)}%` : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.diff !== null ? (
                      <Badge
                        variant={row.diff > 0 ? "default" : "destructive"}
                        className="gap-1"
                      >
                        {row.diff > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {row.diff > 0 ? "+" : ""}
                        {(row.diff * 100).toFixed(1)} p.p.
                      </Badge>
                    ) : row.isLogistica ? (
                      <Badge variant="secondary" className="gap-1">
                        <Minus className="h-3 w-3" /> N/A
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
