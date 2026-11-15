# Fábrica de Conteúdo IA · Passo a passo do ZERO (bem mastigado)

> Projeto SEPARADO da Laura Rosa / Corpo Feliz e da agência PTK.
> Ponto de partida: **não existe nada** (sem canal, sem nicho, sem personagem, sem contas).
> Atualizado em 15/11/2026.

## Como ler este guia
- Cada passo diz: **o que é**, **por que**, **como fazer (clique a clique)**, **cuidado** e
  **✅ o que me mandar** quando terminar.
- 🧑 = você faz. 🤖 = eu faço. 🤝 = juntos.
- Os nomes dos botões dos sites podem mudar um pouco com o tempo. Se não achar, me mande um print.
- **Nunca me mande senha.** Senha vai só no cofre (Passo 1). Chave de API vai só nos lugares que eu
  indicar (configurações do ambiente), nunca no chat.

## Visão geral (as 6 partes)

| Parte | O que é | Quem | Tempo estimado |
|---|---|---|---|
| A | Preparar: cofre de senhas e celular | 🧑 | 15 min |
| B | Criar as contas do projeto | 🧑 | 1h30 a 2h |
| C | Montar o ambiente e o repositório | 🤖 (você aprova telas) | 1 sessão |
| D | Recepção: definir tudo do zero (regras, nicho, formato, nome, personagem) | 🤝 | 2 a 3 sessões |
| E | Criar o canal e as redes | 🧑 com o meu roteiro | 1 h |
| F | Construir a fábrica, por fases | 🤖 (você aprova) | semanas |
| G | Sua rotina depois que estiver rodando | 🧑 | 15 a 20 min por reunião |

Tempos são estimativas, não promessa.

---

# PARTE A · Preparar (🧑, 15 min)

## Passo 1 · Cofre de senhas do projeto
- **O que é:** um app que guarda todas as senhas, com uma senha-mestra só.
- **Por que:** vamos criar ~8 contas. Senha em bloco de notas ou no WhatsApp é risco. E no dia de
  vender o SaaS ou ter sócio, você entrega o cofre e pronto.
- **Como fazer (Bitwarden, plano grátis):**
  1. Entre em `bitwarden.com` → **Get started / Criar conta**.
  2. Use seu e-mail pessoal **só para o cofre** (as contas do projeto usarão o Gmail novo do Passo 2).
  3. Crie uma **senha-mestra forte** (uma frase de 4 a 5 palavras). **Anote em papel** e guarde.
     Se perder a senha-mestra, ninguém recupera.
  4. Instale o app no celular e a extensão no navegador.
  5. Crie uma **pasta** chamada com o nome do projeto. Todo login novo vai nela.
- **Cuidado:** ligue a verificação em 2 etapas do próprio cofre (Configurações → Segurança → Login em
  duas etapas → app autenticador).
- ✅ **Me mande:** "cofre pronto".

## Passo 2 · App autenticador no celular
- Instale **Google Authenticator** ou **Microsoft Authenticator** (grátis).
- Vai servir para a verificação em 2 etapas de todas as contas.
- ✅ Nada a mandar.

---

# PARTE B · Contas do projeto (🧑, 1h30 a 2h)

> Ordem importa: Google primeiro (é a "dona" de quase tudo), depois o resto.

## Passo 3 · Conta Google nova (Gmail do projeto)
- **O que é:** um Gmail só do projeto.
- **Por que:** ela vai ser a **dona do canal do YouTube**, da chave do Gemini e da chave da API do
  YouTube. Se um dia vender o projeto, a conta vai junto, sem levar nada seu nem da Laura.
- **Como fazer:**
  1. Abra uma **janela anônima** no navegador (para não misturar com o seu Gmail).
  2. Entre em `accounts.google.com/signup`.
  3. Nome: o nome provisório do projeto. Data de nascimento: a sua (precisa ser maior de 18).
  4. Escolha o endereço (ex.: `nomedoprojeto.studio@gmail.com`).
  5. Senha: gere no Bitwarden e salve lá na pasta do projeto.
  6. Telefone: o seu (para recuperação).
  7. Depois de criar: `myaccount.google.com` → **Segurança** → **Verificação em duas etapas** →
     ativar com o app autenticador.
- **Cuidado:** não crie o canal do YouTube ainda. Só depois da Parte D (nicho e nome definidos).
- ✅ **Me mande:** o endereço do Gmail novo (só o endereço, sem senha).

## Passo 4 · Chave do Gemini (assistir vídeos pelo link)
- **O que é:** uma chave grátis que deixa o Google assistir vídeos do YouTube e me devolver a análise.
- **Por que:** o YouTube bloqueia download vindo de servidor de nuvem. Com o Gemini, o vídeo é
  assistido pelo link. É a base da sala de Análise.
