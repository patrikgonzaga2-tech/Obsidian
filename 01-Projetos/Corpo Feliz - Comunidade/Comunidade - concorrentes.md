---
type: projeto
title: "Comunidade - concorrentes"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade]
keywords: [concorrentes, biblioteca, anúncios, pilates, libia, aline pamplona, movimento]
created: 2026-11-08
updated: 2026-11-08
summary: "Biblioteca de Anúncios e funis de concorrentes (08/11/2026)."
---

Projeto: [[Corpo Feliz - Comunidade]]

# Relatório de concorrência — Pilates em casa / Pilates asiático (para quiz da Laüra Rosa · Efeito Lipo 21D)

Data da coleta: 08/11/2026 (UTC). Tudo abaixo tem fonte (ID do anúncio, link, nome da página, número exato da API ou texto copiado da página). Onde não achei, está escrito "não encontrado" / "não verificado".

**Fontes e limitações de método (ler antes):**
- Biblioteca de Anúncios: ferramenta `ads_library_search` (país BR, status ACTIVE). A API devolve no máximo 50 anúncios por busca, **ordenados do mais novo para o mais antigo**, e **não devolve texto do anúncio nem link de destino** — só `page_name`, `ad_creative_link_title`, datas e `ad_snapshot_url`. Texto, CTA, link e duração de vídeo vieram de abrir o snapshot público (`facebook.com/ads/library/?id=ID`) no Chromium.
- "Anúncios ativos por página" = `estimated_total_count` da API filtrando `page_ids` + BR + ACTIVE (é estimativa da própria Meta).
- Contagens "por termo" = quantos dos 50 anúncios retornados pertencem a cada página (amostra dos mais recentes, não o total).
- Os snapshots públicos abriram com IP dos EUA; checkouts Hotmart/Kiwify mostraram preço em USD por geolocalização. Na Hotmart consegui trocar o país para Brasil e ler o preço em R$; na Kiwify (Aline) **não consegui** ver o preço em R$.
- Quizzes percorridos com Playwright (`devices['iPhone 13']`), escolhendo sempre a primeira opção; nada de pagamento foi preenchido. Onde o quiz pedia nome/e-mail/peso, preenchi valores de teste ("Teste", 165 cm, 70 kg, meta 60 kg, 35 anos).
- Screenshots: `/tmp/claude-0/-home-user/0a4958c4-7139-5230-ad25-17882bceb1fa/scratchpad/concorrentes/<funil>/stepNN.png` e `final_full.png`; log completo de cada passo (texto da tela, opções, cliques, tempo) em `<funil>/log.json`. Snapshots da Biblioteca em `/tmp/claude-0/-home-user/0a4958c4-7139-5230-ad25-17882bceb1fa/scratchpad/adlib/ad_<ID>.png`.

---

## 1. Biblioteca de Anúncios — o que aparece por termo (BR, ativos)

| Termo | Total estimado pela Meta | Páginas na amostra dos 50 mais recentes (nº de anúncios) |
|---|---|---|
| pilates em casa | 3.345 | Starvia: AI Product 28 (app, USD) · **Pilates na Parede** (page 1370975132767529) 10 · Luiza Pilates 3 · Pilates em Casa 2 · Pilates na Parede com Raquel 2 · Kslim 2 · Método Parede em Casa 1 · Pilates Sem Academia 1 · Rosa Atlântica Clube 1 |
| pilates asiático | 6 | **Pilates Asiáticos 28 dias** 4 · **Protocole Naturel** 2 |
| pilates na parede | 1.436 | Pilates na Parede (1370975132767529) 10 · **Bruna Carvalho** 10 · **Pilates Daniela Zanette** 7 · Agatha Mendes 5 · Ritmu App 5 · Luiza Pilates 3 · Pilates em Casa 2 · Raquel 2 · Fernanda Martins Pilates 2 · Método Parede em Casa 1 · Pilates Sem Academia 1 · Pilates na Parede (1170401032826140) 1 · Control Pilates 1 |
| wall pilates | 165 | 28 Day Challenge 11 · Lessie Fitness 8 · Centeriline Pilates 6 · 21 Day Challenge 4 · demais 1–2 cada (maioria app/estrangeiro, enfeites "Pilates Ornament") |
| pilates para iniciantes | 345 | Yoga-Go 27 · Starvia 11 · Essensia Wellness Brasil 5 · Kslim 4 · Lessie Fitness 2 · Studio Rita de Cassia 1 |
| quiz pilates | 896 | Liliia Fitness 15 · Pilates na Parede (1370975132767529) 10 · Lessie Fitness 8 · Control Pilates 7 · Ritmu App 5 · Pilates em Casa 2 · Mia Wilson 1 · 28-day Lymph Reset Plan 1 · 28-day Fascia Release Plan 1 |
| descubra seu tipo de corpo | 1.819 | Resultado dominado por anúncios de novelas/dramas (Greg Jackson, Rico e Romântico etc.). Fitness relevante: Aline Cardoso 5 ("Derreta com R$5 🔥"), Renato Cariani 2, Maria carmem 2. **Nenhum anunciante de pilates encontrado.** |
| barriga inchada treino em casa | 55 | **Polly Takao 30** · Dra. Liliane Aranda 4 · Fernanda martins 3 · Agatha Mendes 2 · Renuva 2 · Desafio Pilates na Parede 2 · Isadora Nogueira 2 · outros 1 |
| Aline Pamplona | 61 | Aline Pamplona - Corpo de Musa · Aline Pamplona · Aline Pamplona ESP |
| Líbia Resende | 182 | Libia Resende - Personal Trainer (todas as 50) |

### 1.1 Anúncios ativos por página (estimated_total_count, BR, ACTIVE) + anúncio ativo mais antigo visto

| Página (page_id) | Ativos | Mais antigo ativo que vi (ID · início) | Destino |
|---|---|---|---|
| Polly Takao (107376773956711) | **213** | 3163522307174974 · 24/09/2026 | click.mulheremforma.com (VSL "ASSISTA AGORA!" / oferta R$29,90) |
| Libia Resende - Personal Trainer (103956002608176) | **182** | (API só devolve os 50 mais novos; mais antigo visto: 4132586870381105 · 05/11/2026) | timelibiaintensivao.com.br (página de vendas c/ VSL) |
| Desafio Pilates na Parede (1347793168415658) | 59 | 2796979760696069 · 03/11/2026 | wvltrack.com → desafiopilates.com/q/simple (quiz) |
| Pilates Daniela Zanette (294904730371785) | 51 | — | WhatsApp |
| Aline Pamplona - Corpo de Musa (966902443182722) | 39 | 1808732140165188 · 20/10/2026 (via API) | quizalt / quizalt2.alinepamplona.com.br (quiz) |
| Fernanda Martins Pilates (1443073625559640) | 29 | — | pilatessnaparede.vercel.app (quiz) |
| Agatha Mendes (107673575242476) | 27 | — | WhatsApp |
| Aline Pamplona (1585248888224091) | 20 | **1102577608814444 · 19/09/2026** (confirmado no snapshot) | quizalt.alinepamplona.com.br |
| Bruna Carvalho (1380250098500922) | 20 | — | educaplus.shop/desafio-pilates (domínio exibido PILATESEMCASA.COM.BR) |
| Pilates na Parede (1370975132767529) | 17 | — | quiz.qualitylife.work (quiz) |
| Pilates em Casa (1370389516155038) | 12 | — | pilatesevida.site/quizbr (quiz) |
| Kslim (1104671302730378) | 12 | — | kslimoficial.com (quiz "Pilates Coreano") |
| Essensia Wellness Brasil (908452239008038) | 10 | — | inlead.digital/protocolo-japonesas (quiz) |
| Ritmu App (103437638018960) | 9 | — | protocolo-pilates.lovable.app (quiz) |
| **Pilates Asiáticos 28 dias** (1147500708457430) | 6 | **1349121777397270 / 1538347833989392 / 1401765435179624 / 28158730517147593 · 07/08/2026; 1049421714479614 / 1043326715076737 · 11/08/2026** | não verificado (snapshots dão "O anúncio não está na Biblioteca de Anúncios") |
| Luiza Pilates (1187784134417139) | 5 | — | parede-pilates-com-carinho.lovable.app |
| Pilates na Parede (1170401032826140) | 4 | — | programa-dr-larissa.lovable.app ("teste gratuito") |
| Aline Pamplona ESP (369469196240613) | 2 | 1304505412755322 · 10/10/2026; 1143735948179796 · 11/10/2026 | quizalt.alinepamplona.com.br |
| **Protocole Naturel** (103339864368904) | 2 | **1024179460098706 / 1293546112684974 · 02/07/2026** (mais antigos de todo o levantamento) | não verificado (snapshot indisponível) |
| Pilates na Parede com Raquel (516491894884107) | 2 | 08/11/2026 | WhatsApp |

