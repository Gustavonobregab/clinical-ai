'use server';

import { serverApi } from './server-api';
import type { 
  GetPatientsResponse, 
  GetPatientResponse, 
  CreatePatientRequest, 
  UpdatePatientRequest,
  Patient 
} from '../types/index';

export async function getPatients(): Promise<GetPatientsResponse> {
  const result = await serverApi.get('patients').json<GetPatientsResponse>();
  return result;
}

export async function getPatientById(id: number): Promise<GetPatientResponse> {
  const result = await serverApi.get(`/patients/${id}`).json<GetPatientResponse>();
  return result;
}

export async function createPatient(patientData: CreatePatientRequest): Promise<GetPatientResponse> {
  const result = await serverApi.post('/patients', { 
    json: patientData 
  }).json<GetPatientResponse>();
  return result;
}

export async function updatePatient(patientData: UpdatePatientRequest): Promise<GetPatientResponse> {
  const { id, ...updateData } = patientData;
  const result = await serverApi.put(`/patients/${id}`, { 
    json: updateData 
  }).json<GetPatientResponse>();
  return result;
}


export async function searchPatients(query: string): Promise<GetPatientsResponse> {
  const result = await serverApi.get(`/patients/search?q=${encodeURIComponent(query)}`).json<GetPatientsResponse>();
  return result;
}
