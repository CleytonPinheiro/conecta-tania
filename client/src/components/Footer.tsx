import { GraduationCap, Heart, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-card-border py-8 md:py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground" data-testid="text-footer-school">
                Colégio Estadual Tânia Varella
              </h4>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="w-3 h-3" />
                <span>Maringá - PR</span>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground" data-testid="text-footer-credits">
              Projetos desenvolvidos pelos alunos das turmas 1C e 2C
            </p>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-end gap-1 mt-1">
              Feito com <Heart className="w-3.5 h-3.5 text-chart-5 fill-chart-5" /> em {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
