# Fábrica de Conteúdo IA · Passo a passo do ZERO

> Projeto independente: contas, dados e infraestrutura próprios.
> Ordem: **1º construir o escritório → 2º criar o canal DENTRO dele.**
> Ponto de partida: não existe nada (sem canal, nicho, personagem ou contas).
> Atualizado em 15/11/2026.

## Como ler
- Cada passo diz: **o que é · por que · como fazer (clique a clique) · cuidado · ✅ o que me mandar**.
- 🧑 você faz · 🤖 eu faço · 🤝 juntos.
- Os nomes dos botões dos sites podem mudar um pouco. Se não achar, me mande um print.
- **Nunca me mande senha nem chave no chat.** Senha vai no cofre (Passo 1); chave vai nas
  configurações do ambiente (Passo 11).
- Avisos (reunião, alertas, teto batido) chegam **pelo próprio escritório**, instalado no celular como
  app. Nenhum aplicativo de mensagens.

## Mapa geral

| Parte | O que é | Quem | Tempo estimado |
|---|---|---|---|
| **A** | Preparar: cofre de senhas e autenticador | 🧑 | 15 min |
| **B** | Criar as contas do projeto | 🧑 | 1h30 a 2h |
| **C** | Ambiente de trabalho e 1ª sessão | 🤖 (você aprova telas) | 1 sessão |
| **D** | **Construir o escritório** (10 fases) | 🤖 (você testa e aprova cada fase) | várias semanas |
| **E** | **Criar o canal dentro do escritório** | 🤝 | 3 a 5 sessões |
| **F** | Rotina com o canal rodando | 🧑 | 15 a 20 min por reunião |
| **G** | Antes de vender | 🤝 | ver REQUISITOS_PRONTO_PARA_VENDER |

Tempos são estimativas, não promessa.

## ⚠️ ANTES DE TUDO: Sprint 1
Primeiro o canal no ar e 1 a 5 vídeos publicados à mão (`SPRINT_1_PRIMEIRO_VIDEO.md`). O escritório
só começa se o Sprint 1 passar.

## Caminho rápido: cada conta só quando a fase precisar
Para rodar e testar logo, não precisa criar tudo de uma vez:

| Antes de… | Crie só isto |
|---|---|
| **D1 (começar o escritório)** | Passo 6 GitHub + Passo 7 app do Claude + Passo 8 Vercel + Passo 9 Supabase (com os seus logins de sempre) |
| **D4 (Radar)** | Passo 3 Gmail do projeto (2 etapas por SMS) + Passo 5 chave YouTube + Passo 11 ambiente e segredos |
| **D5 (Análise)** | Passo 4 chave Gemini + Passo 10b chave da IA de texto |
| **D7 (Produção)** | Passo 10 gerador de imagens (o escolhido no teste, com API) |
| **D9 (Publicação)** | canal de TESTE privado no Gmail do projeto |
| **Parte E (canal de verdade) e qualquer dinheiro** | **obrigatório:** Passo 1 cofre + Passo 2 autenticador |

Falhas encontradas na revisão e as correções: `REVISAO_FALHAS.md`.

---

# PARTE A · Preparar (🧑, 15 min) · pode ficar para depois, obrigatório antes da Parte E

## Passo 1 · Cofre de senhas
- **O que é:** um app que guarda todas as senhas do projeto com uma senha-mestra.
- **Por que:** vamos criar ~7 contas. No dia de vender ou ter sócio, você entrega o cofre e pronto.
- **Como fazer (Bitwarden, grátis):**
  1. Entre em `bitwarden.com` → **Criar conta**.
  2. Crie uma **senha-mestra** forte (uma frase de 4 a 5 palavras). **Anote em papel.** Se perder,
     ninguém recupera.
  3. Instale o app no celular e a extensão no navegador.
  4. Crie uma **pasta** com o nome do projeto. Todo login novo vai nela.
  5. Configurações → Segurança → **Login em duas etapas** → ative com app autenticador.
- ✅ **Me mande:** "cofre pronto".

## Passo 2 · App autenticador
- Instale **Google Authenticator** ou **Microsoft Authenticator** no celular (grátis).
- Serve para a verificação em 2 etapas de todas as contas.

---

# PARTE B · Contas do projeto (🧑, 1h30 a 2h)

> Ordem importa: o Gmail primeiro, porque ele é o "dono" de quase tudo.

