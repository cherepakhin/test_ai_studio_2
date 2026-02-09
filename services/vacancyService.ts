
import { Vacancy, VacancyFormData, EmploymentType, ExperienceLevel } from '../types';

// Mock initial data
const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Senior React Engineer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA',
    description: 'Lead the frontend development of our next-generation cloud platform.',
    salary: '$160k - $190k',
    employmentType: EmploymentType.FULL_TIME,
    experienceLevel: ExperienceLevel.SENIOR,
    requirements: ['React', 'TypeScript', 'Tailwind', 'Unit Testing'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Cloud Architect',
    company: 'Nimbus Solutions',
    location: 'Remote',
    description: 'Design scalable infrastructure for global distribution networks.',
    salary: '$180k - $220k',
    employmentType: EmploymentType.REMOTE,
    experienceLevel: ExperienceLevel.LEAD,
    requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    createdAt: new Date().toISOString()
  }
];

class VacancyService {
  private vacancies: Vacancy[] = [...MOCK_VACANCIES];

  async getAll(): Promise<Vacancy[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.vacancies]), 400); // Simulate network latency
    });
  }

  async create(data: VacancyFormData): Promise<Vacancy> {
    const newVacancy: Vacancy = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      requirements: data.requirements.split(',').map(r => r.trim()).filter(r => r),
      createdAt: new Date().toISOString()
    };
    this.vacancies.unshift(newVacancy);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newVacancy), 600);
    });
  }

  async delete(id: string): Promise<void> {
    this.vacancies = this.vacancies.filter(v => v.id !== id);
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  }
}

export const vacancyService = new VacancyService();
