"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormDespesa } from '../../_components/form';
import { getDespesaById } from '@/services/Despesas/despesas.service';
import type { Despesa } from '@/services/Despesas/despesas.types';

export default function EditarDespesaPage() {
  const { id } = useParams<{ id: string }>();
  const [despesa, setDespesa] = useState<Despesa | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDespesaById(id);
        if (data) {
          setDespesa(data);
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
          <div className="w-10 h-10 bg-rose-200 rounded-full" />
          <p className="text-sm text-neutral-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (notFound || !despesa) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm font-medium text-neutral-600">Despesa não encontrada</p>
      </div>
    );
  }

  return (
    <FormLayout title="Editar Despesa" backUrl={ROUTES.DESPESAS.LIST}>
      <FormDespesa despesa={despesa} isEditMode />
    </FormLayout>
  );
}
