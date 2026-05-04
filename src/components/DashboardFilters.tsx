import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllClasses2026 } from "@/data/examData";

interface Props {
  selectedTurma: string | null;
  onTurmaChange: (v: string | null) => void;
}

export function DashboardFilters({ selectedTurma, onTurmaChange }: Props) {
  const classes = getAllClasses2026();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={selectedTurma ?? "all"}
        onValueChange={(v) => onTurmaChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[220px] bg-card border-border">
          <SelectValue placeholder="Filtrar por turma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as turmas</SelectItem>
          {classes.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
