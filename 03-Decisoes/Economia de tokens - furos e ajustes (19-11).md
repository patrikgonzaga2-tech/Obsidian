---
type: decisao
title: "Economia de tokens - furos e ajustes (19-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, claude, rotinas, tokens]
keywords: [tokens, custo, rotina, routine, sonnet, opus, conversa longa, contexto, skills, conectores, claude.md]
created: 2026-11-19
updated: 2026-11-19
summary: "Revisão do gasto de tokens: o maior furo era rotina acordando conversa aberta de 425 mil tokens; rotinas passam para Sonnet e sessão nova, skills de pesquisa só por /comando, docs e painel enxugados, regras no CLAUDE.md."
---

# Economia de tokens: furos e ajustes (19/11)

Projeto: [[Corpo Feliz - Comunidade]]

## Furos achados (Patrik: "estamos gastando muito tokem, identifica os furos")
1. **Rotina dentro de conversa aberta.** A conversa "LAURA AJUSTES VSL" (aberta em 08/11, Opus) chegou a 425 mil tokens de contexto, US$ 514 e 1,2 bilhão de tokens lidos de cache. A rotina de verba de 2 em 2 h (10x por dia), a das 23h59 e 2 lembretes disparam dentro dela: cada passo relê a conversa inteira.
2. **Rotinas em Opus sem precisar:** Seguidores do Instagram, Resumo do App e Agente PTK.
3. **Conectores demais:** ~840 ferramentas (13 conectores) entram em toda conversa e todo subagente; o Agente PTK carrega Vercel, Supabase-Clientes e UMCLIQUE, que o próprio texto proíbe usar.
4. **31 skills listadas em toda conversa**, a maioria de pesquisa (deepsearch-*, yt-*) que quase não se usa.
5. **Regras que obrigam leitura grande:** `_dados.ts` do painel oficial (387 KB) em todo PR; `ESTEIRA_EMAIL_EL.md` (41 KB) lido inteiro; pasta COPY LADEIRA sem caminho direto; `corpo-feliz-agente` mandando ler a pasta OpenMontage, que não existe na nuvem.

## Feito em 19/11 (Patrik: "arruma tudo")
- Seguidores, Resumo do App e Agente PTK passam a rodar em **Sonnet**.
- 26 skills (deepsearch-*, indepth-deepsearch, funnel-spy, escala, find-skills, yt-*) com `disable-model-invocation: true`: só por /comando, sem descrição no contexto.
- Diário da esteira de e-mails foi para `docs/arquivo/ESTEIRA_EMAIL_EL_HISTORICO.md` (41 → 14 KB); pedidos do painel oficial até 11/11 foram para `_pedidos_historico.ts` (`_dados.ts` 387 → 195 KB).
- CLAUDE.md: rotina sempre em sessão nova e Sonnet, nunca acordando conversa aberta; conversa longa vira passagem de bastão; arquivo grande só por grep + trecho; COPY LADEIRA pelo código da aula.

## Pendente com o Patrik
- O ambiente barrou o Claude de recriar as rotinas de verba. Recriar em claude.ai/code/routines como "nova sessão a cada execução", em Sonnet, só com META-ADS e Supabase (e os 2 lembretes também), e apagar as antigas.
- Tirar Vercel, Supabase-Clientes e UMCLIQUE do Agente PTK (recriar quebraria o botão do painel).
- Desligar no dia a dia os conectores pouco usados (Gravyx, Canva, VTurb, Metricool, Gmail, Supabase_Nexo) e abrir a conversa só com os repositórios que a tarefa usa.
- Encerrar a conversa "LAURA AJUSTES VSL" e seguir numa nova com a passagem de bastão que já está pronta.
