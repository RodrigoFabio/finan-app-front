// Tipos do módulo Parcelamentos

export interface Parcelamento {
  id: string;
  userId: string;
  description: string;
  totalAmount: number;
  totalInstallments: number;
  startDate: string;
  category: number;
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateParcelamentoDto {
  description: string;
  totalAmount: number;
  totalInstallments: number;
  startDate: string; // YYYY-MM-DD
  category: number;
}

export interface UpdateParcelamentoDto {
  description?: string;
  totalAmount?: number;
  totalInstallments?: number;
  startDate?: string;
  category?: number;
}

export interface PaginatedParcelamentos {
  data: Parcelamento[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
