import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormAssinatura } from '../_components/form';

export default function CadastrarAssinaturaPage() {
  return (
    <FormLayout title="Nova Assinatura" backUrl={ROUTES.ASSINATURAS.LIST}>
      <FormAssinatura isEditMode={false} />
    </FormLayout>
  );
}
