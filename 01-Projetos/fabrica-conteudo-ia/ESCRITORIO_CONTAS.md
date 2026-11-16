# Nexo Studio · Contas do escritório e como dar acesso ao Claude

> Enviado ao Patrik em 16/11/2026 (pedido: "passo a passo completo" e "como compartilhar pra você tomar conta").
> Base: `PASSO_A_PASSO_DO_ZERO.md` (Passos 6 a 12, caminho rápido). Senha nunca vai no chat; acesso é sempre
> por "instalar/conectar" numa tela oficial, e pode ser retirado a qualquer momento.

| # | Passo | Quem | Resultado | Acesso do Claude |
|---|---|---|---|---|
| 2 ✅ | GitHub: organização `nexo-studio-br` (reserva `nexo-studio-ia`) + repositório privado `escritorio` (com README) | 🧑 | casa do código | — |
| 3 ✅ | App do Claude: github.com/apps/claude/installations/select_target → org nexo-studio-br → Only select repositories → escritorio → Install; conferir claude.ai/connect-github | 🧑 | Claude lê/escreve o código | app do Claude (só no `escritorio`) |
| 4 ✅ | Vercel: o Patrik já é **Pro**. Projeto `nexo-escritorio` na equipe atual (sem custo extra), criado na D1 | 🤖 na D1 | onde o painel fica no ar | conector Vercel (já ligado) |
| 5 | Supabase (⚠️ limite Free: 2 projetos ativos somando todas as orgs; a Corpo Feliz Org já tem 2): organização "Nexo Studio" (Personal, Free) + projeto `escritorio` em São Paulo; senha do banco só no gerenciador de senhas | 🧑 | banco do escritório | **conector novo `Supabase_Nexo`** (URL `https://mcp.supabase.com/mcp`) autorizado só na organização Nexo Studio |
| 6 | Ambiente do Claude Code com o repositório + sessão nova com "COMEÇAR ESCRITÓRIO" | 🤖 + 🧑 aprova 1 tela | base do escritório montada | sessão nova lê os conectores |

Observações
- **E-mail do Nexo Studio:** studionexo512@gmail.com (duas etapas ativa). Dono das contas do Nexo (Supabase, e depois chaves de IA/Gemini/YouTube).
- Os conectores "Supabase" e "Supabase_Clientes" que já existem são de outras organizações: **não usar** no Nexo.
- Metricool: falta criar a marca "Pingo Pinta" (ver `DECISOES_E_AVANCOS.md`, Automação Passo 1).
- Supabase Free pausa após 1 semana parado (religa com 1 clique).
