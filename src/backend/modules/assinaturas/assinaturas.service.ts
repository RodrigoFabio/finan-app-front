// Service do módulo Assinaturas.
// Orquestra o repositório e concentrará a regra de negócio.
// TODO: implementar a regra de negócio. Por ora, apenas delega ao repositório.

import { assinaturasRepository } from './assinaturas.repository';
import type {
  Assinatura,
  CreateAssinaturaDto,
  UpdateAssinaturaDto,
  GetAssinaturasQuery,
  PaginatedAssinaturas,
} from './assinaturas.types';

export const assinaturasService = {
  async list(query: GetAssinaturasQuery): Promise<PaginatedAssinaturas> {
    return assinaturasRepository.findMany(query);
  },

  async getById(id: string): Promise<Assinatura | null> {
    return assinaturasRepository.findById(id);
  },

  async create(data: CreateAssinaturaDto & { userId: string }): Promise<Assinatura> {
    return assinaturasRepository.create(data);
  },

  async update(id: string, data: UpdateAssinaturaDto): Promise<Assinatura> {
    return assinaturasRepository.update(id, data);
  },

  async remove(id: string): Promise<void> {
    return assinaturasRepository.delete(id);
  },
};
