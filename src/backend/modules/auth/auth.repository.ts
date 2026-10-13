// Repositório do módulo Auth.
// Responsável exclusivamente por acesso a dados (usuários, tokens) — sem
// regra de negócio (hashing, geração de JWT, etc. ficam no service).
// TODO: implementar as queries reais quando a persistência for definida
// (ver src/backend/shared/database.ts).

import type { AuthUser } from './auth.types';

export const authRepository = {
  async findUserByEmail(_email: string): Promise<AuthUser | null> {
    throw new Error('Not implemented');
  },

  async createUser(_data: { email: string; name: string; passwordHash: string }): Promise<AuthUser> {
    throw new Error('Not implemented');
  },

  async saveRefreshToken(_userId: string, _refreshToken: string): Promise<void> {
    throw new Error('Not implemented');
  },

  async findRefreshToken(_refreshToken: string): Promise<{ userId: string } | null> {
    throw new Error('Not implemented');
  },

  async revokeRefreshToken(_refreshToken: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
