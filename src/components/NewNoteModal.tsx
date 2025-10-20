'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '@/app/http/client-notes';

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
  patientName: string;
}

type NoteType = 'text' | 'audio' | null;

export default function NewNoteModal({ isOpen, onClose, patientId, patientName }: NewNoteModalProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<NoteType>(null);
  const [noteText, setNoteText] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleMedicalText = `Patient presents with:
- Chief complaint: Chest pain and shortness of breath
- History of present illness: 45-year-old male with acute onset chest pain radiating to left arm, associated with diaphoresis and nausea. Symptoms started approximately 2 hours ago while at rest. Patient describes pain as pressure-like, 8/10 in intensity. No relief with rest or position changes. Denies fever, cough, or recent illness.
- Past medical history: Hypertension (diagnosed 2018), diabetes mellitus type 2 (diagnosed 2020), hyperlipidemia, GERD
- Current medications: Metformin 500mg BID, Lisinopril 10mg daily, Atorvastatin 20mg daily, Aspirin 81mg daily, Omeprazole 20mg daily
- Allergies: NKDA (no known drug allergies)
- Social history: Non-smoker, occasional alcohol use (2-3 drinks per week), works as office manager, exercises 2-3 times per week
- Family history: Father with MI at age 65, mother with diabetes, maternal grandmother with breast cancer
- Review of systems: Positive for chest pain, shortness of breath, diaphoresis. Negative for headache, dizziness, abdominal pain, nausea, vomiting, diarrhea, urinary symptoms
- Physical examination: 
  - Vital signs: BP 145/90, HR 95 bpm, RR 18, O2 sat 98% on room air, afebrile, weight 180 lbs
  - General: No acute distress, well-appearing male
  - HEENT: Normocephalic, atraumatic, PERRL, EOMI, no cervical lymphadenopathy
  - Cardiovascular: Regular rate and rhythm, no murmurs, rubs, or gallops, no JVD
  - Pulmonary: Clear to auscultation bilaterally, no wheezing, rales, or rhonchi
  - Abdomen: Soft, non-tender, non-distended, normal bowel sounds
  - Extremities: Warm, no edema, pulses intact
  - Neurological: Alert and oriented x3, no focal deficits
- Laboratory results: Pending - EKG ordered, cardiac enzymes ordered
- Assessment: Possible acute coronary syndrome vs musculoskeletal chest pain vs GERD. Given patient's age, risk factors (hypertension, diabetes, family history), and symptom presentation, ACS cannot be ruled out. Differential diagnosis includes costochondritis, anxiety, and esophageal spasm.
- Plan: 
  - EKG, cardiac enzymes (troponin I), chest X-ray, CBC, CMP, lipid panel
  - Cardiology consultation for further evaluation
  - Continue current medications
  - Patient counseled on symptoms to watch for and when to return to ED
  - Follow-up in 1-2 days or sooner if symptoms worsen
  - Consider stress test if initial workup negative
  - Lifestyle counseling regarding diet and exercise`;

  const downloadSampleAudio = () => {
    const link = document.createElement('a');
    link.href = '/medical-audio-ex.mp3';
    link.download = 'medical-audio-example.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedType(null);
    setNoteText('');
    setAudioFile(null);
    onClose();
  };

  const handleBack = () => {
    setSelectedType(null);
    setNoteText('');
    setAudioFile(null);
  };

  const handleSubmit = async () => {
    try {
      const noteData = {
        patientId,
        inputType: (selectedType === 'text' ? 'TEXT' : 'AUDIO') as 'TEXT' | 'AUDIO',
        rawText: selectedType === 'text' ? noteText : undefined,
      };

      const result = await createNote(noteData, audioFile || undefined);
      
      if (result.success) {
        handleClose();
        router.push(`/note/${result.data.id}`);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const copySampleText = () => {
    setNoteText(sampleMedicalText);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              {selectedType && (
                <button
                  onClick={handleBack}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {!selectedType ? 'Create New Note' : selectedType === 'text' ? 'Write Note' : 'Record Audio'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {!selectedType ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Choose how you want to create the note for {patientName}:
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setSelectedType('text')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Write Note</h4>
                    <p className="text-sm text-gray-500">Type your clinical notes manually</p>
                  </div>
                  <svg className="h-5 w-5 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setSelectedType('audio')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Record Audio</h4>
                    <p className="text-sm text-gray-500">Record voice notes and get AI transcription</p>
                  </div>
                  <svg className="h-5 w-5 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : selectedType === 'text' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">
                  Write your clinical notes for {patientName}:
                </p>
                <button
                  onClick={copySampleText}
                  className="inline-flex items-center px-3 py-1 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Use sample medical note
                </button>
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter your clinical notes here..."
                className="w-full min-h-[200px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!noteText.trim()}
                  className="inline-flex items-center px-3 py-1 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Note
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">
                  Upload an audio file for {patientName}:
                </p>
                <button
                  onClick={downloadSampleAudio}
                  className="inline-flex items-center px-2 py-1 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Download sample
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {audioFile ? audioFile.name : 'Click to upload audio file'}
                    </p>
                
                  </div>
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!audioFile}
                  className="inline-flex items-center px-3 py-1 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload & Process
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
