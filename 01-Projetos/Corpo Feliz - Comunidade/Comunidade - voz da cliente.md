---
type: projeto
title: "Comunidade - voz da cliente"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade]
keywords: [voz, cliente, dores, objeções, ruminação, crm]
created: 2026-11-08
updated: 2026-11-08
summary: "Dores, objeções e frases de leads e alunas (CRM, Telegram, WhatsApp), anonimizado."
---

Projeto: [[Corpo Feliz - Comunidade]]

> Versão anonimizada para o Obsidian (08/11/2026): nomes de alunas trocados por "aluna". Original fica só na sessão.

# Voz da Cliente — Laüra Rosa / Corpo Feliz (Efeito Lipo 21D + Comunidade)
**Fonte:** Supabase "Corpo Feliz – CRM e Ideias" (ysgsyhmkixvlxpgbyqkl), consultas somente leitura em 08/11/2026.
**Regra seguida:** nada inventado. Toda contagem é resultado de SELECT; toda citação está copiada como está no banco (erros de digitação mantidos).

---

## 0. Avisos sobre os dados (leia antes de usar)
1. **Base de leads:** `conversas_lidas` tem 1.310 linhas = **1.269 leads** + 41 alunas (tipo = aluna). Todas as contagens abaixo usam **só tipo = lead**. Período: 12/09/2026 a 07/11/2026.
2. **Resultado dos 1.269 leads:** comprou 109 (8,6%) · não comprou 868 · em andamento 286 · indefinido 6.
3. **"Comprou" nem sempre é venda confirmada.** Só 6 vendas têm `greenn_status = confirmada_telefone` (8 = nao_encontrada; o resto não foi cruzado). Várias compras foram inferidas pela etapa VENDA do CRM (ex.: observação "compra inferida pela etapa VENDA; conversa so com convite de grupo"). Algumas marcadas como compra dizem "não finalizou" na observação. Trate 109 como teto.
4. **`citacao_dor` às vezes não é fala literal.** Parte foi escrita pela IA que leu a conversa, em 3ª pessoa (ex.: "quer perder gordura abdominal e ganhar músculo"). Abaixo, essas aparecem marcadas com **(resumo)**. As sem marca estão em 1ª pessoa / parecem fala da lead, mas foram copiadas do campo, não da conversa original.
5. **Grupo do Telegram "MUSAS MENTE E CORPO FELIZ":** 1.930 mensagens têm `autor_equipe = false` mas **autor sem nome** — pelo conteúdo, são da Laüra/admin postando como anônimo (ex.: "Cada vez que você fala que ENGORDOU, sendo que seu objetivo é eliminar gordura e ganhar músculo..."). **Excluí** essas, mais 10 msgs de "Laüra" e 4 de "Equipe" no WhatsApp de suporte, e os chats de teste. Base final de alunas: **4.672 mensagens com texto** (2.761 Telegram + 1.911 WhatsApp de suporte).
6. **Período das mensagens de alunas:** praticamente só **11/10/2026 a 08/11/2026** (o bot entrou no grupo em ~11/10; há 1 msg de junho). Não há histórico anterior no banco.
7. **Quiz:** não existe nenhum lead com origem/etiqueta/mensagem "quiz" no CRM (0 em `leads`, 0 em `conversas_lidas`). O quiz "De Volta ao Eixo" existe (hub_ideias), mas os números dele não estão neste banco — só o resumo registrado no card (seção 7).
8. `menor_30_anos` só foi preenchido em 321 dos 1.269 leads; `valor` só em 27 dos 109 compradores; `plano` em 47.

---

## 1. Dores

### 1.1 Ranking — dor principal (`dor`, 1 por lead, 1.269 leads)
| Dor principal | Total | Comprou | Não comprou | Em andamento | % compra |
|---|---|---|---|---|---|
| não informou | 417 | 23 | 284 | 105 | 5,5% |
| gordura geral | 274 | 27 | 187 | 60 | 9,9% |
| barriga | 255 | 25 | 175 | 55 | 9,8% |
| definição muscular | 106 | 10 | 79 | 16 | 9,4% |
| flacidez | 82 | 6 | 61 | 15 | 7,3% |
| pós-parto | 39 | 4 | 26 | 9 | 10,3% |
| saúde hormonal | 34 | 3 | 25 | 6 | 8,8% |
| outro | 32 | 5 | 17 | 10 | 15,6% |
| falta de tempo/rotina | 11 | 2 | 4 | 5 | 18,2% |
| glúteos | 10 | 1 | 6 | 3 | 10% |
| emagrecer/peso | 4 | 0 | 2 | 2 | 0% |
| autoestima | 4 | 2 | 2 | 0 | 50% |

### 1.2 Ranking — todas as dores citadas (`dores_detalhe`, várias por lead; 879 leads com detalhe)
| Dor | Leads que citaram | Comprou | Não comprou | % compra |
|---|---|---|---|---|
| barriga | 350 | 33 | 247 | 9,4% |
| emagrecer/peso | 321 | 37 | 221 | 11,5% |
| definição muscular | 260 | 24 | 176 | 9,2% |
| gordura localizada | 203 | 20 | 143 | 9,9% |
| flacidez | 188 | 16 | 144 | 8,5% |
| sedentarismo | 185 | 21 | 137 | 11,4% |
| ganhar massa | 157 | 19 | 112 | 12,1% |
| braços | 90 | 6 | 65 | 6,7% |
| pós-parto | 83 | 9 | 58 | 10,8% |
| culote/coxas | 83 | 7 | 60 | 8,4% |
| glúteos | 58 | 4 | 45 | 6,9% |
| diástase | 58 | 4 | 45 | 6,9% |
| desmotivação/constância | 51 | 13 | 35 | **25,5%** |
| menopausa/hormonal | 48 | 10 | 30 | **20,8%** |
| dificuldade com academia | 28 | 7 | 14 | **25,0%** |
| dor articular/lesão | 27 | 7 | 12 | **25,9%** |
| falta de tempo | 24 | 6 | 13 | **25,0%** |
| outra | 23 | 3 | 17 | 13% |
| inchaço/retenção | 10 | 0 | 9 | 0% |
| compulsão/ansiedade | 7 | 3 | 4 | 42,9% |
| flancos | 4 | 0 | 2 | 0% |
| autoestima | 4 | 1 | 3 | 25% |

**Leitura (só números):** as dores estéticas (barriga, peso, definição, flacidez) são as mais citadas, mas convertem ~7–12%. As dores de **comportamento/contexto** — constância, menopausa, academia não funciona, dor/lesão, falta de tempo — aparecem bem menos, mas convertem **20–26%**. (Cuidado: lead que conversa mais tende a ter mais dores detalhadas; não dá para afirmar causa.)

