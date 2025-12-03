# 📚 Guia do Tutorial Interativo - Conecta Tânia

## 🎯 O que é o Tutorial?

O Tutorial Interativo do Conecta Tânia é um guia passo-a-passo que ajuda novos usuários a entender todas as funcionalidades da plataforma. É exibido automaticamente na primeira visita, mas pode ser ativado a qualquer momento.

---

## 🚀 Como Usar

### ✅ Ativar o Tutorial Automaticamente
- Na primeira visita ao site, o tutorial inicia automaticamente
- Uma janela modal será exibida no centro da tela

### ✅ Iniciar Tutorial Manualmente
- Clique no botão **"? Tutorial"** fixo no canto inferior direito
- Este botão está sempre disponível (mesmo que você tenha desativado o tutorial)

### ✅ Navegar pelo Tutorial
- **Próximo:** Clique para avançar para o próximo passo
- **Anterior:** Clique para voltar ao passo anterior
- **Pular Tutorial:** Desativa o tutorial completamente

### ✅ Fechar o Tutorial
- Clique no botão **X** do modal
- Ou pressione a tecla **ESC** no teclado
- Ou clique fora do modal (no overlay escuro)

---

## 📖 Passos do Tutorial

### 1️⃣ Bem-vindo ao Conecta Tânia
**O que aprende:** Introdução à plataforma
- Explica o propósito do site
- Convida você a conhecer a plataforma

### 2️⃣ O que é Conecta Tânia?
**O que aprende:** Conceito do projeto
- Explicação sobre 21 projetos reais
- 40+ alunos envolvidos
- Objetivo da plataforma

### 3️⃣ Veja os Projetos
**O que aprende:** Onde encontrar os projetos
- Localiza a seção de projetos
- Entende a visualização em cards

### 4️⃣ Card do Projeto
**O que aprende:** Componentes do card
- Como editar nomes de alunos
- Badges de recursos (Demo, Canva, Vídeo, Código)
- Botão de edição (para admin)

### 5️⃣ Filtros por Turma
**O que aprende:** Organização por classe
- Como filtrar projetos por Turma 1C
- Como filtrar projetos por Turma 2C
- Acompanhamento de progresso por classe

### 6️⃣ Tema Claro/Escuro
**O que aprende:** Customização de interface
- Localização do botão de tema
- Como alternar entre tema claro e escuro
- Preferência pessoal

### 7️⃣ Painel de Administração
**O que aprende:** Funcionalidades admin
- Como acessar `/admin`
- Criar novas turmas
- Gerenciar projetos

### 8️⃣ Recursos Principais
**O que aprende:** Links e recursos
- Demo (teste ao vivo)
- Canva (apresentações)
- Vídeos (explicações)
- GitHub (código-fonte)

### 9️⃣ Entre em Contato
**O que aprende:** Conectar com desenvolvedor
- Encontrar rodapé
- Link LinkedIn do autor
- Como conversar sobre o projeto

### 🔟 Pronto!
**Conclusão:** Resumo e encorajamento
- Felicidades
- Convite a explorar

---

## 💾 Armazenamento Local

O tutorial usa **localStorage** do navegador para lembrar suas preferências:

### Variáveis de Controle

```javascript
// Desabilitar tutorial
localStorage.setItem('conecta_tania_tutorial_disabled', 'true');

// Reabilitar tutorial
localStorage.removeItem('conecta_tania_tutorial_disabled');
```

### Como Verificar
1. Abra DevTools (F12)
2. Vá para "Application" → "Local Storage"
3. Procure por `conecta_tania_tutorial_disabled`

---

## 🎨 Design & UX

### Layout
- **Modal Centralizado:** Sempre no centro da tela
- **Overlay Escuro:** Destaca o tutorial
- **Responsivo:** Funciona em mobile, tablet e desktop

### Progresso
- **Barra de Progresso:** Mostra quantos passos faltam
- **Contador:** "Passo X de 10"
- **Navegação:** Anterior/Próximo habilitados conforme necessário

### Acessibilidade
- ✅ Suporte a teclado (ESC para fechar)
- ✅ Contraste adequado
- ✅ Descrições claras
- ✅ Test IDs para automatização

---

## 🔧 Personalizando o Tutorial

### Editar Passos

Para adicionar ou modificar passos, edite `GuidedTutorial.tsx`:

```typescript
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'seu-id',
    title: '📌 Seu Título',
    description: 'Descrição completa e clara do que aprender...',
    target: '[data-testid="elemento-específico"]', // opcional
    position: 'bottom', // top, bottom, left, right
  },
  // ... mais passos
];
```

