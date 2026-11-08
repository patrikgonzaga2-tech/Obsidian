---
type: decisao
title: "Avisos do grupo Vendas só pelo número pessoal"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, whatsapp, vendas, avisos]
keywords: [aviso de venda, grupo vendas, metrifiquei, umclique, 3606, renovação, pix gerado, recusa, reembolso]
created: 2026-11-08
updated: 2026-11-08
summary: "08/11/2026: todos os avisos do grupo Vendas (venda, renovação, Pix gerado, recusa, reembolso, atraso e cancelamento) saem só pelo WhatsApp pessoal do Patrik (Metrifiquei); a automação do 3606 na UMCLIQUE pode ser desligada."
---

# Avisos do grupo Vendas só pelo número pessoal

Projeto: [[Corpo Feliz - Comunidade]]

**Pedido (Patrik, 08/11/2026):** "quero desativar [a automação do 3606 na UMCLIQUE] e manter só o que criamos pelo meu
número pessoal… ela funciona tanto pra renovação quanto pra pix criado e aguardando pagamento, quero fazer tudo pelo meu número pessoal".

## O que foi descoberto
- O canal 3606 (UMCLIQUE) voltou a ficar conectado em 08/11 e a automação dele voltou a disparar: o grupo recebia tudo em dobro.
- A automação da UMCLIQUE mandava 8 tipos de aviso: venda (Greenn e Hotmart), assinatura renovada, aguardando pagamento,
  venda recusada, assinatura cancelada, reembolso e assinatura atrasada (Hotmart).
- O aviso do painel (`/api/painel/avisos-venda`, a cada minuto) lê só o banco de vendas: **não depende da UMCLIQUE**.

## Decisão / o que mudou
- O aviso do painel passa a cobrir os 8 tipos (código em `app/painel/_lib/avisos-eventos.ts` no repositório do site).
- Para não encher o grupo: Pix e recusa esperam 10 min e só vão se a cliente não pagou (em 7 dias, 50 de 70 Pix foram pagos em menos de 10 min).
- Reembolso e cancelamento da mesma assinatura viram uma mensagem só.
- Ficaram de fora (a UMCLIQUE também não mandava): cancelamento de assinatura da Hotmart, protesto, Pix expirado.

## Status
- No ar desde 08/11 (PR #369, OK do Patrik: "pode subir").
- Depois de subir: Patrik desliga a automação do 3606 na UMCLIQUE.
