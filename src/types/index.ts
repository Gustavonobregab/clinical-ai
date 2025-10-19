export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface Patient {
  id: number;
  name: string;
  dob?: string | null;
  createdAt: Date;
  updatedAt: Date;
  notes?: Note[];
}

export interface Note {
  id: number;
  content: string;
  patientId: number;
  patient?: Patient;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPatientsResponse {
  success: boolean;
  data: Patient[];
  total: number;
  message?: string;
}

export interface GetPatientResponse {
  success: boolean;
  data: Patient;
  message?: string;
}

export interface CreatePatientRequest {
  name: string;
  dob?: string | null;
}

export interface UpdatePatientRequest {
  id: number;
  name?: string;
  dob?: string | null;
}