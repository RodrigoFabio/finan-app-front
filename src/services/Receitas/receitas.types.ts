// Tipos do módulo Receitas
// Receita é uma Transaction de entrada (type=2 no backend — TransactionType.INCOME)

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
