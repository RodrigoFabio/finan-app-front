"use client";

import { useState, useMemo } from 'react';
import { Input, Button } from '@/components/ui';
import { ResumoCards } from './_components/resumo-cards';
import { GraficoBarras } from './_components/grafico-barras';
import { getResumoFinanceiro, getTransacoesPorPeriodo } from '@/services/Relatorios/relatorios.service';
import type { Transacao } from '@/services/Relatorios/relatorios.types';
import { cn } from '@/utils/cn';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export default function RelatoriosPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [resumo, setResumo] = useState<any>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    try {
      const resumoData = await getResumoFinanceiro({ startDate, endDate });
      const transacoesData = await getTransacoesPorPeriodo({ startDate, endDate });
      setResumo(resumoData);
      setTransacoes(transacoesData.data);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const dadosGrafico = useMemo(() => {
    if (!transacoes || transacoes.length === 0) return [];

    const mesesMap: Record<string, { receitas: number; despesas: number }> = {};

    transacoes.forEach((t) => {
      const date = new Date(t.date + 'T00:00:00');
      const mes = date.toLocaleDateString('pt-BR', { month: 'short' });
      const mesKey = mes.charAt(0).toUpperCase() + mes.slice(1, 3);

      if (!mesesMap[mesKey]) {
        mesesMap[mesKey] = { receitas: 0, despesas: 0 };
      }

      if (t.type === 1) {
        mesesMap[mesKey].receitas += t.amount;
      } else {
        mesesMap[mesKey].despesas += t.amount;
      }
    });

    return Object.entries(mesesMap).map(([label, valores]) => ({
      label,
      receitas: valores.receitas,
      despesas: valores.despesas,
    }));
  }, [transacoes]);

  const ultimasTransacoes = useMemo(() => {
    return transacoes.slice(0, 10);
  }, [transacoes]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-semibold text-neutral-900 font-display tracking-tight">
          Relatórios Financeiros
        </h1>
        <p className="text-sm text-neutral-500 mt-1">Acompanhe sua saúde financeira</p>
      </div>

      {/* Filtro de Período */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-neutral-700 mb-4 border-l-4 border-sky-500 pl-3">
          Período de Análise
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="De"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="Até"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="flex items-end">
            <Button
              onClick={handleApply}
              isLoading={loading}
              className="bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 h-10"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-4 border-l-4 border-sky-500 pl-3">
          Resumo Financeiro
        </h2>
        <ResumoCards resumo={resumo} />
      </section>

      {/* Gráfico */}
      {resumo && (
        <section>
          <h2 className="text-sm font-semibold text-neutral-700 mb-4 border-l-4 border-sky-500 pl-3">
            Receitas vs Despesas por Mês
          </h2>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-3">
                  <div className="w-10 h-10 bg-sky-200 rounded-full"></div>
                  <p className="text-sm text-neutral-500">Carregando gráfico...</p>
                </div>
              </div>
            ) : (
              <GraficoBarras dados={dadosGrafico} />
            )}
          </div>
        </section>
      )}

      {/* Últimas Transações */}
      {resumo && ultimasTransacoes.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-neutral-700 mb-4 border-l-4 border-sky-500 pl-3">
            Últimas 10 Transações
          </h2>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {ultimasTransacoes.map((t, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
                          t.type === 1
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                            : 'bg-rose-50 text-rose-700 ring-rose-200'
                        )}
                      >
                        {t.type === 1 ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-700">{t.description}</td>
                    <td
                      className={cn(
                        'px-4 py-3 text-sm font-semibold text-right',
                        t.type === 1 ? 'text-emerald-600' : 'text-rose-600'
                      )}
                    >
                      {fmt(t.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-500">
                      {new Date(t.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
