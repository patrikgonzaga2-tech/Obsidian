---
type: padrao
title: "Prompts para conversas paralelas - Comunidade"
project: "Corpo Feliz - Comunidade"
tags: [tipo/padrao, projeto/corpo-feliz-comunidade, prompts, paralelo]
keywords: [prompt, conversa, paralela, dividir, quiz, app, anúncios, gravyx, vídeo]
created: 2026-11-08
updated: 2026-11-08
summary: "Prompts prontos para abrir várias conversas do Claude Code ao mesmo tempo, cada uma com uma etapa da Comunidade, sem bater uma na outra."
---

# Prompts para conversas paralelas (Comunidade)

Projeto: [[Corpo Feliz - Comunidade]]

## Como usar
- Abra uma conversa nova do Claude Code com **os dois repositórios**: `patrikgonzaga2-tech/LR_LauraRosaPersonal` e `patrikgonzaga2-tech/obsidian`.
- Cole um prompt por conversa. Cada uma trabalha numa **branch própria** para não dar conflito.
- Toda conversa termina atualizando a tabela "Status" e o "Registro" da nota [[Corpo Feliz - Comunidade]] no Obsidian.

## Base comum (já vai dentro de cada prompt)
> Leia primeiro, no repositório obsidian, `01-Projetos/Corpo Feliz - Comunidade.md` e só as notas que ele aponta para a sua tarefa. Siga o CLAUDE.md do LR_LauraRosaPersonal. Regra: NUNCA INVENTE NADA; todo número com fonte e data. Pagamento, checkout, preço, oferta e links da Greenn só com OK explícito do Patrik (mostre antes/depois e espere). Não escreva no banco fjlbvoephhextnxemygf. Sem nome, telefone ou dado de saúde de aluna. Ao terminar, atualize o Status e o Registro da nota da Comunidade no Obsidian e me mande o link do PR/prévia.

---

## A · Quiz da Comunidade (etapa 3)
```
Tarefa: montar o quiz da Comunidade Corpo Feliz numa rota nova do site (LR_LauraRosaPersonal).

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md" e "01-Projetos/Corpo Feliz - Comunidade/Comunidade - quiz tela a tela.md" (é a especificação aprovada: 17 telas, 14 perguntas, capas ?p=1..3, ofertas ?o=1..3, lógica do resultado). Siga o CLAUDE.md do LR_LauraRosaPersonal.

O que fazer:
1. Rota nova (sugestão: app/comunidade-quiz/), reaproveitando o motor do quiz atual (app/efeito-lipo-quiz/) sem mexer nele. Textos exatamente como na especificação.
2. Resultado: "Você costuma parar…", plano (tempo · onde · fase · cuidado), espaço da VSL (vazio até o Patrik mandar), checklist da Comunidade, resposta ao medo, botão "Tirar dúvida no WhatsApp" para o 0948 oficial.
3. Oferta por ?o=: deixe CHECKOUT vazio e o botão desligado. Preço e link da Greenn só com OK explícito do Patrik.
4. Rastreio igual ao quiz atual (quiz_sessions/quiz_events), com a capa e a oferta marcadas.
5. Registrar a rota no painel oficial (app/paineloficialcorpofeliz/_dados.ts) no mesmo PR.
6. Branch própria (ex.: claude/comunidade-quiz), PR em rascunho pela API REST (gh api repos/.../pulls; GraphQL não funciona aqui), conferir a tela no celular (Playwright iPhone 13) e me mandar prints e o link.

Regras: NUNCA INVENTE NADA. Sem quilos, prazo, antes e depois, nome de remédio. Não mesclar sem o meu OK.
Ao terminar, atualize o Status e o Registro em "01-Projetos/Corpo Feliz - Comunidade.md" no Obsidian.
```

