import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogHeader,
        AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
        Form,
        FormField,
        FormItem,
        FormLabel,
        FormControl,
        FormMessage,
} from "@/components/ui/form";
import {
        Trash2,
        Plus,
        Loader2,
        Play,
        Power,
        Droplets,
        Leaf,
        X,
        BookOpen,
        Lightbulb,
        Wrench,
        Target,
        ChevronLeft,
        ChevronRight,
        Smartphone,
        Wifi,
        Clock,
        Zap,
        Settings,
        Globe,
} from "lucide-react";
import {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselPrevious,
        CarouselNext,
} from "@/components/ui/carousel";
import type {
        HortaMidia,
        InsertHortaMidia,
        HortaRegaControl,
} from "@shared/schema";
import apresentacaoVideo from "@assets/Apresentação_Horta_Tania_2C_1764783573658.mp4";
import hortaFoto1 from "@assets/Horta1_1764805989352.jpg";
import hortaVideo1 from "@assets/Vídeo_Horta1_1764805989354.mp4";
import hortaVideo2 from "@assets/Vídeo_horta_2_1764805989353.mp4";
import hortaVideo3 from "@assets/Vídeo_Horta_3_1764805989354.mp4";
import appAcionamentoVideo from "@assets/Vídeo_App_Acionamento_Horta_1764807548420.mp4";

const MASTER_PASSWORD = "Horta2024";