### 1.3 Palavras da lead (primeira mensagem)
A 1ª mensagem é quase sempre o texto da automação: "Oiie, vim do Many Chat e quero queimar gordura e ganhar músculo com seu acompanhamento diá[rio na Comunidade]" (410 leads), mesma frase "vim da Bio" (344), "vim do Story" (91), "acabei de te seguir" (61). "Olá! Tenho interesse e queria mais informações, por favor." (22). "Quero saber mais sobre o treino hormonal" (3). Ou seja, a 1ª mensagem **não** traz vocabulário próprio; a voz dela aparece em `citacao_dor`.

### 1.4 Citações de dor — QUEM COMPROU (61 leads compradoras têm citação; todas abaixo, por data)
- 16/09 — "Diminuir a barriga e deixar as coxas mais firmes." 
- 16/09 — "Definir e deixar o corpo mais firme"
- 20/09 — "secar, diminuir barriga marcar a cintura e definir"
- 21/09 — "secar"
- 24/09 — "Hoje acordei olhei para mim e vi que tenho que começar a me cuidar"
- 24/09 — "Corpo pedindo mudança, super sedentária"
- 27/09 — "Queto secar e tonificar tudo"
- 27/09 — "Quero eliminar a barriga, ganhar massa muscular, emagrecer e definir"
- 27/09 — "Barriga e a massa muscular que perdi"
- 28/09 — "Gordura e flacidez"
- 29/09 — "Estou em processo de emagrecimento. Preciso melhorar a flacidez"
- 29/09 — "Eu quero perder peso pelo menos uns 5 kg e quero ganhar massa muscular"
- 30/09 — "queimar gordura e ganhar músculo"
- 30/09 — "meus dias sao muito corridos"
- 30/09 — "Falta de definição e flacidez"
- 30/09 — "quero perder gordura, quero afinar meu braço"
- 30/09 — "perder pança e braço justamente"
- 30/09 — "Eu tenho um problema com a obesidade"
- 01/10 — "não tô conseguindo fazer com constância"
- 01/10 — "A gordura localizada está me deixando frustrada"
- 02/10 — "Barriga principalmente E umas gordinhas sobrando"
- 02/10 — "To comendo super mal, as vezes não almoço"
- 02/10 — "Ando tão desanimada"
- 04/10 — "preciso emagrecer e nao quero q fique td caído"
- 04/10 — "preciso diminuir o percentual de gordura"
- 04/10 — "quero perder gordura e definir, principalmente na barriga"
- 07/10 — "gordura abdominal que não vai embora mesmo treinando 4x/semana" (resumo)
- 09/10 — "Barriga após a gestação; treinar em casa" (resumo)
- 09/10 — "Emagrecer uns 10kg"
- 10/10 — "Menopausa e não consegue emagrecer" (resumo)
- 11/10 — "secar pochete e fortalecer braços"
- 12/10 — "Perder peso e medidas"
- 12/10 — "Tentei academia mas estou a um mes sem ir"
- 17/10 — "60 anos, ativa, quer emagrecer e ganhar massa; gostou do video" (resumo)
- 17/10 — "perder barriga e firmar braços e pernas; usa tratamento para emagrecer" (resumo)
- 18/10 — "quer ganhar massa treinando em casa; sem constância; escoliose liberada pelo médico" (resumo)
- 22/10 — "perder a pochete; 2 cesáreas, diástase leve" (resumo)
- 27/10 — "barriga aumentou nos últimos 2 anos" (resumo)
- 27/10 — "Quero queimar gordura abdominal e ganhar massa"
- 28/10 — "Minha maior dificuldade e manter constancia nos treinos"
- 28/10 — "abdômen e coxas muito flácidos" (resumo)
- 30/10 — "ganhei muito peso, estou com sobrepeso"
- 05/11 — "pós-parto, barriga, glúteos, braços e flacidez" (resumo)
(+ demais: "Tudo isso", "Secar definir", "Emagrecer e definir", "Reduzir % de gordura", "Queimar gordura no abdômen", "barriga e gordura", "ganhar músculo, força", "secar um pouco", "Barriga e falta de definição", "Emagrecer e definir; barriga evoluiu", "barriga e braços, precisa se movimentar", "quer perder gordura abdominal e ganhar músculo", "ganhar músculo e perder gordura; barriga e perna flácidas", "barriga, gordura, definição e flacidez", "treina em casa; perguntou o valor do investimento", "vai decidir à noite", "interesse no desafio de 19/10")

### 1.5 Citações de dor — QUEM NÃO COMPROU (amostra: as mais longas de cada categoria, 25–220 caracteres)
**Barriga**
- 12/10 — "Treino em casa, faço abdominal e agachamento, parece que não tá resolvendo"
- 01/10 — "Preciso reduzir medidas. Perder gordura abdominal, meu bumbum esta caido"
- 03/10 — "Emagrecer 10 quilos e perder barriga, flacidez nos braços e pernas"
- 28/09 — "Perder barriga Ganhar glúteos e coxas E definir cintura e costas"
- 01/10 — "Gostaria de perder barriga e massa muscular (estou bem Flácida)"
- 30/09 — "perder gordura na área da barriga e anca para melhorar a postura"

**Flacidez**
- 28/09 — "Meu objetivo é ganhar massa muscular para ter saúde. Estou muito flácida"
- 04/10 — "Eu emagreci muito e agora meus braços e barriga estão flácidos"
- 30/09 — "fiquei flácida, na parte da coxa, braço, bumbum e barriga"
- 10/10 — "Acima do peso e flácida; costas com dobras, glúteo flácido, barriga"
- 15/10 — "usa medicação para emagrecer e não concilia com academia" (resumo)

**Gordura geral / sedentarismo / constância**
- 19/09 — "Estou sem treinar, procrastinando e sem saber por onde começar."
- 22/10 — "não consigo ter constância e um bom resultado; quer queimar gordura e definir" (resumo)
- 18/10 — "14 kg acima do peso, gordura abdominal e flacidez nas coxas; sem treinar" (resumo)
- 30/09 — "tudo barriga gordura falta de definição flacidez braços grossos"
- 29/09 — "definir meu corpo todo, perder barriga e perder uns 4 quilinhos"
- 03/10 — "não consigo montar um plano consistente sozinha"
- 16/10 — "sem ânimo para fazer exercício"
- 09/10 — "Quero retomar e quero um incentivo"
- 01/10 — "preciso de um treino básico para treinar em casa"

**Pós-parto**
- 30/09 — "Pochetinha da barriga pós parto (1 ano) flacidez, quero definir mais as coxas e bumbum"
- 30/09 — "Depois da gravidez o corpo na voltou mais como antes"
- 12/10 — "Corpo de gestação que não se recuperou em 4 anos"
- 10/10 — "Já estou liberada, comecei na academia mas não consigo ir constante"
- 05/10 — "Quero retornar treinos, mais ir academia nesse início vai ficar pouquinho complicado"
- 13/10 — "depois do filho está difícil voltar à rotina de treinos" (resumo)

**Hormonal / menopausa**
- 04/10 — "Durmo pouco e tenho o cortisol sempre alto"
- 04/10 — "flácida, com dores e sem disposição pra nada"
- 14/10 — "49 anos, menopausa, dificuldade de emagrecer" (resumo)
- 14/10 — "perimenopausa, quer diminuir e voltar a treinar" (resumo)

