import { GetNoteResponse } from '@/types';
import Link from 'next/link';

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
              Note #{noteData.id}
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
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 mr-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transcription</h2>
          
          {noteData.rawText && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Raw Text</h3>
              <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                {noteData.rawText}
              </p>
            </div>
          )}

          {noteData.summary && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
              <p className="text-gray-900 bg-green-50 p-4 rounded-md">
                {noteData.summary}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 ml-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Generate Report with AI</h2>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm">
                Generate Custom Report
              </button>
              <button className="bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700 transition-colors text-sm">
                Regenerate Analysis
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
