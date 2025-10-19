import { getPatients } from '@/app/http/patients';
import PatientsPage from '@/components/PatientsPage';


export const dynamic = "force-dynamic";

export default async function Patients() {
  const patients = await getPatients();

  return <PatientsPage patients={patients} />;
}
