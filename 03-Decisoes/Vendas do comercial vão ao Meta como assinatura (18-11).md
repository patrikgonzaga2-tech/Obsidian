---
type: decisao
title: "Vendas do comercial vão ao Meta como assinatura (18-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, meta-ads, pixel, greenn, comercial]
keywords: [api de conversões, capi, purchase, subscribe, assinatura, roas, greenn-webhook, plano anual, trimestral, semestral, aline]
created: 2026-11-18
updated: 2026-11-18
summary: "Os planos Anual, Trimestral e Semestral da Comunidade e toda venda pelo link do comercial passam a ir ao Meta como 'Subscribe' (Assinaturas), não como 'Purchase', para não inflar as compras e o ROAS dos conjuntos do 21D."
---

# Vendas do comercial vão ao Meta como assinatura (18/11)

Projeto: [[Corpo Feliz - Comunidade]]

## Contexto
- Desde 10/10 o `greenn-webhook` manda toda venda aprovada da Greenn à API de conversões do Meta como "Purchase", nos pixels Oficial (944444744178548) e LP.
- O Meta liga a venda a quem viu ou clicou num anúncio pelo telefone e pelo e-mail (com hash). As vendas de plano feitas pelo comercial no WhatsApp apareciam como compra nos conjuntos do 21D, o que inflava as compras e o ROAS. Exemplo: um conjunto com R$ 334 em 2 compras, que é a soma de um anual de 297 e um 21D de 37 (dedução, porque o Meta não mostra qual venda ligou a qual conjunto).
- Conferido: os conjuntos do 21D (conta 733027747778562) otimizam Purchase no pixel Oficial, com janela de 7 dias após o clique e 1 dia após a visualização. 100% dos Purchase desse pixel chegam pelo servidor (os nossos webhooks), nenhum pelo navegador. Nos 3 dias até 18/11 houve 17 vendas de plano, nenhuma com clique de anúncio (fbclid), 12 pelo link do comercial (sck whatsapp-aline). Esse sck só aparece em vendas de plano.

## Decisão (Patrik, 18/11)
- Anual (78187), Trimestral (148339), Semestral (148319) e toda venda com sck `whatsapp-aline` vão como o evento padrão **"Subscribe"** (coluna "Assinaturas" no Gerenciador), com o valor.
- O Mensal (148344) continua "Purchase", porque é o que as campanhas COMUNIDADE vendem e otimizam.
- Renovação continua sem envio. Order bump continua "OrderBump".
- Código: site #470 (com o #471 junto), deploy da versão 17 no Supabase em 18/11 ("pode fazer o deploy").

## Efeito esperado
- Os conjuntos do 21D passam a mostrar menos compras e um ROAS menor: é o número real do 21D. Os conjuntos estão em aprendizado, então não vale julgar pela queda dos primeiros dias.
- A coluna "Assinaturas" mostra quantas vendas de plano vêm de quem passou pelos anúncios.
- Só vale para vendas novas. Os dias anteriores no Gerenciador continuam com as vendas do comercial.

## Alternativas descartadas
- Evento personalizado ("VendaComercial"): funciona, mas o "Subscribe" é padrão, aparece em coluna própria e serve para público e otimização.
- Parar de enviar essas vendas: o Meta perderia o sinal de quem já é aluna, que serve para excluir dos anúncios.
- Tirar o pixel na Greenn: não resolve, porque o Purchase do pixel Oficial vem 100% pelo servidor.
