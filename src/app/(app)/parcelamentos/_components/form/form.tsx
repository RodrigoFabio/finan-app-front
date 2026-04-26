"use client";

import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui';
import { InputControlled, SelectControlled } from '@/components/ui/controlled';
import DatePickerControlled from '@/app/_components/DatePickerControlled';
import { createParcelamento, updateParcelamento } from '@/services/Parcelamentos/parcelamentos.service';
import { ParcelamentoSchema, type ParcelamentoFormValues, parcelamentoCategorias } from './formSchema';
import type { FormParcelamentoProps } from './form.types';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export default function FormParcelamento({ parcelamento, isEditMode = false }: FormParcelamentoProps) {
  const router = useRouter();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ParcelamentoFormValues>({
    resolver: zodResolver(ParcelamentoSchema),
    defaultValues: isEditMode && parcelamento
      ? {
          description: parcelamento.description,
          totalAmount: parcelamento.totalAmount,
          totalInstallments: parcelamento.totalInstallments,
          startDate: parcelamento.startDate.substring(0, 10),
          category: parcelamento.category,
        }
      : {
          description: '',
          totalAmount: '' as unknown as number,
          totalInstallments: '' as unknown as number,
          startDate: '',
          category: '' as unknown as number,
        },
  });

  const totalAmount = useWatch({ control, name: 'totalAmount' });
  const totalInstallments = useWatch({ control, name: 'totalInstallments' });
  const installmentValue =
    totalAmount > 0 && totalInstallments > 0 ? totalAmount / totalInstallments : 0;

  const onSubmit = async (data: ParcelamentoFormValues) => {
    if (isEditMode && parcelamento) {
      await updateParcelamento(parcelamento.id, data);
    } else {
      await createParcelamento(data);
    }
    router.push('/parcelamentos');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputControlled
        name="description"
        control={control}
        label="Descrição"
        placeholder="Ex: Notebook Dell"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputControlled
          name="totalAmount"
          control={control}
          label="Valor Total"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
        />
        <InputControlled
          name="totalInstallments"
          control={control}
          label="Número de Parcelas"
          type="number"
          min="2"
          max="48"
          placeholder="Ex: 12"
        />
      </div>

      {installmentValue > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800 font-medium">
            Valor estimado por parcela:{' '}
            <span className="text-lg font-semibold text-amber-900">
              {fmt(installmentValue)}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DatePickerControlled
          name="startDate"
          control={control}
          label="Data de Início"
        />

        <SelectControlled
          name="category"
          control={control}
          label="Categoria"
          options={parcelamentoCategorias}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        <Button variant="outline" type="button" onClick={() => router.push('/parcelamentos')}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
        >
          {isEditMode ? 'Salvar Alterações' : 'Cadastrar Parcelamento'}
        </Button>
      </div>
    </form>
  );
}
