import { Despesa } from '@/services/Despesas/despesas.types';
import { cn } from '@/utils/cn';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const fmtDate = (val: string) =>
  new Date(val + 'T00:00:00').toLocaleDateString('pt-BR');

const categoryLabels: Record<number, string> = {
  1: 'Alimentação',
  2: 'Transporte',
  3: 'Moradia',
  4: 'Saúde',
  5: 'Educação',
  6: 'Lazer',
  7: 'Outros',
};

interface DespesaCardProps {
  despesa: Despesa;
  onClick?: () => void;
}

export default function DespesaCard({ despesa, onClick }: DespesaCardProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-neutral-900">{despesa.description}</span>
        <span className={cn(
          'inline-flex items-center self-start px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
          'bg-rose-50 text-rose-700 ring-rose-200'
        )}>
          {categoryLabels[despesa.category] ?? 'Outros'}
        </span>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <span className="text-xs text-neutral-500">{fmtDate(despesa.date)}</span>
        <span className="text-sm font-semibold text-rose-600">−{fmt(despesa.amount)}</span>
      </div>
    </div>
  );
}
