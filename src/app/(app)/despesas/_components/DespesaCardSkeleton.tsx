import { Skeleton } from '@/components/ui';

/**
 * Skeleton de uma linha da lista de despesas, espelhando o layout do DespesaCard.
 */
export default function DespesaCardSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    </div>
  );
}

export function DespesaListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <DespesaCardSkeleton key={i} />
      ))}
    </>
  );
}
