---
type: referencia
title: "Comunidade - funil completo do Movimento, Aline e Elah (09-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, concorrentes, funil, upsell, movimento, aline, elah]
keywords: [funil, upsell, downsell, order bump, kiwify, vturb, inlead, elah, movimento, aline pamplona, tripwire, escada de ofertas]
created: 2026-11-09
updated: 2026-11-09
summary: "Dissecação do funil de ponta a ponta dos três que o Patrik quer modelar (Movimento, Aline, Elah): anúncio, páginas, checkout, bumps, upsell e downsell, pilha de tecnologia, nota por etapa. Corrige duas notas de 08/11 (Movimento TEM bump; Aline TEM upsell)."
---

Projeto: [[Corpo Feliz - Comunidade]] · Plano: [[Comunidade - resumo e plano do funil (08-11)]] · Anteriores: [[Comunidade - concorrentes]], [[Comunidade - anúncios do Movimento]], [[Comunidade - página de vendas, Elah e mercado (08-11)]]

# Funil completo: Movimento, Aline e Elah (09/11/2026)

**Método.** Seguiu o roteiro da skill de código aberto *funnel-spy* (Mahan Ai, MIT; só li e adotei o método, não instalei): caminhar o funil na ordem de quem entra, ler o código da página, achar as páginas escondidas (sitemap, API pública do WordPress, API pública do checkout da Kiwify), montar a escada de ofertas e dar nota nas 4 etapas (Atrair, Capturar, Converter, Subir o ticket). **Nota = leitura qualitativa de quem olha de fora, não medição.**
**Selos de evidência:** CONFIRMADO = vi na fonte hoje (09/11); INFORMADO = vem das notas de 08/11 ou de dado declarado; INFERIDO = dedução minha, marcada. **Não vi gasto, venda nem conversão de ninguém.** Nada foi comprado e nenhum formulário foi preenchido.

## Correções às notas de 08/11
1. **Movimento TEM order bump** (a nota dizia "sem order bump"): 1 bump no checkout, R$ 9,99 (CONFIRMADO, API pública do link Kiwify).
2. **Aline TEM funil pós-compra** (a nota dizia "sem bumps", que continua certo, mas esquecia o upsell): depois do R$ 7 vem upsell de R$ 220 com vídeo, downsell e baixar o app (CONFIRMADO, ver §2).
3. **Plataforma do quiz da Aline: Inlead** (CONFIRMADO: o quiz carrega scripts de inlead.digital; antes era só suspeita pelo `src=inlead3`).
4. **Anúncios do Movimento: hoje a Biblioteca não devolveu nenhum** (busca pela página `111432198719016` e por "Movimento Emagreça", Brasil, ativos e todos). Em 08/11 eram 27. Pode ter parado ou a página mudou; **não afirmo nada**: reconferir antes de usar como "tempo no ar".

---

## 1. MOVIMENTO (movimentoapp.netlify.app)
**Resumo:** assinatura barata de app web, VSL longa que só mostra a oferta no fim, 1 bump pequeno, sem prova social.

