"use client";

import { cn } from '@/utils/cn';

interface Props {
  isActive: boolean;
}

export function AssinaturaStatusBadge({ isActive }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
        isActive
          ? 'bg-violet-50 text-violet-700 ring-violet-200'
          : 'bg-neutral-100 text-neutral-500 ring-neutral-200'
      )}
    >
      {isActive ? 'Ativa' : 'Inativa'}
    </span>
  );
}