Sinais de "vende" (tempo no ar + volume):
- **Protocole Naturel**: 2 anúncios de "pilates asiático" ativos desde 02/07/2026 (~4 meses). Headline: "Avaliação máxima!⭐️⭐️⭐️⭐️⭐️ Descobrir seu plano personalizado é grátis →".
- **Pilates Asiáticos 28 dias**: 6 ativos desde 07–11/08/2026 (~3 meses). Headline: "Avaliação máxima!⭐️⭐️⭐️⭐️⭐️ Descubra seu plano personalizado AGORA" (e "Avaliação máxima! ⭐⭐⭐⭐⭐ ✨ Descubra seu plano personalizado →" no 1349121777397270). Moeda USD. Texto/destino não visíveis no snapshot público.
- **Aline Pamplona**: 61 ativos somando 3 páginas; mesmo criativo/copy rodando desde 19/09/2026 (ID 1102577608814444) e replicado em 07/11/2026 (IDs 4699676803647151, 1883133299523743 etc.).
- **Polly Takao**: 213 ativos, anúncio de 24/09/2026 ainda ativo, Meta marca "Esse anúncio tem várias versões".
- **Líbia Resende**: 182 ativos (mais que qualquer página de pilates).

### 1.2 Copies literais (com ID, data de início, CTA e destino)

**Pilates na Parede (1370975132767529)** — IDs 1445877800987605 e 4491050974493508, início 08/11/2026, vídeos de 4:33 e 4:05, CTA "Saiba mais", domínio QUIZ.QUALITYLIFE.WORK, link `https://quiz.qualitylife.work/s/sc1eeb4ffd9`:
> Participe do Desafio 21 dias Pilates na Parede!
> 🌟 + Auto-estima e Qualidade de Vida
> 🙋 Alívio das Dores no Corpo
> 🔥 Alcance seu corpo em 3 semanas
> ✅ Exercícios Seguros, Fáceis e Eficazes
> 👉 Clique no botão "SAIBA MAIS" e comece hoje mesmo!

**Mesma copy (quase palavra por palavra) em outras 3 páginas** — sinal de que é copy "validada" e copiada no nicho:
- Pilates em Casa — 1190749013390716 e 2340789096737153 (08/11/2026), "Participe do Desafio 21d Pilates na Parede!…", título "Já imaginou ter o corpo do sonhos? 👉", link `https://pilatesevida.site/quizbr`.
- Desafio Pilates na Parede — 2796979760696069 (03/11/2026), vídeo 4:52, mesma copy, título "Já imaginou ter o corpo do sonhos? 👉", domínio PILATESEMCASA.COM, link `https://wvltrack.com/t/simple-vs-antes`.
- Fernanda Martins Pilates — 3271132036415407 e 2325548268265547 (07/11/2026), "Participe do Desafio 21 dias de Pilates Em Casa!…", título "Quer ter o corpo dos seus sonhos? 👉", descrição "Avaliação gratuita ⭐⭐⭐⭐⭐", link `http://pilatessnaparede.vercel.app/`.

**Aline Pamplona** — IDs 4699676803647151 (07/11/2026, vídeo 2:50), 1883133299523743 (06/11/2026, vídeo 1:53), 1102577608814444 (19/09/2026, vídeo 0:42), 1143735948179796 (ESP, 11/10/2026, vídeo 2:18), 1609574006885097 (04/11/2026, imagem). Título "Faça o teste do Corpo de Musa", CTA "Saiba mais", link `https://quizalt.alinepamplona.com.br/`:
> Durante 30 anos eu fui sedentária. Ganhei mais de 18kg na ansiedade e cheguei num ponto em que precisei decidir: continuar do mesmo jeito ou mudar de vez.
> Eu mudei. Eliminei 22kg com o básico que funciona de verdade. Sem dieta maluca, sem treino impossível e sem passar fome.
> Hoje eu ajudo milhares de mulheres a fazerem o mesmo dentro do Corpo de Musa. E tudo começa entendendo onde você está agora.
> Por isso eu preparei um teste rápido pra montar o seu ponto de partida e te mostrar qual o primeiro passo certo pra você.
> Leva menos de 2 minutos e o resultado sai na hora.
> 👇 Toque em "Saiba mais" e faça o seu teste agora.

Aline — ID 1833190751025228 (30/10/2026, imagem), título "Nenhum dos dois times vira musa", descrição "Planilha de 3 a 4 dias por semana", link `http://quizalt2.alinepamplona.com.br/`:
> Tem dois times de mulher na academia. E nenhum dos dois chega no corpo de musa. (…) Receba a sua planilha de treino Corpo de Musa, feita de acordo com a sua rotina e seu objetivo. 👇

Aline ESP — ID 1304505412755322 (10/10/2026, vídeo 1:25), sem texto, título "Topa esse desafio?", CTA "Ver detalhes", link quizalt.

**Líbia Resende** — ID 2991127877896859 (06/11/2026, vídeo 1:39), CTA "Saiba mais", link `https://timelibiaintensivao.com.br/desbloqueio/`:
> Não foi em academia que ela perdeu 17kg 🙆🏽‍♀️
> CLIQUE EM "SAIBA MAIS" se vocês tambem querem esse resultado?

Líbia — IDs 4132586870381105 (05/11/2026, vídeo 1:31) e 1618984082500093 (06/11/2026, vídeo 1:13), CTA "Ver detalhes", link `https://timelibiaintensivao.com.br/desafio1515?utm_source=FB…`:
> CLIQUE EM "SAIBA MAIS" e participe do Desafio 15x15.

**Kslim** ("pilates coreano") — ID 1112897121361015 (07/11/2026, vídeo 1:57), link `https://www.kslimoficial.com/index2-wiapy.html`, título "👉 Clique agora no botão Saiba Mais e faça o seu teste rápido de 2 minutos para descobrir.":
> Existe um motivo pelo qual as mulheres na Coreia do Sul mantêm a barriga tão plana e o abdômen firme sem precisar de treinos exaustivos... 🇰🇷✨
> Não é apenas genética. O segredo está em uma técnica específica de ativação profunda do core que leva apenas 10 minutos.
> Diferente do pilates tradicional, esse método ativa o músculo transverso do abdômen, que funciona como uma "cinta natural" esculpindo o corpo de dentro para fora. 🔒🧘‍♀️
> Nós unificamos essa técnica no Desafio K-Slim de 21 dias.
> Quer saber qual o nível de ativação atual do seu abdômen e receber o seu protocolo personalizado para começar? 🎯

**Essensia Wellness Brasil** — ID 1732247751592115 (07/11/2026, vídeo 1:41), título "Protocolo das Japonesas 40+ 🌸", descrição "Faça o teste e conheça seu plano de 21 dias 💗", link `https://inlead.digital/protocolo-japonesas`:
> Acelere o metabolismo e regule os hormonios e sinta-se mais leve em apenas 21 dias com o protocolo das japonesas
> ✋ Semana 1 – Adeus inchaço! Barriga mais lisa, digestão mais tranquila e apetite equilibrado. (…)

**Ritmu App** — ID 4648682705363316 (07/11/2026, vídeo 1:59), domínio exibido FLAVIAMARTINS.COM, link `https://protocolo-pilates.lovable.app/`, título "Comece sua transformação", "+94 mil downloads":
> Seu próximo desafio começa em casa: 21 dias de Pilates de Parede! 💚 (…) 👉 Toque em SAIBA MAIS, responda ao quiz gratuito e conheça o desafio!

**Pilates na Parede (1170401032826140)** — ID 1419290727024050 (08/11/2026, vídeo 1:03), título "Clique e faça o teste gratuito", link `https://programa-dr-larissa.lovable.app/`:
> ♀️ "É esse exercício que ativa o músculo responsável por deixar o bumbum redondinho e reduz medidas" (…) Com apenas 6 minutos por dia (…) 👉 Clique em "Saiba Mais" e pegue seu programa personalizado

**Luiza Pilates** — ID 1854182075763562 (07/11/2026, vídeo 0:10), link `https://parede-pilates-com-carinho.lovable.app/` — venda direta de "+30 Exercícios de Pilates na Parede / Fichas Ilustradas".

**Bruna Carvalho** — ID 1063658846686163 (07/11/2026, vídeo 0:35), título "COMECE AGORA 👉", link `https://educaplus.shop/desafio-pilates/`:
> 🌸 DESAFIO DE PILATES NA PAREDE – 28 DIAS! 🧘‍♀️ (…) ⏰ Apenas 30 minutos por dia 📲 Acesso vitalício, sem mensalidades 💖 Aulas pelo WhatsApp e e-mail

