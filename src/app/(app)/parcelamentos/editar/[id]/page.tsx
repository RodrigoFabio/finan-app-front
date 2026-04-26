"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormParcelamento } from '../../_components/form';
import { getParcelamentoById } from '@/services/Parcelamentos/parcelamentos.service';
import type { Parcelamento } from '@/services/Parcelamentos/parcelamentos.types';

export default function EditarParcelamentoPage() {
  const { id } = useParams<{ id: string }>();
  const [parcelamento, setParcelamento] = useState<Parcelamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getParcelamentoById(id);
        if (data) {
          setParcelamento(data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 rounded-full" />
          <p className="text-sm text-neutral-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (notFound || !parcelamento) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm font-medium text-neutral-600">Parcelamento não encontrado</p>
      </div>
    );
  }

  return (
    <FormLayout title="Editar Parcelamento" backUrl={ROUTES.PARCELAMENTOS.LIST}>
      <FormParcelamento parcelamento={parcelamento} isEditMode />
    </FormLayout>
  );
}
