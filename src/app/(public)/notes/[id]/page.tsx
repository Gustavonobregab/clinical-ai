import { getNotesByPatientId } from '@/app/http/notes';
import { getPatientById } from '@/app/http/patients';
import PatientNotesPage from '@/components/PatientNotesPage';
export const dynamic = "force-dynamic";

interface PatientNotesProps {
  params: {
    id: string;
  };
}

export default async function PatientNotes({ params }: PatientNotesProps) {
  const resolvedParams = await params;
  const patientId = parseInt(resolvedParams.id);
  
  const [patient, notes] = await Promise.all([
    getPatientById(patientId),
    getNotesByPatientId(patientId)
  ]);

  return <PatientNotesPage patient={patient} notes={notes} />;
}
