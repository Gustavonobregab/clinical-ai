import { GetNoteResponse } from '@/types';
import Link from 'next/link';
import TranscriptionCard from './TranscriptionCard';
import AIAnalysisCard from './AIAnalysisCard';
import { Spinner } from './ui/spinner';

interface NoteDetailPageProps {
  note: GetNoteResponse;
  isLoading?: boolean;
}

export default function NoteDetailPage({ note, isLoading = false }: NoteDetailPageProps) {
  const noteData = note.data;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Spinner className="h-8 w-8 mx-auto mb-4" />
            <p className="text-gray-600">Loading note details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Note
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {noteData.patient?.name && (
                `Patient: ${noteData.patient.name}${noteData.patient.dob ? ` (${new Date(noteData.patient.dob).toLocaleDateString('en-US')})` : ''}`
              )}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              href="/patients" 
              className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Patients
            </Link>
          </div>
        </div>
      </div>


      <div className="flex flex-col lg:flex-row gap-6">
        <TranscriptionCard rawText={noteData.rawText} />
        <AIAnalysisCard noteId={noteData.id} />
      </div>
    </div>
  );
}
