"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Input, Button } from '@/components/ui';
import MonthYearPicker from '@/app/_components/MonthYearPicker';

// Alinhado com ExpenseCategory do backend
const categoryOptions = [
  { value: '',   label: 'Todas' },
  { value: '1',  label: 'Alimentação' },
  { value: '2',  label: 'Saúde' },
  { value: '3',  label: 'Combustível' },
  { value: '4',  label: 'Farmácia' },
  { value: '5',  label: 'Transporte' },
  { value: '6',  label: 'Moradia' },
  { value: '7',  label: 'Lazer' },
  { value: '8',  label: 'Educação' },
  { value: '9',  label: 'Acessórios' },
  { value: '10', label: 'Roupas' },
  { value: '99', label: 'Outros' },
];

function getDefaultDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  return {
    startDate: `${year}-${month}-01`,
    endDate: `${year}-${month}-${String(lastDay).padStart(2, '0')}`,
  };
}

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaults = getDefaultDates();

  const [startDate, setStartDate] = useState(searchParams?.get('startDate') ?? defaults.startDate);
  const [endDate, setEndDate] = useState(searchParams?.get('endDate') ?? defaults.endDate);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams();
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (category) params.set('category', category);
    router.push(`?${params.toString()}`);
  }

  function handleClear() {
    const d = getDefaultDates();
    setStartDate(d.startDate);
    setEndDate(d.endDate);
    router.push('?');
  }

  return (
    <div className="flex flex-col gap-3">
      <MonthYearPicker
        accentColor="rose"
        onChange={(start, end) => { setStartDate(start); setEndDate(end); }}
      />
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
        <Input
          label="Data inicial"
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth={false}
          className="w-40"
        />
        <Input
          label="Data final"
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth={false}
          className="w-40"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-700">Categoria</label>
          <select
            name="category"
            defaultValue={searchParams?.get('category') ?? ''}
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
    </div>
  );
}
