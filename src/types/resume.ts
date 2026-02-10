export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate: string;
  credentialId: string;
  url: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
}

export type TemplateStyle = 'classic' | 'modern' | 'minimal';

export type FormStep =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications';

export const FORM_STEPS: { key: FormStep; label: string }[] = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'summary', label: 'Summary' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'certifications', label: 'Certifications' },
];

export const createEmptyResume = (): ResumeData => ({
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skillCategories: [],
  certifications: [],
});

export const createWorkExperience = (): WorkExperience => ({
  id: crypto.randomUUID(),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: [],
});

export const createEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
  highlights: [],
});

export const createSkillCategory = (): SkillCategory => ({
  id: crypto.randomUUID(),
  name: '',
  skills: [],
});

export const createCertification = (): Certification => ({
  id: crypto.randomUUID(),
  name: '',
  issuer: '',
  date: '',
  expirationDate: '',
  credentialId: '',
  url: '',
});
