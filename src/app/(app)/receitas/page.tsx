"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListLayout } from '@/layouts';
import { Button, IconPlus } from '@/components/ui';
import { getReceitas } from '@/services/Receitas/receitas.service';
import { Receita, ListReceitasQuery } from '@/services/Receitas/receitas.types';
import { useMinimumDelay } from '@/hooks/useMinimumDelay';
import Filter from './_components/Filter';
import ReceitaCard from './_components/ReceitaCard';
import { ReceitaListSkeleton } from './_components/ReceitaCardSkeleton';

function ReceitasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const withMinimumDelay = useMinimumDelay(500);

  useEffect(() => {
    const query: ListReceitasQuery = {};
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;
    if (category) query.category = Number(category);

    setLoading(true);
    withMinimumDelay(getReceitas(query))
      .then((result) => setReceitas(result.items))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <ListLayout
      title="Receitas"
      actions={
        <Button onClick={() => router.push('/receitas/cadastrar')}>
          <IconPlus size={14} />
          Nova Receita
        </Button>
      }
      filters={<Filter />}
    >
      {loading ? (
        <ReceitaListSkeleton />
      ) : receitas.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
          Nenhuma receita encontrada.
        </div>
      ) : (
        receitas.map((receita) => (
          <ReceitaCard
            key={receita.id}
            receita={receita}
            onEdit={() => router.push(`/receitas/editar/${receita.id}`)}
          />
        ))
      )}
    </ListLayout>
  );
}

export default function ReceitasPage() {
  return (
    <Suspense>
      <ReceitasContent />
    </Suspense>
  );
}
