/**
 * Configuração de filtros para Parcelamentos
 */

import { FilterConfig } from '@/components/filters/FilterBar/FilterBar.types';

export const parcelamentosFilterConfig: FilterConfig[] = [
  {
    key: 'description',
    label: 'Descrição',
    type: 'text',
    placeholder: 'Buscar por descrição...',
  },
  {
    key: 'startDate',
    label: 'Data Início',
    type: 'date',
  },
  {
    key: 'endDate',
    label: 'Data Fim',
    type: 'date',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: '', label: 'Todos' },
      { value: 'active', label: 'Ativo' },
      { value: 'cancelled', label: 'Cancelado' },
      { value: 'completed', label: 'Concluído' },
    ],
  },
];
