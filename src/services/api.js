import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// ── Request: injeta o token em toda requisição ──────────────────────────────
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response: trata 401 globalmente ────────────────────────────────────────
// Flag para evitar múltiplos dispatches quando várias requisições
// simultâneas falham com 401 ao mesmo tempo.
let isHandlingUnauthorized = false;

api.interceptors.response.use(
  (response) => {
    // Desempacota o envelope { success: true, data: ... } retornado pelo backend
    if (response.data && response.data.success === true && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? '';

    // Ignora 401 em endpoints de autenticação — credenciais erradas no
    // login não devem limpar a sessão nem redirecionar o usuário.
    const isAuthEndpoint = requestUrl.includes('/api/auth/');

    if (status === 401 && !isAuthEndpoint && !isHandlingUnauthorized && typeof window !== 'undefined') {
      isHandlingUnauthorized = true;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('auth-user');
      document.cookie = 'auth-session=; path=/; max-age=0';

      // Notifica o AuthContext via CustomEvent (evita acoplar axios ao React)
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));

      // Reseta a flag após 3s para permitir novos ciclos de login
      setTimeout(() => { isHandlingUnauthorized = false; }, 3000);
    }

    return Promise.reject(error);
  }
);

export default api;
