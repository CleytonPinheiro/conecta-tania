# 🎓 Conecta Tânia - Student Projects Showcase

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791)](https://www.postgresql.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6%2B-3178C6)](https://www.typescriptlang.org)

**Um portfólio web moderno e interativo que reúne os melhores projetos do Curso de Desenvolvimento de Sistemas do Colégio Estadual Tânia Varella em Maringá, PR**

[📱 Acesse o Site](#) • [📖 Documentação](#documentação) • [🚀 Quick Start](#quick-start) • [👥 Contribuir](#como-contribuir)

</div>

---

## 📋 Visão Geral

**Conecta Tânia** é uma plataforma web profissional que reúne **21 projetos** desenvolvidos por **40+ alunos** de duas turmas do curso técnico de Desenvolvimento de Sistemas. 

O projeto demonstra como tecnologia pode conectar educação com oportunidades, dando visibilidade ao trabalho de alunos que estão iniciando suas carreiras em desenvolvimento.

### ✨ Destaques

- 🎓 **21 Projetos Reais** desenvolvidos por alunos
- 👥 **40+ Alunos** contribuindo
- 🏫 **2 Turmas** (1C e 2C) organizadas
- 🗂️ **4 Categorias** de projetos (Sistemas, Agendas, Mapas, Horta)
- 📱 **Design Responsivo** (mobile, tablet, desktop)
- 🌙 **Temas Claro/Escuro** inclusos
- ⚙️ **Admin Dashboard** completo
- 🔗 **Links Integrados** (Demo, Canva, Vídeo, GitHub)

---

## 🎬 Screenshots

### Homepage - Seção Hero
![Homepage Hero](attached_assets/generated_images/conecta_tânia_homepage_hero_section.png)

### Galeria de Projetos
![Project Cards Grid](attached_assets/generated_images/project_cards_showcase_grid_layout.png)

### Filtro por Turma (1C e 2C)
![Turma Filter](attached_assets/generated_images/turma_1c_and_2c_filter_view.png)

### Design Responsivo (Mobile)
![Mobile Design](attached_assets/generated_images/mobile_responsive_design_mockup.png)

### Tema Escuro
![Dark Mode](attached_assets/generated_images/dark_mode_theme_showcase.png)

### Admin Dashboard
![Admin Dashboard](attached_assets/generated_images/admin_dashboard_project_management.png)

---

## ✨ Funcionalidades

### 🎯 Para Visitantes

- ✅ **Galeria Interativa** - Visualize todos os 21 projetos em cards modernos
- ✅ **Filtro por Turma** - Veja projetos organizados por turma (1C ou 2C)
- ✅ **Perfil dos Alunos** - Avatares e nomes dos estudantes em cada projeto
- ✅ **Recursos Disponíveis** - Badges mostrando Demo, Canva, Vídeo, GitHub
- ✅ **Links Diretos** - Botões para acessar demonstrações ao vivo e repositórios
- ✅ **Tema Customizável** - Alterne entre tema claro e escuro
- ✅ **Busca e Categorias** - Encontre projetos por categoria (Sistema, Agenda, Mapas, Horta)
- ✅ **Design Responsivo** - Funciona perfeitamente em qualquer dispositivo

### 🔧 Para Administradores

- 📝 **Criar Turmas** - Adicione novas turmas ao sistema
- 📝 **Criar Projetos** - Registre novos projetos com todos os detalhes
- 📸 **Upload de Screenshots** - Adicione imagens dos projetos (drag & drop)
- 🔗 **Gerenciar Links** - Configure links para Demo, Canva, Vídeo, GitHub
- ✏️ **Editar Projetos** - Modifique informações de projetos existentes
- 🗑️ **Deletar Projetos** - Remova projetos do sistema
- 👥 **Gerenciar Alunos** - Edite nomes de alunos diretamente nos cards

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ com TypeScript
- **Routing:** Wouter (router leve e rápido)
- **State Management:** TanStack React Query (server state)
- **UI Components:** Shadcn/UI + Radix UI
- **Styling:** Tailwind CSS + CSS Variables
- **Icons:** Lucide React + React Icons
- **Forms:** React Hook Form + Zod Validation
- **Build Tool:** Vite

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js com TypeScript
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL 15+ (Neon Serverless)
- **Validation:** Zod schemas
- **Connection Pool:** @neondatabase/serverless

### DevOps & Tools
- **Build:** TypeScript + ESBuild
- **Package Manager:** npm
- **Database Migrations:** Drizzle Kit
- **Environment:** Nix (Replit)

---

## 📊 Arquitetura

```
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/            # Páginas (Home, Turma1C, Turma2C, Admin, NotFound)
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── lib/              # Utilidades (queryClient, projectsData)
│   │   ├── hooks/            # Custom hooks (useToast)
│   │   └── App.tsx           # Router principal
│   └── index.html
│
├── server/                    # Backend Express
│   ├── routes.ts             # API endpoints (CRUD)
│   ├── storage.ts            # Camada de dados (interface IStorage)
│   ├── db.ts                 # Conexão database
│   ├── index.ts              # Servidor principal
│   └── vite.ts               # Integração Vite
│
├── shared/                    # Tipos e schemas compartilhados
│   └── schema.ts             # Drizzle ORM schemas
│
├── vite.config.ts            # Configuração Vite
├── drizzle.config.ts         # Configuração Drizzle
└── package.json              # Dependências e scripts
```

### Fluxo de Dados

```
┌─────────────────┐
│  React Frontend │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Express Server │
└────────┬────────┘
         │ SQL
         ▼
┌──────────────────┐
│  PostgreSQL DB   │
│  (Neon)          │
└──────────────────┘
```

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL 15+ (ou Neon account)
- Git

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/conecta-tania.git
cd conecta-tania
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo (se existir)
cp .env.example .env

# Configure seu DATABASE_URL
# Para Neon: postgresql://user:password@host/database?sslmode=require
```

4. **Execute as migrations**
```bash
npm run db:push
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse no navegador**
```
http://localhost:5000
```

### Scripts Disponíveis

```bash
# Desenvolvimento (frontend + backend)
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Push do schema para database
npm run db:push

# Push forçado (cuidado!)
npm run db:push -- --force

# Verificar tipos TypeScript
npm run check
```

---

## 📚 Documentação

### Estrutura de Dados

#### Tabela: `turmas`
```typescript
{
  id: serial (PK),
  nome: string (unique),    // "1C", "2C"
  descricao: string?        // Descrição da turma
}
```

#### Tabela: `projetos`
```typescript
{
  id: serial (PK),
  titulo: string,           // Nome do projeto
  descricao: string?,       // Descrição
  categoria: string,        // "Sistema", "Agenda", "Mapas", "Horta"
  alunos: string[],         // Array de nomes dos alunos
  turmaId: integer (FK),    // Referência à turma
  imagemUrl: string?,       // Base64 da imagem (screenshot)
  linkCanva: string?,       // URL do Canva
  linkVideo: string?,       // URL do vídeo
  linkGithub: string?,      // URL do GitHub
  linkDemo: string?         // URL da demonstração/Replit
}
```

### API Endpoints

#### Turmas
```
GET    /api/turmas              # Lista todas as turmas
GET    /api/turmas/:id          # Obtém uma turma específica
POST   /api/turmas              # Cria nova turma
PATCH  /api/turmas/:id          # Atualiza turma
DELETE /api/turmas/:id          # Deleta turma
```

#### Projetos
```
GET    /api/projetos                 # Lista todos os projetos
GET    /api/projetos/:id             # Obtém um projeto
GET    /api/turmas/:turmaId/projetos # Projetos de uma turma
POST   /api/projetos                 # Cria novo projeto
PATCH  /api/projetos/:id             # Atualiza projeto
DELETE /api/projetos/:id             # Deleta projeto
```

#### Configuração
```
GET    /api/config                   # Retorna config (autor, LinkedIn)
```

### Exemplo de Requisição

```bash
# Criar novo projeto
curl -X POST http://localhost:5000/api/projetos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mapa Interativo",
    "descricao": "Um mapa interativo da região",
    "categoria": "Mapas",
    "alunos": ["João Silva", "Maria Santos"],
    "turmaId": 1,
    "linkDemo": "https://replit.com/...",
    "linkGithub": "https://github.com/..."
  }'
```

---

## 🎨 Design & Styling

### Paleta de Cores

- **Primária (Laranja):** `#FF6B00` / `hsl(25 100% 50%)`
- **Fundo Claro:** `#ffffff`
- **Fundo Escuro:** `#0f0f0f`
- **Texto Principal:** `#000000` (claro) / `#ffffff` (escuro)
- **Texto Secundário:** `#666666` (claro) / `#999999` (escuro)

### Temas Suportados

- ☀️ **Light Mode:** Background claro, texto escuro
- 🌙 **Dark Mode:** Background escuro, texto claro
- ♿ **Acessibilidade:** Contraste WCAG AA+

### Responsividade

```
Mobile:      < 640px (single column)
Tablet:      640px - 1024px (2 columns)
Desktop:     > 1024px (3-4 columns)
Ultra-wide:  > 1400px (4-6 columns)
```

---

## 🔐 Segurança

- ✅ Validação Zod em todos os endpoints
- ✅ SQL injection prevention via ORM
- ✅ CORS configurado
- ✅ Environment variables para secrets
- ✅ TypeScript para type safety
- ⚠️ Admin sem autenticação (TODO: implementar Auth)

---

## 📱 Desenvolvimento

### Adicionando Nova Página

1. Crie arquivo em `client/src/pages/NovaPage.tsx`
2. Implemente o componente React
3. Registre em `client/src/App.tsx`:
```typescript
<Route path="/nova-rota" component={NovaPage} />
```

### Adicionando Novo Endpoint API

1. Adicione ao `server/routes.ts`:
```typescript
app.get("/api/novo-endpoint", (req, res) => {
  // sua lógica
  res.json({ dados });
});
```

2. Use no frontend com TanStack Query:
```typescript
const { data } = useQuery({
  queryKey: ['/api/novo-endpoint'],
});
```

### Modificando o Schema

1. Edite `shared/schema.ts`
2. Execute: `npm run db:push`

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
```bash
# Verifique DATABASE_URL
echo $DATABASE_URL

# Teste a conexão
npm run db:push
```

### Porta 5000 já está em uso
```bash
# Mude a porta em server/vite.ts ou use:
PORT=3000 npm run dev
```

### Mudanças não aparecem (cache)
```bash
# Limpe cache do navegador
Ctrl+Shift+Delete  # Windows/Linux
Cmd+Shift+Delete   # Mac
```

### Imagens não carregam
```
- Verifique se BASE64 está válido
- Certifique-se que o campo imagemUrl tem o data:image prefix
```

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Por favor:

1. **Fork o projeto**
   ```bash
   git clone https://github.com/seu-usuario/conecta-tania.git
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Faça commit das mudanças**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push para a branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Abra um Pull Request**

### Idéias de Contribuição

- 🔐 Implementar autenticação (JWT/OAuth)
- 📧 Sistema de comentários/reviews
- 🔍 Busca avançada de projetos
- 📊 Dashboard de estatísticas
- 🌍 Suporte a múltiplos idiomas
- ♿ Melhorias de acessibilidade
- 🚀 Performance otimizations
- 📱 App mobile nativa

---

## 📄 License

Este projeto está licenciado sob a [MIT License](LICENSE) - veja o arquivo LICENSE para detalhes.

---

## 👨‍💻 Autor

**Cleyton Pinheiro**
- 🔗 [LinkedIn](https://www.linkedin.com/in/cleytonpinheiro/)
- 📧 Email: (adicione seu email)
- 🐙 GitHub: (adicione seu GitHub)

---

## 🙏 Agradecimentos

- **Colégio Estadual Tânia Varella** - Instituição de ensino
- **Alunos das Turmas 1C e 2C** - Por seus projetos incríveis
- **Comunidade React/Node.js** - Por ferramentas e inspiração
- **Shadcn/ui & Radix UI** - Por componentes fantásticos
- **Drizzle ORM** - Por ORM type-safe

---

## 📞 Suporte

Tem dúvidas? Abra uma [issue](https://github.com/seu-usuario/conecta-tania/issues) ou entre em contato via LinkedIn.

---

<div align="center">

**⭐ Se gostou do projeto, considere dar uma estrela!**

Feito com ❤️ em Maringá, PR - Brasil 🇧🇷

</div>
