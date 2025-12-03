import { Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

type TechItem = {
  name: string;
  description: string;
  icon?: string;
};

type TechCategory = {
  label: string;
  items: TechItem[];
};

const techStack: TechCategory[] = [
  {
    label: '⚛️ Frontend',
    items: [
      { name: 'React 18', description: 'Biblioteca UI' },
      { name: 'TypeScript', description: 'Tipagem estática' },
      { name: 'Vite', description: 'Build tool rápido' },
      { name: 'Tailwind CSS', description: 'Estilos utilitários' },
      { name: 'Shadcn/ui', description: 'Componentes UI' },
      { name: 'Radix UI', description: 'Primitivos acessíveis' },
      { name: 'React Hook Form', description: 'Formulários' },
      { name: 'Zod', description: 'Validação de esquemas' },
      { name: 'TanStack Query', description: 'Gerenciamento de estado' },
      { name: 'Wouter', description: 'Roteamento' },
      { name: 'Lucide React', description: 'Ícones' },
    ],
  },
  {
    label: '🔧 Backend',
    items: [
      { name: 'Node.js', description: 'Runtime JavaScript' },
      { name: 'Express.js', description: 'Framework web' },
      { name: 'TypeScript', description: 'Tipagem estática' },
      { name: 'ESBuild', description: 'Bundler rápido' },
    ],
  },
  {
    label: '🗄️ Banco de Dados',
    items: [
      { name: 'PostgreSQL', description: 'Banco relacional' },
      { name: 'Neon', description: 'Serverless Postgres' },
      { name: 'Drizzle ORM', description: 'ORM type-safe' },
      { name: 'Drizzle Kit', description: 'Migrations' },
    ],
  },
  {
    label: '🛠️ Ferramentas',
    items: [
      { name: 'Git', description: 'Controle de versão' },
      { name: 'npm', description: 'Package manager' },
      { name: 'Replit', description: 'Plataforma de desenvolvimento' },
    ],
  },
];

export function TechStackMenu() {
  return (
    <DropdownMenu>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 hidden md:flex"
        data-testid="button-tech-stack"
      >
        <Code2 className="w-4 h-4" />
        <span className="hidden lg:inline">Tech</span>
      </Button>

      <DropdownMenuContent align="end" className="w-80" data-testid="tech-stack-menu">
        <DropdownMenuLabel className="text-base font-bold" data-testid="tech-stack-title">
          📚 Tech Stack Completo
        </DropdownMenuLabel>
        <p className="px-2 py-1 text-xs text-muted-foreground">
          Tecnologias utilizadas no Conecta Tânia
        </p>

        {techStack.map((category, idx) => (
          <div key={category.label}>
            {idx > 0 && <DropdownMenuSeparator />}

            <DropdownMenuGroup className="py-2">
              <DropdownMenuLabel className="text-sm font-semibold px-2 py-1" data-testid={`tech-category-${idx}`}>
                {category.label}
              </DropdownMenuLabel>

              {category.items.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  disabled
                  className="cursor-default flex flex-col gap-1 py-2"
                  data-testid={`tech-item-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}

        <DropdownMenuSeparator />
        <div className="px-2 py-2 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold">📊 Totalizando:</p>
          <p>✅ 11 tecnologias Frontend</p>
          <p>✅ 4 tecnologias Backend</p>
          <p>✅ 4 ferramentas Banco de Dados</p>
          <p>✅ 3 ferramentas de Desenvolvimento</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
