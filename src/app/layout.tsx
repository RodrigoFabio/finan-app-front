import type { Metadata } from 'next';
import { DM_Sans, Syne } from 'next/font/google';
import { ClientProviders } from './_components/ClientProviders';
import { Sidebar } from './_components/SiderBar';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

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
    <html lang="pt-BR" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="bg-neutral-50 font-sans antialiased">
        <ClientProviders>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
