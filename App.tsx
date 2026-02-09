
import React, { useState, useEffect, useCallback } from 'react';
import { Vacancy, VacancyFormData } from './types';
import { vacancyService } from './services/vacancyService';
import { VacancyCard } from './components/VacancyCard';
import { VacancyForm } from './components/VacancyForm';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isViewForm, setIsViewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVacancies = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await vacancyService.getAll();
      setVacancies(data);
    } catch (error) {
      console.error("Failed to load vacancies", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVacancies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateVacancy = async (data: VacancyFormData) => {
    try {
      const newVac = await vacancyService.create(data);
      setVacancies(prev => [newVac, ...prev]);
      setIsViewForm(false);
    } catch (error) {
      alert("Error creating vacancy. Please try again.");
    }
  };

  const handleDeleteVacancy = async (id: string) => {
    if (confirm("Are you sure you want to remove this vacancy?")) {
      try {
        await vacancyService.delete(id);
        setVacancies(prev => prev.filter(v => v.id !== id));
      } catch (error) {
        alert("Error deleting vacancy.");
      }
    }
  };

  const filteredVacancies = vacancies.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-3">
              E
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">ElevateHR</h1>
          </div>
          
          {!isViewForm && (
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vacancies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {!isViewForm && (
              <Button onClick={() => setIsViewForm(true)}>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Post Vacancy
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {isViewForm ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <VacancyForm 
              onSubmit={handleCreateVacancy} 
              onCancel={() => setIsViewForm(false)} 
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Current Vacancies</h2>
                <p className="text-gray-500">Manage all open positions across your organization</p>
              </div>
              <div className="text-sm font-medium text-gray-400">
                {filteredVacancies.length} active listings
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-64 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-100 rounded"></div>
                      <div className="h-3 bg-gray-100 rounded"></div>
                      <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVacancies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filteredVacancies.map(vacancy => (
                  <VacancyCard 
                    key={vacancy.id} 
                    vacancy={vacancy} 
                    onDelete={handleDeleteVacancy}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-20 px-4 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vacancies found</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  {searchQuery ? `We couldn't find any results matching "${searchQuery}".` : "You haven't posted any vacancies yet. Start by creating your first listing."}
                </p>
                {searchQuery ? (
                  <Button variant="secondary" onClick={() => setSearchQuery('')}>Clear Search</Button>
                ) : (
                  <Button onClick={() => setIsViewForm(true)}>Post First Vacancy</Button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Info (Simulating Stack Documentation) */}
      <footer className="mt-20 border-t border-gray-200 py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mb-4">Architecture Highlights</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-left max-w-xs">
              <h4 className="font-bold text-gray-700 text-sm mb-1">Frontend Layer</h4>
              <p className="text-xs text-gray-500 leading-relaxed">React 18 + TypeScript SPA with Tailwind CSS for high-fidelity UI. Optimized for responsiveness and accessibility.</p>
            </div>
            <div className="text-left max-w-xs">
              <h4 className="font-bold text-gray-700 text-sm mb-1">Service Layer (REST)</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Asynchronous data handling mimicking a Spring Boot Java backend. Integrated with Gemini API for smart job description generation.</p>
            </div>
            <div className="text-left max-w-xs">
              <h4 className="font-bold text-gray-700 text-sm mb-1">Testing & Logic</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Clean separation of concerns. Pure business logic ready for unit testing via Jest/Vitest (simulated in service layer).</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
