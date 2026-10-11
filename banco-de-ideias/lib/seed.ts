// Ideias iniciais: usadas só quando o banco ainda está vazio.
// Baseadas nos projetos, painéis e rotinas que já existem (repositórios, docs e rotinas do Claude).
import type { Comando, Ideia, Preparo, Tarefa } from './tipos'

const agora = new Date().toISOString()
const t = (texto: string, feito = false): Tarefa => ({
  id: Math.random().toString(36).slice(2, 10),
  texto,
  feito,
})
// id estável a partir do texto (atualizações não duplicam e preservam o "Resolvido")
const prep = (texto: string, como?: string, link?: string): Preparo => ({
  id: 'p-' + texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
  texto,
  ...(como ? { como } : {}),
  ...(link ? { link } : {}),
  feito: false,
})
const c = (titulo: string, onde: string, texto: string, dica?: string): Comando => ({ titulo, onde, texto, ...(dica ? { dica } : {}) })

type Semente = Omit<Ideia, 'criado_em' | 'atualizado_em' | 'origem_ref'> & { origem_ref?: string | null }

const PAINEL_ANUNCIOS = 'https://claude.ai/artifact/FkDqzBBekcELvdVp4EWgEN'
const PAINEL_LEADS = 'https://claude.ai/artifact/8Ys79EhBMSiRkDqm3n6QbG'
const REVISAO_QUIZ = 'https://claude.ai/artifact/1CpgLoG6JcvucRM21TPfiQ'
const QUIZ = 'https://www.laurarosapersonal.com/efeito-lipo-quiz'
const BANCO_IDEIAS = 'https://claude.ai/artifact/TZyEtoYKaRR9qPUe3NWU4U'
const CC_LR = 'Claude Code · LR_LauraRosaPersonal'
const CC = 'Claude Code · qualquer sessão'

