/**
 * Configuração de filtros para Receitas
 * Exemplo de como usar o sistema de filtros configurável
 */

import { FilterConfig } from '@/components/filters/FilterBar/FilterBar.types';

export const receitasFilterConfig: FilterConfig[] = [
  {
    key: 'descricao',
    label: 'Descrição',
    type: 'text',
    placeholder: 'Buscar por descrição...',
  },
  {
    key: 'dataInicio',
    label: 'Data Início',
    type: 'date',
  },
  {
    key: 'dataFim',
    label: 'Data Fim',
    type: 'date',
  },
  {
    key: 'categoria',
    label: 'Categoria',
    type: 'select',
    options: [
      { value: 'Salário', label: 'Salário' },
      { value: 'Freelance', label: 'Freelance' },
      { value: 'Investimentos', label: 'Investimentos' },
      { value: 'Renda extra', label: 'Renda extra' },
      { value: 'Outros', label: 'Outros' },
    ],
  },
  {
    key: 'valorMin',
    label: 'Valor Mínimo',
    type: 'number',
    min: 0,
    step: 0.01,
  },
  {
    key: 'isRecorrente',
    label: 'Recorrente',
    type: 'select',
    options: [
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' },
    ],
  },
];
