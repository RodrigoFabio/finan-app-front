"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import {
  AssinaturaSchema,
  type AssinaturaFormValues,
  assinaturaTipos,
  assinaturaCategorias,
} from '../_schema/assinatura.schema';
import { createAssinatura, updateAssinatura } from '@/services/Assinaturas/assinaturas.service';

type Props = {
  mode: 'create' | 'edit';
  initialData?: Partial<AssinaturaFormValues>;
  id?: string;
};

export function AssinaturaForm({ mode, initialData, id }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Partial<AssinaturaFormValues>>({
    description: initialData?.description || '',
    amount: initialData?.amount || undefined,
    billingDay: initialData?.billingDay || undefined,
    type: initialData?.type || undefined,
    category: initialData?.category || undefined,
    isActive: initialData?.isActive ?? true,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AssinaturaFormValues, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AssinaturaFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = AssinaturaSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AssinaturaFormValues, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof AssinaturaFormValues] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      if (mode === 'create') {
        await createAssinatura(result.data);
      } else {
        await updateAssinatura(id!, result.data);
      }
      router.push('/assinaturas');
    } catch (err) {
      console.error('Erro ao salvar assinatura:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Descrição"
        placeholder="Ex: Netflix Premium"
        value={values.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors.description}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Valor"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={values.amount || ''}
          onChange={(e) => handleChange('amount', e.target.value)}
          error={errors.amount}
          required
        />

        <div className="flex flex-col">
          <Input
            label="Dia de Cobrança"
            type="number"
            min="1"
            max="31"
            placeholder="Ex: 15"
            value={values.billingDay || ''}
            onChange={(e) => handleChange('billingDay', e.target.value)}
            error={errors.billingDay}
            required
          />
          {values.billingDay && !errors.billingDay && (
            <p className="mt-1.5 text-xs text-violet-600 font-medium">
              Cobrança todo dia {values.billingDay} do mês
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-700">
            Tipo <span className="text-violet-500">*</span>
          </label>
          <select
            value={values.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="h-10 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-200"
            required
          >
            <option value="">Selecione...</option>
            {assinaturaTipos.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-violet-600">{errors.type}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-700">
            Categoria <span className="text-violet-500">*</span>
          </label>
          <select
            value={values.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="h-10 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-200"
            required
          >
            <option value="">Selecione...</option>
            {assinaturaCategorias.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-violet-600">{errors.category}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 py-2">
        <button
          type="button"
          role="switch"
          aria-checked={values.isActive}
          onClick={() => handleChange('isActive', !values.isActive)}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
            ${values.isActive ? 'bg-violet-600' : 'bg-neutral-200'}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
              transition duration-200 ease-in-out
              ${values.isActive ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
        <label className="text-sm text-neutral-700 font-medium cursor-pointer">
          Assinatura {values.isActive ? 'ativa' : 'inativa'}
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
        >
          {mode === 'create' ? 'Cadastrar' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
}
