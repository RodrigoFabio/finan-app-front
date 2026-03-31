import { ResumoFinanceiro, PaginatedRelatorios } from './relatorios.types';

export const resumoMock: ResumoFinanceiro = {
  income: 6850,
  expense: 3240.5,
  balance: 3609.5,
  period: {
    startDate: '2025-11-01',
    endDate: '2025-11-30',
  },
};

export const transacoesMock: PaginatedRelatorios = {
  data: [
    { id: '1',  userId: 'u1', description: 'Salário mensal',        amount: 4500,   type: 1, date: '2025-11-01', category: 1, createdAt: '2025-11-01T00:00:00Z', updatedAt: '2025-11-01T00:00:00Z' },
    { id: '2',  userId: 'u1', description: 'Aluguel',               amount: 1500,   type: 2, date: '2025-11-05', category: 3, createdAt: '2025-11-05T00:00:00Z', updatedAt: '2025-11-05T00:00:00Z' },
    { id: '3',  userId: 'u1', description: 'Supermercado',          amount: 480,    type: 2, date: '2025-11-08', category: 1, createdAt: '2025-11-08T00:00:00Z', updatedAt: '2025-11-08T00:00:00Z' },
    { id: '4',  userId: 'u1', description: 'Freelance landing page', amount: 1200,  type: 1, date: '2025-11-10', category: 2, createdAt: '2025-11-10T00:00:00Z', updatedAt: '2025-11-10T00:00:00Z' },
    { id: '5',  userId: 'u1', description: 'Plano de saúde',        amount: 320,    type: 2, date: '2025-11-10', category: 4, createdAt: '2025-11-10T00:00:00Z', updatedAt: '2025-11-10T00:00:00Z' },
    { id: '6',  userId: 'u1', description: 'Dividendos ações',      amount: 350,    type: 1, date: '2025-11-15', category: 3, createdAt: '2025-11-15T00:00:00Z', updatedAt: '2025-11-15T00:00:00Z' },
    { id: '7',  userId: 'u1', description: 'Uber / Transporte',     amount: 210,    type: 2, date: '2025-11-15', category: 2, createdAt: '2025-11-15T00:00:00Z', updatedAt: '2025-11-15T00:00:00Z' },
    { id: '8',  userId: 'u1', description: 'Venda de equipamento',  amount: 800,    type: 1, date: '2025-11-20', category: 5, createdAt: '2025-11-20T00:00:00Z', updatedAt: '2025-11-20T00:00:00Z' },
    { id: '9',  userId: 'u1', description: 'Cinema e lazer',        amount: 150,    type: 2, date: '2025-11-22', category: 6, createdAt: '2025-11-22T00:00:00Z', updatedAt: '2025-11-22T00:00:00Z' },
    { id: '10', userId: 'u1', description: 'Renda extra aula',      amount: 250,    type: 1, date: '2025-11-25', category: 4, createdAt: '2025-11-25T00:00:00Z', updatedAt: '2025-11-25T00:00:00Z' },
  ],
  total: 10,
  page: 1,
  limit: 20,
  totalPages: 1,
};
