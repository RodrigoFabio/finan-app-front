"use client";

import { useEffect } from 'react';
import { FilterBarProps } from './FilterBar.types';
import { useFilterBar } from '../filter-utils';
import FilterInput from '../FilterInput/FilterInput';
import { Button, IconX } from '@/components/ui';
import { cn } from '@/utils/cn';

export default function FilterBar({
  config,
  syncWithUrl = true,
  onFiltersChange,
  className,
}: FilterBarProps) {
  const { filters, updateFilter, clearFilters } = useFilterBar(
    config,
    syncWithUrl
  );

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== undefined && value !== ''
  );

  return (
    <div className={cn('flex flex-wrap items-end gap-3', className)}>
      {config.map((filter) => (
        <FilterInput
          key={filter.key}
          filter={filter}
          value={filters[filter.key]}
          onChange={(value) => updateFilter(filter.key, value)}
        />
      ))}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-9 text-neutral-500 hover:text-error-600 hover:bg-error-50"
        >
          <IconX size={14} />
          Limpar
        </Button>
      )}
    </div>
  );
}
