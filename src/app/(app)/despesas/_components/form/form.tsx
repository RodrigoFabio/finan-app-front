"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui';
import { InputControlled, SelectControlled } from '@/components/ui/controlled';
import DatePickerControlled from '@/app/_components/DatePickerControlled';
import { createDespesa, updateDespesa } from '@/services/Despesas/despesas.service';
import { DespesaSchema, type DespesaFormValues, despesaCategorias } from './formSchema';
import type { FormDespesaProps } from './form.types';

export default function FormDespesa({ despesa, isEditMode = false }: FormDespesaProps) {
  const router = useRouter();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<DespesaFormValues>({
    resolver: zodResolver(DespesaSchema),
    defaultValues: isEditMode && despesa
      ? {
          description: despesa.description,
          amount: despesa.amount,
          date: despesa.date.substring(0, 10),
          category: despesa.category,
          notes: despesa.notes ?? '',
        }
      : {
          description: '',
          amount: '' as unknown as number,
          date: '',
          category: '' as unknown as number,
          notes: '',
        },
  });

  const onSubmit = async (data: DespesaFormValues) => {
    const { notes, ...base } = data;
    const payload = { ...base, ...(notes ? { notes } : {}) };

    if (isEditMode && despesa) {
      await updateDespesa(despesa.id, payload);
    } else {
      await createDespesa({ ...payload, type: 1 });
    }
    router.push('/despesas');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputControlled
        name="description"
        control={control}
        label="Descrição"
        placeholder="Ex: Almoço no restaurante"
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
        options={despesaCategorias}
      />

      <InputControlled
        name="notes"
        control={control}
        label="Observação"
        placeholder="Observações adicionais (opcional)"
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        <Button variant="outline" type="button" onClick={() => router.push('/despesas')}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500"
        >
          {isEditMode ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
}
