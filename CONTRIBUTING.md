# 🤝 Guia de Contribuição - Conecta Tânia

Obrigado por considerar contribuir para o Conecta Tânia! Este documento fornece as diretrizes e instruções para contribuir com o projeto.

## 📋 Código de Conduta

- Seja respeitoso com outros contribuidores
- Rejeite qualquer forma de discriminação
- Comunique-se de forma clara e profissional
- Foque em melhorar o projeto

## 🚀 Como Contribuir

### 1. Reportar Bugs

Se encontrou um bug, abra uma [issue](https://github.com/seu-usuario/conecta-tania/issues) com:

- Título descritivo
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)
- Seu environment (OS, navegador, Node.js version)

### 2. Sugerir Melhorias

Para sugerir uma melhoria:

- Descreva claramente a melhoria
- Explique por que seria útil
- Liste exemplos de ferramentas similares que implementam isso

### 3. Pull Request

Siga estes passos para contribuir com código:

```bash
# 1. Fork o repositório
git clone https://github.com/seu-usuario/conecta-tania.git

# 2. Crie uma branch
git checkout -b feature/SuaFeature

# 3. Faça suas mudanças
# Edite os arquivos necessários

# 4. Teste suas mudanças
npm run dev
npm run check  # Verifica tipos TypeScript

# 5. Commit com mensagens descritivas
git commit -m 'feat: adiciona nova feature'

# 6. Push para sua branch
git push origin feature/SuaFeature

# 7. Abra um Pull Request
# Descreva o que você fez e por quê
```

## 📝 Convenção de Commits

Use o formato Conventional Commits:

```
feat: adiciona nova feature
fix: corrige bug
docs: atualiza documentação
style: formata código
refactor: refatora código
test: adiciona testes
chore: atualizações de build/deps
```

## 🎨 Padrões de Código

### Frontend (React/TypeScript)

```typescript
// ✅ Bom
import { FC } from 'react';

interface UserProps {
  name: string;
  age: number;
}

const User: FC<UserProps> = ({ name, age }) => {
  return <div>{name} ({age})</div>;
};

export default User;
```

```typescript
// ❌ Ruim
// - Sem tipos
// - Sem export default
// - Sem interface de props
const User = (props) => {
  return <div>{props.name}</div>;
};
```

### Backend (Node/Express)

```typescript
// ✅ Bom
app.get('/api/projetos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const projeto = await storage.getProjeto(id);
    
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    res.json(projeto);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Erro ao buscar projeto' });
  }
});
```

### Validação Zod

```typescript
// ✅ Use schemas Zod
const schema = insertProjetoSchema.parse(req.body);

// ❌ Não faça validação manual
if (!req.body.titulo) {
  return res.status(400).json({ error: 'Falta título' });
}
```

## 📱 Checklist para PR

Antes de enviar seu Pull Request, verifique:

- [ ] Meu código segue o estilo do projeto
- [ ] Atualizei a documentação
- [ ] Adicionei testes (se necessário)
- [ ] Meu código passa em `npm run check`
- [ ] Nenhum erro no console
- [ ] Testei em tema claro e escuro
- [ ] Testei em mobile (responsividade)
- [ ] Não adicionei dependências desnecessárias

## 🧪 Testando Localmente

```bash
# Instale dependências
npm install

# Configure .env
cp .env.example .env

# Rode migrations
npm run db:push

# Inicie servidor de desenvolvimento
npm run dev

# Verifique tipos
npm run check

# Build para produção
npm run build
```

## 🎯 Ideias de Contribuição

### Fácil (Good First Issue)
- [ ] Adicionar mais categorias de projetos
- [ ] Melhorar textos e traduções
- [ ] Corrigir typos
- [ ] Melhorar acessibilidade

### Médio
- [ ] Adicionar busca de projetos
- [ ] Implementar filtros avançados
- [ ] Adicionar dashboard de estatísticas
- [ ] Melhorar performance

### Difícil
- [ ] Implementar autenticação (JWT/OAuth)
- [ ] Adicionar sistema de comentários
- [ ] Criar app mobile
- [ ] Integrar CI/CD

## 📚 Arquitetura & Stack

Familiarize-se com:

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **UI:** Shadcn/ui + Radix UI

Veja [README.md](README.md) para mais detalhes.

## 🆘 Precisa de Ajuda?

- Abra uma [discussão](https://github.com/seu-usuario/conecta-tania/discussions)
- Entre em contato via LinkedIn: https://www.linkedin.com/in/cleytonpinheiro/
- Verifique a documentação em README.md

## 📜 License

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [MIT License](LICENSE).

---

Obrigado por contribuir! 🙏 Sua ajuda torna o Conecta Tânia melhor para todos!
