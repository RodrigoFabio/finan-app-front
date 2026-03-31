"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams();

    const startDate = (form.elements.namedItem('startDate') as HTMLInputElement).value;
    const endDate = (form.elements.namedItem('endDate') as HTMLInputElement).value;
    const category = (form.elements.namedItem('category') as HTMLInputElement).value;

    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (category) params.set('category', category);

    router.push(`?${params.toString()}`);
  }

  function handleClear() {
    router.push('?');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <Input
        label="Data inicial"
        type="date"
        name="startDate"
        defaultValue={searchParams.get('startDate') ?? ''}
        fullWidth={false}
        className="w-40"
      />
      <Input
        label="Data final"
        type="date"
        name="endDate"
        defaultValue={searchParams.get('endDate') ?? ''}
        fullWidth={false}
        className="w-40"
      />
      <Input
        label="Categoria"
        type="number"
        name="category"
        placeholder="Ex: 1"
        defaultValue={searchParams.get('category') ?? ''}
        fullWidth={false}
        className="w-28"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="primary" size="md">
          Pesquisar
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={handleClear}>
          Limpar
        </Button>
      </div>
    </form>
  );
}
