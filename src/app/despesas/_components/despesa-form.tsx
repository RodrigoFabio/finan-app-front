"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { DespesaSchema, type DespesaFormValues, despesaCategorias } from '../_schema/despesa.schema';
import { createDespesa, updateDespesa } from '@/services/Despesas/despesas.service';

type Props = {
  mode: 'create' | 'edit';
  initialData?: Partial<DespesaFormValues>;
  id?: string;
};

export function DespesaForm({ mode, initialData, id }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Partial<DespesaFormValues>>({
    description: initialData?.description || '',
    amount: initialData?.amount || undefined,
    date: initialData?.date || '',
    category: initialData?.category || undefined,
    notes: initialData?.notes || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DespesaFormValues, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof DespesaFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = DespesaSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof DespesaFormValues, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof DespesaFormValues] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      if (mode === 'create') {
        await createDespesa(result.data);
      } else {
        await updateDespesa(id!, result.data);
      }
      router.push('/despesas');
    } catch (err) {
      console.error('Erro ao salvar despesa:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriaLabel = (value: number) => {
    return despesaCategorias.find((cat) => cat.value === value)?.label || '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Descrição"
        placeholder="Ex: Almoço no restaurante"
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

        <Input
          label="Data"
          type="date"
          value={values.date || ''}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">
          Categoria <span className="text-rose-500">*</span>
        </label>
        <select
          value={values.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="h-10 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 transition-all duration-200"
          required
        >
          <option value="">Selecione...</option>
          {despesaCategorias.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-rose-600">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">
          Observações (opcional)
        </label>
        <textarea
          value={values.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Observações adicionais..."
          rows={3}
          maxLength={300}
          className="rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 transition-all duration-200 resize-none"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-rose-600">{errors.notes}</p>
        )}
        <p className="text-xs text-neutral-500">
          {(values.notes?.length || 0)}/300 caracteres
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500"
        >
          {mode === 'create' ? 'Cadastrar' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
}
