---
type: projeto
title: "Corpo Feliz - Comunidade"
project: "Corpo Feliz - Comunidade"
tags: [tipo/projeto, projeto/corpo-feliz-comunidade, laura-rosa]
keywords: [comunidade, assinatura, laura, corpo feliz, quiz, vsl, recomeçar, movimento, app, gravyx]
created: 2026-11-08
updated: 2026-11-08
summary: "Venda da assinatura da Comunidade Corpo Feliz (Laüra Rosa) com a promessa 'parar de recomeçar': quiz, página de VSL, app e anúncios."
---

# Corpo Feliz - Comunidade (assinatura)

**Leia isto primeiro em qualquer conversa nova sobre a Comunidade.** Esta nota é o ponto de partida; os detalhes ficam nas notas da pasta `01-Projetos/Corpo Feliz - Comunidade/`.

## Regras que valem sempre
- **Nunca inventar nada.** Todo número tem fonte e data; se não deu para conferir, escrever "não conferido".
- Repositório do site: `patrikgonzaga2-tech/LR_LauraRosaPersonal`. Siga o `CLAUDE.md` de lá (pt-BR; pagamento/checkout/preço/oferta só com OK explícito do Patrik; mesclar só depois do OK; toda página nova entra no painel oficial `app/paineloficialcorpofeliz/_dados.ts` no mesmo PR).
- Banco "Projeto Corpo Feliz" (`fjlbvoephhextnxemygf`): **só leitura**.
- Nada de nome, telefone ou dado de saúde de aluna em arquivo, nota ou grupo.
- Marca: sem quilos, sem prazo de resultado, sem promessa médica, sem antes e depois, sem nome de remédio (Ozempic/Mounjaro), sem "canetinha" em anúncio.
- Meta: não afirmar característica pessoal de quem vê ("você tem diástase") — usar pergunta.
- Concorrente (Movimento Emagreça): **modelar, não copiar**. Não usar vídeo, texto ou anúncio dele.
- Tudo que for decidido, criado ou descoberto entra no Obsidian (ver [[Preferências Gerais]]).

## Decisão (08/11/2026)
Aprovada pelo Patrik: [[Comunidade - promessa parar de recomeçar]].
- Principal: **"Você não precisa de mais um treino. Precisa parar de recomeçar."**
- Testes: "O treino que acompanha a sua fase" e "Joelho, lombar ou diástase te fazem parar?"
- Formato: anúncio com a Laüra → quiz → resultado + VSL → oferta da assinatura → botão de WhatsApp (0948) para quem não comprou.
- Preço: 3 braços (?o=1 anual, ?o=2 mensal, ?o=3 teste 30 dias). **Valores e links da Greenn: só o Patrik define.**