## Passo 3 · Gmail do projeto
- **Por que:** vai ser o dono do canal do YouTube e das chaves do Google. Se vender o projeto, a
  conta vai junto.
- **Como fazer:**
  1. Abra uma **janela anônima**.
  2. `accounts.google.com/signup` → nome do projeto → data de nascimento (a sua) → endereço
     (ex.: `nomedoprojeto.studio@gmail.com`).
  3. Senha: gere no Bitwarden e salve na pasta do projeto. Telefone: o seu.
  4. `myaccount.google.com` → **Segurança** → **Verificação em duas etapas** → ativar com o autenticador.
- **Cuidado:** **não crie o canal do YouTube agora.** Ele nasce na Parte E, dentro do escritório.
- ✅ **Me mande:** o endereço do Gmail (só o endereço).

## Passo 4 · Chave do Gemini (assistir vídeos pelo link)
- **Por que:** o YouTube bloqueia download vindo de servidor. Com o Gemini, o vídeo é assistido pelo
  link. É a base da sala de Análise.
- **Como fazer:**
  1. Logado no Gmail do projeto: `aistudio.google.com/apikey`.
  2. Aceite os termos → **Criar chave de API**.
  3. Copie e salve no Bitwarden como "Gemini API".
- ✅ **Me mande:** "chave Gemini criada".

## Passo 5 · Chave da API do YouTube (dados do Radar)
- **Por que:** dados oficiais e grátis: views, data de criação do canal, inscritos, número de vídeos.
- **Como fazer:**
  1. Logado no Gmail do projeto: `console.cloud.google.com` → aceite os termos.
  2. Topo: **Selecionar projeto → Novo projeto** → nome do projeto → **Criar**.
  3. Menu ☰ → **APIs e serviços → Biblioteca** → busque **YouTube Data API v3** → **Ativar**.
  4. Menu ☰ → **APIs e serviços → Credenciais → + Criar credenciais → Chave de API**.
  5. Clique na chave → **Restrições de API → Restringir chave → só "YouTube Data API v3"** → **Salvar**.
  6. Salve no Bitwarden como "YouTube Data API".
- **Cuidado:** não precisa de cartão. Se pedir, me avise antes.
- ✅ **Me mande:** "chave YouTube criada".

## Passo 6 · Organização e repositório no GitHub
- **Por que:** o código do projeto numa organização própria. Facilita vender ou ter sócio.
- **Como fazer:**
  1. GitHub (seu usuário) → sua foto → **Your organizations** → **New organization** → **Free**.
  2. Nome: o do projeto. E-mail: o Gmail do projeto. "Belongs to": **My personal account**.
     **Next** → pule convites → **Complete setup**.
  3. Na organização: **Repositories → New repository** → nome `escritorio` → **Private** →
     marque **Add a README file** → **Create repository**.
- ✅ **Me mande:** o endereço do repositório.

## Passo 7 · App do Claude no repositório
- **Como fazer:** `github.com/apps/claude/installations/select_target` → escolha a **organização do
  projeto** → **Only select repositories** → o repositório do Passo 6 → **Install**.
- ✅ **Me mande:** "app instalado".

## Passo 8 · Equipe na Vercel (onde o escritório fica no ar)
- **Como fazer:** `vercel.com` → canto superior esquerdo (nome da equipe) → **Create Team** → nome do
  projeto → plano **Hobby**.
- **Cuidado:** pelo que sei, o Hobby é para uso **não comercial**. Na hora de vender, vira **Pro**
  (~US$ 20/mês por membro, confirmar). Para construir e testar, Hobby serve.
- ✅ **Me mande:** o nome da equipe.

## Passo 9 · Organização e banco no Supabase
- **Como fazer:**
  1. `supabase.com/dashboard` → menu de organizações → **New organization** → nome do projeto →
     **Personal** → **Free**.
  2. **New project** → nome `escritorio` → senha do banco: gere no Bitwarden e salve → região
     **South America (São Paulo)** → **Create new project**.
- **Cuidado:** pelo que sei, no Free o projeto pausa após 1 semana parado (dá para religar). Confirmar.
- ✅ **Me mande:** o nome da organização (a senha fica só no cofre).

## Passo 10b · Chave da IA de texto (o "cérebro" da fábrica)
- **Por que:** roteiro, análise e revisão rodam com uma chave PRÓPRIA do projeto, paga por uso e
  contada no Caixa. Assim não divide o limite da sua assinatura do Claude com nada.
