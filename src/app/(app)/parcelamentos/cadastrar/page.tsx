import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormParcelamento } from '../_components/form';

export default function CadastrarParcelamentoPage() {
  return (
    <FormLayout title="Novo Parcelamento" backUrl={ROUTES.PARCELAMENTOS.LIST}>
      <FormParcelamento isEditMode={false} />
    </FormLayout>
  );
}