## B · Ajustes no app (etapa 4)
```
Tarefa: preparar o app Corpo Feliz (/app no LR_LauraRosaPersonal) para receber as assinantes novas da Comunidade.

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md" (seção App) e, no LR_LauraRosaPersonal, docs/APP_CORPO_FELIZ.md. Siga o CLAUDE.md.

O que fazer:
1. Me mostre como funciona hoje a liberação de acesso (lib/app-cf/servidor.ts, PRODUTOS_LIBERADOS vazio) e o que precisa para quem comprar a assinatura nova entrar sozinha. Não preencha com produto nenhum sem eu mandar o código do produto da Greenn.
2. Plano B: o código usa 5 min e o botão diz "Só 10 minutos de movimento" (lib/app-cf/config.ts). Mostre as duas opções e espere eu escolher.
3. Aulas: hoje só 5 aulas de 28 a 37 min. Quero aulas com o NOME do vídeo da área de membros, para a aluna achar o vídeo lá. Me peça a lista de vídeos (nome, duração, onde treina) antes de cadastrar; não invente nomes.
4. Branch própria (ex.: claude/comunidade-app), PR em rascunho pela API REST, prints no celular.

Regras: NUNCA INVENTE NADA. Nada de pagamento sem o meu OK explícito. Não mesclar sem o meu OK.
Ao terminar, atualize o Status e o Registro em "01-Projetos/Corpo Feliz - Comunidade.md" no Obsidian.
```

## C · Anúncios no Gravyx (etapa 5)
```
Tarefa: criar os anúncios da Comunidade Corpo Feliz (3 imagens + 3 roteiros de vídeo vertical) no formato que o app Movimento Emagreça usa, mas com conteúdo NOSSO: a Laüra e telas reais do app Corpo Feliz.

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md", "03-Decisoes/Comunidade - promessa parar de recomeçar.md" e a seção 12 (Criativos) de "Comunidade - relatório da promessa (08-11).md". Para o formato do concorrente, "Comunidade - concorrentes.md" (procure "Movimento").

O que fazer:
1. Propor os 6 criativos (texto na imagem, legenda, título, gancho dos 3 primeiros segundos) usando as 3 promessas: parar de recomeçar (principal), sua fase, sem medo. Passar os roteiros de vídeo pelo agente revisor-anuncio do repositório.
2. Me mostrar tudo antes de gerar. Depois do meu OK, gerar as imagens no Gravyx: pergunte em qual workspace e me mostre o custo em tokens antes (acima de 1.000 tokens o Gravyx pede confirmação).
3. Não copiar vídeo, texto nem anúncio do concorrente. Não usar fotos da pasta "pilates" do Drive (são de outra cliente).
4. Nada no Meta: não criar nem ativar campanha.

Regras: NUNCA INVENTE NADA. Sem quilos, prazo, antes e depois, balança, caneta, nome de remédio; público 18+; perguntas em vez de afirmar característica de quem vê.
Ao terminar, salve os textos aprovados numa nota nova em "01-Projetos/Corpo Feliz - Comunidade/" e atualize o Status e o Registro da nota principal.
```

## D · Vídeo da VSL com o áudio da Laüra (etapa 5b) · atualizado em 08/11/2026
```
VAMOS MONTAR A VSL DA COMUNIDADE.
Repositórios desta conversa: patrikgonzaga2-tech/LR_LauraRosaPersonal e patrikgonzaga2-tech/obsidian. Trabalhe numa branch própria.

Leia primeiro, no obsidian: "01-Projetos/Corpo Feliz - Comunidade.md" (só Status, Identidade, Pendências e Registro) e estas três notas da pasta "01-Projetos/Corpo Feliz - Comunidade/":
- "Comunidade - roteiro da VSL v3.md" (roteiro v3.1 que a Laüra gravou: 23 partes, uma por arquivo de áudio; a parte 19, preço, vem num arquivo separado)
- "Comunidade - VSL cena a cena.md" (ordem, ritmo e tipos de cena modelados na VSL do Movimento)
- "Comunidade - VSL mapa de cenas.md" (as 33 imagens já geradas no Gravyx, com os links)
Siga o CLAUDE.md do LR_LauraRosaPersonal.

Tarefa: montar a VSL vertical 9:16 (1080x1920, MP4) com o áudio da Laüra por cima, no mesmo ritmo da VSL do Movimento (troca de imagem a cada 3 a 5 s, palavra branca em tela preta por ~0,8 s, comparação em duas telas, cartões de argumento, legenda de 2 a 4 palavras no terço de baixo, zoom lento em cada imagem, música baixa por baixo da voz).

Passo a passo:
1. Me peça os áudios da Laüra (vou subir na pasta "VSL" do Drive: https://drive.google.com/drive/folders/1bGc7_kwv0MmpTpH6-e0hvQJcO6atNveZ) e as fotos/vídeos dela e as gravações de tela do app que eu tiver.
2. Transcreva com marcação de tempo e alinhe cada parte do roteiro ao áudio. A duração final segue o áudio.
3. Monte a lista de cenas por trecho (as 33 imagens do Gravyx + cartões feitos em HTML + Laüra + telas do app). Se faltar imagem, reaproveite com outro enquadramento; gerar imagem nova no Gravyx só com o meu OK do custo em tokens.
4. Cartões nas cores da identidade de 08/11: vinho #1E0D17, rosa #FF6FA3 e #E8457F, creme #FFF5F8; logo em public/images/comunidade/logo-corpo-feliz-branco.png.
5. No LR_LauraRosaPersonal use o agente editor-video (ffmpeg). Primeiro uma prévia curta (as 3 primeiras partes) para eu aprovar o estilo; depois o vídeo inteiro.
6. Me mande a prévia e o vídeo final para eu ver antes de subir. Só depois do meu OK coloque o player em VSL_SRC (app/comunidade-quiz/_dados.ts e app/comunidade/page.tsx), no PR com o painel oficial de links atualizado.

Regras: NUNCA INVENTE NADA. Não use nenhum quadro, trecho, texto ou áudio do vídeo do Movimento (só a referência de ritmo). Sem balança, fita métrica, antes e depois, quilos, prazo ou nome de remédio. A parte do preço (parte 19) só entra com o texto de oferta aprovado por mim. Gasto de crédito (Gravyx, ElevenLabs, HeyGen) só com o meu OK.
Ao terminar, atualize Status e Registro da nota "Corpo Feliz - Comunidade" no Obsidian e me mande o link.
```

