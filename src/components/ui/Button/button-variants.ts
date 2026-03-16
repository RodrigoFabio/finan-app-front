import { ButtonVariant, ButtonSize, ButtonIntent } from './Button.types';
import { cn } from '@/utils/cn';

export function getButtonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  intent: ButtonIntent = 'default'
): string {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ].join(' ');

  const variantClasses = {
    primary: [
      'bg-primary-500 text-white shadow-sm',
      'hover:bg-primary-600 hover:shadow-md',
      'active:bg-primary-700 active:shadow-none active:scale-[0.98]',
    ].join(' '),
    secondary: [
      'bg-neutral-800 text-white shadow-sm',
      'hover:bg-neutral-700 hover:shadow-md',
      'active:bg-neutral-900 active:scale-[0.98]',
    ].join(' '),
    outline: [
      'border border-neutral-300 bg-white text-neutral-700',
      'hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50',
      'active:bg-primary-100 active:scale-[0.98]',
    ].join(' '),
    ghost: [
      'text-neutral-600 bg-transparent',
      'hover:bg-neutral-100 hover:text-neutral-900',
      'active:bg-neutral-200 active:scale-[0.98]',
    ].join(' '),
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const intentClasses = {
    default: '',
    success: 'bg-success-500 hover:bg-success-600 active:bg-success-700 text-white shadow-sm',
    error: 'bg-error-500 hover:bg-error-600 active:bg-error-700 text-white shadow-sm',
    warning: 'bg-warning-500 hover:bg-warning-600 active:bg-warning-700 text-white shadow-sm',
    info: 'bg-info-500 hover:bg-info-600 active:bg-info-700 text-white shadow-sm',
  };

  if (intent !== 'default') {
    return cn(baseClasses, sizeClasses[size], intentClasses[intent]);
  }

  return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
}