**Funil WhatsApp ("contribui se gostar")** — Pilates na Parede com Raquel (2087895311888592, 1147075064352532) e Método Parede em Casa (1645183353973432), 08/11/2026, vídeo 1:53, CTA "Enviar mensagem pelo WhatsApp":
> Pilates na parede em casa, com aulinhas de até 30 minutos 💜 Sem academia, sem equipamento, sem mensalidade. Eu te mando todas as aulas no WhatsApp primeiro e você só contribui se gostar. Toque no botão e me chama!

Pilates Daniela Zanette — 1667217011689281 (07/11/2026, vídeo 0:33), CTA WhatsApp, título "Eu Quero Receber 👇":
> Desafio Pilates em Casa — Sem Mensalidades! 🧘‍♀️ 🌅 Dia 1 — Disposição que eu já não lembrava 🦵 Dia 5 — Lombar e joelho pararam de reclamar 🪞 Dia 12 — A calça fechou sem prender a respiração 👑 Dia 21 — Todo mundo perguntando o que eu fiz (…)

**Apps internacionais em PT-BR (BetterMe)** — Lessie Fitness 39907860272163050 e Liliia Fitness 3293734491017513 (07/11/2026), domínios BETTERME-WALLPILATES.COM / BETTERME-PILATES-PLAN.COM:
> Alcance seus objetivos!💪 1️⃣ Faça um quiz de 1 minuto 2️⃣ Obtenha um programa Personalizado 3️⃣ Acompanhe o progresso e mantenha a motivação 4️⃣ Tenha resultados visíveis em 4 semanas! 😍

**Polly Takao** — 1145991127821557 (06/11/2026, vídeo 4:41), título "Últimas Vagas por R$29,90!":
> 💥Junte-se a nós e conquiste sua autoestima, por apenas R$29,90. O melhor desafio de emagrecimento do Brasil, 100% online. ⚠ Clique em saiba mais e faça sua inscrição.

Polly Takao — 3163522307174974 (24/09/2026, vídeo 2:45) e 1652524839872380 (28/10/2026), título "ASSISTA AGORA!":
> Se você já fez dieta, cortou carboidrato, foi pra academia e ainda assim não perdeu peso, não é culpa sua. Existe uma razão fisiológica para isso acontecer com o seu corpo, e nunca te contaram...até agora!

### 1.3 Padrões que se repetem (contados no que abri)
1. **Desafio com prazo em dias**: "21 dias" (Pilates na Parede, Pilates em Casa, Desafio Pilates na Parede, Fernanda Martins, Ritmu, Kslim "Desafio K-Slim de 21 dias", Daniela Zanette "Dia 21", Essensia "21 dias"); "28 dias" (Pilates Asiáticos 28 dias, Bruna Carvalho, BetterMe "4 semanas"); Líbia "15x15"/"15 dias"/"12 dias". 
2. **Quiz como ponte** ("teste", "avaliação gratuita", "plano personalizado"): Aline, Pilates na Parede, Pilates em Casa, Desafio Pilates na Parede, Fernanda Martins, Ritmu, Kslim, Essensia, Pilates na Parede (lovable "teste gratuito"), Pilates Asiáticos 28 dias e Protocole Naturel ("Descubra seu plano personalizado"), BetterMe.
3. **Prova social com estrelas no título**: "Avaliação máxima!⭐️⭐️⭐️⭐️⭐️" (Pilates Asiáticos 28 dias, Protocole Naturel), "Avaliação gratuita ⭐⭐⭐⭐⭐" (Fernanda Martins).
4. **Promessas "sem"**: "sem academia, sem equipamento, sem mensalidade" (Raquel, Método Parede em Casa, Daniela Zanette, Ritmu, Pilates na Parede lovable, Bruna Carvalho).
5. **Ângulo asiático/oriental**: "segredo das coreanas" (Kslim), "Protocolo das Japonesas 40+" (Essensia), "Chá Asiático Anticelulite" (bônus no quiz da Fernanda Martins), páginas "Pilates Asiáticos 28 dias".
6. **Copy reaproveitada**: o bloco "🌟 + Auto-estima e Qualidade de Vida / 🙋 Alívio das Dores no Corpo / 🔥 Alcance seu corpo em 3 semanas / ✅ Exercícios Seguros, Fáceis e Eficazes" aparece em 4 páginas diferentes (IDs acima) e os quizzes de 3 delas usam o mesmo template (ver seção 2).
7. **VSL vertical (vídeo de 1–5 min)** em quase todos os criativos abertos; Aline e Líbia usam vturb/converteai.


---

## 2. Quizzes percorridos (primeira opção sempre)

### 2.1 ALINE PAMPLONA — "Teste do Corpo de Musa" (quizalt.alinepamplona.com.br)
Fonte: anúncios 4699676803647151, 1883133299523743, 1102577608814444 (link `https://quizalt.alinepamplona.com.br/`). Rodei 2 vezes (pastas `aline_quizalt/` e `aline_quizalt_v2/`) e também `quizalt2` (anúncio 1833190751025228) — **quizalt2 é idêntico ao quizalt, passo a passo, e termina no mesmo checkout** (pasta `aline_quizalt2/`). O checkout tem `src=inlead3` na URL (plataforma de quiz provável: Inlead — não confirmado além do parâmetro). Página única (SPA), seta "←" de voltar no topo, sem barra de progresso numérica.

Tempo total até o checkout: **~504 s (8min24s)**, dos quais ~100 s presos no VSL 1 e ~300 s presos no VSL 2. 26 telas antes da VSL final.

