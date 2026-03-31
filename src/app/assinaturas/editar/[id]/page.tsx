"use client";

import { FormLayout } from '@/layouts';
import { Button } from '@/components/ui';
import { useAppNavigation } from '@/routing/navigation';
import { ROUTES } from '@/constants/routes';
import { getAssinaturaById } from '@/services/Assinaturas/assinaturas.service';
import { AssinaturaForm } from '../../_components/assinatura-form';
import { useState, useEffect } from 'react';
import type { Assinatura } from '@/services/Assinaturas/assinaturas.types';

export default function EditarAssinaturaPage({ params }: { params: { id: string } }) {
  const nav = useAppNavigation();
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadAssinatura = async () => {
      try {
        setLoading(true);
        const data = await getAssinaturaById(params.id);
        if (data) {
          setAssinatura(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Erro ao carregar assinatura:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadAssinatura();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-violet-200 rounded-full"></div>
          <p className="text-sm text-neutral-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (notFound || !assinatura) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-600">Assinatura não encontrada</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => nav.goToAssinaturas()}
          >
            Voltar para Assinaturas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormLayout title="Editar Assinatura" backUrl={ROUTES.ASSINATURAS.LIST}>
      <AssinaturaForm
        mode="edit"
        initialData={{
          description: assinatura.description,
          amount: assinatura.amount,
          billingDay: assinatura.billingDay,
          type: assinatura.type,
          category: assinatura.category,
          isActive: assinatura.isActive,
        }}
        id={params.id}
      />
    </FormLayout>
  );
}