---

## Q · Continuar o QUIZ da Comunidade (atualizado em 08/11/2026, depois do #374)
```
VAMOS CONTINUAR O QUIZ DA COMUNIDADE.
Anexe os repositórios patrikgonzaga2-tech/LR_LauraRosaPersonal e patrikgonzaga2-tech/obsidian e trabalhe numa branch própria.
Leia SÓ: no obsidian, "01-Projetos/Corpo Feliz - Comunidade.md" (Status, Identidade, Pendências e Registro) e "01-Projetos/Corpo Feliz - Comunidade/Comunidade - quiz v2 (08-11).md" (tela a tela com a fonte de cada uma). Siga o CLAUDE.md do LR_LauraRosaPersonal.

O que está NO AR (https://www.laurarosapersonal.com/comunidade-quiz), PRs #371 a #374:
- Objetivo: vender a assinatura da Comunidade pelo quiz. Promessa: "Você não precisa de mais um treino. Precisa parar de recomeçar."
- Link único do teste: sem ?p sorteia 1/3 para cada capa (cookie cq_capa, 30 dias); ?p=1 recomeçar, ?p=2 fase da mulher, ?p=3 joelho/lombar/diástase fixam a capa. A capa só tem logo, título, subtítulo e botão (Patrik não quer "Profe Laüra", cartão de 7 mil nem WhatsApp na capa).
- Ordem: desejo → idade → recomeços → o que tentou → empatia → onde larga → o que faz parar → tela do ciclo → tempo → onde → cuidados → fase → sozinha → medo → prova (Laüra, +7 mil alunas, 4 depoimentos autorizados) → carregando → resultado.
- Resultado: "Você não para por preguiça. Você para [momento]" → Agora × Com a Comunidade → o que mais faz parar → Seu plano → VSL (espaço reservado; só a prévia da Vercel mostra a de referência) → checklist → "Sozinha ou com a gente?" → "De R$ 97 por R$ 39,90 por mês, só R$ 1,33 por dia" + garantia de 15 dias + sem fidelidade → seu medo → botão → WhatsApp 0948.
- Checkout: https://payfast.greenn.com.br/148344/offer/yaG6FL (mensal R$ 39,90), com utm_source=comunidade-quiz, utm_medium=cq-p1|2|3, utm_term=anúncio, utm_content=xcod.
- Rastreio: /api/quiz com variante=comunidade-quiz e intro_ab=CQ-p1|2|3 (answers._sorteio=1 quando veio do sorteio). O /painel (Efeito Lipo) já deixa essas sessões de fora.
- Arquivos: app/comunidade-quiz/ (_dados.ts = textos, ofertas e ordem; _quiz.tsx = telas; _ui.tsx = cores rosa; _track.ts = rastreio e link do checkout; page.tsx = sorteio da capa; _beacon.ts = visita).

Pendências conhecidas:
- Conferir na Greenn se a oferta yaG6FL está com garantia de 15 dias (o checkout não mostra).
- App: não liberado para quem compra (o campo produto é "Comunidade Corpo Feliz" em todos os planos; liberar = toda assinante; decisão do Patrik).
- Não existe ainda uma aba no /painel com os números do quiz da Comunidade por capa (visitas, passaram da capa, terminaram, clicaram comprar, compraram).
- VSL: entra no resultado quando os áudios da Laüra ficarem prontos (prompt D, em outra conversa).
- Página /comunidade v2 continua no PR #370, sem OK.

O que eu quero mexer agora: [escreva aqui].

Regras: NUNCA INVENTE NADA (todo número e texto com fonte); pagamento, preço, oferta, garantia e checkout só com o meu OK explícito (mostre antes/depois e espere); depois do meu "pode subir" você mescla e confere no ar; painel oficial de links no mesmo PR; tudo que for decidido entra no Obsidian (nota do projeto + "Comunidade - quiz v2 (08-11)").
Economia: não abra imagens sem precisar; um print só no fim; leia só a seção do doc que a tarefa pede.
```