- **Como fazer:**
  1. Logado no **Gmail novo**, entre em `aistudio.google.com/apikey`.
  2. Aceite os termos → **Create API key / Criar chave de API**.
  3. Copie a chave e salve no Bitwarden com o nome "Gemini API".
- **Cuidado:** a chave **não vai no chat**. No Passo 13 eu te mostro onde colar.
- ✅ **Me mande:** "chave Gemini criada".

## Passo 5 · Chave da API do YouTube (dados do Radar)
- **O que é:** a chave oficial e grátis para ler dados públicos do YouTube (views, data de criação
  do canal, inscritos, número de vídeos).
- **Por que:** é o "combustível" do Radar. Oficial, sem bloqueio.
- **Como fazer:**
  1. Logado no Gmail novo, entre em `console.cloud.google.com`.
  2. Aceite os termos. No topo, clique em **Selecionar projeto → Novo projeto**. Nome: o do projeto.
     **Criar**.
  3. Menu (☰) → **APIs e serviços → Biblioteca**. Busque **YouTube Data API v3** → **Ativar**.
  4. Menu → **APIs e serviços → Credenciais → + Criar credenciais → Chave de API**.
  5. Clique na chave criada → **Restrições de API → Restringir chave → marque só "YouTube Data
     API v3"** → **Salvar**.
  6. Copie a chave e salve no Bitwarden com o nome "YouTube Data API".
- **Cuidado:** não precisa cadastrar cartão para isso. Se pedir, me avise antes.
- ✅ **Me mande:** "chave YouTube criada".

## Passo 6 · Organização no GitHub + repositório
- **O que é:** a "pasta" de código do projeto, separada da `patrikgonzaga2-tech` (onde está a Laura).
- **Por que:** separa código, permissões e, no futuro, facilita vender ou ter sócio.
- **Como fazer:**
  1. Entre no GitHub com o seu usuário normal.
  2. Canto superior direito (sua foto) → **Your organizations** → **New organization**.
  3. Plano: **Free**.
  4. Nome da organização: o do projeto (ex.: `nomedoprojeto`). E-mail de contato: o Gmail novo.
  5. "This organization belongs to": **My personal account**. **Next** → pule convites → **Complete
     setup**.
  6. Dentro da organização: **Repositories → New repository**.
     - Nome: `fabrica` (ou o que preferir).
     - **Private**.
     - Marque **Add a README file**.
     - **Create repository**.
- ✅ **Me mande:** o endereço do repositório (ex.: `github.com/nomedoprojeto/fabrica`).

## Passo 7 · Instalar o app do Claude na organização nova
- **O que é:** a permissão para eu ler e escrever no repositório novo.
- **Como fazer:**
  1. Entre em `github.com/apps/claude/installations/select_target`.
  2. Escolha a **organização nova** (não a `patrikgonzaga2-tech`).
  3. **Only select repositories** → escolha o repositório do Passo 6 → **Install**.
- ✅ **Me mande:** "app instalado".

## Passo 8 · Equipe nova na Vercel (onde o escritório vai ficar no ar)
- **Como fazer:**
  1. Entre em `vercel.com` com o seu login de sempre.
  2. Canto superior esquerdo (nome da equipe atual) → **Create Team**.
  3. Nome: o do projeto. Plano: **Hobby** por enquanto.
- **Cuidado:** pelo que sei, o plano Hobby é para uso **não comercial**. Quando for vender ou faturar,
  vira **Pro** (~US$ 20/mês por membro, confirmar no site). Para construir e testar, Hobby serve.
- ✅ **Me mande:** o nome da equipe.

## Passo 9 · Organização nova no Supabase (banco de dados)
- **Como fazer:**
  1. Entre em `supabase.com/dashboard` com o seu login de sempre.
  2. Menu de organizações (topo) → **New organization**. Nome: o do projeto. Tipo: **Personal**.
     Plano: **Free**.
  3. Dentro dela: **New project**. Nome: `fabrica`. Senha do banco: gere no Bitwarden e salve.
     Região: **South America (São Paulo)**. **Create new project**.
- **Cuidado:** no plano grátis, pelo que sei, o projeto pausa se ficar 1 semana sem uso (dá para
  religar). Confirmar no site.
- ✅ **Me mande:** o nome da organização (a senha do banco fica só no cofre).

## Passo 10 · Bot do Telegram (avisos da reunião e alertas 🔴)
- **Por que:** canal de aviso PRÓPRIO do projeto, sem usar o WhatsApp/Metrifiquei da PTK.
- **Como fazer:**
  1. No Telegram, procure **@BotFather** → **Iniciar**.
  2. Envie `/newbot`. Nome: o do projeto. Usuário: termina em `bot` (ex.: `nomedoprojeto_bot`).
  3. Ele responde com um **token**. Salve no Bitwarden como "Telegram bot". **Não mande no chat.**
  4. Abra o seu bot e envie "oi" (para ele poder te mandar mensagens depois).
