# 📸 GUIA DE PRINTS REAIS - CONECTA TÂNIA

## Como Capturar Screenshots do Projeto em Execução

O site está rodando em `http://localhost:5000`. Aqui está o guia para capturar prints profissionais de cada página.

---

## 📱 PRINT 1: PÁGINA HOME (Hero + Visão Geral)

**URL:** `http://localhost:5000`

**O que você vai ver:**
- Header com logo "Conecta Tânia" e ícone de graduação
- Seção Hero com:
  - Título grande: "Conecta Tânia"
  - Subtítulo: "Portfólio de Projetos - Curso Desenvolvimento de Sistemas"
  - Descrição: "Confira os melhores projetos desenvolvidos pelos alunos"
  - Botão laranja: "Explorar Projetos"
  - Estatísticas: 21 Projetos, 40+ Alunos
- Toggle de tema (claro/escuro) no topo direito
- Gradiente de fundo profissional

**Como capturar:**
1. Abra o site em modo normal (tema claro)
2. Use F12 para inspecionar
3. Mude para 1920x1080 (desktop)
4. Tire screenshot da página inteira (scroll até ver tudo)
5. Depois capture também em dark mode (clique no toggle de tema)

**Tamanho recomendado:** 1920x1080 (full HD)

---

## 🗂️ PRINT 2: SEÇÃO DE PROJETOS - CARDS

**URL:** `http://localhost:5000` (scroll para baixo)

**O que você vai ver:**
- Cards de projetos em grid (2-3 colunas)
- Cada card contém:
  - **Imagem/Screenshot:** Área com placeholder ou imagem real
  - **Badge Turma:** "Turma 1C" ou "Turma 2C" (topo direito)
  - **Título:** Nome do projeto (ex: "Mapa Interativo", "Sistema de Presença")
  - **Descrição:** Breve resumo do projeto
  - **Alunos:** Avatares com iniciais + nomes dos alunos
  - **Recursos:** Badges com "Demo", "Canva", "Vídeo", "Código"
  - **Botões:** Links para acessar recursos (em laranja para Demo, outline para outros)

