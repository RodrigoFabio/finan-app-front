"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Controller, Control } from 'react-hook-form';
import Input from '../Input/Input';
import type { InputProps } from '../Input/Input.types';

interface InputControlledProps extends Omit<InputProps, 'name'> {
  name: string;
  // Control<any> para aceitar qualquer form sem quebrar inferência em JSX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export default function InputControlled({ name, control, ...inputProps }: InputControlledProps) {
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
