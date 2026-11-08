---
type: referencia
title: "Comunidade - página de vendas, Elah e mercado (08-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, pagina-de-vendas, concorrentes, elah]
keywords: [elah, flavia cristofaro, movimento, vsl, pagina de vendas, escala, biblioteca de anuncios]
created: 2026-11-08
updated: 2026-11-08
summary: "O que a página do app Elah faz (blocos, preço, garantia), quem está anunciando de verdade no mercado (datas da Biblioteca de Anúncios) e o que levar para a página de vendas com VSL da Comunidade."
---

Projeto: [[Corpo Feliz - Comunidade]] · Anúncios do Movimento: [[Comunidade - anúncios do Movimento]] · Funis dos outros: [[Comunidade - concorrentes]]

# Página de vendas com VSL: Elah e mercado (08/11/2026)
Pedido do Patrik: montar a página de vendas com VSL (vai entrar no teste também), usando a do Movimento, o que escala no mercado e a página do app Elah (https://elah-app.com). Patrik: "basicamente esse app é o que estamos modelando, mas isso é conversa pra depois".

## 1. Elah (elah-app.com), aberta em 08/11 no celular
Fonte: página aberta no navegador (texto, links e print inteiro) + Biblioteca de Anúncios da Meta (BR).
- **Quem:** Flávia Cristófaro, formada na USP, ex-atleta da Seleção de Ginástica Aeróbica, "mais de 5.000 alunas", "15 anos treinando mulheres". Página de anúncio "Elah App" e a pessoal "Flaviacristofaro".
- **Oferta (o que está na página):** "De 12x R$ 79,90 por apenas 12x R$ 59,70 ou à vista R$ 597,00". Só plano anual (FAQ: "Por que o plano é somente anual?"). Garantia de 7 dias. Botão leva a um checkout em clkdmg.site (plataforma não confirmada).
- **Não tem VSL de venda.** O vídeo é só 3 embeds do YouTube no meio (relatos; conteúdo não verificado). Tem selo "+5000 alunas" com App Store e Google Play.
- **Ordem dos blocos:** topo (promessa + selo) → alunas com antes e depois deslizante ("Elas perderam juntas mais de 70kg") → dois pilares (Fit em Casa, Academia Descomplicada, cada um com mock do app e botão) → relatos em vídeo → quem é a treinadora (matéria de jornal) → "Tudo que você recebe" (10 programas) → depoimentos em print → "Se você não tomar uma atitude… continuará frustrada, começando e parando" → preço → garantia de 7 dias → FAQ de 11 perguntas → WhatsApp.
- **As 10 entregas listadas:** Raio-X Elah (autoavaliação), Academia Descomplicada, Fit em Casa, Define em 20 (elástico, até 20 min), Respira e Queima Cardio, Destrava Mobilidade, Nutrição sem neura (planos + ebook), Diástase Zero (6 semanas), Fit em Casa Express (até 25 min), Comunidade Exclusiva (acesso direto à Flávia).
- **Rastreio da página:** GTM, Google Analytics, Clarity, Utmify.
- **O que NÃO pode ir para a nossa (regra da marca/Meta):** "perder até 5 kg em 60 dias", "perderam juntas mais de 70kg", antes e depois deslizante, matéria de jornal imitando portal.

## 2. Quem está anunciando de verdade (Biblioteca de Anúncios, BR, 08/11)
Datas vêm de `ad_delivery_start_time`. A ferramenta devolve no máximo 50 anúncios por busca; onde isso limitou, está dito.
- **Elah App (página do app):** 33 anúncios na biblioteca. 28 começaram em 06–07/11; 5 começaram por volta de 16/10. **Flaviacristofaro (página pessoal):** 8 anúncios antigos inativos de janeiro/2026 e, pelo menos, 22 novos de 06–07/11 (vi só 50 dos 75 das duas páginas juntas). Leitura: **lançamento grande em 2 dias (50+ anúncios), ainda sem tempo no ar para provar escala.** "Está vendendo" não dá para afirmar.
- **Com tempo no ar (já estava nas notas):** Movimento (27 anúncios desde 12–13/08, ~3 meses; VSL de 14 min, R$ 47,90/mês), Aline Pamplona (desde 19/09; hoje também "Grupo VIP da Black Emagreça+"), Líbia Resende (páginas de vendas com VSL de 2–3 min; ROAS 2,2–2,4 nas campanhas novas de nov).
- **Novos de 07–08/11, sem tempo para julgar:** Ritmu App (12 ativos, começaram 08/11, título "Comece sua transformação"), Shape Now (2 ativos, 07/11).
- **Internacionais com muito volume (USD, não são o nosso caso):** Yoga-Go (25+ anúncios, 07–08/11), WalkFit.
- Busca por "parar de recomeçar treino" não achou outro anunciante com a mesma promessa (69 resultados, quase todos de nutricionista/consultoria sem relação direta).
- Não consegui ver gasto nem venda de nenhum deles: a Biblioteca não mostra.

## 3. O que levar para a nossa página (proposta, sem copy nova ainda)
- Estrutura de página de venda com VSL no topo (Movimento e Líbia) + bloco de entregas em cartões (Elah) + garantia + FAQ.
- **Entregas e bônus:** a Comunidade já tem o que mostrar, e o Patrik pediu mais entregável: app com treino do dia, treinos de 3 e 5 min, Laüra e time no WhatsApp, Grupo das Musas, plano alimentar flexível, módulo LPF/diástase, mobilidade, desafio todo mês (capas dos 5 bônus em `public/images/comunidade/`, já usadas no quiz).
- **Preço em "por dia"** (Movimento e quiz): R$ 1,33 por dia, com a garantia de 15 dias e sem fidelidade.
- Mudar preço, garantia, link ou texto de oferta só com OK explícito do Patrik (regra de pagamento).
- Página /comunidade já existe: v1 no ar (#366) e v2 no PR #370 aguardando OK. "Montar a página" = fechar a v2 com VSL.

## Em aberto (Patrik)
1. "Entrar com teste": a página disputa tráfego com o quiz na mesma campanha (50/50) ou é uma campanha à parte?
2. VSL: gravar o roteiro v3 ([[Comunidade - roteiro da VSL v3]]) ou usar os áudios do prompt D? Hoje não há vídeo.
3. A página usa o mesmo checkout do mensal (yaG6FL)?
