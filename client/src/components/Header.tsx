import { GraduationCap, MapPin, Home, Users, Menu, Settings, Leaf } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ContactMenu } from '@/components/ContactMenu';
import { TechStackMenu } from '@/components/TechStackMenu';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/horta', label: 'Horta', icon: Leaf },
  { href: '/turma-1c', label: 'Turma 1C', icon: Users },
  { href: '/turma-2c', label: 'Turma 2C', icon: Users },
  { href: '/admin', label: 'Admin', icon: Settings },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-card-border" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-lg p-1 -m-1" data-testid="link-home-logo">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-foreground leading-tight" data-testid="text-project-name">
                Conecta Tânia
              </h1>
              <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm">
                <MapPin className="w-3 h-3" />
                <span data-testid="text-location">CETV - Maringá, PR</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    data-testid={`nav-link-${item.href.replace('/', '') || 'home'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <ContactMenu />
            <TechStackMenu />
            <ThemeToggle />
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-2 mt-8" data-testid="nav-mobile">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        className="w-full justify-start gap-3"
                        data-testid={`nav-mobile-link-${item.href.replace('/', '') || 'home'}`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
                <div className="pt-4 border-t mt-4 space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="nav-mobile-contact"
                  >
                    📞 Contato
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="nav-mobile-tech-stack"
                  >
                    📚 Tech Stack
                  </Button>
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm text-muted-foreground">Tema</span>
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
