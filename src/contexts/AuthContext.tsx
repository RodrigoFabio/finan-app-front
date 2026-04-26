'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '@/services/auth.service';
import type { LoginDto, RegisterDto } from '@/types/api';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'auth-user',
} as const;

function saveSession(accessToken: string, refreshToken: string, user: AuthUser) {
  localStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
  // Cookie de sessão para o middleware proteger rotas
  document.cookie = `auth-session=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
  // Cookie com o token para Server Components conseguirem chamar a API
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 15}; SameSite=Strict`;
}

function clearSession() {
  localStorage.removeItem(KEYS.ACCESS_TOKEN);
  localStorage.removeItem(KEYS.REFRESH_TOKEN);
  localStorage.removeItem(KEYS.USER);
  document.cookie = 'auth-session=; path=/; max-age=0';
  document.cookie = 'accessToken=; path=/; max-age=0';
}

// Lê a sessão do localStorage de forma síncrona (só roda no cliente)
function readSessionFromStorage(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(KEYS.USER);
    const token = localStorage.getItem(KEYS.ACCESS_TOKEN);
    return stored && token ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(readSessionFromStorage());
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
      router.push('/login');
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [router]);

  const login = useCallback(async (data: LoginDto) => {
    const response = await authService.login(data);
    saveSession(response.accessToken, response.refreshToken, response.user);
    setUser(response.user);
    router.push('/dashboard');
  }, [router]);

  const register = useCallback(async (data: RegisterDto) => {
    const response = await authService.register(data);
    saveSession(response.accessToken, response.refreshToken, response.user);
    setUser(response.user);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem(KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        await authService.logout({ refreshToken });
      }
    } catch {
      // Continua o logout mesmo que a chamada à API falhe
    } finally {
      clearSession();
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
