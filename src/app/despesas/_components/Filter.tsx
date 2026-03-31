"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { Input, Button } from '@/components/ui';

const categoryOptions = [
  { value: '', label: 'Todas' },
  { value: '1', label: 'Alimentação' },
  { value: '2', label: 'Transporte' },
  { value: '3', label: 'Moradia' },
  { value: '4', label: 'Saúde' },
  { value: '5', label: 'Educação' },
  { value: '6', label: 'Lazer' },
  { value: '7', label: 'Outros' },
];

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams();

    const startDate = (form.elements.namedItem('startDate') as HTMLInputElement).value;
    const endDate = (form.elements.namedItem('endDate') as HTMLInputElement).value;
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;

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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Categoria</label>
        <select
          name="category"
          defaultValue={searchParams.get('category') ?? ''}
          className="h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit" variant="primary" size="md" className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500">
          Pesquisar
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={handleClear}>
          Limpar
        </Button>
      </div>
    </form>
  );
}