- ✅ **Me mande:** o @ do bot.

## Passo 11 · Gravyx: espaço só do projeto
- **Como fazer:** no app do Gravyx, crie um **workspace** com o nome do projeto.
  (Se quiser gastos 100% separados, uma conta nova; o preço do plano eu não tenho, confirmar no site.)
- ✅ **Me mande:** o nome do workspace.

## Passo 12 · (Ainda NÃO) Metricool, YouTube, Instagram, TikTok, Facebook
- Ficam para a **Parte E**, depois de decidir nicho e nome.

---

# PARTE C · Ambiente e repositório (🤖, você só aprova telas)

## Passo 13 · Ambiente separado no Claude Code
- 🤖 Eu peço a criação de um **ambiente novo** com o nome do projeto, só com o repositório novo e a
  rede necessária (YouTube, APIs do Google, Telegram). **Aparece uma tela para você aprovar.**
- 🧑 Depois você coloca as 2 chaves como **segredos do ambiente** (eu nunca vejo o valor):
  1. Na sessão, clique no nome do ambiente (barra de título) → **Edit** → **Network secrets**.
  2. Segredo 1: Host `generativelanguage.googleapis.com` · Header `x-goog-api-key` · Valor: chave
     do Gemini (Passo 4).
  3. Segredo 2: Host `www.googleapis.com` · Header `x-goog-api-key` · Valor: chave do YouTube
     (Passo 5).
  4. **Salvar.**
- ✅ **Me mande:** "segredos salvos".

## Passo 14 · Primeira sessão do projeto
- 🧑 Abra uma **sessão nova** no ambiente novo, só com o repositório novo, e escreva:
  **"COMEÇAR FÁBRICA: ler o dossiê no Obsidian e montar a base"**.
