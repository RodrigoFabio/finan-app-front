"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormReceita } from '../../_components/form';
import { getReceitaById } from '@/services/Receitas/receitas.service';
import type { Receita } from '@/services/Receitas/receitas.types';

export default function EditarReceitaPage() {
  const { id } = useParams<{ id: string }>();
  const [receita, setReceita] = useState<Receita | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getReceitaById(id);
        if (data) {
          setReceita(data);
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
          <div className="w-10 h-10 bg-emerald-200 rounded-full" />
          <p className="text-sm text-neutral-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (notFound || !receita) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm font-medium text-neutral-600">Receita não encontrada</p>
      </div>
    );
  }

  return (
    <FormLayout title="Editar Receita" backUrl={ROUTES.RECEITAS.LIST}>
      <FormReceita receita={receita} isEditMode />
    </FormLayout>
  );
}
