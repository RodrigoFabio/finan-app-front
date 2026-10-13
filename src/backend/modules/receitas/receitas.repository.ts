// Repositório do módulo Receitas.
// Responsável exclusivamente por acesso a dados — sem regra de negócio.
// TODO: implementar as queries reais quando a persistência for definida
// (ver src/backend/shared/database.ts).

import type {
  Receita,
  CreateReceitaDto,
  UpdateReceitaDto,
  ListReceitasQuery,
  PaginatedReceitas,
} from './receitas.types';

export const receitasRepository = {
  async findMany(_query: ListReceitasQuery): Promise<PaginatedReceitas> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<Receita | null> {
    throw new Error('Not implemented');
  },

  async create(_data: CreateReceitaDto & { userId: string }): Promise<Receita> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdateReceitaDto): Promise<Receita> {
    throw new Error('Not implemented');
  },

  async delete(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
