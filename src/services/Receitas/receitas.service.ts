import api from '@/services/api';
import { handleApiError } from '@/utils/api-error';
import { receitasMock } from './receitas.mocks';
import type {
  Receita,
  CreateReceitaDto,
  UpdateReceitaDto,
  ListReceitasQuery,
  PaginatedReceitas,
} from './receitas.types';

const TRANSACTION_TYPE_RECEITA = 2; // TransactionType.INCOME = 2 no backend

export async function getReceitas(query?: ListReceitasQuery): Promise<PaginatedReceitas> {
  try {
    const response = await api.get<PaginatedReceitas>('/api/transactions', {
      params: { ...query, type: TRANSACTION_TYPE_RECEITA },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getReceitaById(id: string): Promise<Receita> {
  try {
    console.log("::::::::::::::::::::::::::::::::: id :::::::::::::::::::::::::::::", id);
    const response = await api.get<Receita>(`/api/transactions/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createReceita(data: CreateReceitaDto): Promise<Receita> {
  try {
    const response = await api.post<Receita>('/api/transactions', {
      ...data,
      type: TRANSACTION_TYPE_RECEITA,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateReceita(id: string, data: UpdateReceitaDto): Promise<Receita> {
  try {
    const response = await api.put<Receita>(`/api/transactions/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteReceita(id: string): Promise<void> {
  try {
    await api.delete(`/api/transactions/${id}`);
  } catch (error) {
    handleApiError(error);
  }
}

// Mock mantido para referência e testes locais
export { receitasMock };