### Mudar Idioma

Simplesmente edite os textos nos passos para traduzir para outro idioma:

```typescript
// Inglês
title: '👋 Welcome to Conecta Tânia!',
description: 'Let\'s show you how this amazing project portfolio works...',

// Português (padrão)
title: '👋 Bem-vindo ao Conecta Tânia!',
description: 'Vamos te mostrar como funciona esta plataforma incrível...',
```

---

## 📊 Analytics & Tracking

### Dados que Podem Ser Rastreados

Se você adicionar analytics, pode acompanhar:
- Quantos usuários iniciam o tutorial
- Quantos o completam
- Qual passo é mais abandonado
- Tempo gasto em cada passo

### Exemplo de Implementação

```typescript
// Adicionar ao GuidedTutorial.tsx
const trackTutorialEvent = (action: string, step: string) => {
  // Enviar para seu serviço de analytics
  console.log('Tutorial Event:', { action, step, timestamp: new Date() });
};

// Usar nos handlers
const handleNext = () => {
  trackTutorialEvent('next', step.id);
  // ... resto do código
};
```

---

## 🐛 Troubleshooting

### Tutorial não aparece automaticamente
```
✓ Verifique se está na página home (/)
✓ Limpe localStorage: Abra DevTools → Application → Local Storage → Limpe
✓ Verifique se conecta_tania_tutorial_disabled está definido
```

### Botão "Tutorial" não aparece
```
✓ O botão é fixo no canto inferior direito
✓ Verifique z-index (40)
✓ Certifique-se que o componente GuidedTutorial foi importado no App.tsx
```

### Modal está atrás de outros elementos
```
✓ Verifique z-index do modal (50)
✓ Certifique-se que outros elementos não têm z-index maior
✓ Use DevTools para inspecionar ordem de elementos
```

### Linguagem não está em português
```
✓ Edite os textos em GuidedTutorial.tsx
✓ Verificar se há cache (Ctrl+Shift+Delete)
✓ Fazer build novamente (npm run build)
```

---

## 📱 Responsividade

### Mobile (< 640px)
- ✅ Modal ocupa ~90% da largura
- ✅ Fonte reduzida para legibilidade
- ✅ Botões empilhados se necessário
- ✅ Toque para navegar

### Tablet (640px - 1024px)
- ✅ Modal com largura máxima
- ✅ Fonte normal
- ✅ Botões lado a lado
- ✅ Mouse e toque funcionam

### Desktop (> 1024px)
- ✅ Modal centralizado perfeito
- ✅ Fonte confortável
- ✅ Interações suaves
- ✅ Keyboard shortcuts

---

## 🎓 Casos de Uso

### Para Visitantes
- Primeiro acesso ao site
- Entender como navegar
- Descobrir funcionalidades
- Aprender sobre projetos

### Para Professores
- Introduzir alunos à plataforma
- Mostrar como submeter projetos
- Explicar categorias
- Demostrar admin panel

### Para Desenvolvedores
- Guia de UX/UX
- Exemplos de componentes
- Padrão de tutorial
- Referência de código

---

## 🚀 Próximas Melhorias

- [ ] Adicionar contexto visual (arrows apontando elementos)
- [ ] Suporte a múltiplos idiomas
- [ ] Animações mais suaves
- [ ] Video tutorials para cada passo
- [ ] Sistema de rating do tutorial
- [ ] Tutorial contextual (apareça em páginas específicas)
- [ ] Notificações baseadas em ações

---

## 📞 Suporte

Tem dúvidas sobre o tutorial?
- 🔗 Entre em contato via LinkedIn: https://www.linkedin.com/in/cleytonpinheiro/
- 📧 Abra uma issue no GitHub
- 💬 Deixe comentários no código

---

## 📄 Referência Técnica

### Arquivos Envolvidos
- `client/src/components/GuidedTutorial.tsx` - Componente principal
- `client/src/App.tsx` - Integração
- `localStorage` - Armazenamento de preferências

### Dependências
- React 18+
- Lucide React (ícones)
- Tailwind CSS (styling)
- Wouter (routing)

### Performance
- ⚡ Componente leve (não bloqueia renderização)
- ⚡ localStorage instantâneo
- ⚡ Sem requisições de API
- ⚡ Animações GPU-accelerated

---

**Pronto? Comece sua jornada pelo Conecta Tânia! 🚀**
