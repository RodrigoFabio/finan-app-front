import type { Despesa } from '@/services/Despesas/despesas.types';

export interface FormDespesaProps {
  despesa?: Despesa;
  isEditMode?: boolean;
}
