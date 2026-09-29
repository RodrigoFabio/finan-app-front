"use client";

import { Button } from '@/components/ui';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  createLabel?: string;
  editLabel?: string;
  submitClassName?: string;
}

export default function FormActions({
  onCancel,
  isSubmitting,
  isEditMode = false,
  createLabel = 'Cadastrar',
  editLabel = 'Salvar Alterações',
  submitClassName,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit" isLoading={isSubmitting} className={submitClassName}>
        {isEditMode ? editLabel : createLabel}
      </Button>
    </div>
  );
}
