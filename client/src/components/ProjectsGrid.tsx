import ProjectCard from './ProjectCard';
import type { Project } from '@/lib/projectsData';

type ProjectsGridProps = {
  projects: Project[];
  turmaLabel?: string;
};

export default function ProjectsGrid({ projects, turmaLabel }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-projects">
        <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="projects-grid">
      {turmaLabel && (
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground" data-testid={`text-section-${turmaLabel}`}>
            {turmaLabel}
          </h3>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
