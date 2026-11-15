# Fábrica de Conteúdo IA (nome provisório) · Dossiê do projeto

> **Projeto SEPARADO** da Laura Rosa / Corpo Feliz e da agência PTK. Esta pasta é só um depósito
> temporário: quando o repositório próprio existir, tudo aqui vai para lá (`docs/`) e no Obsidian
> fica só uma nota de ponteiro. Nada de contas, dados, textos ou infraestrutura da Laura/PTK aqui.

Atualizado em 15/11/2026. Origem: conversa de 14 e 15/11 com o Patrik.

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
| **Feito com IA** | declaração de conteúdo sintético (se a API expuser) + leitura visual do Gemini | — | **estimado**, marcar como estimado |
| **Monetizado** | **não é dado público.** Só "provavelmente elegível" (inscritos e horas/views acima do mínimo) | — | **estimado** |
| Para crianças | marcação "made for kids" do vídeo (conferir se a API devolve) | — | a confirmar |

### 3.3 Níveis de alerta
| Nível | Regra (exemplo) | O que acontece |
|---|---|---|
| 🔴 **ALERTA VIRAL (fura a fila)** | canal com ≤ 5 vídeos **e** vídeo ≥ 1 milhão de views **e** ≥ 1.000 inscritos **e** provavelmente elegível à monetização | vai direto para Análise, aviso imediato ao dono, entra no topo da pauta |
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
- Aviso antes da reunião por canal PRÓPRIO do projeto (ex.: bot do Telegram ou e-mail da conta nova).
  **Não usar o WhatsApp/Metrifiquei da PTK.**

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

- [ ] Nome provisório do projeto.
- [ ] Contas da Etapa 1 (ver `CONTAS_E_CUSTOS.md`).
- [ ] Teto diário inicial e horário de trabalho.
- [ ] Link do "Color Koala" (não encontrado em nenhuma busca).
- [ ] Chave do Gemini da conta Google nova.
