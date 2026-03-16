import { ReactNode } from 'react';

export type ColumnAlign = 'left' | 'center' | 'right';

export interface ColumnConfig<T = any> {
  key: string;
  label: string;
  render?: (value: any, row: T, index: number) => ReactNode;
  format?: (value: any) => string;
  sortable?: boolean;
  width?: string | number;
  align?: ColumnAlign;
  headerAlign?: ColumnAlign;
}

export interface DataTableConfig<T = any> {
  columns: ColumnConfig<T>[];
  data: T[];
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
  };
  sortable?: boolean;
  defaultSort?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  rowKey?: (row: T, index: number) => string | number;
  className?: string;
}
