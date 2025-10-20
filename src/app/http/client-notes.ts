import type { CreateNoteRequest, CreateNoteResponse } from '@/types';
import { api } from './api';

export async function createNote(noteData: CreateNoteRequest, file?: File): Promise<CreateNoteResponse> {
  const formData = new FormData();
  
  formData.append('patientId', noteData.patientId.toString());
  formData.append('inputType', noteData.inputType);
  if (noteData.rawText) {
    formData.append('rawText', noteData.rawText);
  }
  if (file) {
    formData.append('file', file);
  }
  
  return api.post('notes', {
    body: formData,
  }).json<CreateNoteResponse>();
}
