
import React, { useState } from 'react';

const CodeBlock = ({ filename, code, language = 'java' }: { filename: string, code: string, language?: string }) => (
  <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
    <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 mr-2"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-2"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 mr-3"></div>
        <span className="text-sm font-semibold text-gray-700 font-mono">{filename}</span>
      </div>
      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{language}</span>
    </div>
    <pre className="p-6 text-sm font-mono overflow-x-auto text-gray-800 leading-relaxed bg-[#fdfdfd]">
      {code}
    </pre>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'backend' | 'frontend' | 'testing'>('backend');

  const content = {
    backend: [
      { name: 'Vacancy.java', code: `// JPA Entity Definition\n@Entity\n@Table(name = "vacancies")\npublic class Vacancy {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String title;\n    private String company;\n    // ... getters, setters, enums\n}` },
      { name: 'VacancyRepository.java', code: `// Spring Data JPA\n@Repository\npublic interface VacancyRepository extends JpaRepository<Vacancy, Long> {\n    List<Vacancy> findByTitleContainingIgnoreCase(String title);\n}` },
      { name: 'VacancyService.java', code: `// Business Logic Layer\n@Service\npublic class VacancyService {\n    @Transactional\n    public Vacancy save(Vacancy v) {\n        return repository.save(v);\n    }\n}` },
      { name: 'VacancyController.java', code: `// REST API Layer\n@RestController\n@RequestMapping("/api/vacancies")\npublic class VacancyController {\n    @PostMapping\n    public ResponseEntity<Vacancy> create(@RequestBody Vacancy v) {\n        return ResponseEntity.ok(service.save(v));\n    }\n}` }
    ],
    frontend: [
      { name: 'VacancyApp.java', code: `// GWT Entry Point\npublic class VacancyApp implements EntryPoint {\n    public void onModuleLoad() {\n        RootPanel.get().add(new VacancyView());\n    }\n}` },
      { name: 'VacancyView.java', code: `// GWT UiBinder Logic\npublic class VacancyView extends Composite {\n    @UiField TextBox titleBox;\n    @UiHandler("submitButton")\n    void onSave(ClickEvent e) {\n        // Remote Call Logic\n    }\n}` },
      { name: 'VacancyView.ui.xml', code: `<ui:UiBinder xmlns:ui="urn:ui:com.google.gwt.uibinder">\n    <g:HTMLPanel>\n        <g:TextBox ui:field="titleBox" />\n        <g:Button ui:field="submitButton" />\n    </g:HTMLPanel>\n</ui:UiBinder>`, language: 'xml' }
    ],
    testing: [
      { name: 'VacancyServiceTest.java', code: `// JUnit 5 + Mockito Unit Testing\npublic class VacancyServiceTest {\n    @Test\n    void testGetAll() {\n        when(repo.findAll()).thenReturn(mockList);\n        assertEquals(1, service.getAll().size());\n    }\n}` }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6 sm:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="max-w-4xl mx-auto mb-16 text-center">
        <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Architecture Transformation</div>
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Java + GWT Enterprise Stack</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The service has been migrated to a high-availability Java architecture. Explore the Spring Boot backend, GWT frontend, and JUnit test suites.
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-10 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 flex space-x-1">
        {(['backend', 'frontend', 'testing'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-lg scale-[1.02]' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Module
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="mb-8 p-6 bg-indigo-900 rounded-2xl text-white shadow-xl flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Source Repository View</h2>
            <p className="text-indigo-200 text-sm">Reviewing production-ready {activeTab} components.</p>
          </div>
          <div className="hidden sm:block">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-900 bg-indigo-700 flex items-center justify-center text-[10px] font-bold">DEV</div>
                ))}
             </div>
          </div>
        </div>

        {content[activeTab].map((file, idx) => (
          <CodeBlock 
            key={idx} 
            filename={file.name} 
            code={file.code} 
            language={file.language || 'java'} 
          />
        ))}
      </div>

      <footer className="max-w-4xl mx-auto mt-20 pt-10 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          ElevateHR Engineering &bull; Spring Boot 3.x &bull; GWT 2.10 &bull; JUnit 5
        </p>
      </footer>
    </div>
  );
};

export default App;
