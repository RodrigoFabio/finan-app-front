import api from '@/services/api';
import { handleApiError } from '@/utils/api-error';
import { parcelamentosMock } from './parcelamentos.mocks';
import type {
  Parcelamento,
  CreateParcelamentoDto,
  UpdateParcelamentoDto,
} from './parcelamentos.types';

export async function getParcelamentos(): Promise<Parcelamento[]> {
  try {
    const response = await api.get<Parcelamento[]>('/api/installments');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getParcelamentoById(id: string): Promise<Parcelamento> {
  try {
    const response = await api.get<Parcelamento>(`/api/installments/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createParcelamento(data: CreateParcelamentoDto): Promise<Parcelamento> {
  try {
    const response = await api.post<Parcelamento>('/api/installments', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateParcelamento(id: string, data: UpdateParcelamentoDto): Promise<Parcelamento> {
  try {
    const response = await api.put<Parcelamento>(`/api/installments/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function cancelarParcelamento(id: string): Promise<void> {
  try {
    await api.post(`/api/installments/${id}/cancel`);
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteParcelamento(id: string): Promise<void> {
  try {
    await api.delete(`/api/installments/${id}`);
  } catch (error) {
    handleApiError(error);
  }
}

// Mock mantido para referência e testes locais
export { parcelamentosMock };
