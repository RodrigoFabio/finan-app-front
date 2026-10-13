// Repositório do módulo Relatórios.
// Responsável exclusivamente por acesso a dados — sem regra de negócio.
// TODO: implementar as queries reais quando a persistência for definida
// (ver src/backend/shared/database.ts).

import type {
  ResumoFinanceiro,
  QueryResumo,
  PeriodoRelatorio,
  ListTransacoesQuery,
  PaginatedRelatorios,
} from './relatorios.types';

export const relatoriosRepository = {
  async getResumo(_query: QueryResumo): Promise<ResumoFinanceiro> {
    throw new Error('Not implemented');
  },

  async findTransacoesPorPeriodo(
    _periodo: PeriodoRelatorio,
    _query?: Omit<ListTransacoesQuery, 'startDate' | 'endDate'>
  ): Promise<PaginatedRelatorios> {
    throw new Error('Not implemented');
  },
};
