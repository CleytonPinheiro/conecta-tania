# 📞 Menu de Contato - Guia Completo

## 📌 Visão Geral

Um **Menu de Contato** foi adicionado ao header do Conecta Tânia, permitindo que usuários entrem em contato com o desenvolvedor e enviem feedback sobre o projeto.

---

## 🎯 Localização

### Desktop (≥ 768px)
- **Posição:** Header superior, **ANTES** do Tech Stack
- **Ordem:** Navegação → **Contato** → Tech → Tema
- **Ícone:** 💬 (MessageSquare da Lucide React)
- **Label:** "Contato" (em telas maiores) ou só ícone (em telas médias)

### Mobile (< 768px)
- **Oculto no header**
- **Disponível:** No menu mobile lateral com label "📞 Contato"

---

## 🎨 Estrutura do Menu

O menu é dividido em **2 seções principais**:

### 1️⃣ Contato Direto (Padrão)
```
📞 Entre em Contato
Críticas, sugestões e elogios são bem-vindos!
─────────────────────
Redes Sociais
├─ 🔵 LinkedIn
│  └─ Cleyton Pinheiro
│
└─ 📧 Email
   └─ cleyton.pinheiro@example.com

─────────────────────
Feedback
└─ 📤 Enviar Feedback
   └─ Críticas e sugestões
```

### 2️⃣ Formulário de Feedback (Após clicar)
```
Enviar Feedback    [✕]
─────────────────────
Nome:        [input]
Email:       [input]
Tipo:        [select]
            ├─ Sugestão
            ├─ Crítica
            └─ Elogio
Mensagem:    [textarea]
─────────────────────
[Enviar Feedback]
```

---

## 🎛️ Funcionalidades

### 1. Link LinkedIn
- **Ícone:** Linkedin azul (🔵)
- **Ação:** Abre LinkedIn em aba nova
- **URL:** https://www.linkedin.com/in/cleytonpinheiro/
- **Descrição:** "Cleyton Pinheiro"

### 2. Link Email
- **Ícone:** Email vermelho (📧)
- **Ação:** Abre cliente de email padrão
- **Email:** cleyton.pinheiro@example.com
- **Descrição:** "cleyton.pinheiro@example.com"

### 3. Formulário de Feedback
- **Campos:**
  - **Nome:** Obrigatório
  - **Email:** Obrigatório (validado)
  - **Tipo:** Select com 3 opções
    - Sugestão (padrão)
    - Crítica
    - Elogio
  - **Mensagem:** Obrigatório (Textarea)

- **Ação ao enviar:**
  - Abre cliente de email com dados pré-preenchidos
  - Assunto: `[Conecta Tânia] Sugestão/Crítica/Elogio`
  - Corpo: Dados do formulário

---

## 🚀 Como Usar

### Desktop - Contato Direto
```
1. Abra o site
2. No header superior, clique no botão "Contato" (ou só ícone)
3. Menu dropdown abre
4. Escolha uma opção:
   - Clique em LinkedIn → Abre perfil
   - Clique em Email → Abre cliente de email
   - Clique em "Enviar Feedback" → Abre formulário
```

### Desktop - Enviar Feedback
```
1. Clique em "Enviar Feedback"
2. Formulário aparece
3. Preencha:
   - Nome
   - Email
   - Tipo (Sugestão/Crítica/Elogio)
   - Mensagem
4. Clique "Enviar Feedback"
5. Cliente de email abre com dados pré-preenchidos
6. Revise e clique enviar
```

### Mobile
```
1. Clique no ícone de menu (hambúrguer)
2. Abra menu lateral
3. Role para baixo até "📞 Contato"
4. Toque para abrir dropdown
5. Escolha opção desejada
```

### Teclado
```
- Tab: Navegar pelo menu
- Enter: Ativar botão
- Escape: Fechar menu
```

---

## 💻 Arquivos Envolvidos

### Novos Arquivos
- `client/src/components/ContactMenu.tsx` - Componente do menu

### Arquivos Modificados
- `client/src/components/Header.tsx` - Integração do menu no header

---

## 📝 Código - ContactMenu.tsx

```typescript
// Importações
import { Mail, Linkedin, MessageSquare, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormField, ... } from '@/components/ui/form';

// Type do Formulário
type FeedbackForm = {
  name: string;
  email: string;
  message: string;
  type: 'critica' | 'sugestao' | 'elogio';
};

// Estrutura Principal
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>...</Button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent>
    {showForm ? <FormContent /> : <ContactLinks />}
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 🔧 Componentes Shadcn Utilizados

```typescript
// UI Components
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, ... } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

// Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// Toast para feedback
import { useToast } from '@/hooks/use-toast';
```

---

## 🎯 Casos de Uso

### Para Visitantes
```
Gosta do projeto
  ↓
Clica em Contato
  ↓
Escolhe LinkedIn ou Email
  ↓
Se conecta com desenvolvedor
```

### Para Usuários com Sugestões
```
Tem uma ideia para melhorar
  ↓
Clica em "Enviar Feedback"
  ↓
Preenche formulário
  ↓
Envia mensagem ao desenvolvedor
```

### Para Dar Crítica
```
Encontrou problema ou bug
  ↓
Clica em "Enviar Feedback"
  ↓
Seleciona "Crítica"
  ↓
Descreve o problema
  ↓
Envia para ser corrigido
```

---

## 🚀 Customização

### Mudar Email
Editar em `ContactMenu.tsx`:
```typescript
// Linha ~80
window.location.href = `mailto:SEU_EMAIL@example.com`;

// Linha ~90
<span>seu.email@example.com</span>
```

### Mudar LinkedIn
```typescript
// Linha ~50
href="https://www.linkedin.com/in/SEU_PERFIL/"
```

### Adicionar Mais Opções
```typescript
<DropdownMenuItem asChild>
  <a href="https://github.com/seu-usuario">
    <Github className="w-4 h-4" />
    <div>
      <span>GitHub</span>
      <span>seu-usuario</span>
    </div>
  </a>
</DropdownMenuItem>
```

### Mudar Tipos de Feedback
```typescript
type FeedbackForm = {
  ...
  type: 'critica' | 'sugestao' | 'elogio' | 'novo-tipo';
};

// E no select:
<option value="novo-tipo">Novo Tipo</option>
```

---

## 🌍 Responsividade

### Desktop (≥ 1024px)
- ✅ Label "Contato" visível
- ✅ Ícone + Label juntos
- ✅ Menu dropdown espaçoso
- ✅ Largura 384px (w-96)

### Laptop (768px - 1023px)
- ✅ Só ícone (sem label)
- ✅ Menu dropdown alinhado à direita
- ✅ Funciona em hover

### Mobile (< 768px)
- ❌ Oculto no header
- ✅ Disponível no menu lateral
- ✅ Label "📞 Contato"
- ✅ Toque para expandir

---

## 🐛 Troubleshooting

### Menu não aparece no desktop
```
✓ Verifique se tem breakpoint md (768px)
✓ Inspete com DevTools (F12)
✓ Verifique z-index
✓ Recarregue página (Ctrl+F5)
```

### Email não abre
```
✓ Verifique se email está correto
✓ Teste link mailto: no navegador
✓ Certifique-se que cliente de email está configurado
```

### LinkedIn não abre
```
✓ Verifique URL do perfil
✓ Certifique-se que está em navegador conectado
✓ Teste link em aba incógnito
```

### Formulário não envia
```
✓ Preencha todos os campos obrigatórios
✓ Verifique se cliente de email está configurado
✓ Veja console (F12) para erros
```

### Dropdown fecha automaticamente
```
✓ É comportamento normal do Radix UI
✓ Reabre ao clicar novamente
✓ Clique fora fecha completamente
```

---

## 📊 Analytics Possíveis

Se implementar analytics, pode rastrear:
- Quantos cliques no menu Contato
- Qual opção é mais usada (LinkedIn/Email/Feedback)
- Taxa de preenchimento do formulário
- Tipos de feedback mais comuns

---

## 🎓 Conceitos Implementados

- ✅ Dropdown Menu (Radix UI)
- ✅ React Hook Form
- ✅ Form Validation
- ✅ External Links
- ✅ Email Client Integration
- ✅ State Management (useState)
- ✅ Conditional Rendering

---

## 🔐 Privacidade

- ✅ Nenhum dado salvo no servidor
- ✅ Formspree/email direto
- ✅ Sem tracking de dados
- ✅ GDPR compliant

---

## 🎉 Próximas Melhorias

- [ ] Integrar com Formspree para backend
- [ ] Adicionar Discord channel
- [ ] Suporte a múltiplos idiomas
- [ ] Confirmação visual após envio
- [ ] Sistema de tickets
- [ ] Chat em tempo real
- [ ] Feedback ratings

---

## 📞 Suporte

Dúvidas sobre o Contact Menu?
- 🔗 LinkedIn: https://www.linkedin.com/in/cleytonpinheiro/
- 📧 Email: Via menu de contato
- 💬 Abra uma discussão no GitHub

---

**Menu de Contato: Conectando você com o desenvolvedor! 📞**
