import { z } from 'zod';

export const DespesaSchema = z.object({
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

export type DespesaFormValues = z.infer<typeof DespesaSchema>;

// Alinhado com ExpenseCategory do backend
export const despesaCategorias = [
  { value: 1,  label: 'Alimentação' },
  { value: 2,  label: 'Saúde' },
  { value: 3,  label: 'Combustível' },
  { value: 4,  label: 'Farmácia' },
  { value: 5,  label: 'Transporte' },
  { value: 6,  label: 'Moradia' },
  { value: 7,  label: 'Lazer' },
  { value: 8,  label: 'Educação' },
  { value: 9,  label: 'Acessórios' },
  { value: 10, label: 'Roupas' },
  { value: 99, label: 'Outros' },
] as const;
