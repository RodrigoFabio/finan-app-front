// Tipos do módulo Relatórios

export interface Transacao {
  id: string;
  userId: string;
  description: string;
  amount: number;
  type: number;
  date: string;
  notes?: string;
  category: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumoFinanceiro {
  income: number;
  expense: number;
  balance: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface QueryResumo {
  startDate?: string;
  endDate?: string;
}

export interface PeriodoRelatorio {
  startDate: string;
  endDate: string;
}

export interface ListTransacoesQuery {
  startDate?: string;
  endDate?: string;
  type?: number;
  category?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedRelatorios {
  data: Transacao[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
