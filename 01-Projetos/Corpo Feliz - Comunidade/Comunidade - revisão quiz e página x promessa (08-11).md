---
type: referencia
title: "Comunidade - revisão quiz e página x promessa (08-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, promessa, quiz, pagina]
keywords: [revisão, promessa, recomeçar, quiz, página, app, plano b]
created: 2026-11-08
updated: 2026-11-08
summary: "Revisão de 08/11: o quiz e a página /comunidade v2 batem com a promessa 'parar de recomeçar'? O que bate, o que não bate e a proposta (aguardando OK do Patrik)."
---

Projeto: [[Corpo Feliz - Comunidade]] · Promessa: [[Comunidade - promessa parar de recomeçar]]

# Revisão: quiz e página contra a promessa (08/11/2026)
Pedido do Patrik: "queremos vender a comunidade… o app é um entregável, a promessa é que temos que acertar… revise tudo".
Base: código do quiz em produção (`app/comunidade-quiz/_dados.ts`), página v2 (PR #370), `docs/APP_CORPO_FELIZ.md`, banco `app_cf_aulas` (SELECT, 08/11) e o relatório da promessa.

## Veredito
O topo da página e a primeira metade do quiz vendem a promessa. O resto ainda vende "treino + bônus" (o contrário de "você não precisa de mais um treino"), o quiz tem sobras do Efeito Lipo, e o resultado do quiz promete coisas que o app ainda não tem.

## Página /comunidade v2
- OK: título = promessa; subtítulo "por que o plano quebra no meio da semana"; Laüra + time; garantia de 7 dias; "+7 mil alunas" (Patrik).
- Não bate 1: depois do vídeo a página vira lista de produto ("treinos em casa ou na academia", "treinos hormonais", 5 bônus). Falta o miolo da promessa:
  (a) o ciclo do recomeço (segunda / quarta / fim de semana / domingo à noite), que já existe no quiz;
  (b) a causa: "quando você decide tudo sozinha, todo dia, qualquer imprevisto vira motivo para parar";
  (c) como a Comunidade faz o dia ruim não zerar: treino do dia pronto, Plano B, calendário de "dias sem zerar", Laüra e time no WhatsApp, Musas com check-in e ranking do mês. Tudo isso existe no app (`docs/APP_CORPO_FELIZ.md`).
- Não bate 2: não responde a objeção nº 1 de assinatura ("já fiz academia, já baixei app, por que agora seria diferente?") nem "medo de pagar e não usar".
- Atenção: "treinos hormonais" tem fonte (página da Black), mas o relatório recomendou "o treino acompanha a fase do seu ciclo e tem modo menopausa" (evita soar promessa de saúde).

## Quiz /comunidade-quiz
- OK: capa 1 ("Segunda eu começo de novo"), recomeços, momento em que sai do plano, o que faz parar, tela do ciclo, treinar sozinha e o resultado "Você costuma parar [momento]" + resposta. Isso é a promessa.
- Não bate 1, sobras do Efeito Lipo: tela 11 objetivo ("Secar a barriga de vez", "Caber naquela roupa", "Afinar os braços"; barriga é a dor que menos compra: 9,4% × 25,5% de constância); telas 13 (período em que belisca) e 14 (sono e inchaço), que nem entram no resultado; tela 16 "medo em relação a emagrecer"; e a resposta do medo "rebote": **"Você não para no dia 21"**, frase do Efeito Lipo 21D (produto errado).
- Não bate 2, promete o que o app não tem hoje: o resultado mostra "Treino do dia de 10 a 15 minutos · … · versão segura para joelho". No banco (08/11) o app tem **5 aulas, todas de 28 a 37 min, nenhuma marcada para joelho, lombar, diástase ou pós-parto**. O Plano B diz "Só 10 minutos de movimento", mas não há aula de 10 min. "Treinos de 3 e 5 minutos" estão na página da Black (área de membros), não no app.
- Não bate 3: quem paga não entra no app sozinha (`PRODUTOS_LIBERADOS` vazio).
- Atenção: cores do quiz ainda verde/laranja; a identidade de 08/11 é rosa (página v2). "Canetinha" aparece como opção em "o que você já tentou" (a regra proíbe em anúncio; no quiz é resposta, decidir). Medo "pagar e não usar" responde só com a garantia (falta a regra de pausa/cancelamento).

## Proposta (NÃO aplicada; aguardando OK do Patrik)
1. Quiz de 17 para 14 telas: tirar 11, 13 e 14; tela 16 vira "O que você mais tem medo que aconteça desta vez?" (começar e parar de novo / não ter tempo / pagar e não usar / gastar e não ter resultado); apagar a frase do "dia 21".
2. Resultado: abrir com a promessa e mostrar no "Seu plano" só o que o app entrega hoje (sem minutos curtos nem "versão segura") até as aulas curtas e marcadas entrarem; quando entrarem, volta.
3. Quiz nas cores rosa da página.
4. Página: depois do vídeo, seção "Por que você recomeça" (ciclo + causa) e "Como a Comunidade faz o dia ruim não zerar" (5 itens do app); objeção "já tentou app e academia?"; os bônus passam a dizer como cada um ajuda a não parar.

## Bloqueios antes de anunciar
Aulas curtas (3, 5, 10, 15 min) e marcadas por cuidado no app; liberar o acesso de quem comprar; preço e checkout (Patrik); VSL da Laüra (hoje só a de referência do Movimento, e só na prévia).