| # | Tela (texto exato) | Opções exatas |
|---|---|---|
| 1 | "VOCÊ JÁ TREINA … MAS AINDA NÃO ESTÁ SECA E DEFINIDA?" / "Faça o teste rápido de 5 minutos e receba o seu Treino Corpo de Musa: um plano de 30 dias para secar e definir, com treinos rápidos de 3 a 4x por semana." | botão "INICIAR MEU TESTE AGORA!" |
| 2 | "Escolha seu objetivo" / "Isso vai ajudar a montar um Treino mais alinhado com o corpo que você quer construir." | Emagrecer · Perder a barriga · Ganhar massa muscular · Construir um Shape sequinho e definido |
| 3 | "Qual é a sua idade?" | 18 a 29 anos · 30 a 39 anos · 40 a 49 anos · 50 anos ou mais |
| 4 | (tela de argumento) "Construa um corpo mais sequinho, definido e sem flacidez com estratégia" … "treinando de 3 a 4 vezes por semana." | Continuar |
| 5 | "Qual é o seu físico atual?" | Magra · Normal, mas com flacidez · Com sobrepeso · Obesa |
| 6 | "O que você mais pretende alcançar com o Treino Corpo de Musa?" (múltipla) | Ter um corpo mais sequinho e sem flacidez · Ficar com mais disposição e energia · Perder gordura · Aumentar a autoestima · [Continuar] |
| 7 | "Você já treina hoje?" | ✅ Sim, já treino · 🚫 Não, quero começar |
| 8 | "Com que frequência você já treina?" | 2x por semana · 3x · 4x · 5x · 6x por semana |
| 9 | "Há quanto tempo você treina?" | Menos de 1 ano · De 1 a 2 anos · Mais de 3 anos · Nunca treinei |
| 10 | "Qual é o seu maior desafio hoje?" | Treino há um tempo, mas estou longe do corpo que quero · Até melhorei meu corpo, mas ainda tenho barriga e pouca definição · Não consigo ganhar massa muscular, mesmo me esforçando · Minha rotina e meu trabalho atrapalham minha constância · Eu treino, mas as pessoas nem percebem diferença no meu corpo |
| 11 | (história/empatia) "Eu te entendo…" / "Eu era a pessoa que treinava, me esforçava e mesmo assim o shape não vinha..." / "Não é sobre idade ou genética / Eu mesma, já tenho mais de 40 anos." / "Com o Corpo de Musa tudo vai mudar!" | EU QUERO ISSO! |
| 12 | "Como é sua rotina no dia a dia?" | Corrida: mal tenho tempo para respirar · Agitada: consigo encaixar o treino, mas é difícil · Equilibrada: tenho tempo de me organizar · Tranquila: tempo não é meu problema |
| 13 | "Qual é o físico que você quer ter?" (com imagens) | Slim · Magra com músculos · Mewtwo · Cavalona |
| 14 | "Quanto tempo você consegue dedicar ao treino por dia?" | Menos de 30 minutos · Entre 30 e 50 minutos · Mais de 50 minutos |
| 15 | "Quais músculos são mais importantes para você?" (múltipla) | Ombros e braços · Abdômen · Costas · Pernas · Glúteos · [Continuar] |
| 16 | "Você já conhece o Corpo de Musa?" (explica: treinos de ~40 min, 3–4x/semana) | ✅ Já conheço sim · 🚫Quero conhecer agora! |
| **17** | **VSL 1 (no meio do quiz):** "Veja em 2 minutos como o seu treino será montado" / "Ligue o som e assista rapidinho e toque em continuar para finalizar o seu plano." Player vturb `6a7cf397e5d2f186aca237ff`, vídeo vertical da Aline falando. **Duração do vídeo no HLS: 359,3 s (5min59s). Botão "Continuar" só aparece depois de ~100 s** (medido 2 vezes: apareceu entre 95 e 100 s). | Continuar (com delay) |
| 18 | "Agora me diz... qual é a sua altura?" (régua arrastável, padrão 180cm) | cm / pol + Continuar |
| 19 | "Qual é o seu peso atual?" (régua, padrão 70kg) | kg / lb + Continuar |
| 20 | "Qual peso você deseja atingir nos próximos 30 dias?" (régua) | kg / lb + Continuar |
| 21 | Prova social: "Tenho certeza que você vai conseguir!" / "Além de confiar no que eu falo, também confie no que as minhas alunas já conquistaram..." / "Essas são pessoas reais, com rotina real..." (imagens de alunas) | Continuar |
| 22–25 | Loading: "Montando o seu Treino do Corpo de Musa..." 22% → 47% → 72% → 98% com checks "✅ Analisando seu físico atual...", "✅ Identificando seu objetivo principal...", "✅ Preparando seu plano de 30 dias...", "✅ Finalizando a análise…" (~10 s) | — |
| 26 | **Resultado:** "VOU TE AJUDAR A ALCANÇAR 70 NO MENOR TEMPO POSSÍVEL!" / "Com base nas suas respostas, o Treino Corpo de Musa é ideal para o seu tipo físico, sua rotina e o objetivo…" / Altura, Peso Atual, Meta de Peso / gráfico Hoje→Amanhã→Dia 7→14→21→30 "Você hoje → Meta" | Continuar |
| 27 | "Um plano de 30 dias é o que você precisa!" / antes×depois "AGORA / META": "Essa é você antes do Corpo de Musa — Seu shape e sua evolução estão travados" × "Essa é você depois… — Aqui seu corpo começa a ganhar forma, definição e mais presença" | GARANTIR MEU PLANO! |
| **28** | **VSL 2 (oferta):** "CONDIÇÃO ESPECIAL DE BLACK ANTECIPADA!" + **cronômetro 10:00** (09:58 ao abrir) / "Assista ao vídeo abaixo para liberar o seu Treino Corpo de Musa..." / "Veja esse vídeo até o final para entender o próximo passo e receber o seu plano para os próximos 30 dias." Player vturb `6a7cf4dd03e62628fd166f0a`. **Duração no HLS: 390,1 s (6min30s). Botão "GARANTIR MINHA VAGA!" apareceu após ~300 s (5 min)** — na tela, o cronômetro marcava 04:55. | GARANTIR MINHA VAGA! |
| 29 | Checkout Kiwify `https://pay.kiwify.com.br/kRM1Enm?src=inlead3` — timer "Oferta por tempo limitado" 05:00 | — |

Preço/oferta: **preço em R$ não verificado** (checkout geolocalizou para EUA). O que vi: "$7.00" + "$0.40" de imposto = "Pay $7.40". Na API pública do link (`checkout-api.kiwify.com.br/link/kRM1Enm`): produto `"Shape de Musa [SM] -|- Quiz"`, `price: 700`, `max_installments: 1`, `bumps: []` (sem order bump), produtor "Aline Pamplona", empresa "A&W DIGITAL FITNESS LTDA". Garantia: não aparece no texto do checkout nem nas telas do quiz (não encontrado). Não há página de vendas longa: a "página de vendas" é a VSL 2.

**O que copiar da Aline (fatos):** VSL curta *no meio* do quiz como "explicação de como o treino será montado" com botão travado ~100 s; segunda VSL só na oferta com cronômetro e botão travado ~5 min; resultado com números da própria pessoa (altura/peso/meta + gráfico de 30 dias); antes×depois "AGORA/META"; nenhuma captura de e-mail/nome no quiz.

### 2.2 Template "Pilates na Parede · 40 perguntas" — Fernanda Martins Pilates (pilatessnaparede.vercel.app) e Pilates na Parede/qualitylife (variante pilates-pro-v3)
Fonte: anúncios 3271132036415407 / 2325548268265547 (Fernanda Martins) e 1445877800987605 / 4491050974493508 (Pilates na Parede, link `quiz.qualitylife.work/s/sc1eeb4ffd9`). O qualitylife faz **A/B split** (parâmetros `ab_split`/`ab_variant`) entre `quizzes/pilates-wall-v1` (no nosso navegador deu "Application error: a client-side exception has occurred" — não consegui percorrer) e `quizzes/pilates-pro-v3`, que é **o mesmo quiz do Fernanda Martins** (mesmas 40 telas, mesmos depoimentos). Contador "N/40" no topo. Rodapé "Este site não é afiliado ao Facebook ou a qualquer entidade do Meta." Sem VSL. Tempo até a oferta: ~152 s.

Telas (Fernanda Martins; pastas `fernandamartins_vercel/` e `pilatesnaparede_qualitylife_pro/`):
1/40 "Qual sua idade?" (18 - 29 · 29 - 39 · 39 - 49 · + 50 anos) → 2 "Mais de 500,000 mulheres em seus 20 anos já experimentaram o nosso plano…" → 3 "Você já experimentou treinos de pilates na parede antes?" (Sim, já experimentei · Não, eu nunca experimentei) → 4 "Você vai arrasar!…" → 5 "Qual é o seu principal objetivo?" (Perder peso · Aumentar a força muscular · Desenvolver flexibilidade · Reduzir o stress e ansiedade · Melhorar a postura) → 6 "Como você descreveria seu físico?" (Magro · Médio · Maior · Com excesso de peso) → 7 "Qual é o seu 'corpo dos sonhos'?" (Magro · Definido · Com curvas · Médio) → 8 "Como seu peso muda tipicamente?" → 9 "Há quanto tempo você esteve no melhor físico da sua vida?" → 10 "Você se considera flexível?" → 11 "Quais são suas regiões de foco?" (Barriga · Glúteos · Pernas · Peito) → 12 "Você tem dificuldade com algum dos itens abaixo?" (Costas sensíveis · Joelhos sensíveis · Nenhum) → 13 "Nós te ajudamos!" → 14 "Você perde o fôlego quando sobe escadas?" → 15 "Quantas vezes você faz exercício?" → 16 caminhadas → 17 rotina de trabalho → 18 dia típico → 19 energia → 20 "O pilates na parede ajudar você a se sentir estável com sua energia" → 21 água → 22 sono → 23–25 horários de café/almoço/jantar → 26 tipo de dieta → 27 eventos que levaram a ganho de peso → 28 altura (régua, "☝️ Calculando seu índice de massa corporal") → 29 peso ("Seu IMC estimado: 25.7 (Sobrepeso)") → 30 peso ideal → 31 idade (campo) → 32 "Você tem algum evento importante pela frente?" → 33 loading "Analisando o seu perfil..." + "nossos usuários perderam em média 14+ kg 🤩" + "RESULTADOS DE ALUNAS REAIS 4.9/5" (Rafaela, Vanessa "Perdi 6kg em duas semanas", Camila) → 34 **"O último plano que você precisará para ficar em forma / Prevemos que você estará com 60 kg em até 21 dias"** + gráfico "Pilates na Parede vs Outros Métodos" → 35 "Quanto tempo você deseja dedicar em seu corpo no dia?" (5 · 10 · 15 · 30 minutos) → 36 dias por semana (2 · 3 · 5 vezes) → 37 loading "Criando seu plano…" "8 milhões de pessoas escolheram o Pilates na Parede" → 38 "Qual é o seu nome?" → 39 "CURVA DE EVOLUÇÃO RÁPIDA… 70 kg Semana 1 → 65 kg Semana 2 → 60 kg 🏆 Semana 3" → 40 **oferta**.

