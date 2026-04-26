import type { Receita } from '@/services/Receitas/receitas.types';

export interface FormReceitaProps {
  receita?: Receita;
  isEditMode?: boolean;
}