---

## R · Retomar a Comunidade numa conversa nova (08/11/2026)
```
Vamos continuar o projeto Comunidade Corpo Feliz. Anexe os repositórios LR_LauraRosaPersonal e obsidian.
Leia SÓ a nota "01-Projetos/Corpo Feliz - Comunidade.md" do Obsidian (tabela Status, Identidade, Pendências e Registro) e, se a tarefa pedir, a nota específica que ela aponta. Siga o CLAUDE.md do LR_LauraRosaPersonal.

Onde paramos:
- /comunidade-quiz no ar. A página /comunidade v2 (padrão Movimento, rosa, logo, 5 bônus) está no PR #370, esperando o "pode subir".
- O roteiro v3.1 da VSL está pronto e falta o áudio da Laüra.
- O vídeo vai seguir a VSL do Movimento cena por cena, com quadros nossos (33 cenas no Gravyx, links em "Comunidade - VSL mapa de cenas").

Próximo passo: [escreva aqui: publicar #370 / montar o vídeo com o áudio / ajustar o quiz / anúncios].

Economia: não abra imagens nem prints sem precisar; um print só no fim; leia só a seção do doc que a tarefa pede.
Regras: NUNCA INVENTE NADA; pagamento e checkout só com o meu OK explícito; tudo que for decidido entra no Obsidian.
```


---

