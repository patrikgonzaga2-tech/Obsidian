---
type: referencia
title: "Comunidade - app pronto para teste (08-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, app, supabase, auditoria]
keywords: [app corpo feliz, teste, 100 alunas, supabase, plano gratis, laura ia, fotos, egress, greenn, area de membros]
created: 2026-11-08
updated: 2026-11-08
summary: "Revisão do App Corpo Feliz para liberar 100 alunas de teste: o que entrega, bugs, banco, custos, riscos e o plano de indicar os treinos da Greenn."
---

# App Corpo Feliz: pronto para 100 alunas de teste? (08/11/2026)

Projeto: [[Corpo Feliz - Comunidade]] · Fontes: código da `main` (LR_LauraRosaPersonal), banco "Projeto Corpo Feliz" (só leitura),
erros da Vercel (7 dias), docs do Supabase, teste de carga de 04/11 (`docs/BANCO_CONEXOES.md`). Estimativas marcadas como estimativa.

## Resposta curta
Funciona e aguenta 100 alunas (teste de carga de 04/11: 300 ao mesmo tempo, 0 erro, tela em ~0,5 s).
Antes de liberar: corrigir 2 bugs (Laura IA cortando resposta e Plano B), cadastrar os treinos da Greenn,
pôr o link certo da área de membros e passar o Supabase para o Pro (o plano grátis põe vendas, quiz e painel em risco, não só o app).

## O que o app entrega hoje (laurarosapersonal.com/app, no ar desde 03/11)
- Entrar com e-mail + código (Brevo). Primeiro acesso: nome, aceite LGPD e "Meu plano" (objetivo, tempo, onde treina, ritmo, cuidados, ciclo).
- **Hoje:** check-in (humor, energia, sintomas) com dica, treino do dia, próximo passo, 5 hábitos, Plano B, anotação do dia.
- **Treinar:** aulas por tempo ou por programa, "para você" × "precisa de aparelho", Concluí, Adaptar, Assistir na TV, botão da área de membros.
- **Laura IA:** chat escrito, 15 perguntas/dia, pergunta de risco vira alerta no painel; cérebro editável pela Laura.
- **Musas:** bate-papo por canais (foto, apagar, denunciar), check-in com foto (1/dia), ranking do mês com prêmios.
- **Eu:** calendário do mês, ciclo/menopausa, Espelho (medidas e fotos só dela), semana, lembrete 8h, baixar/excluir dados.
- **Painéis:** `/painel/app/comunidade` (equipe: moderação, alunas liberadas, aulas) e `/app-admin` (Laura: postar, responder, cérebro).

## Situação em 08/11 (banco)
- 3 contas, 2 perfis, 2 e-mails liberados, 2 perguntas à IA, 0 foto, 0 mensagem. 5 aulas ("Treinos de Novembro", 28–37 min, vídeo no Bunny).
- Tabelas do app: 424 kB. Tudo fica no mesmo banco das vendas/quiz/painel.

## Bugs e ajustes (ordem de prioridade)
1. **Laura IA corta a resposta** (conferido): das 2 respostas, 1 parou no meio ("…e treine sem dor. Hoje"), com 700 tokens de saída = o limite.
   O modelo pensa antes de responder e o pensamento gasta o limite de 700. Corrigir: subir o limite e baixar o esforço do raciocínio (`lib/app-cf/ia.ts`).
2. **Laura IA estourou 60 s** uma vez (07/11): o código espera até 40 s e tenta de novo (até ~80 s), mas a rota corta em 60 s. Ajustar os tempos.
3. **Plano B**: qualquer Plano B (até "uma refeição") força treino de 5 min; o botão diz 10 min; sem aula curta, aparece aula de 28 min como "treino curto". Patrik decide 5 ou 10.
4. **Treino do dia não respeita o tempo dela**: quem disse "3 a 5 min" ou "10 min" recebe aula de 28 min (só há aulas longas). Some com o catálogo da Greenn com treinos curtos.
5. ~~Link da área de membros genérico~~ (corrigido: app.greenn.club/home): `AREA_MEMBROS_URL = 'https://greenn.club'` (`lib/app-cf/config.ts`). Precisa do link certo da área da Comunidade.
6. **Abrir aula da Greenn no iPhone** (risco, não conferido): o app abre o link depois de consultar o servidor; o Safari pode bloquear essa janela. Testar no iPhone antes; se bloquear, abrir o link direto no toque.

