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
import { Trash2, Plus, Loader2, Play } from 'lucide-react';
import type { HortaMidia, InsertHortaMidia } from '@shared/schema';

export default function Horta() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const { data: midias = [], isLoading } = useQuery<HortaMidia[]>({
    queryKey: ['/api/horta-midias'],
  });

  const form = useForm<InsertHortaMidia>({
    defaultValues: {
      titulo: '',
      descricao: '',
      tipo: 'video',
      url: '',
      thumbnailUrl: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertHortaMidia) => apiRequest('POST', '/api/horta-midias', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/horta-midias'] });
      toast({ title: 'Sucesso!', description: 'Mídia adicionada com sucesso!' });
      form.reset();
      setShowForm(false);
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao adicionar mídia', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/horta-midias/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/horta-midias'] });
      toast({ title: 'Sucesso!', description: 'Mídia removida com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Erro ao remover mídia', variant: 'destructive' });
    },
  });

  const onSubmit = (data: InsertHortaMidia) => {
    createMutation.mutate(data);
  };

  const videos = midias.filter(m => m.tipo === 'video');
  const fotos = midias.filter(m => m.tipo === 'foto');

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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-horta-title">
                🌱 Projeto Horta
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Conheça o projeto da horta do Colégio Estadual Tânia Varella. Veja os vídeos e fotos do desenvolvimento das atividades práticas de agricultura sustentável.
              </p>
            </div>

            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2"
              data-testid="button-add-midia"
            >
              <Plus className="w-4 h-4" />
              Adicionar Mídia
            </Button>
          </div>

          {/* Add Media Form */}
          {showForm && (
            <Card data-testid="form-add-midia">
              <CardHeader>
                <CardTitle>Adicionar Nova Mídia</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
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
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descreva a mídia..." {...field} data-testid="textarea-midia-descricao" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
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
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={field.value === 'video' ? 'YouTube URL' : 'Imagem URL'}
                              {...field}
                              data-testid="input-midia-url"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="thumbnailUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL da Thumbnail (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Para vídeos YouTube, deixe em branco" {...field} data-testid="input-midia-thumbnail" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        data-testid="button-cancel-midia"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-midia">
                        {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Adicionar
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Videos Section */}
          {videos.length > 0 && (
            <section data-testid="section-videos">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                <Play className="w-6 h-6 text-primary" />
                Vídeos
              </h2>
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
                          onClick={() => deleteMutation.mutate(video.id)}
                          disabled={deleteMutation.isPending}
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
            </section>
          )}

          {/* Fotos Section */}
          {fotos.length > 0 && (
            <section data-testid="section-fotos">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                📷 Fotos
              </h2>
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
                        onClick={() => deleteMutation.mutate(foto.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-foto-${foto.id}`}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remover
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {!isLoading && midias.length === 0 && (
            <div className="text-center py-12" data-testid="empty-state">
              <p className="text-muted-foreground mb-4">Nenhuma mídia adicionada ainda.</p>
              <Button onClick={() => setShowForm(true)} data-testid="button-add-first-midia">
                Adicionar Primeira Mídia
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12" data-testid="loading-state">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
