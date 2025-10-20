export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface Patient {
  id: number;
  name: string;
  dob?: string | null;
  createdAt: Date;
  updatedAt: Date;
  notes?: Note[];
}

export interface Note {
  id: number;
  inputType: string;
  rawText: string;
  summary: string;
  audioUrl: string;
  aiMeta: AiMeta | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  patient?: Patient;
}

export interface GetPatientsResponse {
  success: boolean;
  data: Patient[];
  total: number;
  message?: string;
}

export interface GetPatientResponse {
  success: boolean;
  data: Patient;
  message?: string;
}

export interface CreatePatientRequest {
  name: string;
  dob?: string | null;
}

export interface UpdatePatientRequest {
  id: number;
  name?: string;
  dob?: string | null;
}

export interface GetNotesResponse {
  success: boolean;
  data: Note[];
  total: number;
  message?: string;
}

export interface GetNoteResponse {
  success: boolean;
  data: Note;
  message?: string;
}

export interface CreateNoteRequest {
  patientId: number;
  inputType: 'TEXT' | 'AUDIO';
  rawText?: string;
}

export interface CreateNoteResponse {
  success: boolean;
  data?: Note;
  message?: string;
}

export interface UpdateNoteRequest {
  id: number;
  content?: string;
  patientId?: number;
}

export interface FollowUp {
  action: string;
  deadline: string;
  responsible_party: string;
}

export interface RiskFlag {
  risk: string;
  severity: string;
}

export interface ICD10Code {
  code: string;
  description: string;
  confidence?: number;
}

export interface OASISFields {
  mobility?: string;
  pain_level?: string;
  cognitive_function?: string;
  medication_management?: string;
  adl_score?: string;
  [key: string]: string | undefined;
}

export interface DischargeReport {
  date?: string;
  admission_reason?: string;
  treatment_summary?: string;
  progress?: string;
  follow_up_recommendations?: string;
}

export interface SOAPSummary {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface ClinicalInsights {
  keywords: string[];
  follow_ups: FollowUp[];
  risk_flags: RiskFlag[];
  urgency_level: string;
}

export interface AiMeta {
  insights: ClinicalInsights;
  icd10_codes: ICD10Code[];
  oasis: OASISFields;
  discharge_report: DischargeReport;
  processedAt: string;
}