---
type: projeto
title: "Millena Merlo - Desafio Magra Pro Max"
project: "Millena Merlo"
tags: [tipo/projeto, projeto/millena-merlo, quiz, pagina-de-vendas, greenn]
keywords: [Millena, Desafio Magra Pro Max, quiz, falsa magra, hipopressivo, Maxxima, Greenn, checkout]
created: 2026-11-16
updated: 2026-11-16
summary: "Análise do funil do quiz (01–16/11), gargalos, ruminações e página nova (estrutura Maxxima + visual da efeitolipo.com.br/c) ainda não publicada."
---

# Millena Merlo · Desafio Magra Pro Max

Material completo no repositório CLIENTES, pasta `millena-merlo/` (branch `claude/wonderful-brown-345heu`):
`PLANO_PAGINA_E_VSL.md` (gargalos, ruminações, roteiro da VSL, lista de gravação, pendências) e `pagina-desafio/index.html`.

## Contas
- Quiz: quiz.desafiomagrapromax.com.br · pixel 1332309708403614 · checkout Greenn `payfast.greenn.com.br/redirect/286218` (oferta WUdgLV, 4 order bumps).
- Hostinger: usuário u343853767 (desafiomagrapromax.com.br, WordPress; millenamerloo.com.br). Acesso pela API conferido em 16/11.
- Gasto: Stract, aba MILLENA (conta "CA 03 | MILLENA MILLION"). A Millena não tem ficha no Painel PTK.

## Números (01–16/11/2026, fonte: planilha de leads do quiz + Stract)
- 4.591 pessoas → 1.000 clicam "EU QUERO" (21,8%) → 818 terminam o quiz → 471 clicam no checkout (10,3%) → 87 compras (pixel).
- Gasto R$ 2.653,69 · custo por venda R$ 30,50 · ticket médio R$ 28,24 · retorno 0,93.
- O checkout manda AddToCart ao abrir (507 ≈ 471 cliques); InitiateCheckout só depois dos dados (165). A perda é dentro do checkout.

## Decisões
- 16/11: a página nova não substitui o quiz; entra como teste A/B com parte pequena da verba. Ordem: checkout → capa do quiz → oferta do quiz → página nova.
- 16/11: o Patrik pediu a página no visual da efeitolipo.com.br/c com os blocos do Maxxima. Feita com 16 blocos. Endereço previsto
  desafiomagrapromax.com.br/oferta/ (noindex). **Não publicada:** a subida pela Hostinger foi bloqueada pela trava da sessão e espera o OK do Patrik.

## Estudo cruzado das respostas (16/11, 818 que terminaram o quiz; medida = clique no checkout, média 57,6%)
- Dois públicos: falsa magra (55%, mais nova, clica 56,6%) e acima do peso (34%, 79% "ganho rápido e perco devagar", clica 61%; 29–39 anos clica 70%).
- Mais clicam: 29–39 anos, "jeans e cropped", "100% comprometida", "corpo todo desenhado", "linda e forte". Menos: "biquíni cavado", "já emagreci mas flácida", 17–28 anos.
- Só 9% querem treino de 10–20 min: "treino rápido" não é a dor. Detalhes em CLIENTES/millena-merlo/PLANO_PAGINA_E_VSL.md (seção 2b).
- Limite: a planilha não tem e-mail; não dá para ligar resposta a compra (não conferido).

## Página no WordPress dela (17/11)
- Acesso por senha de aplicativo do WordPress (Millena e efeitolipo), salvo no ambiente da nuvem. A API da Hostinger só lê a conta dela.
- Página ID 260 em desafiomagrapromax.com.br/desafio-pro-max/, protegida por senha, copiada do Elementor da efeitolipo.com.br/c
  (página 388) com preto + laranja #F85A00. Montador em CLIENTES/millena-merlo/elementor/montar.py (seção 8 do plano).
- /oferta/ está ocupado pela pasta estática do zip antigo (pasta ganha da página do WordPress).

## Pendências
- OK para subir a página; respostas da Millena (preço à vista, garantia 21 ou 30 dias, o que entra, acesso, duração dos treinos, história dela).
- Gravações da Millena (VSL nova, versão curta, hipopressivo, tour da área, depoimentos com autorização).