Oferta (texto literal, Fernanda Martins): "Seu plano de treino personalizado de Pilates na parede está pronto! / ESSE DESCONTO ACABARÁ HOJE! / Pilates em Casa / **R$ 127,00 → R$ 27,00** / VITALÍCIO / Apenas pagamento único / R$ 0,96 POR DIA / Acesso imediato e vitalício no seu celular / Treinos rápidos de 15 minutos sem equipamentos / Garantia incondicional de 7 dias…". Mais abaixo repete com "R$ 147,90 → R$ 27,00", depoimentos "Marta -9kg em 17 dias / Adriana -9kg em 19 dias / Juliana -6kg em 14 dias", bônus ("Chá Asiático Anticelulite", "Dieta 100% Personalizada", "Cronograma de Reeducação Alimentar", "Suporte 24h") e **"Garantia de 90 Dias"** (a página cita 7 e 90 dias). Na variante qualitylife o preço é **R$ 127,90 → R$ 27,90** (e "R$ 147,90 → R$ 27,90").
Checkout (Fernanda Martins): **Wiapy** `https://pay.wiapy.com/o6-eSTM2d1FG`, "R$ 27,00 À VISTA NO PIX", notificação "🟢 Tatiane M. de Florianópolis acabou de garantir o plano · há 42 min", **5 order bumps**: "💖21 exercícios para eliminar a diástase" De R$ 19,90 Por R$ 5,90 · "🩷 Protocolo lombar sem dor em 7 dias" De R$ 23,90 Por R$ 5,90 · "🍑 Protocolo empina bumbum" De R$ 29,90 Por R$ 5,90 · "Acesso Premium via WhatsApp" De R$ 14,90 Por R$ 2,90 · "🎁 Leve os 4 Bônus e Economize 40%" De R$ 20,60 Por R$ 12,36. Checkout da variante qualitylife: não capturado.

### 2.3 Template "Desafio de 21 dias de Pilates na Parede" (cópia do funil de app) — Pilates em Casa (pilatesevida.site/quizbr), Ritmu App (protocolo-pilates.lovable.app) e Desafio Pilates na Parede (desafiopilates.com/q/simple)
Fonte: anúncios 1190749013390716 / 2340789096737153 (Pilates em Casa), 4648682705363316 (Ritmu App), 2796979760696069 (Desafio Pilates na Parede; o link `wvltrack.com/t/simple-vs-antes` redireciona para `desafiopilates.com/q/simple?…&wl_test=simple-vs-ant…`, ou seja, A/B test). **As três páginas usam o mesmo quiz** (mesmos textos, mesmo seletor "PT/EN", seções "MEU PERFIL / MEU PLANO / LIFESTYLE / NUTRIÇÃO / SAÚDE E SEGURANÇA / QUASE LÁ"). Sem VSL. É o quiz mais longo: **~80 telas, ~300 s** até a oferta (Ritmu: oferta no passo 81, 301 s). Pastas `ritmu_lovable3/`, `pilatesemcasa_pilatesevida3/`, `desafiopilatesnaparede_wvltrack/`.

Sequência (literal, resumida por bloco):
- Abertura: "PILATES NA PAREDE / DESAFIO DE 21 DIAS DE PILATES NA PAREDE / COM BASE NA SUA IDADE" — Idade: 18-29 · 30-39 · 40-49 · 50+.
- "Você já praticou pilates contra a parede?" (Sim · Não) → "Você vai arrasar!…" (Entendi).
- MEU PERFIL: foco (Perder peso · Definir o corpo e manter o peso · Melhorar minha postura · Reduzir o estresse · Melhorar minha flexibilidade · Aumentar minha energia · Não tenho certeza) → "Como você descreve o seu corpo?" (Magro · Médio · Cheinho · Plus size) → "corpo dos sonhos" (Magro · Definido · Com curvas · Algumas medidas a menos) → áreas (Barriga · Glúteos · Pernas · Braços · Todo o corpo) → variação de peso → melhor forma → dia normal → atividades → caminhadas → "Você consegue se sentar e tocar a ponta dos seus pés?" → "Estamos aqui para te apoiar!" → 3 afirmações Sim/Não ("Fico sem fôlego ao subir um lance de escada", "Eu costumo desistir facilmente…", "Não sei bem como escolher exercícios…") → "Boa notícia: você pode participar do programa!" → altura (cm, com aceite LGPD) → peso atual → peso desejado → "Processamento preliminar".
- **Diagnóstico 1:** "Seu ponto de partida / Índice de Massa Corporal (IMC) / Você - 25.7 / … 👍 IMC saudável / NÍVEL DE ATIVIDADE FÍSICA Iniciante / ESTILO DE VIDA … / ZONAS-ALVO Barriga, Glúteos / META Perder 10 kg".
- MEU PLANO: intensidade, frequência, duração (10 a 15 · 15 a 25 · 25+ minutos), dores (Coluna frágil · Dor nos joelhos · Rigidez nos quadris), celulite, local, "Gosta ou não gosta" (Alongamento · Afundo · Agachamento na parede · Agachamento) → **"Detalhes do seu programa"** (local, duração, frequência, foco).
- LIFESTYLE: água, energia, menstruação, sono → NUTRIÇÃO → SAÚDE E SEGURANÇA (hábitos) → **Diagnóstico 2: "Seus bloqueadores de perda de peso… Maus hábitos de sono 38% / Alimentação emocional 27% / Sobrecarga e estresse 22% / Autocrítica 13%"** → doenças, transtorno alimentar, medicamentos, gravidez, mobilidade, **menopausa** ("Perda de peso em cada etapa da vida") → QUASE LÁ (motivação, gatilhos, "Por que as pessoas desistem…") → "Seu plano de ação está pronto!" (ritmo) → loading "1.8 mi de mulheres usam o Pilates na Parede / EMPRESA VERIFICADA / Trustpilot • Ideal • 21.269 avaliações".
- **Captura de e-mail** ("Insira o seu e-mail para receber o seu programa de treino personalizado") → "Conheça sua futura versão" (peso 70→60 kg, gordura 27-32% → 14-20%) → **nome** → "Teste, alcance seu objetivo de 60 kg até 29/30 de novembro" → "Só 10 minutos por dia…".
- **Oferta (Ritmu/lovable, literal):** "Teste, raspe para revelar seu desconto especial! … 75% OFF no seu Plano Pessoal / Raspe para revelar / 75% de desconto reservado por: 10:00" → "GARANTA SEU PLANO PESSOAL AGORA 75% OFF! / Oferta válida por 10:00 / ✦ Recomendado pra você / ⏰ ESSE DESCONTO ACABA HOJE / DESAFIO 28 DIAS / ∞ PLANO VITALÍCIO / **R$ 150,99 R$ 37,90** / R$ 4,66 / R$ 1,23 por dia / **GARANTIA DE REEMBOLSO DE 90 DIAS** / 🎁 75% DE DESCONTO ADICIONADO / OBTER MEU PLANO PERSONALIZADO / Pagamento único sem mensalidades…". Prova: "Mais de 15 milhões de pessoas…", "★★★★★ 4,8 de 5 App Store Google Play", "Mais de 351.000 avaliações de 5 estrelas", depoimentos "-5 kg em apenas 14 dias Márcia R., 46 anos", "-7 kg em apenas 21 dias Ana Paula T., 29 anos", "-9 kg em apenas 28 dias Agatha L., 33 anos". Checkout **Kirvano** `pay.kirvano.com/f80ddaea-…?src=quizsimple&quiz_version=simple` (bloqueado por verificação Cloudflare no nosso navegador — preço no checkout e order bumps não verificados).
- **2.3b Oferta Pilates em Casa (pilatesevida.site/quizbr) — mesma raspadinha 75% OFF + timer 10:00, mas com 2 planos e popup de upgrade** (passos 81–85, ~335 s até o checkout):
  - "Escolha o seu plano / Pagamento único, sem mensalidades. Acesso imediato pelo app."
  - "MAIS ESCOLHIDO · PLANO COMPLETO / **Plano Avançado** -75% **R$ 191,60 → R$ 47,90** / Pagamento único · equivale a R$ 2,28 por dia" — Desafio Pilates na Parede 21 dias; Treinos guiados de 15 e 20 minutos por dia; Acesso imediato pelo app; Plano personalizado para o seu objetivo; Protocolo Barriga Chapada; Cardápio Anti-inflamatório; Acesso vitalício e novas aulas.
  - "**Plano Básico** -75% **R$ 71,60 → R$ 17,90** / equivale a R$ 0,85 por dia" — só os 3 primeiros itens ("Não incluído:" nos demais). "GARANTIA DE REEMBOLSO DE 90 DIAS".
  - Ao clicar no Básico abre popup (screenshot `pilatesemcasa_pilatesevida3/step84.png`): "Oferta liberada só nesta tela / **Espere! Leve o Plano Avançado por quase o mesmo preço** / Por apenas R$ 10,00 a mais que o Básico, você recebe o programa completo. / De R$ 47,90 **R$ 27,90** pagamento único / 42% OFF" → botões "Sim, quero o Avançado por R$ 27,90" / "Não, quero só o Básico por R$ 17,90".
  - Checkout **Cakto** `pay.cakto.com.br/3c2xqyk_1263342?…&src=quizbr_avancadoDesconto` (já vem com nome/e-mail do quiz na URL): "15:00 Oferta por tempo limitado / Protocolo Pilates na Parede **R$ 27,90** / Taxa de serviço R$ 0,99 / Total R$ 28,89", formas Cartão/PIX/PicPay, **1 order bump**: "📲 Receba todo Protocolo diretamente no Whatsapp — R$ 5,90", "Garantia de 90 dias", depoimento "Perdi 6kgs com o Pilates na Parede!… Marcia Dias".

