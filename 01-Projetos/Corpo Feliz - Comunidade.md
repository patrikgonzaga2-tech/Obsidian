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
- Banco "Projeto Corpo Feliz" (`fjlbvoephhextnxemygf`): **só leitura**, exceto as tabelas `app_cf_*` do app quando o Patrik pedir (carga dos treinos da Greenn em 08/11).
- **Canal 3606 da UMCLIQUE em stand-by** (bloqueio de spam, Patrik 08/11): não envia nada; só lança mensagem em grupos quando o Patrik pedir. Envio automático = Metrifiquei. Ver [[WhatsApp - canal 3606 em stand-by]].
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
| 3 | Quiz `/comunidade-quiz` | **no ar** desde 08/11 (Patrik: "pode subir o quiz"); antes de anunciar, separar no /painel (`quizDe()` em `app/painel/_lib/funil.ts`) | https://www.laurarosapersonal.com/comunidade-quiz?p=1 · PR patrikgonzaga2-tech/LR_LauraRosaPersonal#368 |
| 4 | App: treinos da Greenn, 3 opções por dia (trilhas, Plano B 5 min, cuidados da Laura) e a Laura sem deixar a aluna na mão (alerta ao suporte, aviso e mensagem à aluna) | **PR em rascunho** (#379), aguarda OK; banco com os 370 treinos gravados e escondidos até o merge (depois, reaplicar o .sql); alerta e push ainda não testados ao vivo | patrikgonzaga2-tech/LR_LauraRosaPersonal#379 · [[Comunidade - app sem deixar a aluna perdida (08-11)]] |
| 5 | Anúncios (3 imagens + 3 vídeos) via Gravyx | a fazer, avisar custo antes | [[Comunidade - concorrentes]] |
| 5b | Vídeo da VSL no estilo do Movimento com o áudio da Laüra | 33 cenas geradas no Gravyx (links em [[Comunidade - VSL mapa de cenas]]) + 3 cartões; falta o áudio da Laüra, gravação de tela do app e fotos dela | [[Comunidade - VSL mapa de cenas]] |
| 6 | Campanha pausada no padrão 3.2 | a fazer, ativar só com OK | `docs/ANALISE_CAMPANHAS_QUIZ.md` §3.2 |

## Página `/comunidade` (etapa 2)
- Arquivo `app/comunidade/page.tsx`. `CHECKOUT_URL = ''` (botão desligado) e `VSL_SRC = ''` (espaço "Vídeo da Laüra (em gravação)") até o Patrik mandar.
- Visita conta como slug `comunidade-vsl` (upsell_views). Fora do Google (noindex).
- No ar: https://www.laurarosapersonal.com/comunidade

## App (etapa 4)
- `lib/app-cf/servidor.ts`: `PRODUTOS_LIBERADOS` está vazio → quem paga não entra no app sozinho. Preencher com os produtos novos da Greenn (depois do OK).
- PR #379 (rascunho): 3 opções por dia (Treino de hoje · Sem tempo hoje · Mais leve hoje), trilhas Iniciante I → II → Intermediária → Avançada
  (treino do mês pelo dia da semana), Plano B = 5 min, passo zero com a autoavaliação física, aula da Greenn com 3 passos e "Terminou?".
  Carga `supabase/app-cf-aulas-greenn.sql`: 370 treinos com minuto escrito (269 sem duração ficam fora).
- Cuidados (Laura, 08/11): gestante segue todos e fala com o suporte; diástase faz todos com a adaptação da aula; joelho: "Mais leve" + fisioterapia do Prof Thalisson; **pós-parto: falta a Laura responder**.
- Laura sem deixar a aluna na mão (08/11): pergunta de risco na Laura IA → WhatsApp do suporte (82 8142-3528) pelo Metrifiquei, sem o texto da pergunta; resposta da Laura → notificação no celular + cartão no Hoje; "Mensagem só para uma aluna" nos painéis.
- Ainda fora por falta de duração escrita: treinos de academia (Bônus Fases 1 a 11) e mobilidade.
- Doc do app no repositório: `docs/APP_CORPO_FELIZ.md`.

## O que a Comunidade entrega (fonte oficial)
`hostinger/black-comunidade/dados/conteudo.json` (página da Black, 31/10): app com treinos em casa ou academia com vídeo de cada exercício, treinos hormonais, treinos de 3 e 5 minutos "pros dias impossíveis"; plano alimentar flexível; a Profe Laüra e o time no WhatsApp; Grupo das Musas; módulo de LPF/diástase com professora especializada; mobilidade; desafio todo mês; garantia de 7 dias. WhatsApp oficial (37) 6000-0948.

## Pendências do Patrik
- Ofertas, preços, renovação/cancelamento e links da Greenn (OK explícito).
- Rodar antes ou depois da Black (vagas abrem 12/11).
- Laüra gravar o áudio da VSL hoje.
- OK no PR #379 (app com os treinos da Greenn); depois do merge, reaplicar `supabase/app-cf-aulas-greenn.sql`.
- Laura: regra do pós-parto no app.
- Workspace do Gravyx a usar e OK do custo em tokens.
- Liberar o app novo para toda assinante?
- Autorização por escrito da aluna para usar a frase "Foi o que me fez ter constância pela primeira vez na vida".

## Notas de referência
- [[Comunidade - relatório da promessa (08-11)]] — o relatório inteiro que embasou a decisão.
- [[Comunidade - quiz tela a tela]] — as 17 telas e a lógica do resultado.
- [[Comunidade - roteiro da VSL da Laura]]
- [[Comunidade - voz da cliente]] — dores, objeções e frases (anonimizado).
- [[Comunidade - concorrentes]] — Biblioteca de Anúncios e funis.
- [[Comunidade - inventário do Drive]]
- [[Comunidade - relatórios anteriores]]
- [[Comunidade - fatos do quiz]]
- [[Comunidade - app sem deixar a aluna perdida (08-11)]] — revisão do app com o objetivo "no máximo 3 opções".
- [[Prompts para conversas paralelas - Comunidade]] — prompts prontos para dividir o trabalho em várias conversas.

## Identidade (Patrik, 08/11)
- Cores: rosa da Laüra (página usa vinho #1E0D17, rosa #FF6FA3 e #E8457F; verde só em detalhes). Se a Laüra tiver o código oficial da cor, trocar.
- Logo: "ART_IDV_2026-02-24_Logo" no Drive (versão sem "por Laura Rosa"); no site em `public/images/comunidade/logo-corpo-feliz-branco.png`.
- "Mais de 7 mil alunas" (Patrik, 08/11).
- Bônus da Comunidade no formato da VSL dele: 1 Plano Alimentar Flexível, 2 Módulo LPF e Ativação Abdominal, 3 Aulas de Mobilidade, 4 Desafio Novo Todo Mês, 5 Grupo das Musas. Os bônus do Efeito Lipo (Guia do Ciclo, Anti-Pelanquinha, Áudios Quebra de Sabotagem) só entram se o Patrik confirmar.

## Registro
- 2026-11-08 · App: acrescentado no PR #379 (a pedido do Patrik: "resto faz") o alerta da Laura IA ao suporte da Laura, o aviso à aluna quando a Laura responde e a mensagem da Laura para uma aluna. Regra nova: **canal 3606 em stand-by** ([[WhatsApp - canal 3606 em stand-by]]); relatório diário, botão WhatsApp e PTK só pelo Metrifiquei. Prompt da próxima conversa em [[Prompts para conversas paralelas - Comunidade]] (S).
- 2026-11-08 · App: PR #379 em rascunho com os treinos da Greenn e as 3 opções por dia (recomendação aprovada: "segue sua recomendação em tudo"). Banco com a carga aplicada e os treinos da Greenn escondidos até o merge. Alerta dos cuidados enviado ao suporte da Laura, (82) 8142-3528, pelo WhatsApp do Patrik no Metrifiquei; a Laura respondeu (gestante, diástase, joelho). Olhado o Elah App (página de vendas): trazido o "ponto de partida" (autoavaliação antes do 1º treino).
- 2026-11-08 · App × objetivo "a aluna nunca fica perdida": hoje não entrega (repete 3 treinos, listas de até 262 aulas, botão para a home da Greenn). Proposta das 3 opções (Treino de hoje · Sem tempo hoje · Mais leve hoje) e trilhas pela regra da Greenn em [[Comunidade - app sem deixar a aluna perdida (08-11)]]; aguarda OK.
- 2026-11-08 · Página /comunidade v2 (padrão Movimento, rosa, logo, 5 bônus com capas do Gravyx) no PR patrikgonzaga2-tech/LR_LauraRosaPersonal#370, aguardando OK. Roteiro v3.1 com 7 mil alunas e bônus.
- 2026-11-08 · Patrik não gostou da VSL, da capa e do resultado do quiz e pediu a VSL "igual" à do Movimento. Feito o roteiro v3, que segue a dele trecho por trecho ([[Comunidade - roteiro da VSL v3]]): **a Laüra deve gravar o v3**. Levantados os anúncios dele ([[Comunidade - anúncios do Movimento]]).
- 2026-11-08 · Quiz publicado (#368). Patrik pediu a VSL "igual" à do Movimento: decidido refazer cena por cena (mesma ordem, ritmo e tipos de cena) só com quadros nossos, sem usar vídeo/texto dele. Mapa em [[Comunidade - VSL cena a cena]]; animação de imagem testada no Gravyx (Omni 4 s 720p = 660 tokens; Seedance bloqueou por filtro).
- 2026-11-08 · Patrik recarregou o Gravyx (31.575 tokens). Geradas as 33 cenas da VSL (Nano Banana 2, 2K, 150 tokens cada; 1 refeita porque saiu de lado).
- 2026-11-08 · Quiz /comunidade-quiz pronto no PR #368 (não mesclado). Ofertas vazias; medo "nao-usar" mostra só a garantia até o Patrik definir pausa/cancelamento.
- 2026-11-08 · Página /comunidade publicada (#366). VSL: mapa de cenas e amostra; Gravyx: 1 workspace ("Meu workspace"), plano Starter; Nano Banana 2 1K (100 tokens) e Seedream 5 Lite 2K (50 tokens) aprovados no teste de qualidade.
- 2026-11-08 · Promessa aprovada; roteiro da VSL pronto; página `/comunidade` em PR rascunho (#365); conhecimento da sessão levado para o Obsidian.
