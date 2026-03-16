"use client";

import Link from 'next/link';
import { getReceitas } from '@/services/Receitas/receitas.service';
import { KpiCard } from '@/app/_components/KpiCard/KpiCard';
import { Button, IconPlus, IconTrendingUp, IconTrendingDown, IconWallet, IconCalendar } from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const fmtDate = (val: string) =>
  new Date(val + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

const categoryColors: Record<string, string> = {
  'Salário':       'bg-success-100 text-success-700',
  'Freelance':     'bg-primary-100 text-primary-700',
  'Investimentos': 'bg-info-100 text-info-700',
  'Renda extra':   'bg-warning-100 text-warning-700',
  'Outros':        'bg-neutral-100 text-neutral-600',
};

export default function DashboardPageContent() {
  const receitas = getReceitas();
  const totalReceitas = receitas.reduce((sum, r) => sum + r.valor, 0);
  const totalDespesas = 3240.50;
  const saldo = totalReceitas - totalDespesas;
  const totalParcelamentos = 850.00;

  // Agrupamento por categoria
  const porCategoria = receitas.reduce<Record<string, number>>((acc, r) => {
    acc[r.categoria] = (acc[r.categoria] || 0) + r.valor;
    return acc;
  }, {});

  const receitasRecorrentes = receitas.filter(r => r.isRecorrente).length;
  const recentReceitas = [...receitas].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 4);

  const now = new Date();
  const monthName = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-display tracking-tight">
            Visão Geral
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5 capitalize">{monthName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={ROUTES.RECEITAS.CREATE}>
            <Button size="sm" variant="outline">
              <IconPlus size={14} />
              Receita
            </Button>
          </Link>
          <Link href={ROUTES.DESPESAS.CREATE}>
            <Button size="sm">
              <IconPlus size={14} />
              Despesa
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
        <KpiCard
          title="Receitas"
          value={fmt(totalReceitas)}
          subtitle={`${receitas.length} entradas`}
          trendText="Este mês"
          trendUp={true}
          Icon={IconTrendingUp}
          TrendIcon={IconTrendingUp}
          iconBgClass="bg-success-100"
          iconColorClass="text-success-600"
          trendColorClass="text-success-600"
        />
        <KpiCard
          title="Despesas"
          value={fmt(totalDespesas)}
          subtitle="Total de saídas"
          trendText="Este mês"
          trendUp={false}
          Icon={IconTrendingDown}
          TrendIcon={IconTrendingDown}
          iconBgClass="bg-error-100"
          iconColorClass="text-error-600"
          trendColorClass="text-error-600"
        />
        <KpiCard
          title="Saldo"
          value={fmt(saldo)}
          subtitle="Receitas − Despesas"
          trendText={saldo >= 0 ? 'Positivo' : 'Negativo'}
          trendUp={saldo >= 0}
          Icon={IconWallet}
          TrendIcon={saldo >= 0 ? IconTrendingUp : IconTrendingDown}
          iconBgClass="bg-primary-100"
          iconColorClass="text-primary-600"
          trendColorClass={saldo >= 0 ? 'text-success-600' : 'text-error-600'}
        />
        <KpiCard
          title="Parcelamentos"
          value={fmt(totalParcelamentos)}
          subtitle="Pendentes"
          trendText="A vencer"
          Icon={IconCalendar}
          TrendIcon={IconCalendar}
          iconBgClass="bg-warning-100"
          iconColorClass="text-warning-600"
          trendColorClass="text-warning-600"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Transações Recentes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-800">Receitas Recentes</h2>
            <Link href={ROUTES.RECEITAS.LIST}>
              <span className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Ver todas →
              </span>
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {recentReceitas.map((receita) => (
              <div
                key={receita.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-neutral-50/60 transition-colors duration-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center flex-shrink-0">
                    <IconTrendingUp className="text-success-600" size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {receita.descricao}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium',
                        categoryColors[receita.categoria] || 'bg-neutral-100 text-neutral-600'
                      )}>
                        {receita.categoria}
                      </span>
                      {receita.isRecorrente && (
                        <span className="text-xs text-neutral-400">· Recorrente</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-neutral-400">{fmtDate(receita.data)}</span>
                  <span className="text-sm font-semibold text-success-600">
                    +{fmt(receita.valor)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col gap-4 animate-slide-in-left" style={{ animationDelay: '100ms' }}>

          {/* Por Categoria */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-neutral-800 mb-4">Por Categoria</h2>
            <div className="space-y-3">
              {Object.entries(porCategoria).map(([cat, total]) => {
                const pct = Math.round((total / totalReceitas) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-neutral-600">{cat}</span>
                      <span className="text-xs font-semibold text-neutral-800">{fmt(total)}</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-400 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">{pct}% do total</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumo Rápido */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-neutral-800 mb-3">Resumo</h2>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">Entradas recorrentes</span>
                <span className="text-xs font-semibold text-neutral-700">
                  {receitasRecorrentes} de {receitas.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">Maior receita</span>
                <span className="text-xs font-semibold text-neutral-700">
                  {fmt(Math.max(...receitas.map(r => r.valor)))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">Média por entrada</span>
                <span className="text-xs font-semibold text-neutral-700">
                  {fmt(totalReceitas / receitas.length)}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-neutral-700">Total Receitas</span>
                  <span className="text-sm font-bold text-success-600">{fmt(totalReceitas)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
