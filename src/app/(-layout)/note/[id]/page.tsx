'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getNoteById } from '@/app/http/notes';
import NoteDetailPage from '../../../../components/NoteDetailPage';
import type { GetNoteResponse } from '@/types';

export default function NoteDetail() {
  const params = useParams();
  const noteId = parseInt(params.id as string);
  const [note, setNote] = useState<GetNoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const result = await getNoteById(noteId);
        setNote(result);
      } catch (err) {
        console.error('Error fetching note:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch note');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return <NoteDetailPage note={{} as GetNoteResponse} isLoading={true} />;
  }

  return <NoteDetailPage note={note} isLoading={isLoading} />;
}
