// Repositório do módulo Parcelamentos.
// Responsável exclusivamente por acesso a dados — sem regra de negócio.
// TODO: implementar as queries reais quando a persistência for definida
// (ver src/backend/shared/database.ts).

import type {
  Parcelamento,
  CreateParcelamentoDto,
  UpdateParcelamentoDto,
  PaginatedParcelamentos,
} from './parcelamentos.types';

export const parcelamentosRepository = {
  async findMany(): Promise<PaginatedParcelamentos> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<Parcelamento | null> {
    throw new Error('Not implemented');
  },

  async create(_data: CreateParcelamentoDto & { userId: string }): Promise<Parcelamento> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdateParcelamentoDto): Promise<Parcelamento> {
    throw new Error('Not implemented');
  },

  async cancel(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
