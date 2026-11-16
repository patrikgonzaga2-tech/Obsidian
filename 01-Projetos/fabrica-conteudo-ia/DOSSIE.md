# Nexo Studio (antes "Fábrica de Conteúdo IA") · Dossiê do projeto

> **Nome definido pelo Patrik em 16/11/2026: Nexo Studio.** O canal Pingo Pinta é o 1º cliente.

> **Projeto independente**, com contas, dados e infraestrutura próprios. Esta pasta é só um depósito
> temporário: quando o repositório do projeto existir, tudo aqui vai para lá (`docs/`).

Atualizado em 15/11/2026. Origem: conversa de 14 e 15/11 com o Patrik.

## REGRA FIXA DE COMUNICAÇÃO (pedido do Patrik, 15/11)
Todo pedido ao Patrik vem SEMPRE neste formato, sem exceção:
1. **Qual passo é** (ex.: "Sprint 1 · Dia 1 · Passo 3 de 4").
2. **Passo a passo** clique a clique, com **links clicáveis**.
3. **Motivo:** por que precisa disso agora.
4. **O que resolve:** o que destrava ou que problema evita.
5. **O que me mandar** quando terminar.
Nunca pedir algo "solto", sem esses 5 itens. Esta regra entra no CLAUDE.md do repositório do projeto.

**Complemento (16/11, pedido do Patrik):** antes de cada passo, conferir **em que fase estamos, onde paramos e
se o Patrik já enviou o que o passo anterior pedia**. Só então mandar **um passo por vez** (nunca vários de uma
vez). Pendências do Patrik ficam listadas no topo de `DECISOES_E_AVANCOS.md`.

---

## 1. O que vamos criar

Uma **fábrica de conteúdo com IA em forma de escritório virtual**: pesquisa, cria, revisa e publica
sozinha dentro de um horário de trabalho e de um teto de gasto, e **só trava quando precisa do dono**.