## E · VSL da Comunidade na VTurb (atualiza o D) · 08/11/2026, ajustado
Decisão do Patrik (08/11): **modelar a VSL do Movimento**: usar as imagens e os vídeos dela, modelar o texto, tirar o áudio dele e montar tudo na linha dos áudios da Laüra, com as nossas provas. A VSL vai para a **VTurb** e entra na página /comunidade (já no ar, 4 promessas). Ele deixou de lado a dúvida Gravyx × Kairogem: as ferramentas só entram para tapar buraco.
```
VAMOS MONTAR A VSL DA COMUNIDADE E COLOCAR NA VTURB.
Repositórios desta conversa: patrikgonzaga2-tech/LR_LauraRosaPersonal e patrikgonzaga2-tech/obsidian. Trabalhe numa branch própria.

Leia primeiro, no obsidian: "01-Projetos/Corpo Feliz - Comunidade.md" (só Status, Identidade, Pendências e Registro) e, da pasta "01-Projetos/Corpo Feliz - Comunidade/":
- "Comunidade - roteiro da VSL v3.md" (roteiro v3.1 que a Laüra gravou: 23 partes, uma por arquivo de áudio; a parte 19, preço, vem num arquivo separado; já segue a ordem da VSL do Movimento)
- "Comunidade - VSL cena a cena.md" (ordem, ritmo e tipos de cena da VSL do Movimento) e "Comunidade - VSL mapa de cenas.md" (33 imagens nossas já geradas no Gravyx, para tapar buraco)
- "Comunidade - relatório da promessa (08-11).md" (só a seção "Movimento Emagreça: um app sem treinadora vendendo parar de recomeçar", com a estrutura do VSL dele)
- "Comunidade - página de vendas, Elah e mercado (08-11).md" (só a seção "Quando o resto da página abre")
Siga o CLAUDE.md do LR_LauraRosaPersonal.

DECISÃO DO PATRIK (vale acima do que estiver escrito nas notas antigas): a nossa VSL é a VSL do Movimento refeita. Pode pegar as IMAGENS e os VÍDEOS dela, modelar o TEXTO dele (adaptado ao nosso), e o ÁUDIO dele não entra: o áudio é o da Laüra. Monte o vídeo seguindo a linha dos áudios da Laüra, e coloque as nossas provas (alunas, depoimentos, a Laüra). A VSL do Movimento vende; o objetivo é uma que venda igual.
Vídeo de referência (Drive do Patrik): https://drive.google.com/file/d/1uppUB5LvPJs25cCZnJ5-dS7c142N7Zwb/preview (também é o player da VTurb da página movimentoapp.netlify.app, arquivo main.m3u8). Baixe pelo conector do Google Drive ou, se não der, com yt-dlp/ffmpeg (skill watch).

Contexto (08/11): a página /comunidade está no ar com 4 promessas sorteadas (?p=1 a 4), topo só com título e vídeo; o resto da página abre quando o vídeo chega no momento da oferta. Os 3 valores a preencher ficam em app/comunidade/_dados.ts: VTURB_ID (id do <vturb-smartplayer>), VTURB_SRC (player.js da VTurb) e REVEAL_SECONDS (segundo da VSL em que a oferta começa). O quiz (/comunidade-quiz) também tem um espaço de VSL no resultado (VSL_SRC em app/comunidade-quiz/_dados.ts, hoje um iframe): só mexa nele se o Patrik pedir, e então use o mesmo embed da VTurb.

Tarefa:
1. Baixe o vídeo do Movimento. Extraia o áudio só para transcrever e entender a estrutura (ele nunca entra no vídeo final), os quadros e os trechos de vídeo, cena por cena, com o tempo de cada cena e o texto que aparece na tela. Guarde tudo numa pasta de trabalho fora do repositório (vídeo de terceiros não vai para o git).
2. Me peça os áudios da Laüra (pasta "VSL" do Drive: https://drive.google.com/drive/folders/1bGc7_kwv0MmpTpH6-e0hvQJcO6atNveZ), as fotos e vídeos reais dela, as provas autorizadas (alunas, depoimentos; as mesmas da página: public/images/comunidade/ e public/images/) e as gravações de tela do app, se houver. Não use a voz dele em nenhuma parte.
3. Transcreva os áudios da Laüra com tempo e alinhe cada parte do roteiro v3.1 (e o texto do Movimento, adaptado) ao áudio. A duração do vídeo final segue o áudio da Laüra.
4. Monte a lista de cenas: para cada trecho do áudio da Laüra, escolha a cena do Movimento que fazia o mesmo papel e reaproveite a imagem ou o vídeo dela (corte e ritmo parecidos); troque o texto na tela pelo nosso (modelado no dele, adaptado à Comunidade); onde couber, entre uma prova nossa (aluna, depoimento, a Laüra). O que não der para aproveitar, tape com os 33 quadros do Gravyx ou foto/vídeo da Laüra; gerar imagem nova (Gravyx ou Kairogem) só com o OK do Patrik sobre o custo.
5. Tire ou cubra, em qualquer cena aproveitada: o nome, a logo e as telas do app Movimento, o preço e a oferta dele, e o que for específico do produto dele. Troque por cartões nossos (cores da identidade: vinho #1E0D17, rosa #FF6FA3 e #E8457F, creme #FFF5F8; logo em public/images/comunidade/logo-corpo-feliz-branco.png) e pela nossa oferta.
6. Regra da marca que continua: sem balança, fita métrica, quilos, prazo ou nome de remédio, dito pela Laüra ou escrito na tela. Se uma cena do Movimento tiver isso, troque por outra.
7. Primeiro uma prévia curta (as 3 primeiras partes) para o Patrik aprovar o estilo e a fidelidade ao do Movimento; depois o vídeo inteiro, vertical 9:16, 1080x1920, MP4 (agente editor-video, ffmpeg), legenda curta no terço de baixo, música baixa por baixo da voz.
8. Descubra o segundo em que a Laüra começa a apresentar a oferta (parte 19, preço) e proponha REVEAL_SECONDS: o segundo em que a oferta começa, menos uns 3 s. Referência: o Movimento libera o resto da página aos 654 s de 866 s (75,5%); a Aline, aos ~300 s de 390 s (77%).
9. Guie o Patrik na VTurb: subir o MP4, vertical, e me passar o código do player (<vturb-smartplayer id="...">) e o endereço do player.js. Com isso, preencha VTURB_ID, VTURB_SRC e REVEAL_SECONDS num PR, com o painel oficial de links atualizado, e só mescle depois do OK do Patrik. Confira no ar (a página abre inteira se VTURB_ID estiver vazio e libera o resto no segundo definido quando estiver preenchido; teste com ?p=1 a ?p=4).

Regras: NUNCA INVENTE NADA (todo número e texto com fonte). O texto do preço (parte 19) é o já aprovado: "De R$ 97 por R$ 39,90 por mês, só R$ 1,33 por dia, garantia de 15 dias, sem fidelidade"; qualquer mudança de preço, garantia, oferta ou link só com OK explícito do Patrik (mostre antes e depois). Quem compra o mensal recebe tudo (treinos, treinos de 3, 5 e 15 minutos, plano alimentar, Grupo das Musas, mobilidade, diástase e acompanhamento); a VSL fala da Comunidade, não do app. Gasto de crédito (Gravyx, Kairogem, ElevenLabs, HeyGen) só com o OK do Patrik. Avise o Patrik, uma vez e sem travar o trabalho, que o material do Movimento é de terceiros e pode gerar denúncia ou reprovação do anúncio.
Ao terminar, atualize Status e Registro da nota "Corpo Feliz - Comunidade" no Obsidian e me mande o link da página.
```


