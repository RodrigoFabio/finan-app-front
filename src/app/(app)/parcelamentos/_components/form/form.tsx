"use client";

import { useRouter } from 'next/navigation';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputControlled, SelectControlled } from '@/components/ui/controlled';
import DatePickerControlled from '@/app/_components/DatePickerControlled';
import FormActions from '@/app/_components/FormActions';
import { createParcelamento, updateParcelamento } from '@/services/Parcelamentos/parcelamentos.service';
import { ParcelamentoSchema, type ParcelamentoFormValues, parcelamentoCategorias } from './formSchema';
import type { FormParcelamentoProps } from './form.types';
import InstallmentEstimate from './InstallmentEstimate';

export default function FormParcelamento({ parcelamento, isEditMode = false }: FormParcelamentoProps) {
  const router = useRouter();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ParcelamentoFormValues>({
    resolver: zodResolver(ParcelamentoSchema) as Resolver<ParcelamentoFormValues>,
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

      <InstallmentEstimate value={installmentValue} />

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

      <FormActions
        onCancel={() => router.push('/parcelamentos')}
        isSubmitting={isSubmitting}
        isEditMode={isEditMode}
        createLabel="Cadastrar Parcelamento"
        submitClassName="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
      />
    </form>
  );
}
