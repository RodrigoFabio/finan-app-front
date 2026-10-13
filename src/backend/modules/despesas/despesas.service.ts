// Service do módulo Despesas.
// Orquestra o repositório e concentrará a regra de negócio.
// TODO: implementar a regra de negócio. Por ora, apenas delega ao repositório.

import { despesasRepository } from './despesas.repository';
import type {
  Despesa,
  CreateDespesaDto,
  UpdateDespesaDto,
  ListDespesasQuery,
  PaginatedDespesas,
} from './despesas.types';

export const despesasService = {
  async list(query: ListDespesasQuery): Promise<PaginatedDespesas> {
    return despesasRepository.findMany(query);
  },

  async getById(id: string): Promise<Despesa | null> {
    return despesasRepository.findById(id);
  },

  async create(data: CreateDespesaDto & { userId: string }): Promise<Despesa> {
    return despesasRepository.create(data);
  },

  async update(id: string, data: UpdateDespesaDto): Promise<Despesa> {
    return despesasRepository.update(id, data);
  },

  async remove(id: string): Promise<void> {
    return despesasRepository.delete(id);
  },
};
