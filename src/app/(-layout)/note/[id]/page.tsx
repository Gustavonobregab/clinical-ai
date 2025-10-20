import { getNoteById } from '@/app/http/notes';
import NoteDetailPage from '../../../../components/NoteDetailPage';

interface NoteDetailProps {
  params: {
    id: string;
  };
}

export default async function NoteDetail({ params }: NoteDetailProps) {
  const noteId = parseInt(params.id);
  const note = await getNoteById(noteId);
  return <NoteDetailPage note={note} />;
}
