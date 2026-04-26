"use client";

import { cn } from '@/utils/cn';


export type PropsConfig = {
  status: string,
  label: string,
  className: string
}

const statusConfig: PropsConfig[] = [
 {
    status: 'active',
    label: 'Ativo',
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  {
    status: 'cancelled',
    label: 'Cancelado',
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
   {
    status: 'completed',
    label: 'Concluído',
    className: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
];

export function ParcelamentoStatusBadge({status}:{status:string} ){
  const config = statusConfig.find(x => x.status = status)
  console.log(config)
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
        config?.className
      )}
    >
      {config?.label}
    </span>
  );
}
