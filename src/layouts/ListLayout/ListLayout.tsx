"use client";

import { ListLayoutProps } from './ListLayout.types';
import { cn } from '@/utils/cn';

export default function ListLayout({
  title,
  actions,
  filters,
  children,
  pagination,
  className,
}: ListLayoutProps) {
  return (
    <div className={cn('flex flex-col gap-5 p-4 md:p-6 animate-fade-in', className)}>
      {/* Header: Título + Ações */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-semibold text-neutral-900 font-display tracking-tight">
          {title}
        </h1>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>

      {/* Filtros */}
      {filters && (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          {filters}
        </div>
      )}

      {/* Conteúdo: Tabela/Lista */}
      <div className="flex-1 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        {children}
      </div>

      {/* Paginação */}
      {pagination && (
        <div className="flex justify-center">{pagination}</div>
      )}
    </div>
  );
}
