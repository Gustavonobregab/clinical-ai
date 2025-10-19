import { getNotes } from '@/app/http/notes';
import NotesPage from "../../../components/NotesPage";

export const dynamic = "force-dynamic";

export default async function Notes() {
  const notes = await getNotes();
  return <NotesPage notes={notes} />;
}
