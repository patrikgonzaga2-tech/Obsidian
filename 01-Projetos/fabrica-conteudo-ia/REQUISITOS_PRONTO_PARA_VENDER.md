# Fábrica de Conteúdo IA · Requisitos de "pronto para vender"

> Checklist de qualidade do produto (15/11/2026). **Nada disso está construído ainda.** Cada item diz
> como o projeto resolve e em que fase entra (fases F1 a F9 do PASSO_A_PASSO_DO_ZERO).
> Regra: **o SaaS só é vendido quando todos os itens estiverem ✅ testados.**
> Legenda de status: 📐 desenhado no dossiê · 🆕 entrou agora no plano · ❓ falta confirmar regra.

## 1. O que exatamente o sistema faz

| Pergunta | Como fica | Fase | Status |
|---|---|---|---|
| O usuário entende quais etapas são automáticas? | O escritório mostra cada sala; cada sala tem um selo "🤖 automática" ou "🧑 precisa de você" e uma frase do que faz | F6 | 📐 |
| Consegue criar, revisar e ajustar antes de publicar? | Sala do Dono: ver o vídeo, editar roteiro/título/descrição/thumb, pedir ajuste com comentário (volta para a sala certa) | F3/F4 | 📐 |
| Está claro o que a IA faz sozinha e o que depende de aprovação? | Nível de autonomia (1, 2, 3) visível no topo; cada item mostra "esperando você" ou "seguindo sozinho" | F4/F7 | 📐 |
| Se roteiro, voz, imagem ou vídeo falhar, o usuário sabe? | O item fica vermelho na sala onde falhou, com mensagem simples (seção 4) e botão "tentar de novo" | F4 | 🆕 |
| O projeto pode ser salvo e retomado? | Tudo é gravado no banco a cada etapa (o item sabe em que sala está); fechar o navegador não perde nada | F1 | 📐 |

## 2. Qualidade do conteúdo

| Pergunta | Como fica | Fase | Status |
|---|---|---|---|
| Roteiro coerente, correto e adequado ao público? | Revisão de Potencial + checagem de público (ex.: infantil: vocabulário, nada assustador, nada de marca/produto) + checagem de fatos quando houver | F4 | 📐 |
| Narração no idioma, tom e pronúncia certos? | Voz escolhida na Recepção; dicionário de pronúncia do canal (palavras difíceis); amostra de 10 s aprovada antes do vídeo inteiro nas primeiras vezes | F3 | 🆕 |
| Imagens, cenas, legendas e áudio sincronizados? | Montagem guiada pelo tempo da narração (palavra a palavra); a Revisão confere duração, cortes, áudio e legenda | F3/F4 | 🆕 |
| Editar título, descrição, thumbnail e outros? | Tudo editável na Sala do Dono antes de publicar; 2 ou 3 opções de thumb para escolher | F3 | 📐 |
| Revisão humana antes de publicar no início? | Nível 1 trava roteiro, vídeo, thumb e publicação; só sobe de nível com histórico bom | F7 | 📐 |

## 3. Publicação no YouTube

| Pergunta | Como fica | Fase | Status |
|---|---|---|---|
| Conecta a própria conta com autorização clara e segura? | Login oficial do Google (OAuth), pedindo só a permissão de publicar e ler dados do canal; dá para desconectar a qualquer hora | F4 (nosso canal) / F9 (clientes) | 🆕 |
| Mostra em qual canal vai publicar? | Antes de publicar: foto, nome e @ do canal de destino em destaque | F4 | 🆕 |
| Publicar, agendar ou rascunho? | 3 botões: Publicar agora · Agendar (data e hora) · Enviar como privado/rascunho | F4 | 🆕 |
| Confirma e mostra o link? | Só marca "publicado" depois que o YouTube devolve o ID; mostra o link e manda notificação no celular | F4 | 🆕 |
| Se falhar, informa o motivo e evita duplicata? | Cada item tem uma "chave única"; antes de tentar de novo, o sistema confere no canal se o vídeo já subiu; mensagem com o motivo em português | F4 | 🆕 |
| Regras atuais do YouTube conferidas? | Confirmado em fonte oficial: conteúdo inautêntico (jul/2025), conteúdo para crianças, conteúdo reutilizado. **A confirmar:** auditoria da API para apps (upload privado até aprovar), cota diária, campo de declaração de conteúdo sintético na API, requisitos novos do YPP (2027) | antes de F4 | ❓ |

