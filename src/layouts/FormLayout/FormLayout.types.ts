import { ReactNode } from 'react';

export interface FormLayoutProps {
  title: string;
  backUrl?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  onBack?: () => void;
}
