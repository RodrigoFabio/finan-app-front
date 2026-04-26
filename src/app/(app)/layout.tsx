'use client';

import { Sidebar } from '@/app/_components/SiderBar';

// O middleware já bloqueia acesso não autenticado antes de chegar aqui.
// Não há necessidade de guard client-side — elimina a race condition
// que causava tela branca ao navegar após o login.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
