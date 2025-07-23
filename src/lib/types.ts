export interface UserProfile {
  fullName: string;
  headline: string;
  phoneNumber: string;
  website: string;
  linkedIn: string;
  masterResume: {
    url: string;
    text: string;
    parsedOn: Date;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  jobPreferences: {
    titles: string[];
    locations: string[];
    workplace: Array<'remote' | 'hybrid' | 'onsite'>;
    minSalary: number;
    experienceLevels: string[];
  };
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skillsUsed: string[];
}

export interface Education {
  institution: string;
  degree: string;
  gradDate: string;
  details: string;
}

export interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  descriptionHTML: string;
  descriptionText: string;
  sourceURL: string;
  sourceSite: string;
  postedAt: Date;
  scrapedAt: Date;
  requiredSkills: string[];
  companyCultureSummary?: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  jobSnapshot: Partial<Job>;
  status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'archived';
  appliedAt?: Date;
  notes: string;
  contacts: Array<{ name: string; title: string; linkedIn: string }>;
}

export interface InterviewPrep {
    id: string;
    applicationId: string;
    stage: 'Phone Screen' | 'Technical Round' | 'Final';
    scheduledAt?: Date;
    generatedQuestions: string[];
    mockInterviewTranscripts: Array<{ question: string; answer: string; feedback: string }>;
}
