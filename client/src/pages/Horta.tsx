import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { 
  Trash2, Plus, Loader2, Play, Power, RotateCw, Clock, Droplets, Leaf,
  Check, X
} from 'lucide-react';
import type { HortaMidia, InsertHortaMidia, HortaRegaControl, HortaRegaSchedule, InsertHortaRegaSchedule } from '@shared/schema';

const diasSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];

export default function Horta() {
  const { toast } = useToast();
  const [showFormMidia, setShowFormMidia] = useState(false);
  const [showFormSchedule, setShowFormSchedule] = useState(false);

  // Queries
  const { data: midias = [], isLoading: loadingMidias } = useQuery<HortaMidia[]>({
    queryKey: ['/api/horta-midias'],
  });

  const { data: regaControl, isLoading: loadingControl, refetch: refetchControl } = useQuery<HortaRegaControl>({
    queryKey: ['/api/horta-rega-control'],
  });

  const { data: schedules = [], isLoading: loadingSchedules, refetch: refetchSchedules } = useQuery<HortaRegaSchedule[]>({
    queryKey: ['/api/horta-rega-schedules'],
  });

  // Forms
  const formMidia = useForm<InsertHortaMidia>({
    defaultValues: {
      titulo: '',
      descricao: '',
      tipo: 'video',
      url: '',
      thumbnailUrl: '',
    },
  });

  const formSchedule = useForm<InsertHortaRegaSchedule>({
    defaultValues: {
      titulo: '',
      descricao: '',
      horaLigada: '08:00',
      horaDesligada: '18:00',
      diasSemana: [],
      ativo: 'sim',
    },
  });

  // Mutations
  const toggleRegaMutation = useMutation({
    mutationFn: (status: 'ligado' | 'desligado') =>
      apiRequest('PATCH', '/api/horta-rega-control', { statusAtivo: status }),
    onSuccess: () => {
      refetchControl();
      toast({ title: 'Sucesso!', description: 'Sistema de rega atualizado!' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao controlar rega', variant: 'destructive' });
    },
  });

  const createMidiaMutation = useMutation({
    mutationFn: (data: InsertHortaMidia) => apiRequest('POST', '/api/horta-midias', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/horta-midias'] });
      toast({ title: 'Sucesso!', description: 'Mídia adicionada!' });
      formMidia.reset();
      setShowFormMidia(false);
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao adicionar mídia', variant: 'destructive' });
    },
  });

  const deleteMidiaMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/horta-midias/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/horta-midias'] });
      toast({ title: 'Sucesso!', description: 'Mídia removida!' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao remover mídia', variant: 'destructive' });
    },
  });

  const createScheduleMutation = useMutation({
    mutationFn: (data: InsertHortaRegaSchedule) => apiRequest('POST', '/api/horta-rega-schedules', data),
    onSuccess: () => {
      refetchSchedules();
      toast({ title: 'Sucesso!', description: 'Agendamento criado!' });
      formSchedule.reset();
      setShowFormSchedule(false);
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao criar agendamento', variant: 'destructive' });
    },
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/horta-rega-schedules/${id}`),
    onSuccess: () => {
      refetchSchedules();
      toast({ title: 'Sucesso!', description: 'Agendamento removido!' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao remover agendamento', variant: 'destructive' });
    },
  });

  const onSubmitMidia = (data: InsertHortaMidia) => {
    createMidiaMutation.mutate(data);
  };

  const onSubmitSchedule = (data: InsertHortaRegaSchedule) => {
    createScheduleMutation.mutate(data);
  };

  const videos = midias.filter(m => m.tipo === 'video');
  const fotos = midias.filter(m => m.tipo === 'foto');
  const isRegaLigada = regaControl?.statusAtivo === 'ligado';

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-horta">
      <Header />

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3" data-testid="text-horta-title">
                <Leaf className="w-10 h-10 text-primary" />
                Horta Smart
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Sistema inteligente de rega conectado online. Controle o fluxo de água via smartphone e programe horários automáticos para irrigação sustentável.
              </p>
            </div>
          </div>

          {/* Control Panel */}
          {!loadingControl && regaControl && (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5" data-testid="card-rega-control">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-6 h-6 text-primary" />
                    <CardTitle className="text-2xl">Painel de Controle</CardTitle>
                  </div>
                  <Badge variant={isRegaLigada ? 'default' : 'secondary'} className="text-base px-3 py-1" data-testid="badge-status">
                    {isRegaLigada ? '🟢 LIGADO' : '🔴 DESLIGADO'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Status da Rega</p>
                    <p className="text-2xl font-bold" data-testid="text-status">
                      {isRegaLigada ? 'Ativa' : 'Inativa'}
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Umidade do Solo</p>
                    <p className="text-2xl font-bold" data-testid="text-umidade">
                      {regaControl.umidadeAtual}%
                    </p>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button
                    size="lg"
                    className="gap-2 flex-1 min-w-48"
                    onClick={() => toggleRegaMutation.mutate('ligado')}
                    disabled={isRegaLigada || toggleRegaMutation.isPending}
                    variant={isRegaLigada ? 'secondary' : 'default'}
                    data-testid="button-rega-on"
                  >
                    <Power className="w-5 h-5" />
                    Ligar Rega
                  </Button>
                  <Button
                    size="lg"
                    className="gap-2 flex-1 min-w-48"
                    variant="destructive"
                    onClick={() => toggleRegaMutation.mutate('desligado')}
                    disabled={!isRegaLigada || toggleRegaMutation.isPending}
                    data-testid="button-rega-off"
                  >
                    <Power className="w-5 h-5" />
                    Desligar Rega
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Última atualização: {regaControl.ultimaAtualizacao || 'Carregando...'}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Schedule Section */}
          <section data-testid="section-agendamentos">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Agendamentos
              </h2>
              <Button
                onClick={() => setShowFormSchedule(!showFormSchedule)}
                className="gap-2"
                data-testid="button-add-schedule"
              >
                <Plus className="w-4 h-4" />
                Novo Agendamento
              </Button>
            </div>

            {showFormSchedule && (
              <Card className="mb-6" data-testid="form-schedule">
                <CardHeader>
                  <CardTitle>Criar Novo Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...formSchedule}>
                    <form onSubmit={formSchedule.handleSubmit(onSubmitSchedule)} className="space-y-4">
                      <FormField
                        control={formSchedule.control}
                        name="titulo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Manhã" {...field} data-testid="input-schedule-titulo" required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formSchedule.control}
                        name="descricao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição (opcional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Ex: Rega matinal" {...field} value={field.value || ''} data-testid="textarea-schedule-desc" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={formSchedule.control}
                          name="horaLigada"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hora de Ligar</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} data-testid="input-hora-ligada" required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={formSchedule.control}
                          name="horaDesligada"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hora de Desligar</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} data-testid="input-hora-desligada" required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormItem>
                        <FormLabel>Dias da Semana</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {diasSemana.map((dia) => (
                            <button
                              key={dia}
                              type="button"
                              onClick={() => {
                                const current = formSchedule.getValues('diasSemana') || [];
                                if (current.includes(dia)) {
                                  formSchedule.setValue('diasSemana', current.filter(d => d !== dia));
                                } else {
                                  formSchedule.setValue('diasSemana', [...current, dia]);
                                }
                              }}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                (formSchedule.getValues('diasSemana') || []).includes(dia)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                              data-testid={`button-dia-${dia}`}
                            >
                              {dia.charAt(0).toUpperCase() + dia.slice(1)}
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowFormSchedule(false)}
                          data-testid="button-cancel-schedule"
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={createScheduleMutation.isPending} data-testid="button-submit-schedule">
                          {createScheduleMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                          Criar Agendamento
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {schedules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedules.map((schedule) => (
                  <Card key={schedule.id} data-testid={`schedule-card-${schedule.id}`}>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg" data-testid={`text-schedule-titulo-${schedule.id}`}>
                            {schedule.titulo}
                          </h3>
                          {schedule.descricao && (
                            <p className="text-sm text-muted-foreground" data-testid={`text-schedule-desc-${schedule.id}`}>
                              {schedule.descricao}
                            </p>
                          )}
                        </div>
                        <Badge variant={schedule.ativo === 'sim' ? 'default' : 'secondary'} data-testid={`badge-schedule-status-${schedule.id}`}>
                          {schedule.ativo === 'sim' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </Badge>
                      </div>

                      <div className="bg-muted rounded p-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span data-testid={`text-schedule-hours-${schedule.id}`}>
                            {schedule.horaLigada} - {schedule.horaDesligada}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {schedule.diasSemana?.map((dia) => (
                            <Badge key={dia} variant="outline" className="text-xs" data-testid={`badge-dia-${schedule.id}-${dia}`}>
                              {dia.substring(0, 3).toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteScheduleMutation.mutate(schedule.id)}
                        disabled={deleteScheduleMutation.isPending}
                        data-testid={`button-delete-schedule-${schedule.id}`}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remover
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground" data-testid="empty-schedules">
                Nenhum agendamento criado. Clique em "Novo Agendamento" para adicionar um.
              </div>
            )}
          </section>

          {/* Media Section */}
          <section data-testid="section-midias">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">Documentação da Horta</h2>
              <Button
                onClick={() => setShowFormMidia(!showFormMidia)}
                className="gap-2"
                data-testid="button-add-midia"
              >
                <Plus className="w-4 h-4" />
                Adicionar Mídia
              </Button>
            </div>

            {showFormMidia && (
              <Card className="mb-6" data-testid="form-add-midia">
                <CardHeader>
                  <CardTitle>Adicionar Mídia</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...formMidia}>
                    <form onSubmit={formMidia.handleSubmit(onSubmitMidia)} className="space-y-4">
                      <FormField
                        control={formMidia.control}
                        name="titulo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Plantio de Tomates" {...field} data-testid="input-midia-titulo" required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formMidia.control}
                        name="descricao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Descreva a mídia..." {...field} value={field.value || ''} data-testid="textarea-midia-descricao" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formMidia.control}
                        name="tipo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                data-testid="select-midia-tipo"
                                className="w-full px-3 py-2 rounded-md border border-input bg-background"
                              >
                                <option value="video">Vídeo (YouTube)</option>
                                <option value="foto">Foto</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formMidia.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="YouTube ou Imagem URL"
                                {...field}
                                value={field.value || ''}
                                data-testid="input-midia-url"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowFormMidia(false)}
                          data-testid="button-cancel-midia"
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={createMidiaMutation.isPending} data-testid="button-submit-midia">
                          {createMidiaMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                          Adicionar
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Vídeos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => {
                    const youtubeId = extractYouTubeId(video.url);
                    return (
                      <Card key={video.id} className="overflow-hidden hover-elevate" data-testid={`video-card-${video.id}`}>
                        {youtubeId && (
                          <div className="relative w-full h-48 bg-black">
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeId}`}
                              title={video.titulo}
                              className="w-full h-full"
                              allowFullScreen
                              data-testid={`iframe-video-${video.id}`}
                            />
                          </div>
                        )}
                        <CardContent className="pt-4 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg" data-testid={`text-video-titulo-${video.id}`}>
                              {video.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground" data-testid={`text-video-descricao-${video.id}`}>
                              {video.descricao}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMidiaMutation.mutate(video.id)}
                            disabled={deleteMidiaMutation.isPending}
                            data-testid={`button-delete-video-${video.id}`}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remover
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fotos */}
            {fotos.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  📷 Fotos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fotos.map((foto) => (
                    <Card key={foto.id} className="overflow-hidden hover-elevate" data-testid={`foto-card-${foto.id}`}>
                      <div className="relative w-full h-48 bg-muted overflow-hidden">
                        <img
                          src={foto.url}
                          alt={foto.titulo}
                          className="w-full h-full object-cover"
                          data-testid={`img-foto-${foto.id}`}
                        />
                      </div>
                      <CardContent className="pt-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg" data-testid={`text-foto-titulo-${foto.id}`}>
                            {foto.titulo}
                          </h3>
                          <p className="text-sm text-muted-foreground" data-testid={`text-foto-descricao-${foto.id}`}>
                            {foto.descricao}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMidiaMutation.mutate(foto.id)}
                          disabled={deleteMidiaMutation.isPending}
                          data-testid={`button-delete-foto-${foto.id}`}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!loadingMidias && videos.length === 0 && fotos.length === 0 && (
              <div className="text-center py-12" data-testid="empty-midias">
                <p className="text-muted-foreground mb-4">Nenhuma mídia adicionada ainda.</p>
                <Button onClick={() => setShowFormMidia(true)} data-testid="button-add-first-midia">
                  Adicionar Primeira Mídia
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
