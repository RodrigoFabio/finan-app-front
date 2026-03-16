import { ReactNode } from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'kpi';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
