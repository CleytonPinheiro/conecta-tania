import { ExternalLink, Github, Globe, Code, Leaf, Calendar, Map, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Project, ProjectLink } from '@/lib/projectsData';

type ProjectCardProps = {
  project: Project;
};

const categoryIcons: Record<string, typeof Code> = {
  'Sistema': Code,
  'Agenda': Calendar,
  'Mapas': Map,
  'Horta': Leaf,
};

const categoryColors: Record<string, string> = {
  'Sistema': 'bg-chart-1/10 text-chart-1',
  'Agenda': 'bg-chart-3/10 text-chart-3',
  'Mapas': 'bg-chart-5/10 text-chart-5',
  'Horta': 'bg-chart-2/10 text-chart-2',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-chart-1/20 text-chart-1',
    'bg-chart-2/20 text-chart-2',
    'bg-chart-3/20 text-chart-3',
    'bg-chart-4/20 text-chart-4',
    'bg-chart-5/20 text-chart-5',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getLinkIcon(type: ProjectLink['type']) {
  switch (type) {
    case 'replit':
      return Code;
    case 'github':
      return Github;
    case 'website':
      return Globe;
    default:
      return ExternalLink;
  }
}

function getLinkVariant(type: ProjectLink['type']): 'default' | 'outline' | 'secondary' {
  switch (type) {
    case 'replit':
      return 'default';
    case 'github':
      return 'outline';
    case 'website':
      return 'secondary';
    default:
      return 'outline';
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category] || Code;
  const categoryColor = categoryColors[project.category] || 'bg-muted text-muted-foreground';

  return (
    <Card className="overflow-visible hover-elevate transition-all duration-300" data-testid={`card-project-${project.id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center rounded-t-lg">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <CategoryIcon className="w-12 h-12 opacity-50" />
            <span className="text-sm font-medium">{project.category}</span>
          </div>
          <Badge 
            className={`absolute top-3 right-3 ${categoryColor} border-0`}
            data-testid={`badge-turma-${project.id}`}
          >
            Turma {project.turma}
          </Badge>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground leading-tight" data-testid={`text-title-${project.id}`}>
              {project.title}
            </h3>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>Alunos:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.students.map((student, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5"
                  data-testid={`student-${project.id}-${index}`}
                >
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className={`text-xs ${getAvatarColor(student)}`}>
                      {getInitials(student)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{student}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.links.map((link, index) => {
              const LinkIcon = getLinkIcon(link.type);
              return (
                <Button
                  key={index}
                  variant={getLinkVariant(link.type)}
                  size="sm"
                  asChild
                  data-testid={`link-${project.id}-${link.type}-${index}`}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5" />
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
