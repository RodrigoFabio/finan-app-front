// Service do módulo Relatórios.
// Orquestra o repositório e concentrará a regra de negócio.
// TODO: implementar a regra de negócio. Por ora, apenas delega ao repositório.

import { relatoriosRepository } from './relatorios.repository';
import type {
  ResumoFinanceiro,
  QueryResumo,
  PeriodoRelatorio,
  ListTransacoesQuery,
  PaginatedRelatorios,
} from './relatorios.types';

export const relatoriosService = {
  async getResumoFinanceiro(query?: QueryResumo): Promise<ResumoFinanceiro> {
    return relatoriosRepository.getResumo(query ?? {});
  },

  async getTransacoesPorPeriodo(
    periodo: PeriodoRelatorio,
    query?: Omit<ListTransacoesQuery, 'startDate' | 'endDate'>
  ): Promise<PaginatedRelatorios> {
    return relatoriosRepository.findTransacoesPorPeriodo(periodo, query);
  },
};
