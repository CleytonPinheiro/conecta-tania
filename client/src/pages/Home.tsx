import { useRef, useMemo } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Leaf, Users, Calendar, Map, Loader2 } from 'lucide-react';
import type { Turma, Projeto } from '@shared/schema';

export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);

  const { data: turmas = [], isLoading: loadingTurmas } = useQuery<Turma[]>({
    queryKey: ['/api/turmas'],
  });

  const { data: projetos = [], isLoading: loadingProjetos } = useQuery<Projeto[]>({
    queryKey: ['/api/projetos'],
  });

  const isLoading = loadingTurmas || loadingProjetos;

  const totalStudents = useMemo(() => {
    const allStudents = new Set<string>();
    projetos.forEach(p => p.alunos.forEach(s => allStudents.add(s)));
    return allStudents.size;
  }, [projetos]);

  const turma1C = turmas.find(t => t.nome === '1C');
  const turma2C = turmas.find(t => t.nome === '2C');

  const projects1C = useMemo(() => 
    turma1C ? projetos.filter(p => p.turmaId === turma1C.id) : [], 
  [projetos, turma1C]);
  
  const projects2C = useMemo(() => 
    turma2C ? projetos.filter(p => p.turmaId === turma2C.id) : [], 
  [projetos, turma2C]);

  const students1C = useMemo(() => {
    const s = new Set<string>();
    projects1C.forEach(p => p.alunos.forEach(st => s.add(st)));
    return s.size;
  }, [projects1C]);

  const students2C = useMemo(() => {
    const s = new Set<string>();
    projects2C.forEach(p => p.alunos.forEach(st => s.add(st)));
    return s.size;
  }, [projects2C]);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-home">
      <Header />
      
      <main className="flex-1">
        <Hero 
          totalProjects={projetos.length}
          totalStudents={totalStudents}
          onScrollToProjects={scrollToProjects}
        />
        
        <section 
          ref={projectsRef} 
          className="py-12 md:py-16 lg:py-20"
          data-testid="section-turmas"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-turmas-title">
                Escolha uma Turma
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Navegue pelos projetos de cada turma e conheça os trabalhos desenvolvidos pelos alunos.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : turmas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nenhuma turma cadastrada ainda. Acesse o painel Admin para cadastrar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {turma1C && (
                  <Link href="/turma-1c">
                    <Card className="overflow-visible hover-elevate transition-all duration-300 cursor-pointer group" data-testid="card-turma-1c">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-br from-chart-1/20 via-chart-3/10 to-transparent p-6 md:p-8 rounded-t-lg">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-4">
                              <Badge className="bg-chart-1/20 text-chart-1 border-0">
                                Turma {turma1C.nome}
                              </Badge>
                              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                Projetos Turma 1C
                              </h3>
                              <p className="text-muted-foreground text-sm md:text-base">
                                {turma1C.descricao || 'Sistemas, agendas e mapas interativos'}
                              </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-chart-1/10 flex items-center justify-center shrink-0">
                              <Code className="w-8 h-8 text-chart-1" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Code className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{projects1C.length}</span>
                              <span className="text-muted-foreground">projetos</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{students1C}</span>
                              <span className="text-muted-foreground">alunos</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Code className="w-3 h-3" /> Sistema
                            </Badge>
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Calendar className="w-3 h-3" /> Agenda
                            </Badge>
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Map className="w-3 h-3" /> Mapas
                            </Badge>
                          </div>
                          
                          <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                            Ver Projetos
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                
                {turma2C && (
                  <Link href="/turma-2c">
                    <Card className="overflow-visible hover-elevate transition-all duration-300 cursor-pointer group" data-testid="card-turma-2c">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-br from-chart-2/20 via-chart-4/10 to-transparent p-6 md:p-8 rounded-t-lg">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-4">
                              <Badge className="bg-chart-2/20 text-chart-2 border-0">
                                Turma {turma2C.nome}
                              </Badge>
                              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                Projetos Turma 2C
                              </h3>
                              <p className="text-muted-foreground text-sm md:text-base">
                                {turma2C.descricao || 'Hortas escolares e sustentabilidade'}
                              </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-chart-2/10 flex items-center justify-center shrink-0">
                              <Leaf className="w-8 h-8 text-chart-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Leaf className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{projects2C.length}</span>
                              <span className="text-muted-foreground">projetos</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{students2C}</span>
                              <span className="text-muted-foreground">alunos</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Leaf className="w-3 h-3" /> Horta
                            </Badge>
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Leaf className="w-3 h-3" /> Sustentabilidade
                            </Badge>
                          </div>
                          
                          <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                            Ver Projetos
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
