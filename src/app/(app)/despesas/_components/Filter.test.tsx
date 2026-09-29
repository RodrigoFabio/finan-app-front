import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useSearchParamsMock, pushMock } = vi.hoisted(() => ({
  useSearchParamsMock: vi.fn(),
  pushMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: useSearchParamsMock,
}));

import { render, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter (despesas)', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders without throwing when the URL has no filters', () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
    render(<Filter />);
    expect(screen.getByRole('button', { name: 'Pesquisar' })).toBeInTheDocument();
  });

  it('renders without throwing when a category is present in the URL', () => {
    // This is the exact code path that crashed in production:
    // `searchParams?.get('category')` used as a JSX attribute value.
    useSearchParamsMock.mockReturnValue(new URLSearchParams('category=3'));
    render(<Filter />);
    expect(screen.getByDisplayValue('Combustível')).toBeInTheDocument();
  });
});
