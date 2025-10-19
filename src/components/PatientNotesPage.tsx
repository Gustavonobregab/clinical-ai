'use client';

import { GetPatientResponse, GetNotesResponse } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowRight, FileText, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewNoteModal from './NewNoteModal';

interface PatientNotesPageProps {
  patient: GetPatientResponse;
  notes: GetNotesResponse;
}

export default function PatientNotesPage({ patient, notes }: PatientNotesPageProps) {
  const patientData = patient.data;
  const notesList = notes.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-32">
      <div className="container px-0 md:px-8">
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold md:text-4xl mb-2">
                Notes for {patientData.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                {notesList.length} note{notesList.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Note
              </Button>
              <Button 
                asChild
                className="gap-2 bg-black text-white hover:bg-gray-800"
              >
                <Link href="/patients">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Patients
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-b border-gray-200"></div>
          {notesList.map((note, index) => (
            <React.Fragment key={note.id}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="bg-muted flex h-14 w-16 shrink-0 items-center justify-center rounded-md">
                    <FileText className="h-6 w-6" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold truncate">
                      {note.rawText && note.rawText.length > 40 
                        ? `${note.rawText.substring(0, 50)}...` 
                        : note.rawText}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {new Date(note.createdAt).toLocaleDateString('en-US')} at {new Date(note.createdAt).toLocaleTimeString('en-US')}
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-none md:col-span-2"></div>
                <Button
                  asChild
                  className="order-3 ml-auto w-fit gap-2 md:order-none bg-black text-white hover:bg-gray-800"
                >
                  <Link href={`/note/${note.id}`}>
                    <span>View note</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="border-b border-gray-200"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <NewNoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patientId={patientData.id}
        patientName={patientData.name}
      />
    </section>
  );
}
