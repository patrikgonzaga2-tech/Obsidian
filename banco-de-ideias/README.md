# Banco de Ideias

Painel que funciona como centro de comando das suas ideias e projetos: busca que entende frases
("quero terminar hoje o de edição de vídeo"), cards com fase e progresso, conversa com a IA já com
o contexto da ideia, e nova ideia ditada por áudio.

## Rodar

```bash
cd banco-de-ideias
npm install
cp .env.example .env.local   # opcional: preencha as chaves que tiver
npm run dev                  # http://localhost:3000
```

Sem nenhuma chave o painel já funciona: as ideias ficam em `.data/banco.json`, a busca é local,
a voz usa o reconhecimento do navegador (Chrome/Edge) e "Abrir no Claude.ai" leva o contexto completo.
Cada chave liga um pedaço a mais:

| Variável | O que liga |
|---|---|
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Ideias, conexões e histórico na nuvem (rode `supabase/schema.sql` antes) |
| `ANTHROPIC_API_KEY` | Busca semântica, organização da ideia ditada e conversa dentro do painel |
| `WHISPER_URL` (+ `WHISPER_API_KEY`) | Transcrição Whisper no servidor (OpenAI ou servidor local compatível) |
| `GITHUB_TOKEN` | Importar repositórios como ideias (issues abertas viram tarefas) |
| `IDEIAS_PASTA_LOCAL` | Pasta de notas `.md` para importar (padrão: este cofre Obsidian → `01-Projetos`) |

O painel de **Conexões** (canto superior esquerdo) mostra o que falta em cada fonte, com o passo a passo
e o botão **Iniciar conexão**, que testa tudo e importa as ideias quando a fonte permite.

## Como funciona

- **Busca**: resultado instantâneo com a busca local (sinônimos + intenção: "terminar", "usar", "parado",
  "urgente"); com a chave da Anthropic, o Claude refina a ordem e explica o motivo de cada resultado.
- **Ideia**: título, categoria, status (em andamento / no ar / pausado), fase (Início → Meio → Fim),
  progresso, prioridade, "onde parei" e passo a passo. Marcar tarefas atualiza progresso e fase sozinho.
- **Conversa**: "Iniciar / Continuar conversa" injeta o contexto completo da ideia (resumo, feito, pendente
  e as últimas mensagens) e a IA abre retomando de onde parou. O histórico fica salvo por ideia.
- **Nova ideia por áudio**: grava, transcreve (Whisper ou navegador), organiza (Claude ou regras locais) e
  cria o card com fase "Início", resumo, prioridade e passo a passo inicial.
- **No ar**: a prateleira do topo mostra o que já está publicado; clicar abre o produto.

## Estrutura

```
app/page.tsx            carrega ideias e conexões no servidor
app/api/…               ideias, busca, organizar, transcrever, chat (stream), conexões
components/             Hub, Sidebar, CardIdeia, PrateleiraNoAr, DrawerIdeia, Conversa,
                        ModalNovaIdeia, AgenteConexao, ui (ícones 3D, status, fase)
lib/store.ts            Supabase (tabelas hub_*) ou arquivo local
lib/conexoes.ts         verificação das fontes + importação GitHub/Desktop
lib/ia.ts               Claude: busca semântica e organização (saída estruturada)
lib/busca-local.ts      busca sem IA
lib/contexto.ts         pacote de contexto da ideia para a conversa
supabase/schema.sql     tabelas hub_ideias, hub_conexoes, hub_historico
```

## Publicar na Vercel

Crie um projeto apontando para este repositório com **Root Directory = `banco-de-ideias`** e cadastre as
variáveis acima. Na Vercel não há disco persistente: configure o Supabase para não perder ideias, e a
conexão Desktop só funciona rodando localmente.

> O painel não tem login. Se publicar, proteja o projeto (Vercel → Settings → Deployment Protection)
> — as rotas de API usam a chave service_role do Supabase e a da Anthropic.
