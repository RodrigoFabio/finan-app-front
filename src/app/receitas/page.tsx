"use client";

import { ListLayout } from '@/layouts';
import { DataTable } from '@/components/data-display/DataTable';
import { FilterBar } from '@/components/filters';
import { Button, IconPlus, IconPencil } from '@/components/ui';
import { useAppNavigation } from '@/routing/navigation';
import { getReceitas } from '@/services/Receitas/receitas.service';
import { receitasFilterConfig } from '@/config/filters/receitas';
import { useState, useMemo } from 'react';
import { Receita } from '@/services/Receitas/receitas.mocks';
import { cn } from '@/utils/cn';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const categoryColors: Record<string, string> = {
  'Salário':       'bg-success-100 text-success-700',
  'Freelance':     'bg-primary-100 text-primary-700',
  'Investimentos': 'bg-info-100 text-info-700',
  'Renda extra':   'bg-warning-100 text-warning-700',
  'Outros':        'bg-neutral-100 text-neutral-600',
};

export default function ReceitasPage() {
  const nav = useAppNavigation();
  const [data] = useState<Receita[]>(getReceitas());
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredData = useMemo(() => {
    let result = [...data];
    if (filters.descricao)
      result = result.filter((item) =>
        item.descricao.toLowerCase().includes(filters.descricao.toLowerCase())
      );
    if (filters.categoria)
      result = result.filter((item) => item.categoria === filters.categoria);
    if (filters.dataInicio)
      result = result.filter((item) => item.data >= filters.dataInicio);
    if (filters.dataFim)
      result = result.filter((item) => item.data <= filters.dataFim);
    if (filters.valorMin)
      result = result.filter((item) => item.valor >= filters.valorMin);
    if (filters.isRecorrente !== undefined && filters.isRecorrente !== '')
      result = result.filter((item) => item.isRecorrente === (filters.isRecorrente === 'true'));
    return result;
  }, [data, filters]);

  const columns = [
    {
      key: 'descricao',
      label: 'Descrição',
      sortable: true,
      width: '30%',
    },
    {
      key: 'valor',
      label: 'Valor',
      format: (val: number) => (
        <span className="font-semibold text-success-600">{fmt(val)}</span>
      ) as any,
      align: 'right' as const,
      sortable: true,
      width: '15%',
    },
    {
      key: 'data',
      label: 'Data',
      format: (val: string) =>
        new Date(val + 'T00:00:00').toLocaleDateString('pt-BR'),
      sortable: true,
      width: '15%',
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true,
      width: '15%',
      render: (value: string) => (
        <span className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
          categoryColors[value] || 'bg-neutral-100 text-neutral-600'
        )}>
          {value}
        </span>
      ),
    },
    {
      key: 'isRecorrente',
      label: 'Recorrente',
      align: 'center' as const,
      width: '10%',
      render: (value: boolean) => (
        <span className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
          value
            ? 'bg-success-100 text-success-700'
            : 'bg-neutral-100 text-neutral-500'
        )}>
          {value ? 'Sim' : 'Não'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'center' as const,
      width: '10%',
      render: (_: unknown, row: Receita) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); nav.goToEditReceita(row.id); }}
          className="h-8 px-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50"
        >
          <IconPencil size={14} />
        </Button>
      ),
    },
  ];

  return (
    <ListLayout
      title="Receitas"
      actions={
        <Button onClick={() => nav.goToCreateReceita()}>
          <IconPlus size={14} />
          Nova Receita
        </Button>
      }
      filters={
        <FilterBar
          config={receitasFilterConfig}
          syncWithUrl={true}
          onFiltersChange={setFilters}
        />
      }
    >
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => nav.goToViewReceita(row.id)}
        sortable={true}
        rowKey={(row) => row.id}
      />
    </ListLayout>
  );
}
