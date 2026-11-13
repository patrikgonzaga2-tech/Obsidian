---
type: decisao
title: "Painel PTK - Atualizar tudo direto do Meta e fim dos timeouts (13-11)"
project: "Painel PTK"
tags: [tipo/decisao, projeto/painel-ptk, meta-ads, supabase, desempenho]
keywords: [Atualizar tudo, /api/ptk/atualizar, cliente_metricas, cliente_meta_dia, cliente_campanhas, ptk_agente, statement timeout, índices, site_comportamento, painel_gestor]
created: 2026-11-13
updated: 2026-11-13
summary: "O botão 'Atualizar tudo' de /ptk/<cliente> lê o Meta na hora pela rota /api/ptk/atualizar (sem o agente, que parou em 10/11) e grava os números do cliente no formato do agente, passo a passo na tela. Os cancelamentos por tempo do banco no /ptk foram resolvidos com contagem no banco, índices novos e leituras só do período."
---

# Painel PTK: "Atualizar tudo" direto do Meta e fim dos timeouts (13/11)

Repositório LR_LauraRosaPersonal, PR #452, mesclado em 13/11 com o OK do Patrik ("pode subir").

## Decisão (Patrik, 13/11)
- Os números do Meta dos clientes da PTK **não dependem mais do agente** (ptk_agente, parado desde 10/11). O botão "Atualizar tudo"
  em /ptk/<cliente> chama `/api/ptk/atualizar`, que lê o Meta (Graph API, `META_GRAPH_TOKEN`) e grava, no mesmo formato do agente:
  `cliente_metricas` (hoje, ontem, 7d, mês e 30d por conta; campanhas de 30 dias; criativos de 7 dias), `cliente_meta_dia` (últimos
  35 dias do Meta por cima do Stract; o resto da série fica) e `cliente_campanhas` (mapa campanha → conta).
- A tela mostra cada passo e a hora da última atualização.
- Antes de gravar, confere: totais = soma das contas, e série de hoje = período "hoje". Se uma conta com gasto falhar, não grava nada.
- Só lê o Meta. Não cria, pausa nem muda anúncio.

## Padrão dos números (conferido contra o que o agente gravava)
- cliques = link_click · lp = landing_page_view · ic = omni_initiated_checkout · compras e valor = omni_purchase.
- Atribuição padrão da conta; fuso America/Sao_Paulo.
- Os períodos contam hoje: 7d = hoje + 6 dias; 30d = hoje + 29 dias; mês = dia 1 até hoje.
- O Stract chega com o último dia incompleto. Por isso, nos dias recentes o Meta substitui o Stract.

## Timeouts do banco (8 s por consulta)
- Causa: volume, não falta de filtro. Uma cliente tem ~41 mil vendas em painel_gestor e ~63 mil visitas em novembro em
  site_comportamento. A paginação com offset relia as páginas anteriores a cada nova página.
- Correções:
  - visitas contadas no banco (de 1,9 s para 0,13 s);
  - checkout por página só com os pedidos do período;
  - aba Página lida em janelas de até 800 visitas;
  - aba Meses relê só do mês passado em diante (o histórico inteiro, 1 vez ao dia);
  - índices novos (`supabase/ptk-painel-desempenho.sql`).
- Atenção: o `atualizado_em` das vendas não serve como filtro de período, porque a importação de 02/11 regravou todas as vendas.
  Para período, use `data_pedido` ou `data_aprovacao`.
