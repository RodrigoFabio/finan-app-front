import { z } from 'zod';

export const AssinaturaSchema = z.object({
  description: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(3, 'Mínimo 3 caracteres')
    .max(100),
  amount: z.coerce
    .number({ invalid_type_error: 'Informe um valor válido' })
    .positive('O valor deve ser positivo'),
  billingDay: z.coerce
    .number({ invalid_type_error: 'Informe um dia válido' })
    .int()
    .min(1, 'Mínimo dia 1')
    .max(31, 'Máximo dia 31'),
  type: z.coerce
    .number({ invalid_type_error: 'Selecione um tipo' })
    .int(),
  category: z.coerce
    .number({ invalid_type_error: 'Selecione uma categoria' })
    .int(),
  isActive: z.boolean().default(true),
});

export type AssinaturaFormValues = z.infer<typeof AssinaturaSchema>;

export const assinaturaTipos = [
  { value: 1, label: 'Mensal' },
  { value: 2, label: 'Anual' },
  { value: 3, label: 'Semanal' },
] as const;

export const assinaturaCategorias = [
  { value: 1, label: 'Streaming' },
  { value: 2, label: 'Software' },
  { value: 3, label: 'Academia' },
  { value: 4, label: 'Educação' },
  { value: 5, label: 'Notícias' },
  { value: 6, label: 'Outros' },
] as const;
