"use client";

import { FormLayout } from '@/layouts';
import { DespesaForm } from '../_components/despesa-form';
import { ROUTES } from '@/constants/routes';

export default function CadastrarDespesaPage() {
  return (
    <FormLayout title="Nova Despesa" backUrl={ROUTES.DESPESAS.LIST}>
      <DespesaForm mode="create" />
    </FormLayout>
  );
}
