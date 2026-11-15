# Fábrica de Conteúdo IA · Decisões e avanços (diário do Sprint 1)

> Registro de cada decisão do Patrik e de cada avanço, em ordem. Mais recente embaixo.
> Status do Sprint 1 fica na tabela abaixo; o detalhe de cada passo está em `SPRINT_1_PRIMEIRO_VIDEO.md`.

## Contas do canal (ficha)
| Conta | Endereço |
|---|---|
| Nome do canal | **Pingo Pinta** |
| Gmail (dono de tudo) | pingopintacolor@gmail.com · duas etapas ativa · senha só no navegador do Patrik |
| YouTube | [youtube.com/@pingopinta](https://www.youtube.com/@pingopinta) |
| Instagram | [instagram.com/pingo_pinta](https://www.instagram.com/pingo_pinta/) |

## Personagens e vozes (ficha)
| Personagem | Voz | Status |
|---|---|---|
| **Pingo** (gotinha, vira a cor do momento) | **Liam original** · ElevenLabs v3 · id `TX3LPaxmHKxFdv7VOQHJ` (Gravyx) | ✅ voz e visual aprovados 15/11 · visual = `arte/pingo/pingo_opcao_2.jpg` (ponta curvada) |
| **2ª gotinha** (nome a definir) | **Bella** · ElevenLabs v3 · id `hpp4J3VqNfWAUOO0d1Us` (Gravyx) | 🔜 "mais pra frente"; voz guardada |

## Status do Sprint 1

| Passo | O que é | Status | Resultado |
|---|---|---|---|
| Dia 1 · Passo 1 | Confirmar o formato | ✅ decidido 15/11 | infantil 2 a 5 anos, desenhar e colorir, 8 a 12 min + 3 Shorts |
| Dia 1 · Passo 2 | Nome e personagem | ✅ decidido 15/11 | **Pingo Pinta** · personagem Pingo (gotinha de tinta) |
| Dia 1 · Passo 3 | Gmail do canal | ✅ criado 15/11 | **pingopintacolor@gmail.com**, duas etapas ativa |
| Dia 1 · Passo 4 | Canal no YouTube | ✅ criado 15/11, "para crianças" marcado | [youtube.com/@pingopinta](https://www.youtube.com/@pingopinta), telefone verificado |
| Dia 1 · Extra | Instagram | ✅ criado 15/11 | [instagram.com/pingo_pinta](https://www.instagram.com/pingo_pinta/) |
| Dia 2 · Aprovação 1 | Roteiro do vídeo 01 | ✅ "roteiro ok" 15/11 | `ROTEIRO_VIDEO_01.md` v2 "desenhe e pinte junto" |
| Dia 2 · Voz | Escolher a voz do Pingo | ✅ Liam **original** 15/11 | Bella guardada para a 2ª gotinha |
| Dia 2 · Visual do Pingo | Escolher 1 de 3 | ✅ opção 2 (15/11) | `arte/pingo/pingo_opcao_2.jpg` |
| Dia 2 · Teste da maçã | Desenho + pintura simulados | ✅ v2 "ficou bom", mas imitava demais | `arte/testes/teste_maca_v2.mp4` |
| Dia 2 · Mecanismo próprio | O que é só nosso | ✅ criado 15/11 (ver abaixo) | `ROTEIRO_VIDEO_01.md` |
| Dia 2 · Abertura + maçã com voz | 1º trecho real do vídeo 01 | ⏳ enviado, aguardando | `videos/video01_parte1_abertura_maca_v1.mp4` |
| Extra · HyperFrames | Testar o mesmo trecho no terminal do Patrik | ⏳ kit enviado | `hyperframes_kit/` |
| Dia 2 · Música | ~~1 faixa da Biblioteca de Áudio~~ | ❌ cancelado 15/11 | sem música (como o AKN); só efeitos sonoros, feitos por mim |

---

## 15/11/2026 · Dia 1 · Passos 1 e 2 enviados ao Patrik

### Passo 1 · Formato proposto
- Infantil **2 a 5 anos**, **"desenhar e colorir"** (aprender cores, frutas, bichos).
- **Vídeo de 8 a 12 min + 3 Shorts** cortados dele.
- Base: AKN Kids House (vídeo com 66x a mediana do canal), Magic Fingers Art (9x). Ver `PESQUISA_2026-11.md`.
- Ponto de atenção registrado: a hipótese "colorir é barato com IA" ainda **não está provada** (AKN e
  Magic Fingers desenham à mão). O 1º vídeo é exatamente o teste disso.
- Pendente: "formato ok" ou o que muda.

### Passo 2 · 3 nomes + 3 personagens (o @ conferido no YouTube em 15/11)
Conferência feita daqui: `youtube.com/@nome` devolve 404 (= livre) e busca de canais pelo nome sem
canal igual. Instagram, TikTok e domínio **não deu para conferir daqui** (bloqueados na nuvem): o
Patrik confere o Instagram.

| # | Nome / @ | Personagem | Força | Fraqueza |
|---|---|---|---|---|
| 1 | **Pingo Pinta** · `@pingopinta` | Pingo, uma gotinha de tinta que muda de cor a cada vídeo (vermelho no vídeo do vermelho…) | forma mais simples = mais barato e mais fácil manter igual em todos os desenhos | menos "fofo" que um bicho; capa de livro mais fraca |
| 2 ⭐ | **Zuca Zebrinha** · `@zucazebrinha` | Zuca, uma zebrinha cujas listras brancas ficam vazias; em cada vídeo as crianças ajudam a "devolver as cores" | bicho cria carinho; gancho pronto para os 15 s iniciais ("A Zuca perdeu as cores! Vamos ajudar?"); ótima capa de livro | precisa manter o desenho da zebra igual em todos os vídeos (mais trabalho no gerador) |
| 3 | **Tatu Pintor** · `@tatupintor` | Tito, um tatuzinho brasileiro de boina que desenha com o rabo/pincel | bicho brasileiro, marca diferente dos canais estrangeiros | "Tatu" já aparece em vários canais (Tatu Animations, Hello Tatu); menos óbvio para "aprender cores" |

Nomes descartados na conferência (o @ já existe no YouTube ou há canal com o mesmo nome):
Pingo Colorido, Rabisquinho, Rabisco Colorido, Pinta Comigo, Vamos Colorir, Gizinho, Rabisquito,
Gotinha Kids, Lulu Pinta. "Gotinha Colorida" estava livre, mas foi descartado por lembrar o Zé Gotinha
(mascote do Ministério da Saúde). "Zizi Zebrinha" foi trocado por "Zuca" porque já existe o canal
"Gigi & Zizi World Kids".

Recomendação: **opção 2, Zuca Zebrinha.**

Pendente: nome e personagem escolhidos + resultado do Instagram.

---

## 15/11/2026 · Respostas do Patrik aos Passos 1 e 2

- ✅ **Formato aprovado** ("formato ok"): infantil 2 a 5 anos, desenhar e colorir, vídeo de 8 a 12 min
  + 3 Shorts.
- ✅ **Nome escolhido: Pingo Pinta.** Personagem: **Pingo, a gotinha de tinta que muda de cor a cada
  vídeo.** (Não foi a recomendação, a Zuca Zebrinha; decisão do dono.)
- ❌ **@pingopinta ocupado no Instagram** (conferido pelo Patrik).

### Decisão de @ (proposta)
Usar **o mesmo @ em tudo** (YouTube, Instagram, TikTok, Gmail), para a criança/pai achar fácil e para
vender o canal um dia como um pacote só. Por isso o YouTube também deixa de usar `@pingopinta`.

Variações conferidas no YouTube em 15/11 (todas livres, 404): `@pingopintakids` ⭐, `@pingopintaoficial`,
`@canalpingopinta`, `@pingopintatv`, `@pingopintabr`, `@pingopinta_kids`.
Ordem de preferência enviada ao Patrik para testar no Instagram: 1) pingopintakids,
2) canalpingopinta, 3) pingopintatv.

Passo 3 (Gmail) enviado junto, com o mesmo nome do @ escolhido.

---

## 15/11/2026 · Passos 2 e 3 concluídos

- ✅ **@ único do canal: `@canalpingopinta`** (livre no Instagram, conferido pelo Patrik; livre no
  YouTube, conferido daqui em 15/11). Vale para YouTube, Instagram, TikTok e Gmail.
- ✅ **Gmail do canal criado** pelo Patrik, com **verificação em duas etapas ativa**. A senha fica só no
  gerenciador do navegador dele (nunca aqui). Endereço exato: pedido ao Patrik para registrar.
- ⏳ Enviado: **Passo 4 (canal no YouTube)** e um extra, **reservar o @ no Instagram** antes que
  alguém pegue (foi o @ que já deu problema uma vez).

---

## 15/11/2026 · Dia 1 concluído (contas criadas)

- ✅ **YouTube:** `youtube.com/@pingopinta` (o Patrik conseguiu o @ curto, que estava livre no
  YouTube). Telefone verificado. Conferido daqui: o canal abre com o nome "Pingo Pinta" (com um espaço
  sobrando no fim do nome; corrigir em Personalização). Pendente: confirmar "conteúdo para crianças".
- ✅ **Gmail:** pingopintacolor@gmail.com, duas etapas ativa.
- ✅ **Instagram:** `instagram.com/pingo_pinta`.
- **Decisão do dono:** os @ ficaram diferentes em cada rede (`@pingopinta` no YouTube, `@pingo_pinta`
  no Instagram, Gmail `pingopintacolor`). Substitui a proposta de "@ único em tudo". Sem problema: todos
  têm "pingo pinta"; nas bios, sempre apontar um para o outro.

## 15/11/2026 · Dia 2 começou

- 📝 Roteiro do vídeo 01 escrito: `ROTEIRO_VIDEO_01.md` ("Aprenda as cores com frutas", 8 frutas,
  ~10 min, 3 Shorts). Enviado para a **Aprovação 1**, com a decisão de voz (A curta ou B sem voz).
- ⏳ Pedido ao Patrik: 1 faixa da Biblioteca de Áudio do YouTube.

---

## 15/11/2026 · Respostas: "para crianças", origem do roteiro e voz

- ✅ **"Conteúdo para crianças" marcado** no canal. Dia 1 100% concluído.
- ❓ Patrik perguntou se o roteiro foi inventado ou baseado nos canais. Resposta registrada em
  `ROTEIRO_VIDEO_01.md` ("De onde veio este roteiro"): estrutura geral medida nos canais (AKN e Magic
  Fingers); o miolo (gancho, Pingo mudando de cor, ritmo, cesta, frutas) é criação nossa, não medida,
  porque nenhum vídeo de referência foi assistido ainda.
- ✅ **Voz: opção A (voz curta)**, com a condição do dono: *"a voz precisa ser boa pra uma criança
  ouvir"*. Regra nova do canal: **nenhuma voz entra no vídeo sem o Patrik ouvir antes.**
- 🎙️ 3 amostras geradas no Gravyx ("Meu workspace", o único que existe; ainda não há workspace só do
  projeto), ElevenLabs v3, mesmo texto (167 caracteres, ~10 a 12 s), **101 tokens cada = 303 tokens**
  (saldo antes: 10.000):
  | Amostra | Voz | Link |
  |---|---|---|
  | 1 | Jessica (feminina, brincalhona, calorosa) | https://img.gravyx.com.br/69ae61c5-a98f-4ad3-aa71-093fd055137c/audio/1794767608292-sy2c7oc.mp3 |
  | 2 | Bella (feminina, calma, professora) | https://img.gravyx.com.br/69ae61c5-a98f-4ad3-aa71-093fd055137c/audio/1794767616392-6a0kv26.mp3 |
  | 3 | Liam (masculina, animada) | https://img.gravyx.com.br/69ae61c5-a98f-4ad3-aa71-093fd055137c/audio/1794767625524-eot6dry.mp3 |
- Risco anotado: as vozes do catálogo são americanas falando português; pode sair sotaque de
  estrangeiro. Se nenhuma servir: plano B = procurar voz brasileira na biblioteca da ElevenLabs ou
  clonar uma voz (Seed Audio do Gravyx), sempre com amostra antes.

### Custos do vídeo 01 até agora
| Item | Tokens Gravyx |
|---|---|
| 3 amostras de voz | 303 |
| 2 amostras novas (Liam e Will, texto "desenhar junto") | 248 |
| 3 opções do Pingo (Nano Banana Pro 1K) | 525 |
| Troca de cor do Pingo e teste da maçã (programa próprio) | 0 |
| 2 fotos de mão (caneta e pincel, Nano Banana Pro 1K) | 350 |
| 2 recortes de fundo do Gravyx (ficaram ruins, refeitos aqui de graça) | 200 |
| 15 falas do Pingo (abertura + maçã, ElevenLabs v3) | 425 |
| **Total até agora** | **2.051** |

---

## 15/11/2026 · O que o Patrik viu no AKN, voz do Liam e música

- 👀 **Patrik assistiu o AKN Kids House:** eles **desenham e pintam junto** com a criança (lápis,
  pincel, glitter), mostram o que estão fazendo, pedem para a criança fazer também, perguntam "já
  fez?", "vamos avançar". É como uma aula. **Não tem música, só efeitos sonoros.**
- ✅ **Roteiro reescrito (v2)** no estilo "desenhe e pinte junto": 6 frutas do arco-íris × ~90 s, cada
  uma em 3 ou 4 passos com "já fez?", material diferente por fruta (lápis de cor, giz de cera,
  canetinha, pincel, glitter), sem música. A v1 ficou no histórico do arquivo.
- ⚠️ Risco principal registrado: o AKN usa mão real; nós simulamos o lápis/pincel. **A maçã é feita e
  mostrada sozinha primeiro**, antes das outras 5 frutas.
- ❌ **Música cancelada** (decisão do dono, seguindo o AKN). Efeitos sonoros: eu crio (grátis, sem
  problema de direitos); se ficarem fracos, plano B = aba "Efeitos sonoros" da Biblioteca de Áudio.
- 🎙️ **Voz: Patrik gostou do Liam, mas achou mais velho; quer na idade da Bella.** Feito:
  - Nova amostra do Liam já no tom "desenhar junto" (Gravyx, ElevenLabs v3, 206 caracteres, 124 tokens).
  - Versões mais jovens feitas aqui mesmo (programa de áudio, grátis), subindo o tom 2 e 3 semitons:
    `amostras_voz/pingo_liam_original.mp3`, `amostras_voz/pingo_liam_mais_jovem_2.mp3`,
    `amostras_voz/pingo_liam_mais_jovem_3.mp3`.
  - Alternativa: voz Will (catálogo "jovem"), mesmo texto, 124 tokens:
    https://img.gravyx.com.br/69ae61c5-a98f-4ad3-aa71-093fd055137c/audio/1794768320807-qskjdal.mp3
- 🛠️ **Ambiente próprio do projeto criado** no Claude Code: "Fábrica de Conteúdo IA" (pessoal), com
  acesso a `img.gravyx.com.br` (baixar áudios e desenhos gerados no Gravyx) e aos endereços do YouTube.
  Esta sessão já usa a rede dele.

---

## 15/11/2026 · Voz aprovada, 2 gotinhas, roteiro ok e 1º teste de imagem

- ✅ **Voz do Pingo: Liam original** (sem mudar o tom). As versões mais agudas foram descartadas.
- ✅ **Decisão: o canal terá 2 gotinhas.** Pingo (voz do Liam) e uma 2ª gotinha com a **voz da Bella**,
  "mais pra frente". Nome e visual da 2ª gotinha: a definir quando ela entrar.
- ✅ **Roteiro v2 aprovado** ("roteiro ok").
- 🎨 **3 opções de visual do Pingo** geradas (Gravyx, Nano Banana Pro 1K, 3 × 175 = 525 tokens), em
  `arte/pingo/pingo_opcao_1..3.jpg`. A troca para as 6 cores do arco-íris é feita aqui por programa
  (grátis): `arte/pingo/pingo_3_opcoes_6_cores.jpg`. Funciona bem nas 3.
  - Atenção registrada: gota vermelha lembra o símbolo de doação de sangue. Como o Pingo muda de cor,
    a miniatura/foto do canal deve mostrar ele colorido (não só vermelho).
- 🍎 **Teste da maçã (o maior risco)** feito por programa próprio (grátis): `arte/testes/teste_maca_v1.mp4`
  (27 s, sem voz, com som de lápis). Contorno em 3 passos (bolinha, cabinho, folhinha) com um lápis
  desenhado fazendo o traço, depois pintura com textura de lápis de cor, cabo marrom, folha verde e
  brilho. Código em `codigo/teste_maca.py`.
  - Decisão técnica: **as frutas são desenhadas por código (vetor), não por IA.** Motivo: o traço
    passo a passo precisa saber a ordem de cada linha, o desenho fica idêntico no livro e custa zero.
    A IA fica para o Pingo, capas e miniaturas.
  - Corrigido na 2ª versão: papel estava azulado e o lápis saía de dentro da maçã ao pintar.
  - A fazer antes do vídeo inteiro: deixar o programa mais rápido (hoje ~6 min para 27 s; o vídeo de
    10 min levaria ~2 h).

---

## 15/11/2026 · Pingo escolhido, maçã v1 reprovada, referência Chiki Art e maçã v2

- ✅ **Visual do Pingo: opção 2** (gota com a ponta curvada, bracinhos e pezinhos pretos).
- ❌ **Maçã v1 reprovada** pelo Patrik ("não ficou boa"). Ele mandou um vídeo de referência:
  **Chiki Art Brazil, "NOVO Como desenhar … passo a passo"** (YouTube `kv-CY53q7rg`, 2 min 58 s,
  arquivo enviado na conversa). Quadros em `arte/testes/referencia_chiki_art_quadros.png`.
- 🔎 **O que a referência tem (analisado quadro a quadro):**
  1. **Mão de verdade** desenhando com canetão e pintando com pincel; a mão é protagonista.
  2. **Papel branco liso**, contorno **preto grosso** de canetão.
  3. **Potes de tinta glitter** em coluna nas duas laterais (5 de cada lado), cor desde o 1º segundo.
  4. **Pintura com glitter:** cores vivas, brilhantes, chapadas; cada parte de uma cor.
  5. **Desenhos com carinha** (o caracol tem olhos e sorriso).
  6. **Final mágico:** o desenho pronto vai para um fundo de nuvens em tom pastel (rosa e azul),
     com brilhos e o nome escrito.
  7. Vários desenhos em sequência no mesmo vídeo.
  - Não verificado: se tem música ou voz (o áudio é contínuo, mas eu não consigo ouvir).
- 🍎 **Maçã v2** feita nesse estilo: `arte/testes/teste_maca_v2.mp4` (33 s, sem voz ainda).
  - Mão: 2 fotos geradas no Gravyx (caneta e pincel) e recortadas aqui (o recorte do Gravyx deixou a
    pele transparente). O antebraço é alongado por programa para o corte do pulso nunca aparecer.
    Arquivos: `arte/maos/mao_caneta.png`, `arte/maos/mao_pincel.png`.
  - Contorno em 3 passos (bolinha · cabinho e folha · carinha), pintura glitter por áreas (como uma
    pessoa pinta), potes de glitter nas laterais, final com nuvens, brilhos, o Pingo aparecendo e o
    nome "Maçã".
  - Código: `codigo/teste_maca_v2.py`. Agora ~4,5 min para 33 s (vídeo de 10 min ≈ 1 h 20 min de
    computador, sem custo).

---

## 15/11/2026 · "Está imitando muito": o mecanismo Pingo e a abertura com voz

- Patrik: a maçã v2 "ficou boa, mas está imitando muito, não tem o nosso mecanismo único e precisa
  ter". Pediu para gerar o original, com voz, do início.
- ✅ **Mecanismo Pingo (o que é só nosso)**, no lugar do que era copiado da referência:
  1. **O Pingo é a tinta.** A mão só desenha o contorno (a criança desenha junto). Quem pinta é o
     Pingo: pula dentro do desenho e escorrega deixando o rastro da cor dele. (Sai: pincel e glitter.)
  2. **"De que cor é?"** O Pingo pergunta, espera a criança responder (balão "?", 2,4 s) e diz a
     frase mágica **"Pinga, pinga, Pingo... vermelho!"**, com o som-assinatura de gota. (Sai: potes.)
  3. **Completar o arco-íris.** Um arco-íris vazio no canto; cada fruta pronta voa para a vaguinha
     dela e acende a sua faixa. Motivo de ficar até o fim do vídeo. (Sai: final com nuvens.)
  - Mantido da referência só o que é do gênero: desenhar junto com mão real e contorno grosso.
- 🎙️ 15 falas geradas (Liam, ElevenLabs v3, 425 tokens), em `audio/video01/fala_01..15.mp3`. O tempo
  do vídeo é montado pela duração real de cada fala.
- 🎬 **Abertura + maçã (63,6 s)**: `videos/video01_parte1_abertura_maca_v1.mp4`. Programa:
  `codigo/video01_maca.py` (renderiza em ~1,5 min). Corrigido um erro em que a mão não saía da tela.
- 🧪 **HyperFrames:** o Patrik instalou no terminal dele e quer testar. Kit pronto em
  `hyperframes_kit/` (prompt, tempos.json, maçã em SVG, Pingo em 8 cores com fundo transparente, mão,
  15 falas). Serve para comparar os 2 caminhos (programa próprio × HyperFrames) no mesmo trecho.
