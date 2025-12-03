import { Mail, Linkedin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FeedbackModal } from '@/components/FeedbackModal';

export function ContactMenu() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hidden md:flex"
          data-testid="button-contact"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden lg:inline">Contato</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96" data-testid="contact-menu">
        <DropdownMenuLabel className="text-base font-bold" data-testid="contact-menu-title">
          📞 Entre em Contato
        </DropdownMenuLabel>
        <p className="px-2 py-1 text-xs text-muted-foreground">
          Críticas, sugestões e elogios são bem-vindos!
        </p>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="py-2">
          <DropdownMenuLabel className="text-sm font-semibold px-2 py-1">
            Redes Sociais
          </DropdownMenuLabel>

          <DropdownMenuItem asChild data-testid="contact-linkedin">
            <a
              href="https://www.linkedin.com/in/cleytonpinheiro/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex items-center gap-3 py-2"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-medium text-sm">LinkedIn</span>
                <span className="text-xs text-muted-foreground">
                  Cleyton Pinheiro
                </span>
              </div>
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              window.location.href = 'mailto:cleyton.pinheiro.santos@escola.pr.gov.br';
            }}
            data-testid="contact-email"
            className="cursor-pointer flex items-center gap-3 py-2"
          >
            <Mail className="w-4 h-4 text-red-600" />
            <div className="flex flex-col">
              <span className="font-medium text-sm">Email Institucional</span>
              <span className="text-xs text-muted-foreground">
                cleyton.pinheiro.santos@escola.pr.gov.br
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="py-2">
          <DropdownMenuLabel className="text-sm font-semibold px-2 py-1">
            Feedback
          </DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => setShowFeedbackModal(true)}
            data-testid="contact-feedback-form"
            className="cursor-pointer flex items-center gap-3 py-2"
          >
            <Send className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium text-sm">Enviar Feedback</span>
              <span className="text-xs text-muted-foreground">
                Críticas e sugestões
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
    </DropdownMenu>
  );
}