const SEMENTES: Semente[] = [
  // ---------------- agentes e painéis no ar ----------------
  {
    id: 'seed-gestor-trafego',
    titulo: 'Gestor de tráfego (Painel de anúncios)',
    categoria: 'Vendas / Marketing',
    status: 'no_ar',
    fase: 'fim',
    progresso: 100,
    prioridade: 'alta',
    resumo: 'Painel do Meta ao vivo + rotina das 7h que analisa, propõe e só executa o que você aprovar.',
    resumo_detalhado:
      'Conta de anúncios 1094091162588572 cruzada com o quiz e as vendas da oferta QN7gci. Todo dia às 7h a rotina "Painel de anúncios — análise diária e pedidos" grava a análise do dia, analisa cada criativo, o funil do quiz, quem clicou e não comprou e a meta do painel, e cria propostas. Régua: custo por venda até R$ 37, 32% passando da T1, 18,7% clicando em comprar. Nada muda no Meta sem proposta aprovada.',
    como_usar:
      'Abra o painel de manhã: leia a Análise do dia e aprove ou recuse as propostas. Para pedir algo, escreva no chat do painel (assunto Campanha, Criativo novo ou Quiz); a rotina responde às 7h. Para não esperar, peça numa sessão do Claude Code para disparar a rotina com o PEDIDO certo (comandos abaixo). Você recebe o resumo no celular e no e-mail.',
    links: [
      { rotulo: 'Abrir o painel de anúncios', url: PAINEL_ANUNCIOS },
      { rotulo: 'Quiz no ar', url: QUIZ },
    ],
    comandos: [
      c('Status das campanhas de hoje', CC_LR, 'status das campanhas de hoje', 'Só leitura: Meta + quiz + vendas numa tabela por campanha, conjunto e anúncio, fechando com o que está bom, o que está ruim e a ação sugerida.'),
      c('Executar o que eu aprovei agora', CC, 'Dispare a rotina "Painel de anúncios" com o texto: PEDIDO: executar', 'Sobe no Meta só as propostas com status aprovado. Sem isso, elas sobem às 7h.'),
      c('Responder o chat do painel agora', CC, 'Dispare a rotina "Painel de anúncios" com o texto: PEDIDO: chat'),
      c('Refazer a análise do dia', CC, 'Dispare a rotina "Painel de anúncios" com o texto: PEDIDO: analise'),
      c('Buscar referências e roteiros', CC, 'Dispare a rotina "Painel de anúncios" com o texto: PEDIDO: referencias', 'Melhores posts do Instagram, anúncios do mercado, peças novas e roteiros para a Laura gravar. Já roda sozinho toda segunda.'),
      c('Testar as conexões da rotina', CC, 'Dispare a rotina "Painel de anúncios" com o texto: PEDIDO: teste', 'Confere Meta, Supabase e o acesso ao painel sem mudar nada.'),
      c('Pedir uma otimização', 'Chat do painel · assunto Campanha', 'Tem otimização nesta campanha? Analise ontem, 7, 15, 30 e 90 dias com o funil do quiz.', 'Também dá pela aba Otimizar, direto na campanha ou no conjunto.'),
      c('Criativo novo', 'Chat do painel · assunto Criativo novo', 'Crie 2 criativos (feed 4:5 e stories 9:16) para o conjunto <nome>. Ângulo: <ideia>. Só fotos da Laura.', 'Volta como proposta com as imagens prontas. Sem antes e depois, corpo em foco, remédio ou promessa de quilos.'),
      c('Subir campanha no padrão', CC_LR, 'Suba uma campanha no padrão da seção 3.2 de docs/ANALISE_CAMPANHAS_QUIZ.md com os criativos aprovados <letras>, R$ 20/dia por conjunto.', 'ABO, pixel da LP, evento Compra Realizada, sem Audience Network. Depois ligue o complemento do WhatsApp 0948 no Gerenciador.'),
    ],
    passos_uso: ["Toda manhã, depois das 7h, chega no celular e no e-mail o resumo do dia: gasto, sessões no quiz, vendas e custo por venda.", "Abra o painel de anúncios e leia a \"Análise do dia\": o que melhorou, o que piorou e o que fazer.", "Nas propostas, aprove, peça ajuste (escrevendo uma nota) ou recuse cada uma. Aprovado = pode subir no Meta.", "Veja a aba Criativos: o que pausar, trocar, ajustar ou escalar, com os números de cada anúncio.", "Para pedir algo novo, escreva no chat do painel no assunto certo: Campanha, Criativo novo ou Quiz.", "Quer que aconteça agora e não só às 7h? Copie um comando abaixo e mande numa sessão do Claude Code.", "Toda segunda, atualize os \"outros custos\" (menu ☰ → Meta do painel → Atualizar custos) para o lucro sair certo.", "Depois que um anúncio novo subir, ligue o complemento do WhatsApp 0948 no Gerenciador de Anúncios."],
    objetivo_conversa: "Revisar e ajustar o gestor de tráfego para a nossa base: conectores e rotina das 7h, régua (custo por venda até R$ 37, 32% passando da T1, 18,7% clicando em comprar), padrão de campanha, abas do painel e propostas pendentes, até a rotina fazer exatamente o que eu preciso.",
    onde_conversa: 'code',
    preparos: [
      prep("Conectores ligados no claude.ai: Meta Ads, Supabase, Google Drive, Gmail, UMCLIQUE e Metricool", "claude.ai → Configurações → Conectores. Cada um precisa aparecer como conectado; se algum pedir login de novo, refaça.", "https://claude.ai/settings/connectors"),
      prep("Abrir o painel de anúncios uma vez e liberar o que ele pedir", "Se aparecer o pedido para usar o Claude ou os conectores, clique em Permitir. Confira se os números do Meta carregam.", "https://claude.ai/artifact/FkDqzBBekcELvdVp4EWgEN"),
      prep("Na sessão nova do Claude Code: repositório LR_LauraRosaPersonal e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_LauraRosaPersonal e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Painel com Meta ao vivo, análise, propostas e chat', true),
      t('Rotina diária às 7h com conectores ligados', true),
      t('Atualizar os outros custos na Meta do painel (lembrete toda segunda)'),
      t('Aprovar ou recusar as propostas pendentes'),
      t('Ligar o complemento do WhatsApp 0948 nos anúncios novos'),
    ],
    url_produto: PAINEL_ANUNCIOS,
    repo: 'patrikgonzaga2-tech/LR_LauraRosaPersonal',
    origem: 'manual',
  },
  {
    id: 'seed-painel-leads',
    titulo: 'Painel de Leads (comercial)',
    categoria: 'Vendas / Marketing',
    status: 'no_ar',
    fase: 'fim',
    progresso: 100,
    prioridade: 'alta',
    resumo: 'CRM lido às 11:59 e 23:59, relatório no grupo Vendas Aline às 8h e planilha que se atualiza sozinha.',
    resumo_detalhado:
      'Leads do Instagram chegam ao CRM UMCLIQUE e a Aline atende no WhatsApp. A rotina "Painel de Leads 11:59 e 23:59" classifica as conversas (só leitura no CRM), grava no Supabase do CRM e republica o painel. Às 8h, a rotina "Relatório no grupo Vendas Aline 8h" manda uma mensagem com o dia anterior e o total do mês, sem nomes nem telefones.',
    como_usar:
      'Abra o Painel de Leads para ver os leads do dia e em andamento. O relatório chega sozinho no grupo Vendas Aline às 8h. Para atualizar fora do horário, peça numa sessão do Claude Code para disparar a rotina.',
    links: [
      { rotulo: 'Abrir o Painel de Leads', url: PAINEL_LEADS },
      { rotulo: 'Planilha automática', url: 'https://docs.google.com/spreadsheets/d/1OSPiYkXZGpnac7CPlX3-r_agwZX2Otomq8n1PBxjJd8/edit' },
      { rotulo: 'Planilha da Aline', url: 'https://docs.google.com/spreadsheets/d/11eG71MZo0lms74PwOfrbEVN-FGyPk8Di1g8Y6pI6JhY/edit' },
    ],
    comandos: [
      c('Atualizar o painel agora', CC, 'Dispare a rotina "Painel de Leads 11:59 e 23:59" agora.'),
      c('Reenviar o relatório das 8h', CC, 'Dispare a rotina "Relatório no grupo Vendas Aline 8h" agora.', 'Manda uma mensagem de verdade no grupo. Use só se o envio das 8h falhou.'),
      c('O que está pendente no comercial', CC_LR, 'Leia docs/CONTEXTO_COMERCIAL.md e me diga em 5 linhas o que está pendente no comercial.'),
    ],
    passos_uso: ["Abra o Painel de Leads para ver os leads do dia e os que ainda estão em andamento. Ele atualiza sozinho às 11:59 e às 23:59.", "Às 8h, confira no grupo \"Vendas Aline\" a mensagem com o dia anterior e o total do mês.", "Peça para a Aline manter a aba VENDAS do mês da planilha dela em dia: o relatório confere com ela.", "Use a planilha automática para ver o histórico e filtrar por dia ou etapa.", "Se o relatório das 8h não chegar, use o comando \"Reenviar o relatório das 8h\".", "As rotinas só leem o CRM: nada é movido nem enviado para clientes sem você."],
    objetivo_conversa: "Revisar e ajustar o comercial: rotinas das 11:59, 23:59 e 8h, Painel de Leads, planilha automática e o relatório do grupo Vendas Aline, e resolver as pendências (planilha da Aline, Instagram no UMCLIQUE, webhooks da Greenn).",
    onde_conversa: 'code',
    preparos: [
      prep("Conectores ligados no claude.ai: UMCLIQUE, Supabase e Google Drive", "claude.ai → Configurações → Conectores. Cada um precisa aparecer como conectado; se algum pedir login de novo, refaça.", "https://claude.ai/settings/connectors"),
      prep("Reconectar o Instagram no UMCLIQUE", "No painel do UMCLIQUE: Canais → Instagram → Reconectar. Sem isso os leads do Instagram não chegam ao CRM."),
      prep("Na sessão nova do Claude Code: repositório LR_LauraRosaPersonal e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_LauraRosaPersonal e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Rotinas 11:59, 23:59 e 8h funcionando', true),
      t('Preencher a aba VENDAS OUTUBRO 2026 da planilha da Aline (01 a 06/10)'),
      t('Exportar as vendas de outubro da Greenn'),
      t('Reconectar o Instagram no UMCLIQUE'),
      t('Testar os webhooks da Greenn que faltam (Semestral, Efeito Lipo 21D, Vitalício, Pix Simbólico)'),
    ],
    url_produto: PAINEL_LEADS,
    repo: 'patrikgonzaga2-tech/LR_LauraRosaPersonal',
    origem: 'manual',
  },
  {
    id: 'seed-quiz',
    titulo: 'Quiz De Volta ao Eixo (Efeito Lipo)',
    categoria: 'Vendas / Marketing',
    status: 'no_ar',
    fase: 'fim',
    progresso: 90,
    prioridade: 'alta',
    resumo: 'Quiz no ar recebendo o tráfego do Meta. Maior perda: antes da 2ª tela (8% passam, régua 32%).',
    resumo_detalhado:
      'T1 com a promessa "Volta ao Eixo", T26 com a oferta Efeito Lipo (checkout Greenn, oferta QN7gci). Hipóteses em teste: a T1 não conversa com o criativo, o botão "Garantir minha vaga" soa como venda e o resultado fala de quilos enquanto a T1 fala de recomeço. Mudanças de oferta e checkout passam sempre pela sua revisão.',
    como_usar:
      'Para mudar um texto: abra a página de revisão, escolha a tela, edite no campo, clique em Salvar pedidos e depois peça "aplica a fila do quiz" no Claude Code. As propostas do gestor de tráfego sobre o quiz chegam com prints de antes e depois.',
    links: [
      { rotulo: 'Quiz no ar', url: QUIZ },
      { rotulo: 'Página de revisão do quiz', url: REVISAO_QUIZ },
    ],
    comandos: [
      c('Aplicar os textos que eu editei', CC_LR, 'aplica a fila do quiz', 'Aplica os pedidos salvos na página de revisão.'),
      c('Retomar o trabalho no quiz', CC_LR, 'Vamos continuar o trabalho no quiz. Siga a seção 1 do docs/QUIZ_REVISAO.md e não altere nada ainda.'),
      c('Diagnóstico do funil', CC_LR, 'Em que tela as pessoas param no quiz desde 08/10, por anúncio e por conjunto? Compare com a régua (T1 32%, comprar 18,7%) e diga o que ajustar primeiro.'),
    ],
    passos_uso: ["Veja o quiz como a cliente vê pelo link \"Quiz no ar\".", "Para mudar um texto: abra a \"Página de revisão do quiz\", escolha a tela, edite o campo (fica laranja) e clique em Salvar pedidos.", "Numa sessão do Claude Code no repositório LR_LauraRosaPersonal, mande \"aplica a fila do quiz\".", "O Claude prepara a mudança e abre um pull request; você confere a prévia e só depois vai ao ar.", "Para mudar foto, layout, ordem das telas ou lógica, descreva no Claude Code dizendo a tela (T1 a T26).", "Oferta, preço, parcelamento e checkout: sempre com antes/depois e a sua aprovação.", "Acompanhe no painel de anúncios a aba \"Sugestão quiz\": onde as pessoas param e o que mudar."],
    objetivo_conversa: "Revisar o quiz De Volta ao Eixo tela a tela e ajustar promessa, perguntas e oferta para vender mais, usando os números do painel de anúncios. Oferta e checkout só com antes/depois e minha aprovação.",
    onde_conversa: 'code',
    preparos: [
      prep("Salvar na página de revisão os textos que você já quer mudar", "Escolha a tela, edite o texto (fica laranja) e clique em Salvar pedidos. Se ainda não tem nenhum, marque como resolvido.", "https://claude.ai/artifact/1CpgLoG6JcvucRM21TPfiQ"),
      prep("Conectores ligados no claude.ai: Supabase (para ler o funil do quiz)", "claude.ai → Configurações → Conectores. Cada um precisa aparecer como conectado; se algum pedir login de novo, refaça.", "https://claude.ai/settings/connectors"),
      prep("Na sessão nova do Claude Code: repositório LR_LauraRosaPersonal e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_LauraRosaPersonal e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Quiz publicado com a T1 Volta ao Eixo', true),
      t('Página de pós-compra levando ao grupo', true),
      t('Alinhar a promessa do anúncio com a T1'),
      t('Testar um botão da T1 que soe como quiz, não como venda'),
      t('Rotina diária de status das campanhas', true),
    ],
    url_produto: QUIZ,
    repo: 'patrikgonzaga2-tech/LR_LauraRosaPersonal',
    origem: 'manual',
  },
  {
    id: 'seed-7-dias',
    titulo: 'Desafio Volta ao Eixo 7D',
    categoria: 'Curso / Conteúdo',
    status: 'no_ar',
    fase: 'fim',
    progresso: 100,
    prioridade: 'media',
    resumo: 'App de entrega da jornada de 7 dias publicado; progresso salvo no aparelho e planilha ligada.',
    resumo_detalhado:
      'Uma única página pensada para celular, com cadastro, dias guiados, fotos de antes/depois só no aparelho e envio para o Google Planilhas com fila offline.',
    como_usar: "É o app de entrega da jornada para quem comprou. Você não precisa abrir todo dia: acompanhe pela planilha quem começou, em que dia parou e o que comentou.",
    passos_uso: ["Depois da compra, envie o link laurarosapersonal.site para a cliente. No cadastro ela usa o mesmo WhatsApp da compra.", "Ela faz um dia por vez: marca os 3 passos para concluir. Se não conseguir, escreve o motivo e faz a tarefa de recuperação do Kit.", "Acompanhe na planilha \"Volta ao Eixo 7D: Clientes\": cadastros, comentários, motivos de \"não consegui\", dias concluídos e resultado final.", "No Dia 7 ela registra peso e medidas, vê a evolução e recebe o convite para a Comunidade Corpo Feliz.", "Para trocar textos, vídeo aulas, áudios ou o link da oferta, peça no Claude Code no repositório 7diasdevolta.", "Ainda faltam os áudios da Profe Laura, as vídeo aulas e a aula de fotos e medidas (aparecem como \"EM BREVE\")."],
    links: [{"rotulo": "Abrir o desafio", "url": "https://laurarosapersonal.site"}, {"rotulo": "Como ligar a planilha", "url": "https://github.com/patrikgonzaga2-tech/7diasdevolta/blob/HEAD/planilha/COMO-CONFIGURAR.md"}],
    comandos: [
      c("Colocar a vídeo aula de um dia", "Claude Code · 7diasdevolta", "No desafio 7D, coloque o link <url do vídeo> como vídeo aula do Dia <n>."),
      c("Resumo da turma", "Claude Code · qualquer sessão", "Leia a planilha do Volta ao Eixo 7D e me diga quantas começaram, em que dia param e os principais motivos de \"não consegui\"."),
      c("Trocar o link da oferta do Dia 7", "Claude Code · 7diasdevolta", "Troque o link do botão \"Ver minha oferta exclusiva\" por <link>.", "É link de oferta: o Claude mostra antes e depois e espera o seu ok."),
    ],
    objetivo_conversa: "Deixar o Desafio 7D completo: planilha ligada, vídeo aulas e áudios no lugar, textos revisados e o link da oferta do Dia 7 conferido.",
    onde_conversa: 'code',
    preparos: [
      prep("Planilha \"Volta ao Eixo 7D: Clientes\" criada e ligada ao app", "Siga o guia \"Como ligar a planilha\" (uns 10 minutos, uma vez só, com a conta Google da equipe). Se já fez, marque resolvido.", "https://github.com/patrikgonzaga2-tech/7diasdevolta/blob/HEAD/planilha/COMO-CONFIGURAR.md"),
      prep("Links das vídeo aulas e dos áudios em mãos", "YouTube, Drive ou outro link. Se ainda não gravou, marque resolvido: o Claude deixa os campos prontos para depois."),
      prep("Conectores ligados no claude.ai: Google Drive (para ler a planilha)", "claude.ai → Configurações → Conectores. Cada um precisa aparecer como conectado; se algum pedir login de novo, refaça.", "https://claude.ai/settings/connectors"),
      prep("Na sessão nova do Claude Code: repositório 7diasdevolta e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório 7diasdevolta e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Jornada de 7 dias', true),
      t('Envio para a planilha com fila offline', true),
      t('Aba Progresso no menu', true),
    ],
    url_produto: 'https://laurarosapersonal.site',
    repo: 'patrikgonzaga2-tech/7diasdevolta',
    origem: 'manual',
  },
  {
    id: 'seed-team-corpo-feliz',
    titulo: 'Site de candidatura Corpo Feliz',
    categoria: 'Site',
    status: 'no_ar',
    fase: 'fim',
    progresso: 100,
    prioridade: 'baixa',
    resumo: 'Página de candidatura da Comunidade publicada pela Vercel a cada envio na main.',
    resumo_detalhado: 'Site com VSL, depoimentos e formulário de candidatura. Publicação automática pela Vercel.',
    como_usar: "Página de candidatura da Comunidade. A principal (/cf-whats) leva para o WhatsApp, sem preço. Tudo que é enviado na main vai ao ar sozinho pela Vercel.",
    passos_uso: ["Mande o tráfego da Comunidade para teamcorpofeliz.com.br: ele leva para /cf-whats e mantém as UTMs do anúncio.", "Quem se candidata cai no WhatsApp da equipe; acompanhe pelo Painel de Leads.", "Outras versões para testar: /cf-whats/b e /cf-whats/c (com planos e checkout) e /cf-whats/d (a antiga, com vídeo).", "Para mudar texto, imagem ou o número do WhatsApp, peça no Claude Code no repositório LR_TeamCorpoFeliz.", "Antes de publicar, confira no navegador: o build passa mesmo com erro de tipo.", "O manual de operação explica tudo do zero (link abaixo)."],
    links: [{"rotulo": "Abrir o site", "url": "https://teamcorpofeliz.com.br"}, {"rotulo": "Manual de operação", "url": "https://claude.ai/code/artifact/325faca1-d6e4-42ce-9ebe-de225b822722"}],
    comandos: [
      c("Trocar o número do WhatsApp", "Claude Code · LR_TeamCorpoFeliz", "Troque o WhatsApp da página principal (WA_HREF) para <número> e me mostre antes de publicar."),
      c("Mudar um texto", "Claude Code · LR_TeamCorpoFeliz", "Na página /cf-whats, troque \"<texto atual>\" por \"<texto novo>\" e me mostre antes de publicar."),
    ],
    objetivo_conversa: "Revisar a página de candidatura da Comunidade (textos, WhatsApp, imagens e as versões /b, /c e /d) e alinhar com o que o comercial precisa. Planos e checkout só com minha aprovação.",
    onde_conversa: 'code',
    preparos: [
      prep("Ler o manual de operação do site (5 minutos)", "Explica como publicar e o que muda em cada versão da página.", "https://claude.ai/code/artifact/325faca1-d6e4-42ce-9ebe-de225b822722"),
      prep("Na sessão nova do Claude Code: repositório LR_TeamCorpoFeliz e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_TeamCorpoFeliz e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [t('Página publicada', true), t('Depoimentos e logo dentro do projeto', true)],
    url_produto: 'https://teamcorpofeliz.com.br',
    repo: 'patrikgonzaga2-tech/LR_TeamCorpoFeliz',
    origem: 'manual',
  },

  // ---------------- em andamento ----------------
  {
    id: 'seed-estudio-video',
    titulo: 'Estúdio de vídeo da Laura',
    categoria: 'Vídeo',
    status: 'em_andamento',
    fase: 'meio',
    progresso: 50,
    prioridade: 'alta',
    resumo: 'Pipeline de edição 9:16 montado (cortes, legenda, música). Falta automatizar a publicação.',
    resumo_detalhado:
      'Roteiros em estudio-video/roteiros, revisão automática de política do Meta, voz clonada e avatar já funcionando. A montagem final com ffmpeg está estável; o gargalo agora é tirar o passo manual entre aprovação do roteiro e o MP4 final pronto para subir no gerenciador de anúncios.',
    como_usar:
      'No Claude Code, no repositório LR_LauraRosaPersonal, use /video-laura. Ele escreve o roteiro, revisa as regras do Meta, mostra uma prévia grátis e só gasta créditos (voz e avatar) depois do seu "sim". O guia completo está em estudio-video/GUIA.md.',
    comandos: [
      c('Fazer ou refazer um vídeo', CC_LR, '/video-laura criativo-04', 'Troque criativo-04 pelo id do roteiro.'),
      c('Vídeo novo a partir de uma ideia', CC_LR, '/video-laura criativo novo: <ângulo do anúncio, ex.: recomeço na segunda-feira>'),
      c('Só a prévia grátis', CC_LR, 'Monte só a prévia grátis (--simular) do roteiro <id> e me mande.'),
    ],
    passos_uso: ["Abra o Claude Code no repositório LR_LauraRosaPersonal.", "Mande /video-laura com o id do roteiro (ex.: criativo-04) ou \"criativo novo: <ângulo>\".", "O roteirista escreve e o revisor confere as regras do Meta; você recebe a fala completa, os textos na tela e a legenda.", "Veja a prévia grátis (MP4 com a foto parada) e diga se aprova.", "Só com o seu \"sim\" ele gasta créditos de voz (ElevenLabs) e avatar (HeyGen). O custo estimado aparece antes.", "Você recebe o MP4 final 9:16, com legenda e música, pronto para virar proposta de criativo no gestor de tráfego."],
    objetivo_conversa: "Deixar o estúdio de vídeo da Laura pronto para produzir criativos toda semana: chaves e ambiente, roteiros, prévia grátis e o encadeamento aprovação → voz → avatar → montagem num comando só.",
    onde_conversa: 'code',
    preparos: [
      prep("Contas HeyGen e ElevenLabs criadas e com créditos", "Partes 1 e 2 do GUIA do estúdio (estudio-video/GUIA.md). Só é preciso para gerar voz e avatar; roteiro e prévia grátis funcionam sem."),
      prep("Ambiente \"Estúdio Vídeo Laura\" criado no Claude Code, com as chaves e os sites liberados", "claude.ai/code → ícone de nuvem → Add environment. Sites: api.heygen.com, upload.heygen.com, *.heygen.ai, api.elevenlabs.io. Chaves HEYGEN_API_KEY e ELEVENLABS_API_KEY na configuração do ambiente (nunca no chat). Passo a passo na Parte 3 do GUIA.", "https://claude.ai/code"),
      prep("Autorização de imagem e voz da Laura assinada, fotos e áudio enviados", "Parte 4 do GUIA. O áudio vai como documento, não como áudio de WhatsApp."),
      prep("Na sessão nova do Claude Code: repositório LR_LauraRosaPersonal e ambiente \"Estúdio Vídeo Laura\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_LauraRosaPersonal e confira o ambiente no ícone de nuvem no topo (\"Estúdio Vídeo Laura\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Roteirista + revisor de anúncio funcionando', true),
      t('Montagem 9:16 com legenda e zoom', true),
      t('Prévia grátis (--simular) para aprovação', true),
      t('Encadear aprovação → geração → montagem num só comando'),
      t('Publicar o MP4 final direto no Supabase'),
      t('Testar 3 criativos novos na campanha do quiz'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/LR_LauraRosaPersonal',
    origem: 'manual',
  },
  {
    id: 'seed-agente-corpo-feliz',
    titulo: 'Agente Corpo Feliz (criativos e aulas)',
    categoria: 'Automação / IA',
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 25,
    prioridade: 'media',
    resumo: 'Comandos /criativo, /aula e /publicar definidos; falta rodar o primeiro vídeo ponta a ponta.',
    resumo_detalhado:
      'O agente segue o BRAND.md (promessa segura) e usa o OpenMontage para montar vídeos com acervo gratuito e narração offline. Scripts de publicação no Supabase prontos. Próximo passo é um teste completo com a aula do Dia 1.',
    como_usar:
      'Abra o Claude Code no repositório corpo-feliz-agente e use os comandos abaixo. Ele mostra roteiro e cenas e espera o seu ok antes de renderizar; prefere sempre o caminho gratuito.',
    comandos: [
      c('Criativo de anúncio', 'Claude Code · corpo-feliz-agente', '/criativo <ideia ou ângulo do criativo>'),
      c('Aula de um dia da jornada', 'Claude Code · corpo-feliz-agente', '/aula 1 <tema do dia>'),
      c('Publicar um vídeo pronto', 'Claude Code · corpo-feliz-agente', '/publicar saidas/<arquivo>.mp4 aula "<título>" 1', 'Sobe para o Supabase como rascunho; só vira aprovado quando você mandar.'),
    ],
    passos_uso: ["Abra o Claude Code no repositório corpo-feliz-agente.", "Mande /criativo <ângulo> para um anúncio de 30–45 s, ou /aula <dia> <tema> para a aula da jornada.", "Ele mostra roteiro e cenas e espera o seu ok antes de gerar; prefere acervo e narração gratuitos.", "O vídeo pronto fica em ./saidas/.", "Mande /publicar para subir ao Supabase como rascunho; só vira aprovado quando você disser."],
    objetivo_conversa: "Rodar o primeiro vídeo ponta a ponta do Agente Corpo Feliz (aula do Dia 1) e ajustar o agente para o nosso padrão de marca.",
    onde_conversa: 'code',
    preparos: [
      prep("OpenMontage instalado no seu computador", "Precisa do computador: no terminal, dentro da pasta corpo-feliz-agente, rode bash setup.sh (WSL, Linux ou Mac)."),
      prep("Arquivo .env com SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY preenchido", "Para o /publicar. Pegue em Supabase → Project Settings → API. Nunca cole a chave no chat."),
      prep("Abrir o Claude Code no computador, na pasta corpo-feliz-agente", "No terminal da pasta: claude (ou o app Claude Desktop, aba Code). Na nuvem o OpenMontage não está instalado; aí, cole o prompt nessa sessão."),
    ],
    tarefas: [
      t('BRAND.md com regras de promessa segura', true),
      t('Comandos /criativo, /aula, /publicar', true),
      t('Gerar a vídeo aula do Dia 1'),
      t('Revisar roteiro e cenas antes de gerar'),
      t('Publicar e registrar em videos_gerados'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/corpo-feliz-agente',
    origem: 'manual',
  },
  {
    id: 'seed-banco-ideias',
    titulo: 'Banco de Ideias (este painel)',
    categoria: 'App',
    status: 'em_andamento',
    fase: 'meio',
    progresso: 60,
    prioridade: 'media',
    resumo: 'Painel no ar dentro do Claude, com busca, conversa e ações. Falta trazer as fontes (GitHub e computador).',
    resumo_detalhado:
      'Roda dentro do Claude: as ideias ficam no banco do painel e a IA é a da sua conta (sem chave de API). Também existe a versão Next.js no repositório Obsidian, para rodar fora do Claude com Supabase.',
    como_usar:
      'Use o painel no Claude. Em qualquer sessão do Claude Code dá para pedir mudanças nas ideias: o Claude lê e escreve no banco do painel.',
    links: [{ rotulo: 'Abrir o Banco de Ideias', url: BANCO_IDEIAS }],
    comandos: [
      c('Importar repositórios como ideias', CC, 'Importe meus repositórios do GitHub para o Banco de Ideias.'),
      c('Adicionar uma ideia', CC, 'Adicione ao Banco de Ideias: <a ideia, do seu jeito>.'),
      c('Atualizar onde parei', CC, 'No Banco de Ideias, atualize a ideia "<nome>": <o que eu fiz hoje>.'),
    ],
    passos_uso: ["Abra o painel quando for decidir o que fazer. A busca entende frases como \"quero terminar hoje o de vídeo\" (Enter usa a IA).", "Toque numa ideia: Descrição explica como usar, Visão geral mostra fase, onde parou e o passo a passo, Conversa retoma com a IA.", "Marque as tarefas feitas: o progresso e a fase andam sozinhos.", "Ideia nova: botão Nova ideia e fale pelo ditado do teclado; a IA organiza e cria o card.", "Não quer mais uma ideia? ⋯ → Pausar (stand-by) ou Excluir (vai para a Lixeira e dá para restaurar)."],
    objetivo_conversa: "Organizar o Banco de Ideias como meu centro de comando: importar os repositórios do GitHub, trazer as pastas do computador, revisar cada ideia e o \"Meu trabalho\".",
    onde_conversa: 'code',
    preparos: [
      prep("Decidir quais repositórios do GitHub entram no painel", "São 10. Arquivados e cópias (forks) podem ficar de fora.", "https://github.com/patrikgonzaga2-tech?tab=repositories"),
      prep("Publicar pelo GitHub Desktop as pastas do computador que você quer trazer", "GitHub Desktop → Repository → Push (ou \"Publish repository\", privado). Se ainda não quer trazer, marque resolvido."),
      prep("Na sessão nova do Claude Code: repositório Obsidian e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório Obsidian e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Layout, cards, drawer e prateleira "No ar"', true),
      t('Nova ideia por voz/ditado', true),
      t('Painel dentro do Claude (sem chave de API)', true),
      t('Pausar e Lixeira (excluir com volta)', true),
      t('Aba Descrição com o passo a passo de cada agente', true),
      t('Conversa no Claude com pré-requisitos e controle de tamanho', true),
      t('Meu trabalho e texto para a Personalização do Claude', true),
      t('Comandos de cada agente', true),
      t('Importar os repositórios do GitHub'),
      t('Trazer as pastas do computador (GitHub Desktop)'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/Obsidian',
    origem: 'manual',
  },
  {
    id: 'seed-segundo-cerebro',
    titulo: 'Segundo Cérebro (Obsidian)',
    categoria: 'Automação / IA',
    status: 'em_andamento',
    fase: 'meio',
    progresso: 50,
    prioridade: 'baixa',
    resumo: 'Cofre com memória automática instalado; falta alimentar com as decisões dos projetos ativos.',
    resumo_detalhado:
      'Hooks do Claude Code e o AGENTS.md do Codex gravam projetos, decisões e aprendizados no cofre e trazem as notas certas antes de cada tarefa. Os índices são gerados sozinhos.',
    como_usar:
      'Funciona sozinho: antes de cada tarefa o Claude recebe as notas relacionadas e, no fim, registra o que aprendeu. Use os comandos abaixo para consultar ou registrar algo na mão.',
    comandos: [
      c('Consultar a memória', CC, 'O que o segundo cérebro sabe sobre <assunto>?'),
      c('Registrar uma decisão', CC, 'Registre no segundo cérebro a decisão: <o que foi decidido e por quê>.'),
      c('Refazer os índices', 'Terminal · pasta do cofre', 'node _sistema/brain.mjs reindex'),
    ],
    passos_uso: ["Trabalhe normalmente com o Claude Code ou o Codex: as notas relacionadas entram sozinhas antes de cada tarefa.", "No fim, o Claude registra decisões e aprendizados no cofre.", "Para consultar, pergunte \"O que o segundo cérebro sabe sobre <assunto>?\".", "Para ver as notas, abra a pasta do repositório Obsidian como cofre no app Obsidian."],
    objetivo_conversa: "Alimentar o segundo cérebro com as decisões, padrões e preferências dos projetos ativos e conferir se a memória automática funciona no Claude Code e no Codex.",
    onde_conversa: 'code',
    preparos: [
      prep("Instalar a memória automática no seu computador (uma vez)", "Precisa do computador: no terminal, dentro da pasta do repositório Obsidian, rode node _sistema/install.mjs."),
      prep("Na sessão nova do Claude Code: repositório Obsidian e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório Obsidian e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Estrutura de pastas e templates', true),
      t('brain.mjs com recall/registro', true),
      t('Registrar as decisões dos projetos ativos'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/Obsidian',
    origem: 'manual',
  },

  // ---------------- sugestões do Claude (a partir dos docs e dos números) ----------------
  {
    id: 'seed-recuperar-checkout',
    titulo: 'Recuperar quem clicou e não comprou',
    categoria: 'Vendas / Marketing',
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 0,
    prioridade: 'alta',
    resumo:
      'Sugestão: quem clica em comprar e não paga (Pix sem pagar ou saiu do checkout) é a venda mais barata que existe. Falta transformar a análise do painel em ação.',
    resumo_detalhado:
      'A rotina das 7h já calcula quem clicou e não comprou (aba "Clicou e não comprou" do painel de anúncios) e o motivo provável. O que falta: remarketing para quem iniciou o checkout ou viu o quiz nos últimos 7 a 14 dias e uma sequência de recuperação no WhatsApp pelo UMCLIQUE. Público no Meta, automação e mensagem para cliente só depois da sua aprovação.',
    links: [{ rotulo: 'Aba Clicou e não comprou', url: PAINEL_ANUNCIOS }],
    comandos: [
      c('Pedir o plano de recuperação', 'Chat do painel de anúncios', 'Monte a recuperação de quem clicou e não comprou: remarketing de 7–14 dias e sequência no WhatsApp com os textos.'),
    ],
    como_usar: "Abra a aba \"Clicou e não comprou\" do painel de anúncios, veja o motivo principal e peça o plano pelo chat. Cada ação (público, criativo, mensagem) vem como proposta para você aprovar.",
    passos_uso: ["Abra o painel de anúncios → aba \"Clicou e não comprou\".", "Leia quantos clicaram, quantos deixaram Pix sem pagar e quantos saíram do checkout, e o motivo provável.", "No chat do painel, mande o comando abaixo.", "Aprove as propostas que fizerem sentido: público de remarketing, criativo e mensagens no WhatsApp.", "Confira o resultado 3 dias depois na própria proposta."],
    objetivo_conversa: "Montar a recuperação de quem clicou em comprar e não comprou: remarketing de 7 a 14 dias, 1 criativo que responde o medo principal e a sequência no WhatsApp (UMCLIQUE), tudo como proposta para eu aprovar.",
    onde_conversa: 'code',
    preparos: [
      prep("Conectores ligados no claude.ai: Meta Ads, Supabase e UMCLIQUE", "claude.ai → Configurações → Conectores. Cada um precisa aparecer como conectado; se algum pedir login de novo, refaça.", "https://claude.ai/settings/connectors"),
      prep("Ler a aba \"Clicou e não comprou\" do painel de anúncios", "Veja quantos clicaram, quantos deixaram Pix sem pagar e o motivo provável.", "https://claude.ai/artifact/FkDqzBBekcELvdVp4EWgEN"),
      prep("Na sessão nova do Claude Code: repositório LR_LauraRosaPersonal e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_LauraRosaPersonal e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Ler a aba "Clicou e não comprou" e o motivo principal'),
      t('Aprovar um público de remarketing (iniciou checkout / viu o quiz, 7–14 dias)'),
      t('Aprovar 1 criativo que responde o medo principal'),
      t('Aprovar a sequência de recuperação no WhatsApp (UMCLIQUE)'),
      t('Conferir o resultado depois de 3 dias'),
    ],
    url_produto: null,
    repo: null,
    origem: 'chat',
  },
  {
    id: 'seed-uma-promessa',
    titulo: 'Uma promessa só: anúncio → quiz → oferta',
    categoria: 'Vendas / Marketing',
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 0,
    prioridade: 'alta',
    resumo:
      'Sugestão: hoje são 4 promessas diferentes no caminho (Comunidade/braços, recomeço, secar barriga, Efeito Lipo). Alinhar tudo deve subir os 8% que passam da 1ª tela.',
    resumo_detalhado:
      'Diagnóstico de 07/10: o gargalo é antes da T2 (8% contra 32% da régua). Os anúncios que vão para o quiz vendem a Comunidade e pedem "Comenta QUERO"; a T1 fala de recomeço; as perguntas falam de secar a barriga e 8 kg; a oferta é o Efeito Lipo. Escolher uma promessa e repetir do anúncio à oferta é o teste de maior impacto.',
    links: [
      { rotulo: 'Página de revisão do quiz', url: REVISAO_QUIZ },
      { rotulo: 'Painel de anúncios', url: PAINEL_ANUNCIOS },
    ],
    comandos: [
      c('Propor a promessa única', CC_LR, 'Proponha UMA promessa para anúncio, T1, perguntas e oferta do quiz, com antes/depois de cada texto. Não altere nada ainda.'),
    ],
    como_usar: "Peça a proposta no Claude Code com o comando abaixo. Você escolhe a promessa; o Claude prepara os textos com antes e depois e os criativos, e nada vai ao ar sem a sua aprovação.",
    passos_uso: ["Mande o comando abaixo numa sessão do Claude Code no repositório LR_LauraRosaPersonal.", "Escolha uma das promessas propostas (recomeço ou resultado).", "Aprove os textos novos da T1, das perguntas e da oferta, com antes e depois.", "Aprove 2 criativos que falam exatamente a mesma coisa.", "Acompanhe por 3 dias quantas pessoas passam da 1ª tela no painel de anúncios."],
    objetivo_conversa: "Escolher uma promessa só e alinhar anúncio, T1, perguntas e oferta do quiz, com antes e depois de cada texto e 2 criativos, sem mudar nada antes da minha aprovação.",
    onde_conversa: 'code',
    preparos: [
      prep("Ver o funil do quiz no painel de anúncios (aba Sugestão quiz)", "Onde as pessoas param e o que a rotina já sugeriu.", "https://claude.ai/artifact/FkDqzBBekcELvdVp4EWgEN"),
      prep("Na sessão nova do Claude Code: repositório LR_LauraRosaPersonal e ambiente \"Default\"", "Em claude.ai/code, clique em \"Novo\", escolha o repositório LR_LauraRosaPersonal e confira o ambiente no ícone de nuvem no topo (\"Default\"). O botão \"Iniciar conversa no Claude\" já abre essa página.", "https://claude.ai/code"),
    ],
    tarefas: [
      t('Escolher a promessa (recomeço ou resultado)'),
      t('Ajustar a T1 e o botão para a mesma promessa'),
      t('Criar 2 criativos que falam exatamente a mesma coisa'),
      t('Medir a passagem da T1 por 3 dias'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/LR_LauraRosaPersonal',
    origem: 'chat',
  },
]

export function sementes(): Ideia[] {
  return SEMENTES.map((s, i) => ({
    ...s,
    origem_ref: s.origem_ref ?? null,
    criado_em: agora,
    // espalha as datas para a ordenação por "recentes" fazer sentido
    atualizado_em: new Date(Date.now() - i * 36e5).toISOString(),
  }))
}
