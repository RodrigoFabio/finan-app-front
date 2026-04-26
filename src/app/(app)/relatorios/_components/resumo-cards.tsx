"use client";

import { cn } from '@/utils/cn';

interface ResumoFinanceiro {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface Props {
  resumo: ResumoFinanceiro | null;
}

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export function ResumoCards({ resumo }: Props) {
  if (!resumo) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 rounded-xl h-28 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card Receitas */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-neutral-500 mb-1">Receitas</p>
        <p className="text-2xl font-bold text-emerald-600">{fmt(resumo.totalReceitas)}</p>
      </div>

      {/* Card Despesas */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 13l-5 5m0 0l-5-5m5 5V6"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-neutral-500 mb-1">Despesas</p>
        <p className="text-2xl font-bold text-rose-600">{fmt(resumo.totalDespesas)}</p>
      </div>

      {/* Card Saldo */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              resumo.saldo >= 0 ? 'bg-sky-100' : 'bg-rose-100'
            )}
          >
            <svg
              className={cn(
                'w-5 h-5',
                resumo.saldo >= 0 ? 'text-sky-600' : 'text-rose-600'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-neutral-500 mb-1">Saldo do Período</p>
        <p
          className={cn(
            'text-2xl font-bold',
            resumo.saldo >= 0 ? 'text-sky-600' : 'text-rose-600'
          )}
        >
          {fmt(resumo.saldo)}
        </p>
      </div>
    </div>
  );
}
