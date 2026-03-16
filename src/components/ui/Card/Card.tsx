"use client";

import { CardProps } from './Card.types';
import { cn } from '@/utils/cn';

const cardVariants = {
  default: 'bg-white border border-neutral-200 shadow-sm',
  outlined: 'bg-white border-2 border-primary-200',
  elevated: 'bg-white shadow-lg border border-neutral-100',
  kpi: 'bg-white border border-neutral-200 shadow-sm',
};

const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({
  variant = 'default',
  padding = 'md',
  children,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        cardVariants[variant],
        cardPadding[padding],
        (onClick || variant === 'kpi') && 'hover:shadow-md hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