**Cores reais que aparecem:**
- Laranja (#FF6B00) - Botão principal, badges
- Cinza - Texto secundário
- Branco - Background
- Preto/Cinza escuro - Texto principal

**Como capturar:**
1. Na página home, scroll até a seção "Projetos"
2. Tire screenshot do grid de cards
3. Capture 3-4 cards completos mostrando variedade
4. Depois faça screenshot em mobile (F12 → toggle device → iPhone 12)

---

## 📚 PRINT 3: PÁGINA TURMA 1C

**URL:** `http://localhost:5000/turma-1c`

**O que você vai ver:**
- Header: "Turma 1C" com descrição
- Filtro/Badge destacando "Turma 1C"
- Grid de projetos APENAS da Turma 1C
- Cada projeto mostra:
  - Miniatura/imagem
  - Título
  - Nomes dos alunos
  - Categorias (Sistema, Agenda, Mapas, Horta)
  - Links disponíveis

**Projetos esperados em Turma 1C:**
- Mapa Interativo
- Sistema de Presença Escolar
- Agenda Tânia Varella
- E outros...

**Como capturar:**
1. Clique em "Turma 1C" (deve estar no menu ou na página home)
2. Tire screenshot da página inteira
3. Scroll se houver mais projetos e capture também
4. Mostre a filtragem funcionando

---

## 📚 PRINT 4: PÁGINA TURMA 2C

**URL:** `http://localhost:5000/turma-2c`

**O que você vai ver:**
- Header: "Turma 2C" com descrição
- Filtro/Badge destacando "Turma 2C"
- Grid de projetos da Turma 2C (maioria dos projetos)
- Projetos relacionados a "Horta Digital" e outros temas

**Como capturar:**
1. Clique em "Turma 2C"
2. Tire screenshot da página
3. Scroll para mostrar variedade de projetos
4. Capture pelo menos 2 screenshots (início e fim da página)

---

## 🌙 PRINT 5: DARK MODE - HOMEPAGE

**URL:** `http://localhost:5000` (com dark mode ativado)

**O que você vai ver:**
- Mesma página hero mas com:
  - Fundo escuro (quase preto)
  - Texto claro
  - Laranja (#FF6B00) mantém vibração
  - Melhor legibilidade em baixa luz

**Como capturar:**
1. Volte para home
2. Clique no ícone de tema (lua/sol) no topo direito
3. Mude para dark mode
4. Tire screenshot do hero e alguns cards em dark mode
5. Mostre a transição funcionando bem

---

## 👥 PRINT 6: CARD DE PROJETO EXPANDIDO (Hover/Click)

**URL:** Qualquer página com projetos

**O que você vai ver ao passar mouse:**
- Card fica com efeito de elevação (shadow)
- Botões de links ficam mais visíveis
- Cursor muda para pointer

**Como capturar:**
1. Na página de projetos, passe mouse sobre um card
2. Tire screenshot mostrando o efeito hover
3. Se houver dialog/modal de edição, capture também

---

## 📋 PRINT 7: PÁGINA ADMIN

**URL:** `http://localhost:5000/admin`

**O que você vai ver:**
- **Seção de Criação de Turma:**
  - Input para nome da turma (ex: "1C", "2C")
  - Input para descrição
  - Botão "Criar Turma" em laranja
  - Lista de turmas existentes (1C, 2C)

- **Seção de Criação de Projeto:**
  - Input: Título do Projeto
  - Input: Descrição
  - Dropdown: Categoria (Sistema, Agenda, Mapas, Horta)
  - Input: Nomes dos Alunos (múltiplos)
  - Dropdown: Selecionar Turma
  - Inputs para Links: Demo, Canva, Vídeo, GitHub
  - Upload de Screenshot (drag & drop)
  - Botão "Criar Projeto" em laranja

- **Tabela de Projetos:**
  - Lista todos os 21 projetos
  - Colunas: ID, Título, Categoria, Turma, Ações (Editar/Deletar)

**Como capturar:**
1. Vá para `/admin`
2. Tire screenshot completo mostrando:
   - Formulário de criação de projeto
   - Lista de projetos abaixo
3. Scroll para mostrar vários projetos na tabela
4. Se houver modal de edição, capture também

---

## 📱 PRINT 8: RESPONSIVO - MOBILE

**URL:** Qualquer página (vire para mobile)

**Como fazer:**
1. Abra DevTools (F12)
2. Clique em "Toggle device toolbar" (Ctrl+Shift+M)
3. Escolha "iPhone 12" ou "iPhone 13"
4. Tire screenshot da home, projetos e admin em mobile

**O que vai ver:**
- Cards em coluna única
- Menu adaptado
- Botões mais espaçados
- Tudo funciona perfeitamente em mobile

---

## 🎨 PRINT 9: FOOTERS

**URL:** Qualquer página (scroll até final)

**O que você vai ver:**
- Logo do projeto (Conecta Tânia)
- Localização: "Colégio Estadual Tânia Varella - Maringá, PR"
- Informação do curso: "Curso Desenvolvimento de Sistemas"
- "Projetos das turmas 1C e 2C"
- "Feito com ❤️ em 2024"
- **SEU PERFIL:** "Desenvolvido por: Cleyton Pinheiro" com link para LinkedIn

**Como capturar:**
1. Scroll até o final de qualquer página
2. Tire screenshot do footer
3. Verifique se seu nome e link LinkedIn aparecem

---

## 📊 FLUXO COMPLETO DE SCREENSHOTS

### Para Carousel LinkedIn (6-8 imagens):

**1️⃣ Print 1:** Homepage Hero (desktop, tema claro)
```
Mostra: Título, subtítulo, estatísticas, call-to-action
```

**2️⃣ Print 2:** Cards de Projetos
```
Mostra: Grid de projetos com variedade de categorias
```

**3️⃣ Print 3:** Turma 1C ou 2C
```
Mostra: Filtro por turma funcionando
```

**4️⃣ Print 4:** Mobile Responsivo
```
Mostra: Mesmo site em iPhone (coluna única)
```

**5️⃣ Print 5:** Dark Mode
```
Mostra: Tema escuro do site
```

**6️⃣ Print 6:** Admin Dashboard
```
Mostra: Backend com formulários e tabela de projetos
```

**7️⃣ Print 7:** Footer com Seu Perfil
```
Mostra: Seu nome e link LinkedIn no rodapé
```

**8️⃣ Print 8:** Card com Hover
```
Mostra: Interação do usuário com efeito visual
```

---

## 🎯 INSTRUÇÕES PASSO A PASSO

### Capturar Print Profissional:

1. **Abra o navegador** (Chrome, Firefox, Edge)
2. **Vá para** `http://localhost:5000`
3. **Coloque em fullscreen** (F11) para melhor visualização
4. **Use DevTools** (F12) para:
   - Mudar resolução para 1920x1080 ou 1366x768
   - Testar responsividade (Ctrl+Shift+M)
   - Alternar tema (claro/escuro)
5. **Tire o screenshot** com:
   - PrintScreen (Windows) ou Cmd+Shift+3 (Mac)
   - Ou use Snipping Tool do Windows
   - Ou F12 → Dev Tools Screenshot
6. **Edite se necessário** (opcionalmente) em Paint/Canva

### Ambiente de Captura Ideal:
- ✅ Tema claro para primeira impressão
- ✅ Resolução 1920x1080 (full HD)
- ✅ Zoom 100% (não amplie nem reduza)
- ✅ Sem abas abertas (só o site)
- ✅ Scroll posicionado bem

---

## 💾 ONDE SALVAR

Depois de capturar, salve os screenshots em uma pasta:

```
/screenshots_reais/
  ├── 1_home_hero.png
  ├── 2_projects_cards.png
  ├── 3_turma_1c.png
  ├── 4_turma_2c.png
  ├── 5_dark_mode.png
  ├── 6_admin_dashboard.png
  ├── 7_footer_perfil.png
  ├── 8_mobile_responsive.png
  └── 9_card_hover.png
```

---

## 🎬 DICAS EXTRAS

1. **Screenshot com DevTools:**
   - F12 → Clique nos 3 pontinhos
   - "Capture screenshot"
   - Escolha "Full page screenshot"

2. **Remover UI desnecessária:**
   - Feche abas não utilizadas
   - Use modo fullscreen (F11)
   - Maximize a janela do navegador

3. **Capturar interações:**
   - Passe mouse sobre cards (mostra hover)
   - Clique em filtros
   - Alterne tema (light/dark)
   - Tire print de cada estado

4. **Qualidade:**
   - Não compresse demais (mínimo 1920x1080)
   - Use PNG para melhor qualidade
   - Evite JPEG (fica pixelado)

---

## ✅ CHECKLIST FINAL

- [ ] Print 1: Home Hero (desktop, claro)
- [ ] Print 2: Cards de projetos
- [ ] Print 3: Turma 1C
- [ ] Print 4: Turma 2C ou filtro
- [ ] Print 5: Dark Mode
- [ ] Print 6: Admin Dashboard
- [ ] Print 7: Footer com seu perfil
- [ ] Print 8: Mobile Responsivo
- [ ] Print 9: Alguma interação (hover/click)

---

## 🚀 PRÓXIMO PASSO

Depois de capturar todos os prints:
1. Salve em uma pasta local
2. Suba para LinkedIn em um carousel
3. Use os textos do documento "PUBLICACAO_LINKEDIN.md"
4. Poste e acompanhe engajamento!

---

**Bom! Vamos aos prints? 📸**
