"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface SelectOption {
  value: number | string;
  label: string;
}

interface SelectControlledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: readonly SelectOption[];
  label?: string;
  placeholder?: string;
}

export default function SelectControlled<T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder = 'Selecione...',
}: SelectControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          {label && (
            <label className="text-sm font-medium text-neutral-700">{label}</label>
          )}
          <select
            {...field}
            className="h-10 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className="text-sm text-error-600">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
