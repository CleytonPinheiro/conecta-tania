import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type FeedbackForm = {
  name: string;
  email: string;
  message: string;
  type: 'critica' | 'sugestao' | 'elogio';
};

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const subject = `[Conecta Tânia] ${
        data.type === 'critica'
          ? 'Crítica'
          : data.type === 'sugestao'
            ? 'Sugestão'
            : 'Elogio'
      }`;

      const emailBody = `Nome: ${data.name}\nEmail: ${data.email}\nTipo: ${data.type}\n\n${data.message}`;

      window.location.href = `mailto:cleyton.pinheiro.santos@escola.pr.gov.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      toast({
        title: 'Sucesso!',
        description: 'Seu cliente de email será aberto. Clique em enviar!',
      });

      form.reset();
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="feedback-modal">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">📤 Enviar Feedback</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Nome</FormLabel>
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
                  <FormLabel className="text-sm">Email</FormLabel>
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
                  <FormLabel className="text-sm">Tipo de Feedback</FormLabel>
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
                  <FormLabel className="text-sm">Mensagem</FormLabel>
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

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                data-testid="button-cancel-feedback"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
                data-testid="button-submit-feedback"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
