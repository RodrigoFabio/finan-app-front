import { handleApiError } from '@/utils/api-error';
import { assinaturasMock } from './assinaturas.mocks';
import type {
  Assinatura,
  CreateAssinaturaDto,
  UpdateAssinaturaDto,
  GetAssinaturasQuery,
} from './assinaturas.types';

// import api from '@/services/api';

export async function getAssinaturas(_query?: GetAssinaturasQuery): Promise<Assinatura[]> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.get<Assinatura[]>('/api/subscriptions', { params: _query });
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  return [...assinaturasMock];
}

export async function getAssinaturaById(id: string): Promise<Assinatura> {
  const found = assinaturasMock.find((a) => a.id === id);
  if (!found) throw new Error(`Assinatura ${id} não encontrada`);
  return found;
}

export async function createAssinatura(data: CreateAssinaturaDto): Promise<Assinatura> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.post<Assinatura>('/api/subscriptions', data);
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const nova: Assinatura = {
    ...data,
    id: String(Date.now()),
    userId: 'u1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return nova;
}

export async function updateAssinatura(id: string, data: UpdateAssinaturaDto): Promise<Assinatura> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.put<Assinatura>(`/api/subscriptions/${id}`, data);
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const existing = assinaturasMock.find((a) => a.id === id);
  if (!existing) throw new Error(`Assinatura ${id} não encontrada`);
  return { ...existing, ...data, updatedAt: new Date().toISOString() };
}

export async function deleteAssinatura(_id: string): Promise<void> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   await api.delete(`/api/subscriptions/${_id}`);
  // } catch (error) {
  //   handleApiError(error);
  // }
}
