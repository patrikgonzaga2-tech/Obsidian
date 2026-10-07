# 🧠 Segundo Cérebro

Cofre Obsidian que serve de memória única para **Claude Code** e **Codex**, em todos os projetos do computador.

## Instalar (uma vez só)
1. Coloque esta pasta no seu computador e abra-a no Obsidian (*Abrir pasta como cofre*). Cores do grafo e do explorador já vêm configuradas (`.obsidian/`).
2. No terminal, dentro da pasta: `node _sistema/install.mjs` (requer Node 18+). Desfazer: `node _sistema/install.mjs --uninstall`.
3. Abra uma nova sessão do Claude Code / Codex. Pronto — nada mais a pedir.

## O que acontece sozinho
| Momento | Claude Code | Codex |
|---|---|---|
| Abrir sessão | hook `SessionStart` injeta protocolo + notas do projeto | `~/.codex/AGENTS.md` |
| Nova tarefa | hook `UserPromptSubmit` busca no índice notas relacionadas (de qualquer projeto) e injeta | AGENTS.md manda rodar `brain.mjs recall` |
| Fim do turno | hook `Stop` loga a sessão e **bloqueia o encerramento** até o aprendizado ser registrado (`brain.mjs note`) | AGENTS.md manda registrar; `notify` loga a sessão |

## Estrutura e cores
| Pasta | Conteúdo | Cor |
|---|---|---|
| `00-Indices` | MOCs gerados automaticamente | 🟡 |
| `01-Projetos` | uma nota por projeto (criada ao detectar) | 🔵 |
| `02-Padroes` | padrões reutilizáveis | 🟣 |
| `03-Decisoes` | decisões e motivos | 🟠 |
| `04-Preferencias` | preferências do usuário | 🩷 |
| `05-Stack` | tecnologias, versões, comandos | 🟢 |
| `06-Aprendizados` | erros, soluções, insights | 🩵 |
| `07-Sessoes` | log diário automático | ⚪ |

Notas usam frontmatter (`type`, `project`, `tags`, `keywords`, `summary`) e ligam-se ao projeto com `[[wikilinks]]`, formando o grafo.
`_sistema/index.json` é o índice de busca (regenerado a cada registro; ignorado pelo git).
