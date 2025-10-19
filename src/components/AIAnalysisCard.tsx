'use client';

import { useState, useEffect } from 'react';
import { processNote, getNoteById } from '@/app/http/notes';
import { Note, AiMeta, SOAPSummary } from '@/types';

interface AIAnalysisCardProps {
  noteId: number;
}

type TabType = 'icd10' | 'oasis' | 'discharge' | 'intake';

function isAiMeta(data: unknown): data is AiMeta {
  if (!data || typeof data !== 'object') return false;
  const meta = data as Record<string, unknown>;
  return 'insights' in meta || 'icd10_codes' in meta || 'oasis' in meta || 'discharge_report' in meta;
}

export default function AIAnalysisCard({ noteId }: AIAnalysisCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiMeta, setAiMeta] = useState<AiMeta | null>(null);
  const [noteData, setNoteData] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('icd10');

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await getNoteById(noteId);
        if (response.success) {
          setNoteData(response.data);
          if (isAiMeta(response.data.aiMeta)) {
            setAiMeta(response.data.aiMeta);
          }
        }
      } catch (error) {
        console.error('Error fetching note data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoteData();
  }, [noteId]);

  
  const handleGenerateAnalysis = async () => {
    setIsGenerating(true);
    try {
      const result = await processNote(noteId);
      if (result.success && result.aiMeta && isAiMeta(result.aiMeta)) {
        setAiMeta(result.aiMeta);
        if (noteData) {
          setNoteData({ ...noteData, aiMeta: result.aiMeta });
        }
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 ml-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Generate Report with AI</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleGenerateAnalysis}
            disabled={isGenerating}
            className="bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700 transition-colors text-sm disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Regenerate Analysis'}
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-black"></div>
            <p className="text-gray-500 text-sm mt-2">Loading note data...</p>
          </div>
        ) : isGenerating ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-black"></div>
            <p className="text-gray-500 text-sm mt-2">Generating analysis...</p>
          </div>
        ) : aiMeta ? (
          <div className="space-y-4">
            {aiMeta.insights ? (
              <>
                <div className="flex items-center border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('icd10')}
                    className={`flex h-7 items-center justify-center px-4 text-center text-sm font-medium transition-colors ${
                      activeTab === 'icd10'
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ICD-10 Codes
                  </button>
                  <button
                    onClick={() => setActiveTab('oasis')}
                    className={`flex h-7 items-center justify-center px-4 text-center text-sm font-medium transition-colors ${
                      activeTab === 'oasis'
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    OASIS
                  </button>
                  <button
                    onClick={() => setActiveTab('discharge')}
                    className={`flex h-7 items-center justify-center px-4 text-center text-sm font-medium transition-colors ${
                      activeTab === 'discharge'
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Discharge Report
                  </button>
                  <button
                    onClick={() => setActiveTab('intake')}
                    className={`flex h-7 items-center justify-center px-4 text-center text-sm font-medium transition-colors ${
                      activeTab === 'intake'
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Intake
                  </button>
                </div>

                <div className="mt-4">
                  {activeTab === 'icd10' && (
                    <div className="space-y-4">
                      {aiMeta.icd10_codes && aiMeta.icd10_codes.length > 0 ? (
                        <div className="border border-gray-200 rounded-md p-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">ICD-10 Diagnostic Codes</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-2 font-medium text-gray-700">ICD-10 Code</th>
                                  <th className="text-left py-2 px-2 font-medium text-gray-700">Description</th>
                                  {aiMeta.icd10_codes[0]?.confidence !== undefined && (
                                    <th className="text-left py-2 px-2 font-medium text-gray-700">Confidence</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {aiMeta.icd10_codes.map((code, index) => (
                                  <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                    <td className="py-2 px-2 font-mono text-sm text-gray-900 font-semibold">{code.code}</td>
                                    <td className="py-2 px-2 text-gray-700">{code.description}</td>
                                    {code.confidence !== undefined && (
                                      <td className="py-2 px-2 text-gray-600">{Math.round(code.confidence * 100)}%</td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-sm">ICD-10 codes not available</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'oasis' && (
                    <div className="space-y-4">
                      {aiMeta.oasis && Object.keys(aiMeta.oasis).length > 0 ? (
                        <div className="border border-gray-200 rounded-md p-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">OASIS Assessment</h4>
                          <p className="text-xs text-gray-600 mb-4">Outcome and Assessment Information Set - Home Health Care</p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-2 font-medium text-gray-700">Field</th>
                                  <th className="text-left py-2 px-2 font-medium text-gray-700">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(aiMeta.oasis).map(([key, value], index) => (
                                  <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                    <td className="py-2 px-2 font-medium text-gray-900 capitalize">{key.replace(/_/g, ' ')}</td>
                                    <td className="py-2 px-2 text-gray-700">{value || ''}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-sm">OASIS assessment not available</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'discharge' && (
                    <div className="space-y-4">
                      {aiMeta.discharge_report && Object.keys(aiMeta.discharge_report).length > 0 ? (
                        <div className="border border-gray-200 rounded-md p-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Discharge Report</h4>
                          <p className="text-xs text-gray-600 mb-4">Clinical discharge summary</p>
                          <div className="space-y-3">
                            {aiMeta.discharge_report.date && (
                              <div className="flex items-start">
                                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide min-w-[140px]">
                                  Date:
                                </span>
                                <span className="text-sm text-gray-900 flex-1">
                                  {new Date(aiMeta.discharge_report.date).toLocaleDateString('en-US')}
                                </span>
                              </div>
                            )}
                            {aiMeta.discharge_report.admission_reason && (
                              <div className="flex items-start">
                                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide min-w-[140px]">
                                  Admission Reason:
                                </span>
                                <span className="text-sm text-gray-900 flex-1">
                                  {aiMeta.discharge_report.admission_reason}
                                </span>
                              </div>
                            )}
                            {aiMeta.discharge_report.treatment_summary && (
                              <div className="flex items-start">
                                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide min-w-[140px]">
                                  Treatment Summary:
                                </span>
                                <span className="text-sm text-gray-900 flex-1">
                                  {aiMeta.discharge_report.treatment_summary}
                                </span>
                              </div>
                            )}
                            {aiMeta.discharge_report.progress && (
                              <div className="flex items-start">
                                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide min-w-[140px]">
                                  Progress:
                                </span>
                                <span className="text-sm text-gray-900 flex-1">
                                  {aiMeta.discharge_report.progress}
                                </span>
                              </div>
                            )}
                            {aiMeta.discharge_report.follow_up_recommendations && (
                              <div className="flex items-start">
                                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide min-w-[140px]">
                                  Follow-up:
                                </span>
                                <span className="text-sm text-gray-900 flex-1">
                                  {aiMeta.discharge_report.follow_up_recommendations}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-sm">Discharge report not available</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'intake' && (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-md p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Original Note Content</h4>
                        <div className="space-y-4">
                          
                          {noteData?.rawText && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">Transcription</h5>
                              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">
                                {noteData?.rawText}
                              </p>
                            </div>
                          )}

                          {noteData?.summary && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">SOAP Summary</h5>
                              <div className="space-y-2 bg-gray-50 p-3 rounded border">
                                {(() => {
                                  try {
                                    const soap: SOAPSummary = JSON.parse(noteData.summary);
                                    return (
                                      <>
                                        {soap.subjective && (
                                          <div>
                                            <span className="text-xs font-medium text-gray-600">S (Subjective):</span>
                                            <p className="text-sm text-gray-900 mt-1">{soap.subjective}</p>
                                          </div>
                                        )}
                                        {soap.objective && (
                                          <div>
                                            <span className="text-xs font-medium text-gray-600">O (Objective):</span>
                                            <p className="text-sm text-gray-900 mt-1">{soap.objective}</p>
                                          </div>
                                        )}
                                        {soap.assessment && (
                                          <div>
                                            <span className="text-xs font-medium text-gray-600">A (Assessment):</span>
                                            <p className="text-sm text-gray-900 mt-1">{soap.assessment}</p>
                                          </div>
                                        )}
                                        {soap.plan && (
                                          <div>
                                            <span className="text-xs font-medium text-gray-600">P (Plan):</span>
                                            <p className="text-sm text-gray-900 mt-1">{soap.plan}</p>
                                          </div>
                                        )}
                                      </>
                                    );
                                  } catch {
                                    return <p className="text-sm text-gray-600">{noteData.summary}</p>;
                                  }
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm text-gray-900">
                  {JSON.stringify(aiMeta, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Analysis not generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
