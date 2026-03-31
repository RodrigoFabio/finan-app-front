"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import {
  ParcelamentoSchema,
  type ParcelamentoFormValues,
  parcelamentoCategorias,
} from '../_schema/parcelamento.schema';
import { createParcelamento } from '@/services/Parcelamentos/parcelamentos.service';

type Props = {
  mode: 'create';
};

export function ParcelamentoForm({ mode }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Partial<ParcelamentoFormValues>>({
    description: '',
    totalAmount: undefined,
    totalInstallments: undefined,
    startDate: '',
    category: undefined,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ParcelamentoFormValues, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ParcelamentoFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const installmentValue = useMemo(() => {
    if (values.totalAmount && values.totalInstallments && values.totalInstallments > 0) {
      return values.totalAmount / values.totalInstallments;
    }
    return 0;
  }, [values.totalAmount, values.totalInstallments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = ParcelamentoSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ParcelamentoFormValues, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ParcelamentoFormValues] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await createParcelamento(result.data);
      router.push('/parcelamentos');
    } catch (err) {
      console.error('Erro ao criar parcelamento:', err);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Descrição"
        placeholder="Ex: Notebook Dell"
        value={values.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors.description}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input
            label="Valor Total"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={values.totalAmount || ''}
            onChange={(e) => handleChange('totalAmount', e.target.value)}
            error={errors.totalAmount}
            required
          />
        </div>

        <div className="flex flex-col">
          <Input
            label="Número de Parcelas"
            type="number"
            min="2"
            max="48"
            placeholder="Ex: 12"
            value={values.totalInstallments || ''}
            onChange={(e) => handleChange('totalInstallments', e.target.value)}
            error={errors.totalInstallments}
            required
          />
        </div>
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
        <Input
          label="Data de Início"
          type="date"
          value={values.startDate || ''}
          onChange={(e) => handleChange('startDate', e.target.value)}
          error={errors.startDate}
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-neutral-700">
            Categoria <span className="text-amber-500">*</span>
          </label>
          <select
            value={values.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="h-10 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
            required
          >
            <option value="">Selecione...</option>
            {parcelamentoCategorias.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-amber-600">{errors.category}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
        >
          Cadastrar Parcelamento
        </Button>
      </div>
    </form>
  );
}