## 4. Se algo der errado

| Pergunta | Como fica | Fase | Status |
|---|---|---|---|
| Salva o progresso automaticamente? | Sim, a cada etapa (ponto de retomada) | F1 | 📐 |
| Mensagens de erro claras? | Catálogo de erros em português simples: o que aconteceu, se perdeu algo, o que fazer (ex.: "A geração da imagem falhou no fornecedor. Nada foi cobrado. Tentaremos de novo em 10 min.") | F4 | 🆕 |
| Falha num serviço de IA trava tudo? | Não: só aquele item para naquela sala; o resto segue; retomada do ponto onde parou; fornecedor reserva quando houver | F4 | 🆕 |
| Limites contra clique repetido, cobrança e publicação duplicadas? | Botões travam depois do 1º clique; cada geração e publicação tem chave única; teto diário de gasto | F2/F4 | 📐/🆕 |
| Testes de conexão lenta, queda, arquivo inválido e limite de uso? | Roteiro de testes antes do beta (seção 6) | F9 | 🆕 |

## 5. Segurança, privacidade e custos

| Pergunta | Como fica | Fase | Status |
|---|---|---|---|
| Contas e chaves protegidas? | Chaves fora do código (cofre/segredos); autorizações do Google guardadas criptografadas no banco; senhas nunca passam pelo sistema | F1/F9 | 📐 |
| Usuário sabe o que é guardado, por quanto tempo e como excluir? | Página de privacidade (LGPD) + botão "excluir minha conta e meus dados"; prazos definidos | F9 | 🆕 |
| Limites de uso e aviso antes de gastar créditos? | Teto diário, custo mostrado antes de gerações caras, aviso ao chegar perto do teto | F2 | 📐 |
| Uma pessoa não acessa projeto de outra? | Banco com regra de acesso por conta (cada linha pertence a uma conta; o banco bloqueia o resto) desde o 1º dia | F1 | 📐 |
| Quem responde por músicas, imagens, vozes e materiais enviados? | Termos de uso: o usuário responde pelo que envia; o sistema só usa músicas de biblioteca licenciada e gera o resto; checagem de originalidade na Revisão. Revisar com advogado antes de vender | F9 | 🆕 |

## 6. Teste antes de vender

| Pergunta | Como fica | Fase | Status |
|---|---|---|---|
| Quem nunca viu cria e publica sem ajuda? | Teste com 5 a 10 pessoas de fora, gravando a tela; meta: 8 de 10 publicam sozinhas | F9 | 🆕 |
| Testado em computadores e celulares diferentes? | Matriz de testes: Chrome, Safari, Android, iPhone, telas pequenas | F9 | 🆕 |
| Forma de receber relatos de erro? | Botão "relatar problema" em toda tela + registro automático de erros com painel de recorrentes | F9 | 🆕 |
| Canal de suporte e explicação dos erros comuns? | Central de ajuda com os erros do catálogo + canal de suporte (e-mail ou chat) | F9 | 🆕 |
| Funciona com mais usuários que o grupo de teste? | Teste de carga (simular dezenas de contas ao mesmo tempo) e filas por conta para um cliente não travar o outro | F9 | 🆕 |

## Ordem prática
1. **F1 a F8 no nosso próprio canal** = o melhor teste: tudo que quebrar, quebra conosco primeiro.
2. **Beta fechado** com 5 a 10 pessoas de fora (itens da seção 6).
3. **Só então vender.**
