import { z } from 'zod';

export const ReceitaSchema = z.object({
  description: z
    .string('Descrição é obrigatória')
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  amount: z.coerce
    .number('Informe um valor válido')
    .positive('O valor deve ser positivo'),
  date: z.string('Data é obrigatória').min(1, 'Data é obrigatória'),
  category: z.coerce
    .number('Selecione uma categoria')
    .int(),
  notes: z.string().max(300, 'Máximo 300 caracteres').optional(),
});

export type ReceitaFormValues = z.infer<typeof ReceitaSchema>;

export const receitaCategorias = [
  { value: 1,  label: 'Salário Fixo' },
  { value: 2,  label: 'Renda Extra' },
  { value: 3,  label: 'Dividendos' },
  { value: 4,  label: 'Bônus' },
  { value: 99, label: 'Outros' },
] as const;
