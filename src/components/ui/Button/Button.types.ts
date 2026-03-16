import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIntent = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  intent?: ButtonIntent;
  fullWidth?: boolean;
  children: ReactNode;
  isLoading?: boolean;
}
