"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormAssinatura } from '../../_components/form';
import { getAssinaturaById } from '@/services/Assinaturas/assinaturas.service';
import type { Assinatura } from '@/services/Assinaturas/assinaturas.types';

export default function EditarAssinaturaPage() {
  const { id } = useParams<{ id: string }>();
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAssinaturaById(id);
        if (data) {
          setAssinatura(data);
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
          <div className="w-10 h-10 bg-violet-200 rounded-full" />
          <p className="text-sm text-neutral-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (notFound || !assinatura) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm font-medium text-neutral-600">Assinatura não encontrada</p>
      </div>
    );
  }

  return (
    <FormLayout title="Editar Assinatura" backUrl={ROUTES.ASSINATURAS.LIST}>
      <FormAssinatura assinatura={assinatura} isEditMode />
    </FormLayout>
  );
}
