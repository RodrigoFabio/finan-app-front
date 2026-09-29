import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useSearchParamsMock, pushMock, getReceitasMock } = vi.hoisted(() => ({
  useSearchParamsMock: vi.fn(),
  pushMock: vi.fn(),
  getReceitasMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: useSearchParamsMock,
}));

vi.mock('@/services/Receitas/receitas.service', () => ({
  getReceitas: getReceitasMock,
}));

import { render, screen } from '@testing-library/react';
import ReceitasPage from './page';

describe('ReceitasPage', () => {
  beforeEach(() => {
    pushMock.mockClear();
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
    getReceitasMock.mockReset();
  });

  it('renders the list once data loads', async () => {
    getReceitasMock.mockResolvedValue({
      items: [
        { id: '1', description: 'Salário', amount: 5000, date: '2026-01-05', category: 1 },
      ],
      total: 1,
      page: 1,
      limit: 20,
    });

    render(<ReceitasPage />);

    expect(screen.getByRole('heading', { name: 'Receitas' })).toBeInTheDocument();
    expect(await screen.findByText('Salário')).toBeInTheDocument();
  });

  it('renders without throwing when the URL already has a category filter', async () => {
    // Reproduces the crash reported in production: opening /receitas with
    // ?category=<n> in the URL, which the Filter reads via searchParams?.get('category').
    useSearchParamsMock.mockReturnValue(new URLSearchParams('category=3'));
    getReceitasMock.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20 });

    render(<ReceitasPage />);

    expect(screen.getByRole('heading', { name: 'Receitas' })).toBeInTheDocument();
    expect(await screen.findByText('Nenhuma receita encontrada.')).toBeInTheDocument();
  });
});
