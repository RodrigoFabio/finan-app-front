"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface SwitchControlledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

export default function SwitchControlled<T extends FieldValues>({
  name,
  control,
  label,
}: SwitchControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-3 py-2">
          <button
            type="button"
            role="switch"
            aria-checked={field.value}
            onClick={() => field.onChange(!field.value)}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
              ${field.value ? 'bg-violet-600' : 'bg-neutral-200'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${field.value ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
          {label && (
            <label className="text-sm text-neutral-700 font-medium">{label}</label>
          )}
        </div>
      )}
    />
  );
}