## Banco, fotos e custos
| Item | Hoje | Com 100 alunas | Fonte |
|---|---|---|---|
| Plano do Supabase | **grátis** | — | conta (get_organization) |
| Banco (limite grátis 500 MB → fica só leitura) | 323 MB | app soma pouco; quiz/vendas crescem ~10 MB/mês hoje | banco + docs Supabase |
| Armazenamento de arquivos (grátis 1 GB) | 336 MB (327 MB são vídeos do bucket `videos`) | fotos de check-in: estimativa 250 kB cada; 1.500/mês ≈ 375 MB/mês | estimativa |
| Tráfego de saída (grátis 5 GB + 5 GB em cache/mês) | não medido | mural mostra até 30 fotos em tamanho cheio: pode passar de 5 GB no mês | estimativa |
| Backup automático | não tem no grátis | — | docs Supabase (Pro tem) |
| Laura IA (Sonnet 5.5: US$ 2 entrada / US$ 10 saída por milhão de tokens) | 2 perguntas | ~US$ 0,01 por pergunta → 1/dia por aluna ≈ US$ 30/mês; teto 15/dia ≈ US$ 450/mês | preço oficial + estimativa |
| E-mail de login | Brevo; Supabase limita 100 e-mails/hora | liberar em levas (ex.: 30 por hora) | `docs/APP_CORPO_FELIZ.md` |
| Carga | 300 simultâneas sem erro | ok | teste de 04/11 |

**Risco maior:** se o plano grátis passar do limite (banco ou tráfego), o Supabase restringe **o projeto inteiro** (só leitura ou pausa):
webhook da Greenn, quiz, painel e app param juntos. Recomendado: **Supabase Pro (US$ 25/mês)** antes das 100 (backup, 8 GB, 250 GB de tráfego).
Opcional: mural com miniatura em vez da foto cheia (corta o tráfego).

## Plano: o app diz o treino, a aluna faz na Greenn
Como funciona (o código já suporta): cada treino vira uma linha em `app_cf_aulas` com o **nome exato "Módulo › Aula"**,
minutos, casa/academia, aparelhos, nível, foco, cuidados e o **link da Greenn**. O app escolhe o treino do dia e o botão vira
"Assistir na área de membros". Ela volta e toca **Concluí** (conta no ranking).

**Prós**
- Nenhum vídeo novo: usa o que já existe; custo zero de vídeo e de armazenamento.
- Ela recebe "o que fazer hoje" pronto (tempo, local, cuidados, fase do ciclo), que é a promessa "parar de recomeçar".
- Dá para começar já com 100 alunas; trocar para vídeo dentro do app depois só muda o cadastro.

**Problemas**
- **Duas portas:** sai do app e entra na Greenn (outro login). A Greenn é ~22% do suporte hoje ("acesso e login", relatório anterior).
- **Link direto da aula:** não conferido se a Greenn tem link fixo por aula; sem isso, ela cai na área e procura pelo nome.
- **Nome muda na Greenn = app fica errado.** Alguém precisa avisar quando renomear/mover aula.
- **"Concluí" é na confiança:** o app não sabe se ela assistiu.
- **iPhone pode bloquear a janela** (item 6 acima).
- **Acesso na Greenn:** quem é liberada só no app (teste) precisa ter acesso à área de membros da Comunidade, senão o link não abre.

## Atualização 08/11 (tarde): corrigido no PR #367 (aguarda OK para mesclar)
- Laura IA: sem corte (limite 2000 + esforço baixo), cabe nos 60 s, manda cancelamento/reembolso para o suporte (o app não tem cancelar),
  explica o acesso: https://app.greenn.club/home, mesmo e-mail da compra, "esqueci a senha".
- Link da área de membros: https://app.greenn.club/home (Patrik: abre direto o acesso que ela tem).
- Plano B de comida não troca mais o treino; minutos do treino curto (5 ou 10) saem do mapa da área de membros.
- Aula da Greenn abre no iPhone (janela aberta no toque). Testado no Chromium; falta o iPhone de verdade.

## O que fazer (checklist)
1. Claude Desktop monta a pasta da área de membros no Obsidian ([[Prompt - Claude Desktop - área de membros da Comunidade]]).
2. Claude cadastra os treinos no app a partir dessa pasta (nada inventado) e põe o link certo da área.
3. Corrigir Laura IA (corte e 60 s) e Plano B (Patrik escolhe 5 ou 10).
4. Supabase Pro (Patrik, cartão) antes de liberar as 100.
5. Testar com a equipe no iPhone e no Android: entrar, Concluí, abrir aula da Greenn, foto, IA.
6. Liberar as alunas em levas pelo painel (Alunas liberadas sem compra), conferindo que elas têm acesso à área da Comunidade na Greenn.
7. Combinar quem modera o bate-papo e responde os alertas da Laura IA.
