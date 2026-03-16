import { ReactNode } from 'react';

export interface DashboardSection {
  id: string;
  title?: string;
  content: ReactNode;
  className?: string;
}

export interface DashboardLayoutProps {
  title?: string;
  sections?: DashboardSection[];
  children?: ReactNode;
  className?: string;
}
