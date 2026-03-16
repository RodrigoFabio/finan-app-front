"use client";

import { useState, useMemo } from 'react';
import { DataTableConfig } from './DataTable.types';
import { getNestedValue } from './table-utils';

export function useDataTable<T = any>(config: DataTableConfig<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(
    config.defaultSort?.column || null
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    config.defaultSort?.direction || 'asc'
  );

  const handleSort = (column: string) => {
    if (!config.sortable) return;

    const newDirection =
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    
    setSortColumn(column);
    setSortDirection(newDirection);

    if (config.onSort) {
      config.onSort(column, newDirection);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || !config.sortable) return config.data;

    return [...config.data].sort((a, b) => {
      const aValue = getNestedValue(a, sortColumn);
      const bValue = getNestedValue(b, sortColumn);

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue, 'pt-BR')
          : bValue.localeCompare(aValue, 'pt-BR');
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [config.data, sortColumn, sortDirection, config.sortable]);

  return {
    sortedData,
    sortColumn,
    sortDirection,
    handleSort,
  };
}
