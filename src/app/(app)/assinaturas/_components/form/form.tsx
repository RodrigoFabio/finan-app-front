"use client";

import { useRouter } from 'next/navigation';
import { useForm, Resolver, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputControlled, SelectControlled, SwitchControlled } from '@/components/ui/controlled';
import FormActions from '@/app/_components/FormActions';
import { createAssinatura, updateAssinatura } from '@/services/Assinaturas/assinaturas.service';
import { AssinaturaSchema, type AssinaturaFormValues, assinaturaTipos, assinaturaCategorias } from './formSchema';
import type { FormAssinaturaProps } from './form.types';
import BillingDayHint from './BillingDayHint';

export default function FormAssinatura({ assinatura, isEditMode = false }: FormAssinaturaProps) {
  const router = useRouter();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<AssinaturaFormValues>({
    resolver: zodResolver(AssinaturaSchema) as Resolver<AssinaturaFormValues>,
    defaultValues: isEditMode && assinatura
      ? {
          description: assinatura.description,
          amount: assinatura.amount,
          billingDay: assinatura.billingDay,
          type: assinatura.type,
          category: assinatura.category,
          isActive: assinatura.isActive,
        }
      : {
          description: '',
          amount: '' as unknown as number,
          billingDay: '' as unknown as number,
          type: '' as unknown as number,
          category: '' as unknown as number,
          isActive: true,
        },
  });

  const billingDay = useWatch({ control, name: 'billingDay' });
  const isActive = useWatch({ control, name: 'isActive' });

  const onSubmit = async (data: AssinaturaFormValues) => {
    if (isEditMode && assinatura) {
      await updateAssinatura(assinatura.id, data);
    } else {
      await createAssinatura(data);
    }
    router.push('/assinaturas');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputControlled
        name="description"
        control={control}
        label="Descrição"
        placeholder="Ex: Netflix Premium"
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

        <div className="flex flex-col gap-1">
          <InputControlled
            name="billingDay"
            control={control}
            label="Dia de Cobrança"
            type="number"
            min="1"
            max="28"
            placeholder="Ex: 15"
          />
          <BillingDayHint day={billingDay} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectControlled
          name="type"
          control={control}
          label="Frequência"
          options={assinaturaTipos}
        />

        <SelectControlled
          name="category"
          control={control}
          label="Categoria"
          options={assinaturaCategorias}
        />
      </div>

      <SwitchControlled
        name="isActive"
        control={control}
        label={`Assinatura ${isActive ? 'ativa' : 'inativa'}`}
      />

      <FormActions
        onCancel={() => router.push('/assinaturas')}
        isSubmitting={isSubmitting}
        isEditMode={isEditMode}
        submitClassName="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
      />
    </form>
  );
}
