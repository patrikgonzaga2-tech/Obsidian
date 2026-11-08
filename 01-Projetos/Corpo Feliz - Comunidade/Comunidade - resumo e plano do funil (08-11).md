---
type: projeto
title: "Comunidade - resumo e plano do funil (08-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, funil, resumo, passagem-de-bastao]
keywords: [resumo, funil, upsell, vsl, criativos, campanha, painel, passagem de bastão]
created: 2026-11-08
updated: 2026-11-08
summary: "Tudo que foi feito e decidido em 08/11 na Comunidade (quiz, página com VSL, painel, rastreio, contas), o que o mercado que escala faz, o que falta e a ordem do plano: funil e upsell, VSL, criativos modelados, painel e só depois as campanhas."
---

Projeto: [[Corpo Feliz - Comunidade]] · Prompts: [[Prompts para conversas paralelas - Comunidade]]

# Comunidade · resumo e plano (08/11/2026)
Decisão do Patrik (08/11, fim do dia): **nada de campanha agora.** Primeiro: rever o funil (com upsell), criar a VSL, colocá-la em tudo, criar criativos (vídeos e imagens) **modelando o que já escala, sem inventar**, ter tudo medido no painel, e só então as campanhas.

## 1. O que está NO AR (conferido em produção)
- **Quiz** https://www.laurarosapersonal.com/comunidade-quiz · 4 capas sorteadas 1/4 (cookie `cq_capa`, 30 dias; `?p=1..4` fixa): p1 "Você começa na segunda e para antes do fim de semana?"; p2 "Seu corpo mudou e o treino continua o mesmo?"; p3 "Joelho, lombar ou diástase te fazem parar?"; p4 (promessa do Movimento) "Você está pronta. Só faltava o plano certo pra sua rotina." Visual novo (logo em todas as telas, fotos inteiras, mais rápido), resultado com Laüra, antes e depois dela, depoimentos, 5 bônus com capa, oferta. PRs #371–#376, #381.
- **Página de vendas com VSL** https://www.laurarosapersonal.com/comunidade · 4 promessas sorteadas 1/4 (cookie `cv_capa`; `?p=1..4`): 1 "Secar e definir o corpo sem recomeçar toda segunda", 2 "Secar a barriga e definir o corpo com a Profe Laüra do seu lado", 3 "Treino de 3, 5 ou 15 minutos pros dias em que a rotina aperta", 4 a do Movimento. Topo só com logo, título, uma linha e o vídeo; **o resto abre no momento da oferta da VSL** (gatilho `timeupdate` da VTurb, como o Movimento). Sem VSL a página abre inteira e o vídeo é um quadro vazio. Valores a preencher em `app/comunidade/_dados.ts`: `VTURB_ID`, `VTURB_SRC`, `REVEAL_SECONDS`. PR #381.
- **Oferta (a mesma no quiz e na página):** mensal R$ 39,90 ("De R$ 97 por R$ 39,90 por mês, só R$ 1,33 por dia"), garantia de 15 dias (conferida na Greenn), sem fidelidade. Checkout https://payfast.greenn.com.br/148344/offer/yaG6FL. UTMs: quiz `utm_source=comunidade-quiz` + `utm_medium=cq-pN`; página `utm_source=comunidade-vsl` + `utm_medium=cv-pN`.
- **Quem compra o mensal recebe tudo** (Patrik): treinos, treinos de 3, 5 e 15 minutos, plano alimentar, Grupo das Musas, mobilidade, diástase, acompanhamento da Laüra. A página e o quiz vendem a **Comunidade**, não o app. O app é outra oferta, fica para o fim, em outra conversa.
- **Painel** (/painel, grupo "Comunidade · teste", PRs #383 e #386): abas **Comunidade · Quiz** e **Comunidade · Página VSL**, por promessa (visitas, avanço, cliques, pedidos, compras, R$ por visita, gasto e custo por compra); tela a tela e por anúncio no quiz; comportamento bloco a bloco na página. Campanhas com "COMUNIDADE" no nome ficam fora de todas as abas do Efeito Lipo. **Clarity** (projeto `uerrlg9heo`, pelo GTM) com etiquetas `formato`, `promessa`, `teste` desde 08/11. O painel oficial de links e o Obsidian estão atualizados.

## 2. Rastreio (como a venda volta para a promessa)
- Pixels: LP `28090278990632923` e oficial `944444744178548` disparam PageView no quiz e na página e "Início do Checkout" no checkout. **Purchase só chega no pixel oficial** (o da LP teve o evento de compra bloqueado em 03/11): a campanha deve otimizar no oficial, evento Purchase, não no "Compra Realizada" do padrão 3.2 de outubro.
- Greenn webhook grava `tracking_src` = utm_term, `tracking_sck` = sck ou utm_source, `tracking_xcod` = xcod ou utm_content. O site cola `sck=origem|p` no link de compra; o painel lê `utm_source` e `utm_medium` do payload cru (`vendas.raw`), então a promessa vem do `utm_medium`.
- **Ainda sem confirmação:** nenhuma venda da oferta yaG6FL chegou até 08/11 (o Patrik vai fazer uma compra de teste). Falta confirmar na primeira venda que a origem aparece nas abas e que o pixel marca Purchase.

## 3. O que a Comunidade vende hoje na Greenn (45 dias, vendas aprovadas distintas, preço médio)
- Anual (produto 78187, várias ofertas): ~80 vendas, de R$ 160 a R$ 429 (ofertas M3DUOL 38 vendas a R$ 253; ij3kFo 24 a R$ 387); **é o que mais vende**.
- Trimestral (148339): ~37 vendas (R$ 97 a R$ 210). Semestral (148319): ~10. **Mensal (148344)**: poucas (ofertas antigas R$ 97, e a nova yaG6FL a R$ 39,90, que entrou em 08/11).
- Lowticket Efeito Lipo 21D (181143, R$ 36): 198 vendas; bumps vendidos: Cinturinha EXPRESS R$ 19,90 (26) e Receitas que Secam R$ 19,90 (16); upsell/ladder do Efeito Lipo existe em /acompanhamento-up.
- Ou seja: o mensal de R$ 39,90 é a entrada nova; o que historicamente fatura é o anual. **O upsell do funil da Comunidade ainda não existe**: é uma das tarefas.

## 4. Mercado que escala (Biblioteca de Anúncios BR e páginas abertas em 08/11; nada de gasto ou venda é visível)
- **Movimento Emagreça** (movimentoapp.netlify.app): 27 anúncios ativos desde 12–13/08 (~3 meses), 5 criativos (4 "Jornal da Mulher" imitando portal de notícia e 1 depoimento), título "Sua rotina em um único app · Conheça o Movimento", VSL de 14:26, página que libera o resto aos 654 s (75,5%), R$ 47,90/mês, Kiwify, garantia 7 dias, sem order bump.
- **Aline Pamplona** ("Teste do Corpo de Musa"): 61 anúncios ativos, mesmo criativo desde 19/09; quiz de 27 telas + 2 VSLs (a 1ª com botão após ~100 s de 359 s; a 2ª com cronômetro e botão após ~300 s de 390 s); Kiwify R$ 7 (visto em USD), sem bumps.
- **Líbia Resende**: páginas de vendas com VSL de 2–3 min (vturb), R$ 37 ou 10x R$ 4,45, garantia 12–15 dias, **4 order bumps de R$ 7,90 a R$ 19,90 (de R$ 47–97)**; campanhas novas "Desafio 15x15" com ROAS 2,2–2,4; as antigas "VSL aberta" tiveram ROAS 0,39.
- **Elah** (elah-app.com, Flávia Cristófaro): 50+ anúncios nas duas páginas (28 em 06–07/11, 5 em ~16/10 na página do app); página longa **sem VSL de venda**, 10 programas listados, antes e depois deslizante, só anual 12x R$ 59,70 ou R$ 597, garantia 7 dias. Patrik: "tá escalada, mais de 20 anúncios, mais de 30 dias". É o app que ele quer modelar mais adiante.
- Outros vistos: Ritmu App (12 anúncios, 08/11), Shape Now, Yoga-Go e WalkFit (internacionais, USD).

## 5. Regras que valem em tudo
- **NUNCA INVENTAR**: todo número e texto com fonte. **Modelar o que já vende** (Patrik, 08/11: "não cria nada, modela o que já vende").
- **Pagamento, preço, oferta, garantia, upsell, order bump, checkout e links da Greenn só com OK explícito do Patrik** (mostrar antes e depois). Mesclar PR só depois do "pode subir"; conferir no ar. Painel oficial de links no mesmo PR. Tudo decidido entra no Obsidian.
- Marca (BRAND.md): sem quilos, prazo, promessa médica; antes e depois **liberado só na página** (Patrik, 08/11); no vídeo e nos anúncios segue proibido (regra do Meta). Material de terceiros (VSL do Movimento) pode gerar denúncia ou reprovação do anúncio: avisado, e o Patrik decidiu seguir.
- Anúncio: pergunta no texto (regra do Meta), sem antes e depois, página Corpo Feliz + IG laurarosapersonal, UTMs do padrão 3.2, beneficiário e pagador CORPO FELIZ LTDA, botão do WhatsApp 0948 no navegador (feito à mão no Gerenciador).
- Gasto de crédito (Gravyx, Kairogem, ElevenLabs, HeyGen) só com OK do Patrik. Sem nome, telefone ou saúde de aluna no Obsidian.

## 6. Contas de anúncio (levantamento de 08/11)
- Lowticket roda na "Ca - Efeito Lipo 21" (`733027747778562`, pixel 982093061614475).
- Recomendada para a Comunidade: "Ca - Corpo feliz - Novo projeto Laura" (`1094091162588572`, BM2, tudo pausado, pixels LP e oficial no BM). Página "Corpo Feliz" `103726576029315`; IG `laurarosapersonal` (`17841402314302518`). Alternativas: "Ca- Nova - Laura Corpo feliz" (`1018871991204953`, nunca gastou, sem pixel) e "Ca - Laura - Comunidade corpo Feliz" (`1452441419067513`, sem forma de pagamento).
- As ferramentas da Meta criam **rascunho** no Gerenciador; nada vai ao ar sem ativar. Imagens de criativo precisam de URL pública (publicar no site) para a Meta puxar.
- Uma proposta de campanha do quiz (4 conjuntos, R$ 80/dia, pixel oficial/Purchase) ficou **registrada e descartada por ora**, junto com 8 criativos de imagem que o Patrik não aprovou. Não reaproveitar sem pedir.

## 7. Plano, na ordem do Patrik
1. **Funil e upsell:** mapear o funil de ponta a ponta (anúncio → quiz ou página → checkout mensal → pós-compra), comparar com o que escala (bumps da Líbia, ladder, o anual que é o que mais vende aqui), propor order bump e upsell para a Comunidade (com texto e preço só no antes e depois, esperando o OK) e **desenhar tudo** (Miro). Medir no painel.
2. **VSL** (outra conversa, prompt E): refazer a do Movimento com as imagens e vídeos dela, texto modelado, áudio da Laüra, nossas provas; VTurb; colocar em /comunidade e, se o Patrik pedir, no resultado do quiz.
3. **Criativos de vídeo e imagem:** modelar o que escala (Movimento, Aline, Líbia, Elah: pegar da Biblioteca de Anúncios o formato, o gancho e a estrutura) com os ativos da Laüra e as provas; nada inventado; Patrik aprova antes de qualquer coisa subir.
4. **Painel completo** (quiz, página, funil pós-compra, upsell, bumps, gasto por promessa) e a compra de teste confirmando o rastreio.
5. **Só então as campanhas**: quiz e página, 1 conjunto por promessa, conta recomendada acima, pixel oficial/Purchase.
6. **Por último:** o app (outra oferta, outra conversa).

## Pendências do Patrik
Compra de teste no mensal pelo link do quiz e da página; escolher a conta de anúncio (recomendada acima); gravar/entregar os áudios e materiais da VSL e subir na VTurb; decidir upsell e bumps (com preço) quando eu mostrar; aprovar os criativos modelados.
