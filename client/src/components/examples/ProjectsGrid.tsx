import ProjectsGrid from '../ProjectsGrid';
import type { Project } from '@/lib/projectsData';

const sampleProjects: Project[] = [
  {
    id: '1c-mapa',
    title: 'Mapa Interativo',
    students: ['Kauã', 'Luiz', 'Nicolas'],
    turma: '1C',
    category: 'Mapas',
    links: [
      { type: 'replit', url: '#', label: 'Ver no Replit' },
    ],
    description: 'Projeto de mapa interativo.',
  },
  {
    id: '1c-presenca',
    title: 'Sistema de Presença',
    students: ['Erick', 'Carlos', 'Felipe'],
    turma: '1C',
    category: 'Sistema',
    links: [
      { type: 'replit', url: '#', label: 'Ver no Replit' },
    ],
    description: 'Sistema de gerenciamento.',
  },
];

export default function ProjectsGridExample() {
  return (
    <ProjectsGrid projects={sampleProjects} turmaLabel="Turma 1C" />
  );
}
