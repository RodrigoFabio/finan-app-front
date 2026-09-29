"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Input from '../Input/Input';
import type { InputProps } from '../Input/Input.types';

type InputControlledProps<T extends FieldValues> = Omit<InputProps, 'name'> & {
  name: Path<T>;
  control: Control<T>;
};

export default function InputControlled<T extends FieldValues>({ name, control, ...inputProps }: InputControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          {...inputProps}
          value={field.value ?? ''}
          {...(fieldState.error?.message && { error: fieldState.error.message })}
        />
      )}
    />
  );
}
