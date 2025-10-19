import { getNoteById } from '@/app/http/notes';
import NoteDetailPage from '../../../../components/NoteDetailPage';

export const dynamic = "force-dynamic";

interface NoteDetailProps {
  params: {
    id: string;
  };
}

export default async function NoteDetail({ params }: NoteDetailProps) {
  const resolvedParams = await params;
  const noteId = parseInt(resolvedParams.id);
  
  const note = await getNoteById(noteId);

  return <NoteDetailPage note={note} />;
}
