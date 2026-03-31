// Tipos do módulo Receitas
// Receita é uma Transaction de entrada (type=1 no backend)

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
  data: Receita[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
