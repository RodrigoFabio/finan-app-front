import { handleApiError } from '@/utils/api-error';
import { parcelamentosMock } from './parcelamentos.mocks';
import type {
  Parcelamento,
  CreateParcelamentoDto,
  UpdateParcelamentoDto,
} from './parcelamentos.types';

// import api from '@/services/api';

export async function getParcelamentos(): Promise<Parcelamento[]> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.get<Parcelamento[]>('/api/installments');
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  return [...parcelamentosMock];
}

export async function getParcelamentoById(id: string): Promise<Parcelamento> {
  const found = parcelamentosMock.find((p) => p.id === id);
  if (!found) throw new Error(`Parcelamento ${id} não encontrado`);
  return found;
}

export async function createParcelamento(data: CreateParcelamentoDto): Promise<Parcelamento> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.post<Parcelamento>('/api/installments', data);
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const novo: Parcelamento = {
    ...data,
    id: String(Date.now()),
    userId: 'u1',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return novo;
}

export async function updateParcelamento(id: string, data: UpdateParcelamentoDto): Promise<Parcelamento> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   const response = await api.put<Parcelamento>(`/api/installments/${id}`, data);
  //   return response.data;
  // } catch (error) {
  //   handleApiError(error);
  // }

  const existing = parcelamentosMock.find((p) => p.id === id);
  if (!existing) throw new Error(`Parcelamento ${id} não encontrado`);
  return { ...existing, ...data, updatedAt: new Date().toISOString() };
}

export async function cancelarParcelamento(_id: string): Promise<void> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   await api.post(`/api/installments/${_id}/cancel`);
  // } catch (error) {
  //   handleApiError(error);
  // }
}

export async function deleteParcelamento(_id: string): Promise<void> {
  // --- Backend (comentado temporariamente) ---
  // try {
  //   await api.delete(`/api/installments/${_id}`);
  // } catch (error) {
  //   handleApiError(error);
  // }
}