| Etapa | O que há | Selo |
|---|---|---|
| Anúncio | Página "Paramamaes"; em 08/11, 27 anúncios ativos desde 12/08, 5 criativos (4 "Jornal da Mulher" + 1 depoimento), todos levam à página. Hoje: 0 ativos na consulta. | INFORMADO + hoje não confirmado |
| Página (única) | Hospedada na Netlify, 1 arquivo. Topo: título "Você está pronta. Só faltava o plano certo.", linha "por que dieta e treino complicado falham", **vídeo VTurb**. **Botão, selos e o resto da página ficam escondidos até 654 s** (10:54 de 14:26, 75,5%), gatilho `timeupdate` do player; quem volta vê tudo (`movOfferRevealed`); se o player não responde em 25 s, libera. | CONFIRMADO (código) |
| Corpo da página (abre no fim da VSL) | faixa com 5 recursos → telas do app → "Resumindo" com 5 dores → "O que é o Movimento" + 6 recursos → "Como funciona" em 4 passos → plano de 30 dias em 3 fases → 6 perguntas (nunca treinei, equipamento, não seguir a dieta, tempo por dia, iPhone/Android, garantia) → **âncora: "separado R$ 230, junto R$ 47,90 por mês, 79% de desconto"** → garantia incondicional de 7 dias → "Se não for agora, vai ser quando?" → botão final + barra fixa "Comprar agora". | CONFIRMADO |
| Prova social | **Nenhuma na página** (sem depoimento, sem antes e depois, sem número de alunas). A prova está só nos anúncios. | CONFIRMADO |
| Checkout | Kiwify `d4yc1oZ`: "Movimento - Acesso Mensal", **R$ 47,90/mês, recorrente**, até 12x no cartão, **1 bump: "Receitas para preguiçosos perderem peso", 60 receitas low carb, R$ 9,99 (ou 2x R$ 5,26)**. Sem pixel configurado na Kiwify; a página dispara `InitiateCheckout` (R$ 47,90) no clique. Produtor pessoa física, sem CNPJ. | CONFIRMADO |
| Pós-compra | Sem página de obrigado própria (`approved_url` vazio); rotas /obrigado, /upsell, /up1, /oferta, /checkout dão 404. Upsell de 1 clique, se existir, não dá para ver de fora. | CONFIRMADO (ausência de página) / upsell NÃO OBSERVÁVEL |
| Tecnologia | Meta Pixel `1597434998456218` (PageView + InitiateCheckout), VTurb (player `6aed31c3ff8770cd868c89aa`), Netlify, Kiwify. Sem GTM, sem GA, sem Clarity. | CONFIRMADO |

**Escada:** R$ 47,90/mês → bump R$ 9,99. Sem upsell visível.
**Nota (leitura):** Atrair 15 (anúncios longos em 08/11, hoje não confirmado) · Capturar 5 (vai direto ao checkout) · Converter 17 (VSL com oferta travada, âncora forte, garantia, mas zero prova na página) · Subir ticket 8 (1 bump). **Total ≈ 45. Mais fraco: Subir ticket e prova.**
**Leitura:** o que o Movimento tem de forte é o *travamento da oferta até o fim da VSL* e a *âncora de preço* (R$ 230 → R$ 47,90). É a página mais simples de modelar. Já está replicado no nosso `/comunidade` (`REVEAL_SECONDS`), faltando o vídeo.

---

## 2. ALINE PAMPLONA ("Teste do Corpo de Musa")
**Resumo:** é o funil mais completo dos três: anúncio renovado todo dia → quiz → 2 VSLs → R$ 7 → **upsell de R$ 220 em vídeo com compra em 1 clique → downsell → app**. O quiz paga o tráfego; o lucro está no upsell (INFERIDO).

