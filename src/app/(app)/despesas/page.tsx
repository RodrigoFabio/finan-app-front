"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListLayout } from '@/layouts';
import { Button, IconPlus } from '@/components/ui';
import { getDespesas } from '@/services/Despesas/despesas.service';
import { Despesa, ListDespesasQuery } from '@/services/Despesas/despesas.types';
import Filter from './_components/Filter';
import DespesaCard from './_components/DespesaCard';

function DespesasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query: ListDespesasQuery = {};
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;
    if (category) query.category = Number(category);

    setLoading(true);
    getDespesas(query)
      .then((result) => setDespesas(result.items))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <ListLayout
      title="Despesas"
      actions={
        <Button
          onClick={() => router.push('/despesas/cadastrar')}
          className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500"
        >
          <IconPlus size={14} />
          Nova Despesa
        </Button>
      }
      filters={<Filter />}
    >
      {loading ? (
        <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
          Carregando...
        </div>
      ) : despesas.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
          Nenhuma despesa encontrada.
        </div>
      ) : (
        despesas.map((despesa) => (
          <DespesaCard
            key={despesa.id}
            despesa={despesa}
            onEdit={() => router.push(`/despesas/editar/${despesa.id}`)}
          />
        ))
      )}
    </ListLayout>
  );
}

export default function DespesasPage() {
  return (
    <Suspense>
      <DespesasContent />
    </Suspense>
  );
}
