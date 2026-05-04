import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KpiCards } from "@/components/KpiCards";
import { ProgressionChart } from "@/components/ProgressionChart";
import { DiagnosticChart } from "@/components/DiagnosticChart";
import { DisciplineChart } from "@/components/DisciplineChart";
import { PerformanceTable } from "@/components/PerformanceTable";
import { DashboardFilters } from "@/components/DashboardFilters";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Dashboard Educacional — Ensino Médio" },
      { name: "description", content: "Análise de resultados das turmas do Ensino Médio" },
    ],
  }),
});

function Index() {
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Dashboard Educacional</h1>
            <p className="text-sm text-muted-foreground">Análise de desempenho — Ensino Médio 2025/2026</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* Filters */}
        <DashboardFilters selectedTurma={selectedTurma} onTurmaChange={setSelectedTurma} />

        {/* KPIs */}
        <KpiCards />

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProgressionChart />
          <DiagnosticChart selectedTurma={selectedTurma} />
        </div>

        {/* Discipline detail */}
        <DisciplineChart selectedTurma={selectedTurma} />

        {/* Performance table */}
        <PerformanceTable />
      </main>
    </div>
  );
}
