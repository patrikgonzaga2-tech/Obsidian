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

## Decisões do Patrik (08/11, depois da análise)
- Campanha à parte para a página, teste igual ao do quiz, por promessa. O que se testa é o **formato de venda: quiz × página**, qual converte melhor. A página entrega **a Comunidade**, igual ao quiz (não vende o app).
- Checkout: o mesmo mensal do quiz (yaG6FL). A VSL é gravada em outra conversa e entra na VTurb.
- 3 promessas = as 3 capas do quiz (1 recomeçar, 2 fase da mulher, 3 joelho/lombar/diástase). Antes e depois "pode passar" (Patrik gostou do modelo do Elah); usa as 6 alunas da página da Black e o antes e depois da Laüra. Risco: o Meta também avalia a página de destino e os prints têm kg e prazo escritos.
- Elah: Patrik diz que escala (mais de 20 anúncios, mais de 30 dias). O que a Biblioteca mostra: mais de 50 anúncios nas duas páginas, o mais antigo visível de 15–16/10 (cerca de 23 dias).

## Quando o resto da página abre (VSL do Movimento, lido no código da página, 08/11)
- Movimento: `OFFER_SECONDS = 654` (10:54) de um vídeo de 14:26 (866 s) = 75,5%. Antes disso só aparecem título, subtítulo, vídeo e selos; botão do topo, faixa, todas as seções, preço, botão final e barra fixa ficam escondidos. Gatilho: evento `timeupdate` do smartplayer da VTurb. Salva `movOfferRevealed` no navegador (quem volta vê tudo) e abre sozinho se o player não responder em 25 s.
- Aline (já medido): VSL 1 libera "Continuar" aos ~100 s de 359 s; VSL 2 libera o botão aos ~300 s de 390 s (77%), com cronômetro.
- Líbia: não esconde nada (página aberta desde o início).
- Nossa página: mesmo gatilho (`REVEAL_SECONDS` em `app/comunidade/_dados.ts`), a definir quando a VSL estiver gravada, no segundo em que a Laüra apresenta a oferta. Sem VTurb configurada, a página abre inteira (prévia).

## Revisão das promessas e do topo (Patrik, 08/11: "não tô gostando dessas promessas… o foco da página de VSL não é ela ver a VSL? o mercado faz assim?")
**O que a base diz** (nota "Comunidade - voz da cliente", CRM, 1.269 leads, 08/11): o que a lead MAIS cita é estético (barriga 350, emagrecer/peso 321, definição 260, gordura localizada 203, flacidez 188, sedentarismo 185; compram 8–12%). O que MAIS compra por menção é comportamento (constância 25,5%, academia 25%, dor/lesão 25,9%, falta de tempo 25%, menopausa 20,8%), mas com poucas menções (24 a 51) e com viés (quem conversa mais cita mais coisas; "comprou" é teto). As promessas antigas (recomeçar / fase da mulher / joelho-lombar-diástase) vinham só da faixa "compra mais, menciona pouco". Diástase sozinha converte 6,9%.
**O que o mercado faz** (lido em 08/11): Movimento e Líbia têm só título, uma linha e o vídeo logo no início; nada de selos nem avisos embaixo antes da oferta (o Movimento esconde o resto). Os títulos são desejo + jeito que cabe na rotina: Movimento "Você está pronta. Só faltava o plano certo."; Líbia (ROAS 2,2–2,4) "…treinos de apenas 15 minutos em casa"; Elah "emagrecer e definir, em casa ou na academia, treino rápido".
**Promessas novas da página** (`HEROIS` em `app/comunidade/_dados.ts`): 1 "Secar e definir o corpo sem recomeçar toda segunda." (desejo + a promessa aprovada como mecanismo); 2 "Secar a barriga e definir o corpo com a Profe Laüra do seu lado." (o desejo que mais aparece); 3 "Treino de 3, 5 ou 15 minutos pros dias em que a rotina aperta." (tempo; combina com a Líbia e com a página da Black). Fase da mulher e dor/joelho/lombar/diástase saem desta rodada e ficam para o quiz.
**Topo:** logo pequena, título, uma linha e o vídeo; sem pílula, sem "ligue o som" (a VTurb já avisa) e sem selos. Botão e selos só aparecem junto com o resto, no momento da oferta.
**A confirmar:** os treinos de 3, 5 e 15 minutos existem para quem compra agora? (o relatório da promessa dizia que faltava carregá-los no app); o Meta pode reprovar "barriga" e o antes e depois na página de destino.
