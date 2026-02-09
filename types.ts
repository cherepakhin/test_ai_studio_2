
export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  REMOTE = 'Remote'
}

export enum ExperienceLevel {
  JUNIOR = 'Junior',
  MID = 'Mid-level',
  SENIOR = 'Senior',
  LEAD = 'Lead'
}

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  requirements: string[];
  createdAt: string;
}

export interface VacancyFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  requirements: string;
}
