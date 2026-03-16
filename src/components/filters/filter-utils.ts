/**
 * Utilitários para sistema de filtros
 */

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FilterConfig } from './FilterBar/FilterBar.types';

/**
 * Hook para gerenciar filtros com sincronização URL
 */
export function useFilterBar(
  config: FilterConfig[],
  syncWithUrl: boolean = true
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Inicializa filtros a partir da URL ou valores padrão
  const getInitialFilters = useCallback((): Record<string, any> => {
    const filters: Record<string, any> = {};
    
    config.forEach((filter) => {
      if (syncWithUrl) {
        const urlValue = searchParams.get(filter.key);
        if (urlValue !== null) {
          filters[filter.key] = filter.type === 'number' ? parseFloat(urlValue) : urlValue;
        } else if (filter.defaultValue !== undefined) {
          filters[filter.key] = filter.defaultValue;
        }
      } else {
        if (filter.defaultValue !== undefined) {
          filters[filter.key] = filter.defaultValue;
        }
      }
    });
    
    return filters;
  }, [config, searchParams, syncWithUrl]);

  const [filters, setFilters] = useState<Record<string, any>>(getInitialFilters);

  // Atualiza URL quando filtros mudam
  const updateUrl = useCallback(
    (newFilters: Record<string, any>) => {
      if (!syncWithUrl) return;

      const params = new URLSearchParams();
      
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.set(key, String(value));
        }
      });

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      
      router.replace(newUrl, { scroll: false });
    },
    [syncWithUrl, pathname, router]
  );

  const updateFilter = useCallback(
    (key: string, value: any) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        updateUrl(newFilters);
        return newFilters;
      });
    },
    [updateUrl]
  );

  const clearFilters = useCallback(() => {
    const clearedFilters: Record<string, any> = {};
    config.forEach((filter) => {
      if (filter.defaultValue !== undefined) {
        clearedFilters[filter.key] = filter.defaultValue;
      }
    });
    
    setFilters(clearedFilters);
    updateUrl(clearedFilters);
  }, [config, updateUrl]);

  // Sincroniza com mudanças na URL (navegação do browser)
  useEffect(() => {
    if (syncWithUrl) {
      const urlFilters = getInitialFilters();
      setFilters(urlFilters);
    }
  }, [searchParams, syncWithUrl, getInitialFilters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    setFilters: (newFilters: Record<string, any>) => {
      setFilters(newFilters);
      updateUrl(newFilters);
    },
  };
}

/**
 * Debounce hook para inputs de texto
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
