import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

type TutorialStep = {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: '👋 Bem-vindo ao Conecta Tânia!',
    description: 'Vamos te mostrar como funciona esta plataforma incrível de portfólio de projetos. Clique em "Próximo" para começar!',
    position: 'bottom',
  },
  {
    id: 'what-is',
    title: '🎓 O que é Conecta Tânia?',
    description: 'Este é um portfólio interativo que reúne 21 projetos reais desenvolvidos por alunos do curso de Desenvolvimento de Sistemas. Cada projeto representa o trabalho incrível desses estudantes!',
    position: 'bottom',
  },
  {
    id: 'projects',
    title: '📦 Veja os Projetos',
    description: 'Aqui você encontra os cards dos projetos. Cada card mostra a imagem, nome, alunos envolvidos e categorias (Sistema, Agenda, Mapas, Horta).',
    target: '[data-testid="section-turmas"]',
    position: 'bottom',
  },
  {
    id: 'project-card',
    title: '🎨 Card do Projeto',
    description: 'Passe o mouse sobre um card para ver o botão de edição (para administradores). Clique nos nomes dos alunos para editá-los. Os badges coloridos mostram quais recursos estão disponíveis.',
    target: '[data-testid^="card-project-"]',
    position: 'top',
  },
  {
    id: 'filters',
    title: '🏫 Filtros por Turma',
    description: 'Clique em "Turma 1C" ou "Turma 2C" no menu para ver apenas os projetos de cada turma. Isso ajuda a acompanhar o progresso de cada classe!',
    position: 'bottom',
  },
  {
    id: 'dark-mode',
    title: '🌙 Tema Claro/Escuro',
    description: 'Veja o ícone de sol/lua no topo direito? Clique para alternar entre tema claro e tema escuro. Escolha o que mais gosta!',
    target: '[data-testid="button-theme-toggle"]',
    position: 'bottom',
  },
  {
    id: 'admin',
    title: '⚙️ Painel de Administração',
    description: 'Se você é professor ou admin, acesse "/admin" para criar novas turmas e projetos. Você pode gerenciar todos os conteúdos da plataforma!',
    position: 'bottom',
  },
  {
    id: 'features',
    title: '✨ Recursos Principais',
    description: 'Cada projeto tem links para: Demo (teste ao vivo), Canva (apresentações), Vídeos (explicações) e GitHub (código). Tudo em um só lugar!',
    position: 'bottom',
  },
  {
    id: 'footer',
    title: '📞 Entre em Contato',
    description: 'No rodapé, você encontra o desenvolvedor. Clique no nome para conectar via LinkedIn e conversar sobre este projeto incrível!',
    position: 'top',
  },
  {
    id: 'end',
    title: '🎉 Pronto!',
    description: 'Agora você conhece o Conecta Tânia! Explore os projetos, descubra o talento desses alunos e se inspire. Bom passeio! 🚀',
    position: 'bottom',
  },
];

export default function GuidedTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [location] = useLocation();

  // Inicializa o tutorial apenas na home
  useEffect(() => {
    if (location === '/') {
      const tutorialDisabled = localStorage.getItem('conecta_tania_tutorial_disabled');
      if (!tutorialDisabled) {
        setIsOpen(true);
      }
    }
  }, [location]);

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('conecta_tania_tutorial_disabled', 'true');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRestart = () => {
    localStorage.removeItem('conecta_tania_tutorial_disabled');
    setCurrentStep(0);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleRestart}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover-elevate transition-all"
        title="Iniciar tutorial"
        data-testid="button-start-tutorial"
      >
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <span>?</span>
          <span>Tutorial</span>
        </span>
      </button>
    );
  }

  return (
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
        data-testid="tutorial-overlay"
      />

      {/* Modal do Tutorial */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-card border border-card-border rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in fade-in slide-in-from-bottom-4"
        data-testid="tutorial-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-card-border">
          <h2 className="text-lg font-bold text-foreground">{step.title}</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded transition-colors"
            data-testid="button-close-tutorial"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          <p className="text-foreground text-base leading-relaxed">
            {step.description}
          </p>

          {/* Indicador de Progresso */}
          <div className="flex items-center gap-2 mt-6">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%`,
                }}
                data-testid="tutorial-progress-bar"
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {currentStep + 1}/{TUTORIAL_STEPS.length}
            </span>
          </div>
        </div>

        {/* Footer com Botões */}
        <div className="flex items-center justify-between gap-2 p-4 border-t border-card-border bg-muted/30">
          {/* Botão Anterior */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-2"
            data-testid="button-tutorial-previous"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </Button>

          {/* Botão Pular */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-xs"
            data-testid="button-tutorial-skip"
          >
            <SkipForward className="w-4 h-4 mr-1" />
            Pular Tutorial
          </Button>

          {/* Botão Próximo/Finalizar */}
          <Button
            variant="default"
            size="sm"
            onClick={handleNext}
            className="gap-2"
            data-testid="button-tutorial-next"
          >
            <span>{isLastStep ? 'Finalizar' : 'Próximo'}</span>
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>

        {/* Dica de Teclado */}
        <div className="px-4 pb-3 text-xs text-muted-foreground text-center">
          Dica: Pressione <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Esc</kbd> para fechar
        </div>
      </div>

      {/* Suporte a ESC key */}
      <EscapeKeyHandler onEscape={handleClose} />
    </>
  );
}

// Componente auxiliar para capturar Escape
function EscapeKeyHandler({ onEscape }: { onEscape: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape]);

  return null;
}