**Tempo / rotina / academia**
- 01/10 — "Antes treinava na academia mas ficava ruim com minha rotina de mãe"
- 30/09 — "objetivo é ganhar massa magra, mas não gosto de academia"
- 19/10 — "desanimou, parece que todo mundo consegue menos ela" (resumo)

### 1.6 Contexto citado nas conversas de leads (busca em citacao_dor + observacao + citacao_motivo)
| Tema | Leads | Comprou |
|---|---|---|
| "vídeo" (vídeo da Comunidade/app) | 116 | 7 |
| "em casa" | 74 | 7 |
| gestação/filho/parto/cesárea/bebê | 52 | 10 |
| "academia" | 42 | 2 |
| cartão | 32 | 9 |
| parcelamento/12x | 34 | 11 |
| desconto/promo | 32 | 12 |
| desafio | 23 | 5 |
| diástase | 21 | 1 |
| fora do Brasil (Portugal, Espanha, Itália, EUA etc.) | 16 | 7 |
| menopausa/climatério | 16 | 2 |
| pix | 15 | 7 |
| constância/disciplina | 8 | 4 |
| joelho/coluna/hérnia/escoliose/lesão | 7 | 2 |
| medicação para emagrecer (tratamento, Mounjaro etc.) | 5 | 1 |
| golpe/medo | 4 | 1 |

### 1.7 Idade (extraída do texto "NN anos" em citação/observação; só 72 leads têm)
| Faixa | Leads | Comprou |
|---|---|---|
| <30 | 2 (22–23) | 1 |
| 30–39 | 17 | 3 |
| 40–49 | 26 | 2 |
| 50–59 | 20 | 1 |
| 60+ | 7 (60–72) | 1 |
Campo `menor_30_anos`: true 10 (2 compraram) · false 311 (40 compraram) · vazio 948.

---

## 2. Objeções e motivos de não compra

### 2.1 Motivo de não compra (`motivo_nao_compra`, 1.269 leads)
| Motivo | Total | (dos quais comprou depois) |
|---|---|---|
| **sumiu sem resposta** | **787** | 8 |
| (vazio) | 389 | 101 |
| outro | 41 | 0 |
| sem dinheiro/cartão | 19 | 0 |
| sumiu antes do preço | 19 | 0 |
| vai pensar | 7 | 0 |
| achou caro | 5 | 0 |
| desconfiança | 1 | 0 |
| já treina | 1 | 0 |
→ **90,7% dos não-compradores (787/868) simplesmente sumiram**; só 31 deram motivo financeiro explícito (19+5+7).

### 2.2 Objeções citadas (`objecoes_detalhe`, várias por lead; 382 leads)
| Objeção | Leads | Comprou mesmo assim | % que comprou |
|---|---|---|---|
| sumiu antes do preço | 78 | 1 | 1,3% |
| vai pensar | 75 | 9 | 12,0% |
| sem dinheiro agora | 50 | 7 | 14,0% |
| esperar data de pagamento (cartão virar/salário) | 36 | 10 | **27,8%** |
| preço alto | 34 | 8 | 23,5% |
| quer plano menor | 31 | 6 | 19,4% |
| outra | 24 | 2 | 8,3% |
| falta de tempo | 21 | 3 | 14,3% |
| dúvida sobre plataforma/app | 20 | **0** | 0% |
| cartão sem limite | 18 | 2 | 11,1% |
| saúde/médico | 18 | 3 | 16,7% |
| não gosta de academia | 18 | 2 | 11,1% |
| só pix ou boleto | 15 | 4 | 26,7% |
| já treina | 15 | 2 | 13,3% |
| quer garantia ou teste | 8 | 5 | **62,5%** |
| empresa não atende perfil | 7 | 0 | 0% |
| consultar marido/família | 4 | 0 | 0% |
| desconfiança/golpe | 4 | 2 | 50% |
| parcelamento não serve | 4 | 2 | 50% |
| só curiosidade | 3 | 1 | 33% |

Objeção principal (`objecao`, 1 por lead): nenhuma 910 · sumiu antes do preço 56 · vai pensar 56 · sem dinheiro/cartão 26 · sem dinheiro agora 24 · outro 24 · outra 18 · preço alto 12 · dúvida plataforma/app 12 · sumiu sem resposta 12 · falta de tempo 11 · esperar data pagamento 11 · saúde/médico 9 · já treina 8 · não gosta de academia 8 · achou caro 7 · quer plano menor 5 · cartão sem limite 4 · consultar marido 3 · desconfiança 3 · só pix/boleto 3 · garantia/teste 2 · outros 1 cada.

**Agrupando dinheiro** (sem dinheiro agora + esperar data + preço alto + quer plano menor + cartão sem limite + só pix/boleto + parcelamento não serve): 188 menções em `objecoes_detalhe` (pode haver lead repetida entre categorias).

### 2.3 Citações literais de objeção (`citacao_motivo` de quem NÃO comprou)
**Dinheiro / cartão / data**
- 16/09 — "falta de dinheiro agora" (2 leads)
- 17/09 — "Vou ver a questão do cartão, mais vc teria como pagar no boleto??"
- 28/09 — "muito alto esse valor, cartão 24,90"
- 29/09 — "o valor tá meio alto pra mim"
- 29/09 — "fora do meu orçamento. Vou aguardar alguma promoçãozinha"
- 29/09 — "Achei que tivesse algo mais em conta"
- 30/09 — "vou esperar até o dia 15, que daí depois do dia 15 eu viro o meu cartão"
- 30/09 — "no momento o valor eu não vou conseguir fazer"
- 30/09 — "não tenho condição de pagar"
- 01/10 — "vou deixar mais pra frente, esperar meu cartão virar"
- 01/10 — "Estou desempregada"
- 02/10 — "Não dá pra mim. Não tenho essa grana"
- 02/10 — "eu recebo na segunda e entro em contato novamente"
- 03/10 — "Não está tendo nenhum desafio com um preço mais acessível não?"
- 04/10 — "Nao trabalho c cartao"
- 04/10 — "teria como melhorar o valor?"
- 04/10 — "Vou esperar meu cartão virar. Mas vou fazer com certeza"
- 04/10 — "No Momento tá fora do meu orçamento não tenho cartao"
- 07/10 — "É que estou analisando minhas contas"
- 09/10 — "Aguardar fechamento do cartão"

**Vai pensar / adiar**
- 27/09 — "me interessei mas vou fazer um procedimento e volto a conversar com você depois"
- 29/09 — "acho que vou querer o dia 3 meses para ver se vou me adaptar bem"
- 29/09 — "Vou decidir no fim de semana"
- 30/09 — "Só estou pensativa se vou ter a disciplina de fazer"
- 04/10 — "Vou pensar mais um pouco e te retorno"
- 04/10 — "vou me organizar aqui e volto a falar com vc"
- 05/10 — "Vou analisar e depois retorno"
- 09/10 — "Correria em casa"

