"use client";

import { FormLayoutProps } from './FormLayout.types';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { Button, IconChevronLeft } from '@/components/ui';

export default function FormLayout({
  title,
  backUrl,
  children,
  actions,
  className,
  onBack,
}: FormLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('flex flex-col gap-5 p-4 md:p-6 animate-fade-in', className)}>
      {/* Header: Voltar + Título */}
      <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-2 rounded-lg"
        >
          <IconChevronLeft size={18} />
        </Button>
        <h1 className="text-2xl font-semibold text-neutral-900 font-display tracking-tight">
          {title}
        </h1>
      </div>

      {/* Formulário + Ações em card unificado */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6">
          {children}
        </div>

        {actions && (
          <div className="flex justify-end gap-3 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
