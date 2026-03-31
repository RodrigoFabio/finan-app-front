"use client";

import { FormLayout } from '@/layouts';
import { ParcelamentoForm } from '../_components/parcelamento-form';
import { ROUTES } from '@/constants/routes';

export default function CadastrarParcelamentoPage() {
  return (
    <FormLayout title="Novo Parcelamento" backUrl={ROUTES.PARCELAMENTOS.LIST}>
      <ParcelamentoForm mode="create" />
    </FormLayout>
  );
}
