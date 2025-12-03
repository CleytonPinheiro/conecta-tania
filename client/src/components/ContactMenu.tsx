import { Mail, Linkedin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type FeedbackForm = {
  name: string;
  email: string;
  message: string;
  type: 'critica' | 'sugestao' | 'elogio';
};

export function ContactMenu() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FeedbackForm>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      type: 'sugestao',
    },
  });

  const onSubmit = async (data: FeedbackForm) => {
    setIsSubmitting(true);
    try {
      // Enviar via email usando formspree ou similar
      const subject = `[Conecta Tânia] ${
        data.type === 'critica'
          ? 'Crítica'
          : data.type === 'sugestao'
            ? 'Sugestão'
            : 'Elogio'
      }`;

      const emailBody = `Nome: ${data.name}\nEmail: ${data.email}\nTipo: ${data.type}\n\n${data.message}`;

      // Abrir email client padrão
      window.location.href = `mailto:cleyton.pinheiro.santos@escola.pr.gov.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      toast({
        title: 'Sucesso!',
        description: 'Seu cliente de email será aberto. Clique em enviar!',
      });

      form.reset();
      setShowForm(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível preparar o email. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {!showForm ? (
          <>
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
                onClick={() => setShowForm(true)}
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
          </>
        ) : (
          <div className="p-4 space-y-4" data-testid="contact-feedback-form-content">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Enviar Feedback</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
                data-testid="button-close-feedback-form"
              >
                ✕
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome"
                          {...field}
                          data-testid="input-feedback-name"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          {...field}
                          data-testid="input-feedback-email"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Tipo de Feedback</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          data-testid="select-feedback-type"
                          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="sugestao">Sugestão</option>
                          <option value="critica">Crítica</option>
                          <option value="elogio">Elogio</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Compartilhe sua mensagem..."
                          {...field}
                          data-testid="textarea-feedback-message"
                          className="resize-none h-24"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  data-testid="button-submit-feedback"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