- **1º cliente:** um canal nosso, criado do zero (nicho ainda não decidido; "infantil 2 a 5 anos,
  desenhar e colorir" é só a hipótese mais forte da pesquisa, a Recepção valida ou troca).
- **Depois:** vira **SaaS** vendido para outras pessoas. Por isso tudo nasce multi-cliente.

### Camadas
| Camada | O que é |
|---|---|
| Canal (inquilino) | Ficha do canal: nicho, público, formato, referências, personagem, voz, regras, contas |
| Motor (esteira) | Salas automáticas que puxam trabalho, gravam estado no banco e param nas travas |
| Escritório (cara) | Painel em pixel art: cada sala é uma etapa, cada item é um personagem andando |

---

## 2. Salas do escritório

| Sala | Faz | Trava no dono? |
|---|---|---|
| **Recepção / Diretor de Canal** | Entrevista do zero, descoberta de nicho, cria ou troca a ficha do canal; propõe mudança de rumo com dados | sim (escolhas) |
| **Radar** | Vasculha canais e vídeos pelas regras da seção 3; dispara alertas | não |
| **Análise** | Assiste pelo link (Gemini) e desmonta a estrutura: gancho, ritmo, duração, thumb, título | não |
| **Biblioteca** | Memória do canal: estruturas virais, nossos resultados, decisões, regras | não |
| **Estrategista** | Monta a pauta priorizada a partir da Biblioteca e dos nossos números | não |
| **Modelagem** | Estrutura do viral + **tudo nosso** (história, personagem, voz, desenhos, música) | não |
| Roteiro → Arte → Montagem | Produção | não |
| **Revisão de Potencial** | Nota 0 a 100 com motivos, cruzando com virais do nicho; checa originalidade (nada copiado) | não (reprova e devolve) |
| **Sala do Dono** | Aprovações, conforme o nível de autonomia | **sim** |
| Publicação | YouTube, Shorts, TikTok, Instagram, página do Facebook | só se o nível pedir |
| Amazon | Livro de colorir com os mesmos desenhos (KDP) | sim, antes de enviar |
| **Caixa** | Gasto do dia, teto, aprovação de teto extra, ROI | sim, quando bate o teto |

**Modelar ≠ copiar** (decisão do Patrik, 15/11): o dono alimenta a Biblioteca com vídeos virais que
achou; a esteira pega a ESTRUTURA e remonta com conteúdo 100% nosso. O que o YouTube pune é conteúdo
de IA genérico/em massa e reaproveitado (política "conteúdo inautêntico", jul/2025). Nunca usar a
função de "100 variações" do Hypit.

---

## 3. Regras do Radar (proposta, tudo configurável por canal)

### 3.1 Filtros de entrada
- Idioma e país do nicho; janela: vídeos publicados nos últimos 7 dias (configurável).
- Formato: longo, Short ou ambos.

### 3.2 Sinais medidos (cada um vira pontos)
| Sinal | Como mede | Exemplo de corte | Confiável? |
|---|---|---|---|
| **Velocidade** | views ganhas entre duas leituras (o Radar guarda fotos de hora em hora) | ≥ 100 mil em 24 h | sim (medido) |
| **Fora da curva** | views ÷ mediana do próprio canal (mín. 4 vídeos) | ≥ 3x | sim (medido) |
| **Canal novo** | data de criação do canal | ≤ 30 dias | sim (dado público) |
| **Poucos vídeos** | total de vídeos do canal | ≤ 5 a 10 | sim |
| **Alcance fora da base** | views do vídeo ÷ inscritos | ≥ 10x | sim |
| **Feito com IA** | nota de 0 a 100 somando: (1) selo do YouTube "conteúdo alterado ou sintético" quando o criador declarou (o sinal mais forte, mas desenho animado não é obrigado a declarar); (2) ritmo de postagem (muitos vídeos por dia); (3) canal novo com volume alto; (4) títulos e descrições com cara de modelo repetido; (5) quadros do vídeo passados por um detector de imagem de IA e pela leitura do Gemini | ≥ 70 = "provável IA" | **estimado**, sempre marcado como estimado |
| **Monetizado** | o YouTube **tirou** do código da página o campo `is_monetization_enabled` em 17/11/2023. Hoje as ferramentas estimam por 3 sinais: botão "Seja membro" no canal, ≥ 1.000 inscritos e anúncios em 3 vídeos com mais de 4 min (a extensão que faz isso diz ~90% de acerto; não verificado). Da nuvem só dá para checar os 2 primeiros; o 3º precisa de navegador | 3 de 3 = "provavelmente monetizado" | **estimado** |

Ferramentas de referência (ideias, não instalar: todas com 0 a 31 ★): extensão
`is-youtube-channel-monetized-extension` (método dos 3 sinais), `AI-Slop-Detector-Browser-Extension`
(sinais de metadados para IA no YouTube), `ai-slop-detector` (detector local de imagem de IA). A
lógica entra no Radar como código nosso.
| Para crianças | marcação "made for kids" do vídeo (conferir se a API devolve) | — | a confirmar |

### 3.3 Níveis de alerta
| Nível | Regra (exemplo) | O que acontece |
|---|---|---|
| 🔴 **ALERTA VIRAL (fura a fila)** | canal com ≤ 5 vídeos **e** vídeo ≥ 1 milhão de views **e** ≥ 1.000 inscritos ("provavelmente monetizado" = etiqueta e pontos extras, **não** exigência, porque o 3º sinal não dá para checar do servidor) | vai direto para Análise, aviso imediato ao dono, entra no topo da pauta |
| 🟠 Oportunidade forte | ≥ 3x a mediana **e** ≥ 100 mil em 24 h | entra na Análise no próximo ciclo |
| 🟡 Observar | só um sinal forte | fica na lista; reavalia em 24 h |

### 3.4 Fonte dos dados
- **YouTube Data API** com chave da conta Google NOVA do projeto (cota grátis diária; pelo que sei
  ~10 mil unidades/dia, busca = 100 unidades; **confirmar**).
- Assistir: Gemini pelo link (o YouTube bloqueia download vindo de servidor de nuvem). Guardamos só a
  estrutura, nunca o arquivo do vídeo.

---

## 4. Reunião com o dono

- O dono **marca a próxima reunião ao fim de cada reunião** (dia e hora livres).
- Não marcou = não tem reunião no dia seguinte.
- **Obrigatória 1 por semana.** Se passar 7 dias sem reunião: a esteira continua produzindo, mas
  **segura publicação e qualquer gasto acima do teto base** até a reunião acontecer.
- Aviso antes da reunião e alertas 🔴: notificação no celular pelo próprio escritório (instalado como
  app na tela inicial) e aviso dentro do escritório. Sem aplicativo de mensagens.

### Pauta da reunião (por ordem de importância)
1. Aprovações pendentes (nota de potencial, motivo, viral de origem lado a lado).
2. O que vai ao ar nas próximas 24 h.
3. Números dos vídeos novos: views 24 h/48 h contra a nossa média, retenção nos 30 s, clique na
   thumb. Cada número com a base dita e uma frase explicando o que mudou.
4. Alertas (erro, conta desconectada, risco de direito autoral/originalidade, gasto).
5. Radar: alertas 🔴 e top 5 🟠, com botão "modelar isso?".
6. Caixa: gasto do período contra o teto e ROI.
7. Plano até a próxima reunião + **marcar a próxima**.

---

## 5. Horário, teto de gasto e ROI

- **Horário de trabalho** por canal (ex.: 08h às 22h). Fora dele, nada roda.
- **Teto diário** (ex.: US$ 5). Painel "Gasto do dia" por sala e por fornecedor, atualizado a cada etapa.
- **Bateu o teto:** a esteira pausa e aparece o cartão
  `Teto atingido: US$ 5,00 gastos hoje · [Aprovar + US$ 2] [+ US$ 5] [+ US$ 10] [+ US$ ____]`.
  O extra vale **só para o dia**, fica registrado (quem, quando, quanto).
- **ROI semanal:** gasto contra receita (AdSense, Amazon, outras) e, antes de monetizar, indicadores
  (views, inscritos, custo por mil views). Se 2 semanas seguidas forem boas, o sistema **sugere**
  subir o teto; **nunca sobe sozinho**.

---

## 5b. Ordem de prioridade das regras (a de cima sempre vence)
1. Trava de segurança e direitos autorais
2. Teto de gasto (com reserva antes de cada tarefa)
3. Regra dos 7 dias sem reunião
4. Nível de autonomia

## 6. Autonomia que cresce

| Nível | Trava no dono |
|---|---|
| 1 (início) | roteiro, vídeo final, thumb, publicação |
| 2 (~10 aprovados sem ajuste) | vídeo final e publicação |
| 3 (histórico bom) | só vídeos longos e mudança de estratégia; Shorts saem sozinhos |
| Sempre | teto extra, mudança de nicho/formato, alerta de direitos |

---

## 7. Começando do zero: ordem de preenchimento (Recepção)

1. **Regras do dono:** orçamento mensal, teto diário, horário de trabalho, idioma/país, de onde vem o
   dinheiro, o que nunca fazer, dia da 1ª reunião.
2. **Descoberta de nicho:** Radar em modo exploração compara nichos (demanda, concorrência, frequência
   de virais, quanto paga por view, dá para fazer com IA, receitas extras, risco de regra) → top 3 →
   dono escolhe. Atenção: conteúdo infantil paga menos por view (sem anúncio personalizado).
3. **Formato e 5 a 10 canais de referência.**
4. **Identidade:** nome (livre no YouTube, Instagram e domínio), personagem (3 opções), voz, cores,
   regras de "nunca fazer".
5. **Padrões:** duração, frequência, nível de autonomia.
6. **Contas do canal:** o dono cria o canal e as redes na conta Google nova.
7. **Esteira liga.**

No SaaS, estes 7 passos são o cadastro de cada cliente.

---

## 8. Ordem de construção

Etapa 1 contas do dono → Etapa 2 ambiente separado → Etapa 3 base do repositório → Etapa 4 Recepção
→ Etapa 5 Radar + Biblioteca v0 com tela da reunião → 1º vídeo "na mão" → esteira completa com travas
→ escritório visual → rotina diária e autonomia → Amazon e redes → SaaS.

Escritório visual vem **depois** do motor (fazer a cara antes é desenhar salas vazias). O desenho dos
dados nasce multi-cliente desde o início.

Detalhe de contas, custos e conexões: `CONTAS_E_CUSTOS.md`. Dados da pesquisa: `PESQUISA_2026-11.md`.

---

## 9. Para virar SaaS (pontos que mudam a arquitetura)

- **Hypit:** licença Apache modificada **proíbe** oferecer como serviço a terceiros (multi-tenant) sem
  licença comercial. No SaaS: motor de modelagem próprio ou licença paga. Uso interno é permitido.
- **Cérebro:** no SaaS roda na **API da Anthropic** (cobrança por uso), não na assinatura pessoal.
- **Geradores:** por API direta com camada que troca de fornecedor (Gravyx é conta pessoal; Dreamina
  sem API oficial confirmada; Pollo tem API).
- **YouTube API:** pelo que sei, app não verificado sobe vídeo travado como privado até auditoria do
  Google, e há limite diário de cota. **Confirmar.**
- **Habblaud** (visual de referência): MIT, pode usar com crédito; visual final deve ser marca própria.
- Multi-cliente, cobrança, cadastro guiado, termos, LGPD; não coletar dado de criança.

### Diferenciais
1. Trabalha sozinho e trava só no dono, visível num escritório.
2. Diretor de Canal: monta o canal do zero e propõe mudança de rumo com números.
3. Modelagem com selo de originalidade.
4. Revisão de Potencial que aprende com os resultados do próprio canal (dados próprios).
5. Uma criação, várias receitas (vídeo, Shorts, posts, livro).
6. Feito para o Brasil, com custo à vista e teto de gasto.

---

## 10. Pendências do dono (15/11)

- [x] Nome do projeto: **Nexo Studio** (16/11/2026).
- [ ] Contas da Etapa 1 (ver `CONTAS_E_CUSTOS.md`).
- [ ] Teto diário inicial e horário de trabalho.
- [ ] Link do "Color Koala" (não encontrado em nenhuma busca).
- [ ] Chave do Gemini da conta Google nova.
