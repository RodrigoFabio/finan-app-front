"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Input, Button } from '@/components/ui';
import MonthYearPicker from '@/app/_components/MonthYearPicker';

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
    const category = (form.elements.namedItem('category') as HTMLInputElement).value;
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
        accentColor="emerald"
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
        <Input
          label="Categoria"
          type="number"
          name="category"
          placeholder="Ex: 1"
          defaultValue={searchParams?.get('category') ?? ''}
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
    </div>
  );
}
