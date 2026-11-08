---
type: projeto
title: "Corpo Feliz - Comunidade"
project: "Corpo Feliz - Comunidade"
tags: [tipo/projeto, projeto/corpo-feliz-comunidade, laura-rosa]
keywords: [comunidade, assinatura, laura, corpo feliz, quiz, vsl, recomeçar, movimento, app, gravyx]
created: 2026-11-08
updated: 2026-11-08
summary: "Venda da assinatura da Comunidade Corpo Feliz (Laüra Rosa) com a promessa 'parar de recomeçar': quiz, página de VSL, app e anúncios."
---

# Corpo Feliz - Comunidade (assinatura)

**Leia isto primeiro em qualquer conversa nova sobre a Comunidade.** Esta nota é o ponto de partida; os detalhes ficam nas notas da pasta `01-Projetos/Corpo Feliz - Comunidade/`.

## Regras que valem sempre
- **Nunca inventar nada.** Todo número tem fonte e data; se não deu para conferir, escrever "não conferido".
- Repositório do site: `patrikgonzaga2-tech/LR_LauraRosaPersonal`. Siga o `CLAUDE.md` de lá (pt-BR; pagamento/checkout/preço/oferta só com OK explícito do Patrik; mesclar só depois do OK; toda página nova entra no painel oficial `app/paineloficialcorpofeliz/_dados.ts` no mesmo PR).
- Banco "Projeto Corpo Feliz" (`fjlbvoephhextnxemygf`): **só leitura**.
- Nada de nome, telefone ou dado de saúde de aluna em arquivo, nota ou grupo.
- Marca: sem quilos, sem prazo de resultado, sem promessa médica, sem antes e depois, sem nome de remédio (Ozempic/Mounjaro), sem "canetinha" em anúncio.
- Meta: não afirmar característica pessoal de quem vê ("você tem diástase") — usar pergunta.
- Concorrente (Movimento Emagreça): **modelar, não copiar**. Não usar vídeo, texto ou anúncio dele.
- Tudo que for decidido, criado ou descoberto entra no Obsidian (ver [[Preferências Gerais]]).

## Decisão (08/11/2026)
Aprovada pelo Patrik: [[Comunidade - promessa parar de recomeçar]].
- Principal: **"Você não precisa de mais um treino. Precisa parar de recomeçar."**
- Testes: "O treino que acompanha a sua fase" e "Joelho, lombar ou diástase te fazem parar?"
- Formato: anúncio com a Laüra → quiz → resultado + VSL → oferta da assinatura → botão de WhatsApp (0948) para quem não comprou.
- Preço: 3 braços (?o=1 anual, ?o=2 mensal, ?o=3 teste 30 dias). **Valores e links da Greenn: só o Patrik define.**

## Status (atualizar a cada etapa, sem virar diário)
| # | Etapa | Status | Onde |
|---|---|---|---|
| 1 | Roteiro da VSL (áudio da Laüra) | pronto, enviado ao Patrik | [[Comunidade - roteiro da VSL da Laura]] |
| 2 | Página de VSL `/comunidade` (modelo da página do Movimento, copy nossa) | PR rascunho aberto, aguarda OK | PR patrikgonzaga2-tech/LR_LauraRosaPersonal#365, branch `claude/comunidade-vsl-quiz` |
| 3 | Quiz numa rota nova | a fazer | [[Comunidade - quiz tela a tela]] |
| 4 | App: teste com 100 alunas (treino do dia apontando para a Greenn) | correções no PR #367 (Laura IA, link app.greenn.club/home, Plano B, iPhone), aguarda OK para mesclar; falta: mapa da área de membros (Claude Desktop), cadastrar treinos, minutos do Plano B, Supabase Pro | [[Comunidade - app pronto para teste (08-11)]] · PR patrikgonzaga2-tech/LR_LauraRosaPersonal#367 |
| 5 | Anúncios (3 imagens + 3 vídeos) via Gravyx | a fazer, avisar custo antes | [[Comunidade - concorrentes]] |
| 5b | Vídeo nosso no estilo do Movimento com o áudio da Laüra | a fazer, depende do áudio | skill `video-laura`, agente `editor-video` |
| 6 | Campanha pausada no padrão 3.2 | a fazer, ativar só com OK | `docs/ANALISE_CAMPANHAS_QUIZ.md` §3.2 |

## Página `/comunidade` (etapa 2)
- Arquivo `app/comunidade/page.tsx`. `CHECKOUT_URL = ''` (botão desligado) e `VSL_SRC = ''` (espaço "Vídeo da Laüra (em gravação)") até o Patrik mandar.
- Visita conta como slug `comunidade-vsl` (upsell_views). Fora do Google (noindex).
- Prévia da Vercel (pede login na Vercel): https://efeito-lipo-21-git-claude-0b9eda-patrikgonzaga2-2372s-projects.vercel.app/comunidade

