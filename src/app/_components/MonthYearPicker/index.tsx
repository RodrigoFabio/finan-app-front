"use client";

import { useState, useEffect } from 'react';

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

interface MonthYearPickerProps {
  onChange: (startDate: string, endDate: string) => void;
  accentColor?: 'emerald' | 'rose';
}

export default function MonthYearPicker({ onChange, accentColor = 'emerald' }: MonthYearPickerProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());

  const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  function emitChange(year: number, month: number) {
    const m = String(month + 1).padStart(2, '0');
    const lastDay = new Date(year, month + 1, 0).getDate();
    onChange(
      `${year}-${m}-01`,
      `${year}-${m}-${String(lastDay).padStart(2, '0')}`,
    );
  }

  useEffect(() => {
    emitChange(selectedYear, selectedMonth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleYearChange(year: number) {
    setSelectedYear(year);
    emitChange(year, selectedMonth);
  }

  function handleMonthClick(month: number) {
    setSelectedMonth(month);
    emitChange(selectedYear, month);
  }

  const selectedCls = accentColor === 'rose'
    ? 'bg-rose-600 text-white border-rose-600'
    : 'bg-emerald-600 text-white border-emerald-600';

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedYear}
        onChange={(e) => handleYearChange(Number(e.target.value))}
        className="h-8 w-24 rounded-md border border-neutral-300 bg-white px-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
      >
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <div className="flex flex-wrap gap-1">
        {MONTHS.map((label, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleMonthClick(idx)}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer transition-colors ${
              selectedMonth === idx
                ? selectedCls
                : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
