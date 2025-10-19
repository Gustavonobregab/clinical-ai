import { GetPatientResponse, GetNotesResponse } from '@/types';
import Link from 'next/link';

interface PatientNotesPageProps {
  patient: GetPatientResponse;
  notes: GetNotesResponse;
}

export default function PatientNotesPage({ patient, notes }: PatientNotesPageProps) {
  const patientData = patient.data;
  const notesList = notes.data || [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Notes for {patientData.name}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {notesList.length} note{notesList.length !== 1 ? 's' : ''} found
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {notesList.map((note) => (
            <div key={note.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {note.rawText && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {note.rawText.length > 20 ? `${note.rawText.substring(0, 40)}...` : note.rawText}
                    </h3>
                  )}
                  
                  {note.summary && (
                    <div className="bg-green-50 rounded-md p-3 mb-3">
                      <p className="text-sm text-green-600 mb-1">Summary:</p>
                      <p className="text-gray-900 text-sm">
                        {note.summary}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(note.createdAt).toLocaleDateString('en-US')} at {new Date(note.createdAt).toLocaleTimeString('en-US')}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Note #{note.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
