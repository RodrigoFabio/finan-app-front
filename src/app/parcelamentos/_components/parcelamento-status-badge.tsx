"use client";

import { cn } from '@/utils/cn';

type ParcelamentoStatus = 'active' | 'cancelled' | 'completed';

interface Props {
  status: ParcelamentoStatus;
}

const statusConfig: Record<ParcelamentoStatus, { label: string; className: string }> = {
  active: {
    label: 'Ativo',
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
  completed: {
    label: 'Concluído',
    className: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
};

export function ParcelamentoStatusBadge({ status }: Props) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
