---
type: decisao
title: "Relatório comercial das 8h - formato v5 (10-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, comercial, relatorio, crm]
keywords: [relatório, vendedora, funil, follow-up, taxa de conversão, porcentagem, grupo Vendas, v5]
created: 2026-11-10
updated: 2026-11-10
summary: "Patrik aprovou em 10/11 o novo formato do relatório das 8h no grupo da vendedora: sem barras, porcentagem em tudo, vendas separadas do funil, follow 1 a 4 e taxa de conversão do mês. Instrução v5 no banco do CRM."
---

Projeto: [[Corpo Feliz - Comunidade]]

# Relatório comercial das 8h: formato v5

**Motivo:** a vendedora perguntou se o relatório só contava os links mandados no dia como venda. O texto antigo misturava três critérios sem avisar.

**Decisão (Patrik, 10/11/2026):** sem barras de funil ("não quero barra, só ajusta pra ver tudo e coloca as porcentagem"); mostrar vendas de follow 1, 2, 3 e 4 com porcentagem; incluir o total de vendas do mês até o dia do envio e a taxa de conversão.

## O que o relatório mostra agora
- **Vendas (Greenn, pela data do pagamento):** ontem e total do mês até o dia.
- **Planilha da vendedora:** vendas de ontem ainda não lançadas (ou "todas lançadas ✅").
- **Funil de ontem (por dia de chegada do lead):** leads, atendidos, oferta, link, compras e follow no dia, todos com %.
- **Follow-up:** sem follow, follow 1, 2, 3 e 4, ontem e mês, com leads (%), vendas e % das vendas vindas de follow.
- **Taxa de conversão do mês:** compras dos leads do CRM ÷ leads do mês, e taxa geral (todas as vendas da Greenn ÷ leads).
- Origem, dores e objeções com %; sugestões do dia. Singular e plural corretos.

## Por que os números parecem diferentes
- Funil conta pelo dia em que o lead **chegou**; venda conta pelo dia do **pagamento**. Quem paga depois não entra no funil do dia, mas entra em Vendas.
- Em novembro até 09/11: 272 leads, 20 compras de leads, 17 sem nenhum follow e 3 depois de follow (follows 1, 2 e 4). Nenhum lead parou no follow 3.
- Limite: o CRM guarda só a quantidade de follows enviados. Se o lead comprou e depois recebeu follow, a venda pode cair no follow errado.

## Como está montado
- Instrução `envio_grupo_vendas_v5` na tabela `rotina_instrucoes` do banco do CRM (a v4 ficou de backup).
- Rotina "Relatório no grupo Vendas Aline 8h" aponta para a v5 desde 10/11; vale a partir de 11/11 às 8h.
- Envio pelo WhatsApp do Patrik no Metrifiquei, via painel; nada sai pelo canal 3606.
- Testado só para o WhatsApp do Patrik e reenviado ao grupo no dia 10/11 com o texto do teste.

## Pendências
- Conferir amanhã (11/11) o primeiro envio automático no formato v5 e a taxa de conversão do mês.
- Avisar a vendedora no grupo que o formato mudou.
