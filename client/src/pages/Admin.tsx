import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { 
  Plus, 
  Users, 
  FolderOpen, 
  Settings,
  ExternalLink,
  Github,
  Video,
  Presentation,
  Globe,
  ImageIcon
} from 'lucide-react';
import type { Turma, Projeto } from '@shared/schema';

// Form schemas
const turmaFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
});

const projetoFormSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().optional(),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  alunos: z.string().min(1, 'Informe pelo menos um aluno'),
  turmaId: z.number().min(1, 'Selecione uma turma'),
  imagemUrl: z.string().optional(),
  linkCanva: z.string().optional(),
  linkVideo: z.string().optional(),
  linkGithub: z.string().optional(),
  linkDemo: z.string().optional(),
});

type TurmaFormData = z.infer<typeof turmaFormSchema>;
type ProjetoFormData = z.infer<typeof projetoFormSchema>;

export default function Admin() {
  const { toast } = useToast();
  const [turmaDialogOpen, setTurmaDialogOpen] = useState(false);
  const [projetoDialogOpen, setProjetoDialogOpen] = useState(false);

  // Queries
  const { data: turmas = [], isLoading: loadingTurmas } = useQuery<Turma[]>({
    queryKey: ['/api/turmas'],
  });

  const { data: projetos = [], isLoading: loadingProjetos } = useQuery<Projeto[]>({
    queryKey: ['/api/projetos'],
  });

  // Turma form
  const turmaForm = useForm<TurmaFormData>({
    resolver: zodResolver(turmaFormSchema),
    defaultValues: {
      nome: '',
      descricao: '',
    },
  });

  // Projeto form
  const projetoForm = useForm<ProjetoFormData>({
    resolver: zodResolver(projetoFormSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      categoria: '',
      alunos: '',
      turmaId: 0,
      linkCanva: '',
      linkVideo: '',
      linkGithub: '',
      linkDemo: '',
    },
  });

  // Mutations - Turmas
  const createTurmaMutation = useMutation({
    mutationFn: async (data: TurmaFormData) => {
      return apiRequest('POST', '/api/turmas', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/turmas'] });
      setTurmaDialogOpen(false);
      turmaForm.reset();
      toast({ title: 'Turma criada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar turma', variant: 'destructive' });
    },
  });


  // Mutations - Projetos
  const createProjetoMutation = useMutation({
    mutationFn: async (data: ProjetoFormData) => {
      const payload = {
        ...data,
        alunos: data.alunos.split(',').map(a => a.trim()).filter(a => a),
        linkCanva: data.linkCanva || null,
        linkVideo: data.linkVideo || null,
        linkGithub: data.linkGithub || null,
        linkDemo: data.linkDemo || null,
      };
      return apiRequest('POST', '/api/projetos', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projetos'] });
      setProjetoDialogOpen(false);
      projetoForm.reset();
      toast({ title: 'Projeto criado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar projeto', variant: 'destructive' });
    },
  });

  // Handlers
  const onSubmitTurma = (data: TurmaFormData) => {
    createTurmaMutation.mutate(data);
  };

  const onSubmitProjeto = (data: ProjetoFormData) => {
    createProjetoMutation.mutate(data);
  };

  const openNewTurmaDialog = () => {
    turmaForm.reset({ nome: '', descricao: '' });
    setTurmaDialogOpen(true);
  };

  const openNewProjetoDialog = () => {
    projetoForm.reset({
      titulo: '',
      descricao: '',
      categoria: '',
      alunos: '',
      turmaId: 0,
      imagemUrl: '',
      linkCanva: '',
      linkVideo: '',
      linkGithub: '',
      linkDemo: '',
    });
    setProjetoDialogOpen(true);
  };

  const getTurmaName = (turmaId: number) => {
    return turmas.find(t => t.id === turmaId)?.nome || 'Sem turma';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-admin">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-admin-title">
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground">
                Gerencie turmas e projetos do Conecta Tânia
              </p>
            </div>
          </div>

          <Tabs defaultValue="turmas" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="turmas" className="gap-2" data-testid="tab-turmas">
                <Users className="w-4 h-4" />
                Turmas
              </TabsTrigger>
              <TabsTrigger value="projetos" className="gap-2" data-testid="tab-projetos">
                <FolderOpen className="w-4 h-4" />
                Projetos
              </TabsTrigger>
            </TabsList>

            {/* TURMAS TAB */}
            <TabsContent value="turmas" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Turmas Cadastradas</h2>
                <Dialog open={turmaDialogOpen} onOpenChange={setTurmaDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewTurmaDialog} className="gap-2" data-testid="button-new-turma">
                      <Plus className="w-4 h-4" />
                      Nova Turma
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Turma</DialogTitle>
                    </DialogHeader>
                    <Form {...turmaForm}>
                      <form onSubmit={turmaForm.handleSubmit(onSubmitTurma)} className="space-y-4">
                        <FormField
                          control={turmaForm.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome da Turma</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: 1C, 2C, 3A..." {...field} data-testid="input-turma-nome" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={turmaForm.control}
                          name="descricao"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição (opcional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Descrição da turma..." 
                                  {...field} 
                                  data-testid="input-turma-descricao"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setTurmaDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={createTurmaMutation.isPending}
                            data-testid="button-save-turma"
                          >
                            Criar
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {loadingTurmas ? (
                <div className="text-center py-12 text-muted-foreground">Carregando...</div>
              ) : turmas.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhuma turma cadastrada</p>
                    <Button onClick={openNewTurmaDialog} variant="outline" className="mt-4 gap-2">
                      <Plus className="w-4 h-4" />
                      Cadastrar primeira turma
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {turmas.map((turma) => {
                    const turmaProjects = projetos.filter(p => p.turmaId === turma.id);
                    return (
                      <Card key={turma.id} data-testid={`card-turma-${turma.id}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <Badge variant="secondary">{turma.nome}</Badge>
                          </CardTitle>
                          {turma.descricao && (
                            <CardDescription className="mt-2">
                              {turma.descricao}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FolderOpen className="w-4 h-4" />
                            <span>{turmaProjects.length} projeto(s)</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* PROJETOS TAB */}
            <TabsContent value="projetos" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Projetos Cadastrados</h2>
                <Dialog open={projetoDialogOpen} onOpenChange={setProjetoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={openNewProjetoDialog} 
                      className="gap-2" 
                      disabled={turmas.length === 0}
                      data-testid="button-new-projeto"
                    >
                      <Plus className="w-4 h-4" />
                      Novo Projeto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Novo Projeto</DialogTitle>
                    </DialogHeader>
                    <Form {...projetoForm}>
                      <form onSubmit={projetoForm.handleSubmit(onSubmitProjeto)} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={projetoForm.control}
                            name="titulo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Título do Projeto</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Sistema de Chamada" {...field} data-testid="input-projeto-titulo" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={projetoForm.control}
                            name="categoria"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Sistema, Horta, Mapa..." {...field} data-testid="input-projeto-categoria" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={projetoForm.control}
                          name="turmaId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Turma</FormLabel>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))} 
                                value={field.value ? field.value.toString() : ''}
                              >
                                <FormControl>
                                  <SelectTrigger data-testid="select-projeto-turma">
                                    <SelectValue placeholder="Selecione a turma" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {turmas.map((turma) => (
                                    <SelectItem key={turma.id} value={turma.id.toString()}>
                                      Turma {turma.nome}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={projetoForm.control}
                          name="alunos"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alunos (separados por vírgula)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Ex: João Silva, Maria Santos, Pedro Oliveira" 
                                  {...field} 
                                  data-testid="input-projeto-alunos"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={projetoForm.control}
                          name="descricao"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição (opcional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Descrição do projeto..." 
                                  {...field} 
                                  data-testid="input-projeto-descricao"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Links do Projeto (opcionais)
                          </h4>
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={projetoForm.control}
                              name="linkCanva"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Presentation className="w-4 h-4" />
                                    Link Canva
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://canva.com/..." {...field} data-testid="input-projeto-canva" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={projetoForm.control}
                              name="linkVideo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Video className="w-4 h-4" />
                                    Link Vídeo
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://youtube.com/..." {...field} data-testid="input-projeto-video" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={projetoForm.control}
                              name="linkGithub"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Github className="w-4 h-4" />
                                    Link GitHub
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://github.com/..." {...field} data-testid="input-projeto-github" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={projetoForm.control}
                              name="linkDemo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Link Demo
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://..." {...field} data-testid="input-projeto-demo" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setProjetoDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={createProjetoMutation.isPending}
                            data-testid="button-save-projeto"
                          >
                            Criar
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {turmas.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Cadastre pelo menos uma turma antes de adicionar projetos.
                    </p>
                  </CardContent>
                </Card>
              )}

              {loadingProjetos ? (
                <div className="text-center py-12 text-muted-foreground">Carregando...</div>
              ) : projetos.length === 0 && turmas.length > 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum projeto cadastrado</p>
                    <Button onClick={openNewProjetoDialog} variant="outline" className="mt-4 gap-2">
                      <Plus className="w-4 h-4" />
                      Cadastrar primeiro projeto
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projetos.map((projeto) => (
                    <Card key={projeto.id} data-testid={`card-projeto-${projeto.id}`}>
                      <CardHeader className="pb-2">
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {getTurmaName(projeto.turmaId)}
                          </Badge>
                          <CardTitle className="text-base truncate">
                            {projeto.titulo}
                          </CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {projeto.categoria}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {projeto.descricao && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {projeto.descricao}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {projeto.alunos.slice(0, 3).map((aluno, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {aluno}
                            </Badge>
                          ))}
                          {projeto.alunos.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{projeto.alunos.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2 pt-2">
                          {projeto.linkCanva && (
                            <a href={projeto.linkCanva} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Presentation className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {projeto.linkVideo && (
                            <a href={projeto.linkVideo} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Video className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {projeto.linkGithub && (
                            <a href={projeto.linkGithub} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Github className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {projeto.linkDemo && (
                            <a href={projeto.linkDemo} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Globe className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
