
import React, { useState } from 'react';
import { VacancyFormData, EmploymentType, ExperienceLevel } from '../types';
import { Button } from './Button';
import { generateJobDescription } from '../services/geminiService';

interface VacancyFormProps {
  onSubmit: (data: VacancyFormData) => Promise<void>;
  onCancel: () => void;
}

export const VacancyForm: React.FC<VacancyFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<VacancyFormData>({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    employmentType: EmploymentType.FULL_TIME,
    experienceLevel: ExperienceLevel.MID,
    requirements: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateAI = async () => {
    if (!formData.title || !formData.company) {
      alert("Please provide at least a Job Title and Company for AI assistance.");
      return;
    }
    setIsGenerating(true);
    const aiDesc = await generateJobDescription(formData.title, formData.company);
    setFormData(prev => ({ ...prev, description: aiDesc }));
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register New Vacancy</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Senior Backend Engineer"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
          <input
            required
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Acme Corp"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Berlin, Germany"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
          <input
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. $120k - $150k"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {Object.values(EmploymentType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {Object.values(ExperienceLevel).map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">Job Description*</label>
          <button 
            type="button"
            onClick={handleGenerateAI}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : '✨ Generate with Gemini'}
          </button>
        </div>
        <textarea
          required
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          placeholder="Describe the role and responsibilities..."
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma-separated)</label>
        <input
          name="requirements"
          value={formData.requirements}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          placeholder="e.g. Java, Spring Boot, AWS, Docker"
        />
      </div>

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1"
          isLoading={isSubmitting}
        >
          Create Vacancy
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
