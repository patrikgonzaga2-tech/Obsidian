---
type: decisao
title: "Skill find-skills instalada no projeto (12-11)"
project: "Segundo Cérebro"
tags: [tipo/decisao, projeto/segundo-cerebro, skills, claude-code, seguranca]
keywords: [find-skills, skills, vercel-labs, npx skills, .claude/skills, skills-lock, snyk, permissões]
created: 2026-11-12
updated: 2026-11-12
summary: "find-skills (vercel-labs) fica versionada em .claude/skills/find-skills no LR_LauraRosaPersonal. Instalada pelo Patrik na máquina dele; o ambiente na nuvem bloqueia npx. Instalar skill nova segue sob OK do Patrik."
---

# Skill find-skills instalada no projeto (12/11)

Projeto: [[Segundo Cérebro]] (vale para o repositório LR_LauraRosaPersonal)

## Contexto
O Patrik quis a skill `find-skills` da Vercel (vercel-labs/skills), que procura e instala outras skills do ecossistema com `npx skills find` e `npx skills add`. Não estava instalada na sessão.

## Decisão (Patrik, 12/11)
- Escolha: instalar **no projeto** (fica no repositório, vale para todas as sessões) e guardar o registro aqui.
- Por que o Patrik instalou: o ambiente de nuvem do Claude bloqueou o `npx skills add` (classificador de segurança). Caminho seguido: o Patrik roda o comando na máquina dele, faz commit e push; o Claude lê o `SKILL.md` e registra.

## Como ficou
- Skill em `.claude/skills/find-skills/SKILL.md`, **cópia real**. A ferramenta cria um link simbólico a partir de `.agents/skills/`, que no Windows quebra no git e na nuvem.
- `skills-lock.json` na raiz guarda origem (vercel-labs/skills) e hash.
- `.agents/` entrou no `.gitignore` (só duplicaria a skill para Codex, Gemini e outros, que não são usados aqui).
- Registrada no Painel oficial (diário de pedidos, 12/11).

## Revisão de segurança
- Verificação da ferramenta: Gen e Socket "seguro"; Snyk "risco médio" (esperado: a skill manda rodar `npx skills add`, que traz código de terceiros).
- `SKILL.md` lido inteiro em 12/11: só orienta buscar, checar instalações/estrelas/fonte e propor. Sem comandos escondidos.
- Atenção: o passo 6 sugere `npx skills add ... -g -y` (global, sem confirmar). **Regra combinada:** o Claude não instala skill por conta própria; propõe e espera o OK do Patrik, e instala no projeto, não global.

## Pendência
- Nenhuma. Para atualizar a skill: `npx skills update` na máquina do Patrik e novo commit.

## Alternativas descartadas
- **Instalar só na sessão (`~/.claude/skills`):** some quando o container é reciclado.
- **Escrever uma skill própria parecida:** o Patrik preferiu a original da Vercel.
- **Liberar `npx` na nuvem:** o Patrik escolheu instalar na máquina dele.