### 2.4 Kslim — "Pilates Coreano / Método K-Slim" (kslimoficial.com) — ângulo asiático
Fonte: anúncio 1112897121361015 (07/11/2026), link `https://www.kslimoficial.com/index2-wiapy.html`; página Kslim (1104671302730378) com 12 ativos. Sem VSL. Barra de progresso em % e seções "Meu Perfil / Atividade / Meu Plano / Estilo de Vida / Quase Lá". ~63 telas, ~255 s até a raspadinha. Pasta `kslim_coreano2/`.
- Capa: "⭐⭐⭐⭐⭐ 4.9 / Mais de 2 milhões de mulheres já descobriram / O segredo das coreanas para afinar sem academia. / COMEÇAR MEU TESTE GRÁTIS → / ⚡ Quiz 100% gratuito — leva menos de 2 minutos".
- Perguntas (exemplos literais): "Quantos anos você tem?" (18 – 35 · 36 – 45 · 46 – 55 · 56 anos ou mais) → "Você está no caminho certo! Mais de 12.000 mulheres…" → "Você já ouviu falar no Pilates Coreano ou já tentou praticar?" (✅ Sim, já pratico com regularidade · 🔄 Já tentei algumas vezes, mas parei · 👂 Ouvi falar, mas nunca tentei · 🆕 Nunca tinha ouvido falar até agora) → "Qual é o seu principal objetivo com o Método K-Slim?" (⚖️ Perder peso e desinchar · 💪 Tonificar e definir o corpo · 🧘 Melhorar a postura e flexibilidade · ⚡ Ter mais energia e reduzir o estresse) → tela-mecanismo "Por que o Método K-Slim funciona diferente? … Ativação Gi — o reequilíbrio da energia vital do corpo, conforme ensinado pela medicina coreana há séculos" → corpo hoje (Magra · Normal · Curvilínea · Obesa) → resultado desejado (Tonificada · Curvilínea · Atlética · K-Slim) → áreas (Barriga e flancos · Glúteos · Coxas e quadris · Braços e ombros) → altura → peso → **"Seu perfil corporal foi calculado… Seu IMC está em 25.7 — Sobrepeso. Isso significa que o seu corpo pode estar em modo de retenção."** → peso meta → "Veja o que o Método K-Slim pode fazer por você… perder 10 kg em 12 semanas praticando… apenas 10 minutos por dia" → bloco Atividade (sedentarismo, flexibilidade, frequência, fôlego, desistência) → telas educativas ("Por que 10 minutos de K-Slim valem mais que 1 hora de academia", "O estresse engorda — e o K-Slim resolve isso", "Dormir mal sabota…", "O que as coreanas comem…") → "GOSTA OU NÃO GOSTA?" (6 exercícios, incluindo "Movimentos de dança (K-body dance)") → saúde/segurança → motivação → "Seu plano K-Slim está pronto!" → **nome** → "Resumo do Perfil… VOCÊ HOJE 70kg VS SEU FUTURO 62kg… Cortisol: Redução estimada em 46%" → **e-mail** → **raspadinha** ("Recompensa Oculta… PARABÉNS Teste!… Raspe o cartão… VOCÊ GANHOU 75% OFF").
- A raspadinha redireciona por variante (código da página: `pv-v2.html`, `pv-wiapy-pj.html`, `pv-wiapy.html`, `pv.html`). Abri `pv-wiapy.html`: timer 14:45, "8 vagas", "Codigo KSLIM75 validado", "204 planos vendidos na ultima hora", "O Aplicativo K-Slim completo com o Desafio de 21 Dias", "Mais de 50 rotinas em vídeo", "Guia Alimentar (Semáforo K-Slim)", "E-book Oficial K-Slim", **"Preco normal de mercado: R$ 197,00 → R$ 37,00 pagamento unico / Ou 9x de R$ 5,36 no cartao"**, **"GARANTIA DE 30 DIAS"**, botão "QUERO DESBLOQUEAR MEU PLANO AGORA" → checkout **Wiapy** `pay.wiapy.com/ENXyMIdcMWfr` (não aberto; bumps não verificados).

---

## 3. Líbia Resende — números reais das contas (somente leitura)

Fonte: `ads_get_ad_entities` nas contas **3585993534966059 (C1 - LIBIA RESENDE)** e **3599931560286329 (C3 - LIBIA RESENDE)**. Moeda BRL. "ROAS" = `purchase_roas` (valor de compra atribuído pela Meta ÷ gasto). Período "90 dias" = time_range 2026-08-10 a 2026-11-08. "Máximo" = date_preset maximum. Nada foi alterado nas contas.

### 3.1 Totais por conta

| Conta | Período | Gasto | Compras | ROAS | Custo/compra | Cliques no link | LPV | Checkouts iniciados |
|---|---|---|---|---|---|---|---|---|
| C1 | 90 dias | R$ 179.365,16 | 8.308 | 1,48 | R$ 21,59 | 186.655 | 156.764 | 27.778 |
| C1 | máximo | R$ 678.731,39 | 28.329 | 1,42 | R$ 23,96 | 1.074.959 | 541.322 | 99.240 |
| C3 | 90 dias | R$ 18.226,30 | 752 | 1,39 | R$ 24,24 | 18.922 | 15.667 | 2.654 |
| C3 | máximo | R$ 26.537,99 | 781 | 1,12 | R$ 33,98 | 22.811 | 18.391 | 2.753 |

**Conclusão factual: em nenhuma das duas contas o ROAS agregado chega a 2.** O que dá ~2 hoje é um grupo específico de campanhas da C3 (abaixo).

### 3.2 Onde está o "ROAS 2": campanhas novas da C3 (criadas 01–07/11/2026, todas para o "Desafio 15x15")

Soma das 26 campanhas "PTK - 0x/11…" da C3 nos 90 dias (todas começaram em novembro): **gasto R$ 9.055,37 · 712 compras · ROAS ponderado 2,40 · custo/compra R$ 12,72** (cálculo: Σ(ROAS×gasto)/Σgasto com os números da API). As 4 maiores:

| Campanha (ID) | Status | Gasto | Compras | ROAS | CPA | Checkouts |
|---|---|---|---|---|---|---|
| PTK - 01/11 - PUBLICO ABERTO - CRIATIVO 1 A 10 GRAMADO (120253074296600114) | ACTIVE | R$ 2.690,72 | 197 | 2,23 | R$ 13,66 | 839 |
| PTK - 01/11 - PUBLICO ABERTO - CRIATIVO 1 A 10 GRAMADO — Cópia (120253107569610114) | ACTIVE | R$ 2.087,82 | 150 | 2,21 | R$ 13,92 | 575 |
| PTK - 05/11 - PUBLICO ABERTO - 1 CRIATIVO POR CONJUNTO GRAMADO (120253143974910114) | ACTIVE | R$ 1.171,64 | 84 | 2,15 | R$ 13,95 | 292 |
| PTK - 01/11 - PUBLICO ABERTO - TODOS OS CRIATIVOS (120253056330030114) | ACTIVE | R$ 383,31 | 36 | 2,91 | R$ 10,65 | 130 |

Campanhas de 1 criativo (01/11), ~R$ 126–132 de gasto cada: CRIATIVO 1 ROAS 3,90 (16 compras) · CRIATIVO 2 3,62 (15) · CRIATIVO 3 3,58 (15) · CRIATIVO 4 3,25 (16) · CRIATIVO 5 2,82 (11) · CRIATIVO 6 2,97 (12) · CRIATIVO 7 2,90 (13) · CRIATIVO 8 3,86 (15). Testadoras ABO 04/11: "4 CRIATIVOS" R$ 300,80 / 28 compras / ROAS 2,83; "2 CRIATIVOS" R$ 214,81 / 15 / 2,27. Volume ainda pequeno (no máximo 8 dias de dados).

Anúncios C3 com mais gasto (90 dias):

