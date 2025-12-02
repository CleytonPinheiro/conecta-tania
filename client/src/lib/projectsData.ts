export type ProjectLink = {
  type: 'replit' | 'github' | 'website';
  url: string;
  label: string;
};

export type ProjectLinks = {
  canva?: string;
  video?: string;
  github?: string;
  demo?: string;
};

export type Project = {
  id: string;
  title: string;
  students: string[];
  turma: string;
  category: string;
  links: ProjectLink[] | ProjectLinks;
  description?: string;
};

export const projectsData: Project[] = [
  {
    id: '1c-mapa',
    title: 'Mapa Interativo',
    students: ['Kauã', 'Luiz', 'Nicolas'],
    turma: '1C',
    category: 'Mapas',
    links: [
      { type: 'replit', url: 'https://replit.com/@CleytonPin/Mapa-or-Kaua-Vitor', label: 'Ver no Replit' },
      { type: 'replit', url: 'https://replit.com/@kauadutra964/Mapa', label: 'Versão Alternativa' },
    ],
    description: 'Projeto de mapa interativo desenvolvido com tecnologias web.',
  },
  {
    id: '1c-presenca',
    title: 'Sistema de Presença Escolar',
    students: ['Erick Augusto', 'Klaivler', 'Carlos', 'Felipe', 'Jhonathan'],
    turma: '1C',
    category: 'Sistema',
    links: [
      { type: 'replit', url: 'https://replit.com/@erickpriori/Sistema-de-presenca-escolar', label: 'Ver no Replit' },
    ],
    description: 'Sistema para gerenciamento de presença escolar dos alunos.',
  },
  {
    id: '1c-agenda-1',
    title: 'Agenda Tânia Varella',
    students: ['Erick Gustavo', 'Adryan', 'Yasmin', 'Miguel', 'Sophia', 'João Vitor'],
    turma: '1C',
    category: 'Agenda',
    links: [
      { type: 'replit', url: 'https://replit.com/@javatay547/agenda-tania-varella', label: 'Ver no Replit' },
      { type: 'github', url: 'https://github.com/erickxzy/agenda-tania-varella', label: 'GitHub' },
      { type: 'website', url: 'https://agenda-tania-varella-1.onrender.com/', label: 'Site Online' },
    ],
    description: 'Agenda digital para organização escolar.',
  },
  {
    id: '1c-agenda-2',
    title: 'Agenda Escolar',
    students: ['Kaio', 'Henrique', 'Bryan', 'Maria Gabriela', 'João Pedro'],
    turma: '1C',
    category: 'Agenda',
    links: [
      { type: 'replit', url: 'https://replit.com/@javatay547/agenda-tania-varella', label: 'Ver no Replit' },
    ],
    description: 'Sistema de agenda para atividades escolares.',
  },
  {
    id: '2c-catalogo-1',
    title: 'Catálogo de Plantas',
    students: ['Ana Carolina Fernandes', 'Mariany', 'Guilherme', 'Leonardo', 'Luan', 'Maria Vitória'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@marianyschneide/Catalogo-de-Plantas-1', label: 'Ver no Replit' },
      { type: 'website', url: 'https://horta-tania.replit.app', label: 'Site Online' },
    ],
    description: 'Catálogo digital de plantas da horta escolar.',
  },
  {
    id: '2c-horta-ana',
    title: 'Horta Escolar',
    students: ['Ana Santana'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@anasantanasilva/horta-2', label: 'Ver no Replit' },
    ],
    description: 'Projeto sobre cultivo e manutenção da horta escolar.',
  },
  {
    id: '2c-comprebem-gustavo',
    title: 'Compre Bem - Hortas',
    students: ['Edgar', 'Gustavo'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@gustavofrancis4/Compre-Bem', label: 'Ver no Replit' },
      { type: 'website', url: 'https://gustavo348568.github.io/hortassg/', label: 'Site Online' },
    ],
    description: 'Plataforma de informações sobre produtos da horta.',
  },
  {
    id: '2c-hortalicas-emilly',
    title: 'Hortaliças',
    students: ['Emilly'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@emillyferreirac/hortalicas', label: 'Ver no Replit' },
    ],
    description: 'Guia sobre cultivo de hortaliças.',
  },
  {
    id: '2c-horta-fabia',
    title: 'Horta Digital',
    students: ['Fabia'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@fabianeves/horta-3', label: 'Ver no Replit' },
    ],
    description: 'Projeto digital sobre horta escolar.',
  },
  {
    id: '2c-comprebem-felipe',
    title: 'Compre Bem',
    students: ['Felipe'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@feliperaul/Compre-Bem', label: 'Ver no Replit' },
    ],
    description: 'Sistema de vendas de produtos da horta.',
  },
  {
    id: '2c-horta-isadora',
    title: 'Horta Sustentável',
    students: ['Isadora'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@isadoraolivei13/horta-1', label: 'Ver no Replit' },
    ],
    description: 'Projeto de horta com foco em sustentabilidade.',
  },
  {
    id: '2c-hortaescolar-julia',
    title: 'Horta Escolar',
    students: ['Julia Martins'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@juliamartinssil/HortaScolar', label: 'Ver no Replit' },
    ],
    description: 'Site informativo sobre a horta da escola.',
  },
  {
    id: '2c-hortaescolar-helena',
    title: 'Horta Escolar',
    students: ['Maria Eduarda Ferreira', 'Helena'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@helenaspn/HortaScolar', label: 'Ver no Replit' },
    ],
    description: 'Portal da horta escolar.',
  },
  {
    id: '2c-hortalicas-marcela',
    title: 'Hortaliças',
    students: ['Maria Marcela', 'Maria Eduarda Marcela'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@mariamarcelafer/hortalicas', label: 'Ver no Replit' },
    ],
    description: 'Catálogo de hortaliças cultivadas na escola.',
  },
  {
    id: '2c-horta-isadora2',
    title: 'Horta Verde',
    students: ['Maria Isadora'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@mariasouzaferre/horta-3', label: 'Ver no Replit' },
    ],
    description: 'Projeto sobre cultivo orgânico.',
  },
  {
    id: '2c-comprebem-murilo',
    title: 'Compre Bem',
    students: ['Murilo Figueiredo'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@murilofigueire1/Compre-Bem', label: 'Ver no Replit' },
    ],
    description: 'Plataforma de comercialização da horta.',
  },
  {
    id: '2c-hortalisas-myrian',
    title: 'Hortaliças',
    students: ['Myrian'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@myriancruz/hortalisas-1', label: 'Ver no Replit' },
    ],
    description: 'Informações sobre cultivo de hortaliças.',
  },
  {
    id: '2c-hortalicas-nataly',
    title: 'Hortaliças',
    students: ['Nataly'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@natalyaraujolim/hortalicas', label: 'Ver no Replit' },
    ],
    description: 'Guia prático de hortaliças.',
  },
  {
    id: '2c-hortaescolar-paola',
    title: 'Horta Escolar',
    students: ['Paola'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@paolabotan/HortaScolar', label: 'Ver no Replit' },
    ],
    description: 'Site sobre a horta escolar.',
  },
  {
    id: '2c-projetohorta-pedro',
    title: 'Projeto Horta',
    students: ['Pedro'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@Pedruzx064/Projeto-Horta', label: 'Ver no Replit' },
    ],
    description: 'Projeto completo sobre horta escolar.',
  },
  {
    id: '2c-catalogo-samuel',
    title: 'Catálogo de Plantas',
    students: ['Samuel'],
    turma: '2C',
    category: 'Horta',
    links: [
      { type: 'replit', url: 'https://replit.com/@samuelbilieri/Catalogo-de-Plantas-1', label: 'Ver no Replit' },
    ],
    description: 'Catálogo digital de plantas.',
  },
];
