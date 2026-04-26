import { Assinatura } from '@/services/Assinaturas/assinaturas.types';
import { AssinaturaStatusBadge } from './assinatura-status-badge';
import { IconPencil } from '@/components/ui';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

// Frequência da assinatura: 1=Mensal, 2=Anual, 3=Semanal
const typeLabels: Record<number, string> = {
  1: 'Mensal',
  2: 'Anual',
  3: 'Semanal',
};

// Categorias específicas de assinaturas
const categoryLabels: Record<number, string> = {
  1:  'Streaming',
  2:  'Música',
  3:  'Academia',
  4:  'Software',
  5:  'Educação',
  6:  'Notícias',
  7:  'Saúde',
  8:  'Jogos',
  9:  'Serviços',
  99: 'Outros',
};

interface AssinaturaCardProps {
  assinatura: Assinatura;
  onClick?: () => void;
  onEdit?: () => void;
}

export default function AssinaturaCard({ assinatura, onClick, onEdit }: AssinaturaCardProps) {
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
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-1.5 rounded-md text-neutral-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            title="Editar"
          >
            <IconPencil size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
