import { GetPatientsResponse } from '@/types';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, User, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PatientsPageProps {
  patients: GetPatientsResponse;
}

export default function PatientsPage({ patients }: PatientsPageProps) {
  const patientsList = patients.data || [];

  return (
    <section className="py-32">
      <div className="container px-0 md:px-8">
        <h1 className="mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
          Patients
        </h1>
        <div className="flex flex-col">
          <div className="border-b border-gray-200"></div>
          {patientsList.map((patient, index) => (
            <React.Fragment key={patient.id}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="bg-muted flex h-14 w-16 shrink-0 items-center justify-center rounded-md">
                    <User className="h-6 w-6" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {patient.dob ? `DOB: ${new Date(patient.dob).toLocaleDateString('en-US')}` : 'No date of birth'}
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-none md:col-span-2"></div>
                <Button
                  asChild
                  className="order-3 ml-auto w-fit gap-2 md:order-none bg-black text-white hover:bg-gray-800"
                >
                  <Link href={`/patients/${patient.id}`}>
                    <span>View notes</span>
                  </Link>
                </Button>
              </div>
              <div className="border-b border-gray-200"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