| Etapa | O que há | Selo |
|---|---|---|
| Anúncio | 3 páginas (Corpo de Musa 966902443182722, Aline Pamplona 1585248888224091, ESP). **71 ativos hoje.** Título único "Faça o teste do Corpo de Musa" (variante "Nenhum dos dois times vira musa", 30/10). **Renovação diária de criativo:** só nos 50 que consultei, ≈18 começaram hoje (09/11), ≈14 em 08/11, 03/11, 01/11, 30/10. O mais antigo desta consulta é de 21/10; em 08/11 havia um de 19/09 (INFORMADO). Vídeos de 0:42 a 2:50 e imagens. | CONFIRMADO (contagem) |
| Quiz | `quizalt.alinepamplona.com.br` (e `quizalt2`, idêntico). **Plataforma Inlead.** 27 telas, sem pedir e-mail nem nome; pede altura/peso/meta e mostra gráfico de 30 dias; **VSL 1 no meio do quiz** (5:59, botão "Continuar" só aparece ~100 s); VSL 2 na oferta (6:30, cronômetro, botão ~300 s = 77%). Walk completo de 08/11 em [[Comunidade - concorrentes]] §2.1. Hoje não refiz as 27 telas (é app de página única; só reconferi a plataforma). | INFORMADO + plataforma CONFIRMADA |
| Checkout | Kiwify `kRM1Enm` "Shape de Musa [SM] -|- Quiz": **preço 700 (R$ 7,00 pela API), pagamento único, 1x, sem bumps**, cartão duplo habilitado. O checkout mostrou US$ 7,00 com IP dos EUA; **se é R$ 7 ou US$ 7, não conferido** (a API também traz `amount_in_usd` 659, que não fecha com R$ 7: dado inconsistente, não confirmo). Produtora com CNPJ (A&W Digital Fitness). | CONFIRMADO (API) / moeda NÃO CONFERIDA |
| **Pós-compra (aqui está o dinheiro)** | `approved_url` = `pg.alinepamplona.com.br/up1/`. **UP1:** tela só com vídeo (VTurb), aviso "NÃO FECHE ESTA PÁGINA! VOCÊ SÓ TERÁ ACESSO A ESSE VÍDEO AGORA!", botão "QUERO MINHA VAGA" (**upsell de 1 clique da Kiwify, `upsell-v2`**, oferta `6kJ8c6Y` = **"Protocolo Aline Pamplona Trimestral", R$ 220,00 (recorrente, até 12x de R$ 22,75)**) e link "Não, eu gostaria de recusar". Embaixo: "Comprou o Corpo de Musa no PIX e quer parcelar o Protocolo no cartão? **QUERO PARCELAR**" (PIX não faz 1 clique, então vai para o checkout normal da mesma oferta). **Aceitou → UP2** (vídeo, botão "NÃO, OBRIGADA" que leva a baixar o app, `partner.kampp.app/download`). **Recusou → DOWN1** (downsell em vídeo, mesmo final). Existe um **UP3**, cópia do UP1 titulada "DISPARO" (provavelmente para tráfego por mensagem) com a **mesma oferta a R$ 197** (`vOSoI2Q`), ou seja, **teste de preço R$ 220 × R$ 197** (INFERIDO). Preço do downsell: não li (o botão não aparece no HTML). | CONFIRMADO (páginas e ofertas) |
| Tecnologia | Quiz Inlead; VSLs VTurb (um player por página); Meta Pixel `942960437092658` e GTM `GTM-W44QZ9R4` nas páginas pós-compra; **Utmify** (rastreio de UTM e vendas) nas páginas pós-compra; Kiwify (checkout e upsell). | CONFIRMADO |

**Escada:** R$ 7 (entrada, sem bump) → R$ 220/197 trimestral em vídeo com 1 clique → downsell em vídeo → app. O PIX é recuperado com "parcelar no cartão".
**Nota (leitura):** Atrair 22 (71 ativos, criativo renovado diariamente) · Capturar 18 (quiz sem e-mail, resultado com os números da pessoa) · Converter 21 (2 VSLs com botão travado, R$ 7) · Subir ticket 24 (upsell + downsell + PIX). **Total ≈ 85. Mais forte: Subir ticket.**
**Leitura (INFERIDO, sem números do funil):** com entrada de R$ 7 o gasto em anúncio só fecha se uma parte relevante comprar o R$ 220/197. É a lógica "tripwire + upsell em vídeo". Para nós é o modelo mais próximo do que o Patrik pediu (**bump e upsell para a Comunidade**), e o *mecanismo já existe no nosso site*: `/acompanhamento-up` usa a mesma ideia com o upsell de 1 clique da Greenn.

---

## 3. ELAH (elah-app.com, Flávia Cristófaro)
**Resumo:** página longa de prova, só plano anual, mas **o site esconde 6 versões da página com preços diferentes e um upsell**: é um laboratório de preço e de VSL em andamento.

