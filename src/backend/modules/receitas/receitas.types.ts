// Tipos do módulo Receitas (backend)
// Receita é uma Transaction de entrada (type=2 — TransactionType.INCOME)
// Espelha src/services/Receitas/receitas.types.ts para manter o mesmo contrato.

export interface Receita {
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

export interface CreateReceitaDto {
  description: string;
  amount: number;
  type: number;
  date: string;
  notes?: string;
  category: number;
}

export interface UpdateReceitaDto {
  description?: string;
  amount?: number;
  type?: number;
  date?: string;
  notes?: string;
  category?: number;
}

export interface ListReceitasQuery {
  startDate?: string;
  endDate?: string;
  category?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedReceitas {
  items: Receita[];
  total: number;
  page: number;
  limit: number;
}
