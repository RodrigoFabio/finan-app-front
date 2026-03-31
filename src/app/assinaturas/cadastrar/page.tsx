"use client";

import { FormLayout } from '@/layouts';
import { AssinaturaForm } from '../_components/assinatura-form';
import { ROUTES } from '@/constants/routes';

export default function CadastrarAssinaturaPage() {
  return (
    <FormLayout title="Nova Assinatura" backUrl={ROUTES.ASSINATURAS.LIST}>
      <AssinaturaForm mode="create" />
    </FormLayout>
  );
}
