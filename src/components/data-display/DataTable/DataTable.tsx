"use client";

import { DataTableConfig, ColumnConfig } from './DataTable.types';
import { useDataTable } from './useDataTable';
import { getNestedValue } from './table-utils';
import { cn } from '@/utils/cn';
import { Button, IconArrowUp, IconArrowDown, IconArrowUpDown } from '../../ui';

export default function DataTable<T = any>({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
  pagination,
  sortable = true,
  rowKey,
  className,
}: DataTableConfig<T>) {
  const { sortedData, sortColumn, sortDirection, handleSort } = useDataTable({
    columns,
    data,
    sortable,
  });

  const getRowKey = (row: T, index: number): string | number => {
    if (rowKey) return rowKey(row, index);
    return index;
  };

  const renderCell = (column: ColumnConfig<T>, row: T, index: number) => {
    const value = getNestedValue(row, column.key);

    if (column.render) {
      return column.render(value, row, index);
    }

    if (column.format) {
      return column.format(value);
    }

    return value ?? '-';
  };

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right':  return 'text-right';
      default:       return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="skeleton h-10 flex-1" style={{ animationDelay: `${i * 80}ms` }} />
            <div className="skeleton h-10 w-24" style={{ animationDelay: `${i * 80 + 40}ms` }} />
            <div className="skeleton h-10 w-20" style={{ animationDelay: `${i * 80 + 80}ms` }} />
          </div>
        ))}
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className="flex flex-col h-64 items-center justify-center gap-3 text-center px-6">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
          <IconArrowUpDown className="text-neutral-400" size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-600">{emptyMessage}</p>
          <p className="text-xs text-neutral-400 mt-1">Tente ajustar os filtros aplicados</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-neutral-200 bg-neutral-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500',
                  getAlignClass(column.headerAlign || column.align),
                )}
                style={column.width ? { width: column.width } : undefined}
              >
                <div className={cn(
                  'flex items-center gap-1.5',
                  column.align === 'right' ? 'justify-end' :
                  column.align === 'center' ? 'justify-center' : 'justify-start'
                )}>
                  <span>{column.label}</span>
                  {sortable && column.sortable && (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="text-neutral-400 hover:text-neutral-700 transition-colors duration-150"
                    >
                      {sortColumn === column.key ? (
                        sortDirection === 'asc'
                          ? <IconArrowUp size={13} />
                          : <IconArrowDown size={13} />
                      ) : (
                        <IconArrowUpDown size={13} className="opacity-50" />
                      )}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={getRowKey(row, rowIndex)}
              className={cn(
                'border-b border-neutral-100 transition-colors duration-100',
                'odd:bg-white even:bg-neutral-50/50',
                onRowClick && 'cursor-pointer hover:bg-primary-50/40',
                !onRowClick && 'hover:bg-neutral-50',
              )}
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-4 py-3.5 text-sm text-neutral-800',
                    getAlignClass(column.align)
                  )}
                >
                  {renderCell(column, row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 bg-neutral-50/60">
          <div className="text-xs text-neutral-500">
            Mostrando {((pagination.page - 1) * pagination.pageSize) + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} de{' '}
            <span className="font-medium text-neutral-700">{pagination.total}</span> registros
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Anterior
            </Button>
            <span className="text-xs text-neutral-500 px-2">
              Página <span className="font-medium text-neutral-700">{pagination.page}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page * pagination.pageSize >= pagination.total}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
