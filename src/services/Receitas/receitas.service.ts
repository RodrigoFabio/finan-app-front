import { handleApiError } from '@/utils/api-error';
import { receitasMock } from './receitas.mocks';
import type {
  Receita,
  CreateReceitaDto,
  UpdateReceitaDto,
  ListReceitasQuery,
  PaginatedReceitas,
} from './receitas.types';

// import api from '@/services/api';

const TRANSACTION_TYPE_RECEITA = 1;

export async function getReceitas(_query?: ListReceitasQuery): Promise<PaginatedReceitas> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.get<PaginatedReceitas>('/api/transactions', {
  //     params: { ..._query, type: TRANSACTION_TYPE_RECEITA },
  //   });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  return receitasMock;
}

export async function getReceitaById(id: string): Promise<Receita> {
  try {
    const found = receitasMock.data.find((r) => r.id === id);
    if (!found) throw new Error(`Receita ${id} não encontrada`);
    return found;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createReceita(data: CreateReceitaDto): Promise<Receita> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.post<Receita>('/api/transactions', {
  //     ...data,
  //     type: TRANSACTION_TYPE_RECEITA,
  //   });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const nova: Receita = {
    ...data,
    id: String(Date.now()),
    userId: 'u1',
    type: TRANSACTION_TYPE_RECEITA,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return nova;
}

export async function updateReceita(id: string, data: UpdateReceitaDto): Promise<Receita> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.put<Receita>(`/api/transactions/${id}`, data);
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const existing = receitasMock.data.find((r) => r.id === id);
  if (!existing) throw new Error(`Receita ${id} não encontrada`);
  return { ...existing, ...data, updatedAt: new Date().toISOString() };
}

export async function deleteReceita(_id: string): Promise<void> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   await api.delete(`/api/transactions/${_id}`);
  // } catch (error) {
  //   handleApiError(error);
  // }
}
