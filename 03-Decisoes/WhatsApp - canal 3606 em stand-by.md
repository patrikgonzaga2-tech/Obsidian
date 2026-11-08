---
type: decisao
title: "WhatsApp - canal 3606 em stand-by"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, whatsapp, umclique, metrifiquei, regra]
keywords: [3606, umclique, spam, bloqueio, stand-by, metrifiquei, disparo, grupos, alertas]
created: 2026-11-08
updated: 2026-11-08
summary: "O canal 3606 da UMCLIQUE tomou bloqueio de spam e não envia mais nada; fica em stand-by só para lançar mensagens em grupos quando o Patrik pedir. Todo envio automático sai pelo Metrifiquei."
---

# Canal 3606 em stand-by (Patrik, 08/11/2026)

**Decisão:** o canal 3606 (UMCLIQUE, "S/API - DISPARO GRUPO - XMI", 82 98721-3606) tomou um bloqueio de spam. Ele **não envia mais nada**:
nenhum relatório, aviso, alerta, lembrete nem teste, nem como plano B quando o Metrifiquei falha. Fica na UMCLIQUE só para lançar
mensagem em **grupos, quando o Patrik pedir, naquele momento**.

## Como fica
- Todo envio automático sai pelo WhatsApp do Patrik conectado no **Metrifiquei** (`enviarTextoMetrifiquei`, `app/ptk/_metrifiquei.ts`).
- Sem a chave do Metrifiquei (`METRIFIQUEI_API_KEY` na Vercel), o envio **falha com aviso** e nunca cai no 3606.
- No código (PR patrikgonzaga2-tech/LR_LauraRosaPersonal#379): relatório diário, botão WhatsApp do painel e envio da PTK perderam o plano B pelo 3606.
- Regra escrita no `CLAUDE.md` do LR_LauraRosaPersonal e no painel oficial (ALERTAS).
- Suporte das alunas (alertas da Laura IA): (82) 8142-3528, também pelo Metrifiquei.

## A conferir
- Na UMCLIQUE, a automação do 3606 (avisos do grupo "Vendas") precisa estar **desligada**, senão o grupo recebe em dobro.

Projeto: [[Corpo Feliz - Comunidade]]
