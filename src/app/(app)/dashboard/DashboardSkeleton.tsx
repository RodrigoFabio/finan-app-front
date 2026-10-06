import { Skeleton } from '@/components/ui';

/**
 * Skeleton da página de Dashboard, espelhando o layout de DashboardPageContent:
 * header, KPI cards, lista de receitas recentes, categorias e resumo rápido.
 */
export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton className="h-3 w-16 mt-3" />
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Receitas Recentes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="divide-y divide-neutral-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col gap-4">
          {/* Por Categoria */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
            <Skeleton className="h-4 w-28 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Rápido */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
            <Skeleton className="h-4 w-20 mb-3" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
