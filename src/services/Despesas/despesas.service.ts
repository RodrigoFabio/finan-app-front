import { handleApiError } from '@/utils/api-error';
import { despesasMock } from './despesas.mocks';
import type {
  Despesa,
  CreateDespesaDto,
  UpdateDespesaDto,
  ListDespesasQuery,
  PaginatedDespesas,
} from './despesas.types';

// import api from '@/services/api';

const TRANSACTION_TYPE_DESPESA = 2;

export async function getDespesas(_query?: ListDespesasQuery): Promise<PaginatedDespesas> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.get<PaginatedDespesas>('/api/transactions', {
  //     params: { ..._query, type: TRANSACTION_TYPE_DESPESA },
  //   });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  return despesasMock;
}

export async function getDespesaById(id: string): Promise<Despesa> {
  const found = despesasMock.data.find((d) => d.id === id);
  if (!found) throw new Error(`Despesa ${id} não encontrada`);
  return found;
}

export async function createDespesa(data: CreateDespesaDto): Promise<Despesa> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.post<Despesa>('/api/transactions', {
  //     ...data,
  //     type: TRANSACTION_TYPE_DESPESA,
  //   });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const nova: Despesa = {
    ...data,
    id: String(Date.now()),
    userId: 'u1',
    type: TRANSACTION_TYPE_DESPESA,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return nova;
}

export async function updateDespesa(id: string, data: UpdateDespesaDto): Promise<Despesa> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.put<Despesa>(`/api/transactions/${id}`, data);
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const existing = despesasMock.data.find((d) => d.id === id);
  if (!existing) throw new Error(`Despesa ${id} não encontrada`);
  return { ...existing, ...data, updatedAt: new Date().toISOString() };
}

export async function deleteDespesa(_id: string): Promise<void> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   await api.delete(`/api/transactions/${_id}`);
  // } catch (error) {
  //   handleApiError(error);
  // }
}
