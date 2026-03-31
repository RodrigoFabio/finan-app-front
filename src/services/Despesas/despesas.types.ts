// Tipos do módulo Despesas
// Despesa é uma Transaction de saída (type=2 no backend)

export interface Despesa {
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

export interface CreateDespesaDto {
  description: string;
  amount: number;
  type: number;
  date: string;
  notes?: string;
  category: number;
}

export interface UpdateDespesaDto {
  description?: string;
  amount?: number;
  type?: number;
  date?: string;
  notes?: string;
  category?: number;
}

export interface ListDespesasQuery {
  startDate?: string;
  endDate?: string;
  category?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedDespesas {
  data: Despesa[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
