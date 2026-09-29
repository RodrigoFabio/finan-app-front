"use client";

import { useRouter } from 'next/navigation';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputControlled, SelectControlled } from '@/components/ui/controlled';
import DatePickerControlled from '@/app/_components/DatePickerControlled';
import FormActions from '@/app/_components/FormActions';
import { createReceita, updateReceita } from '@/services/Receitas/receitas.service';
import { ReceitaSchema, ReceitaFormValues, receitaCategorias } from './formSchema';
import type { FormReceitaProps } from './form.types';

export default function FormReceita({ receita, isEditMode = false }: FormReceitaProps) {
  const router = useRouter();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ReceitaFormValues>({
    resolver: zodResolver(ReceitaSchema) as Resolver<ReceitaFormValues>,
    defaultValues: isEditMode && receita
      ? {
          description: receita.description,
          amount: receita.amount,
          date: receita.date.substring(0, 10),
          category: receita.category,
          notes: receita.notes ?? '',
        }
      : {
          description: '',
          // '' evita o warning de uncontrolled→controlled; Zod faz coerce para number na validação
          amount: '' as unknown as number,
          date: '',
          category: '' as unknown as number,
          notes: '',
        },
  });

  const onSubmit = async (data: ReceitaFormValues) => {
    // exactOptionalPropertyTypes: setar notes: undefined explicitamente é erro de tipo
    // → omitir a propriedade quando vazia usando spread condicional
    const { notes, ...base } = data;
    const payload = { ...base, ...(notes ? { notes } : {}) };

    if (isEditMode && receita) {
      await updateReceita(receita.id, payload);
    } else {
      await createReceita({ ...payload, type: 2 });
    }

    router.push('/receitas');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputControlled
        name="description"
        control={control}
        label="Descrição"
        placeholder="Ex: Salário mensal"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputControlled
          name="amount"
          control={control}
          label="Valor"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
        />

        <DatePickerControlled
          name="date"
          control={control}
          label="Data"
        />
      </div>

      <SelectControlled
        name="category"
        control={control}
        label="Categoria"
        options={receitaCategorias}
      />

      <InputControlled
        name="notes"
        control={control}
        label="Observação"
        placeholder="Observações adicionais (opcional)"
      />

      <FormActions
        onCancel={() => router.push('/receitas')}
        isSubmitting={isSubmitting}
        isEditMode={isEditMode}
      />
    </form>
  );
}