| Etapa | O que há | Selo |
|---|---|---|
| Anúncio | Páginas "Elah App" (1145867688604829) e "Flaviacristofaro" (606765582529776). **Lote grande em 06/11** (≈18 no Elah App e ≈28 na pessoal, começando entre 14h e 18h UTC), 4 em 05/11 ("CLIQUE EM SAIBA MAIS! 👇"), 1 de 16/10 no Elah App. Busca por "Elah App" também traz páginas sem relação (Empório Elah, loja de moda). **Mais antigo: 24 dias. Não dá para afirmar que "escala".** Destino dos anúncios: não conferi (a ferramenta não mostra o link). | CONFIRMADO (datas) / destino NÃO CONFERIDO |
| Página atual `/` e `/elah-app-new` | Descritas em [[Comunidade - página de vendas, Elah e mercado (08-11)]] §1: topo + selo, antes e depois deslizante, 2 pilares (Fit em Casa, Academia Descomplicada), relatos, treinadora, 10 entregas, depoimentos em print, "se você não tomar uma atitude…", preço, garantia 7 dias, FAQ de 11 perguntas, WhatsApp. **Sem VSL de venda.** | CONFIRMADO |
| **Páginas escondidas (listadas pela API pública do WordPress, não ligadas no menu)** | `/elah-app-vsl-2`: **De R$ 958 por 12x R$ 59,70 ou R$ 597** · `/elah-app-vsl-3`: **De R$ 597 por 12x R$ 39,70 ou R$ 397** · `/elah-app-vsl-4`: **12x R$ 49,70 ou R$ 497**, com a chamada "Hoje é o último dia dessa aula, DATADINAMICA" (modelo de aula com data dinâmica que ficou sem preencher) · `/elah-app-front`: só **Fit em Casa e Fit em Casa Express, 12x R$ 29,70 ou R$ 297** · `/elah-app-vsl-v5`: **só título + player VTurb em modo teste A/B (`ab-6a8cb504…`)**, sem nenhum botão no HTML (o botão deve estar dentro do player). Todas com garantia de 7 dias, 7 a 10 programas listados, "acesso anual". | CONFIRMADO (texto e preços das páginas); qual recebe tráfego pago: NÃO CONFERIDO |
| **Upsell escondido** | `/elah-app-upsell`: "Seu Fit em Casa já é seu… Quero aproveitar / Não quero. Tá tudo certo." O botão aponta para um **upsell de 1 clique** (`…/a253ed51…/1click`) cujo código é **o mesmo da oferta de R$ 397 da VSL-3**. Leitura: quem compra o front de R$ 297 (Fit em Casa) recebe a oferta de subir para o método completo (INFERIDO; **o preço do upsell não está escrito na página**). Quem recusa recebe mensagem tranquilizadora ("não muda nada no que você já garantiu") e o acesso chega no e-mail. | CONFIRMADO (existe) / preço e escada INFERIDOS |
| Checkout | Plataforma `clkdmg.site` (formulário que só abre com JavaScript; não consegui ler preço nem bumps; não identifico a plataforma). Usa Utmify. | CONFIRMADO (domínio) / resto NÃO CONFERIDO |
| Tecnologia | WordPress + Elementor + LiteSpeed; GTM `GTM-TQQRV9LT`; GA4 `GT-T9H4TDSD`; **PixelYourSite** (Meta Pixel com evento pelo servidor e `external_id`, ou seja, API de Conversões, INFERIDO do código); VTurb só na v5; WhatsApp `wa.link`; Utmify no checkout. **Não encontrei Clarity** (a nota de 08/11 dizia que tinha; não confirmo). | CONFIRMADO |

**Escada (INFERIDA):** R$ 297 (front: Fit em Casa) → upsell 1 clique → método completo anual (R$ 397 a R$ 597 conforme a versão) → comunidade e extras como "entregas" dentro do pacote (não vendidos à parte).
**Nota (leitura):** Atrair 14 (lote enorme, mas só 24 dias) · Capturar 5 · Converter 19 (prova densa, garantia, FAQ; antes e depois e "5 kg em 60 dias" fora das regras da Meta) · Subir ticket 16 (front + upsell 1 clique). **Total ≈ 54. Mais fraco: Capturar.**
**Leitura:** eles estão testando 4 preços (R$ 297, 397, 497, 597) e versões com VSL/aula. **Ainda não é um funil provado**; é um funil em teste, muito bem organizado.

---

