import type { Assinatura } from '@/services/Assinaturas/assinaturas.types';

export interface FormAssinaturaProps {
  assinatura?: Assinatura;
  isEditMode?: boolean;
}