- **Como fazer:** `console.anthropic.com` → criar conta com o Gmail do projeto → **Billing** →
  colocar crédito (ex.: US$ 5 para testar) → **API Keys → Create Key** → salvar no cofre/navegador.
- **Cuidado:** a chave vai só nos segredos do ambiente/banco, nunca no chat.
- ✅ **Me mande:** "chave IA criada".

## Passo 10 · Gerador de imagens: espaço só do projeto
- A fábrica precisa de um gerador **com API** (para rodar sozinha). Antes da D7 fazemos o teste lado
  a lado (Gravyx, Dreamina, Pollo…) e escolhemos. Enquanto isso, nada a criar.
- ✅ **Me mande:** o nome do workspace.

> Metricool, YouTube e redes sociais: **ainda não.** Ficam para a Parte E.

---

# PARTE C · Ambiente e 1ª sessão (🤖, você aprova telas)

## Passo 11 · Ambiente próprio no Claude Code
- 🤖 Eu peço um **ambiente novo** com o nome do projeto, só com o repositório do projeto e a rede
  necessária (YouTube e APIs do Google). **Aparece uma tela para você aprovar.**
- 🧑 Depois você salva as 2 chaves como **segredos do ambiente** (eu nunca vejo o valor):
  1. Na sessão: clique no nome do ambiente (barra de título) → **Edit** → **Network secrets**.
  2. Segredo 1: Host `generativelanguage.googleapis.com` · Header `x-goog-api-key` · Valor: chave
     do Gemini.
  3. Segredo 2: Host `www.googleapis.com` · Header `x-goog-api-key` · Valor: chave do YouTube.
  4. **Salvar.**
- ✅ **Me mande:** "segredos salvos".

## Passo 12 · 1ª sessão do projeto
- 🧑 Abra uma **sessão nova** nesse ambiente e escreva: **"COMEÇAR ESCRITÓRIO"**.
- 🤖 Eu monto a base do repositório:
  - `CLAUDE.md` do projeto: português, travas de aprovação, teto de gasto, regras de segurança;
  - `docs/` com o DOSSIE, CONTAS_E_CUSTOS, PESQUISA, REQUISITOS e este passo a passo;
  - as skills (11 do YouTube, análise de vídeo, modelagem);
  - o desenho do banco já para vários clientes.
- ✅ Você recebe um resumo e o link do PR para aprovar.

---

# PARTE D · Construir o escritório (🤖, você testa e aprova cada fase)

> Cada fase termina com algo que **você abre no celular e testa**. Só passo para a próxima depois do
> seu OK. "Pronto quando" = o critério para aprovar.

## D1 · Esqueleto no ar
- **Eu construo:** o site do escritório na Vercel; login (só você por enquanto); banco com a regra
  "cada conta só vê o que é dela"; o **mapa do escritório com as salas** (ainda vazias); botão
  "instalar no celular" e notificações.
- **Você testa:** entra pelo celular, instala na tela inicial, recebe uma notificação de teste.
- **Pronto quando:** abre no celular, faz login, vê o mapa e recebe a notificação.

## D2 · Recepção (o cadastro de canal)
- **Eu construo:** a entrevista em múltipla escolha (Passos 15 a 19 da Parte E) que gera a **ficha do
  canal**; dá para ter vários canais e trocar entre eles.
- **Você testa:** cria um "canal de teste" de mentira e edita a ficha.
- **Pronto quando:** cria, edita e apaga um canal de teste sem ajuda.

## D3 · Caixa (gasto, teto e horário)
- **Eu construo:** **reserva do custo estimado antes de cada tarefa** (sem saldo no teto, não
  começa); "Gasto do dia" por sala e por fornecedor; teto diário; cartão de teto batido
  **[+ US$ 2] [+ US$ 5] [+ US$ 10] [+ US$ ____]** valendo só no dia; horário de trabalho; registro
  de cada aprovação.
- **Você testa:** coloca um teto baixo, força o teto e aprova um extra.
- **Pronto quando:** a fábrica para no teto e volta só com a sua aprovação.

## D4 · Radar e Biblioteca
- **Eu construo:** as regras do Radar configuráveis (DOSSIE, seção 3): views em 24 h, vezes a média,
  canal novo, poucos vídeos, views ÷ inscritos, nota de "feito com IA" e "provavelmente monetizado"
  (sempre marcados como estimados); alertas 🔴 🟠 🟡; "foto" dos números de hora em hora dentro do
  horário; tudo guardado na Biblioteca.
