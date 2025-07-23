export interface UserProfile {
  id: string;
  firebase_uid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location: string;
  headline: string;
  summary: string;
  master_resume: string;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
}

export interface Education {
  id: string;
  user_id: string;
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Skill {
    id: string;
    user_id: string;
    skill_name: string;
}

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  description: string;
  url: string;
  source: string;
  posted_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  job_id: string;
  status: 'interested' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  applied_at: string;
  notes: string;
  // Joined from jobs table
  title?: string;
  company_name?: string;
  location?: string;
}

export interface InterviewPrep {
    id: string;
    applicationId: string;
    stage: 'Phone Screen' | 'Technical Round' | 'Final';
    scheduledAt?: Date;
    generatedQuestions: string[];
    mockInterviewTranscripts: Array<{ question: string; answer: string; feedback: string }>;
}
