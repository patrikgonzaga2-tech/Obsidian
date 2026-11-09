---
type: referencia
title: "Comunidade - conferência do funil, promessas e reveal (09-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, funil, promessa, quiz, vsl, reveal]
keywords: [funil, promessas, quiz, pagina, reveal, vturb, upsell, order bump, miro, divergencia]
created: 2026-11-09
updated: 2026-11-09
summary: "Conferência de 09/11: funil atual x proposto com as medições, as 8 promessas (quiz p1-p4 e página p1-p4) contra a voz da cliente e o mercado, o reveal da página e o topo x miolo. Só leitura: nenhum texto, preço ou oferta foi alterado."
---

Projeto: [[Corpo Feliz - Comunidade]] · Funil: [[Comunidade - funil completo do Movimento, Aline e Elah (09-11)]] · Base: [[Comunidade - voz da cliente]], [[Comunidade - revisão quiz e página x promessa (08-11)]], [[Comunidade - roteiro da VSL v3]]

Desenho (provisório, no lugar do Miro, que estava sem conector): https://claude.ai/artifact/EhqZ6ob5AhKbhVahYZbB2Y

# Conferência do funil, das promessas e do reveal (09/11/2026)
Só leitura do código (`app/comunidade-quiz/_dados.ts`, `app/comunidade/_dados.ts`, `app/comunidade/_pagina.tsx`) e das notas. Nada alterado.

## 1. Funil atual x proposto
- **Atual:** anúncio (nenhuma campanha no ar) → quiz (4 capas) ou página com VSL (4 promessas) → checkout mensal R$ 39,90 (yaG6FL) → **nada** depois. Mede: quiz e página por promessa (/painel), clique no checkout. Não mede: gasto (sem campanha), compra real (nenhuma venda yaG6FL até 08/11; compra de teste pendente), pós-compra (não existe). Purchase só chega no pixel oficial.
- **Proposto (etapa 3, aprovada pelo Patrik em 10/11):** mesmo começo → checkout com 2 order bumps (Cinturinha EXPRESS e Receitas que Secam, R$ 19,90 cada) → upsell 1 clique Comunidade Anual R$ 297 (oferta nova a criar) → se recusar, downsell Trimestral R$ 97 (O8j7nc) → acesso. Telas novas `/comunidade-upsell` e `/comunidade-downsell`, cópia de `/acompanhamento-up`. A medir (etapa 5): aceite dos bumps, upsell, downsell, receita por visitante.

## 2. As 8 promessas
Base: CRM 1.269 leads, 109 compras (teto, parte inferida); menções de comportamento são poucas (24 a 51), então é indício.
| Onde | Promessa | Base | Leitura |
|---|---|---|---|
| Quiz p1 | "Você começa na segunda e para antes do fim de semana?" | constância 51 menções, 25,5% | tem base |
| Página p1 | "Secar e definir o corpo sem recomeçar toda segunda." | constância 25,5% + definição 260, 9,2% | tem base |
| Quiz p2 | "Seu corpo mudou e o treino continua o mesmo?" | menopausa/hormonal 48, 20,8%; pós-parto 83, 10,8% | base média |
| Página p2 | "Secar a barriga e definir o corpo com a Profe Laüra do seu lado." | barriga 350 (a mais citada), 9,4% | volume, converte pouco |
| Quiz p3 | "Joelho, lombar ou diástase te fazem parar?" | dor/lesão 27, 25,9%; diástase 58, 6,9% | fraca como escrita |
| Página p3 | "Treino de 3, 5 ou 15 minutos pros dias em que a rotina aperta." | falta de tempo 24, 25,0%; Líbia usa "15 minutos" | tem base, amostra pequena |
| Quiz p4 e Página p4 | "Você está pronta. Só faltava o plano certo pra sua rotina." | sem dor própria no CRM; Movimento 27 anúncios em 08/11, 0 na Biblioteca em 09/11 | só mercado, reconferir |

**Divergência:** só a p4 é igual no quiz e na página. p1 (recomeçar x secar e definir sem recomeçar), p2 (fase x barriga com a Profe) e p3 (dor x tempo) diferem. O cabeçalho de `app/comunidade/_dados.ts` diz "as mesmas do quiz": não é verdade. O teste quiz x página mede formato e promessa juntos.

## 3. Reveal da página
- Hoje: `VTURB_ID=''`, `VTURB_SRC=''`, `REVEAL_SECONDS=0` → `aberto=true`, página inteira, botão e selos visíveis, vídeo é quadro vazio. `?fase=antes` mostra só o topo.
- Com VSL: abre quando o `timeupdate` do player chega em `REVEAL_SECONDS` (`_pagina.tsx:133`), como o Movimento. Botão e barra fixa abrem junto. `cv_aberto` no navegador lembra quem já viu. Se o player não responde em 25 s, abre sozinho.
- Qual segundo: o início da **parte 19 (preço)** do roteiro v3, medido no arquivo final. Referências: Movimento 654 s de 866 s (75,5%; preço começa em 10:40, garantia em 11:15); Aline ~300 s de 390 s (77%). Faixa só como régua: 75–77% de 12–13 min = 540–600 s (estimativa, não é o valor). Vem do prompt E.

## 4. Topo x miolo
O miolo é o mesmo nas 4 promessas.
- p1: bate (tabela "Dia ruim não zera" e fecho); o ciclo e a causa só estão na VSL (partes 2 a 8).
- p2: bate (card "A Profe Laüra e o time todo dia" e bio).
- p3: parcial: o "15 minutos" aparece só no topo; miolo e FAQ falam de "3 e 5". Fonte do 15: Patrik, 08/11; página da Black cita 3 e 5.
- p4: não bate sem a VSL: nenhum bloco mostra "um plano" (quem monta o plano é o resultado do quiz).
- p2, p3 e p4: o fecho é fixo ("Você não precisa de mais um treino. Precisa parar de recomeçar."), só a p1 prepara essa frase.
- **Roteiro v3, parte 20, diz "sete dias de garantia"; página e Greenn dizem 15 dias.** Corrigir antes de gravar (texto de garantia: só com OK do Patrik).

## 5. Pendências (nada aplicado)
Patrik: criar a oferta anual R$ 297; configurar os 2 bumps na yaG6FL; compra de teste; decidir os ajustes de texto (alinhar quiz e página, fecho por promessa, "15 minutos" no miolo da p3, garantia no v3, frase "diástase" da capa 3). Código, depois do OK: páginas de upsell e downsell, entrada no painel oficial de links, medição no /painel. Reconferir: anúncios do Movimento; moeda do R$ 7 e downsell da Aline; preço do upsell do Elah.
