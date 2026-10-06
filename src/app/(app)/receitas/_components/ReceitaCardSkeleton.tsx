import { Skeleton } from '@/components/ui';

/**
 * Skeleton de uma linha da lista de receitas, espelhando o layout do ReceitaCard.
 */
export default function ReceitaCardSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    </div>
  );
}

export function ReceitaListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <ReceitaCardSkeleton key={i} />
      ))}
    </>
  );
}
