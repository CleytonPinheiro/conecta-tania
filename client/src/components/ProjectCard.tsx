import { ExternalLink, Github, Globe, Code, Leaf, Calendar, Map, Users, Video, Presentation, Edit, ImageIcon, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Project, ProjectLink, ProjectLinks } from '@/lib/projectsData';

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

function isProjectLinkArray(links: ProjectLink[] | ProjectLinks): links is ProjectLink[] {
  return Array.isArray(links);
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState<string>('');
  const [editDemoLink, setEditDemoLink] = useState<string>('');
  
  const CategoryIcon = categoryIcons[project.category] || Code;
  const categoryColor = categoryColors[project.category] || 'bg-muted text-muted-foreground';
  
  const hasDemo = !isProjectLinkArray(project.links) && (project.links as ProjectLinks).demo;

  const updateProjetoMutation = useMutation({
    mutationFn: async (data: { imagemUrl?: string; linkDemo?: string }) => {
      const projetoId = typeof project.id === 'string' ? parseInt(project.id.split('-')[0] + project.id.split('-')[1]) : project.id;
      return apiRequest('PATCH', `/api/projetos/${projetoId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projetos'] });
      setEditDialogOpen(false);
      setEditImagePreview('');
      setEditDemoLink('');
      toast({ title: 'Projeto atualizado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar projeto', variant: 'destructive' });
    },
  });

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    if (!editDemoLink && !editImagePreview) {
      toast({ title: 'Digite um link Demo ou adicione uma imagem', variant: 'destructive' });
      return;
    }

    const updateData: { imagemUrl?: string; linkDemo?: string } = {};
    if (editImagePreview) updateData.imagemUrl = editImagePreview;
    if (editDemoLink) updateData.linkDemo = editDemoLink;
    
    updateProjetoMutation.mutate(updateData);
  };

  const getAvailableLinks = () => {
    if (isProjectLinkArray(project.links)) {
      return [];
    }
    const links = project.links;
    const available = [];
    if (links.demo) available.push({ type: 'demo', icon: Globe, label: 'Demo' });
    if (links.canva) available.push({ type: 'canva', icon: Presentation, label: 'Canva' });
    if (links.video) available.push({ type: 'video', icon: Video, label: 'Vídeo' });
    if (links.github) available.push({ type: 'github', icon: Github, label: 'Código' });
    return available;
  };

  const renderLinks = () => {
    if (isProjectLinkArray(project.links)) {
      return project.links.map((link, index) => {
        const LinkIcon = getLinkIcon(link.type);
        const isPrimary = index === 0;
        return (
          <Button
            key={index}
            variant={isPrimary ? 'default' : getLinkVariant(link.type)}
            size={isPrimary ? 'default' : 'sm'}
            asChild
            data-testid={`link-${project.id}-${link.type}-${index}`}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
              <LinkIcon className="w-4 h-4" />
              <span>{link.label}</span>
            </a>
          </Button>
        );
      });
    } else {
      const links = project.links;
      const linkButtons = [];
      
      // Determine primary link (demo > canva > github > video)
      const primaryUrl = links.demo || links.canva || links.github || links.video;
      const primaryType = primaryUrl === links.demo ? 'demo' : 
                         primaryUrl === links.canva ? 'canva' :
                         primaryUrl === links.github ? 'github' : 'video';
      
      if (links.demo) {
        linkButtons.push(
          <Button 
            key="demo" 
            variant="default" 
            size="default" 
            asChild 
            data-testid={`link-${project.id}-demo`}
            className="gap-2"
          >
            <a href={links.demo} target="_blank" rel="noopener noreferrer">
              <Globe className="w-4 h-4" />
              <span>Ver Projeto</span>
            </a>
          </Button>
        );
      }
      
      if (links.canva && links.canva !== primaryUrl) {
        linkButtons.push(
          <Button 
            key="canva" 
            variant="outline" 
            size="sm" 
            asChild 
            data-testid={`link-${project.id}-canva`}
            className="gap-1.5"
          >
            <a href={links.canva} target="_blank" rel="noopener noreferrer">
              <Presentation className="w-4 h-4" />
              <span>Canva</span>
            </a>
          </Button>
        );
      }
      
      if (links.video) {
        linkButtons.push(
          <Button 
            key="video" 
            variant="outline" 
            size="sm" 
            asChild 
            data-testid={`link-${project.id}-video`}
            className="gap-1.5"
          >
            <a href={links.video} target="_blank" rel="noopener noreferrer">
              <Video className="w-4 h-4" />
              <span>Vídeo</span>
            </a>
          </Button>
        );
      }
      
      if (links.github) {
        linkButtons.push(
          <Button 
            key="github" 
            variant="outline" 
            size="sm" 
            asChild 
            data-testid={`link-${project.id}-github`}
            className="gap-1.5"
          >
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span>Código</span>
            </a>
          </Button>
        );
      }
      
      return linkButtons;
    }
  };

  return (
    <Card className="overflow-visible hover-elevate transition-all duration-300" data-testid={`card-project-${project.id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center rounded-t-lg overflow-hidden">
          {project.imagemUrl ? (
            <img 
              src={project.imagemUrl} 
              alt={`Screenshot do projeto ${project.title}`}
              className="w-full h-full object-cover"
              data-testid={`img-project-${project.id}`}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <CategoryIcon className="w-12 h-12 opacity-50" />
              <span className="text-sm font-medium">{project.category}</span>
            </div>
          )}
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

          {getAvailableLinks().length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground font-medium">Recursos disponíveis:</p>
              <div className="flex flex-wrap gap-1.5">
                {getAvailableLinks().map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Badge 
                      key={link.type} 
                      variant="secondary" 
                      className="flex items-center gap-1 text-xs"
                      data-testid={`badge-resource-${project.id}-${link.type}`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      {link.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 pt-2">
            {renderLinks()}
          </div>

          {!hasDemo && (
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2 mt-2"
                  data-testid={`button-edit-${project.id}`}
                >
                  <Edit className="w-4 h-4" />
                  Adicionar Screenshot e Demo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar {project.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Screenshot (opcional)</label>
                    <label className="block">
                      <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageChange}
                          className="hidden"
                        />
                        <div className="text-center">
                          <ImageIcon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Clique ou arraste uma imagem</p>
                        </div>
                      </div>
                    </label>
                    {editImagePreview && (
                      <div className="relative rounded-lg overflow-hidden">
                        <img 
                          src={editImagePreview} 
                          alt="Preview" 
                          className="w-full h-40 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setEditImagePreview('')}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-md p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Link Demo/Projeto</label>
                    <Input
                      placeholder="https://..."
                      value={editDemoLink}
                      onChange={(e) => setEditDemoLink(e.target.value)}
                      data-testid={`input-edit-demo-${project.id}`}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleSaveEdit}
                      disabled={updateProjetoMutation.isPending}
                      className="flex-1"
                      data-testid={`button-save-edit-${project.id}`}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
