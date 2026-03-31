/**
 * Configuração de filtros para Despesas
 */

import { FilterConfig } from '@/components/filters/FilterBar/FilterBar.types';

export const despesasFilterConfig: FilterConfig[] = [
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
    key: 'category',
    label: 'Categoria',
    type: 'select',
    options: [
      { value: '1', label: 'Alimentação' },
      { value: '2', label: 'Transporte' },
      { value: '3', label: 'Moradia' },
      { value: '4', label: 'Saúde' },
      { value: '5', label: 'Educação' },
      { value: '6', label: 'Lazer' },
      { value: '7', label: 'Outros' },
    ],
  },
];
