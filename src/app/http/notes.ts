'use server';

import { serverApi } from './server-api';
import type { 
  GetNotesResponse, 
  GetNoteResponse, 
  CreateNoteRequest, 
  UpdateNoteRequest
} from '@/types';

export async function getNotes(): Promise<GetNotesResponse> {
  const result = await serverApi.get('notes').json<GetNotesResponse>();
  return result;
}

export async function getNotesByPatientId(patientId: number): Promise<GetNotesResponse> {
  const result = await serverApi.get(`notes/patient/${patientId}`).json<GetNotesResponse>();
  return result;
}

export async function getNoteById(id: number): Promise<GetNoteResponse> {
  const result = await serverApi.get(`notes/${id}`).json<GetNoteResponse>();
  return result;
}


export async function deleteNote(id: number): Promise<{ success: boolean; message?: string }> {
  const result = await serverApi.delete(`notes/${id}`).json<{ success: boolean; message?: string }>();
  return result;
}

export async function processNote(id: number): Promise<{ success: boolean; aiMeta?: unknown; message?: string }> {
  const result = await serverApi.post(`notes/${id}/process`).json<{ success: boolean; aiMeta?: unknown; message?: string }>();
  return result;
}
