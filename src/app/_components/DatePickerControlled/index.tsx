"use client";

import { useState, useRef, useEffect } from 'react';
import { Controller, Control } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/utils/cn';
import 'react-day-picker/style.css';

interface DatePickerControlledProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  placeholder?: string;
}

function DatePickerInput({
  value,
  onChange,
  label,
  placeholder,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;
  const displayValue = selected && isValid(selected)
    ? format(selected, 'dd/MM/yyyy')
    : '';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(date: Date | undefined) {
    if (date && isValid(date)) {
      onChange(format(date, 'yyyy-MM-dd'));
    } else {
      onChange('');
    }
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-1 relative">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <input
        readOnly
        value={displayValue}
        placeholder={placeholder ?? 'dd/mm/aaaa'}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'h-10 w-full rounded-lg border bg-white px-3.5 text-sm text-neutral-900 cursor-pointer',
          'focus:outline-none focus:ring-2 transition-all duration-200',
          error
            ? 'border-error-500 focus:border-error-500 focus:ring-error-400/20'
            : 'border-neutral-300 focus:border-primary-400 focus:ring-primary-400/20'
        )}
      />
      {error && (
        <p className="text-sm text-error-600" role="alert">{error}</p>
      )}
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 rounded-xl border border-neutral-200 bg-white shadow-lg p-2">
          <DayPicker
            mode="single"
            selected={selected && isValid(selected) ? selected : undefined}
            onSelect={handleSelect}
            locale={ptBR}
            captionLayout="dropdown"
            classNames={{
              root: 'text-sm',
              day: 'rounded-md',
              selected: 'bg-primary-600 text-white rounded-md',
              today: 'font-bold text-primary-600',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function DatePickerControlled({
  name,
  control,
  label,
  placeholder,
}: DatePickerControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePickerInput
          value={field.value ?? ''}
          onChange={field.onChange}
          label={label}
          placeholder={placeholder}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
