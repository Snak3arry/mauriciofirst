// Raw data extracted from Excel files

export interface ClassRecord {
  turma: string;
  totalAlunos: number;
  participacao: number;
  acertos: number;
  disciplinas: Record<string, number>;
}

export interface DiagnosticRecord {
  turma: string;
  avaliados: number;
  notaMedia: number;
  disciplinas: Record<string, number>;
}

export interface ProgressionMapping {
  turma2025: string;
  turma2026: string;
}

// Progression mappings (2025 → 2026)
export const progressionMappings: ProgressionMapping[] = [
  { turma2025: "9° ANO A", turma2026: "1ª SERIE A" },
  { turma2025: "9° ANO B", turma2026: "1ª SERIE B" },
  { turma2025: "9° ANO C", turma2026: "1ª SERIE C" },
  { turma2025: "1ª SERIE A", turma2026: "2ª SERIE B" },
  { turma2025: "1ª SERIE B", turma2026: "2ª SERIE B" },
  { turma2025: "2ª SERIE A", turma2026: "3ª SERIE A" },
  { turma2025: "2ª TEC Desenvolvimento de Sistemas", turma2026: "3º TEC Desenvolvimento de Sistemas" },
];

// 2ª TEC Logística has no direct progression mapping

const commonSubjects = ["PORT", "MAT", "HIST", "GEO", "ING", "FÍS", "QUI", "BIO", "FILO", "SOC"];

function parseSubjects(raw: Record<string, number>, subjectKeys: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const key of subjectKeys) {
    if (raw[key] !== undefined && raw[key] > 0) {
      result[key] = raw[key];
    }
  }
  return result;
}

export const provaPaulista2025: ClassRecord[] = [
  { turma: "1ª SERIE A", totalAlunos: 30, participacao: 0.9167, acertos: 0.8024, disciplinas: { PORT: 0.846, MAT: 0.6968, HIST: 0.8839, GEO: 0.8304, "ED FIN": 0.9321, "FÍS": 0.7302, QUI: 0.875, BIO: 0.7269, FILO: 0.75, "ING IF": 0.85 } },
  { turma: "1ª SERIE B", totalAlunos: 29, participacao: 0.931, acertos: 0.7979, disciplinas: { PORT: 0.8264, MAT: 0.7037, HIST: 0.9583, GEO: 0.9491, "ED FIN": 0.9198, "FÍS": 0.6984, QUI: 0.8056, BIO: 0.6296, FILO: 0.7731, "ING IF": 0.8 } },
  { turma: "3ª SERIE A", totalAlunos: 19, participacao: 1.0, acertos: 0.7632, disciplinas: { PORT: 0.8363, MAT: 0.7251, HIST: 0.8053, ING: 0.8045, "OE PORT": 0.8553, "OE MAT": 0.6645, "FÍS": 0.7519, ARTE: 0.7789, ORA: 0.7263, "GEO POL": 0.7158, "FILO SOC": 0.7 } },
  { turma: "3ª TEC Administração", totalAlunos: 23, participacao: 0.9783, acertos: 0.7407, disciplinas: { PORT: 0.7601, MAT: 0.7536, HIST: 0.7409, ING: 0.7597, "FÍS": 0.7205 } },
  { turma: "2ª SERIE A", totalAlunos: 27, participacao: 0.963, acertos: 0.5966, disciplinas: { PORT: 0.3413, MAT: 0.875, HIST: 0.3141, GEO: 0.3077, ING: 0.3269, "ED FIN": 0.8654, "FÍS": 0.8974, QUI: 0.8782, BIO: 0.8397, ORA: 0.3231, SOC: 0.3141, LID: 0.8308 } },
  { turma: "2ª TEC Desenvolvimento de Sistemas", totalAlunos: 33, participacao: 0.9837, acertos: 0.2948, disciplinas: { PORT: 0.2637, MAT: 0.3068, HIST: 0.2917, GEO: 0.2969, ING: 0.2917, "FÍS": 0.3232, QUI: 0.3232, BIO: 0.3081, SOC: 0.2917 } },
  { turma: "9° ANO C", totalAlunos: 30, participacao: 0.9667, acertos: 0.7906, disciplinas: { PORT: 0.731, MAT: 0.7845, HIST: 0.8621, GEO: 0.8655, ING: 0.8966, "OE PORT": 0.7908, "OE MAT": 0.5991, "ED FIN": 0.8966 } },
  { turma: "9° ANO A", totalAlunos: 31, participacao: 0.9516, acertos: 0.7599, disciplinas: { PORT: 0.735, MAT: 0.6897, HIST: 0.85, GEO: 0.8133, ING: 0.8621, "OE PORT": 0.8621, "OE MAT": 0.6125, "ED FIN": 0.7112 } },
  { turma: "9° ANO B", totalAlunos: 27, participacao: 1.0, acertos: 0.6863, disciplinas: { PORT: 0.65, MAT: 0.5852, HIST: 0.7741, GEO: 0.7296, ING: 0.7778, "OE PORT": 0.8, "OE MAT": 0.5694, "ED FIN": 0.713 } },
];

