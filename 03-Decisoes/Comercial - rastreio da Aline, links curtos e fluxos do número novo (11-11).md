---
type: decisao
title: "Comercial - rastreio da Aline, links curtos e fluxos do número novo (11-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/decisao, projeto/corpo-feliz-comunidade, comercial, aline, umclique, manychat, greenn, utm]
keywords: [aline, links curtos, utm, sck, xcod, umclique, fluxos, boas vindas, manychat, 0948, 0787, coex, 1652, respostas rápidas, greenn, crm, lead]
created: 2026-11-11
updated: 2026-11-11
summary: "As vendas da Comunidade pela Aline chegavam sem origem e quase metade não ligava a lead no CRM. Criados 15 links curtos com UTM (/c/<nome>), trocadas as 13 respostas rápidas do UMCLIQUE e criados 7 fluxos de boas-vindas para o número novo (21) 96000-1652, que estava fora do CRM."
---

# Comercial: rastreio da Aline, links curtos e fluxos do número novo (11/11)

Projeto: [[Corpo Feliz - Comunidade]]

## Contexto
- Cruzamento das 56 vendas da Comunidade no Greenn de 01 a 10/11 com o CRM (pelos 9 últimos dígitos do telefone): **20** marcadas como VENDA, **10** com lead mas sem a marcação, **26** sem lead nenhum no CRM.
- **Todas as 56 vinham sem origem** (`sck` e `src` vazios): as respostas rápidas da Aline mandavam o checkout do Greenn sem UTM (só a `/linkdesafio` tinha).
- O relatório dizia "vendas da Aline ÷ leads do dia = 42%": conta sem sentido (a venda do dia é de lead antigo, e o painel chama de "Aline" toda venda da Comunidade no Greenn sem rastreio).
- Canais do UMCLIQUE em 11/11: o **0787 não está mais conectado**. Ativos: (37) 6000-0948, (21) 96000-4590, **(21) 96000-1652 (coex, conectado em 02/11)**, Suporte alunas e o 3606 (stand-by). O ManyChat passou do 0787 para o 0948 em 02/11 sem perder volume (cerca de 11 leads por dia).
- De 02 a 11/11 entraram 110 leads pelo número 1652 (e 9 vendas), mas **só 2 tinham a etiqueta de boas-vindas**: ficavam fora do CRM, da taxa do comercial e da origem. Não existia fluxo de boas-vindas para esse número.

## Decisão (Patrik, 11/11)
1. **Links curtos com UTM**: rota `/c/<nome>` em laurarosapersonal.com (site #419). Cada um abre o MESMO checkout da resposta rápida e acrescenta `utm_source=whatsapp-aline` (vira o `sck`; o painel conta `whatsapp*` como venda da Aline) e `utm_content=<nome do link>` (vira o `xcod`, diz de qual mensagem veio a venda). `utm_term` fica de fora de propósito (número ali faz o painel achar que é anúncio). 15 links: 479, fim3, fim5, final-anual, 397, 297, 357, 210, final-3m, 3meses, 97, recorrencia, 27, linkdesafio (mantém `ch_id`, bumps e o `utm_source` antigo) e **black** (oferta f7rdog, R$ 297 informado pelo Patrik, preço não confirmado no Greenn). Testados 15 de 15 ao vivo. Código em `lib/links-aline.ts`.
2. **Respostas rápidas do UMCLIQUE** (OK do Patrik: "pode trocar você"): as 13 com checkout passaram para os links curtos; nenhum `payfast.greenn.com.br` sobrou nelas. A `/black` já existia como mensagem de apresentação (sem link), então foi criada a **`/blacklink`** só com o link. Planilha para a Aline copiar criada no Google Sheets (ainda não compartilhada).
3. **Fluxos de boas-vindas para o número 1652** (OK do Patrik: "pode criar os fluxos, as frases são as mesmas"): 7 cópias exatas dos fluxos do 0948 (anúncio ×2, bio, live, ManyChat, seguidores e story), com o canal trocado e ligadas. Mesmas frases exatas, texto, etiquetas (LEAD FRIO + origem), etapa "Lead Frio" e atribuição à Aline. Nenhum fluxo existente foi alterado.
4. A taxa do comercial passa a ser a de leads que compraram (ver [[Relatório diário e lucro com gasto da Comunidade (11-11)]]).

## Alternativas descartadas
- **Registrar cliques no link curto:** exigiria gravar no banco de vendas (regra: só leitura). A origem vem da venda, pelo `sck` e `xcod`.
- **Um link por lead** (ID do lead no `xcod`): fica para depois; não se sabe se o UMCLIQUE aceita variável dentro da resposta rápida.
- **Acrescentar o link no fim da `/black`:** descartado para não mexer no texto de venda da Aline; criada resposta separada.

## Achados (não alterados)
- Os fluxos **BIO, MANY CHAT e SEGUIDORES do 0787** estão com canal "qualquer" desde 02/11 09:03 (quando o 0787 saiu) e valem para todos os números. O UMCLIQUE avisou "conflito parcial" com as cópias novas. Conferida uma conversa real do 0948: a boas-vindas saiu uma vez só (não duplicou). É um exemplo, não prova.
- Os **15 fluxos de grupo** ("[SEGUNDA] VAGAS ABERTAS", ESCASSEZ etc.) não podem ser lidos pelas ferramentas (tipo não suportado): conferir no painel do UMCLIQUE se têm link do Greenn sem origem.
- **Captação 28** e **Captação 28 - 0787**: ativos mas com erro (template apagado ou não encontrado); provavelmente não enviam nada. Só têm link de grupo de WhatsApp.
- As estatísticas de execução dos fluxos do ManyChat não bateram com o relatório por canal do UMCLIQUE (0 execuções no 0948 contra 110 leads MANY CHAT). Vale o relatório por canal; a causa não foi explicada.

## Pendências
- Teste real: alguém mandar uma frase exata ao número 1652 e conferir boas-vindas e etiquetas; depois conferir se os leads novos entram no CRM.
- Primeira venda por um link curto: confirmar que o Greenn gravou `sck` e `xcod`.
- Decidir se prende a um canal ou pausa os 3 fluxos do 0787 (pode afetar o 4590).
- Planilha: a linha da Black diz "/black", o atalho certo é `/blacklink`; compartilhar com a Aline.
- Não conferido: o ManyChat em si (sem acesso) e o que mudou nele; vale perguntar ao Patrik.
