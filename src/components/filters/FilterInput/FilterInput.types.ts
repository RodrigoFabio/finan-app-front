import { FilterConfig } from '../FilterBar/FilterBar.types';

export interface FilterInputProps {
  filter: FilterConfig;
  value: any;
  onChange: (value: any) => void;
  className?: string;
}
