---
type: decisao
title: "5 páginas de promessa no teamlaurarosa (19-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, pagina-de-vendas, wordpress, elementor, copy-ladeira]
keywords: [maxxima, efeito lipo c, trio lipo, lipo sem agulha, pós-queima 15, liga a queima, barriga em 3, promessa, teamlaurarosa.com.br]
created: 2026-11-19
updated: 2026-11-19
summary: "5 páginas de vendas (uma por promessa nova) no WordPress do teamlaurarosa.com.br, em rascunho: blocos da MAXXIMA, visual da página C, entregáveis do Efeito Lipo com nome chiclete próprio e copy revisada bloco a bloco pelo método do Ladeira."
---

# 5 páginas de promessa no teamlaurarosa (19/11)

## O que foi decidido
- O Patrik mandou 5 promessas novas e pediu 5 páginas: os 15 blocos da MAXXIMA, o visual da página C do efeitolipo.com.br e os mesmos
  entregáveis do Efeito Lipo, **sem esse nome**: cada página tem um nome chiclete (Ladeira, neologismo e jogo de palavras).
- Nomes e endereços: Trio Lipo (/trio-lipo), Lipo Sem Agulha (/lipo-sem-agulha), Pós-Queima 15 (/pos-queima-15),
  Liga a Queima (/liga-a-queima) e Barriga em 3 (/barriga-em-3), no teamlaurarosa.com.br.
- Promessa do topo exatamente como o Patrik escreveu. **Exceção à promessa segura** (BRAND.md), só nestas páginas: "até 10kg" e
  "exercícios hormonais". Para não virar promessa mirabolante, o FAQ das 3 páginas com quilos responde "Vou perder 10kg em 21 dias?"
  com honestidade (o número vem de aluna que seguiu depois dos 21 dias; resultados variam).
- Checkout: botão provisório até o Patrik aprovar o link e o cartão de preço (regra de pagamento).

## Como ficou
- WordPress + Elementor (instalado pelo Patrik em 19/11). Páginas criadas pela API com senha de aplicativo, em rascunho.
  Cada bloco é um contêiner nomeado com o HTML num widget HTML; modelo Canvas.
- Depois de mudar o `_elementor_data` pela API, é preciso limpar o cache do Elementor (`DELETE /wp-json/elementor/v1/cache`).
- Revisão Ladeira (M04-06 e análises, premissas, objeções, oferta, ancoragem, prova): entraram CTA no topo, título nos depoimentos,
  o porquê do "hormonal", demonstração, proposta única de valor, garantia de 21 dias em seção própria e objeções novas no FAQ.
- Código: repositório LR_LauraRosaPersonal, `tools/teamlaurarosa/` (gerador, `REVISAO_LADEIRA.md`), PR #487.

## Pendente
- Link do checkout e OK nas propostas de oferta: âncora coerente no lugar do "valeria R$ 573" (o curso chama essa âncora de jeito
  errado), "por que só R$ 37", acesso no cartão e preço no topo.
- Capas sem o selo "efeito lipo"; confirmar que cada treino é a "sequência de 3 exercícios"; pixel, Analytics e medição antes de anunciar.
