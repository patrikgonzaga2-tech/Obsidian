# Fábrica de Conteúdo IA · Revisão de falhas ("e se já estivesse pronto?")

Revisão de 15/11/2026 do desenho inteiro (DOSSIE, PASSO_A_PASSO, CONTAS, REQUISITOS), simulando o
escritório rodando. Cada falha tem: o problema, o que aconteceria e a correção (já aplicada no plano).
"A confirmar" = depende de regra de terceiros que não consegui abrir na fonte oficial.

## 🔴 Falhas graves (o sistema não funcionaria como desenhado)

### F1 · O alerta viral 🔴 nunca dispararia
- **Problema:** a regra exigia "provavelmente monetizado" com 3 de 3 sinais, mas o 3º sinal (anúncio
  nos vídeos) não dá para checar de um servidor.
- **Aconteceria:** zero alertas 🔴, para sempre.
- **Correção:** monetização vira **bônus de pontos**, não exigência. 🔴 = canal com ≤ 5 vídeos +
  vídeo ≥ 1 mi + ≥ 1.000 inscritos. "Provavelmente monetizado" aparece como etiqueta.

### F2 · O "cérebro" da fábrica estava sem dono e sem custo
- **Problema:** roteiro, análise e revisão precisam de uma IA de texto. O plano não dizia qual nem
  quanto custa. Se rodasse em sessões do Claude na sua assinatura, **dividiria o limite de uso com
  todo o seu outro trabalho** e não entraria no Caixa.
- **Correção:** a fábrica usa **chave de API própria do projeto** (Anthropic e/ou Gemini), paga por
  uso, contada no Caixa e no teto. Eu (nas sessões) só construo e conserto; quem roda é a fábrica.
  Conta nova entra na lista (Passo B-extra).

### F3 · A coleta de hora em hora não teria quem rodasse
- **Problema:** a Vercel no plano grátis, pelo que sei, só agenda tarefa 1 vez por dia (a confirmar).
- **Correção:** as tarefas repetidas (fotos de hora em hora do Radar, fila da esteira) rodam **no
  próprio banco (Supabase: agendador + funções)**, que permite de hora em hora no plano grátis. A
  Vercel só mostra o escritório.

### F4 · O gerador de imagens via conector só funciona dentro de uma conversa comigo
- **Problema:** o Gravyx está ligado a mim por conector, não sei se tem API para a fábrica chamar
  sozinha às 3h da manhã.
- **Correção:** a sala de Arte usa um **fornecedor com API** (a escolher no teste lado a lado; o
  Pollo tem API, o Gravyx a confirmar). Até lá, a Arte trava pedindo "gerar" na reunião.

### F5 · A fase de Publicação (D9) não teria canal para testar
- **Problema:** o canal só nascia na Parte E, depois de todo o escritório.
- **Correção:** criar um **canal de teste privado** no Gmail do projeto antes da D9. O canal de
  verdade continua nascendo na Parte E.

### F6 · Conexão com o YouTube cairia toda semana (a confirmar)
- **Problema:** pelo que sei, app do Google em modo "teste" tem autorização que expira em 7 dias, e
  app não verificado sobe vídeo travado como privado até passar por auditoria.
- **Aconteceria:** toda semana pedindo para reconectar; "Publicar agora" não funcionaria.
- **Correção:** conferir na D9; no começo, publicar como **privado e você libera no YouTube Studio**
  (1 clique) até a auditoria sair. Pedir a verificação do app cedo.

## 🟠 Falhas médias (funcionaria, mas com prejuízo)

### F7 · O teto de gasto seria estourado
- **Problema:** geração de vídeo cobra depois; o Caixa só saberia o gasto após o fato.
- **Correção:** **reserva antes de gerar**: cada tarefa reserva o custo estimado; sem saldo no teto,
  não começa.

### F8 · A cota da API do YouTube acabaria cedo (a confirmar)
- **Problema:** pelo que sei: ~10 mil unidades/dia; cada busca custa 100; subir vídeo ~1.600.
- **Correção:** orçamento de cota: Radar até ~6 mil/dia (≈ 50 buscas + milhares de leituras
  baratas), **~4 mil reservadas para publicar**. Buscas inteligentes, leituras em lote.

### F9 · A análise de IA nos vídeos custaria caro em escala
- **Problema:** passar todo vídeo achado pelo Gemini (e detector de IA) estoura o teto.
- **Correção:** **funil de 3 peneiras**: 1) só números (grátis) → 2) só os 🔴/🟠 ganham leitura de
  metadados → 3) só os 10 melhores do dia vão para o Gemini, assistindo só os 2 primeiros minutos e
  amostras. Limites do Gemini para vídeo do YouTube: a confirmar.

### F10 · Regras se contradizendo
- **Problema:** "sem reunião em 7 dias segura publicação" × "nível 3: Shorts saem sozinhos".
- **Correção:** ordem de prioridade fixa: **1) trava de segurança/direitos → 2) teto de gasto →
  3) regra dos 7 dias → 4) nível de autonomia.** A de cima sempre vence.

### F11 · Notificação no iPhone
- **Problema:** aviso por "app instalado do site" no iPhone só funciona se adicionar à Tela de Início
  (iOS 16.4 ou mais novo, pelo que sei). No Android funciona direto.
- **Correção:** D1 testa no seu celular. Se falhar, aviso de reserva por **e-mail do Gmail do projeto**.

### F12 · O banco grátis encheria
- **Problema:** foto de hora em hora de milhares de vídeos cresce rápido (limite do plano grátis).
- **Correção:** guardar fotos por hora só por 7 dias; depois, 1 por dia; apagar o que nunca virou
  oportunidade após 30 dias.

## 🟡 Pontos de atenção (não quebram, mas precisam de decisão)

- **Vercel grátis é "não comercial"** (pelo que sei): enquanto for só construção e teste, ok; com o
  canal faturando, avaliar o Pro.
- **Canal infantil:** sem notificação para inscritos, cresce só por recomendação; RPM menor. Já está
  na nota de nicho.
- **Hypit:** uso interno ok; no SaaS precisa de licença ou motor próprio.
- **Custos que faltavam na tabela:** API de IA de texto (Anthropic/Gemini) e Gemini pago se passar do
  grátis. Adicionados em CONTAS_E_CUSTOS.

## Sobre cofre de senhas e autenticador (pergunta do Patrik)

- **Dá para deixar para depois, sim.** Para rodar o teste: salve as senhas no gerenciador do próprio
  navegador e use a verificação em 2 etapas por **SMS** no Gmail do projeto.
- **Não dá para pular:** antes de **criar o canal de verdade** (Parte E) e antes de **qualquer
  dinheiro** passar pelo projeto, ativar autenticador e organizar as senhas. Motivo: quem perde o
  Gmail perde o canal, e recuperar conta do Google sem 2ª etapa forte pode levar semanas.
- O plano agora pede **cada conta só quando a fase precisar** (seção "Caminho rápido" do passo a passo).
