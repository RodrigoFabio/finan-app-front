import { Assinatura } from '@/services/Assinaturas/assinaturas.types';
import { AssinaturaStatusBadge } from './assinatura-status-badge';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const typeLabels: Record<number, string> = {
  1: 'Mensal',
  2: 'Anual',
  3: 'Semanal',
};

const categoryLabels: Record<number, string> = {
  1: 'Streaming',
  2: 'Software',
  3: 'Academia',
  4: 'Educação',
  5: 'Notícias',
  6: 'Outros',
};

interface AssinaturaCardProps {
  assinatura: Assinatura;
  onClick?: () => void;
}

export default function AssinaturaCard({ assinatura, onClick }: AssinaturaCardProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-neutral-900">{assinatura.description}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">{categoryLabels[assinatura.category] ?? 'Outros'}</span>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs text-neutral-500">{typeLabels[assinatura.type] ?? '-'}</span>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs text-neutral-500">vence dia {assinatura.billingDay}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-sm font-semibold text-violet-700">{fmt(assinatura.amount)}</span>
        <AssinaturaStatusBadge isActive={assinatura.isActive} />
      </div>
    </div>
  );
}
