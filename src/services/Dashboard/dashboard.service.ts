// Dashboard service — retorna todos os valores pré-computados para a tela de visão geral.
// Trocar os mocks de despesas/parcelamentos pelos serviços reais quando o backend estiver pronto.

import { receitasMock } from '@/services/Receitas/receitas.mocks';

// Mapeamento de category (number) → nome exibido
const CATEGORIA_NOMES: Record<number, string> = {
  1: 'Salário',
  2: 'Freelance',
  3: 'Investimentos',
  4: 'Renda extra',
  5: 'Outros',
};

export interface ReceitaResumo {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  recorrente: boolean;
  observacao?: string;
}

export interface CategoriaResumo {
  nome: string;
  total: number;
  percentual: number;
}

export interface DashboardData {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalParcelamentos: number;
  totalEntradas: number;
  receitasRecorrentes: number;
  maiorReceita: number;
  mediaReceita: number;
  receitasRecentes: ReceitaResumo[];
  porCategoria: CategoriaResumo[];
}

export function getDashboardData(): DashboardData {
  const receitas: ReceitaResumo[] = receitasMock.data.map((r) => ({
    id: r.id,
    descricao: r.description,
    valor: r.amount,
    data: r.date,
    categoria: CATEGORIA_NOMES[r.category] ?? 'Outros',
    recorrente: false, // campo não existe no backend ainda
    observacao: r.notes,
  }));

  // --- Mocks de outros módulos (substituir pelo service real futuramente) ---
  const totalDespesas = 3240.50;
  const totalParcelamentos = 850.00;

  const totalReceitas = receitas.reduce((sum, r) => sum + r.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const categoryMap: Record<string, number> = {};
  for (const r of receitas) {
    categoryMap[r.categoria] = (categoryMap[r.categoria] || 0) + r.valor;
  }
  const porCategoria: CategoriaResumo[] = Object.entries(categoryMap).map(([nome, total]) => ({
    nome,
    total,
    percentual: Math.round((total / totalReceitas) * 100),
  }));

  const receitasRecentes = [...receitas]
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 4);

  const maiorReceita = Math.max(...receitas.map((r) => r.valor));
  const mediaReceita = totalReceitas / receitas.length;
  const receitasRecorrentes = receitas.filter((r) => r.recorrente).length;

  return {
    totalReceitas,
    totalDespesas,
    saldo,
    totalParcelamentos,
    totalEntradas: receitas.length,
    receitasRecorrentes,
    maiorReceita,
    mediaReceita,
    receitasRecentes,
    porCategoria,
  };
}
