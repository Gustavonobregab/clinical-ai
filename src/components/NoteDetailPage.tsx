import { GetNoteResponse } from '@/types';
import Link from 'next/link';
import TranscriptionCard from './TranscriptionCard';
import AIAnalysisCard from './AIAnalysisCard';

interface NoteDetailPageProps {
  note: GetNoteResponse;
}

export default function NoteDetailPage({ note }: NoteDetailPageProps) {
  const noteData = note.data;

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
                `Patient: ${noteData.patient.name}${noteData.patient.dob ? ` (DOB: ${new Date(noteData.patient.dob).toLocaleDateString('en-US')})` : ''}`
              )}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              href="/notes" 
              className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Notes
            </Link>
          </div>
        </div>
      </div>


      <div className="flex">
        <TranscriptionCard rawText={noteData.rawText} />
        <AIAnalysisCard noteId={noteData.id} />
      </div>
    </div>
  );
}
