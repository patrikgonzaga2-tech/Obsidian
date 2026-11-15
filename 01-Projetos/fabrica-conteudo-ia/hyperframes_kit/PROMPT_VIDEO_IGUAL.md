# Prompt detalhado: refazer no HyperFrames o MESMO vídeo da parte 1 (abertura + maçã)

> Para colar no Claude Code do Windows, aberto na pasta do projeto HyperFrames que ele já criou.
> Copie tudo entre as linhas `=====`. Referência para comparar:
> `videos/video01_parte1_abertura_maca_v1.mp4` (63,6 s, feito pelo programa `codigo/video01_maca.py`).

=====
Quero que você recrie no HyperFrames, nesta pasta de projeto que você já criou, um vídeo IGUAL a um
que já existe, para eu comparar os dois. Siga as medidas e os tempos exatamente. Use a skill do
HyperFrames. Estou no Windows (PowerShell). Antes de cada comando, me diga em 1 frase o que ele faz.

## PASSO 0 · Baixar os arquivos (obrigatório antes de tudo)
Os arquivos estão no meu repositório privado do GitHub, na pasta
`01-Projetos/fabrica-conteudo-ia/hyperframes_kit` do branch `claude/eloquent-curie-p5b8ec`.
1. Baixe só essa pasta para um lugar temporário (se pedir login do GitHub, eu faço no navegador):
   git clone --depth 1 --filter=blob:none --sparse --branch claude/eloquent-curie-p5b8ec https://github.com/patrikgonzaga2-tech/Obsidian.git $env:TEMP\kit-pingo
   cd $env:TEMP\kit-pingo ; git sparse-checkout set 01-Projetos/fabrica-conteudo-ia/hyperframes_kit 01-Projetos/fabrica-conteudo-ia/videos
