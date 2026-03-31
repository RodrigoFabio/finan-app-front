/**
 * Configuração de filtros para Assinaturas
 */

import { FilterConfig } from '@/components/filters/FilterBar/FilterBar.types';

export const assinaturasFilterConfig: FilterConfig[] = [
  {
    key: 'description',
    label: 'Descrição',
    type: 'text',
    placeholder: 'Buscar por descrição...',
  },
  {
    key: 'isActive',
    label: 'Status',
    type: 'select',
    options: [
      { value: '', label: 'Todas' },
      { value: 'true', label: 'Ativas' },
      { value: 'false', label: 'Inativas' },
    ],
  },
  {
    key: 'type',
    label: 'Tipo',
    type: 'select',
    options: [
      { value: '', label: 'Todos' },
      { value: '1', label: 'Mensal' },
      { value: '2', label: 'Anual' },
      { value: '3', label: 'Semanal' },
    ],
  },
];
