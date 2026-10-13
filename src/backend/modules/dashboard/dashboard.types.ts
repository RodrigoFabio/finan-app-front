// Tipos do módulo Dashboard (backend)
// Espelha src/services/Dashboard/dashboard.service.ts para manter o mesmo contrato.

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
