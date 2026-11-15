# Prompt para o Claude Code (no terminal do Patrik) criar a cena da maçã no HyperFrames

> Como usar: veja o passo a passo em `LEIA_PRIMEIRO.md`. Copie TUDO que está entre as linhas `=====`
> e cole no Claude Code aberto dentro da pasta do projeto HyperFrames.

=====
Use a skill do HyperFrames (/hyperframes) para criar a composição `pingo-maca` em 1920x1080, 30 fps,
duração de 64 segundos. É a abertura + 1ª fruta do canal infantil "Pingo Pinta" (crianças de 2 a 5
anos, desenhar e colorir). Todos os arquivos estão em `./assets/` e os tempos exatos em `./tempos.json`
(leia esse arquivo: cada fala tem `inicio_s` e `duracao_s`, e `eventos_s` tem o tempo de cada ação).

ESTILO
- Fundo: papel branco liso (#FFFFFF). Nada de potes de tinta, nada de glitter, nada de nuvens.
- Contorno preto grosso (#1C1C1C, 17 px, pontas redondas), tudo vetorial com o `assets/maca.svg`.
- Personagem: o Pingo, uma gotinha de tinta. Há uma imagem dele (fundo transparente) para cada cor:
  `assets/pingo_neutro.png` (sem cor), `pingo_vermelho.png`, `pingo_verde.png`, `pingo_marrom.png`,
  `pingo_laranja.png`, `pingo_amarelo.png`, `pingo_azul.png`, `pingo_roxo.png`.
  Trocar de cor = trocar a imagem com um "pop" (escala 1 → 1,25 → 1) e respingos da cor nova
  (8 a 10 bolinhas que saem do Pingo e somem).
- "Casa" do Pingo: canto inferior esquerdo, pés em (250, 1000), 300 px de altura. Quando ele fala,
  balança de leve (escala vertical 1 ↔ 1,06, rápido). Sempre com uma sombrinha oval no chão.
- Mão: `assets/mao_caneta.png` (mão real segurando canetão). A PONTA DA CANETA fica no pixel
  (194, 197) da imagem: posicione a imagem de forma que esse ponto siga exatamente a ponta do traço
  que está sendo desenhado. A mão entra pelo canto inferior direito e sai por lá.

O MECANISMO DO CANAL (é o que nos diferencia; não pode faltar)
1. O PINGO É A TINTA: a mão só desenha o contorno. Quem pinta é o Pingo: ele pula para dentro da maçã
   (arco no ar + 1 giro, encolhendo para 150 px) e ESCORREGA em zigue-zague pela área, deixando um
   rastro de tinta da cor dele (máscara que vai revelando `#tinta-corpo`). Depois vira verde e pinta
   `#tinta-folha`, vira marrom e pinta `#tinta-cabo`, e pula de volta para a casa.
2. "DE QUE COR É?": depois da fala 10 aparece um balão branco com "?" vermelho perto do Pingo, e ele
   fica 2,4 s esperando a criança responder (balançando a cabeça). Na fala 11 ("Pinga, pinga, Pingo...
   vermelho!") ele vira vermelho exatamente em `eventos_s.vira_verm`.
3. COMPLETAR O ARCO-ÍRIS: no canto superior direito (centro do arco em 1665, 330) há um arco-íris de
   6 faixas (raio 215 a 90, 22 px de espessura) começando CINZA CLARO (vazio), com 6 vaguinhas
   tracejadas embaixo (uma por cor). Ele aparece em `arco_aparece` crescendo com um pulinho. No fim
   da maçã, a maçã inteira (tinta + contorno) encolhe e voa num arco até a 1ª vaguinha (a vermelha),
   e a faixa vermelha do arco-íris se enche da esquerda para a direita (`voa` e depois 0,8 s).

SEQUÊNCIA (use os tempos do tempos.json)
- 0,0–0,6 s: Pingo neutro entra pulando pela esquerda até a casa. Fala 1.
- Fala 2: em `cores` ele pisca pelas 6 cores (vermelho, laranja, amarelo, verde, azul, roxo) pulando,
  e volta a ser neutro.
- Fala 3: o arco-íris vazio aparece.
- `mao_entra`: a mão entra. `c0`: desenha `#passo1-bolinha` (stroke-dashoffset). Fala 5.
- `c1`: desenha `#passo2-cabinho` e depois `#passo2-folhinha` (a mão "levanta" e vai até o próximo
  traço). Fala 7.
- `c2`: desenha `#passo3-olho-esq`, `#passo3-olho-dir`, `#passo3-sorriso`; no fim aparecem `#pupilas`.
  `mao_sai`: a mão sai.
- Fala 9 ("É uma maçã!"), fala 10 + `espera` (balão "?"), fala 11 + `vira_verm`.
- Fala 12, `pula_dentro`, `pinta0` (corpo vermelho, 7 s), fala 13 com `vira_verde`/`pinta1` e
  `vira_marrom`/`pinta2`, `pula_fora`.
- Fala 14: em `brilho` aparece um reflexo branco curvo na maçã + sininho; em `voa` a maçã vai para o
  arco-íris e a faixa vermelha enche.
- Fala 15: o Pingo volta a ser neutro em `vira_neutro`. Segura a imagem até 64 s.

ÁUDIO
- Cada `assets/fala_XX.mp3` entra como `<audio>` com `data-start` = `inicio_s` e `data-duration` =
  `duracao_s`, volume 1.
- Sem música. Se a skill tiver efeitos sonoros, use: "pinga" (gota) a cada troca de cor, som de
  canetão enquanto desenha, sininho no brilho e quando a faixa do arco-íris enche. Volume baixo (0,3).

No fim: rode o lint, faça o preview e renderize para `pingo-maca.mp4`. Me diga o tempo que levou
para renderizar e qualquer coisa que não conseguiu fazer.
=====
