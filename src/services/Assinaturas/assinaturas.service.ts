import api from '@/services/api';
import { handleApiError } from '@/utils/api-error';
import { assinaturasMock } from './assinaturas.mocks';
import type {
  Assinatura,
  CreateAssinaturaDto,
  UpdateAssinaturaDto,
  GetAssinaturasQuery,
} from './assinaturas.types';

export async function getAssinaturas(query?: GetAssinaturasQuery): Promise<Assinatura[]> {
  try {
    const response = await api.get<Assinatura[]>('/api/subscriptions', { params: query });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getAssinaturaById(id: string): Promise<Assinatura> {
  try {
    const response = await api.get<Assinatura>(`/api/subscriptions/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createAssinatura(data: CreateAssinaturaDto): Promise<Assinatura> {
  try {
    const response = await api.post<Assinatura>('/api/subscriptions', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateAssinatura(id: string, data: UpdateAssinaturaDto): Promise<Assinatura> {
  try {
    const response = await api.put<Assinatura>(`/api/subscriptions/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteAssinatura(id: string): Promise<void> {
  try {
    await api.delete(`/api/subscriptions/${id}`);
  } catch (error) {
    handleApiError(error);
  }
}

// Mock mantido para referência e testes locais
export { assinaturasMock };
