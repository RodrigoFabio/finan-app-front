import { z } from 'zod';

export const ParcelamentoSchema = z.object({
  description: z
    .string('Descrição é obrigatória')
    .min(3, 'Mínimo 3 caracteres')
    .max(100),
  totalAmount: z.coerce
    .number('Informe um valor válido')
    .positive('O valor deve ser positivo'),
  totalInstallments: z.coerce
    .number('Informe um número válido')
    .int()
    .min(2, 'Mínimo 2 parcelas')
    .max(48, 'Máximo 48 parcelas'),
  startDate: z.string('Data de início é obrigatória').min(1),
  category: z.coerce
    .number('Selecione uma categoria')
    .int(),
});

export type ParcelamentoFormValues = z.infer<typeof ParcelamentoSchema>;

export const parcelamentoCategorias = [
  { value: 1, label: 'Eletrônicos' },
  { value: 2, label: 'Eletrodomésticos' },
  { value: 3, label: 'Móveis' },
  { value: 4, label: 'Vestuário' },
  { value: 5, label: 'Serviços' },
  { value: 6, label: 'Outros' },
] as const;
