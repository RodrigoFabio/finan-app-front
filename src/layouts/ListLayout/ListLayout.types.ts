import { ReactNode } from 'react';

export interface ListLayoutProps {
  title: string;
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
  pagination?: ReactNode;
  className?: string;
}