export const provaPaulista2026: ClassRecord[] = [
  { turma: "3º TEC Desenvolvimento de Sistemas", totalAlunos: 28, participacao: 1.0, acertos: 0.4685, disciplinas: { PORT: 0.5675, MAT: 0.3676, ING: 0.2959, HIST: 0.575, "FÍS": 0.4796 } },
  { turma: "1ª SERIE B", totalAlunos: 28, participacao: 0.9821, acertos: 0.3786, disciplinas: { MAT: 0.2173, PORT: 0.5143, ING: 0.3393, HIST: 0.4688, GEO: 0.4688, FILO: 0.4464, BIO: 0.3565, "FÍS": 0.25, QUI: 0.3056, FIN: 0.4259 } },
  { turma: "2ª TEC Logística", totalAlunos: 34, participacao: 0.9412, acertos: 0.4875, disciplinas: { MAT: 0.2979, PORT: 0.5542, ING: 0.4062, HIST: 0.4, GEO: 0.4562, SOC: 0.5188, BIO: 0.4313, "FÍS": 0.7063, QUI: 0.7562, FIN: 0.5938 } },
  { turma: "1ª SERIE A", totalAlunos: 31, participacao: 0.9355, acertos: 0.4161, disciplinas: { MAT: 0.2071, PORT: 0.5667, ING: 0.3611, HIST: 0.4958, GEO: 0.5333, FILO: 0.4875, BIO: 0.4018, "FÍS": 0.2455, QUI: 0.3214, FIN: 0.5833 } },
  { turma: "3ª SERIE A", totalAlunos: 31, participacao: 0.9355, acertos: 0.4366, disciplinas: { MAT: 0.3225, PORT: 0.5019, ING: 0.3793, HIST: 0.5828, "FÍS": 0.3941 } },
  { turma: "1ª SERIE C", totalAlunos: 29, participacao: 0.8966, acertos: 0.4295, disciplinas: { MAT: 0.2872, PORT: 0.5718, ING: 0.4615, HIST: 0.5385, GEO: 0.5048, FILO: 0.4808, BIO: 0.3846, "FÍS": 0.2404, QUI: 0.3462, FIN: 0.5064 } },
  { turma: "2ª SERIE B", totalAlunos: 25, participacao: 0.88, acertos: 0.4188, disciplinas: { MAT: 0.3848, PORT: 0.4939, ING: 0.3727, HIST: 0.3545, GEO: 0.3364, SOC: 0.3091, BIO: 0.5545, "FÍS": 0.2818, QUI: 0.4909, FIN: 0.5273 } },
];

export const provaDiagnostica2026: DiagnosticRecord[] = [
  { turma: "3ª TEC Desenvolvimento de Sistemas", avaliados: 29, notaMedia: 0.396, disciplinas: { LPT: 0.529, MAT: 0.368, ING: 0.437, HIS: 0.358, GEO: 0.349, FIS: 0.216, QUI: 0.323, BIO: 0.289, SOC: 0.578 } },
  { turma: "3ª SERIE A", avaliados: 28, notaMedia: 0.341, disciplinas: { LPT: 0.521, MAT: 0.267, ING: 0.42, HIS: 0.343, GEO: 0.301, FIS: 0.185, QUI: 0.227, BIO: 0.278, SOC: 0.417 } },
  { turma: "2ª SERIE B", avaliados: 15, notaMedia: 0.369, disciplinas: { LPT: 0.537, MAT: 0.262, ING: 0.4, HIS: 0.375, GEO: 0.357, FIS: 0.267, QUI: 0.267, BIO: 0.408, FIL: 0.357 } },
  { turma: "2ª TEC Logística", avaliados: 38, notaMedia: 0.325, disciplinas: { LPT: 0.537, MAT: 0.266, ING: 0.32, HIS: 0.329, GEO: 0.204, FIS: 0.217, QUI: 0.28, BIO: 0.306, FIL: 0.273 } },
  { turma: "1ª SERIE B", avaliados: 27, notaMedia: 0.443, disciplinas: { LPT: 0.49, MAT: 0.45, ING: 0.472, CIE: 0.375, HIS: 0.47, GEO: 0.385 } },
  { turma: "1ª SERIE C", avaliados: 26, notaMedia: 0.477, disciplinas: { LPT: 0.534, MAT: 0.436, ING: 0.5, CIE: 0.498, HIS: 0.508, GEO: 0.369 } },
  { turma: "1ª SERIE A", avaliados: 25, notaMedia: 0.549, disciplinas: { LPT: 0.598, MAT: 0.503, ING: 0.61, CIE: 0.565, HIS: 0.516, GEO: 0.524 } },
];

// Helper to get all unique 2026 classes
export function getAllClasses2026(): string[] {
  return provaPaulista2026.map(r => r.turma).sort();
}

// Helper to get all unique disciplines across all exams
export function getAllDisciplines(): string[] {
  const set = new Set<string>();
  [...provaPaulista2025, ...provaPaulista2026].forEach(r => {
    Object.keys(r.disciplinas).forEach(d => set.add(d));
  });
  provaDiagnostica2026.forEach(r => {
    Object.keys(r.disciplinas).forEach(d => set.add(d));
  });
  return Array.from(set).sort();
}

// Get school-wide average for a given exam
export function getSchoolAverage(records: ClassRecord[]): number {
  if (records.length === 0) return 0;
  const total = records.reduce((sum, r) => sum + r.acertos * r.totalAlunos, 0);
  const totalAlunos = records.reduce((sum, r) => sum + r.totalAlunos, 0);
  return totalAlunos > 0 ? total / totalAlunos : 0;
}

// Get year groups
export function getYearGroups(): string[] {
  return ["1ª Série", "2ª Série", "3ª Série", "9° Ano"];
}

export function getClassesByYear(year: string, records: ClassRecord[]): ClassRecord[] {
  return records.filter(r => {
    const t = r.turma.toLowerCase();
    switch (year) {
      case "1ª Série": return t.includes("1ª serie");
      case "2ª Série": return t.includes("2ª serie") || t.includes("2ª tec");
      case "3ª Série": return t.includes("3ª serie") || t.includes("3º tec") || t.includes("3ª tec");
      case "9° Ano": return t.includes("9°");
      default: return true;
    }
  });
}
