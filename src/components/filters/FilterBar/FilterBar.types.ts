export type FilterType = 'text' | 'date' | 'select' | 'number' | 'range';

export interface FilterOption {
  value: string | number;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  defaultValue?: string | number | null;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface FilterBarProps {
  config: FilterConfig[];
  syncWithUrl?: boolean;
  onFiltersChange?: (filters: Record<string, any>) => void;
  className?: string;
}