- **Como roda:** as fotos de hora em hora rodam no agendador do próprio banco (Supabase), não na
  Vercel. Funil de 3 peneiras: números (grátis) → metadados → só os 10 melhores do dia vão para o
  Gemini. Cota do YouTube: ~6 mil/dia para o Radar, ~4 mil reservadas para publicar (a confirmar).
  Fotos por hora guardadas 7 dias, depois 1 por dia.
- **Você testa:** ajusta uma regra e vê os alertas mudarem.
- **Pronto quando:** em 2 a 3 dias a Biblioteca tem oportunidades reais, com alertas que fazem sentido.

## D5 · Análise e Modelagem
- **Eu construo:** campo "colar link de vídeo viral"; o Gemini assiste e desmonta a estrutura
  (gancho, ritmo, duração, thumb, título); a Modelagem gera o plano do nosso vídeo com conteúdo 100%
  nosso; checagem de originalidade.
- **Você testa:** cola 3 links e confere as estruturas.
- **Pronto quando:** a estrutura bate com o que você vê no vídeo.

## D6 · Sala do Dono e Reunião
- **Eu construo:** fila de aprovações (aprovar / ajustar com comentário); a reunião com a pauta
  (aprovações → o que vai ao ar → números → alertas → Radar → caixa → plano); **marcar a próxima
  reunião**; obrigatória 1 por semana (sem reunião em 7 dias: segura publicação e gasto extra).
- **Você testa:** faz uma reunião de teste e marca a próxima.
- **Pronto quando:** a reunião cabe em 15 a 20 min no celular.

## D7 · Produção
- **Eu construo:** salas de Roteiro, Narração (amostra de 10 s para aprovar), Arte, Montagem
  sincronizada pela fala, Thumbnail (2 ou 3 opções), Shorts cortados do vídeo; custo mostrado antes
  de cada geração cara.
- **Você testa:** produz 1 vídeo de teste (não publica).
- **Pronto quando:** sai um vídeo completo sem eu mexer à mão.

## D8 · Revisão de Potencial
- **Eu construo:** nota 0 a 100 com motivos para roteiro, vídeo e thumb, cruzando com a Biblioteca;
  reprova e devolve para a sala certa; checagem de público, áudio, duração e originalidade.
- **Pronto quando:** você concorda com as notas na maioria dos casos.

## D9 · Publicação
- **Eu construo:** conexão segura com o YouTube (login oficial do Google); antes de publicar, mostra o
  canal de destino; **Publicar agora / Agendar / Privado**; só marca publicado com o link do YouTube;
  chave única contra duplicata; mensagens de erro claras.
- **Antes desta fase:** criar um **canal de TESTE privado** no Gmail do projeto; confirmar as regras
  da API do YouTube (cota, auditoria, autorização que expira em 7 dias no modo teste, campo de
  conteúdo sintético). Até a auditoria do Google sair, o vídeo sobe **privado** e você libera no
  YouTube Studio com 1 clique.
- **Pronto quando:** publica um vídeo de teste como **privado** sem duplicar.

## D10 · Visual final e autonomia
- **Eu construo:** o escritório em pixel art (cada item é um personagem andando pelas salas); selos
  "🤖 automática" / "🧑 precisa de você"; níveis de autonomia 1-2-3; mensagens de erro em português.
- **Pronto quando:** você entende o que está acontecendo só olhando o escritório.

---

# PARTE E · Criar o canal DENTRO do escritório (🤝)

## Passo 13 · Regras do dono (na Recepção, 5 a 10 min)
| Pergunta | Exemplos |
|---|---|
| Orçamento máximo por mês | US$ 50 / 100 / 200 |
| Teto por dia | US$ 3 / 5 / 10 |
| Horário de trabalho | 08h às 22h / 24 h |
| Idioma e país | português-Brasil / inglês-EUA / espanhol |
| De onde vem o dinheiro | anúncios do YouTube / livro na Amazon / produto / afiliado / patrocínio |
| O que nunca fazer | rosto real / política / religião / conteúdo adulto… |
| 1ª reunião | dia e hora |
| Nível de autonomia | 1 (trava tudo) / 2 / 3 |

## Passo 14 · Descoberta de nicho (o Radar pesquisa 1 a 2 dias, você escolhe)
- 🤖 O Radar em modo exploração dá nota a cada nicho: demanda, concorrência, frequência de virais,
  canais novos crescendo, quanto paga por view (infantil paga menos), dá para fazer com IA, receitas
  extras, risco de regra.
