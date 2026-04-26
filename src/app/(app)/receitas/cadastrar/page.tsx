import { FormLayout } from '@/layouts';
import { ROUTES } from '@/constants/routes';
import { FormReceita } from '../_components/form';

export default function CadastrarReceitaPage() {
  return (
    <FormLayout title="Nova Receita" backUrl={ROUTES.RECEITAS.LIST}>
      <FormReceita isEditMode={false} />
    </FormLayout>
  );
}
