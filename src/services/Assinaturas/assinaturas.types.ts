// Tipos do módulo Assinaturas

export interface Assinatura {
  id: string;
  userId: string;
  description: string;
  amount: number;
  billingDay: number;
  type: number;
  category: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssinaturaDto {
  description: string;
  amount: number;
  billingDay: number;
  type: number;
  category: number;
}

export interface UpdateAssinaturaDto {
  description?: string;
  amount?: number;
  billingDay?: number;
  type?: number;
  category?: number;
  isActive?: boolean;
}

export interface GetAssinaturasQuery {
  isActive?: string;
}

export interface PaginatedAssinaturas {
  data: Assinatura[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
