import { cn } from '@/utils/cn';

export interface SkeletonProps {
  className?: string;
}

/**
 * Bloco base de skeleton com efeito de "pulse".
 * Use `className` para controlar largura, altura, formato (rounded-full, rounded-lg, etc).
 */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200', className)}
      aria-hidden="true"
    />
  );
}
