---
type: decisao
title: "Comunidade - teste de vídeos A x B na página"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, vsl, teste, vturb]
keywords: [vsl, vturb, teste, retenção, v5A, v5B, legenda, cv_video]
created: 2026-11-11
updated: 2026-11-11
summary: "Patrik decidiu em 11/11/2026 testar dois vídeos novos (v5A e v5B) na página /comunidade, sorteio 50/50; PR #418 mesclado e no ar."
---

Projeto: [[Corpo Feliz - Comunidade]]

# Teste de vídeos A × B na página /comunidade (11/11/2026)

## Decisão
Patrik: "vamos testar A × B". Sem gravação nova e sem áudio novo da Laüra: as duas versões só reaproveitam áudio e vídeo que já existiam.

## O que são
- **v5A**: a VSL v4 mais curta (10:20), com a prova de 2 alunas logo depois da abertura e a Laüra de rosto (trecho da VSL antiga) no meio.
- **v5B**: igual ao A, mas a aluna fala primeiro (antes da abertura).
- Legenda queimada nos trechos das alunas (o vídeo toca mudo no começo). Frases conferir pela lista do repositório.
- Ids na VTurb: v5A `vid-6af4f293aafdc81a284be2b1`, v5B `vid-6af4f28cbeaed0427bf522a4`. Oferta aos ~466 s; a página abre o resto aos 463 s.

## Por que (dados da VTurb, 11/11)
- ~47% de quem dá play sai em 15 s e só ~30% seguem com 1 min; depois a retenção cai 1 a 2 pontos por 20 s. O 1º minuto decide.
- Ganchos antigos (maio, mesmo vídeo, só muda o começo): o Hook 2 foi o melhor em cliques (15,6% no mesmo período) e o Hook 6 o pior (10,0%). A VSL de abril, aberta com "quantas vezes você tentou emagrecer?", foi a que mais perdeu no começo (42% aos 15 s). Hipótese, não provada: abrir com prova da aluna segura mais.
- A VTurb não tem as vendas ligadas e o banco de vendas só começa em 19/06: o teste lê retenção e cliques, não venda.

## Como está no ar
PR #418 (squash, 11/11): a `/comunidade` sorteia 50/50, cookie `cv_video` por 30 dias, `?v=A` ou `?v=B` fixa. Medidor `p1-vA`/`p1-vB`. Preço, garantia, bônus, checkout, anúncios e quiz não mudaram. O v4 saiu do sorteio (segue no quiz).

## Conferido
- 11/11: o Patrik testou e o botão e o resto da página abrem no segundo certo (463 s).
- 11/11: `?v=A` e `?v=B` carregam o player certo no ar; sem `?v` sorteia 50/50 (8 visitas de teste: 5 A, 3 B).

## Em aberto
- Pitch 07:46 nos dois players (a VTurb ainda mostrava 0 na conferência).
- Tráfego: ~8 plays por dia hoje (~15 visitantes reais por dia, quase todos do anúncio da página); para ler em 7 dias precisa de ~50 a 110 plays por dia (2 vídeos), ou seja ~100 a 220 visitantes por dia (~R$ 400 a R$ 900 por dia, estimativa grosseira a ~R$ 4 por clique). Anúncios e orçamento ficam com o Patrik (o quiz é tratado em outra conversa).
- Ligar a venda ao vídeo no link do checkout (utm_campaign cv-vA/cv-vB): só com OK explícito do Patrik.
- Botão e resto da página só abrem na oferta: das ~34 pessoas medidas em 09–11/11, só 2 (6%) chegaram ao resto e 1 tocou em comprar. Decisão futura. (Correção de 11/11: a contagem `upsell_views` de ~120 visitas por dia está inflada pelo pré-carregamento do Meta e por testes; o número real são as pessoas medidas, ~15 por dia.)
- Antes e depois no bloco "Resultados" e na foto da Laüra, contra a regra da marca: decisão do Patrik.
- Regra de decisão: o vídeo vence se a retenção de 1 min for ≥5 pontos maior e as vendas por visita iguais ou melhores; senão fica o v4.
