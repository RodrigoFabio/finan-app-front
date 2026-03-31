"use client";

import { FormLayout } from '@/layouts';
import { Button } from '@/components/ui';
import { useAppNavigation } from '@/routing/navigation';
import { ROUTES } from '@/constants/routes';
import { getDespesaById } from '@/services/Despesas/despesas.service';
import { DespesaForm } from '../../_components/despesa-form';
import { useState, useEffect } from 'react';
import type { Despesa } from '@/services/Despesas/despesas.types';

export default function EditarDespesaPage({ params }: { params: { id: string } }) {
  const nav = useAppNavigation();
  const [despesa, setDespesa] = useState<Despesa | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadDespesa = async () => {
      try {
        setLoading(true);
        const data = await getDespesaById(params.id);
        if (data) {
          setDespesa(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Erro ao carregar despesa:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadDespesa();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-rose-200 rounded-full"></div>
          <p className="text-sm text-neutral-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (notFound || !despesa) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-600">Despesa não encontrada</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => nav.goToDespesas()}
          >
            Voltar para Despesas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormLayout title="Editar Despesa" backUrl={ROUTES.DESPESAS.LIST}>
      <DespesaForm
        mode="edit"
        initialData={{
          description: despesa.description,
          amount: despesa.amount,
          date: despesa.date,
          category: despesa.category,
          notes: despesa.notes,
        }}
        id={params.id}
      />
    </FormLayout>
  );
}
