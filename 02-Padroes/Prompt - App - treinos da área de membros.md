---
type: padrao
title: "Prompt - App - treinos da área de membros"
project: "Corpo Feliz - Comunidade"
tags: [tipo/padrao, projeto/corpo-feliz-comunidade, prompt, app, greenn]
keywords: [prompt, app corpo feliz, treinos, area de membros, plano b, app_cf_aulas]
created: 2026-11-08
updated: 2026-11-08
summary: "Prompt da conversa que cadastra no App Corpo Feliz os treinos da área de membros (mapa feito pelo Claude Desktop) e fecha os minutos do Plano B."
---

# Prompt (copiar inteiro, mandar junto com o print do final do Claude Desktop)

```
Tarefa: colocar no App Corpo Feliz (/app no LR_LauraRosaPersonal) os treinos da área de membros da Comunidade,
para o app dizer à aluna qual treino fazer hoje na Greenn.

Leia primeiro (só as seções que precisar):
- Obsidian: "01-Projetos/Corpo Feliz - Comunidade.md" (Status e Registro) e
  "01-Projetos/Corpo Feliz - Comunidade/Comunidade - app pronto para teste (08-11).md".
- Obsidian: a pasta da área de membros que o Claude Desktop acabou de montar (print anexo; a branch e o caminho estão nele).
- LR_LauraRosaPersonal: docs/APP_CORPO_FELIZ.md (seções "Aulas e prêmios" e "Correções de 08/11") e o CLAUDE.md.

Como o app já funciona (PR #367, no ar desde 08/11):
- Cada treino é uma linha em app_cf_aulas: id, titulo, minutos, nivel, foco, local, aparelhos, fases, cuidados, programa,
  modulo, link, publicada. Aula com "link" (sem bunny_id) mostra "Assistir na área de membros" e abre o link fora do app;
  "Concluí" conta no ranking. O treino do dia (treinoDoDia em app/app/_lib.ts) escolhe pelo tempo, aparelhos, cuidados e fase.
- Link da área: AREA_MEMBROS_URL = https://comunidadecorpofeliz.greenn.club/ (lib/app-cf/config.ts).

O que fazer:
1. Monte a lista dos treinos a partir da pasta do Desktop, só com o que está lá. titulo = "Módulo › Aula" com os nomes EXATOS.
   link = link direto da aula se existir; senão, o AREA_MEMBROS_URL. Campo sem informação: deixe vazio e me diga quais.
   Use só os valores aceitos pelo app (veja PERGUNTAS_PLANO em lib/app-cf/config.ts e os campos de app_cf_aulas).
2. Me mostre a tabela antes de gravar (quantos por faixa de tempo e por local) e espere meu OK.
3. Com o OK, grave como arquivo de carga idempotente em supabase/app-cf-aulas-greenn.sql (upsert por id) e aplique no banco
   onde o app roda hoje. Decida comigo se os 5 "Treinos de Novembro" (YouTube) continuam publicados.
4. Plano B: com os treinos curtos que existem, me mostre as opções (5 ou 10 min no código e no botão "Só 10 minutos de
   movimento") e espere eu escolher. Depois ajuste minutosDoDia (app/app/_lib.ts) e PLANO_B (lib/app-cf/config.ts).
5. Branch própria (claude/app-treinos-greenn), PR em rascunho, prints no celular (Hoje com o treino do dia, Treinar por tempo,
   uma aula da Greenn), painel oficial no mesmo PR (app/paineloficialcorpofeliz/_dados.ts).

Regras: NUNCA INVENTE NADA (nome, duração ou link que não está na pasta). Nada de pagamento. Não mesclar sem o meu OK.
Atenção: vai existir um projeto Supabase só do app (outra conversa, prompt "Prompt - App - projeto Supabase só do app"):
por isso a carga fica num arquivo .sql reaplicável.
Ao terminar, atualize o Status e o Registro em "01-Projetos/Corpo Feliz - Comunidade.md" no Obsidian.
```