**Confiança / adequação**
- 18/09 — "tenho medo é de golpe"
- 30/09 — "Preciso de um plano alimentar especificamente para mim"
- 05/10 — "estou com fidelidade no wellhub"

**Interessadas que sumiram depois de dizer sim** (motivo = sumiu sem resposta)
- 01/10 — "Achei muito bom o app"
- 02/10 — "Adorei. É como eu quero"
- 03/10 — "Sim, eu quero"
- 27/09 — "Quero comprar o desafio 21 dias"
- 27/09 — "Após o almoço irei fazer"
- 29/09 — "Não consegui ouvir os áudios, como faço pra ter acesso aos treinos?"
- 02/10 — "Áudio hoje não consigo. Amanhã vejo"

### 2.4 Por que alunas cancelam (WhatsApp de suporte, msgs com "cancel"/"desist", 30 msgs)
- 21/10 aluna — "Não sabia que era renovação automática. Tomei um susto qdo recebi a mensagem do banco com o desconto. Gostaria de cancelar essa assinatura."
- 29/10 aluna — "Foi renovada a minha assinatura sem ser solicitado. Gostaria de solicitar o reembolso e cancelamento do plano"
- 23/10 aluna — "Bom, como eu já estou desmotivada com os exercícios e me conhecendo, acho melhor desistir, neste momento. Agora que eu conheço seu projeto, prefiro amadurecer a ideia, pq 12 meses é um compromisso longo."
- 23/10 aluna — "Estamos com dificuldade de agenda e sozinha não consigo manter o foco"
- 24/10 aluna — "Infelizmente não consigo nesse momento. Repensei, pois não vale a pena eu fazer um investimento agora, se eu não vou conseguir colocar em prática."
- 14/10 aluna — "Nesta fase está a ser muito difícil. Estou a trabalhar 14h por dia e não consigo de todo conciliar tudo, mais a vida de casa, etc…"
- 04/11 aluna — "Não consegui dar andamento ao curso por questões pessoais. O seu curso é maravilhoso, mas, neste momento, estou passando por um divórcio."
- 05/11 aluna — "o conteúdo não atendeu às minhas expectativas e não me identifiquei muito com a proposta."
- 06/11 aluna — "Nao estou adaptando aos treinos tem meses que não faço uso do aplicativo."
- 21/10 aluna — "Eu desisto  eu já perdi um plano com vc aquele  de 21 dias"
- 16/10 aluna — "O plano de vocês é o mais diferente... eu já paguei uns 3 antes e cancelei.. por isso demorei a assinar"
- 14/10 aluna — "Eu tava pensando em cancelar... mas vou continuar, então!!! ❤️"

---

## 3. Motivos de compra

### 3.1 `motivo_compra` (109 compradoras)
| Motivo | Qtd |
|---|---|
| (vazio) | 59 |
| outro | 14 |
| preço acessível | 10 |
| vídeo explicativo | 6 |
| parcelamento | 6 |
| confiança na Laura | 4 |
| comunidade/acompanhamento | 4 |
| urgência da oferta | 3 |
| prova social | 2 |
| pix simbólico | 1 |
Dos 50 com motivo preenchido: **dinheiro facilitado (preço acessível + parcelamento + pix simbólico) = 17**; vídeo = 6; confiança/comunidade/prova social = 10.

Compra após follow-up: `comprou_apos_followup` true 47 · false 46 · vazio 16. Após follow-up 2: true 12. `aba_funil_diario`: 48 compras em follow-up de 109.

### 3.2 Citações literais (`citacao_motivo` de compradoras, 32)
- 16/09 — "Achei muito legal, e já consegui ver resultado"
- 24/09 — "gosto dos treinos q você posta nos story" (confiança na Laura)
- 24/09 — "os exercícios sempre me fez muito bem"
- 24/09 — "Acho que hoje se encaixa perfeito" (urgência)
- 27/09 — "Só vou esperar meu cartão virar esta semana e compro"
- 27/09 — "Estou gostando muito, estou bem empolgada" (vídeo)
- 28/09 — "Vou começar com o de 3 meses" (prova social)
- 29/09 — "Deixa eu só me preparar financeiramente agora para começarmos"
- 30/09 — "vou fazer dia 05 q meu cartão vira"
- 30/09 — "To ficando empolgada" (tinha objeção de desconfiança)
- 01/10 — "Eu quero o mensal"
- 02/10 — "Não posso desistir de mim"
- 02/10 — "Parece bem legal" (vídeo)
- 04/10 — "isso td q contei tb me deixou mt sem dinheiro"
- 05/10 — "Para dar certo tenho que me comprometer comigo mesma."
- 07/10 — "Os outros planos saem alto para mim"
- 07/10 — " pix simbólico de 50 enquanto a fatura do cartão fecha"
- 09/10 — "Pagou em 12x após ajuste de valor" (resumo)
- 09/10 — "Mora fora do Brasil e só consegue pagar via remessa/pix" (resumo)
- 27/10 — "queria o anual mas não podia; desconto 12x" (resumo)
- 28/10 — "conseguiu desconto no plano de 3 meses" (resumo)

### 3.3 Padrões nas observações das compradoras (texto copiado do campo `observacao`)
- "Pediu mensal, ofertado anual 297 em 12x; mandou comprovante e recebeu Primeiros Passos no mesmo dia da oferta." (27/09, 39 anos, 2 gestações)
- "Pediu desconto por renda baixa; recebeu o anual por R$297 em 12x; comprou na noite de 28/09 após follow-up"
- "Escolheu o plano de 3 meses após ver resultados de alunas"
- "Veio por indicação de aluna; 46 anos, 2 gestações, rotina corrida"
- "Hashimoto; já seguia os vídeos da Laura no Instagram"
- "Cartão não passou; fechou pelo pix simbólico (R$50)"
- "Disse que não podia investir, aceitou promoção 3 meses R$97 após template"
- "Chegou de madrugada; atendida só de manhã; comprou logo após o vídeo e o link."
- "Recebeu o vídeo do app e a proposta anual, pediu o link, enviou comprovante"
- "hesitou por medo de não manter o treino; comprou em 03/10"
- Moram fora do Brasil (Portugal, Espanha, Itália, EUA) aparecem em 16 leads, 7 compraram.

### 3.4 Planos e valores
`plano` das 109: não informado 40 · vazio 22 · **anual 24** · **trimestral 16** · semestral 2 · mensal 2 · pix simbólico 2 · outro 1.
`valor` (27 preenchidos): R$297 ×7 · R$397 ×6 · R$479 ×5 · R$97 ×3 · R$210 ×2 · R$357, R$50, R$197, R$429 ×1.
Greenn confirmadas (6): Trimestral R$210 ×2 · Anual R$397 · Anual R$297 · Anual R$479 · Mensal R$97.
Valores citados nos relatórios diários: anual R$479 → R$397 em 12x ("479 por 397"), anual R$297 em 12x (desconto), trimestral R$97 (promo), parcela R$39,92, pix simbólico R$50. Card do quiz: "a anual (R$ 24,75/mês), que é a que mais vende".

