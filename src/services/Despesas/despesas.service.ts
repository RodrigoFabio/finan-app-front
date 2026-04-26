import api from '@/services/api';
import { handleApiError } from '@/utils/api-error';
import { despesasMock } from './despesas.mocks';
import type {
  Despesa,
  CreateDespesaDto,
  UpdateDespesaDto,
  ListDespesasQuery,
  PaginatedDespesas,
} from './despesas.types';

const TRANSACTION_TYPE_DESPESA = 1; // TransactionType.EXPENSE = 1 no backend

export async function getDespesas(query?: ListDespesasQuery): Promise<PaginatedDespesas> {
  try {
    const response = await api.get<PaginatedDespesas>('/api/transactions', {
      params: { ...query, type: TRANSACTION_TYPE_DESPESA },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getDespesaById(id: string): Promise<Despesa> {
  try {
    const response = await api.get<Despesa>(`/api/transactions/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createDespesa(data: CreateDespesaDto): Promise<Despesa> {
  try {
    const response = await api.post<Despesa>('/api/transactions', {
      ...data,
      type: TRANSACTION_TYPE_DESPESA,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateDespesa(id: string, data: UpdateDespesaDto): Promise<Despesa> {
  try {
    const response = await api.put<Despesa>(`/api/transactions/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteDespesa(id: string): Promise<void> {
  try {
    await api.delete(`/api/transactions/${id}`);
  } catch (error) {
    handleApiError(error);
  }
}

// Mock mantido para referência e testes locais
export { despesasMock };
