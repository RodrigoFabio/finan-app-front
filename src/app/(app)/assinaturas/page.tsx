"use client";

import { Suspense, useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListLayout } from '@/layouts';
import { Button, IconPlus, Skeleton } from '@/components/ui';
import { getAssinaturas } from '@/services/Assinaturas/assinaturas.service';
import { Assinatura } from '@/services/Assinaturas/assinaturas.types';
import { useMinimumDelay } from '@/hooks/useMinimumDelay';
import Filter from './_components/Filter';
import AssinaturaCard from './_components/AssinaturaCard';
import { AssinaturaListSkeleton } from './_components/AssinaturaCardSkeleton';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

function AssinaturasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([]);
  const [loading, setLoading] = useState(true);
  const withMinimumDelay = useMinimumDelay(1000);

  useEffect(() => {
    setLoading(true);
    withMinimumDelay(getAssinaturas())
      .then((data) => {
        const isActiveParam = searchParams.get('isActive');
        const typeParam = searchParams.get('type');

        let result = [...data];
        if (isActiveParam !== null && isActiveParam !== '')
          result = result.filter((a) => String(a.isActive) === isActiveParam);
        if (typeParam)
          result = result.filter((a) => a.type === Number(typeParam));

        setAssinaturas(result);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  const resumo = useMemo(() => {
    const ativas = assinaturas.filter((a) => a.isActive);
    const custoMensal = ativas
      .filter((a) => a.type === 1)
      .reduce((acc, a) => acc + a.amount, 0);
    return { ativas: ativas.length, custoMensal };
  }, [assinaturas]);

  return (
    <ListLayout
      title="Assinaturas"
      actions={
        <Button
          onClick={() => router.push('/assinaturas/cadastrar')}
          className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
        >
          <IconPlus size={14} />
          Nova Assinatura
        </Button>
      }
      filters={<Filter />}
    >
      {/* Resumo */}
      <div className="p-4 bg-violet-50 border-b border-violet-100">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div className="bg-white rounded-lg p-3 border border-violet-200 shadow-sm">
            <p className="text-xs font-medium text-violet-600 uppercase tracking-wide mb-1">
              Assinaturas Ativas
            </p>
            {loading ? (
              <Skeleton className="h-8 w-10" />
            ) : (
              <p className="text-2xl font-bold text-violet-900">{resumo.ativas}</p>
            )}
          </div>
          <div className="bg-white rounded-lg p-3 border border-violet-200 shadow-sm">
            <p className="text-xs font-medium text-violet-600 uppercase tracking-wide mb-1">
              Custo Mensal
            </p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold text-violet-900">{fmt(resumo.custoMensal)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <AssinaturaListSkeleton />
      ) : assinaturas.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
          Nenhuma assinatura encontrada.
        </div>
      ) : (
        assinaturas.map((assinatura) => (
          <AssinaturaCard
            key={assinatura.id}
            assinatura={assinatura}
            onClick={() => router.push(`/assinaturas/editar/${assinatura.id}`)}
            onEdit={() => router.push(`/assinaturas/editar/${assinatura.id}`)}
          />
        ))
      )}
    </ListLayout>
  );
}

export default function AssinaturasPage() {
  return (
    <Suspense>
      <AssinaturasContent />
    </Suspense>
  );
}