---

## 4. Funil do comercial (WhatsApp) — 1.269 leads, 12/09 a 07/11
| Etapa | Leads | % do total |
|---|---|---|
| Leads | 1.269 | 100% |
| Atendimento humano | 1.085 | 85,5% |
| Chegou na oferta | 642 | 50,6% |
| Recebeu link | 139 | 11,0% |
| Comprou | 109 | 8,6% |
(`aba_funil_diario` soma exatamente os mesmos números; follow-up no dia 236, follow-up 2: 639, comprou em follow-up 48; média do tempo médio de 1ª resposta por dia: 115,3 min.)

**Onde pararam (`ate_onde`):** só 1ª mensagem 261 · contou a dor 311 · recebeu oferta 253 · recebeu preço/link 335 · comprou 109.

### 4.1 Por origem
| Origem | Leads | Atend. | Oferta | Link | Comprou | % compra | Só 1ª msg | Só preço e sumiu |
|---|---|---|---|---|---|---|---|---|
| manychat | 519 | 436 | 243 | 44 | 41 | 7,9% | 107 | 29 |
| bio | 460 | 395 | 233 | 56 | 40 | 8,7% | 98 | 17 |
| story | 122 | 109 | 75 | 24 | 15 | **12,3%** | 14 | 12 |
| seguidor | 74 | 61 | 42 | 6 | 4 | 5,4% | 18 | 3 |
| texto livre | 33 | 30 | 22 | 6 | 6 | **18,2%** | 6 | 6 |
| anúncio | 27 | 25 | 12 | 1 | **0** | 0% | 10 | 0 |
| outro | 22 | 17 | 10 | 1 | 2 | 9,1% | 4 | 4 |
| live | 12 | 12 | 5 | 1 | 1 | 8,3% | 4 | 0 |
| **quiz** | **0** | — | — | — | — | **não existe no CRM** | | |

### 4.2 Fatores ligados à compra
- **Tempo da 1ª resposta:** ≤5 min 21/289 (7,3%) · 6–30 min 32/314 (10,2%) · 31–120 min 19/192 (9,9%) · 2–8 h 4/120 (3,3%) · >8 h 3/75 (4,0%) · sem dado 30/279.
- **Uso de mídia (áudio/vídeo) na conversa:** com mídia 76/610 (12,5%) · sem mídia 31/612 (5,1%).
- **Nota de qualificação:** nota 9 → 30/38 compraram; nota 8 → 27/82; nota 7 → 14/132; nota ≤4 → 12/545.

---

## 5. Perfil
- **Idade:** ver 1.7. `menor_30_anos` = true só 10 leads (2 compraram) contra 311 false (40 compraram).
- **Só pergunta preço e some (`so_preco_e_sumiu`):** true **71** (3 compraram) · false 815 (79 compraram) · vazio 383. Por origem: manychat 29, bio 17, story 12, texto livre 6, outro 4, seguidor 3.
- **Mães / gestação:** 52 leads citam gestação/filho/parto/cesárea/bebê (10 compraram); 83 têm "pós-parto" e 58 "diástase" nas dores.
- **Fora do Brasil:** 16 citações (7 compraram) — pagam por pix/remessa/terceiros.
- Planos/valores: ver 3.4.

---

## 6. Grupos de alunas (painel_mensagens; só alunas, base 4.672 msgs com texto, 11/10–08/11)

### 6.1 Contagem de temas (nº de mensagens que mencionam)
| Tema (regex) | Total | Telegram | WhatsApp suporte |
|---|---|---|---|
| treino feito / check-in ("treino A–E", "treinei", "pago") | 587 | 568 | 19 |
| grupo/comunidade/musas/meninas | 267 | 255 | 12 |
| consegui | 99 | 60 | 39 |
| fotos/medidas (acompanhamento) | 97 | 53 | 44 |
| acesso/app/login/senha/plataforma | 74 | 20 | 54 |
| alimentação/dieta/cardápio/caloria/proteína | 60 | 33 | 27 |
| "tempo" | 56 | 35 | 21 |
| equipamento (halter, caneleira, elástico, step) | 56 | 50 | 6 |
| filho/bebê/amamentação/creche | 55 | 50 | 5 |
| barriga/abdômen/pochete | 53 | 32 | 21 |
| balança/peso/emagreci/eliminei | 49 | 33 | 16 |
| "em casa" | 47 | 25 | 22 |
| kg/quilo | 43 | 29 | 14 |
| academia | 38 | 23 | 15 |
| dificuldade/difícil | 34 | 21 | 13 |
| perdi | 31 | 20 | 11 |
| menstruação/TPM/cólica/ciclo | 30 | 26 | 4 |
| resultado | 29 | 21 | 8 |
| dor/dores/doendo | 28 | 22 | 6 |
| medida | 27 | 9 | 18 |
| renovar | 27 | 7 | 20 |
| cancelar | 27 | 2 | 25 |
| não consigo / não tô conseguindo | 26 | 10 | 16 |
| 15 min / treino curto / 5 min | 26 | 22 | 4 |
| calça/roupa/vestido/short/número | 24 | 19 | 5 |
| parei/voltei/recomeço | 23 | 20 | 3 |
| constância/disciplina | 17 | 14 | 3 |
| cm/centímetro | 12 | 7 | 5 |
| joelho | 11 | 9 | 2 |
| **pilates** | **11** | 10 | 1 |
| desânimo/desmotivação/preguiça | 10 | 5 | 5 |
| inchaço/desinchar/retenção | 10 | 6 | 4 |
| perdida/qual treino/por onde começar | 10 | 6 | 4 |
| coluna/lombar/hérnia | 9 | 8 | 1 |
| **canetinha/Ozempic/Mounjaro/tirzepatida/semaglutida** | **6 (5 reais)** | 3 | 3 |
| antes e depois | 3 | 2 | 1 |
| menopausa/climatério | 2 | 1 | 1 |
| diástase | 1 | 1 | 0 |
(Obs.: "perdi" inclui "me perdi"/"perdi o link"; "kg" inclui peso de halter. Por isso os depoimentos abaixo foram lidos um a um.)

