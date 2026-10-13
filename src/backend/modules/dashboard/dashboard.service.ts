// Service do módulo Dashboard.
// Agrega dados dos módulos de Receitas, Despesas e Parcelamentos.
// TODO: implementar a regra de negócio (hoje replicada em
// src/services/Dashboard/dashboard.service.ts no frontend).

import { receitasService } from '@/backend/modules/receitas';
import { despesasService } from '@/backend/modules/despesas';
import { parcelamentosService } from '@/backend/modules/parcelamentos';
import type { DashboardData } from './dashboard.types';

export const dashboardService = {
  async getDashboardData(_userId: string): Promise<DashboardData> {
    // TODO: orquestrar receitasService / despesasService / parcelamentosService
    // e computar os agregados (totais, saldo, por categoria, etc.), como feito
    // hoje em src/services/Dashboard/dashboard.service.ts.
    void receitasService;
    void despesasService;
    void parcelamentosService;
    throw new Error('Not implemented');
  },
};
