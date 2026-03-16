'use client';

import { SidebarProvider } from '@/contexts/SidebarContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
