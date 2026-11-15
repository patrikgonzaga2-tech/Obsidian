# Fábrica de Conteúdo IA · Pesquisa de 14 e 15/11/2026

Dados coletados pelo Gravyx (`analisar_canal_youtube`, canais públicos, grátis) e por buscas.
Multiplicador = views do vídeo ÷ mediana de views do próprio canal (vídeos recentes analisados).

## 1. Canais infantis brasileiros de música (118 vídeos, skill /yt-viral)

| Vezes a mediana | Canal | Vídeo | Duração |
|---|---|---|---|
| 13,8x | Bob Zoom | Borboletinha | 26 s |
| 11,4x | Mundo Bita | Ilariê (com Xuxa) | 3 min |
| 10,3x | Mundo Bita | Onde tudo começou (compilado) | 54 min |
| 9,5x | Galinha Pintadinha | Upa Cavalinho | 2 min |
| 9,0x | Bob Zoom | O Sapo Não Lava o Pé | 29 s |
| 7,0x | Mundo Bita | The Little Farm (inglês) | 2 min 39 s |
| 5,5x | Palavra Cantada | A dança da criançada | 20 s |

Padrão: cantigas conhecidas em versão curta animada; compilados longos; versão em inglês.
Obs.: a lista da Galinha Pintadinha devolvida pela ferramenta não era só de vídeos recentes.

## 2. Canais de inspiração do Patrik (40 vídeos cada)

| Canal | Inscritos | Formato | Mediana | Melhor (x mediana) |
|---|---|---|---|---|
| AKN Kids House | 3,51 mi | desenhar e colorir com canetão | 268 mil | 17,7 mi (66x) |
| Magic Fingers Art | 9,2 mi | desenhar, pintar, colorir à mão, tom calmo | 570 mil (817 mil só longos) | 5,2 mi (9x; 6,4x só longos) |
| Geethanjali Kids | 1,64 mi | contos e histórias bíblicas, 2 por vídeo de ~20 min | 5,6 mil | 48 mil (8,6x) |
| Illuminated Films | 705 mil | distribuidora de séries de TV | 5,7 mil | 13 mil (2,3x); não serve de modelo |

Padrões: AKN = "Learn Colors" + objeto simples, 8 a 16 min, emoji no início do título, versões em
hindi/turco, Shorts com "(Watch Full Video!)". Magic Fingers = séries numeradas, letras e números em
vídeos de 30 a 37 min, versões em indonésio, agora Shorts diários "número 1, 2, 3".
**Hipótese não comprovada:** "colorir" seria barato com IA. Os títulos indicam mão real desenhando
("hand-drawn, real paper", "big marker"); falta assistir os vídeos e testar.

## 3. Regras confirmadas em fonte oficial (15/11, via busca restrita aos sites oficiais)
- YouTube "conteúdo para crianças": sem comentários e notificações, sem anúncio personalizado; canal
  inteiro marcado perde sininho, membros e posts.
- YouTube "conteúdo inautêntico" (desde 15/07/2025): conteúdo repetitivo/em massa não monetiza;
  exemplo oficial: IA com modelos genéricos e cara de produção em massa.
- Post do blog do YouTube: requisitos novos do YPP (8.000 horas em 12 meses ou 20 mi de views em
  Shorts em 90 dias), mudanças a partir de 01/02/2027. **Visto só pelo resumo da busca; confirmar.**
- Amazon KDP: declarar imagens geradas por IA (capa e miolo), mesmo editadas.

## 4. Ferramentas encontradas
- YouTube Agent Skill (Jakeschincariol, MIT, ~6 mil ★): 11 skills /yt-*; notas do hookscore e
  title.py feitas para inglês (adaptar). Instalada no Obsidian em 14/11 (PR #24).
- Habblaud (marmottajr, MIT, ~1,3 mil ★): escritório pixel art de agentes; só mostra sessões locais.
- Hypit (hypit-ai, ~30 mil ★, Apache modificada): modelagem de vídeo; proibido como SaaS sem licença.
- ScrapeCreators social-media-research-skills (~6,4 mil ★, API paga); TubeLab youtube-research-skills
  (82 ★, API paga). Skills de "nota de viralidade" com 2 a 3 ★: não confiáveis.
- GitHub: MoneyPrinterTurbo (~143 mil ★, vídeo de banco de imagens), AI-Youtube-Shorts-Generator
  (~6 mil ★, cortes para Shorts).

## 5. Bloqueios técnicos encontrados
- YouTube bloqueia download vindo da nuvem ("confirme que não é um robô"), mesmo com a rede liberada.
  Saída: Gemini pelo link (chave) ou o dono subir o arquivo.
- `npx skills find` não devolveu nada para nenhuma busca (provável bloqueio de rede).
- Vídeo de referência do Patrik ainda não analisado: https://www.youtube.com/watch?v=Anz3niQcJSc