## App (etapa 4)
- `lib/app-cf/servidor.ts`: `PRODUTOS_LIBERADOS` está vazio → quem paga não entra no app sozinho. Preencher com os produtos novos da Greenn (depois do OK).
- Plano B: 5 min no código, "Só 10 minutos de movimento" no botão (`lib/app-cf/config.ts`). Alinhar.
- Só 5 aulas carregadas ("Treinos de Novembro", 28 a 37 min). Faltam as curtas (3, 5, 10, 15 min). Ideia do Patrik: nomear as aulas com o nome do vídeo da área de membros para ela achar lá. **Precisa da lista de vídeos.**
- Doc do app no repositório: `docs/APP_CORPO_FELIZ.md`. Seção "Assinantes novas da Comunidade (08/11)" com prints no celular.
- Achado (08/11): `compras_aprovadas.produto` é o nome do catálogo, não o código da Greenn. Os 6 nomes da Comunidade viram "Comunidade Corpo Feliz": pôr esse nome em `PRODUTOS_LIBERADOS` liberaria os 660 e-mails que já compraram, inclusive quem cancelou. O código fica em `vendas.product_id` e `assinaturas.product_id` (`assinaturas` tem status e `current_period_end`).
- Hoje, com Plano B, o app mostra "PLANO B: TREINO CURTO" com aula de 28 min (não há aula curta).

## O que falta para vender (app, 08/11)
1. Produto/oferta na Greenn (Patrik, OK explícito).
2. Botão de compra: `CHECKOUT_URL` e vídeo `VSL_SRC` vazios em `/comunidade` na `main`.
3. Entrada automática no app: `PRODUTOS_LIBERADOS` vazio; regra a decidir (código do produto; só compra ou assinatura em dia).
4. Aviso pós-compra com o link do app: nada manda hoje (conferido no código).
Entrega dos vídeos no app: decidir depois (Patrik, 08/11).
Decisões de 08/11 (mensal WOqOSI, acesso só assinatura nova em dia, e-mail + vídeo): [[Comunidade - venda do mensal e acesso ao app]]. Antes/depois mostrado ao Patrik; aguarda OK.

## O que a Comunidade entrega (fonte oficial)
`hostinger/black-comunidade/dados/conteudo.json` (página da Black, 31/10): app com treinos em casa ou academia com vídeo de cada exercício, treinos hormonais, treinos de 3 e 5 minutos "pros dias impossíveis"; plano alimentar flexível; a Profe Laüra e o time no WhatsApp; Grupo das Musas; módulo de LPF/diástase com professora especializada; mobilidade; desafio todo mês; garantia de 7 dias. WhatsApp oficial (37) 6000-0948.

## Pendências do Patrik
- Ofertas, preços, renovação/cancelamento e links da Greenn (OK explícito).
- Rodar antes ou depois da Black (vagas abrem 12/11).
- Laüra gravar o áudio da VSL hoje.
- Rodar no Claude Desktop o [[Prompt - Claude Desktop - área de membros da Comunidade]] (mapa da área de membros para o app).
- Supabase Pro (US$ 25/mês) antes de liberar as 100 alunas.
- Código do produto novo da Greenn e a regra de acesso do app (só compra aprovada ou também assinatura em dia).
- Plano B: código para 10 min ou botão para "Só 5 minutos".
- Workspace do Gravyx a usar e OK do custo em tokens.
- Liberar o app novo para toda assinante?
- Autorização por escrito da aluna para usar a frase "Foi o que me fez ter constância pela primeira vez na vida".

## Notas de referência
- [[Comunidade - relatório da promessa (08-11)]] — o relatório inteiro que embasou a decisão.
- [[Comunidade - quiz tela a tela]] — as 17 telas e a lógica do resultado.
- [[Comunidade - roteiro da VSL da Laura]]
- [[Comunidade - voz da cliente]] — dores, objeções e frases (anonimizado).
- [[Comunidade - concorrentes]] — Biblioteca de Anúncios e funis.
- [[Comunidade - inventário do Drive]]
- [[Comunidade - relatórios anteriores]]
- [[Comunidade - fatos do quiz]]
- [[Prompts para conversas paralelas - Comunidade]] — prompts prontos para dividir o trabalho em várias conversas.

## Registro
- 2026-11-08 · Promessa aprovada; roteiro da VSL pronto; página `/comunidade` em PR rascunho (#365); conhecimento da sessão levado para o Obsidian.
- 2026-11-08 · App: levantamento de acesso, Plano B e aulas; PR rascunho #367 (doc + prints, sem mudança de código); aguarda o Patrik.
- 2026-11-08 · Patrik decidiu: vender o mensal (WOqOSI), app só para assinatura nova em dia, testes à mão, e-mail + vídeo na área de membros. Antes/depois enviado; aguarda OK.
- 2026-11-08 · App revisado para 100 alunas de teste: funciona; achados (IA corta resposta, Plano B, Supabase grátis com risco para o projeto inteiro). Plano: app indica treino da Greenn. Relatório: [[Comunidade - app pronto para teste (08-11)]].
- 2026-11-08 · Patrik: link da área de membros é https://app.greenn.club/home (abre o acesso dela; sem sessão pede login; "esqueci a senha"); minutos do Plano B saem do mapa da área de membros; "ok pode corrigir". Correções no PR #367.
