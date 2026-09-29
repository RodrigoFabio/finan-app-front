import type { Metadata } from 'next';
import { ClientProviders } from './_components/ClientProviders';
import './globals.css';

export const metadata: Metadata = {
  title: 'AppFinanças',
  description: 'Controle financeiro pessoal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-50 font-sans antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
