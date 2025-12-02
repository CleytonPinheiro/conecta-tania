import { ChevronDown, Users, Code, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeroProps = {
  totalProjects: number;
  totalStudents: number;
  onScrollToProjects: () => void;
};

export default function Hero({ totalProjects, totalStudents, onScrollToProjects }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Code className="w-4 h-4" />
            <span>Projetos de Programação 2024</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight" data-testid="text-hero-title">
            Trabalhos dos Alunos
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            Conheça os projetos desenvolvidos pelos nossos alunos nas disciplinas de tecnologia. 
            Trabalhos criativos que mostram o potencial e dedicação de cada estudante.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-4">
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold" data-testid="text-total-projects">{totalProjects}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Projetos</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold" data-testid="text-total-students">{totalStudents}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Alunos</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-10 h-10 rounded-full bg-chart-2/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-chart-2" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold">2</div>
                <div className="text-xs md:text-sm text-muted-foreground">Turmas</div>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={onScrollToProjects}
              size="lg"
              className="gap-2"
              data-testid="button-scroll-projects"
            >
              Ver Trabalhos
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
