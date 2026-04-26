"use client";

import { useMemo } from 'react';

interface DadosGrafico {
  label: string;
  receitas: number;
  despesas: number;
}

interface Props {
  dados: DadosGrafico[];
}

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export function GraficoBarras({ dados }: Props) {
  const maxValue = useMemo(() => {
    if (dados.length === 0) return 0;
    return Math.max(
      ...dados.flatMap((d) => [d.receitas, d.despesas])
    );
  }, [dados]);

  if (dados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-neutral-600">Sem dados para o período</p>
        <p className="text-xs text-neutral-400 mt-1">Selecione um período com transações</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 h-64 px-4">
        {dados.map((item) => {
          const receitasHeight = maxValue > 0 ? (item.receitas / maxValue) * 100 : 0;
          const despesasHeight = maxValue > 0 ? (item.despesas / maxValue) * 100 : 0;

          return (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex gap-1 items-end h-48">
                {/* Barra Receitas */}
                <div className="flex-1 relative group">
                  <div
                    className="w-full bg-emerald-500 rounded-t transition-all duration-300 hover:bg-emerald-600"
                    style={{ height: `${receitasHeight}%`, minHeight: item.receitas > 0 ? '4px' : '0' }}
                  />
                  {item.receitas > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                      {fmt(item.receitas)}
                    </div>
                  )}
                </div>

                {/* Barra Despesas */}
                <div className="flex-1 relative group">
                  <div
                    className="w-full bg-rose-500 rounded-t transition-all duration-300 hover:bg-rose-600"
                    style={{ height: `${despesasHeight}%`, minHeight: item.despesas > 0 ? '4px' : '0' }}
                  />
                  {item.despesas > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                      {fmt(item.despesas)}
                    </div>
                  )}
                </div>
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-neutral-600">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-xs text-neutral-600">Receitas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-500" />
          <span className="text-xs text-neutral-600">Despesas</span>
        </div>
      </div>
    </div>
  );
}