## Status (atualizar a cada etapa, sem virar diário)
| # | Etapa | Status | Onde |
|---|---|---|---|
| 1 | Roteiro da VSL (áudio da Laüra) | pronto, enviado ao Patrik | [[Comunidade - roteiro da VSL da Laura]] |
| 2 | Página de VSL `/comunidade` (modelo da página do Movimento, copy nossa) | **no ar** desde 08/11 (Patrik: "publica a página pra gente testar"); botão e vídeo ainda vazios | https://www.laurarosapersonal.com/comunidade · PR patrikgonzaga2-tech/LR_LauraRosaPersonal#366 (o #365 foi fechado e reaberto como #366) |
| 3 | Quiz `/comunidade-quiz` | **v2 no ar** desde 08/11 (#371–#374; [[Comunidade - quiz v2 (08-11)]]): mensal R$ 39,90 com botão ligado (yaG6FL), /painel já separa. Visual novo + 5 bônus com capa no resultado publicados no #376 (08/11, Patrik: "agora sim, tá bonito, pode publicar") | https://www.laurarosapersonal.com/comunidade-quiz?p=1 · PR patrikgonzaga2-tech/LR_LauraRosaPersonal#368 |
| 4 | Ajustes no app (acesso, Plano B, nomes das aulas) | a fazer, precisa da lista de vídeos | ver "App" abaixo |
| 5 | Anúncios (3 imagens + 3 vídeos) via Gravyx | a fazer, avisar custo antes | [[Comunidade - concorrentes]] |
| 5b | Vídeo da VSL no estilo do Movimento com o áudio da Laüra | 33 cenas geradas no Gravyx (links em [[Comunidade - VSL mapa de cenas]]) + 3 cartões; falta o áudio da Laüra, gravação de tela do app e fotos dela | [[Comunidade - VSL mapa de cenas]] |
| 6 | Campanha pausada no padrão 3.2 | a fazer, ativar só com OK | `docs/ANALISE_CAMPANHAS_QUIZ.md` §3.2 |

## Página `/comunidade` (etapa 2)
- Arquivo `app/comunidade/page.tsx`. `CHECKOUT_URL = ''` (botão desligado) e `VSL_SRC = ''` (espaço "Vídeo da Laüra (em gravação)") até o Patrik mandar.
- Visita conta como slug `comunidade-vsl` (upsell_views). Fora do Google (noindex).
- No ar: https://www.laurarosapersonal.com/comunidade

## App (etapa 4)
- `lib/app-cf/servidor.ts`: `PRODUTOS_LIBERADOS` está vazio → quem paga não entra no app sozinho. Preencher com os produtos novos da Greenn (depois do OK).
- Plano B: 5 min no código, "Só 10 minutos de movimento" no botão (`lib/app-cf/config.ts`). Alinhar.
- Só 5 aulas carregadas ("Treinos de Novembro", 28 a 37 min). Faltam as curtas (3, 5, 10, 15 min). Ideia do Patrik: nomear as aulas com o nome do vídeo da área de membros para ela achar lá. **Precisa da lista de vídeos.**
- Doc do app no repositório: `docs/APP_CORPO_FELIZ.md`.

## O que a Comunidade entrega (fonte oficial)
`hostinger/black-comunidade/dados/conteudo.json` (página da Black, 31/10): app com treinos em casa ou academia com vídeo de cada exercício, treinos hormonais, treinos de 3 e 5 minutos "pros dias impossíveis"; plano alimentar flexível; a Profe Laüra e o time no WhatsApp; Grupo das Musas; módulo de LPF/diástase com professora especializada; mobilidade; desafio todo mês; garantia de 7 dias. WhatsApp oficial (37) 6000-0948.

## Pendências do Patrik
- Oferta: R$ 39,90/mês + garantia de 15 dias decididos ([[Comunidade - oferta mensal 39,90 (08-11)]]); texto com comparação e ancoragem NO AR (#373, "pode aplicar"); Patrik ajustou a Greenn em 08/11; botão LIGADO no checkout https://payfast.greenn.com.br/148344/offer/yaG6FL (#374).
- Onde vai a VSL: no resultado (recomendado) ou também um corte no meio do quiz, como a Aline.
- Rodar antes ou depois da Black (vagas abrem 12/11).
- Áudios da VSL quase prontos (08/11): montar em outra conversa com o prompt D de [[Prompts para conversas paralelas - Comunidade]].
- Lista dos vídeos da área de membros (para nomear as aulas do app).
- Workspace do Gravyx a usar e OK do custo em tokens.
- Liberar o app novo para toda assinante? (o campo produto é "Comunidade Corpo Feliz" em todos os planos: liberar o mensal novo = liberar todas; hoje quem compra pelo quiz recebe a área de membros da Greenn, não o app)
- Decidir o miolo da página /comunidade ([[Comunidade - revisão quiz e página x promessa (08-11)]]).

## Notas de referência
- [[Comunidade - relatório da promessa (08-11)]] — o relatório inteiro que embasou a decisão.
- [[Comunidade - quiz tela a tela]] — as 17 telas e a lógica do resultado.
- [[Comunidade - roteiro da VSL da Laura]]
- [[Comunidade - voz da cliente]] — dores, objeções e frases (anonimizado).
- [[Comunidade - concorrentes]] — Biblioteca de Anúncios e funis.
- [[Comunidade - quiz v2 (08-11)]] — quiz novo, tela a tela com a fonte de cada uma.
- [[Comunidade - revisão quiz e página x promessa (08-11)]] — o que bate e o que não bate com a promessa, e a proposta.
- [[Comunidade - inventário do Drive]]
- [[Comunidade - relatórios anteriores]]
- [[Comunidade - fatos do quiz]]
- [[Prompts para conversas paralelas - Comunidade]] — prompts prontos para dividir o trabalho em várias conversas. Para continuar o quiz: prompt **Q**; para a VSL: prompt **D**.

## Identidade (Patrik, 08/11)
- Cores: rosa da Laüra (página usa vinho #1E0D17, rosa #FF6FA3 e #E8457F; verde só em detalhes). Se a Laüra tiver o código oficial da cor, trocar.
- Logo: "ART_IDV_2026-02-24_Logo" no Drive (versão sem "por Laura Rosa"); no site em `public/images/comunidade/logo-corpo-feliz-branco.png`.
- "Mais de 7 mil alunas" (Patrik, 08/11).
- Bônus da Comunidade no formato da VSL dele: 1 Plano Alimentar Flexível, 2 Módulo LPF e Ativação Abdominal, 3 Aulas de Mobilidade, 4 Desafio Novo Todo Mês, 5 Grupo das Musas. Os bônus do Efeito Lipo (Guia do Ciclo, Anti-Pelanquinha, Áudios Quebra de Sabotagem) só entram se o Patrik confirmar.

## Registro
- 2026-11-09 · Patrik pediu a verificação do funil completo do Movimento, Aline e Elah. Feito em [[Comunidade - funil completo do Movimento, Aline e Elah (09-11)]]: **Aline** tem upsell de 1 clique de R$ 220 (e R$ 197 em outra versão) + downsell + app depois do R$ 7; **Movimento** tem 1 bump de R$ 9,99 e oferta travada na VSL até 10:54; **Elah** tem 6 versões escondidas da página com 4 preços (R$ 297 a 597) e um upsell de 1 clique. Corrigidas duas notas de 08/11 (Movimento tem bump; Aline tem upsell). Anúncios do Movimento: 0 na Biblioteca hoje (reconferir). Skill do GitHub adotada como método: funnel-spy (só leitura, nada instalado). Nada de preço, oferta ou Greenn foi alterado.
- 2026-11-08 · Patrik: sem campanha por enquanto ("vamos criar a VSL antes, colocar em tudo, resolver o funil que tem upsell, criar vídeos e imagens de criativos modelando o que já escala; depois as campanhas, quando tiver tudo no painel"). Resumo de tudo em [[Comunidade - resumo e plano do funil (08-11)]]; prompt F (funil, upsell, desenho no Miro, criativos modelados, painel) em [[Prompts para conversas paralelas - Comunidade]]; a VSL segue no prompt E. A proposta de campanha e os 8 criativos de imagem foram descartados por ora.
- 2026-11-08 · Patrik ajusta a VSL: modelar exatamente a do Movimento (pode usar as imagens e os vídeos dela, modelar o texto, sem o áudio dele), montada na linha dos áudios da Laüra e com as nossas provas; "a dele vende, vamos seguir". Gravyx e Kairogem só para tapar buraco. Prompt E atualizado em [[Prompts para conversas paralelas - Comunidade]]. Mantido: sem balança, fita métrica, quilos, prazo ou remédio no vídeo; material de terceiros pode gerar denúncia ou reprovação do anúncio (avisado).
- 2026-11-08 · #381 mesclado e no ar (Patrik: "1 ok"): página de vendas com VSL em /comunidade (4 promessas sorteadas, a 4ª é a do Movimento) e 4ª capa no quiz (?p=4). Respostas do Patrik no mesmo dia: quem compra o mensal recebe tudo (inclui os treinos de 3, 5 e 15 min); depoimento da aluna autorizado (também na prova do quiz); garantia de 15 dias conferida na Greenn; campanha à parte, teste de formato (quiz × página) por promessa; o app é outra oferta e fica para o fim, em outra conversa. Visita de teste do Claude apagada do banco.
- 2026-11-08 · Abas novas no /painel, grupo "Comunidade · teste" (PR #383): Comunidade · Quiz e Comunidade · Página VSL, por promessa, com Clarity (projeto uerrlg9heo; etiquetas formato/promessa/teste) e medição por bloco na página.
- 2026-11-08 · Conta de anúncio para o teste (levantamento, 7 dias): o lowticket roda na "Ca - Efeito Lipo 21" (733027747778562). A "Ca - Corpo feliz - Novo projeto Laura" (1094091162588572, BM2, dona do pixel LP 28090278990632923) está com tudo pausado e é a recomendada; atenção: o /painel conta o gasto dela como 21D Antes, então a campanha da Comunidade precisa levar "COMUNIDADE" no nome e o painel precisa excluí-la dos números do lowticket. Alternativas: "Ca- Nova - Laura Corpo feliz" (1018871991204953, BM3, nunca gastou, sem pixel) e "Ca - Laura - Comunidade corpo Feliz" (1452441419067513, sem forma de pagamento).
- 2026-11-08 · Prompt E (VSL na VTurb) salvo em [[Prompts para conversas paralelas - Comunidade]], com a dúvida Gravyx × Kairogem × modelar o Movimento.
- 2026-11-08 · Patrik: próxima etapa é a página de vendas com VSL (entra no teste também), modelada no Movimento e no app Elah. Análise do Elah e do mercado em [[Comunidade - página de vendas, Elah e mercado (08-11)]]: Elah lançou 50+ anúncios em 06–07/11 (ainda sem prova de escala), sem VSL, plano anual R$ 597; Movimento e Aline seguem sendo os com tempo no ar. Quiz conferido para anunciar: pixels LP e oficial disparam no quiz e no checkout; falta aba do quiz no /painel, app para quem compra e garantia de 15 dias na Greenn.
- 2026-11-08 · #376 publicado (Patrik: "agora sim, tá bonito, pode publicar"): visual novo + "5 bônus pra você colocar tudo em prática" com as capas da página v2. Ficou como estava: antes e depois da Laüra no resultado e o depoimento "30 dias -9kg off" na prova (Patrik não pediu para tirar; conflito com BRAND.md segue anotado).
- 2026-11-08 · Patrik: "o quiz tá feio, fotos da Laura cortadas, lento, muito básico; a página final não vende, pouco entregável, pouco bônus; a logo nem aparece, antes e depois nem tem". PR patrikgonzaga2-tech/LR_LauraRosaPersonal#376 (rascunho, prévia): logo no topo de todas as telas, foto da Laüra inteira, depoimentos sem corte, resultado com topo vinho e "Quem é Laüra Rosa?" com o antes e depois dela (o mesmo de /efeito-lipo e da Firme), quadro preto da VSL some sem vídeo; teste do começo ao resultado de 19,5 s para 13,1 s. Preço/garantia/checkout intocados. Aguardando o Patrik: (1) seção "5 bônus" com as capas da página v2 (texto de oferta); (2) antes e depois bate com a regra da marca (BRAND.md: "sem antes e depois") e um depoimento já no ar tem "30 dias -9kg off" (quilos e prazo).
- 2026-11-08 · Patrik: continuar o quiz em outra conversa. Prompt Q salvo em [[Prompts para conversas paralelas - Comunidade]].
- 2026-11-08 · #374: botão do quiz no mensal R$ 39,90 (oferta yaG6FL, "CORPO FELIZ - ASSINATURA R$39,90"), UTM com capa (cq-p1/2/3), anúncio e xcod; /painel deixa de fora as sessões variante=comunidade-quiz (21 EL + 3 CQ desde 01/11). App não liberado (decisão do Patrik). Garantia de 15 dias não aparece no texto do checkout: conferir na Greenn.
- 2026-11-08 · Oferta no resultado do quiz (#373): "Sozinha ou com a gente?" + "De R$ 97 por R$ 39,90 por mês, só R$ 1,33 por dia" + garantia de 15 dias + sem fidelidade; link sem ?o abre o mensal. Botão desligado até o link da Greenn.
- 2026-11-08 · PR #372 no ar: link único https://www.laurarosapersonal.com/comunidade-quiz sorteia 1/3 para cada capa (cookie 30 dias; ?p= fixa); capa sem "Profe Laüra Rosa", sem cartão de 7 mil e sem WhatsApp (Patrik: "nenhuma página de quiz tem esses dados"); garantia passa a 15 dias. VSL fica para depois dos áudios (foco no quiz).
- 2026-11-08 · Quiz v2 publicado (#371) em https://www.laurarosapersonal.com/comunidade-quiz, só o quiz (a página v2 segue no #370). Tela de prova com 4 depoimentos do Efeito Lipo (Patrik: alunas autorizaram, "tudo pode usar"). Preço decidido: mensal R$ 39,90, testa 7 dias, cancela quando quiser ([[Comunidade - oferta mensal 39,90 (08-11)]]); texto da oferta aguardando OK. Prompt D da VSL atualizado.
- 2026-11-08 · Patrik: "para de inventar… montar o quiz perfeito batendo na dor que o mercado está escalando". Feito o quiz v2 só com dados nossos e padrões do mercado ([[Comunidade - quiz v2 (08-11)]]): abre pelo desejo, vira para o comportamento, telas de empatia, prova e carregando (modelo Aline), resultado "Agora × Com a Comunidade" só com entregas da página da Black, identidade rosa. Na prévia, não publicado.
- 2026-11-08 · Revisão do quiz e da página contra a promessa ([[Comunidade - revisão quiz e página x promessa (08-11)]]): topo e começo do quiz batem; sobras do Efeito Lipo no quiz (inclusive "dia 21"); o resultado promete aula curta e "versão segura" que o app não tem (5 aulas de 28–37 min, nenhuma marcada). VSL do Movimento colocada só na prévia (branch `claude/sharp-cray-ibhr4l`, aparece só com VERCEL_ENV=preview), a pedido do Patrik, para ver o encaixe.
- 2026-11-08 · Página /comunidade v2 (padrão Movimento, rosa, logo, 5 bônus com capas do Gravyx) no PR patrikgonzaga2-tech/LR_LauraRosaPersonal#370, aguardando OK. Roteiro v3.1 com 7 mil alunas e bônus.
- 2026-11-08 · Patrik não gostou da VSL, da capa e do resultado do quiz e pediu a VSL "igual" à do Movimento. Feito o roteiro v3, que segue a dele trecho por trecho ([[Comunidade - roteiro da VSL v3]]): **a Laüra deve gravar o v3**. Levantados os anúncios dele ([[Comunidade - anúncios do Movimento]]).
- 2026-11-08 · Quiz publicado (#368). Patrik pediu a VSL "igual" à do Movimento: decidido refazer cena por cena (mesma ordem, ritmo e tipos de cena) só com quadros nossos, sem usar vídeo/texto dele. Mapa em [[Comunidade - VSL cena a cena]]; animação de imagem testada no Gravyx (Omni 4 s 720p = 660 tokens; Seedance bloqueou por filtro).
- 2026-11-08 · Patrik recarregou o Gravyx (31.575 tokens). Geradas as 33 cenas da VSL (Nano Banana 2, 2K, 150 tokens cada; 1 refeita porque saiu de lado).
- 2026-11-08 · Quiz /comunidade-quiz pronto no PR #368 (não mesclado). Ofertas vazias; medo "nao-usar" mostra só a garantia até o Patrik definir pausa/cancelamento.
- 2026-11-08 · Página /comunidade publicada (#366). VSL: mapa de cenas e amostra; Gravyx: 1 workspace ("Meu workspace"), plano Starter; Nano Banana 2 1K (100 tokens) e Seedream 5 Lite 2K (50 tokens) aprovados no teste de qualidade.
- 2026-11-08 · Promessa aprovada; roteiro da VSL pronto; página `/comunidade` em PR rascunho (#365); conhecimento da sessão levado para o Obsidian.
