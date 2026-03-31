import { resumoMock, transacoesMock } from './relatorios.mocks';
import type {
  ResumoFinanceiro,
  QueryResumo,
  PeriodoRelatorio,
  PaginatedRelatorios,
  ListTransacoesQuery,
} from './relatorios.types';

// import api from '@/services/api';

export async function getResumoFinanceiro(_query?: QueryResumo): Promise<ResumoFinanceiro> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.get<ResumoFinanceiro>('/api/transactions/summary', { params: _query });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  return resumoMock;
}

export async function getTransacoesPorPeriodo(
  _periodo: PeriodoRelatorio,
  _query?: Omit<ListTransacoesQuery, 'startDate' | 'endDate'>
): Promise<PaginatedRelatorios> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.get<PaginatedRelatorios>('/api/transactions', {
  //     params: { ..._query, startDate: _periodo.startDate, endDate: _periodo.endDate },
  //   });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  return transacoesMock;
}
