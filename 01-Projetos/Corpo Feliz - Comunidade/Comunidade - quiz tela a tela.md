---
type: projeto
title: "Comunidade - quiz tela a tela"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade]
keywords: [quiz, comunidade, telas, perguntas, capas]
created: 2026-11-08
updated: 2026-11-08
summary: "As 17 telas e 14 perguntas do quiz novo da Comunidade, com a lógica do resultado."
---

Projeto: [[Corpo Feliz - Comunidade]]

# Quiz da Comunidade, tela a tela (aprovado em 08/11/2026)

17 telas, 14 perguntas. igual = texto do quiz atual (app/efeito-lipo-quiz/_data.ts); ajustado = mudança pequena; nova = pergunta nova.

## Capas (?p=)
- ?p=1: **“Segunda eu começo de novo.”** Descubra em 2 minutos por que você para, e receba o seu plano para não zerar.
- ?p=2: **Seu corpo mudou e o treino continua o mesmo?** Descubra o treino que acompanha a sua fase: ciclo, pós-parto, 40+ ou menopausa.
- ?p=3: **Joelho, lombar ou diástase te fazem parar?** Descubra como treinar sem medo, do seu jeito.

Botão "Começar o teste", "Sem cadastro", olho: "Teste de 2 minutos · Laüra Rosa, personal trainer". Card: "Comunidade Corpo Feliz · Treino pronto do tamanho do seu dia, a Profe Laüra e as Musas com você."

## Telas

### 01. Capa (uma por ?p=)

### 02. Qual a sua faixa etária? (igual) · id `idade`
_Cada fase da vida pede um cuidado diferente._
- `-29` Menos de 29 anos
- `29-39` Entre 29 e 39 anos
- `40-49` Entre 40 e 49 anos
- `50+` 50 anos ou mais

Base: Mantida para comparar com o histórico. 51% do quiz tem 40 anos ou mais.

### 03. Em que fase você está? (nova) · id `fase`
_O treino muda conforme a sua fase._
- `ciclo` Ciclo menstrual regular
- `irregular` Ciclo irregular
- `pos-parto` Tive bebê no último ano
- `transicao` Sinais da menopausa chegando
- `menopausa` Já estou na menopausa
- `nao-dizer` Prefiro não dizer

Base: Nova. O app tem “Meu ciclo” com modo menopausa e cuidado pós-parto. Menopausa compra 20,8% no CRM.

### 04. Quantas vezes você já recomeçou? (igual) · id `recomecos`
_Seja sincera. Isso ajuda a entender o que te faz parar._
- `1-2` Uma ou duas vezes
- `varias` Várias vezes
- `perdi-conta` Já perdi a conta
- `comecando` Ainda estou tentando começar

Base: 78,5% marcaram “várias vezes” ou “perdi a conta” em outubro.

### 05. Em que momento você costuma sair do plano? (nova) · id `parada`
_Saber onde você para é o que muda o jeito de continuar._
- `semana1` Na primeira semana
- `meio` No meio da semana, quando a rotina aperta
- `fds` No fim de semana
- `resultado` Quando não vejo resultado rápido
- `nunca` Nunca consegui nem começar

Base: Nova. Ciclo segunda → quarta → fim de semana; 53% dizem que o fim de semana é o pior dia.

### 06. O que mais te faz parar? (nova) · id `motivo-parar`
_Escolha a que mais pesa hoje._
- `tempo` Falta de tempo
- `perdida` Não sei o que fazer em cada dia
- `sozinha` Sozinha eu perco o foco
- `dor` Dor no joelho ou na lombar
- `academia` Academia não é pra mim
- `corpo-mudou` Meu corpo mudou e o treino não acompanha

Base: Nova. São as dores que mais compram no WhatsApp (20,8% a 25,9%) e as frases do suporte.

### 07. O que você já tentou? (nova) · id `tentou`
_Escolha a principal._
- `academia` Academia
- `online` Treino online ou app
- `desafio` Desafio de alguns dias
- `dieta` Dieta
- `canetinha` Canetinha
- `nada` Nunca treinei com regularidade

Base: Nova. Mostra que ela já tentou e parou: a Comunidade é o “depois” do desafio.

### 08. Quanto tempo você consegue dedicar ao seu corpo por dia? (ajustado) · id `tempo-dia`
_Inclusive nos dias mais corridos._
- `5` Só uns minutos nos dias ruins
- `10-15` 10 a 15 minutos
- `15-20` 15 a 20 minutos
- `20-30` 20 a 30 minutos
- `30+` Mais de 30 minutos

Base: Ajustada: entra a opção “só uns minutos” (Plano B do app).

### 09. Onde você treinaria? (nova) · id `onde`
- `casa` Em casa, sem nada
- `casa-peso` Em casa, com pesinho ou elástico
- `academia` Na academia
- `onde-der` Onde der

Base: Nova. É a mesma pergunta do “Meu plano” do app (onde treina, aparelhos).

### 10. Tem algum cuidado que o seu treino precisa ter? (nova) · id `cuidados`
- `joelho` Joelho
- `lombar` Lombar
- `diastase` Diástase
- `pos-parto` Pós-parto
- `nenhum` Nenhum

Base: Nova. Os mesmos cuidados do app; dor articular compra 25,9%.

### 11. Qual é o seu principal objetivo agora? (igual) · id `objetivo`
- `barriga` Secar a barriga de vez
- `roupa` Caber naquela roupa especial
- `bracos` Afinar os braços
- `autoestima` Recuperar minha autoestima
- `tudo` Tudo acima

Base: Mantida. É o desejo; a ruminação vem nas perguntas anteriores.

