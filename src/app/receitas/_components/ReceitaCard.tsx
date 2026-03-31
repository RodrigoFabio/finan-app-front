import { Receita } from '@/services/Receitas/receitas.types';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const fmtDate = (val: string) =>
  new Date(val + 'T00:00:00').toLocaleDateString('pt-BR');

interface ReceitaCardProps {
  receita: Receita;
  onClick?: () => void;
}

export default function ReceitaCard({ receita, onClick }: ReceitaCardProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-neutral-900">{receita.description}</span>
        {receita.notes && (
          <span className="text-xs text-neutral-500">{receita.notes}</span>
        )}
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <span className="text-xs text-neutral-500">{fmtDate(receita.date)}</span>
        <span className="text-sm font-semibold text-success-600">{fmt(receita.amount)}</span>
      </div>
    </div>
  );
}
