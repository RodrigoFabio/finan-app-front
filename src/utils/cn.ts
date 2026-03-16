import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes Tailwind com resolução de conflitos
 * Usa clsx para lógica condicional + tailwind-merge para deduplicação
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