### 6.2 Depoimentos de RESULTADO (literais, data + primeiro nome)
1. 13/10 aluna (Telegram) — "Em 1 mês (juntando viagem, 1 semana de repouso cirúrgico e meu descontrole de comidinhas) a pochete não diminuiu kkkk Mas reduzi 1 cm de cintura, quadril e panturrilha Tô no lucro"
2. 13/10 aluna (WhatsApp) — ficha de medidas: "*7/05/2026* … Cintura 80 / Pochete 88 / Quadril 106 / Perna 55 … Peso: 68Kg" → "*14/10* … Cintura 71 / Pochete 82 / Quadril 99 / Perna 51" e "Da Páscoa 2026 69,700 e hoje 59,700 / 10 Kilos off" [sobrenome omitido]
3. 08/11 aluna — "11 cm de abdome  foram pro ralo desde o início do corpo feliz"
4. 13/10 aluna — "\"40kg a menos, olha onde ta chegando Jaqueline\""
5. 13/10 aluna — "O primeiro treino q comprei, q foi o 30 p vida, eu pesava 104kg."
6. 20/10 aluna — "Eu fiz primeiro o desafio 30 pra vida no começo do ano passado. Nessa época eu pesava mais de 100kg. De março a novembro perdi uns 20kg. Ai em novembro eu entrei firminho na comunidade. De novembro pra cá (considerando q eu comecei a focar e treinar todo dia a partir de abril desse ano), foram mais 20kg. E a maravilhosidade dos treinos da profe é q se vc tem tempo, faz um inteiro. Se não tem faz os de 5min, tem as aulas diferenciadas tbm e se vc quiser, faz de pijama mesmo. Eu, particularmente, tenho gastura de ir pra academia (e cá entre nós os exercícios da profe trabalham MUIIITOOO mais q os de academia) então eu amo o conforto que é poder treinar em casa. E por último e não menos importante, aqui não é só sobre treino. Aqui vc descobre q nenhuma experiência é individual, vc encontra apoio, acolhimento e até uns puxões de orelha, se necessário. Eu to pronta pra renovar com a Laura pelo tempo q ela mantiver a comunidade."
7. 13/10 aluna — "…eu vou pra frente do espelho e coloco uma calça jeans q n me servia, faço aquelas posições q os meus pseudo musculinhos ficam evidentes, solto um sorriso sincero pela minha evolução (q tá indo no tempo dela) e recupero."
8. 14/10 aluna (WhatsApp) — "Eu estou muito feliz, nunca imaginei que treino em casa daria tanto resultado"
9. 14/10 aluna — "Hj fui em uma consulta coma nutricionista … Ela ficou muito supresa com o meu resultado quando mostrei pra ela como era antes É mais ainda quando falei que só treinava em casa"
10. 14/10 aluna — "Obrigada profe !!!! Fiquei muito feliz ! E isso fala muito sobre o direcionamento dos seus treinos !!! Perder gordura sem flacidez 💗💗💗💗"
11. 15/10 aluna — "Prof, fui na nutri hoje e em um mês tive esse resultado aqui" / "Perdi pouco peso na balança em um mês, mas porque perdi em massa gorda o que ganhei em massa magra, praticamente. 😊"
12. 17/10 aluna (WhatsApp) — "Eu havia desistido de continuar por um motivo cansaço e desânimo e tristeza  mas decidi recomeçar e como estou feliz com o resultado que estou conquistando e acredite não consigo ficar sem fazer um dia estou fazendo o efeito lipo e notei que estou com mais resistência e força coisa que não tinha antes estou orgulhosa de mim e saber que VC faz parte dessa minha evolução" **(menciona o Efeito Lipo)**
13. 17/10 aluna — "Verdade concordo estava me sentindo velha até nas minhas roupas 🥹 Quando me vi indo pra igreja tinha um espelho e no caminho me olhei pensei meu Deus quero mudar isso estou velha 🤣 cheguei e comecei agora não quero parar kkkjj"
14. 18/10 aluna — "Feliz pq consegui aumentar minha carga de 7 a 8kg em alguns movimentos de membros superiores"
15. 19/10 aluna — "É muito bom .ver que as poucos estou vendo resultados. Olha minha coxas 😊.só tenho que melhorar o interno dela"
16. 20/10 aluna — "Sem dúvidas nenhuma foi a minha melhor escolha,hj já vejo resultado em menos de 2 meses e a prof é maravilhosa. Amando meu resultado e as meninas aqui são super legais umas com as outras ❤️❤️"
17. 20/10 aluna — "Eu sempre tive dificuldade de definir músculo, mas em 8 meses com a prof (sendo que fui bem inconstante no inverno) tive mais resultado do que em anos de academia e quando estava no auge do metabolismo. Confia!"
18. 20/10 aluna — "Comecei o desafio de 21 dias e nessa consegui ver que era possível tirar uns minutinhos de treino pra descansar a mente e nessa comecei a fazer todo os dias … hoje já é super normal tirar um tempinho pra treinar com a prof. Não te preocupa com relação a equipamentos que a prof vai dando ideias de substituição"
19. 20/10 aluna — "Tem quase 1 ano aqui , e quando a gente começa a gente fica tão acelerada pra ver resultado , procurando o pq pra gente não funciona e pro outro parece tão fácil … aí é quando vc vê que de uma maneira tão leve os resultados estão ali"
20. 20/10 aluna — "O kilo que ganhei já perdi 👌"
21. 20/10 aluna — "feliz demais q consegui voltar a fazer burpee sem sentir dor 🙏🏻😍"
22. 21/10 aluna — "Posso dizer que lido com minhas compulsões diariamente, poderia ter resultados melhores se não fossem minhas \"deslizadas\", mas estou tendo um ótimo resultado do meu jeitinho. … Já fiz outras plataformas, mas sempre desisti de continuar, muito por não ter \"com quem contar\". Obrigada a todas!! Vcs são parte desse meu \"novo cpf\" ❤️❤️"
23. 21/10 aluna (WhatsApp) — "Prof, olha minhas fotinhas de 50 dias de dieta, porém, tive algumas recaídas, não graves, mas não fiz 100%, digamos que foram uns 80% mas achei que mesmo assim, desinchou um pouco."
24. 21/10 aluna — "Mulheeerrr você deu uma secada! Parabénsss,, sua disciplina está dando resultadoo"
25. 22/10 aluna — "…esse mês tô fazendo no modo avançado com e step e carga um pouco maior, nunca achei que esse momento iria chegar."
26. 23/10 aluna — "Hoje completando 1 aninho nessa comunidade maravilhosa ! 1 ano que aprendi o significado de constância .. 1 ano que é tudo além de estética e sim mente e espírito ! … E renovando o plano em 3,2,1 …."
27. 23/10 aluna — "Eu simplesmente descia e não conseguia voltar pra cima. Joelho gritaaaava. Em setembro consegui fazer e foi uma conquista pra mim."
28. 23/10 aluna (WhatsApp) — "Estou muito animada pq estou percebendo a evolução nos exercícios. Alguns com um certo nível de dificuldade e a cada treino melhora."
29. 24/10 aluna (WhatsApp) — "Queria compartilhar com vc algumas fotos que fiz ao longo do meu processo de evolução com Corpo Feliz. Estou muito feliz com os resultados e em ter encontrado vc e dar essa oportunidade para mim, minha saúde e me corpo! Muito obrigada prof ❤️❤️❤️❤️❤️"
30. 26/10 aluna (Telegram) — "*Outubro/2025* Foco: Eliminar 2kg - fortalecimento muscular. 54 anos - Menopausada Peso: 53.200 Abd: 84 Cint: 77 Quadril: 93 / *Outubro/2026* … 55 anos Peso: 51.500 Abd: 76 Cint: 71 Quadril: 94"
31. 27/10 aluna — "Ah é o braço tá mais definido que o do meu marido e quando ele tirou foto minha de costa com uma blusa mais cavada vi que tenho covinhas nas costa"
32. 31/10 aluna (WhatsApp) — "Gosto porque para o iniciante e o médio.  É muito legal tem resultado"
33. 01/11 aluna — "Estou bem ausente devido questões de saúde, mas quero dizer que o corpo feliz é justamente o que tem ajudado a me manter de pé. De janeiro até aqui já foram 13kg sem reganho mesmo nos períodos afastada das atividades."
34. 02/11 aluna — "Laura quero agradecer por tudo que vc faz por nós,  hj cheguei em meu menor peso, que nunca imaginei conseguir … mesmo distante, vc se faz tão presente q é impossível nao ouvir sua voz quando a preguiça bate, dizendo boraaaa fazer o corpo feliz."
35. 02/11 aluna — "Hoje percebi o quanto ganhei resistência e como eu tô ficando boa na execução dele."
36. 02/11 aluna (WhatsApp) — "10 kg....ela perdeu em 6 meses...tô bem surpresa e animada" (fala de outra pessoa)
37. 03/11 aluna — "As roupas já estão todas folgadas, a balança parece que parou no 63, levo mais em comparação o que vejo no espelho e o que ainda me incomoda é o abdômen abaixo do umbigo pra baixo, parece que não sai."
38. 03/11 aluna — "No início meu parâmetro era só as roupas folgarem. Hoje eu tô piteuzinho, quando entrei tava só pela misericórdia."
39. 03/11 aluna — "O que eu consigo perceber é nas roupas"
40. 03/11 aluna — "o que mim consola é vê meu antes e depois e saber que não quero mais aquela eu antiga e vesti o que eu quero e não o q cabe"
41. 03/11 aluna — "meu peso na balança,  deu menos dois quilos, minhas colegas dizem que estou mais magra... mas eu não  vejo..."
42. 03/11 aluna — "As medidas foram fundamentais" / "Quando ganhei 1kg nas férias As medidas que me salvaram pra eu entender que eu tava inchada"
43. 03/11 aluna — "Minha pochete não vai sair tão fácil e tvz só com procedimento cirúrgico ...minha menina foi enorme. Quase 4Kg e 53 cm. Fiz uma barriga enorme...uma diástase de 4cm...resolvi me acolher ...estou agora que emagreci me sentindo uma lombriga de pochete haha mas me amando assim"
44. 14/10 aluna — "Foi o que me fez ter constância pela primeira vez na vida ! … Mas os treinos em casa sao fundamentais para mim. Se nao fosse isso,  eu jamais treinaria agora a noite, pq nao iria mesmo para a academia."
45. 13/10 aluna — "Siiim. Te conheci no modo rambo kkk Ai depois engrenei na comunidade. Melhor escolha q já fiz ❤️"
46. 06/11 aluna (WhatsApp) — "Quem olha de fora, não acredita que vai ter resultado só com 15min"
47. 07/11 aluna — "Treinar em casa é vida!! Treino E + G do mês = feliz , Feliz , FELIZ 🤩"

