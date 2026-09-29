import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormActions from './index';

describe('FormActions', () => {
  it('calls onCancel when the cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<FormActions onCancel={onCancel} isSubmitting={false} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('shows the create label by default and the edit label in edit mode', () => {
    const { rerender } = render(<FormActions onCancel={() => {}} isSubmitting={false} />);
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();

    rerender(<FormActions onCancel={() => {}} isSubmitting={false} isEditMode />);
    expect(screen.getByRole('button', { name: 'Salvar Alterações' })).toBeInTheDocument();
  });
});
