import { InputSize, InputIntent } from './Input.types';
import { cn } from '@/utils/cn';

export function getInputClasses(
  size: InputSize = 'md',
  intent: InputIntent = 'default'
): string {
  const baseClasses = [
    'w-full rounded-lg border bg-white',
    'text-neutral-900 placeholder:text-neutral-400',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50',
  ].join(' ');

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3.5 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const intentClasses = {
    default: 'border-neutral-300 focus:border-primary-400 focus:ring-primary-400/20',
    success: 'border-success-300 focus:border-success-500 focus:ring-success-400/20',
    error: 'border-error-300 focus:border-error-500 focus:ring-error-400/20 bg-error-50/30',
    warning: 'border-warning-300 focus:border-warning-500 focus:ring-warning-400/20',
    info: 'border-info-300 focus:border-info-500 focus:ring-info-400/20',
  };

  return cn(baseClasses, sizeClasses[size], intentClasses[intent]);
}