**Resultados frustrados (também literais — úteis para tratar expectativa):**
- 03/11 aluna — "fui fazer fotos pro  meu acompanhamento, achei que tava arrasando, pedalando 6 vezes na semana, treinando com a prof 7 e seguindo a dieta a risca com pouquíssimas falhas. Resultado, diferença  de praticamente nada."
- 03/11 aluna — "Eu fiz. Diminuiu pouco...2cm na cintura/barriga. O que mais me incomoda é a pochete, que chega a dobrar por cima da calcinha...mas eu sei que perfeita não vai ficar, porque tenho um filho"
- 21/10 aluna — "estava bem desanimada por não ter conseguido fazer 100% , na balança não vi diferença"
- 16/10 aluna (WhatsApp) — "eu já tinha um pouco dessa barriga caida , porém como não estava acima do peso não me incomodava tanto , agora estou sem acreditar que cheguei neste estado"

### 6.3 Dúvidas e dificuldades das alunas (literais)
**Tempo / rotina / maternidade**
- 14/10 aluna — "Estou a trabalhar 14h por dia e não consigo de todo conciliar tudo, mais a vida de casa, etc…"
- 20/10 aluna — "Faz 6 meses que comprei o programa, mas ainda não consegui focar😢 Eu tenho um nenê de 1 ano e ainda amamento … tenho ainda 8kg da gestação  que não emagreci"
- 05/11 aluna — "Eu estou com uma rotina puxada. E pouco tempo para treinar. Daí a intensidade dos treinos tem ficado difícil de acompanhar."
- 14/10 aluna — "To querendo começar algum vacum antes do treino de manhã, mas só tenho 10 minutos"
- 18/10 aluna — "No máximo 35min, prof! Se não começa a aumentar o risco de a gente furar pela falta de tempo."
- 18/10 aluna — "Treinos longos de no maximo 40 minutos"
- 20/10 aluna (respondendo a aluna) — "O bom da plataforma é que tem treinos bem curtinhos, tem de 3, 5 até 15 minutinhos."

**Dor / lesão (joelho 11, coluna/lombar 9, "dor" 28)**
- 19/10 aluna — "pq  sinto dor no joelho esquerdo. :("
- 30/10 aluna — "Prof tem algum modulo de exercícios pro joelho? Nao achei! Aquela aula de spinning deu ruim no joelho"
- 23/10 aluna — "senti um pouco meu joelho no último"
- 15/10 aluna — "a dor na lombar está mais forte esses dias"
- 04/11 aluna — "estou  com a lombar inflamada segundo o médico"
- 31/10 aluna — "Ei, devido o problema da coluna mesmo" / "estou com medo de sentir a dor novamente"
- 23/10 aluna — "to no iniciante 2 e cheia de dores 🥲🥲 e eu achando q seria moleza"

**Desânimo / energia / recomeço**
- 15/10 aluna — "eu to sem energia … eu nao consigo fazer nada sem morrer no meio do caminho.. e ai me desanima"
- 23/10 aluna — "sozinha não consigo manter o foco"
- 15/10 aluna — "por conta de ser mais difícil manter uma rotina em casa"
- 17/10 aluna — "Esse começo está sendo muito difícil"
- 20/10 aluna — "Como é desafiador o retorno. Depois de 8 dias sem treinar, o mental precisa ser forte. O grupo que me motivou a ter forças"
- 29/10 aluna — "Estou tentando retornar aos treinos, mas confesso que me sinto bem perdida sobre qual melhor programa de treino para seguir no app"
- 19/10 aluna — "Esses dias estou fazendo treinos de academia mas não sei qual fase fazer, do avançado. Estou meio perdida nos treinos"

