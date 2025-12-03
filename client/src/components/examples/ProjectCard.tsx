import ProjectCard from '../ProjectCard';
import type { Project } from '@/lib/projectsData';

const sampleProject: Project = {
  id: '1c-agenda-1',
  title: 'Agenda Tânia Varella',
  students: ['Erick Gustavo', 'Adryan', 'Yasmin', 'Miguel', 'Sophia', 'João Vitor'],
  turma: '1C',
  category: 'Agenda',
  links: [
    { type: 'replit', url: '#', label: 'Ver no Replit' },
    { type: 'github', url: '#', label: 'GitHub' },
    { type: 'website', url: '#', label: 'Site Online' },
  ],
  description: 'Agenda digital para organização escolar.',
};

export default function ProjectCardExample() {
  return (
    <div className="max-w-sm">
      <ProjectCard project={sampleProject} />
    </div>
  );
}