---

## F · Funil completo da Comunidade: funil + upsell, desenho, criativos modelados e painel · 08/11/2026
Conversa nova que organiza o resto (a VSL é o prompt E, em conversa própria). Decisão do Patrik: sem campanha por enquanto.
```
VAMOS REVER O FUNIL DA COMUNIDADE E PREPARAR TUDO ANTES DAS CAMPANHAS.
Repositórios desta conversa: patrikgonzaga2-tech/LR_LauraRosaPersonal e patrikgonzaga2-tech/obsidian. Trabalhe numa branch própria.

Leia primeiro, no obsidian: "01-Projetos/Corpo Feliz - Comunidade/Comunidade - resumo e plano do funil (08-11).md" (inteiro: é o resumo de tudo) e "01-Projetos/Corpo Feliz - Comunidade.md" (só Status, Pendências e Registro). Depois, só o que a tarefa pedir: "Comunidade - concorrentes.md", "Comunidade - anúncios do Movimento.md" e "Comunidade - página de vendas, Elah e mercado (08-11).md". Siga o CLAUDE.md do LR_LauraRosaPersonal (leia docs/CONTEXTO_COMERCIAL.md antes de mexer em Greenn ou relatórios).

REGRAS DO PATRIK: NUNCA INVENTE NADA (número e texto com fonte). MODELE O QUE JÁ VENDE E ESCALA; não crie do zero. Pagamento, preço, oferta, garantia, upsell, order bump, checkout e links da Greenn só com o OK explícito do Patrik: mostre antes e depois e espere. Não faça campanha nem mexa na Meta agora. Mescle PR só depois do "pode subir" e confira no ar. Painel oficial de links no mesmo PR. Tudo decidido entra no Obsidian.

TAREFAS, nesta ordem (me mostre cada etapa antes de seguir):
1. MAPA DO FUNIL ATUAL. De ponta a ponta: anúncio → quiz (/comunidade-quiz) ou página com VSL (/comunidade) → checkout mensal yaG6FL → o que acontece depois da compra (agradecimento, e-mail, acesso, upsell). Use o que está no código, na Greenn (via banco, só leitura) e no painel. Mostre onde cada etapa é medida e onde não é.
2. O QUE ESCALA NO FUNIL. Do que já está levantado e do que você puder confirmar de novo (Biblioteca de Anúncios BR e as páginas abertas): bumps e ladder da Líbia (4 bumps de R$ 7,90 a R$ 19,90), o anual que é o que mais vende na Comunidade, o upsell do Efeito Lipo (/acompanhamento-up, Cinturinha EXPRESS e Receitas que Secam a R$ 19,90), Movimento, Aline, Elah. Diga o que cada um faz depois do "comprar" e o que se repete.
3. PROPOSTA DE UPSELL E ORDER BUMP PARA A COMUNIDADE, modelada no que escala e no que já vendemos (nada inventado). Para cada item: o que é, de onde vem (qual produto/bônus que já existe), texto, preço e onde aparece. Preço, texto de oferta e links só como proposta com antes e depois, esperando o OK.
4. DESENHAR TUDO no Miro (conector Miro): o funil atual e o proposto, com as medições do painel em cada etapa. Me mande o link do quadro.
5. PAINEL. Liste o que falta medir para ver o funil inteiro (visitas, avanço, cliques, pedidos, compras, bumps, upsell, por promessa) e implemente nas abas "Comunidade · Quiz" e "Comunidade · Página VSL" (app/painel/comunidade-quiz e app/painel/comunidade-pagina). Confirme o rastreio quando o Patrik fizer a compra de teste.
6. CRIATIVOS (vídeo e imagem), MODELADOS no que escala: com ads_library_search, pegue os anúncios que mais tempo estão no ar (Movimento, Aline, Líbia, Elah) e descreva formato, gancho, estrutura e texto; monte a lista de criativos nossos modelados neles, com os ativos da Laüra e as provas autorizadas. Anúncio: texto em pergunta, sem antes e depois, sem quilos, prazo ou balança (regra do Meta); aviso: o estilo "Jornal da Mulher" do Movimento imita portal de notícia e é risco de política. Só produza imagem ou vídeo depois do OK do Patrik sobre a lista e o custo (Gravyx, ElevenLabs, HeyGen). Nada vai para a Meta.
7. Antes de terminar, atualize "Corpo Feliz - Comunidade" (Status e Registro) e o resumo "Comunidade - resumo e plano do funil (08-11)" no Obsidian.

Me peça o que faltar. Não suba campanha.
```