| Anúncio (ID) | Conjunto | creative_id | Gasto | Compras | ROAS | CPA |
|---|---|---|---|---|---|---|
| CRIATIVO 5 — Cópia (120253074349170114) | PUBLICO ABERTO - CRIATIVO 6 | 4742662706017420 | R$ 903,42 | 67 | 2,14 | R$ 13,48 |
| CRIATIVO 5 — Cópia (120253074348990114) | PUBLICO ABERTO - CRIATIVO 7 | 1783507649567850 | R$ 783,15 | 52 | 2,06 | R$ 15,06 |
| CRIATIVO 7 — Cópia — Cópia (120253107570210114) | CRIATIVO 2 — Cópia | 993265240500000 | R$ 427,57 | 26 | 1,93 | R$ 16,45 |
| CRIATIVO 7 (120253144021900114) | CRIATIVO 7 | 1013445885108073 | R$ 416,21 | 33 | 2,35 | R$ 12,61 |
| CRIATIVO 5 (120253144018430114) | CRIATIVO 5 | 1783507649567850 | R$ 301,42 | 15 | 1,62 | R$ 20,09 |
| CRIATIVO 5 (120253056333610114) | TODOS OS CRIATIVOS | 1683868833278381 | R$ 211,32 | 20 | 3,00 | R$ 10,57 |
| CRIATIVO 5 — Cópia — Cópia (120253107570300114) | CRIATIVO 3 — Cópia | 1878258359830926 | R$ 173,42 | 24 | 4,27 | R$ 7,23 |
| VIDEO / CRIATIVO 9 (120253123694140114) | ABERTO / 18-65+ / BRASIL / CRIATIVO 9 | 3115268055483888 | R$ 77,64 | 11 | 4,10 | R$ 7,06 |

**Texto exato de TODOS esses criativos C3** (ads_get_creatives, 15 creative_ids consultados): body = `CLIQUE EM "SAIBA MAIS" e participe do Desafio 15x15.` · title vazio · CTA `SEE_DETAILS` ("Ver detalhes") · object_type VIDEO. Ou seja: a copy é mínima; quem vende é o vídeo.
**Destino** (preview_url → HTML → `l.facebook.com/l.php?u=` decodificado): `https://timelibiaintensivao.com.br/desafio1515?utm_source=FB&utm_medium={{placement}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.id}}`.

### 3.3 O que NÃO funcionou na C3 (campanhas arquivadas "[VSL - ABERTA]", jul–ago/2026)
23 campanhas "[VSL - ABERTA] - PTK - …" (ARCHIVED) com gasto nos 90 dias: **R$ 9.169,18 · 40 compras · ROAS ponderado 0,39** (cálculo sobre os números da API). Ex.: "[VSL - ABERTA] - PTK - 24/07 - ABERTO - ST 1 A 4" (120251294933480114) R$ 3.262,13 / 21 compras / ROAS 0,54; "[VSL - ABERTA] - PTK - 30/07 - ABERTO - ST 1 - 2 - 4" (120251456088390114) R$ 2.515,33 / 9 / 0,27. Destino dessas campanhas: não verificado (não puxei preview delas). Somando os dois grupos dá R$ 18.224,55 e 752 compras, batendo com o total da conta.

### 3.4 C1 — volume grande, ROAS 1,3–1,75 (página "Intensivão do Desbloqueio")
Campanhas C1 por gasto nos 90 dias (todas com nome "PTK"):

| Campanha (ID) | Status | Gasto 90d | Compras | ROAS | CPA |
|---|---|---|---|---|---|
| PTK - 16/07 - ABERTO - AD - 78 a 86 (120248175789230482) | ACTIVE | R$ 43.958,48 | 2.070 | 1,50 | R$ 21,24 |
| PTK - 24/05 - RMKT - CARRINHO ABANDONADO - TODOS (120244807042280482) | ACTIVE | R$ 31.109,88 | 1.379 | 1,40 | R$ 22,56 |
| PTK - 06/08 - ABERTO - AD - 96 (120248746743550482) | PAUSED | R$ 24.632,41 | 1.052 | 1,38 | R$ 23,41 |
| PTK - 06/08 - ABERTO - AD - 95 (120248746743580482) | ACTIVE | R$ 23.909,99 | 1.326 | 1,73 | R$ 18,03 |
| PTK - 02/07 - ABERTO - AD 70 a 73 (120247729497870482) | PAUSED | R$ 17.765,30 | 829 | 1,49 | R$ 21,43 |
| PTK - 04/11 - ABERTO ABO TESTADORA - 4 CRIATIVOS (120250285047250482) | ACTIVE | R$ 294,69 | 43 | 4,38 | R$ 6,85 |
| PTK - 04/11 - ABERTO ABO TESTADORA - 2 CRIATIVOS (120250286353170482) | ACTIVE | R$ 145,12 | 16 | 3,58 | R$ 9,07 |
| PTK - 05/11 - ABERTO ABO TESTADORA - 2 CRIATIVOS (120250299967280482) | ACTIVE | R$ 122,67 | 10 | 2,48 | R$ 12,27 |

No período máximo, as 25 maiores campanhas da C1 ficam entre ROAS 1,34 e 1,91 (maior ROAS com gasto relevante: "PTK - 05/05 - ABERTO - INTENSIVÃO PAGINA LOW TESTE CRIATIVO — 5 E 6", 120243646770710482, R$ 6.074,11, 341 compras, ROAS 1,91). Campanhas "[PLUB] Topo de funil" tiveram ROAS 0,36 e 0,08.

Anúncios C1 com mais gasto (90 dias): "CARRINHO ABANDONADO - TODOS" (120244807042290482) R$ 31.109,88 / 1.379 / 1,40; "AD 70" (120247729497920482) R$ 17.158,13 / 806 / 1,50; "AD - 79" (120249350724650482) R$ 10.968,01 / 530 / 1,47; "AD - 83" (120248176568220482, ACTIVE) R$ 10.244,13 / 552 / 1,70; "AD - 95" (6 cópias no conjunto "ABERTO - 10/09", creative 1550919016580940) entre R$ 1.268 e R$ 3.935 cada, ROAS 1,61–1,85.
**Texto exato dos 6 criativos C1 consultados** (26884247927901344, 855446930664313, 860791830167291, 28948314268196150, 1550919016580940, 1076305811460904): 
> Não foi em academia que ela perdeu 17kg 🙆🏽‍♀️
> 
> CLIQUE EM "SAIBA MAIS" se vocês tambem querem esse resultado?

CTA `LEARN_MORE` (o de 24/05 usa `SEE_DETAILS`), vídeo. **Destino** (preview do anúncio 120248176568220482): `https://timelibiaintensivao.com.br/desbloqueio/?utm_source={{placement}}&utm_medium={{adset.name}}…`.

Valor médio por compra (cálculo = ROAS × custo por compra, números da API): C1 90 dias ≈ R$ 31,95; C3 campanhas de novembro ≈ R$ 30,54. Front a R$ 37,00 (ver 3.5) — o valor por compra atribuído fica abaixo do preço cheio; motivo não verificado (pode ser Pix com desconto, cupom, ou como o pixel envia valor).

### 3.5 Funil de destino da Líbia (aberto no navegador)
Não é quiz: são **páginas de vendas longas com VSL no topo** (player vturb/converteai), domínio timelibiaintensivao.com.br, botão para checkout Hotmart.

**A) Desafio 15+15** — `https://timelibiaintensivao.com.br/desafio1515/` (destino das campanhas C3 com ROAS ~2,2–2,4)
- Topo: "DESAFIO 15 + 15" / "Em apenas 12 dias, comece a reduzir o inchaço, queimar gordura e fortalecer seus músculos com treinos de apenas 15 minutos em casa — sem academia e sem depender de medicamentos caros!" / botão "QUERO EMAGRECER".
- VSL: player vturb 6adb19b02ca0c3473b670cb7; duração medida no HLS = **186,3 s (3min06s)**.
- Sequência de blocos (literal): "Antes de mudar o corpo, você precisa desbloquear a mente." → "DA MINHA CASA PARA O MUNDO! 🌎" (esposa "saiu dos 94 kg para os 67 kg. São 27 kg a menos!") → "A TRANSFORMAÇÃO DA QUERIDINHA NÃO FOI SORTE. FOI MÉTODO! 🔥" (antes/depois por região: abdômen, pernas, seios e braços, rosto) → "O MÉTODO QUE POTENCIALIZA SUA QUEIMA NATURAL DE GORDURA! 🔥" (15 min com peso corporal, "efeito EPOC") → "O SEGREDO NÃO É TREINAR MAIS. É TREINAR COM ESTRATÉGIA!" → botão "QUERO PERDER 6 KG!" → "Você tem noção de que mais de 3 MIL MULHERES já começaram…" → depoimentos de alunas (imagens) → "Quem é Líbia Resende?" ("tenho 29 anos… CREF: 172126-G/SP"; esposa com 94KG "cogitando uma bariátrica") → "BÔNUS PREMIUM EXCLUSIVO 🎁 4 DIAS EXTRAS… DE 12 PARA 16 DIAS DE TREINAMENTO, SEM NENHUM CUSTO ADICIONAL!" → "ESSA CONDIÇÃO ESPECIAL ESTÁ CHEGANDO AO FIM!" → preço.
- Preço na página: **"10x de R$ 4,45 ou R$ 37,00 uma única vez"**, botão "COMPRAR AGORA" → `https://pay.hotmart.com/T107941666L?checkoutMode=10`.
- Garantia: "GARANTIA INCONDICIONAL DE 12 DIAS".
- Checkout Hotmart (país trocado para Brasil): produto "Desafio 15 + 15", autor "Mente e Corpo Blindado", **R$ 37,00 ou 10x de R$ 4,45**, timer "00 : 14 : 44 Ultima chance de garantir seu DESAFIO". **Order bumps (4):** "Refeições Coringa" de R$ 97,00 por R$ 15,90 · "Final de Semana - sem estragar tudo!" R$ 97,00 → R$ 15,90 · "Treinos S.O.S" R$ 97,00 → R$ 15,90 · "Combo Reeducação Sem Culpa (Jantar + Lanches + Doces Fit)" R$ 97,00 → R$ 19,90.

