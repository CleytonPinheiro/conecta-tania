import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import ProjectsGrid from '@/components/ProjectsGrid';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Users, Leaf, Loader2 } from 'lucide-react';
import type { Turma, Projeto } from '@shared/schema';

export default function Turma2C() {
  const { data: turmas = [] } = useQuery<Turma[]>({
    queryKey: ['/api/turmas'],
  });

  const { data: allProjetos = [], isLoading } = useQuery<Projeto[]>({
    queryKey: ['/api/projetos'],
  });

  const turma2C = turmas.find(t => t.nome === '2C');
  
  const projects = useMemo(() => 
    turma2C ? allProjetos.filter(p => p.turmaId === turma2C.id) : [], 
  [allProjetos, turma2C]);

  const totalStudents = useMemo(() => {
    const allStudents = new Set<string>();
    projects.forEach(p => p.alunos.forEach(s => allStudents.add(s)));
    return allStudents.size;
  }, [projects]);

  // Convert database projects to ProjectCard format
  const formattedProjects = useMemo(() => 
    projects.map(p => ({
      id: p.id.toString(),
      title: p.titulo,
      description: p.descricao || '',
      students: p.alunos,
      category: p.categoria,
      turma: '2C',
      links: {
        canva: p.linkCanva || undefined,
        video: p.linkVideo || undefined,
        github: p.linkGithub || undefined,
        demo: p.linkDemo || undefined,
      }
    })),
  [projects]);

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-turma-2c">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-chart-2/10 via-background to-chart-4/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm" data-testid="badge-turma">
                Turma 2C
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-turma-title">
                Projetos da Turma 2C
              </h1>
              
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                Projetos focados em hortas escolares e sustentabilidade, desenvolvidos pelos alunos da turma 2C.
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-chart-2/20 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground" data-testid="text-project-count">{projects.length}</div>
                    <div className="text-sm text-muted-foreground">Projetos</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-chart-4/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-chart-4" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground" data-testid="text-student-count">{totalStudents}</div>
                    <div className="text-sm text-muted-foreground">Alunos</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline" className="gap-1.5">
                  <Leaf className="w-3 h-3" />
                  Horta Escolar
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Leaf className="w-3 h-3" />
                  Sustentabilidade
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16" data-testid="section-projects-2c">
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
