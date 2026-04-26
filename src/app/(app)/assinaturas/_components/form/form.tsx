"use client";

import { useRouter } from 'next/navigation';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui';
import { InputControlled, SelectControlled } from '@/components/ui/controlled';
import { createAssinatura, updateAssinatura } from '@/services/Assinaturas/assinaturas.service';
import { AssinaturaSchema, type AssinaturaFormValues, assinaturaTipos, assinaturaCategorias } from './formSchema';
import type { FormAssinaturaProps } from './form.types';

export default function FormAssinatura({ assinatura, isEditMode = false }: FormAssinaturaProps) {
  const router = useRouter();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<AssinaturaFormValues>({
    resolver: zodResolver(AssinaturaSchema),
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
          {billingDay > 0 && (
            <p className="text-xs text-violet-600 font-medium">
              Cobrança todo dia {billingDay} do mês
            </p>
          )}
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

      <div className="flex items-center gap-3 py-2">
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
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
          )}
        />
        <label className="text-sm text-neutral-700 font-medium">
          Assinatura {isActive ? 'ativa' : 'inativa'}
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        <Button variant="outline" type="button" onClick={() => router.push('/assinaturas')}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
        >
          {isEditMode ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
}