2. Volte para a pasta do projeto e copie para dentro dela: a pasta `assets` inteira, `tempos.json` e
   `caminhos.json` (de `...\hyperframes_kit\`), e o vídeo de referência
   `...\videos\video01_parte1_abertura_maca_v1.mp4` com o nome `referencia.mp4`.
3. Confirme que existem: assets\pingo_neutro.png, pingo_vermelho.png, pingo_verde.png,
   pingo_marrom.png, pingo_laranja.png, pingo_amarelo.png, pingo_azul.png, pingo_roxo.png,
   assets\mao_caneta.png, assets\maca.svg, assets\fala_01.mp3 até fala_15.mp3, assets\efeitos.mp3.
   Se o git não funcionar, me peça para baixar o ZIP pelo navegador.

## QUADRO
- Composição `pingo-maca`, 1920 x 1080, 30 fps, duração 63,6 s. Fundo branco #FFFFFF liso o tempo todo.
- Todas as coordenadas abaixo são em pixels nesse quadro (0,0 = canto superior esquerdo).

## ÁUDIO (é ele que manda no tempo)
- Faixa de efeitos: `assets/efeitos.mp3` começando em 0 s, duração 63,6 s, volume 1. Ela já tem todos
  os efeitos no tempo certo (pulo, canetão, gotas, pintura, sininhos). NÃO crie outros efeitos.
- 15 falas, cada uma um `<audio>` com volume 1, começando em (segundos):
  fala_01 0.40 · fala_02 3.02 · fala_03 8.28 · fala_04 13.97 · fala_05 18.67 · fala_06 21.28 ·
  fala_07 25.38 · fala_08 28.08 · fala_09 32.18 · fala_10 34.85 · fala_11 38.66 · fala_12 42.04 ·
  fala_13 52.30 · fala_14 56.40 · fala_15 60.50
  (as durações estão em `tempos.json`).

## PERSONAGEM: PINGO (gotinha de tinta)
- Imagens com fundo transparente, 781 x 887 px cada: `assets/pingo_<cor>.png`, cores: neutro,
  vermelho, laranja, amarelo, verde, azul, roxo, marrom. Mudar de cor = trocar a imagem na hora.
- "Casa" do Pingo: PÉS (meio da borda de baixo da imagem) em x=250, y=1000; altura 300 px
  (largura 264 px). Embaixo dos pés, sombra oval preta 18% de opacidade, 200 x 24 px, desfocada 4 px.
- Enquanto alguma fala toca e ele está na casa: "fala balançando" = escalaY 1 + 0,08·sen(t·26),
  escalaX = 1/escalaY, com a base presa nos pés.
- 0,0–0,6 s: entra NEUTRO pela esquerda: x de -120 até 250 (easing suave), pulando em arco de 220 px
  de altura (y dos pés = 1000 − 220·sen(π·u)).
- 4,62–8,13 s: troca de cor 6 vezes em partes iguais (vermelho, laranja, amarelo, verde, azul, roxo),
  pulando sem parar (sobe |sen(t·9)|·40 px). Em 8,13 s volta a NEUTRO.
- 36,26–38,66 s ("espera a criança responder"): parado na casa, inclinando ±8° (8·sen(t·2,5)).
- Balão de pergunta de 34,85 até 38,66 s (aparece em 0,3 s): círculo branco raio 75 com borda preta
  6 px, centro (450, 570), rabinho apontando para o Pingo (de (400,630) até (380,675) e (435,640)),
  e dentro um "?" vermelho #E62633, fonte sem serifa negrito, 100 px, centralizado.
- 40,88 s: vira VERMELHO + respingos: 10 bolinhas vermelhas saindo do ponto (250, 850) em 10
  direções iguais; em 0,6 s vão de 40 a 170 px de distância, caem 60·u² px, raio de 14 para 3 px e
  somem pela metade da opacidade.
- 44,30–45,10 s: pula para dentro da maçã: dos pés na casa até o primeiro ponto de
  `caminhos.json > pintura.corpo.pontos` (+75 px em y, porque é a posição dos pés), em arco de 260 px,
  dando 1 giro completo (−360°) e encolhendo de 300 para 150 px de altura.
- 45,10–52,10 s PINTA O CORPO: o Pingo (150 px de altura, pés = ponto do caminho + 75 px em y) percorre
  TODOS os pontos de `pintura.corpo.pontos` em velocidade constante, balançando 8·sen(t·18) graus e
  amassando ±6%. Por onde ele passa fica um rastro de tinta de 80 px de largura, pontas redondas,
  cor #E82430, recortado pela área `#tinta-corpo` do `maca.svg` e SEM pintar os 2 olhos brancos
  (círculos em `olhos_brancos`). Dica: use o caminho como um `<path>` de 80 px num `<mask>` animado por
  stroke-dashoffset. A tinta é um pouco mais escura nas bordas (80% da cor na borda até 100% a 70 px
  para dentro); se ficar difícil, use cor lisa.
- 52,10–52,75 s: fica parado no 1º ponto de `pintura.folha.pontos`.
- 52,55 s: vira VERDE com respingos verdes (#46C346) no lugar onde está. 52,75–54,30 s: pinta a folha
  do mesmo jeito (rastro 46 px, cor #46C346, recortado por `#tinta-folha`).
- 54,35 s: vira MARROM com respingos marrons. 54,50–55,40 s: percorre `pintura.cabo.pontos` deixando
  traço marrom #8C5528 de 26 px.
- 55,50–56,20 s: pula de volta para a casa (do fim do cabo até a casa), arco de 300 px, 1 giro
  (+360°), crescendo de 150 para 300 px. Ao chegar, vira VERMELHO.
- 60,50 s: vira NEUTRO. Fica balançando na casa até o fim.

## MÃO COM CANETÃO (desenha o contorno)
- `assets/mao_caneta.png` (1154 x 1154) mostrada com escala 1,583 (≈ 1827 x 1827 px). A ponta da
  caneta fica no pixel (194, 197) da imagem original, ou seja (307, 312) já na escala: posicione a
  imagem para esse ponto ficar EXATAMENTE na ponta do traço. Sombra: cópia preta 16% desfocada 14 px,
  deslocada (+25, +30). A mão fica por cima de tudo.
- Fora da tela = ponta em (1500, 1250).
- 13,27–13,97 s: entra de (1500, 1250) até (900, 405) (início da bolinha).
- Contorno: preto #1C1C1C, 17 px, pontas e cantos redondos. Use os pontos de `caminhos.json >
  contorno` (ou os paths do `maca.svg`, que são os mesmos). Velocidade constante ao longo do comprimento.
  Entre um traço e outro do mesmo passo a mão "levanta" e vai até o início do próximo.
  - 14,17–18,17 s: passo1 (a bolinha grande = corpo).
  - 21,58–24,88 s: passo2 (cabinho, depois folhinha).
  - 28,38–31,48 s: passo3 (olho esquerdo, olho direito, sorriso). Em 31,48 s aparecem as 2 pupilas
    pretas (`pupilas`).
- 31,78–32,48 s: a mão sai indo para (1500, 1250) e não volta mais.

## ARCO-ÍRIS (canto superior direito)
- Aparece de 9,08 a 10,28 s crescendo de 20% para 100% com um pulinho (+8% no meio), com centro de
  escala em (1665, 330).
- 6 meias-luas (só a metade de cima), centro (1665, 330), raios 215, 190, 165, 140, 115, 90, espessura
  22 px, todas cinza claro #EBEBED (vazias).
- Cores das faixas (de fora para dentro): #E82430, #F78C1E, #FACD28, #46C346, #328CE6, #9646C8.
- 6 vaguinhas: círculos raio 34, centros y=395 e x = 1439, 1523, 1607, 1691, 1775, 1859, cada um com a
  cor da sua faixa a 20% de opacidade e borda tracejada 3 px (traço 6, espaço 6) na cor da faixa.

## FINAL DA MAÇÃ
- 56,70 s: aparece um reflexo branco (90% opaco) na maçã: arcos de círculo com centro (900, 610), raio
  240, de 198° a 232° e de 240° a 247° (ângulos no sentido horário a partir das 3 h), 24 px, pontas
  redondas.
- 58,10–59,40 s: a maçã inteira (tinta + contorno + olhos + reflexo) voa para a 1ª vaguinha
  (1439, 395): encolhe até ficar com 62 px de altura e faz um arco subindo 180 px no meio do caminho.
  Assim que começa a voar, o papel fica branco (a maçã grande some). Ela fica pequena na vaguinha até o
  fim.
- 59,40–60,20 s: a faixa vermelha (a de fora, raio 215) se enche de cinza para #E82430, da ponta
  esquerda até a direita, passando por cima.

## ENTREGA
1. Rode o lint do HyperFrames e corrija o que ele apontar.
2. Abra o preview para eu olhar.
3. Renderize para `pingo-maca.mp4` na pasta do projeto.
4. Coloque lado a lado com `referencia.mp4` (pode ser um vídeo lado a lado feito com o FFmpeg:
   ffmpeg -i referencia.mp4 -i pingo-maca.mp4 -filter_complex "[0:v]scale=960:-2[a];[1:v]scale=960:-2[b];[a][b]hstack" -map 1:a comparacao.mp4 ).
5. Me diga: quanto tempo levou para renderizar, o que ficou diferente da referência e o que você não
   conseguiu fazer.
=====
