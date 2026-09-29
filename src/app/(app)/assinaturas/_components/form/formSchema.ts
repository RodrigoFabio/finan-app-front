import { z } from 'zod';

export const AssinaturaSchema = z.object({
  description: z
    .string({ error: 'Descrição é obrigatória' })
    .min(3, 'Mínimo 3 caracteres')
    .max(100),
  amount: z.coerce
    .number({ error: 'Informe um valor válido' })
    .positive('O valor deve ser positivo'),
  billingDay: z.coerce
    .number({ error: 'Informe um dia válido' })
    .int()
    .min(1, 'Mínimo dia 1')
    .max(28, 'Máximo dia 28'),
  type: z.coerce
    .number({ error: 'Selecione um tipo' })
    .int()
    .refine((v) => [1, 2, 3].includes(v), 'Tipo inválido'),
  category: z.coerce
    .number({ error: 'Selecione uma categoria' })
    .int()
    .positive(),
  isActive: z.boolean().default(true),
});

export type AssinaturaFormValues = z.infer<typeof AssinaturaSchema>;

// Frequência da assinatura
export const assinaturaTipos = [
  { value: 1, label: 'Mensal' },
  { value: 2, label: 'Anual' },
  { value: 3, label: 'Semanal' },
] as const;

// Categorias específicas para assinaturas
export const assinaturaCategorias = [
  { value: 1,  label: 'Streaming (Netflix, Disney+...)' },
  { value: 2,  label: 'Música (Spotify, Deezer...)' },
  { value: 3,  label: 'Academia / Esportes' },
  { value: 4,  label: 'Software / Ferramentas' },
  { value: 5,  label: 'Educação / Cursos' },
  { value: 6,  label: 'Notícias / Mídia' },
  { value: 7,  label: 'Saúde / Bem-estar' },
  { value: 8,  label: 'Jogos' },
  { value: 9,  label: 'Serviços Contratados' },
  { value: 99, label: 'Outros' },
] as const;
