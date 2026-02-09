
import React from 'react';
import { Vacancy } from '../types';
import { Button } from './Button';

interface VacancyCardProps {
  vacancy: Vacancy;
  onDelete: (id: string) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{vacancy.title}</h3>
          <p className="text-indigo-600 font-medium">{vacancy.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          vacancy.employmentType === 'Remote' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {vacancy.employmentType}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {vacancy.location}
        </div>
        <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {vacancy.salary}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-6 line-clamp-3">
        {vacancy.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {vacancy.requirements.slice(0, 4).map((req, idx) => (
          <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded border border-indigo-100">
            {req}
          </span>
        ))}
        {vacancy.requirements.length > 4 && (
          <span className="text-xs text-gray-400 self-center">+{vacancy.requirements.length - 4} more</span>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button 
          variant="ghost" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(vacancy.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