**B) Intensivão do Desbloqueio** — `https://timelibiaintensivao.com.br/desbloqueio/` (destino da C1, ROAS 1,4–1,7)
- Topo: "INTENSIVÃO DO DESBLOQUEIO / Em apenas 15 dias, perca até 6KG treinando em casa - sem academia e sem remédios caríssimos!" / "QUERO EMAGRECER".
- VSL: player vturb 69fbaa884eea68f3954b9834; duração no HLS = **146,8 s (2min27s)**.
- Prova: esposa "saiu de 94KG para 77KG" (número diferente da página A), "tenho 28 anos" (diferente da A), "Mais de 3.000 mulheres", BÔNUS 1 (plano alimentar) e BÔNUS 2 (bastidores da "Marina, que eliminou mais de 15KG").
- Preço: **"5x de R$ 8,19 ou R$ 37,00 uma única vez"** → `https://pay.hotmart.com/C100715327M?off=oa6bg5z4&checkoutMode=10`. Garantia "GARANTIA INCONDICIONAL DE 15 DIAS".
- Checkout (Brasil): "INTENSIVÃO DO DESBLOQUEIO: Transforme seu corpo em 15 dias", R$ 37,00 ou 5x R$ 8,19. **Order bumps (4):** "Combo Reeducação Sem Culpa (Jantar + Lanches + Doces Fit)" R$ 97,00 → R$ 14,90 · "Receitas de jantar" R$ 47,00 → R$ 7,90 · "Receitas de lanches intermediários" R$ 47,00 → R$ 7,90 · "Receitas de sobremesas" R$ 47,00 → R$ 7,90.

Diferenças A (ROAS ~2,2–2,4 em nov) × B (ROAS ~1,5): A promete **15 min/dia, 12 (+4) dias, "reduzir o inchaço"**, 10x de R$ 4,45, VSL 3:06, bumps de R$ 15,90–19,90; B promete "perca até 6KG em 15 dias", 5x de R$ 8,19, VSL 2:27, bumps de R$ 7,90–14,90. Mesmo preço (R$ 37). Não dá para atribuir a diferença de ROAS a um único fator com os dados disponíveis (A tem só ~8 dias de dados e conta diferente).
Screenshots: `/tmp/claude-0/-home-user/0a4958c4-7139-5230-ad25-17882bceb1fa/scratchpad/concorrentes/libia_paginas/` (desafio1515.png, desbloqueio.png, checkout_desafio1515_BR.png, checkout_desbloqueio_BR.png) e passos em `…/concorrentes/libia_desafio1515/` e `…/libia_desbloqueio/`.

---

## 4. Comparativo rápido dos funis (fatos medidos)

| Funil | Tipo | Telas até oferta | Tempo até checkout (robô) | VSL | Captura de dados | Preço front | Garantia | Order bumps | Checkout |
|---|---|---|---|---|---|---|---|---|---|
| Aline Pamplona (quizalt / quizalt2) | Quiz + 2 VSLs | 27 + VSL final | ~504 s | Sim: VSL1 no passo 17 (5:59, botão ~100 s) e VSL2 na oferta (6:30, botão ~300 s, cronômetro 10:00) | Não pede nome/e-mail; pede altura/peso/meta | R$ não verificado (US$ 7,00 visto dos EUA) | não encontrado | nenhum (`bumps: []`) | Kiwify |
| Líbia — Desafio 15+15 | Página de vendas + VSL | 1 página | — | VSL 3:06 no topo | Não | R$ 37,00 ou 10x R$ 4,45 | 12 dias | 4 (R$ 15,90 ×3, R$ 19,90) | Hotmart |
| Líbia — Intensivão do Desbloqueio | Página de vendas + VSL | 1 página | — | VSL 2:27 no topo | Não | R$ 37,00 ou 5x R$ 8,19 | 15 dias | 4 (R$ 14,90, R$ 7,90 ×3) | Hotmart |
| Fernanda Martins / Pilates na Parede (qualitylife pro-v3) | Quiz 40 telas | 40 | ~157 s | Não | Nome; idade/altura/peso/meta | R$ 27,00 (qualitylife R$ 27,90) | "7 dias" e "90 dias" na mesma página | 5 (R$ 5,90 ×3, R$ 2,90, combo R$ 12,36) | Wiapy |
| Pilates em Casa (pilatesevida) / Ritmu (lovable) / Desafio Pilates na Parede | Quiz ~80 telas (clone de app) | ~80 | ~301–335 s | Não | E-mail + nome; altura/peso/meta | Ritmu: R$ 37,90 (de R$ 150,99). Pilates em Casa: Básico R$ 17,90 / Avançado R$ 47,90 → popup R$ 27,90 | 90 dias | Pilates em Casa: 1 (WhatsApp R$ 5,90); Ritmu: não verificado | Cakto / Kirvano |
| Kslim (Pilates Coreano) | Quiz ~63 telas + raspadinha | ~63 | ~255 s até a raspadinha | Não | Nome + e-mail | R$ 37,00 ou 9x R$ 5,36 ("de R$ 197,00") | 30 dias | não verificado | Wiapy |

## 5. O que NÃO foi possível verificar
- **Preço em R$ do quiz da Aline** (Kiwify mostrou só USD para IP dos EUA; troca de país não funcionou). Também não achei garantia no funil da Aline.
- **Textos e destinos dos anúncios "Pilates Asiáticos 28 dias" e "Protocole Naturel"** (snapshots públicos retornam "O anúncio não está na Biblioteca de Anúncios"), então **não sei para onde levam nem o preço**. Só tenho headline, datas (07–11/08/2026 e 02/07/2026) e moeda (USD / BRL).
- Também não abriram no snapshot: 1757358202677496, 1130975476317331, 1537818887917516, 2158036684786870, 2629265357514877, 1162812843366255, 1445086466949420, 1699139088302976, 1808732140165188, 1097175983241715, 4588677511356936, 3530777093766589, 2214871409415221, 1584246062990971, 2079419919614802, 1401765435179624, 28158730517147593, 1049421714479614, 1043326715076737, 1024179460098706, 1293546112684974. (O 1349121777397270 não foi testado no snapshot.)
- **Anúncio ativo mais antigo da Líbia** (182 ativos; a API só devolve os 50 mais novos). O mesmo vale para Polly Takao (213), Desafio Pilates na Parede (59) e Daniela Zanette (51).
- Gasto/resultado de qualquer concorrente (a Biblioteca não dá isso para anúncios não políticos). "Vende" aqui = inferência por tempo no ar e volume de variações, como pedido.
- Variante `pilates-wall-v1` do quiz qualitylife (erro de aplicação no nosso navegador) e checkout da variante `pro-v3`.
- Checkout Kirvano do Ritmu (bloqueio Cloudflare) — preço final no checkout e bumps.
- Destino das campanhas arquivadas "[VSL - ABERTA]" da C3 da Líbia (não puxei preview). 
- Por que o valor médio por compra atribuído na Líbia (~R$ 30–32) fica abaixo do preço de R$ 37.
- Plataforma de quiz da Aline: só vi o parâmetro `src=inlead3` na URL do checkout; não confirmei a ferramenta.
- Duração exata do VSL do anúncio da Aline: o snapshot mostra 2:50 (4699676803647151), 1:53 (1883133299523743), 0:42 (1102577608814444), 2:18 (1143735948179796) — são os criativos, não as VSLs do quiz.