## 4. Comparativo e o que isso diz para a Comunidade
| | Movimento | Aline | Elah | **Comunidade hoje** |
|---|---|---|---|---|
| Entrada | R$ 47,90/mês | R$ 7 (ou US$ 7) | R$ 297 a 597 (anual) | R$ 39,90/mês |
| Vídeo de venda | VSL 14 min, oferta travada | 2 VSLs (no quiz e na oferta), botão travado | só na versão v5 (aula) | **vazio** |
| Order bump | 1 (R$ 9,99) | nenhum | não observável | **nenhum** |
| Upsell / downsell | não observável | **R$ 220/197 em 1 clique + downsell + app** | **upsell 1 clique (front → método)** | **nenhum** |
| Teste de preço visível | não | sim (UP1 × UP3) | **sim (4 preços)** | não |
| Prova na página | nenhuma | quiz com resultado pessoal | muita (antes e depois, prints) | 6 alunas + depoimentos |
| Rastreio | Pixel só | Pixel + GTM + Utmify | GTM + GA4 + PYS (CAPI) + Utmify | Pixels LP e oficial + painel próprio + Clarity |
| Nota (leitura) | ≈ 45 | ≈ 85 | ≈ 54 | **≈ 33** (Atrair 0, Capturar 17, Converter 12, Subir ticket 4) |

**Padrões que os três têm em comum (CONFIRMADO):**
1. **Vídeo (VTurb) com o botão ou a oferta travados até o fim da venda** (Movimento 75%, Aline 77%, Elah v5 dentro do player).
2. **Garantia curta de 7 dias** em todos (a nossa é de 15, mais forte).
3. **Rastreio com Utmify ou pixel próprio** em todos; só nós temos painel por promessa e Clarity.
4. **Subir o ticket depois do "comprar":** 2 de 3 têm upsell de 1 clique (Aline é o modelo mais completo, Elah está testando; Movimento só tem o bump de R$ 9,99).

**O que falta na Comunidade para ter um funil "que o mercado escala" (o que eu vejo, para a etapa 3):**
- **Vídeo de venda** (VSL gravada). Sem ele a página do Movimento e o quiz da Aline ficam sem o que mais converte neles.
- **Escada depois do "comprar"** nas ofertas que já existem no nosso banco: o mensal de R$ 39,90 é entrada, e o que já vendemos (anual, trimestral R$ 97, Cinturinha EXPRESS e Receitas que Secam a R$ 19,90) pode ser o upsell, bump e downsell. A mecânica de 1 clique com a Greenn **já existe** em `/acompanhamento-up`.
- **Medir a escada** (hoje só o quiz e a página são medidos).
- **Teste de preço** do upsell (Aline e Elah testam).
**Regra:** preço, texto de oferta, bump, upsell e links da Greenn só com OK explícito do Patrik (antes e depois). Nada disso foi alterado.

## Limites desta verificação
- Não comprei nem preenchi nada: o que fica atrás do pagamento (e-mails, área de membros, upsells que só aparecem para quem comprou) não foi visto.
- Sem gasto, vendas ou conversão de nenhum concorrente. As notas são leitura qualitativa.
- Movimento: sem anúncio na consulta de hoje. Aline: preço do downsell e moeda do R$ 7 não conferidos. Elah: checkout e preço do upsell não lidos; destino dos anúncios não conferido.
- O Elah publica as variantes em páginas não indexadas; o que mostra é o que está no ar agora, não quanto tráfego recebe.

## Skills do GitHub avaliadas (só leitura; nada instalado)
- **Mahanaicoach/funnel-spy** (MIT, 7 estrelas, 30/10/2026): a mais aderente. Roteiro de caminhada de funil, pilha de tecnologia, escada de ofertas, placar em 4 etapas, selos de evidência. Revisei SKILL.md e `update.sh`: sem envio de dados nem instalação oculta (o `update.sh` só faz `git fetch` do próprio repositório). **Adotei o método.** Pede navegador e subagentes para a versão completa.
- **WednyFernandes/competitor-research-skill** (em português): pesquisa de concorrentes pela Biblioteca de Anúncios, lojas de app e landing, com rodadas que se expandem. Boa para *descobrir* concorrentes novos, não para dissecar um funil. Escreve em `docs/CONCORRENTES.md` (não usar sem pedir).
- **emamulmursalin47/competitor-teardown** (0 estrelas, 22/08/2026): rastreia o site inteiro e gera relatório HTML com wireframes. Tem scripts Node para executar; **não rodei**. Útil só para páginas, não para funil com checkout.
- Outras que apareceram na busca e não li: hermoso-ai/marketing-skills, tymoshenko-dmytro/claude-marketing-skills (inclui "funnel screenshots"), Perspectiveco/funnel-cloner (clona funil para a plataforma Perspective; não serve para nós).
