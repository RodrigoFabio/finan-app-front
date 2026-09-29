import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useSearchParamsMock, pushMock, getDespesasMock } = vi.hoisted(() => ({
  useSearchParamsMock: vi.fn(),
  pushMock: vi.fn(),
  getDespesasMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: useSearchParamsMock,
}));

vi.mock('@/services/Despesas/despesas.service', () => ({
  getDespesas: getDespesasMock,
}));

import { render, screen } from '@testing-library/react';
import DespesasPage from './page';

describe('DespesasPage', () => {
  beforeEach(() => {
    pushMock.mockClear();
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
    getDespesasMock.mockReset();
  });

  it('renders the list once data loads', async () => {
    getDespesasMock.mockResolvedValue({
      items: [
        { id: '1', description: 'Almoço', amount: 42, date: '2026-01-05', category: 1 },
      ],
      total: 1,
      page: 1,
      limit: 20,
    });

    render(<DespesasPage />);

    expect(screen.getByRole('heading', { name: 'Despesas' })).toBeInTheDocument();
    expect(await screen.findByText('Almoço')).toBeInTheDocument();
  });

  it('renders without throwing when the URL already has a category filter', async () => {
    // Reproduces the crash reported in production: opening /despesas with
    // ?category=<n> in the URL, which the Filter reads via searchParams?.get('category').
    useSearchParamsMock.mockReturnValue(new URLSearchParams('category=3'));
    getDespesasMock.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20 });

    render(<DespesasPage />);

    expect(screen.getByRole('heading', { name: 'Despesas' })).toBeInTheDocument();
    expect(await screen.findByText('Nenhuma despesa encontrada.')).toBeInTheDocument();
  });
});
