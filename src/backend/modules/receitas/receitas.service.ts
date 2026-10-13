// Service do módulo Receitas.
// Orquestra o repositório e concentrará a regra de negócio.
// TODO: implementar a regra de negócio. Por ora, apenas delega ao repositório.

import { receitasRepository } from './receitas.repository';
import type {
  Receita,
  CreateReceitaDto,
  UpdateReceitaDto,
  ListReceitasQuery,
  PaginatedReceitas,
} from './receitas.types';

export const receitasService = {
  async list(query: ListReceitasQuery): Promise<PaginatedReceitas> {
    return receitasRepository.findMany(query);
  },

  async getById(id: string): Promise<Receita | null> {
    return receitasRepository.findById(id);
  },

  async create(data: CreateReceitaDto & { userId: string }): Promise<Receita> {
    return receitasRepository.create(data);
  },

  async update(id: string, data: UpdateReceitaDto): Promise<Receita> {
    return receitasRepository.update(id, data);
  },

  async remove(id: string): Promise<void> {
    return receitasRepository.delete(id);
  },
};
