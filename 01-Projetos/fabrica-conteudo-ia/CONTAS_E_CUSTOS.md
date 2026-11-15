# Fábrica de Conteúdo IA · Contas, conexões, assinaturas e custos

Atualizado em 15/11/2026. Preços marcados "a confirmar" vieram de memória ou de sites de comparação,
não da página oficial. Conferir antes de assinar.

## Regra de senhas
- **Senha nunca vai no chat, no GitHub nem em arquivo.** Usar um gerenciador de senhas com um cofre só
  do projeto (ex.: Bitwarden, plano grátis) e ativar verificação em 2 etapas em tudo.
- Chaves de API vão em: segredos do ambiente do Claude Code (rede), variáveis da Vercel ou do
  Supabase. Nunca no código.

## A. Contas do projeto (o dono cria)

| # | Conta | Para quê | Custo para começar | Custo no SaaS |
|---|---|---|---|---|
| 1 | **Conta Google nova** | dona do canal do YouTube, Gemini, YouTube Data API, Google Cloud | grátis | grátis + uso |
| 2 | **Organização no GitHub** + 1 repositório | código do projeto numa organização própria | grátis | grátis ou Team (a confirmar) |
| 3 | App do Claude instalado na organização | eu trabalhar no repositório | grátis | — |
| 4 | **Equipe na Vercel** | painel/escritório no ar | Hobby grátis (**uso não comercial**, a confirmar) | Pro ~US$ 20/mês por membro (a confirmar) |
| 5 | **Organização no Supabase** | banco de dados | Free grátis (pausa se ficar parado, a confirmar) | Pro ~US$ 25/mês (a confirmar) |
| 6 | Gravyx: conta separada ou workspace só do projeto | imagens, thumbs, narração | já assinado (Starter, 10.000 tokens); conta nova: preço a confirmar | substituir por API direta |
| 7 | Metricool: marca nova (ou conta nova) | agendar nas redes | a confirmar se o plano atual aceita 2ª marca | API de publicação própria |
| 7b | **Chave de API da IA de texto** (Anthropic e/ou Gemini) | o "cérebro" da fábrica, pago por uso e contado no Caixa | crédito inicial ~US$ 5 (por uso) | por uso, repassado no preço |
| 8 | Notificações | aviso da reunião e alertas 🔴 pelo próprio escritório instalado no celular (sem conta extra) | grátis | grátis |
| 9 | Gerenciador de senhas (cofre do projeto) | guardar logins | grátis | grátis |
| 10 | *(depois)* Domínio | endereço do SaaS | .com.br ~R$ 40/ano (a confirmar) | idem |
| 11 | *(depois)* Amazon KDP | livro de colorir | grátis (Amazon fica com parte da venda) | — |
| 12 | *(depois)* Canal do YouTube + redes | só após a Recepção escolher nicho e nome | grátis | — |
| 13 | *(se for vender)* CNPJ próprio | faturar separado | falar com o contador | — |

## B. Chaves e segredos (onde cada um vai)

| Segredo | Onde guardar |
|---|---|
| Chave do Gemini (conta Google nova) | segredo de rede do ambiente novo: host `generativelanguage.googleapis.com`, header `x-goog-api-key` |
| Chave da YouTube Data API | segredo do ambiente novo (host `www.googleapis.com`) |
| OAuth do Google para publicar no YouTube | variáveis da Vercel (fase de publicação automática) |
| URL e chaves do Supabase | variáveis da Vercel |

## C. Conexões no Claude

| Conexão | Situação | O que fazer |
|---|---|---|
| GitHub | instalado só nos seus repositórios atuais | instalar na organização nova |
| Supabase | conectado às organizações atuais | conectar a organização nova; nas sessões do projeto, usar só ela |
| Vercel | conectado à equipe atual | conectar a equipe nova |
| Gravyx | conta atual | criar workspace do projeto; perguntar o workspace antes de gerar |
| Metricool | só depois do canal criado | criar uma marca só do projeto (ou conta nova) |
| Ambiente do Claude Code | hoje tudo roda no "Default" | criar ambiente próprio do projeto, só com o repositório novo |

As conexões do claude.ai são da sua conta inteira; a separação vem de usar sempre a organização,
equipe e workspace do projeto.

## D. Ferramentas opcionais

| Ferramenta | Uso | Preço |
|---|---|---|
| Dreamina (CapCut) | imagem e vídeo à mão (Seedream/Seedance) | US$ 0,29 no 1º mês (promo de 21/10, pode ter acabado, EUA) e depois US$ 15/mês; licença comercial e API oficial não confirmadas |
| Hypit | modelagem de estrutura (uso interno) | grátis + modelos por uso (exemplos oficiais: US$ 1,07 a 1,15 por vídeo de ~20 s com 3 variações) |
| Pollo.ai | vídeo animado, tem API | ~US$ 15 a 29/mês (sites de comparação) |
| CloneCut | recriar vídeo | US$ 9,90 a 29/mês (fontes divergem); o Hypit cobre |
| Color Koala | páginas de colorir | não encontrado; pedir o link |

## E. Gasto aproximado

| Fase | Fixo por mês | Variável |
|---|---|---|
| Construção + 1º canal (planos grátis) | **R$ 0 a mais** (usa Claude e Gravyx que já existem) | teto diário escolhido (ex.: US$ 3/dia = até ~US$ 90/mês) |
| + ferramentas opcionais | + US$ 15 a 30 por ferramenta | — |
| SaaS no ar | ~US$ 45/mês (Vercel Pro + Supabase Pro, a confirmar) + domínio | API da Anthropic, geradores e Gemini por uso, repassados no preço |
