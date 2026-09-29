"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListLayout } from '@/layouts';
import { Button, IconPlus } from '@/components/ui';
import { getParcelamentos, cancelarParcelamento } from '@/services/Parcelamentos/parcelamentos.service';
import { Parcelamento } from '@/services/Parcelamentos/parcelamentos.types';
import Filter from './_components/Filter';
import ParcelamentoCard from './_components/ParcelamentoCard';

function ParcelamentosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parcelamentos, setParcelamentos] = useState<Parcelamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getParcelamentos()
      .then((data) => {
        const status = searchParams.get('status');
        const startDate = searchParams.get('startDate');

        let result = [...data];
        if (status) result = result.filter((p) => p.status === status);
        if (startDate) result = result.filter((p) => p.startDate >= startDate);

        setParcelamentos(result);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  async function handleCancelar(id: string) {
    if (!window.confirm('Tem certeza que deseja cancelar este parcelamento?')) return;
    await cancelarParcelamento(id);
    setParcelamentos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'cancelled' as const } : p))
    );
  }

  return (
    <ListLayout
      title="Parcelamentos"
      actions={
        <Button
          onClick={() => router.push('/parcelamentos/cadastrar')}
          className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
        >
          <IconPlus size={14} />
          Novo Parcelamento
        </Button>
      }
      filters={<Filter />}
    >
      {loading ? (
        <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
          Carregando...
        </div>
      ) : parcelamentos.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-neutral-500">
          Nenhum parcelamento encontrado.
        </div>
      ) : (
        parcelamentos.map((parcelamento) => (
          <ParcelamentoCard
            key={parcelamento.id}
            parcelamento={parcelamento}
            onEdit={() => router.push(`/parcelamentos/editar/${parcelamento.id}`)}
            onCancelar={handleCancelar}
          />
        ))
      )}
    </ListLayout>
  );
}

export default function ParcelamentosPage() {
  return (
    <Suspense>
      <ParcelamentosContent />
    </Suspense>
  );
}