- 🤖 Nela eu monto:
  - `CLAUDE.md` do projeto (português; travas; teto de gasto; "nunca usar contas, dados ou textos da
    Laura/PTK");
  - `docs/` com o DOSSIE, CONTAS_E_CUSTOS, PESQUISA e este passo a passo (copiados do Obsidian);
  - as skills (11 do YouTube + análise de vídeo + modelagem), sem nada da Laura;
  - o desenho do banco já multi-cliente (contas, canais, fichas, biblioteca, itens da esteira, gastos,
    reuniões).
- 🤖 No Obsidian fica só uma nota de ponteiro: "o projeto mora em tal repositório".
- ✅ Você recebe um resumo e o link do PR para aprovar.

---

# PARTE D · Recepção: definir tudo do zero (🤝, 2 a 3 sessões)

> A Recepção é uma entrevista em múltipla escolha. Você responde; os dados decidem o resto; você
> aprova. As perguntas abaixo são as que eu vou fazer, para você já ir pensando.

## Passo 15 · Regras do dono (5 a 10 min)
| Pergunta | Exemplos de resposta |
|---|---|
| Orçamento máximo por mês para a fábrica | US$ 50 / 100 / 200 |
| Teto de gasto por dia | US$ 3 / 5 / 10 |
| Horário de trabalho da fábrica | 08h às 22h / 24 h |
| Idioma e país do conteúdo | português-Brasil / inglês-EUA / espanhol |
| De onde vem o dinheiro | AdSense / livro na Amazon / produto próprio / afiliado / patrocínio |
| O que nunca fazer | aparecer rosto real / política / religião / conteúdo para adulto… |
| Quando é a 1ª reunião | dia e hora |
| Nível de autonomia inicial | 1 (trava tudo) / 2 / 3 |

## Passo 16 · Descoberta de nicho (o sistema pesquisa, você escolhe)
- 🤖 O Radar roda em "modo exploração" por 1 a 2 dias, dentro do teto, e dá nota a cada nicho:

| Critério | O que mede |
|---|---|
| Demanda | quantas views os vídeos do nicho fazem |
| Concorrência | quantos canais grandes já dominam |
| Frequência de virais | quantos vídeos fora da curva aparecem por semana |
| Canais novos crescendo | canais com menos de 30 a 90 dias batendo números altos |
| Quanto paga por view | estimativa; infantil paga menos (sem anúncio personalizado) |
| Dá para fazer com IA | sem rosto real, sem gravação |
| Receitas extras | livro, produto, afiliado |
| Risco de regra | direitos autorais, política de IA, conteúdo para crianças |

- 🤖 Entrego o **top 3** com nota, exemplos de vídeos e o motivo de cada nota.
- 🧑 Você escolhe 1.

## Passo 17 · Formato e referências
- 🤖 Proponho o formato vencedor do nicho (duração, ritmo, Shorts ou longo) e 5 a 10 canais de
  referência.
- 🧑 Você confirma ou troca. Pode acrescentar canais que você já conhece.

## Passo 18 · Identidade
- 🤖 3 opções de **nome**, já conferidas: livre no YouTube (@), no Instagram e domínio.
- 🤖 3 opções de **personagem** (imagens geradas no workspace do projeto, com o custo antes).
- 🤖 **Voz** (2 ou 3 amostras), **cores**, **regras de "nunca fazer"** do canal.
- 🧑 Você escolhe cada um.

## Passo 19 · Padrões de produção
- 🤖 Proponho: duração, quantos vídeos e Shorts por semana, dias de publicação, nível de autonomia.
- 🧑 Você confirma. Isso fecha a **ficha do canal**.

---

# PARTE E · Criar o canal e as redes (🧑 com roteiro, ~1 h)

## Passo 20 · Canal do YouTube (na conta Google nova)
1. Logado no Gmail novo, entre em `youtube.com` → sua foto → **Criar um canal**.
2. Nome e @: os escolhidos no Passo 18.
3. Foto e banner: os que eu te entregar.
4. **YouTube Studio → Configurações → Canal → Configuração avançada → Público:** marque conforme o
   nicho (se for infantil: "Sim, é conteúdo para crianças").
5. **YouTube Studio → Configurações → Canal → Qualificação de recursos:** verifique o telefone (libera
   vídeos longos e thumb personalizada).
- ✅ **Me mande:** o link do canal.

## Passo 21 · Redes (na conta nova)
- Instagram, TikTok e página do Facebook com o mesmo nome e @. Eu te mando a bio, a foto e o link.
- ✅ **Me mande:** os @.

## Passo 22 · Metricool
- Crie uma **marca nova** com o nome do projeto e conecte as redes do Passo 21 e o YouTube.
- Antes, confira se o seu plano aceita uma 2ª marca (se não, avalie conta nova).
- ✅ **Me mande:** "marca criada".

---

# PARTE F · Construir a fábrica (🤖, você aprova cada fase)

| Fase | O que eu entrego | O que você faz |
|---|---|---|
| F1 · Radar + Biblioteca v0 | Rotina dentro do horário e do teto, alertas 🔴🟠🟡, base enchendo | aprova o PR |
| F2 · Tela da reunião + Caixa | Pauta da reunião, "Gasto do dia", botão de teto extra, marcar próxima reunião | testa no celular |
| F3 · 1º vídeo "na mão" | Roteiro → aprovação → arte → montagem → revisão → aprovação → publicação | aprova 2 vezes e publica |
| F4 · Esteira completa | Salas automáticas com travas e Revisão de Potencial | aprova o PR |
| F5 · Modelagem | Você alimenta virais; sai estrutura + conteúdo 100% nosso | manda links |
| F6 · Escritório visual | Painel em pixel art em cima da esteira | aprova o visual |
| F7 · Rotina e autonomia | Ciclos no horário, ROI semanal, níveis 1-2-3 | escolhe o nível |
| F8 · Amazon e redes | Livro de colorir (se o nicho permitir) e posts nas redes | aprova antes de enviar |
| F9 · SaaS | Multi-cliente, cobrança, cadastro guiado (os Passos 15 a 19 viram o cadastro) | decide preço e quando lançar |

---

# PARTE G · Sua rotina quando estiver rodando

- **Na reunião (15 a 20 min):** aprovações → o que vai ao ar → números → alertas → Radar → caixa →
  plano → **marcar a próxima**.
- **Obrigatório 1 reunião por semana.** Sem reunião em 7 dias, a fábrica segura publicação e gasto
  extra.
- **Teto batido:** chega o aviso no Telegram; você abre o cartão e aprova + US$ X (vale só no dia) ou
  deixa parado.

---

# Checklist rápido (marque conforme for fazendo)

- [ ] 1 Cofre de senhas
- [ ] 2 App autenticador
- [ ] 3 Gmail novo + 2 etapas
- [ ] 4 Chave Gemini
- [ ] 5 Chave YouTube Data API
- [ ] 6 Organização + repositório no GitHub
- [ ] 7 App do Claude na organização
- [ ] 8 Equipe Vercel
- [ ] 9 Organização + projeto Supabase (São Paulo)
- [ ] 10 Bot do Telegram
- [ ] 11 Workspace Gravyx
- [ ] 13 Ambiente novo + 2 segredos
- [ ] 14 1ª sessão do projeto
- [ ] 15 a 19 Recepção (regras, nicho, formato, identidade, padrões)
- [ ] 20 a 22 Canal, redes, Metricool
- [ ] F1 a F9 Construção
