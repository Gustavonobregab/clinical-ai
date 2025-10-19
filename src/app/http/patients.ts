'use server';

import { serverApi } from './server-api';
import type { 
  GetPatientsResponse, 
  GetPatientResponse, 
  CreatePatientRequest, 
  UpdatePatientRequest
} from '../../types/index';

export async function getPatients(): Promise<GetPatientsResponse> {
  const result = await serverApi.get('patients').json<GetPatientsResponse>();
  return result;
}

export async function getPatientById(id: number): Promise<GetPatientResponse> {
  const result = await serverApi.get(`patients/${id}`).json<GetPatientResponse>();
  return result;
}


export async function deletePatient(id: number): Promise<{ success: boolean; message?: string }> {
  const result = await serverApi.delete(`patients/${id}`).json<{ success: boolean; message?: string }>();
  return result;
}

export async function searchPatients(query: string): Promise<GetPatientsResponse> {
  const result = await serverApi.get(`patients/search?q=${encodeURIComponent(query)}`).json<GetPatientsResponse>();
  return result;
}
