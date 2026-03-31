import { Parcelamento } from '@/services/Parcelamentos/parcelamentos.types';
import { ParcelamentoStatusBadge } from './parcelamento-status-badge';
import { Button } from '@/components/ui';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const fmtDate = (val: string) =>
  new Date(val + 'T00:00:00').toLocaleDateString('pt-BR');

const categoryLabels: Record<number, string> = {
  1: 'Eletrônicos',
  2: 'Eletrodomésticos',
  3: 'Móveis',
  4: 'Vestuário',
  5: 'Serviços',
  6: 'Outros',
};

interface ParcelamentoCardProps {
  parcelamento: Parcelamento;
  onCancelar: (id: string) => void;
}

export default function ParcelamentoCard({ parcelamento, onCancelar }: ParcelamentoCardProps) {
  const installmentValue = parcelamento.totalAmount / parcelamento.totalInstallments;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-900">{parcelamento.description}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">
            {categoryLabels[parcelamento.category] ?? 'Outros'}
          </span>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs text-neutral-500">início {fmtDate(parcelamento.startDate)}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <p className="text-sm font-semibold text-amber-700">{fmt(parcelamento.totalAmount)}</p>
          <p className="text-xs text-neutral-500">
            {parcelamento.totalInstallments}x {fmt(installmentValue)}
          </p>
        </div>
        <ParcelamentoStatusBadge status={parcelamento.status} />
        {parcelamento.status === 'active' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancelar(parcelamento.id)}
            className="h-7 px-2 text-xs text-neutral-500 hover:text-rose-600 hover:bg-rose-50"
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