### 12. Tela do ciclo (ajustado)
Título: Talvez você se reconheça neste ciclo
- SEGUNDA · Agora vai. Vou fazer tudo certinho.
- QUARTA · A rotina apertou e já ficou difícil manter o ritmo.
- FIM DE SEMANA · Saí do combinado. Parece que perdi a semana.
- DOMINGO À NOITE · Amanhã eu compenso e recomeço.

Frase: Quando você decide tudo sozinha, todo dia, qualquer imprevisto vira motivo para parar.
Botões: "✅ Faz sentido, nunca tinha pensado assim" / "💡 É novidade pra mim, quero entender melhor"

### 13. Em qual período do dia você mais perde o controle? (igual) · id `periodo`
- `noite` Noite · Depois do jantar não paro de beliscar
- `tarde` Tarde · Entre o almoço e o jantar é onde eu desando
- `dia-todo` O dia inteiro · Belisco sem parar em todos os períodos
- `manha` Manhã · Pulo o café ou como demais no lanche

Base: Volta do quiz do verão (texto igual). 47,5% marcaram a noite. O plano alimentar da Comunidade responde.

### 14. Como anda seu sono e seu inchaço? (igual) · id `sono`
- `mal` Durmo mal e acordo cansada
- `inchada` Durmo ok, mas acordo inchada
- `sem-energia` Durmo bem, mas sem energia
- `bom` Sono bom e energia ok

Base: Mantida. 71% dormem mal ou sem energia; o check-in do app pergunta energia e humor.

### 15. Quando você treina sozinha, o que acontece? (nova) · id `sozinha`
- `comeca-larga` Começo bem e largo
- `nem-comeca` Nem começo
- `falta-guia` Vou, mas sinto falta de alguém me guiando
- `bem` Vou bem sozinha

Base: Nova. Vem de “sozinha não consigo manter o foco” (suporte) e “não consigo montar um plano consistente sozinha” (CRM).

### 16. Qual é o seu maior medo em relação a emagrecer? (ajustado) · id `medo`
- `fracasso` Medo de não conseguir de novo
- `tempo` Medo de não ter tempo
- `dinheiro` Medo de gastar e não ter resultado
- `nao-usar` Medo de pagar e não usar
- `rebote` Medo do efeito rebote

Base: Ajustada: entra “pagar e não usar”, a objeção de assinatura (“12 meses é um compromisso longo”). “Gastar e não ter resultado” é o medo nº 1 (35,9%).

### 17. Resultado + VSL + oferta
"Você costuma parar [parada]." + resposta da Comunidade + "Seu plano Corpo Feliz: Treino do dia de [tempo · onde · fase · cuidado]" + VSL ~60 s + checklist (Treino do dia do tamanho do seu dia; Treinos de 3 e 5 minutos pros dias impossíveis; Plano alimentar flexível; Profe Laüra e o time no WhatsApp; Grupo das Musas e desafio todo mês; Módulo de diástase e mobilidade) + oferta do link (?o=1 anual, ?o=2 mensal, ?o=3 teste 30 dias; PREÇO SÓ COM OK DO PATRIK) + resposta ao medo + botões "Quero começar hoje" e "Tirar dúvida no WhatsApp" (0948).

## Lógica do resultado

### PARADA (texto de "Você costuma parar…")
- `semana1`: na primeira semana
- `meio`: no meio da semana, quando a rotina aperta
- `fds`: no fim de semana
- `resultado`: quando o resultado demora
- `nunca`: antes de conseguir começar

### RESPOSTA (o que a Comunidade faz nesse ponto)
- `semana1`: O calendário de “dias sem zerar” e o Plano B seguram a primeira semana.
- `meio`: No dia que aperta, o app troca o treino pelo Plano B, e o dia não zera.
- `fds`: No fim de semana, as Musas fazem check-in junto e o ranking do mês continua contando.
- `resultado`: O Espelho guarda as suas medidas e fotos (só você vê), para você enxergar o que muda.
- `nunca`: O seu treino de hoje já vem pronto. É só apertar o play.

### TEMPO
- `5`: poucos minutos (Plano B)
- `10-15`: 10 a 15 minutos
- `15-20`: 15 a 20 minutos
- `20-30`: 20 a 30 minutos
- `30+`: mais de 30 minutos

### ONDE
- `casa`: em casa, sem nada
- `casa-peso`: em casa, com pesinho ou elástico
- `academia`: na academia
- `onde-der`: onde der

### FASE
- `ciclo`: acompanhando o seu ciclo
- `irregular`: acompanhando o seu ciclo
- `pos-parto`: com cuidado pós-parto
- `transicao`: no modo menopausa
- `menopausa`: no modo menopausa
- `nao-dizer`: (vazio)

### CUIDADO
- `joelho`: versão segura para o joelho
- `lombar`: versão segura para a lombar
- `diastase`: versão segura para diástase
- `pos-parto`: versão segura pós-parto
- `nenhum`: (vazio)

### MEDO
- `fracasso`: Um dia ruim não zera: tem o Plano B.
- `tempo`: O treino do dia cabe no tempo que você tem.
- `dinheiro`: Garantia de 7 dias: se não for pra você, pede o dinheiro de volta.
- `nao-usar`: [regra de pausa e cancelamento que o Patrik definir; garantia nunca abaixo de 7 dias]
- `rebote`: Você não para no dia 21: o treino continua no dia seguinte.

## Fica de fora
- Altura, peso e meta de peso (regra da marca: sem quilos).
- "Ozempic, Mounjaro" no texto (regra do Meta).
- Marcos com prazo, "eliminar o inchaço", antes e depois.
