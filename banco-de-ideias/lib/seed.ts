// Ideias iniciais: usadas só quando o banco ainda está vazio.
// Baseadas nos projetos, painéis e rotinas que já existem (repositórios, docs e rotinas do Claude).
import type { Comando, Ideia, Tarefa } from './tipos'

const agora = new Date().toISOString()
const t = (texto: string, feito = false): Tarefa => ({
  id: Math.random().toString(36).slice(2, 10),
  texto,
  feito,
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
    tarefas: [
      t('Layout, cards, drawer e prateleira "No ar"', true),
      t('Nova ideia por voz/ditado', true),
      t('Painel dentro do Claude (sem chave de API)', true),
      t('Botões de pausar, arquivar e excluir', true),
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
