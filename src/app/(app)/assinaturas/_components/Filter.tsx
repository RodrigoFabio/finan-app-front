"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { Button } from '@/components/ui';

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams();

    const isActive = (form.elements.namedItem('isActive') as HTMLSelectElement).value;
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value;

    if (isActive) params.set('isActive', isActive);
    if (type) params.set('type', type);

    router.push(`?${params.toString()}`);
  }

  function handleClear() {
    router.push('?');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Status</label>
        <select
          name="isActive"
          defaultValue={searchParams.get('isActive') ?? ''}
          className="h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">Todas</option>
          <option value="true">Ativas</option>
          <option value="false">Inativas</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Tipo</label>
        <select
          name="type"
          defaultValue={searchParams.get('type') ?? ''}
          className="h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">Todos</option>
          <option value="1">Mensal</option>
          <option value="2">Anual</option>
          <option value="3">Semanal</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit" variant="primary" size="md" className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500">
          Pesquisar
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={handleClear}>
          Limpar
        </Button>
      </div>
    </form>
  );
}
