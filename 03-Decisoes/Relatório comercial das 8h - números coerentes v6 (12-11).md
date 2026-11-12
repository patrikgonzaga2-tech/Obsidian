---
type: decisao
title: "Relatório comercial das 8h - números coerentes v6 (12-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, comercial, relatorio, crm, padrao]
keywords: [relatório, vendedora, vendas, funil, conversão, Greenn, telefone, conferência, v6]
created: 2026-11-12
updated: 2026-11-12
summary: "Em 12/11 o relatório das 8h parecia se contradizer (vendas ontem × compras 0 × 3 de 22). Corrigido na v6: uma fonte só (pagamento na Greenn ligado ao lead pelo telefone), frase que explica funil × vendas, trava de conferência. Padrão: revisar sempre os números e explicar."
---

Projeto: [[Corpo Feliz - Comunidade]] · Anterior: [[Relatório comercial das 8h - formato v5 (10-11)]]

# Relatório das 8h: números coerentes (v6)

**Problema (relatório de 11/11):** "Ontem: 6 vendas" e "Compraram: 0" na mesma mensagem, e "3 de 22" sem base clara.

**Causas**
- As 6 vendas eram **todas** as vendas da Comunidade na Greenn (anúncio, página, quiz e WhatsApp). Só 1 era de lead do CRM da vendedora.
- O funil conta pelo dia em que o lead **chegou**; a venda, pelo dia do **pagamento**.
- "Comprou" vinha da marca do CRM, que atrasa: em novembro, 2 leads pagaram sem a marca e 3 estavam marcados sem venda. Certo: 21 de 319 (6,6%), não 22 (6,9%).

**Decisão (Patrik, 12/11):** "preciso que ele seja entregue todo dia perfeito"; "adota como padrão revisar sempre os números e deixar claro o que está acontecendo"; "amanhã mandamos esse".

**Regras da v6**
- Só números do comercial da vendedora: **venda = pagamento aprovado na Greenn ligado ao lead pelos 8 últimos dígitos do telefone**. O total de vendas da Greenn de todas as origens saiu da mensagem.
- Frase sob "Ontem" explica quantas vendas foram de leads de ontem e quantas de dias anteriores.
- **Trava:** a rotina copia a lista de telefones à mão; um teste perdeu 1 de 62 (deu 20 em vez de 21). Agora confere quantidade e soma da lista antes de usar, e refaz se não bater.
- Conferências antes de gravar: vendas do mês <= leads do mês, compras de ontem <= leads de ontem e <= vendas de ontem. Falhou, não envia.
- **Linha da planilha desligada:** a conferência dava resultado diferente a cada rodada com os mesmos dados. Só volta quando a regra for fixada e testada.

**Onde está:** instrução `envio_grupo_vendas_v6` no banco do CRM (v5 e v4 de backup); regra geral no `CLAUDE.md` do repositório do painel.

## Pendências
- Conferir o primeiro envio automático em 13/11 às 8h.
- Fixar a regra de conferência da planilha (coluna e formato do telefone) para religar a linha.
- Limite conhecido: a venda depois de follow usa o número de follows do CRM, que pode não ser o do momento da compra.
