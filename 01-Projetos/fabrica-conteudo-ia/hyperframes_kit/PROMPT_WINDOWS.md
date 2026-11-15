# Pedido para o Claude Code no Windows montar tudo sozinho (HyperFrames · cena da maçã)

Cole o texto entre as linhas `=====` no Claude Code aberto na pasta `pingo` (passo a passo na conversa
de 15/11 e em `DECISOES_E_AVANCOS.md`).

=====
Estou no Windows, usando o PowerShell. Faça tudo por mim, um passo de cada vez, e me explique em uma
frase o que cada comando faz antes de rodar. Só pare para me pedir algo se precisar de login ou se der
erro.

1. Confira se tenho Node.js 22 ou mais novo, Git e FFmpeg (`node -v`, `git --version`,
   `ffmpeg -version`). Se faltar o FFmpeg, instale com `winget install --id Gyan.FFmpeg -e` e me avise
   se eu precisar fechar e abrir o terminal de novo. Se faltar o Git, instale com
   `winget install --id Git.Git -e`.
2. Nesta pasta, crie o projeto do HyperFrames: `npx hyperframes init pingo-maca` (aceite as opções
   padrão; se perguntar por um exemplo, escolha o projeto em branco).
3. Baixe o kit do meu repositório (é privado; se pedir login do GitHub, eu faço no navegador):
   `git clone --depth 1 --branch claude/eloquent-curie-p5b8ec https://github.com/patrikgonzaga2-tech/Obsidian.git kit-pingo`
4. Copie para dentro de `pingo-maca` a pasta
   `kit-pingo\01-Projetos\fabrica-conteudo-ia\hyperframes_kit\assets` e o arquivo
   `kit-pingo\01-Projetos\fabrica-conteudo-ia\hyperframes_kit\tempos.json`.
5. Dentro de `pingo-maca`, instale as instruções do HyperFrames para você: `npx hyperframes skills update`.
   Se a skill do HyperFrames não ficar disponível nesta conversa, me avise para eu fechar o Claude e
   abrir de novo dentro de `pingo-maca`.
6. Leia `kit-pingo\01-Projetos\fabrica-conteudo-ia\hyperframes_kit\PROMPT_HYPERFRAMES.md` e siga
   tudo que está entre as linhas `=====` dele para criar a composição dentro de `pingo-maca`.
7. Rode o lint, abra o preview para eu ver (`npx hyperframes preview`) e depois renderize
   (`npx hyperframes render`). No fim, me diga o caminho completo do arquivo .mp4, quanto tempo levou
   e o que não conseguiu fazer.
=====
