"use client";

import { FilterInputProps } from './FilterInput.types';
import { Input } from '@/components/ui';
import { cn } from '@/utils/cn';

const selectClass = [
  'h-9 rounded-lg border border-neutral-300 bg-white px-3 text-sm',
  'text-neutral-900 transition-all duration-200',
  'focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ');

const labelClass = 'block text-xs font-medium text-neutral-500 mb-1';

export default function FilterInput({
  filter,
  value,
  onChange,
  className,
}: FilterInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = filter.type === 'number'
      ? parseFloat(e.target.value) || 0
      : e.target.value;
    onChange(newValue);
  };

  switch (filter.type) {
    case 'text':
      return (
        <Input
          type="text"
          label={filter.label}
          placeholder={filter.placeholder || `Buscar...`}
          value={value || ''}
          onChange={handleChange}
          className={className}
          size="sm"
        />
      );

    case 'number':
      return (
        <Input
          type="number"
          label={filter.label}
          placeholder={filter.placeholder || '0'}
          value={value || ''}
          onChange={handleChange}
          min={filter.min}
          max={filter.max}
          step={filter.step || 1}
          className={className}
          size="sm"
        />
      );

    case 'date':
      return (
        <Input
          type="date"
          label={filter.label}
          value={value || ''}
          onChange={handleChange}
          className={className}
          size="sm"
        />
      );

    case 'select':
      return (
        <div className={cn('flex flex-col', className)}>
          <label className={labelClass}>{filter.label}</label>
          <select
            value={value || ''}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Todos</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'range':
      return (
        <div className={cn('flex flex-col', className)}>
          <label className={labelClass}>{filter.label}</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Mín"
              value={value?.min || ''}
              onChange={(e) =>
                onChange({ ...value, min: parseFloat(e.target.value) || undefined })
              }
              min={filter.min}
              max={filter.max}
              step={filter.step || 1}
              size="sm"
              className="flex-1"
            />
            <span className="text-xs font-medium text-neutral-400">até</span>
            <Input
              type="number"
              placeholder="Máx"
              value={value?.max || ''}
              onChange={(e) =>
                onChange({ ...value, max: parseFloat(e.target.value) || undefined })
              }
              min={filter.min}
              max={filter.max}
              step={filter.step || 1}
              size="sm"
              className="flex-1"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
