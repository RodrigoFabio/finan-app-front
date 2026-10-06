import { Skeleton } from '@/components/ui';

/**
 * Skeleton de uma linha da lista de parcelamentos, espelhando o layout do ParcelamentoCard.
 */
export default function ParcelamentoCardSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 last:border-b-0">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-44" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col items-end gap-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-7 w-16 rounded-md" />
      </div>
    </div>
  );
}

export function ParcelamentoListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <ParcelamentoCardSkeleton key={i} />
      ))}
    </>
  );
}
