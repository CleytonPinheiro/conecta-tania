import { GraduationCap, MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-card-border" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-semibold text-foreground leading-tight" data-testid="text-school-name">
                Colégio Estadual Tânia Varella
              </h1>
              <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm">
                <MapPin className="w-3 h-3" />
                <span data-testid="text-location">Maringá - PR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
