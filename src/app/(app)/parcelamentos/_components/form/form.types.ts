import type { Parcelamento } from '@/services/Parcelamentos/parcelamentos.types';

export interface FormParcelamentoProps {
  parcelamento?: Parcelamento;
  isEditMode?: boolean;
}
