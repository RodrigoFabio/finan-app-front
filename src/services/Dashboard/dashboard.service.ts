// Dashboard service — retorna todos os valores pré-computados para a tela de visão geral.

import { getReceitas } from '@/services/Receitas/receitas.service';
import { getDespesas } from '@/services/Despesas/despesas.service';
import { getParcelamentos } from '@/services/Parcelamentos/parcelamentos.service';

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

export async function getDashboardData(): Promise<DashboardData> {
  const [receitasResult, despesasResult, parcelamentosResult] = await Promise.allSettled([
    getReceitas(),
    getDespesas(),
    getParcelamentos(),
  ]);

  const receitasData = receitasResult.status === 'fulfilled' ? receitasResult.value?.data ?? [] : [];
  const despesasData = despesasResult.status === 'fulfilled' ? despesasResult.value?.data ?? [] : [];
  const parcelamentosData = parcelamentosResult.status === 'fulfilled' ? parcelamentosResult.value ?? [] : [];

  const receitas: ReceitaResumo[] = receitasData.map((r) => ({
    id: r.id,
    descricao: r.description,
    valor: r.amount,
    data: r.date,
    categoria: CATEGORIA_NOMES[r.category] ?? 'Outros',
    recorrente: false,
    observacao: r.notes,
  }));

  const totalReceitas = receitas.reduce((sum, r) => sum + r.valor, 0);
  const totalDespesas = despesasData.reduce((sum, d) => sum + d.amount, 0);
  const totalParcelamentos = parcelamentosData.reduce((sum, p) => sum + (p.installmentAmount ?? 0), 0);
  const saldo = totalReceitas - totalDespesas;

  const categoryMap: Record<string, number> = {};
  for (const r of receitas) {
    categoryMap[r.categoria] = (categoryMap[r.categoria] || 0) + r.valor;
  }
  const porCategoria: CategoriaResumo[] = Object.entries(categoryMap).map(([nome, total]) => ({
    nome,
    total,
    percentual: totalReceitas > 0 ? Math.round((total / totalReceitas) * 100) : 0,
  }));

  const receitasRecentes = [...receitas]
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 4);

  const maiorReceita = receitas.length > 0 ? Math.max(...receitas.map((r) => r.valor)) : 0;
  const mediaReceita = receitas.length > 0 ? totalReceitas / receitas.length : 0;
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