---

## G · Desenhar o funil no Miro + conferir quiz, páginas da VSL e promessas · 10/11/2026
Conversa nova (o conector Miro caiu na sessão anterior e só volta em conversa nova). Já veio do prompt F: funil atual mapeado, concorrentes dissecados e a proposta de upsell/bump **aprovada pelo Patrik**.
```
VAMOS DESENHAR O FUNIL DA COMUNIDADE NO MIRO E CONFERIR OS MODELOS DO QUIZ E DAS PÁGINAS DA VSL.
Repositórios desta conversa: patrikgonzaga2-tech/LR_LauraRosaPersonal e patrikgonzaga2-tech/obsidian. Trabalhe numa branch própria.

Leia primeiro, no obsidian, estas duas notas INTEIRAS (são o estado de tudo):
- "01-Projetos/Corpo Feliz - Comunidade/Comunidade - funil completo do Movimento, Aline e Elah (09-11).md" (dissecação dos concorrentes + a etapa 3 já aprovada pelo Patrik)
- "01-Projetos/Corpo Feliz - Comunidade/Comunidade - resumo e plano do funil (08-11).md"
E só Status, Pendências e Registro de "01-Projetos/Corpo Feliz - Comunidade.md". Para a conferência das promessas, leia também "Comunidade - voz da cliente.md" e "Comunidade - revisão quiz e página x promessa (08-11).md". Siga o CLAUDE.md do LR_LauraRosaPersonal.

O QUE JÁ ESTÁ DECIDIDO (não reabra sem o Patrik pedir):
- Funil: anúncio → quiz (/comunidade-quiz, 4 capas) OU página com VSL (/comunidade, 4 promessas) → checkout mensal R$ 39,90 (oferta yaG6FL) → pós-compra.
- Etapa 3 APROVADA pelo Patrik em 10/11 (preços): ORDER BUMP no checkout = Cinturinha EXPRESS + Receitas que Secam, R$ 19,90 cada (já vendem no Efeito Lipo); UPSELL pós-compra em 1 clique = Comunidade Anual por R$ 297 (PREÇO NOVO, decidido pelo Patrik; precisa criar a oferta na Greenn; as de hoje são M3DUOL R$253 e ij3kFo R$387); DOWNSELL se recusar = Comunidade Trimestral R$ 97 (oferta O8j7nc, já ativa). Ordem: upsell grande primeiro, downsell só se recusar (modelo Aline). A mecânica de 1 clique já existe em app/acompanhamento-up (upsells 6152 e 7395 da Greenn); as 2 telas novas (ex.: /comunidade-upsell e /comunidade-downsell) são cópia dela.
- Desenho já feito num artefato do Claude (referência de conteúdo): https://claude.ai/artifact/X8iiq12nxtT4Qn3d5P6YXy
- O que escala, confirmado em 09/11: Aline (R$7 → upsell R$220/197 em vídeo 1 clique → downsell → app; quiz na Inlead; 71 anúncios, criativo renovado todo dia; reveal da 2ª VSL aos ~77%). Movimento (R$47,90/mês, 1 bump R$9,99, oferta travada aos 75% da VSL; 0 anúncios na Biblioteca em 09/11 — reconferir). Elah (R$297 a 597 anual, 6 páginas escondidas testando 4 preços, upsell 1 clique; reveal dentro do player). Líbia (4 bumps R$7,90–19,90). Nota do funil da Comunidade hoje: Atrair 0 · Capturar 17 · Converter 12 · Subir ticket 4.

TAREFAS (me mostre cada etapa antes de seguir):
1. MIRO (conector Miro): desenhe o funil ATUAL e o PROPOSTO de ponta a ponta, com as medições do painel em cada etapa (onde mede e onde não mede). Coloque no mesmo quadro TODOS os modelos que vão rodar a VSL: as 4 capas do quiz (/comunidade-quiz ?p=1..4) e as 4 promessas da página (/comunidade ?p=1..4), cada uma com a sua promessa escrita. Me mande o link do quadro.
2. CONFERIR SE AS PROMESSAS VENDEM: leia no código os textos atuais — quiz em app/comunidade-quiz/_dados.ts (CAPAS) e página em app/comunidade/_dados.ts (HEROIS). Cruze cada promessa (quiz p1..p4 e página p1..p4) com (a) a voz da cliente/CRM (o que converte mais por menção × o que é mais citado) e (b) o que o mercado que escala usa. Diga quais promessas têm base para vender e quais são fracas. ATENÇÃO: confira se as promessas do quiz batem com as da página (hoje podem NÃO ser as mesmas em p1, p2 e p3 — só a p4, do Movimento, é igual nos dois). Aponte a divergência; mudança de texto só com o OK do Patrik.
3. CONFERIR O REVEAL DA PÁGINA: no código (app/comunidade/_dados.ts: REVEAL_SECONDS, VTURB_ID, VTURB_SRC; e a lógica do gatilho na página), confirme se a página abre o resto do conteúdo no momento da oferta do vídeo, no modelo do Movimento (75%) e da Aline (77%). Hoje a VSL ainda não está gravada (VTURB vazio, REVEAL_SECONDS=0), então a página abre inteira — confirme isso e diga qual segundo entra quando a VSL existir (vem do prompt E).
4. CONFERIR SE A PÁGINA CONDIZ COM O QUE O VÍDEO PROMETE: compare o que cada promessa (capa/topo) diz com o que a página entrega depois do reveal (entregáveis, prova, oferta). Aponte onde o topo promete uma coisa e o miolo entrega outra. Sem VSL gravada ainda, faça a conferência contra o roteiro v3 ("Comunidade - roteiro da VSL v3.md").

REGRAS DO PATRIK: NUNCA INVENTE NADA (número e texto com fonte). MODELE O QUE JÁ VENDE; não crie do zero. Pagamento, preço, oferta, garantia, upsell, order bump, checkout e links da Greenn só com o OK explícito do Patrik (mostre antes e depois e espere). Não mexa na Meta. Mescle PR só depois do "pode subir" e confira no ar. Painel oficial de links no mesmo PR. Banco fjlbvoephhextnxemygf só leitura. Sem nome, telefone ou saúde de aluna no Obsidian.
Ao terminar, atualize Status e Registro de "Corpo Feliz - Comunidade" e o "Comunidade - funil completo do Movimento, Aline e Elah (09-11)" no Obsidian, e me mande o link do quadro do Miro.
```
