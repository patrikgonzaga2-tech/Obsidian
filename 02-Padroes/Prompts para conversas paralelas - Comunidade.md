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

## E · VSL da Comunidade na VTurb (atualiza o D) · 08/11/2026
Decisão do Patrik (08/11): a VSL vai para a **VTurb** e entra na página /comunidade (já no ar, 4 promessas). A dúvida dele vai dentro do prompt: Gravyx, Kairogem ou modelar exatamente a do Movimento com os áudios que a Laüra já criou.
```
VAMOS MONTAR A VSL DA COMUNIDADE E COLOCAR NA VTURB.
Repositórios desta conversa: patrikgonzaga2-tech/LR_LauraRosaPersonal e patrikgonzaga2-tech/obsidian. Trabalhe numa branch própria.

Leia primeiro, no obsidian: "01-Projetos/Corpo Feliz - Comunidade.md" (só Status, Identidade, Pendências e Registro) e, da pasta "01-Projetos/Corpo Feliz - Comunidade/":
- "Comunidade - roteiro da VSL v3.md" (roteiro v3.1 que a Laüra gravou: 23 partes, uma por arquivo de áudio; a parte 19, preço, vem num arquivo separado)
- "Comunidade - VSL cena a cena.md" e "Comunidade - VSL mapa de cenas.md" (ordem, ritmo e tipos de cena; 33 imagens já geradas no Gravyx)
- "Comunidade - página de vendas, Elah e mercado (08-11).md" (só a seção "Quando o resto da página abre")
Siga o CLAUDE.md do LR_LauraRosaPersonal.

Contexto (08/11): a página /comunidade está no ar com 4 promessas sorteadas (?p=1 a 4), topo só com título e vídeo; o resto da página abre quando o vídeo chega no momento da oferta. Os 3 valores a preencher ficam em app/comunidade/_dados.ts: VTURB_ID (id do <vturb-smartplayer>), VTURB_SRC (player.js da VTurb) e REVEAL_SECONDS (segundo da VSL em que a oferta começa). O quiz (/comunidade-quiz) também tem um espaço de VSL no resultado (VSL_SRC em app/comunidade-quiz/_dados.ts, hoje um iframe): só mexa nele se o Patrik pedir, e então use o mesmo embed da VTurb.

DÚVIDA DO PATRIK (responda primeiro, antes de gastar qualquer crédito): "é melhor o Gravyx ou o Kairogem para criar essa VSL, ou melhor modelar exatamente a do Movimento, com os áudios da Laüra que ela já criou?"
- Sobre o Kairogem: não há nada nas notas nem conector conhecido. Pergunte ao Patrik o que é, quanto custa e como acessar. Se ele não tiver acesso, siga com o Gravyx.
- Recomendação inicial (confirme com um teste curto): usar os áudios da Laüra como espinha da VSL, fotos e vídeos reais dela e das alunas autorizadas, e o Gravyx (ou o Kairogem, se ele provar ser melhor) só para as cenas de rotina. Modelar do Movimento a ESTRUTURA (ordem, ritmo, tipos de cena), nunca o texto, o vídeo ou o áudio dele; a nossa tem a Laüra de verdade, que é a vantagem.
- Para decidir com dados: gere a MESMA cena de teste nas ferramentas que o Patrik tiver e compare custo por cena, consistência do rosto e da roupa, tempo de geração e se passa sem cara de IA. Mostre lado a lado e deixe o Patrik escolher. Gasto de crédito (Gravyx, Kairogem, ElevenLabs, HeyGen) só com o OK dele.

Tarefa:
1. Me peça os áudios (pasta "VSL" do Drive: https://drive.google.com/drive/folders/1bGc7_kwv0MmpTpH6-e0hvQJcO6atNveZ), as fotos e vídeos reais da Laüra e as gravações de tela do app (se houver).
2. Transcreva com tempo, alinhe cada parte do roteiro ao áudio e monte a lista de cenas (as 33 do Gravyx, cartões em HTML nas cores da identidade, Laüra, telas do app). Gere imagem nova só com o OK do custo.
3. Primeiro uma prévia curta (3 primeiras partes) para o Patrik aprovar o estilo; depois o vídeo inteiro, vertical 9:16, 1080x1920, MP4 (agente editor-video, ffmpeg).
4. Descubra o segundo em que a Laüra começa a apresentar a oferta (parte 19, preço) e proponha REVEAL_SECONDS: o segundo em que a oferta começa, menos uns 3 s. Referência: o Movimento libera o resto da página aos 654 s de 866 s (75,5%); a Aline, aos ~300 s de 390 s (77%).
5. Guie o Patrik na VTurb: subir o MP4, tela cheia e vertical, e me passar o código do player (<vturb-smartplayer id="...">) e o endereço do player.js. Com isso, preencha VTURB_ID, VTURB_SRC e REVEAL_SECONDS num PR, com o painel oficial de links atualizado, e só mescle depois do OK do Patrik. Confira no ar (a página abre inteira se VTURB_ID estiver vazio e libera o resto no segundo definido quando estiver preenchido; teste com ?p=1 a ?p=4).

Regras: NUNCA INVENTE NADA. Sem balança, fita métrica, quilos, prazo ou nome de remédio no vídeo. O texto do preço (parte 19) é o já aprovado: "De R$ 97 por R$ 39,90 por mês, só R$ 1,33 por dia, garantia de 15 dias, sem fidelidade"; qualquer mudança de preço, garantia, oferta ou link só com OK explícito do Patrik (mostre antes e depois). Quem compra o mensal recebe tudo (treinos, treinos de 3, 5 e 15 minutos, plano alimentar, Grupo das Musas, mobilidade, diástase e acompanhamento); a VSL fala da Comunidade, não do app.
Ao terminar, atualize Status e Registro da nota "Corpo Feliz - Comunidade" no Obsidian e me mande o link da página.
```
