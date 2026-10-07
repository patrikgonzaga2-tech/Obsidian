---
type: decisao
title: "Arquitetura do Segundo Cérebro"
project: "Segundo Cérebro"
tags: [tipo/decisao, projeto/segundo-cerebro, obsidian, hooks, automacao]
keywords: [segundo cerebro, hooks, recall, obsidian, memoria, claude code, codex, arquitetura, segundo, cerebro, cofre, hook, globai, claude, agent, notify, registro, automatico]
created: 2026-10-07
updated: 2026-10-07
summary: "Cofre Obsidian + hooks globais (Claude Code) + AGENTS.md/notify (Codex) para recall e registro automáticos."
---

# Arquitetura do Segundo Cérebro

Projeto: [[Segundo Cérebro]]

**Recall:** hooks SessionStart/UserPromptSubmit consultam `_sistema/index.json` e injetam notas relacionadas.
**Registro:** hook Stop bloqueia o fim do turno se houve trabalho sem nota; o CLI `brain.mjs note` grava com frontmatter padrão e reindexa.
**Codex:** instruções globais em `~/.codex/AGENTS.md` + `notify` para log mecânico.
**Cores:** `.obsidian/graph.json` (grafo) e snippet CSS `segundo-cerebro` (explorador/tags).

## Atualização 2026-10-07 (Segundo Cérebro)
Projeto agora registrado.

## Atualização 2026-10-07 (Segundo Cérebro)
Projeto vinculado.

## Atualização 2026-10-07 (Segundo Cérebro)
x

## Atualização 2026-10-07 (Segundo Cérebro)
Projeto vinculado.
