// Service do módulo Parcelamentos.
// Orquestra o repositório e concentrará a regra de negócio.
// TODO: implementar a regra de negócio. Por ora, apenas delega ao repositório.

import { parcelamentosRepository } from './parcelamentos.repository';
import type {
  Parcelamento,
  CreateParcelamentoDto,
  UpdateParcelamentoDto,
  PaginatedParcelamentos,
} from './parcelamentos.types';

export const parcelamentosService = {
  async list(): Promise<PaginatedParcelamentos> {
    return parcelamentosRepository.findMany();
  },

  async getById(id: string): Promise<Parcelamento | null> {
    return parcelamentosRepository.findById(id);
  },

  async create(data: CreateParcelamentoDto & { userId: string }): Promise<Parcelamento> {
    return parcelamentosRepository.create(data);
  },

  async update(id: string, data: UpdateParcelamentoDto): Promise<Parcelamento> {
    return parcelamentosRepository.update(id, data);
  },

  async cancel(id: string): Promise<void> {
    return parcelamentosRepository.cancel(id);
  },
};
