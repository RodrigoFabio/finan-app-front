import { z } from 'zod';

export const DespesaSchema = z.object({
  description: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  amount: z.coerce
    .number({ invalid_type_error: 'Informe um valor válido' })
    .positive('O valor deve ser positivo'),
  date: z.string({ required_error: 'Data é obrigatória' }).min(1, 'Data é obrigatória'),
  category: z.coerce
    .number({ invalid_type_error: 'Selecione uma categoria' })
    .int(),
  notes: z.string().max(300, 'Máximo 300 caracteres').optional(),
});

export type DespesaFormValues = z.infer<typeof DespesaSchema>;

export const despesaCategorias = [
  { value: 1, label: 'Alimentação' },
  { value: 2, label: 'Transporte' },
  { value: 3, label: 'Moradia' },
  { value: 4, label: 'Saúde' },
  { value: 5, label: 'Educação' },
  { value: 6, label: 'Lazer' },
  { value: 7, label: 'Outros' },
] as const;