**App / acesso (74 msgs, 54 no suporte)** — ex.: 19/10 aluna "O app está com algum problema? Não estou conseguindo acessar."; 24/10 aluna "não consigo assistir as aulas"; 17/10 aluna "nao estou conseguindo achar as aulas 🫣".

**Alimentação (60)** — 28/10 "Tenho restrição com legumes e verduras e não consigo comer eles"; 29/10 aluna "durante a semana é mais fácil, mas final de semana fica mais difícil"; 03/11 aluna "peso 57kg vi que os planos começam com 1300 calorias … Não vou engordar e ganhar mais barriga? Kkk".

### 6.4 Pilates (11 msgs de 4 alunas: aluna 7, aluna 2, aluna 1, aluna 1)
Todas usam pilates **junto** com o treino, não no lugar: aluna (7 msgs, ex.: 22/10 "Corpo feliz de hoje: Pilates + Musculação + Esteira"; 31/10 "Em busca do equilíbrio: Pilates!"); aluna 18/10 "Prof , eu posso fazer pilates e o treino  no mesmo dia ?"; aluna 12/10 "Vou é bem fazer pilates no pico kkkk"; aluna 02/11 "Pilates com uma fisio amiga minha". Nenhuma objeção "prefiro pilates" foi encontrada nos leads (não há categoria nem citação).

### 6.5 Canetas / Ozempic / Mounjaro (5 msgs reais; 1 falso positivo descartado)
- 16/10 De — "Meninas alguém aqui faz uso das canetas?"
- 17/10 aluna — "quem usa a caneta se não consegue comer o carbo tem que priorizar a proteína, bem essa foi a minha nutri que falou"
- 17/10 aluna (WhatsApp) — "Sempre fui constipada, mas a Tirzepatida piorou o cenário"
- 19/10 aluna (WhatsApp) — "Como eu havia falado ,estou em tratamento com monjaro e já eliminei 17 quilos . A meta é ficar com 70 quilos e tenho 1,60 e 57 anos"
- 06/11 aluna (WhatsApp) — "Sábado eu iniciei a semaglutida. Tem algum treino mais adequado na plataforma ?"
Nos leads: 5 conversas citam medicação/tratamento para emagrecer (1 comprou), ex.: "usa medicação para emagrecer e não concilia com academia" (resumo, 15/10) e "perder barriga e firmar braços e pernas; usa tratamento para emagrecer" (resumo, 17/10, comprou).

---

## 7. Conclusões já registradas antes (relatorios_diarios 06/10–06/11 e hub_ideias)

### 7.1 Relatórios diários (28 dias, 06/10 a 06/11; sem dias 24–27/10)
Recorrências (com data de exemplo):
- **Demora na 1ª resposta, sobretudo leads da noite**: aparece em quase todos. 10/10: "22 leads novos chegaram à noite (após 18h) e ficaram só com a resposta automática". 02/11: "15 dos 31 leads com resposta humana esperaram mais de 2h". 15/10: "leads atendidos em menos de 10 min avançaram mais para a oferta".
- **Mandar o vídeo da Comunidade logo após a dor, antes do preço**: 07/10, 08/10, 09/10, 12/10 ("Só 5 de 39 chegaram na oferta: enviar o vídeo da Comunidade logo após a dor, como feito com quem fechou"), 17/10, 22/10, 30/10, 05/11.
- **Data de pagamento / cartão**: 07/10 "oferecer o pix simbólico de R$50 já na primeira menção a cartão sem limite, como funcionou hoje"; 09/10, 14/10, 20/10 "combinar o dia e agendar o retorno".
- **Plano menor / mensal / trimestral R$97** para quem acha caro: 10/10, 15/10 ("oferecer o mensal ou o desafio de 37 antes de perder para o preço"), 30/10, 05/11.
- **Garantia de 7 dias e parcela R$39,92** para "vou pensar": 13/10, 18/10, 19/10, 02/11.
- **Não gosta de academia / sem tempo → treino em casa**: 08/10 ("reforçar o treino em casa de 30 minutos"), 21/10, 29/10, 02/11.
- **Prova social** para FOLLOW UP 2: 16/10, 04/11.
- **Renovação**: 07/10 "parte das recusas é de quem já treina na academia ou com personal"; 11/10 "explicar … que a renovação é manual".
- Dores mais citadas dia a dia: barriga e emagrecer lideram em quase todos.

### 7.2 hub_ideias (cards revisados em 11/10–15/10)
- **Quiz De Volta ao Eixo (Efeito Lipo)** — no ar, "testes G (1ª tela) e E (oferta em 3 versões: com Efeito Lipo, só mensal R$ 37 e só trimestral R$ 97, desde 10/10). O teste B (preço R$ 37 × R$ 47) foi encerrado em 10/10 sem volume." Hipóteses registradas: "a T1 não conversa com o criativo, o botão 'Garantir minha vaga' soa como venda e o resultado fala de quilos enquanto a T1 fala de recomeço". Sugestão registrada sobre teste C (R$27/mês): "R$ 27/mês fica perto da anual (R$ 24,75/mês), que é a que mais vende."
- **Uma promessa só: anúncio → quiz → oferta** — "Diagnóstico de 07/10: o gargalo é antes da T2 (8% contra 32% da régua). Os anúncios que vão para o quiz vendem a Comunidade e pedem 'Comenta QUERO'; a T1 fala de recomeço; as perguntas falam de secar a barriga e 8 kg; a oferta é o Efeito Lipo." Promessa escolhida: **recomeço** (criativo H "Recomeçar não é voltar do zero", 08/10). "Em 08/10, 19% passaram da 1ª tela (antes eram 8%; a régua é 32%)." Criativos K e L recusados.
- **Gestor de tráfego** — régua: "custo por venda até R$ 37, 32% passando da T1, 18,7% clicando em comprar". 17 propostas: 8 executadas, 8 recusadas, 1 pendente.
- **Recuperar quem clicou e não comprou** — remarketing "RMKT · CHECKOUT SEM COMPRA 7D, R$ 15/dia, desde 08/10"; 2 propostas de lembrete automático no WhatsApp recusadas (08 e 09/10); tarefa aberta "Aprovar 1 criativo que responde o medo principal".
- **Agente de pesquisa de oferta** (15/10) — concorrentes analisados; "Colocar o teste J no ar (depois do teste I)" pendente.
- `rotina_instrucoes`: só instruções operacionais das rotinas (leitura do CRM, envio do relatório ao grupo Vendas Aline) — sem análises de cliente.

---

## 8. O que NÃO existe nos dados
- Nenhum dado de leads vindos do quiz no CRM (origem "quiz" = 0); métricas do quiz estão fora deste banco.
- Idade só em 72 leads (texto) / 321 (flag <30).
- Valor de compra só em 27 de 109.
- Depoimentos de alunas só de 11/10 a 08/11/2026; não há mensagens antigas.
- Fotos/prints de antes-depois: o banco tem só `tem_midia`, não o conteúdo da imagem.
- `painel_ia` e `painel_revisoes` estão vazias (0 linhas).
