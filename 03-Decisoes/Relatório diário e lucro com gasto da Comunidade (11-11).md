---
type: decisao
title: "Relatório diário e lucro com gasto da Comunidade (11-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, relatorio, lucro, painel, meta-ads]
keywords: [relatório diário, lucro, empate, fixos, gasto, comunidade, cockpit, roi, taxa do comercial, projeção]
created: 2026-11-11
updated: 2026-11-11
summary: "Relatório das 7h47 refeito (empate, ontem, comercial, o que está subindo, analisar, custos) e o gasto das campanhas COMUNIDADE passa a entrar no lucro e no ROI, no relatório, no Cockpit e no Comparar meses."
---

# Relatório diário e lucro com gasto da Comunidade (11/11)

Projeto: [[Corpo Feliz - Comunidade]] · ligado a [[Comercial - rastreio da Aline, links curtos e fluxos do número novo (11-11)]]

## Contexto
- O Patrik achou o relatório de 7h47 confuso e o lucro parecia cair. O "lucro até hoje" desconta todo dia R$ 291 de fixos (R$ 8.732,30 por mês, no `painel_config`), vendendo ou não.
- O relatório (e o Cockpit) excluíam de propósito as campanhas com "COMUNIDADE" no nome do gasto, mas somavam as vendas da Comunidade ao líquido. Duas campanhas de teste da Comunidade (VSL e Quiz, "ABO TESTE V1-V3") nasceram em 10/11; antes disso só novembro tem gasto assim (maio a outubro: zero).
- Gasto por conta conferido com o Meta (01 a 10/11): conta do site R$ 1.911, conta Novo projeto R$ 1.615 (R$ 134 eram da Comunidade), conta 1871… R$ 18. A diferença de R$ 134 no relatório não era atraso de sincronização, e sim a exclusão da Comunidade.

## Decisão (Patrik, 11/11)
1. **Novo formato do relatório** (site #415): quando empatamos (data, fechamento projetado e quanto a meta exige por dia); ontem (sobra antes dos fixos × fixos do dia); comercial (leads que compraram ontem e no mês, e aviso de vendas da Comunidade sem registro no CRM); o que está subindo (últimos 3 dias × 3 anteriores); linha "Analisar" com o pior indicador; custos do mês. **Sem CPC** e **sem comparação com o mês passado**. O "42%" saiu.
2. **O gasto das campanhas COMUNIDADE entra no lucro e no ROI**: relatório (#416), Cockpit `/painel` e Comparar meses (#417). O cartão de anúncios e o "custo por compra de anúncio" seguem só com o Efeito Lipo. `/painel/origens` não mudou.

## Números de 01 a 10/11 (dados da hora, mudam)
- Gasto Meta R$ 3.543 (Efeito Lipo R$ 3.409 + Comunidade R$ 134). Lucro "se parar de vender hoje": −R$ 3.718.
- No ritmo do mês (cerca de R$ 501 por dia antes dos fixos) o mês empata em 18/11 e fecha perto de R$ 6.310; para a meta de R$ 10 mil faltam cerca de R$ 686 por dia.
- ROI de ontem (10/11) com a Comunidade: 1,62 (era 1,98 sem ela).

## Alternativas descartadas
- Mexer na exclusão `semComunidade` dos dados compartilhados: afetaria tabelas por campanha e conjunto. A soma foi feita só na conta do lucro.

## Pendências
- Conferir o relatório em produção (a rota exige a senha do agendador ou login no painel).
- A conta Meta 1871186300120064 não tem gasto desde 02/11; o texto antigo falava em "3 contas".
- Nenhuma mudança de checkout, preço ou webhook neste trabalho.
