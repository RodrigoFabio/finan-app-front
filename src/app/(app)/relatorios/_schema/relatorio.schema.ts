import { z } from 'zod';

export const RelatorioFiltroSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type RelatorioFiltroValues = z.infer<typeof RelatorioFiltroSchema>;
