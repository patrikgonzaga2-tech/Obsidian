---
type: referencia
title: "Comunidade - app sem deixar a aluna perdida (08-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, app, treinos, greenn]
created: 2026-11-08
summary: "Revisão do App Corpo Feliz com o objetivo do Patrik: a aluna sempre sabe o que fazer, com no máximo 3 opções de treino. Diagnóstico, simulação com os 370 treinos da Greenn e proposta."
---

# App sem deixar a aluna perdida (08/11)

Projeto: [[Corpo Feliz - Comunidade]] · Pedido do Patrik: "a cliente tem que saber exatamente o que fazer; no máximo 3 opções".
Fontes: código da `main` (app/app), simulação do `treinoDoDia` com os 370 treinos da Greenn que têm minuto escrito
([[Área de membros/_Índice]], branch `claude/area-membros-comunidade`) e [[Comunidade - voz da cliente]] §6.1.

## Resposta curta
Hoje **não entrega**. Com o catálogo da Greenn, o app repete 3 treinos para sempre, mostra até 262 aulas na lista e tem
um botão que joga a aluna na página inicial da Greenn (878 aulas).

## Onde ela se perde hoje
1. **Treino que não anda.** `treinoDoDia` sorteia entre os 3 com mais pontos e não olha o que ela já fez. Simulação:
   intermediária de 20 min recebe TREINO 01, 02, 03, 01, 02, 03… e nunca chega ao 04. A Greenn é feita de trilhas
   ("21 treinos em 30 dias", "30 treinos em 35 dias", "siga essa trilha por 30 dias").
2. **Dois caminhos no Hoje.** O cartão "Treino de hoje" e o "Seu próximo passo" (hábito "Mexer o corpo"), cujo botão
   "Abrir os treinos" leva à página inicial da Greenn, onde ela precisa escolher sozinha.
3. **Listas enormes no Treinar.** "Por tempo": até 20 min = 76 aulas; até 30 min = 262. "Programas": 10 cursos com nomes
   de até 91 letras.
4. **Ida e volta da Greenn sem roteiro.** Sem login, o link da aula cai na tela de entrar e perde a aula. Nada diz
   "entre e toque de novo" nem "volte aqui e toque Concluí".
5. **Cuidados sem resposta.** Nenhuma aula da Greenn tem cuidado escrito (diástase, joelho, pós-parto, gestante).
   Na simulação, uma aluna com diástase receberia "ABDÔMEN" (5 min). Risco.
6. **Plano B confuso.** O botão diz 10 min e o código dá 5; o 1º treino curto sorteado foi
   "1. O QUE SÃO OS TREINOS CF FAST?" (parece explicação).

## Proposta: 3 opções, sempre as mesmas, nesta ordem
| # | Nome no app | O que é | Base |
|---|---|---|---|
| 1 | **Treino de hoje** (o melhor) | o próximo da trilha dela, na ordem da Greenn ("Treino 4 de 21"); na Avançada, o treino do mês para o dia da semana | a própria Greenn: trilhas numeradas e "um treino a cada dia da semana" (seg A, ter B, qua C, qui D, sex E, sáb F, dom G, escrito nos títulos) |
| 2 | **Sem tempo hoje** | treino de 3 ou 5 min (PARA OS DIAS MEGA CORRIDOS), na ordem | "tempo" em 56 mensagens; "15 min / treino curto / 5 min" em 26; aluna: "se não tem [tempo] faz os de 5min" |
| 3 | **Mais leve hoje** (a menos provável) | treino SEM IMPACTO (Iniciante I, 8 a 29 min); fica em destaque quando o check-in diz energia baixa | "dor" em 28 mensagens, "joelho" 11, "desânimo" 10; "sem impacto" está escrito no curso |

Trilha pela regra da própria Greenn (pergunta "ritmo" passa a usar estas respostas):
nunca treinou → INICIANTE I · menos de 6 meses → INICIANTE II · 6 a 8 meses → INTERMEDIÁRIA · 8 meses ou mais → AVANÇADA (treinos do mês).
Ao terminar uma trilha, abre a próxima. Todas essas trilhas têm minuto escrito (não dependem dos 269 sem duração).

## Ajustes que acompanham
- Hoje: um só lugar para o treino (o "Abrir os treinos" do hábito vira o mesmo cartão).
- Treinar: no topo, as mesmas 3 opções e "Minha trilha" com ✓; "Ver todos" fechado.
- Aula da Greenn: 3 passos na tela (abrir · se pedir login, entrar com o e-mail da compra e tocar de novo · voltar e tocar Concluí);
  ao voltar ao app, perguntar "Terminou o Treino 4?".
- Nome: grande e curto ("Treino 04 · glúteo e posterior de coxa"); embaixo, o caminho exato na Greenn.
- Treinos de Novembro do YouTube = TREINO A, B, D, E, F de novembro da Greenn (mesmos minutos): usar o do YouTube (toca no app).

## Feito (08/11, PR patrikgonzaga2-tech/LR_LauraRosaPersonal#379, rascunho)
Patrik: "pode fazer, segue sua recomendação em tudo". Tudo da proposta acima entrou, mais:
- **Regras da Laura** (respondeu ao alerta): gestante pode seguir todos os treinos e manda mensagem no suporte (botão do WhatsApp no app);
  diástase pode fazer todos, inclusive abdômen (ela passa a adaptação na aula); joelho: "Mais leve hoje" e a aula de fisioterapia
  de joelho do Prof Thalisson (bônus). Pós-parto ainda sem resposta: abdômen fora das opções.
- Alerta enviado ao suporte da Laura, (82) 8142-3528, pelo WhatsApp do Patrik conectado no Metrifiquei (mesma rotina do painel).
- **Elah App** (elah-app.com, só a página de vendas; o app é só para assinante): a promessa é a mesma ("você saberá exatamente o que
  fazer em cada treino", progressão). Trazido o "ponto de partida": até o 1º treino, o app mostra a autoavaliação física da área de membros.
  O que eles têm e nós ainda não: trilha de academia separada ("Academia descomplicada") e mobilidade/diástase como programas;
  aqui depende da duração dos treinos de academia (Bônus Fases 1 a 11) e de mobilidade, que a Greenn não tem escrita.
- Banco: estrutura e carga aplicadas; os 370 treinos da Greenn ficam escondidos até o merge (o app no ar quebraria com campo vazio).

## Pendências do Patrik
- OK no PR #379; depois do merge, reaplicar `supabase/app-cf-aulas-greenn.sql` (publica os treinos).
- Laura: regra do pós-parto.
- Se quiser academia e mobilidade nas trilhas: alguém anotar a duração desses vídeos.
