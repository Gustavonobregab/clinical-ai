import { GetNotesResponse } from '@/types';

interface NotesPageProps {
  notes: GetNotesResponse;
}

export default function NotesPage({ notes }: NotesPageProps) {
  const notesList = notes.data || [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notes</h1>
            <p className="text-sm text-gray-600 mt-1">
              {notesList.length} note{notesList.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {notesList.map((note) => (
            <div key={note.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {note.patient?.name}
                  </h3>
                  {note.rawText && (
                    <p className="text-gray-900 whitespace-pre-wrap mb-3">
                      {note.rawText.length > 20 ? `${note.rawText.substring(0, 20)}...` : note.rawText}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(note.createdAt).toLocaleDateString('en-US')}
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
