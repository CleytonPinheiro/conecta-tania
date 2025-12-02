import { useState, useRef, useMemo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ClassFilter from '@/components/ClassFilter';
import ProjectsGrid from '@/components/ProjectsGrid';
import Footer from '@/components/Footer';
import { projectsData } from '@/lib/projectsData';

type FilterOption = 'all' | '1C' | '2C';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const projectsRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => ({
    all: projectsData.length,
    '1C': projectsData.filter(p => p.turma === '1C').length,
    '2C': projectsData.filter(p => p.turma === '2C').length,
  }), []);

  const totalStudents = useMemo(() => {
    const allStudents = new Set<string>();
    projectsData.forEach(p => p.students.forEach(s => allStudents.add(s)));
    return allStudents.size;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    return projectsData.filter(p => p.turma === activeFilter);
  }, [activeFilter]);

  const projects1C = useMemo(() => 
    projectsData.filter(p => p.turma === '1C'), 
  []);
  
  const projects2C = useMemo(() => 
    projectsData.filter(p => p.turma === '2C'), 
  []);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header />
      
      <main>
        <Hero 
          totalProjects={projectsData.length}
          totalStudents={totalStudents}
          onScrollToProjects={scrollToProjects}
        />
        
        <section 
          ref={projectsRef} 
          className="py-12 md:py-16 lg:py-20"
          data-testid="section-projects"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-projects-title">
                Projetos
              </h2>
              <ClassFilter 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts}
              />
            </div>
            
            {activeFilter === 'all' ? (
              <div className="space-y-12">
                <ProjectsGrid projects={projects1C} turmaLabel="Turma 1C" />
                <ProjectsGrid projects={projects2C} turmaLabel="Turma 2C" />
              </div>
            ) : (
              <ProjectsGrid projects={filteredProjects} />
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
