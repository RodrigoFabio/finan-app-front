"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { Input, Button } from '@/components/ui';

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams();

    const status = (form.elements.namedItem('status') as HTMLSelectElement).value;
    const startDate = (form.elements.namedItem('startDate') as HTMLInputElement).value;

    if (status) params.set('status', status);
    if (startDate) params.set('startDate', startDate);

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
          name="status"
          defaultValue={searchParams.get('status') ?? ''}
          className="h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="">Todos</option>
          <option value="active">Ativo</option>
          <option value="completed">Concluído</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>
      <Input
        label="Data início a partir de"
        type="date"
        name="startDate"
        defaultValue={searchParams.get('startDate') ?? ''}
        fullWidth={false}
        className="w-44"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="primary" size="md" className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500">
          Pesquisar
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={handleClear}>
          Limpar
        </Button>
      </div>
    </form>
  );
}
