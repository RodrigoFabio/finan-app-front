// Repositório do módulo Despesas.
// Responsável exclusivamente por acesso a dados — sem regra de negócio.
// TODO: implementar as queries reais quando a persistência for definida
// (ver src/backend/shared/database.ts).

import type {
  Despesa,
  CreateDespesaDto,
  UpdateDespesaDto,
  ListDespesasQuery,
  PaginatedDespesas,
} from './despesas.types';

export const despesasRepository = {
  async findMany(_query: ListDespesasQuery): Promise<PaginatedDespesas> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<Despesa | null> {
    throw new Error('Not implemented');
  },

  async create(_data: CreateDespesaDto & { userId: string }): Promise<Despesa> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdateDespesaDto): Promise<Despesa> {
    throw new Error('Not implemented');
  },

  async delete(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
