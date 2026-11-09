---
type: decisao
title: "Site - check de segurança pré-lançamento (09-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, seguranca, site, painel, app]
keywords: [segurança, check pré-lançamento, senha do painel, rate limit, rls, supabase, meta-insights, cabeçalhos, csp, next.js]
created: 2026-11-09
updated: 2026-11-09
summary: "Auditoria de 20 checagens no laurarosapersonal.com: nota 68 → 93/100. PR #389 no ar e passos do Supabase feitos em 09/11. Faltam a CSP para valer e os itens de pagamento, que esperam OK do Patrik."
---

# Site: check de segurança pré-lançamento (09/11)

Projeto: [[Corpo Feliz - Comunidade]] (vale para todo o laurarosapersonal.com: site, App Corpo Feliz e painéis)

## Contexto
Skill `check-pre-lancamento` (20 checagens) rodada no repo LR_LauraRosaPersonal, nos dois domínios (laurarosapersonal.com e agenciaptk.com.br, só testes passivos) e no banco Supabase (só leitura). Nota inicial **68/100**.

O que já estava bom:
- Nenhuma chave secreta no código nem no histórico.
- As 37 tabelas com RLS fechado.
- Todas as rotas do App e dos painéis conferem login no servidor.
- Upload de fotos bem feito.

O que pedia ação:
- Funções da Meta abertas para a chave pública do site.
- Senha do painel guardada no próprio cookie, sem limite de tentativas.
- Next.js 16.2.0 com falhas conhecidas.
- Sem cabeçalhos de segurança.

## Decisão (Patrik, 09/11)
- **Painel:** "senha única reforçada". Segue uma senha para a equipe, mas com sessão assinada e limite de tentativas. Login individual por e-mail fica para quando a equipe crescer.
- **Rate limit:** contador numa tabela do Supabase (`limites`), sem conta nova no Upstash.
- **Dados de venda** (CPF e corpo bruto dos webhooks): ficam para depois. Mexer nos webhooks só com OK no antes/depois (regra de pagamento).
- "pode aplicar as correções" → "pode mesclar". PR patrikgonzaga2-tech/LR_LauraRosaPersonal#389 mesclado (squash) e no ar em 09/11. Nota com as correções: **93/100**.

## O que mudou no ar
- **Dependências:** Next 16.4.5 e Dependabot.
- **Painel:** cookie com sessão assinada (não é mais a senha); 5 tentativas a cada 15 min por IP.
- **Laura IA:** cota diária que não fura com envios em paralelo.
- **Fotos de progresso:** até 10 por dia.
- **App:** admin só com e-mail confirmado.
- **WhatsApp do painel:** só dispara em POST.
- **Link da Laura:** não deriva mais só da senha. O link mudou: mandar o novo para ela.
- **Site:** cabeçalhos de segurança (CSP ainda em modo de aviso); `/api/quiz` validado; erros internos só no log.

## Feito no Supabase (09/11, à noite)
- Segredo `META_CRON_SECRET` no Vault e nas Edge Functions; os 3 crons do Meta mandam `x-cron-secret`.
- `meta-insights` (v27) e `meta-insights-site` (v5) publicadas: a chave pública leva 403, o cron passa (200). O cron das 21h23 UTC gravou normal.
- Tabela `limites` e a faxina diária ligadas.
- Segredo dos crons de WhatsApp tirado do texto do cron e guardado no Vault.
- `meta-debug` apagada (Patrik).

## Pendências (com o Patrik)
- Depois de 1-2 semanas, ligar a CSP para valer.
- Esperam OK (pagamento): limite e validação em `/api/upsell` e `/api/checkout-clique`, anti-iframe nas páginas pós-compra, CPF e `raw` nos webhooks.
- A conta 21D (1871186300120064) está sem gasto desde a madrugada de 09/11: por isso os números dela não mudam (não é efeito do check).

## Alternativas descartadas
- **Sessão em tabela no banco:** trocada por cookie assinado (HMAC), para não travar o painel se o SQL não estivesse aplicado no deploy.
- **Turnstile (anti-robô) agora:** precisa de conta Cloudflare e de ligar o CAPTCHA no Supabase. O limite de tentativas já cobre o login.
- **Bloquear troca de dona da inscrição de push:** quebraria celular compartilhado, e o ataque exige um endereço aleatório que só o aparelho conhece.
