// Service do módulo Auth.
// Orquestra o repositório e concentrará a regra de negócio (hashing de
// senha, geração/validação de JWT, etc.).
// TODO: implementar a regra de negócio.

import { authRepository } from './auth.repository';
import type { RegisterDto, LoginDto, RefreshTokenDto, LogoutDto, AuthResponse } from './auth.types';

export const authService = {
  async register(_data: RegisterDto): Promise<AuthResponse> {
    void authRepository;
    throw new Error('Not implemented');
  },

  async login(_data: LoginDto): Promise<AuthResponse> {
    throw new Error('Not implemented');
  },

  async refresh(_data: RefreshTokenDto): Promise<AuthResponse> {
    throw new Error('Not implemented');
  },

  async logout(_data: LogoutDto): Promise<void> {
    throw new Error('Not implemented');
  },
};