export default function Horta() {
        const { toast } = useToast();
        const [showFormMidia, setShowFormMidia] = useState(false);
        const [mediaToDelete, setMediaToDelete] = useState<number | null>(null);
        const [enteredPassword, setEnteredPassword] = useState("");
        const [passwordError, setPasswordError] = useState("");

        // Queries
        const { data: midias = [], isLoading: loadingMidias } = useQuery<
                HortaMidia[]
        >({
                queryKey: ["/api/horta-midias"],
        });

        const {
                data: regaControl,
                isLoading: loadingControl,
                refetch: refetchControl,
        } = useQuery<HortaRegaControl>({
                queryKey: ["/api/horta-rega-control"],
        });

        // Forms
        const formMidia = useForm<InsertHortaMidia>({
                defaultValues: {
                        titulo: "",
                        descricao: "",
                        tipo: "video",
                        url: "",
                        thumbnailUrl: "",
                },
        });

        // Mutations
        const toggleRegaMutation = useMutation({
                mutationFn: (status: "ligado" | "desligado") =>
                        apiRequest("PATCH", "/api/horta-rega-control", {
                                statusAtivo: status,
                        }),
                onSuccess: () => {
                        refetchControl();
                        toast({
                                title: "Sucesso!",
                                description: "Sistema de rega atualizado!",
                        });
                },
                onError: () => {
                        toast({
                                title: "Erro",
                                description: "Erro ao controlar rega",
                                variant: "destructive",
                        });
                },
        });

        const createMidiaMutation = useMutation({
                mutationFn: (data: InsertHortaMidia) =>
                        apiRequest("POST", "/api/horta-midias", data),
                onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["/api/horta-midias"] });
                        toast({ title: "Sucesso!", description: "Mídia adicionada!" });
                        formMidia.reset();
                        setShowFormMidia(false);
                },
                onError: () => {
                        toast({
                                title: "Erro",
                                description: "Erro ao adicionar mídia",
                                variant: "destructive",
                        });
                },
        });

        const deleteMidiaMutation = useMutation({
                mutationFn: (id: number) =>
                        apiRequest("DELETE", `/api/horta-midias/${id}`),
                onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["/api/horta-midias"] });
                        toast({ title: "Sucesso!", description: "Mídia removida!" });
                },
                onError: () => {
                        toast({
                                title: "Erro",
                                description: "Erro ao remover mídia",
                                variant: "destructive",
                        });
                },
        });

        const onSubmitMidia = (data: InsertHortaMidia) => {
                createMidiaMutation.mutate(data);
        };

        const handleDeleteClick = (id: number) => {
                setMediaToDelete(id);
                setEnteredPassword("");
                setPasswordError("");
        };

        const handleConfirmDelete = () => {
                if (!enteredPassword) {
                        setPasswordError("Digite a senha");
                        return;
                }
                if (enteredPassword !== MASTER_PASSWORD) {
                        setPasswordError("Senha incorreta");
                        setEnteredPassword("");
                        return;
                }
                if (mediaToDelete) {
                        deleteMidiaMutation.mutate(mediaToDelete);
                        setMediaToDelete(null);
                        setEnteredPassword("");
                        setPasswordError("");
                }
        };

        const videos = midias.filter((m) => m.tipo === "video");
        const fotos = midias.filter((m) => m.tipo === "foto");
        const isRegaLigada = regaControl?.statusAtivo === "ligado";

        const extractYouTubeId = (url: string) => {
                const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
                const match = url.match(regex);
                return match ? match[1] : null;
        };

        return (
                <div
                        className="min-h-screen bg-background flex flex-col"
                        data-testid="page-horta"
                >
                        <Header />

                        <main className="flex-1 py-12 md:py-16 lg:py-20">
                                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-12">
                                        {/* Header */}
                                        <div className="space-y-4">
                                                <div className="space-y-2">
                                                        <h1
                                                                className="text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3"
                                                                data-testid="text-horta-title"
                                                        >
                                                                <Leaf className="w-10 h-10 text-primary" />
                                                                Horta Smart
                                                        </h1>
                                                        <p className="text-lg text-muted-foreground max-w-2xl">
                                                                Sistema inteligente de rega conectado online. Controle o
                                                                fluxo de água via smartphone e programe horários
                                                                automáticos para irrigação sustentável.
                                                        </p>
                                                </div>
                                        </div>

                                        {/* História da Horta */}
                                        <section className="space-y-8" data-testid="section-historia">
                                                <div className="text-center space-y-3">
                                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                                                                <BookOpen className="w-8 h-8 text-primary" />
                                                                Nossa História
                                                        </h2>
                                                        <p className="text-muted-foreground max-w-3xl mx-auto">
                                                                Conheça a trajetória do projeto Horta Smart, desde a
                                                                ideia inicial até sua implementação no Colégio Estadual
                                                                Tânia Varella.
                                                        </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* A Ideia */}
                                                        <Card
                                                                className="border-l-4 border-l-primary"
                                                                data-testid="card-historia-ideia"
                                                        >
                                                                <CardHeader className="pb-3">
                                                                        <div className="flex items-center gap-3">
                                                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                                                        <Lightbulb className="w-6 h-6 text-primary" />
                                                                                </div>
                                                                                <CardTitle className="text-xl">A Ideia</CardTitle>
                                                                        </div>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground space-y-3">
                                                                        <p>
                                                                                O projeto nasceu em 2025 a partir de uma
                                                                                observação dos alunos do Ensino Médio e Curso
                                                                                Técnico em Desenvolvimento de Sistemas: como unir
                                                                                tecnologia e sustentabilidade de forma prática e
                                                                                educativa?
                                                                        </p>
                                                                        <p>
                                                                                A resposta veio com a proposta de criar uma horta
                                                                                escolar inteligente, capaz de ser monitorada e
                                                                                controlada remotamente, integrando conhecimentos
                                                                                de programação, eletrônica e agricultura
                                                                                sustentável.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Desenvolvimento */}
                                                        <Card
                                                                className="border-l-4 border-l-accent"
                                                                data-testid="card-historia-desenvolvimento"
                                                        >
                                                                <CardHeader className="pb-3">
                                                                        <div className="flex items-center gap-3">
                                                                                <div className="p-2 bg-accent/10 rounded-lg">
                                                                                        <Wrench className="w-6 h-6 text-accent-foreground" />
                                                                                </div>
                                                                                <CardTitle className="text-xl">
                                                                                        O Desenvolvimento
                                                                                </CardTitle>
                                                                        </div>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground space-y-3">
                                                                        <p>
                                                                                Com orientação dos professores, os alunos
                                                                                iniciaram o desenvolvimento do sistema de
                                                                                irrigação automatizada. O projeto envolveu
                                                                                diversas etapas: planejamento do espaço físico,
                                                                                escolha das culturas, montagem do sistema de
                                                                                irrigação e programação do controle remoto.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Implementação */}
                                                        <Card
                                                                className="border-l-4 border-l-green-500"
                                                                data-testid="card-historia-implementacao"
                                                        >
                                                                <CardHeader className="pb-3">
                                                                        <div className="flex items-center gap-3">
                                                                                <div className="p-2 bg-green-500/10 rounded-lg">
                                                                                        <Leaf className="w-6 h-6 text-green-600" />
                                                                                </div>
                                                                                <CardTitle className="text-xl">
                                                                                        A Implementação
                                                                                </CardTitle>
                                                                        </div>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground space-y-3">
                                                                        <p>
                                                                                A horta foi instalada em um espaço do Colégio
                                                                                Estadual Tânia Varella, em Maringá - PR. Os
                                                                                canteiros foram preparados com solo rico em
                                                                                nutrientes, e o sistema de irrigação por
                                                                                gotejamento foi conectado ao painel de controle
                                                                                digital.
                                                                        </p>
                                                                        <p>
                                                                                Hoje, qualquer pessoa pode acompanhar e controlar
                                                                                a rega da horta através desta plataforma,
                                                                                demonstrando como a Internet das Coisas (IoT) pode
                                                                                transformar práticas agrícolas tradicionais.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Objetivos */}
                                                        <Card
                                                                className="border-l-4 border-l-blue-500"
                                                                data-testid="card-historia-objetivos"
                                                        >
                                                                <CardHeader className="pb-3">
                                                                        <div className="flex items-center gap-3">
                                                                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                                                                        <Target className="w-6 h-6 text-blue-600" />
                                                                                </div>
                                                                                <CardTitle className="text-xl">
                                                                                        Nossos Objetivos
                                                                                </CardTitle>
                                                                        </div>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground space-y-3">
                                                                        <p>
                                                                                O projeto Horta Smart vai além do cultivo de
                                                                                hortaliças. Seus objetivos incluem: promover a
                                                                                educação ambiental, incentivar hábitos alimentares
                                                                                saudáveis, aplicar conceitos de programação em
                                                                                projetos reais e desenvolver consciência sobre o
                                                                                uso sustentável da água.
                                                                        </p>
                                                                        <p>
                                                                                Os alimentos produzidos são utilizados na merenda
                                                                                escolar, fechando um ciclo completo de
                                                                                sustentabilidade e aprendizado prático para toda a
                                                                                comunidade escolar.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                        </section>

                                        {/* Sistema de Automação */}
                                        <section className="space-y-8" data-testid="section-automacao">
                                                <div className="text-center space-y-3">
                                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                                                                <Zap className="w-8 h-8 text-primary" />
                                                                Sistema de Automação
                                                        </h2>
                                                        <p className="text-muted-foreground max-w-3xl mx-auto">
                                                                Nossa horta conta com um sistema inteligente de irrigação controlado remotamente, 
                                                                permitindo o gerenciamento eficiente da água através de tecnologia IoT.
                                                        </p>
                                                </div>

                                                {/* Funcionalidades */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {/* Controle via App */}
                                                        <Card className="text-center" data-testid="card-automacao-app">
                                                                <CardHeader>
                                                                        <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                                                                                <Smartphone className="w-10 h-10 text-primary" />
                                                                        </div>
                                                                        <CardTitle className="text-xl">Controle via Aplicativo</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground">
                                                                        <p>
                                                                                Através de um aplicativo móvel, é possível acionar o sistema de 
                                                                                irrigação de qualquer lugar. Com apenas um toque, você libera ou 
                                                                                bloqueia o fluxo de água para os canteiros da horta.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Conexão Online */}
                                                        <Card className="text-center" data-testid="card-automacao-online">
                                                                <CardHeader>
                                                                        <div className="mx-auto p-4 bg-green-500/10 rounded-full w-fit">
                                                                                <Globe className="w-10 h-10 text-green-600" />
                                                                        </div>
                                                                        <CardTitle className="text-xl">Acionamento Online</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground">
                                                                        <p>
                                                                                O sistema está conectado à internet 24 horas por dia, permitindo 
                                                                                o monitoramento e controle remoto em tempo real. A comunicação é 
                                                                                feita através de uma conexão Wi-Fi segura e estável.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Agendamento */}
                                                        <Card className="text-center" data-testid="card-automacao-agendamento">
                                                                <CardHeader>
                                                                        <div className="mx-auto p-4 bg-blue-500/10 rounded-full w-fit">
                                                                                <Clock className="w-10 h-10 text-blue-600" />
                                                                        </div>
                                                                        <CardTitle className="text-xl">Programação Automática</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="text-muted-foreground">
                                                                        <p>
                                                                                É possível programar dia e hora específicos para a liberação e 
                                                                                bloqueio automático da irrigação. O sistema executa as tarefas 
                                                                                agendadas sem necessidade de intervenção manual.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                {/* Demonstração do Aplicativo */}
                                                <Card className="overflow-hidden" data-testid="card-demo-app">
                                                        <CardHeader className="text-center">
                                                                <CardTitle className="text-2xl flex items-center justify-center gap-3">
                                                                        <Play className="w-6 h-6 text-primary" />
                                                                        Veja o App em Ação
                                                                </CardTitle>
                                                                <p className="text-muted-foreground">
                                                                        Demonstração do acionamento e desativação da irrigação pelo aplicativo
                                                                </p>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="flex justify-center">
                                                                        <div className="relative rounded-xl overflow-hidden bg-black shadow-xl">
                                                                                <video
                                                                                        src={appAcionamentoVideo}
                                                                                        className="h-[70vh] max-h-[500px] w-auto"
                                                                                        controls
                                                                                        playsInline
                                                                                        data-testid="video-app-acionamento"
                                                                                >
                                                                                        Seu navegador não suporta a reprodução de vídeo.
                                                                                </video>
                                                                        </div>
                                                                </div>
                                                                <p className="text-center text-sm text-muted-foreground mt-4">
                                                                        Com um simples toque no aplicativo, você pode ligar ou desligar 
                                                                        a irrigação da horta de qualquer lugar com acesso à internet.
                                                                </p>
                                                        </CardContent>
                                                </Card>

                                                {/* Como Funciona */}
                                                <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20" data-testid="card-como-funciona">
                                                        <CardHeader>
                                                                <CardTitle className="text-2xl flex items-center gap-3">
                                                                        <Settings className="w-6 h-6 text-primary" />
                                                                        Como Funciona
                                                                </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                        <div className="flex items-start gap-3">
                                                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                                                                        1
                                                                                </div>
                                                                                <div>
                                                                                        <h4 className="font-semibold text-foreground">Válvula Solenoide</h4>
                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                A válvula controla fisicamente o fluxo de água, 
                                                                                                abrindo ou fechando conforme os comandos recebidos 
                                                                                                via aplicativo.
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex items-start gap-3">
                                                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                                                                        2
                                                                                </div>
                                                                                <div>
                                                                                        <h4 className="font-semibold text-foreground">Sistema de Gotejamento</h4>
                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                A água é distribuída de forma uniforme através do 
                                                                                                sistema de irrigação por gotejamento nos canteiros.
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                {/* Benefícios */}
                                                                <div className="mt-6 pt-6 border-t border-border">
                                                                        <h4 className="font-semibold text-foreground mb-3">Benefícios da Automação:</h4>
                                                                        <div className="flex flex-wrap gap-2">
                                                                                <Badge variant="secondary" className="gap-1">
                                                                                        <Droplets className="w-3 h-3" />
                                                                                        Economia de Água
                                                                                </Badge>
                                                                                <Badge variant="secondary" className="gap-1">
                                                                                        <Clock className="w-3 h-3" />
                                                                                        Irrigação no Horário Ideal
                                                                                </Badge>
                                                                                <Badge variant="secondary" className="gap-1">
                                                                                        <Wifi className="w-3 h-3" />
                                                                                        Controle Remoto
                                                                                </Badge>
                                                                                <Badge variant="secondary" className="gap-1">
                                                                                        <Leaf className="w-3 h-3" />
                                                                                        Plantas Mais Saudáveis
                                                                                </Badge>
                                                                                <Badge variant="secondary" className="gap-1">
                                                                                        <Zap className="w-3 h-3" />
                                                                                        Praticidade
                                                                                </Badge>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Futuras Implementações */}
                                                <Card className="border-dashed border-2 border-muted-foreground/30" data-testid="card-futuras-implementacoes">
                                                        <CardHeader>
                                                                <CardTitle className="text-2xl flex items-center gap-3 text-muted-foreground">
                                                                        <Lightbulb className="w-6 h-6 text-yellow-500" />
                                                                        Futuras Implementações
                                                                </CardTitle>
                                                                <p className="text-sm text-muted-foreground">
                                                                        Melhorias planejadas para as próximas versões do sistema
                                                                </p>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                        <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                                                                                <div className="flex-shrink-0 p-2 bg-yellow-500/10 rounded-lg">
                                                                                        <Droplets className="w-6 h-6 text-yellow-600" />
                                                                                </div>
                                                                                <div>
                                                                                        <h4 className="font-semibold text-foreground">Sensor de Umidade</h4>
                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                Implementação de sensores para monitorar constantemente 
                                                                                                a umidade do solo, permitindo irrigação automática 
                                                                                                baseada nas condições reais do terreno.
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                                                                                <div className="flex-shrink-0 p-2 bg-yellow-500/10 rounded-lg">
                                                                                        <Zap className="w-6 h-6 text-yellow-600" />
                                                                                </div>
                                                                                <div>
                                                                                        <h4 className="font-semibold text-foreground">Microcontrolador Dedicado</h4>
                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                Integração de um microcontrolador para processar 
                                                                                                dados dos sensores e tomar decisões automáticas 
                                                                                                sobre quando e quanto irrigar.
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </section>

                                        {/* Control Panel */}
                                        {!loadingControl && regaControl && (
                                                <Card
                                                        className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5"
                                                        data-testid="card-rega-control"
                                                >
                                                        <CardHeader>
                                                                <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                                <Droplets className="w-6 h-6 text-primary" />
                                                                                <CardTitle className="text-2xl">
                                                                                        Painel de Controle
                                                                                </CardTitle>
                                                                        </div>
                                                                        <Badge
                                                                                variant={isRegaLigada ? "default" : "secondary"}
                                                                                className="text-base px-3 py-1"
                                                                                data-testid="badge-status"
                                                                        >
                                                                                {isRegaLigada ? "🟢 LIGADO" : "🔴 DESLIGADO"}
                                                                        </Badge>
                                                                </div>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                                {/* Status Info */}
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="bg-card rounded-lg p-4 border border-border">
                                                                                <p className="text-sm text-muted-foreground mb-2">
                                                                                        Status da Rega
                                                                                </p>
                                                                                <p
                                                                                        className="text-2xl font-bold"
                                                                                        data-testid="text-status"
                                                                                >
                                                                                        {isRegaLigada ? "Ativa" : "Inativa"}
                                                                                </p>
                                                                        </div>
                                                                        <div className="bg-card rounded-lg p-4 border border-border">
                                                                                <p className="text-sm text-muted-foreground mb-2">
                                                                                        Umidade do Solo
                                                                                </p>
                                                                                <p
                                                                                        className="text-2xl font-bold"
                                                                                        data-testid="text-umidade"
                                                                                >
                                                                                        {regaControl.umidadeAtual}%
                                                                                </p>
                                                                        </div>
                                                                </div>

                                                                {/* Control Buttons */}
                                                                <div className="flex gap-3 flex-wrap">
                                                                        <Button
                                                                                size="lg"
                                                                                className="gap-2 flex-1 min-w-48"
                                                                                onClick={() =>
                                                                                        toggleRegaMutation.mutate("ligado")
                                                                                }
                                                                                disabled={
                                                                                        isRegaLigada || toggleRegaMutation.isPending
                                                                                }
                                                                                variant={isRegaLigada ? "secondary" : "default"}
                                                                                data-testid="button-rega-on"
                                                                        >
                                                                                <Power className="w-5 h-5" />
                                                                                Ligar Rega
                                                                        </Button>
                                                                        <Button
                                                                                size="lg"
                                                                                className="gap-2 flex-1 min-w-48"
                                                                                variant="destructive"
                                                                                onClick={() =>
                                                                                        toggleRegaMutation.mutate("desligado")
                                                                                }
                                                                                disabled={
                                                                                        !isRegaLigada || toggleRegaMutation.isPending
                                                                                }
                                                                                data-testid="button-rega-off"
                                                                        >
                                                                                <Power className="w-5 h-5" />
                                                                                Desligar Rega
                                                                        </Button>
                                                                </div>

                                                                <div className="text-xs text-muted-foreground">
                                                                        Última atualização:{" "}
                                                                        {regaControl.ultimaAtualizacao || "Carregando..."}
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        )}

                                        {/* Featured Presentation Video */}
                                        <div
                                                className="flex flex-col items-center"
                                                data-testid="card-apresentacao"
                                        >
                                                <div className="bg-black rounded-lg overflow-hidden">
                                                        <video
                                                                controls
                                                                className="max-w-full max-h-[70vh]"
                                                                data-testid="video-apresentacao"
                                                        >
                                                                <source src={apresentacaoVideo} type="video/mp4" />
                                                                Seu navegador não suporta vídeo HTML5.
                                                        </video>
                                                </div>
                                                <div className="pt-4 text-center max-w-2xl">
                                                        <h3
                                                                className="text-lg font-semibold mb-2"
                                                                data-testid="text-video-title"
                                                        >
                                                                Apresentação da Horta - Turma 2C
                                                        </h3>
                                                        <p
                                                                className="text-sm text-muted-foreground"
                                                                data-testid="text-video-description"
                                                        >
                                                                Conheça o projeto da Horta Smart do Colégio Estadual
                                                                Tânia Varella apresentado pelos alunos da Turma 2C.
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Galeria de Mídias Locais */}
                                        <section className="space-y-8" data-testid="section-galeria-local">
                                                <div className="text-center space-y-3">
                                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                                                Galeria da Horta
                                                        </h2>
                                                        <p className="text-muted-foreground max-w-2xl mx-auto">
                                                                Registros fotográficos e vídeos do dia a dia da nossa horta escolar.
                                                        </p>
                                                </div>

                                                {/* Foto e Vídeos da Horta */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                        {/* Foto Principal */}
                                                        <Card className="overflow-hidden" data-testid="card-foto-principal">
                                                                <div className="bg-black rounded-t-lg overflow-hidden">
                                                                        <img
                                                                                src={hortaFoto1}
                                                                                alt="Canteiros da horta com sistema de irrigação e hortaliças plantadas"
                                                                                className="w-full max-h-[40vh] object-contain"
                                                                                data-testid="img-horta-principal"
                                                                        />
                                                                </div>
                                                                <CardContent className="py-3">
                                                                        <p className="text-center text-sm text-muted-foreground">
                                                                                Canteiros da Horta
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Video 1 */}
                                                        <Card className="overflow-hidden" data-testid="card-video-1">
                                                                <div className="rounded-t-lg overflow-hidden">
                                                                        <video
                                                                                autoPlay
                                                                                loop
                                                                                muted
                                                                                playsInline
                                                                                className="w-full h-[40vh] object-cover"
                                                                                data-testid="video-horta-1"
                                                                        >
                                                                                <source src={hortaVideo1} type="video/mp4" />
                                                                                Seu navegador não suporta vídeo HTML5.
                                                                        </video>
                                                                </div>
                                                                <CardContent className="py-3">
                                                                        <p className="text-center text-sm text-muted-foreground">
                                                                                Registro da Horta - Parte 1
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Video 2 */}
                                                        <Card className="overflow-hidden" data-testid="card-video-2">
                                                                <div className="rounded-t-lg overflow-hidden">
                                                                        <video
                                                                                autoPlay
                                                                                loop
                                                                                muted
                                                                                playsInline
                                                                                className="w-full h-[40vh] object-cover"
                                                                                data-testid="video-horta-2"
                                                                        >
                                                                                <source src={hortaVideo2} type="video/mp4" />
                                                                                Seu navegador não suporta vídeo HTML5.
                                                                        </video>
                                                                </div>
                                                                <CardContent className="py-3">
                                                                        <p className="text-center text-sm text-muted-foreground">
                                                                                Registro da Horta - Parte 2
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        {/* Video 3 */}
                                                        <Card className="overflow-hidden" data-testid="card-video-3">
                                                                <div className="rounded-t-lg overflow-hidden">
                                                                        <video
                                                                                autoPlay
                                                                                loop
                                                                                muted
                                                                                playsInline
                                                                                className="w-full h-[40vh] object-cover"
                                                                                data-testid="video-horta-3"
                                                                        >
                                                                                <source src={hortaVideo3} type="video/mp4" />
                                                                                Seu navegador não suporta vídeo HTML5.
                                                                        </video>
                                                                </div>
                                                                <CardContent className="py-3">
                                                                        <p className="text-center text-sm text-muted-foreground">
                                                                                Registro da Horta - Parte 3
                                                                        </p>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                        </section>

                                        {/* Media Section */}
                                        <section data-testid="section-midias">
                                                <div className="space-y-4 mb-8">
                                                        <div className="flex items-center justify-between">
                                                                <h2 className="text-2xl md:text-3xl font-bold">
                                                                        Documentação da Horta
                                                                </h2>
                                                                <Button
                                                                        onClick={() => setShowFormMidia(!showFormMidia)}
                                                                        className="gap-2"
                                                                        data-testid="button-add-midia"
                                                                >
                                                                        <Plus className="w-4 h-4" />
                                                                        Adicionar Mídia
                                                                </Button>
                                                        </div>
                                                        
                                                        {/* Call to Action */}
                                                        <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-dashed border-2 border-primary/30">
                                                                <CardContent className="py-6">
                                                                        <div className="text-center space-y-3">
                                                                                <p className="text-lg font-medium text-foreground">
                                                                                        Faça parte desta história!
                                                                                </p>
                                                                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                                                                        Registrou um momento especial na horta? Tirou uma foto do plantio, da colheita ou de alguma novidade? 
                                                                                        <span className="font-medium text-primary"> Compartilhe com a gente!</span> Sua contribuição ajuda a documentar 
                                                                                        e inspirar toda a comunidade escolar.
                                                                                </p>
                                                                                <div className="flex flex-wrap justify-center gap-4 pt-2 text-sm text-muted-foreground">
                                                                                        <span className="flex items-center gap-1">
                                                                                                <Play className="w-4 h-4 text-primary" />
                                                                                                Vídeos do YouTube
                                                                                        </span>
                                                                                        <span className="flex items-center gap-1">
                                                                                                <span className="text-primary">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                                                                                </span>
                                                                                                Fotos da horta
                                                                                        </span>
                                                                                        <span className="flex items-center gap-1">
                                                                                                <Leaf className="w-4 h-4 text-green-600" />
                                                                                                Momentos especiais
                                                                                        </span>
                                                                                </div>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                {showFormMidia && (
                                                        <Card className="mb-6" data-testid="form-add-midia">
                                                                <CardHeader>
                                                                        <CardTitle>Adicionar Mídia</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <Form {...formMidia}>
                                                                                <form
                                                                                        onSubmit={formMidia.handleSubmit(
                                                                                                onSubmitMidia,
                                                                                        )}
                                                                                        className="space-y-4"
                                                                                >
                                                                                        <FormField
                                                                                                control={formMidia.control}
                                                                                                name="titulo"
                                                                                                render={({ field }) => (
                                                                                                        <FormItem>
                                                                                                                <FormLabel>Título</FormLabel>
                                                                                                                <FormControl>
                                                                                                                        <Input
                                                                                                                                placeholder="Ex: Plantio de Tomates"
                                                                                                                                {...field}
                                                                                                                                data-testid="input-midia-titulo"
                                                                                                                                required
                                                                                                                        />
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
                                                                                                                        <Textarea
                                                                                                                                placeholder="Descreva a mídia..."
                                                                                                                                {...field}
                                                                                                                                value={field.value || ""}
                                                                                                                                data-testid="textarea-midia-descricao"
                                                                                                                        />
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
                                                                                                                                <option value="video">
                                                                                                                                        Vídeo (YouTube)
                                                                                                                                </option>
                                                                                                                                <option value="foto">
                                                                                                                                        Foto
                                                                                                                                </option>
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
                                                                                                                                value={field.value || ""}
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
                                                                                                <Button
                                                                                                        type="submit"
                                                                                                        disabled={createMidiaMutation.isPending}
                                                                                                        data-testid="button-submit-midia"
                                                                                                >
                                                                                                        {createMidiaMutation.isPending && (
                                                                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                                                        )}
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
                                                                                        <Card
                                                                                                key={video.id}
                                                                                                className="overflow-hidden hover-elevate group relative"
                                                                                                data-testid={`video-card-${video.id}`}
                                                                                        >
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
                                                                                                                <h3
                                                                                                                        className="font-semibold text-lg"
                                                                                                                        data-testid={`text-video-titulo-${video.id}`}
                                                                                                                >
                                                                                                                        {video.titulo}
                                                                                                                </h3>
                                                                                                                <p
                                                                                                                        className="text-sm text-muted-foreground"
                                                                                                                        data-testid={`text-video-descricao-${video.id}`}
                                                                                                                >
                                                                                                                        {video.descricao}
                                                                                                                </p>
                                                                                                        </div>
                                                                                                        <Button
                                                                                                                variant="destructive"
                                                                                                                size="sm"
                                                                                                                onClick={() =>
                                                                                                                        handleDeleteClick(video.id)
                                                                                                                }
                                                                                                                disabled={
                                                                                                                        deleteMidiaMutation.isPending
                                                                                                                }
                                                                                                                className="visibility-hidden group-hover:visibility-visible"
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
                                                                                <Card
                                                                                        key={foto.id}
                                                                                        className="overflow-hidden hover-elevate group relative"
                                                                                        data-testid={`foto-card-${foto.id}`}
                                                                                >
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
                                                                                                        <h3
                                                                                                                className="font-semibold text-lg"
                                                                                                                data-testid={`text-foto-titulo-${foto.id}`}
                                                                                                        >
                                                                                                                {foto.titulo}
                                                                                                        </h3>
                                                                                                        <p
                                                                                                                className="text-sm text-muted-foreground"
                                                                                                                data-testid={`text-foto-descricao-${foto.id}`}
                                                                                                        >
                                                                                                                {foto.descricao}
                                                                                                        </p>
                                                                                                </div>
                                                                                                <Button
                                                                                                        variant="destructive"
                                                                                                        size="sm"
                                                                                                        onClick={() =>
                                                                                                                handleDeleteClick(foto.id)
                                                                                                        }
                                                                                                        disabled={deleteMidiaMutation.isPending}
                                                                                                        className="visibility-hidden group-hover:visibility-visible"
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

                                                {!loadingMidias &&
                                                        videos.length === 0 &&
                                                        fotos.length === 0 && (
                                                                <div
                                                                        className="text-center py-12"
                                                                        data-testid="empty-midias"
                                                                >
                                                                        <p className="text-muted-foreground mb-4">
                                                                                Nenhuma mídia adicionada ainda.
                                                                        </p>
                                                                        <Button
                                                                                onClick={() => setShowFormMidia(true)}
                                                                                data-testid="button-add-first-midia"
                                                                        >
                                                                                Adicionar Primeira Mídia
                                                                        </Button>
                                                                </div>
                                                        )}
                                        </section>

                                        {/* Delete Confirmation Modal */}
                                        <AlertDialog
                                                open={mediaToDelete !== null}
                                                onOpenChange={(open) => !open && setMediaToDelete(null)}
                                        >
                                                <AlertDialogContent data-testid="dialog-confirm-delete">
                                                        <AlertDialogHeader>
                                                                <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                        Para remover esta mídia, digite a senha mestre.
                                                                </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <div className="space-y-3">
                                                                <div className="relative">
                                                                        <Input
                                                                                type="password"
                                                                                placeholder="Senha mestre"
                                                                                value={enteredPassword}
                                                                                onChange={(e) => {
                                                                                        setEnteredPassword(e.target.value);
                                                                                        setPasswordError("");
                                                                                }}
                                                                                data-testid="input-delete-password"
                                                                                className={
                                                                                        passwordError ? "border-destructive" : ""
                                                                                }
                                                                        />
                                                                        {passwordError && (
                                                                                <p
                                                                                        className="text-sm text-destructive mt-1"
                                                                                        data-testid="text-password-error"
                                                                                >
                                                                                        {passwordError}
                                                                                </p>
                                                                        )}
                                                                </div>
                                                        </div>
                                                        <div className="flex gap-3 justify-end">
                                                                <AlertDialogCancel data-testid="button-cancel-delete">
                                                                        Cancelar
                                                                </AlertDialogCancel>
                                                                <Button
                                                                        variant="destructive"
                                                                        onClick={handleConfirmDelete}
                                                                        disabled={deleteMidiaMutation.isPending}
                                                                        data-testid="button-confirm-delete"
                                                                >
                                                                        {deleteMidiaMutation.isPending && (
                                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                        )}
                                                                        Remover
                                                                </Button>
                                                        </div>
                                                </AlertDialogContent>
                                        </AlertDialog>
                                </div>
                        </main>

                        <Footer />
                </div>
        );
}