- 🤖 Entrega o **top 3** com nota, exemplos e motivos.
- 🧑 Você escolhe 1.

## Passo 15 · Formato e referências
- 🤖 Formato vencedor (duração, ritmo, longo ou Shorts) e 5 a 10 canais de referência.
- 🧑 Confirma, troca ou acrescenta canais seus.

## Passo 16 · Identidade
- 🤖 3 nomes já conferidos (livres no YouTube, Instagram e domínio); 3 personagens (com o custo antes);
  2 ou 3 vozes; cores; regras de "nunca fazer".
- 🧑 Escolhe cada um.

## Passo 17 · Padrões de produção
- 🤖 Duração, vídeos e Shorts por semana, dias de publicação, nível de autonomia.
- 🧑 Confirma. **A ficha do canal está pronta.**

## Passo 18 · Criar o canal do YouTube (🧑, no Gmail do projeto)
1. Logado no Gmail do projeto: `youtube.com` → sua foto → **Criar um canal**.
2. Nome e @: os escolhidos no Passo 16. Foto e banner: os que eu entregar.
3. **YouTube Studio → Configurações → Canal → Configuração avançada → Público:** conforme o nicho
   (infantil: "Sim, é conteúdo para crianças").
4. **YouTube Studio → Configurações → Canal → Qualificação de recursos:** verifique o telefone
   (libera vídeos longos e thumb personalizada).
- ✅ **Me mande:** o link do canal.

## Passo 19 · Conectar o canal ao escritório
- No escritório: **Canal → Conectar YouTube** → login oficial do Google com o Gmail do projeto →
  **Permitir**. O escritório mostra a foto e o nome do canal conectado.

## Passo 20 · Redes sociais (opcional, quando quiser)
- Instagram, TikTok e página do Facebook com o mesmo nome e @ (eu mando bio e foto).
- Agendamento: Metricool com uma **marca só do projeto** (confirmar se o plano aceita) ou publicação
  direta pelo escritório numa fase futura.

## Passo 21 · 1º vídeo pela esteira (nível 1)
- O Estrategista monta a pauta a partir da Biblioteca → Roteiro → **você aprova** → Arte, Narração,
  Montagem → Revisão de Potencial → **você aprova vídeo e thumb** → Publicação (você escolhe agora,
  agendar ou privado).

---

# PARTE F · Rotina com o canal rodando

- **Reunião (15 a 20 min):** aprovações → o que vai ao ar → números (cada um com a base dita) →
  alertas → Radar → caixa → plano → **marcar a próxima**.
- **Obrigatória 1 por semana.** Sem reunião em 7 dias: segura publicação e gasto extra.
- **Teto batido:** notificação no celular → cartão → aprovar + US$ X (só no dia) ou deixar parado.
- **A cada ~10 vídeos aprovados sem ajuste:** o escritório sugere subir o nível de autonomia.

---

# PARTE G · Antes de vender

- Seguir `REQUISITOS_PRONTO_PARA_VENDER.md`: tudo testado no nosso canal, depois teste fechado com 5
  a 10 pessoas de fora, só então vender.

---

# Checklist

**Parte A e B (você)**
- [ ] 1 Cofre de senhas
- [ ] 2 Autenticador
- [ ] 3 Gmail do projeto + 2 etapas
- [ ] 4 Chave Gemini
- [ ] 5 Chave YouTube Data API
- [ ] 6 Organização + repositório no GitHub
- [ ] 7 App do Claude no repositório
- [ ] 8 Equipe na Vercel
- [ ] 9 Organização + banco no Supabase (São Paulo)
- [ ] 10 Workspace do gerador de imagens

**Parte C**
- [ ] 11 Ambiente + 2 segredos
- [ ] 12 1ª sessão "COMEÇAR ESCRITÓRIO"

**Parte D (escritório)**
- [ ] D1 Esqueleto · [ ] D2 Recepção · [ ] D3 Caixa · [ ] D4 Radar · [ ] D5 Análise/Modelagem
- [ ] D6 Sala do Dono/Reunião · [ ] D7 Produção · [ ] D8 Revisão · [ ] D9 Publicação · [ ] D10 Visual

**Parte E (canal)**
- [ ] 13 Regras · [ ] 14 Nicho · [ ] 15 Formato · [ ] 16 Identidade · [ ] 17 Padrões
- [ ] 18 Canal no YouTube · [ ] 19 Conectar · [ ] 20 Redes · [ ] 21 1º vídeo
