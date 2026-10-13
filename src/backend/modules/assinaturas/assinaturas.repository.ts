// Repositório do módulo Assinaturas.
// Responsável exclusivamente por acesso a dados — sem regra de negócio.
// TODO: implementar as queries reais quando a persistência for definida
// (ver src/backend/shared/database.ts).

import type {
  Assinatura,
  CreateAssinaturaDto,
  UpdateAssinaturaDto,
  GetAssinaturasQuery,
  PaginatedAssinaturas,
} from './assinaturas.types';

export const assinaturasRepository = {
  async findMany(_query: GetAssinaturasQuery): Promise<PaginatedAssinaturas> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<Assinatura | null> {
    throw new Error('Not implemented');
  },

  async create(_data: CreateAssinaturaDto & { userId: string }): Promise<Assinatura> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdateAssinaturaDto): Promise<Assinatura> {
    throw new Error('Not implemented');
  },

  async delete(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
