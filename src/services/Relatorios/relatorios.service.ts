import api from '@/services/api';
import { handleApiError } from '@/utils/api-error';
import { resumoMock, transacoesMock } from './relatorios.mocks';
import type {
  ResumoFinanceiro,
  QueryResumo,
  PeriodoRelatorio,
  PaginatedRelatorios,
  ListTransacoesQuery,
} from './relatorios.types';

export async function getResumoFinanceiro(query?: QueryResumo): Promise<ResumoFinanceiro> {
  try {
    const response = await api.get<ResumoFinanceiro>('/api/transactions/summary', { params: query });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getTransacoesPorPeriodo(
  periodo: PeriodoRelatorio,
  query?: Omit<ListTransacoesQuery, 'startDate' | 'endDate'>
): Promise<PaginatedRelatorios> {
  try {
    const response = await api.get<PaginatedRelatorios>('/api/transactions', {
      params: { ...query, startDate: periodo.startDate, endDate: periodo.endDate },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Mocks mantidos para referência e testes locais
export { resumoMock, transacoesMock };
