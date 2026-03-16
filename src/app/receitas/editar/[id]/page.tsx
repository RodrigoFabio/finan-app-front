"use client";

import { FormLayout } from '@/layouts';
import { Input, Button } from '@/components/ui';
import { useAppNavigation } from '@/routing/navigation';
import { ROUTES } from '@/constants/routes';
import { getReceitas } from '@/services/Receitas/receitas.service';
import { useState } from 'react';

export default function EditarReceitaPage({ params }: { params: { id: string } }) {
  const nav = useAppNavigation();
  const receita = getReceitas().find((r) => r.id === params.id);

  const [formData, setFormData] = useState({
    descricao: receita?.descricao || '',
    valor: receita?.valor?.toString() || '',
    data: receita?.data || '',
    categoria: receita?.categoria || '',
    isRecorrente: receita?.isRecorrente || false,
    observacao: receita?.observacao || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados editados:', formData);
    nav.goToReceitas();
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!receita) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-600">Receita não encontrada</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => nav.goToReceitas()}
          >
            Voltar para Receitas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormLayout
      title="Editar Receita"
      backUrl={ROUTES.RECEITAS.LIST}
      actions={
        <>
          <Button variant="outline" onClick={() => nav.goToReceitas()}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar Alterações</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Descrição"
          placeholder="Ex: Salário mensal"
          value={formData.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Valor"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.valor}
            onChange={(e) => handleChange('valor', e.target.value)}
            required
          />

          <Input
            label="Data"
            type="date"
            value={formData.data}
            onChange={(e) => handleChange('data', e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">Categoria</label>
          <select
            value={formData.categoria}
            onChange={(e) => handleChange('categoria', e.target.value)}
            className="h-10 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
            required
          >
            <option value="">Selecione...</option>
            <option value="Salário">Salário</option>
            <option value="Freelance">Freelance</option>
            <option value="Investimentos">Investimentos</option>
            <option value="Renda extra">Renda extra</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className="flex items-center gap-3 py-1">
          <input
            type="checkbox"
            id="isRecorrente"
            checked={formData.isRecorrente}
            onChange={(e) => handleChange('isRecorrente', e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 accent-primary-500"
          />
          <label htmlFor="isRecorrente" className="text-sm text-neutral-700 cursor-pointer">
            Receita recorrente
          </label>
        </div>

        <Input
          label="Observação"
          placeholder="Observações adicionais (opcional)"
          value={formData.observacao}
          onChange={(e) => handleChange('observacao', e.target.value)}
        />
      </form>
    </FormLayout>
  );
}
