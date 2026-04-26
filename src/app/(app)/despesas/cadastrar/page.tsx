import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormDespesa } from '../_components/form';

export default function CadastrarDespesaPage() {
  return (
    <FormLayout title="Nova Despesa" backUrl={ROUTES.DESPESAS.LIST}>
      <FormDespesa isEditMode={false} />
    </FormLayout>
  );
}
