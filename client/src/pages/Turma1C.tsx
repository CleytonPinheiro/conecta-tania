import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import ProjectsGrid from '@/components/ProjectsGrid';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Users, Code, Calendar, Map, Loader2 } from 'lucide-react';
import type { Turma, Projeto } from '@shared/schema';

export default function Turma1C() {
  const { data: turmas = [] } = useQuery<Turma[]>({
    queryKey: ['/api/turmas'],
  });

  const { data: allProjetos = [], isLoading } = useQuery<Projeto[]>({
    queryKey: ['/api/projetos'],
  });

  const turma1C = turmas.find(t => t.nome === '1C');
  
  const projects = useMemo(() => 
    turma1C ? allProjetos.filter(p => p.turmaId === turma1C.id) : [], 
  [allProjetos, turma1C]);

  const totalStudents = useMemo(() => {
    const allStudents = new Set<string>();
    projects.forEach(p => p.alunos.forEach(s => allStudents.add(s)));
    return allStudents.size;
  }, [projects]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => cats.add(p.categoria));
    return Array.from(cats);
  }, [projects]);

  // Convert database projects to ProjectCard format
  const formattedProjects = useMemo(() => 
    projects.map(p => ({
      id: p.id.toString(),
      title: p.titulo,
      description: p.descricao || '',
      students: p.alunos,
      category: p.categoria,
      turma: '1C',
      links: {
        canva: p.linkCanva || undefined,
        video: p.linkVideo || undefined,
        github: p.linkGithub || undefined,
        demo: p.linkDemo || undefined,
      }
    })),
  [projects]);

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-turma-1c">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-chart-1/10 via-background to-chart-3/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm" data-testid="badge-turma">
                Turma 1C
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-turma-title">
                Projetos da Turma 1C
              </h1>
              
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                Projetos desenvolvidos pelos alunos da turma 1C, incluindo sistemas, agendas e mapas interativos.
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-chart-1" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground" data-testid="text-project-count">{projects.length}</div>
                    <div className="text-sm text-muted-foreground">Projetos</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-chart-3" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground" data-testid="text-student-count">{totalStudents}</div>
                    <div className="text-sm text-muted-foreground">Alunos</div>
                  </div>
                </div>
              </div>
              
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {categories.map((cat) => {
                    const icons: Record<string, typeof Code> = {
                      'Sistema': Code,
                      'Agenda': Calendar,
                      'Mapas': Map,
                    };
                    const Icon = icons[cat] || Code;
                    return (
                      <Badge key={cat} variant="outline" className="gap-1.5">
                        <Icon className="w-3 h-3" />
                        {cat}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16" data-testid="section-projects-1c">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : formattedProjects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum projeto cadastrado para esta turma ainda.
              </div>
            ) : (
              <ProjectsGrid projects={formattedProjects} />
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
