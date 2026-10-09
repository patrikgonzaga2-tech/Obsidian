// Ideias iniciais: usadas só quando o banco ainda está vazio.
// Baseadas nos projetos que já existem nos seus repositórios — edite à vontade no painel.
import type { Ideia, Tarefa } from './tipos'

const agora = new Date().toISOString()
const t = (texto: string, feito = false): Tarefa => ({
  id: Math.random().toString(36).slice(2, 10),
  texto,
  feito,
})

type Semente = Omit<Ideia, 'criado_em' | 'atualizado_em' | 'origem_ref'> & { origem_ref?: string | null }

const SEMENTES: Semente[] = [
  {
    id: 'seed-estudio-video',
    titulo: 'Estúdio de vídeo da Laura',
    categoria: 'Vídeo',
    status: 'em_andamento',
    fase: 'meio',
    progresso: 55,
    prioridade: 'alta',
    resumo: 'Pipeline de edição 9:16 montado (cortes, legenda, música). Falta automatizar a publicação.',
    resumo_detalhado:
      'Roteiros em estudio-video/roteiros, revisão automática de política do Meta, voz clonada e avatar já funcionando. A montagem final com ffmpeg está estável; o gargalo agora é tirar o passo manual entre aprovação do roteiro e o MP4 final pronto para subir no gerenciador de anúncios.',
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
    id: 'seed-segundo-cerebro',
    titulo: 'Segundo Cérebro (Obsidian)',
    categoria: 'Automação / IA',
    status: 'em_andamento',
    fase: 'meio',
    progresso: 50,
    prioridade: 'media',
    resumo: 'Cofre com recall e registro automáticos instalado; falta alimentar com decisões e padrões reais.',
    resumo_detalhado:
      'Hooks globais do Claude Code e AGENTS.md do Codex gravam projetos, decisões e aprendizados no cofre. Os índices já são gerados. Agora é usar no dia a dia e ligar o Banco de Ideias às notas de 01-Projetos.',
    tarefas: [
      t('Estrutura de pastas e templates', true),
      t('brain.mjs com recall/registro', true),
      t('Registrar as decisões dos projetos ativos'),
      t('Ligar o Banco de Ideias ao cofre (conexão Desktop)'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/Obsidian',
    origem: 'manual',
  },
  {
    id: 'seed-banco-ideias',
    titulo: 'Banco de Ideias (este painel)',
    categoria: 'App',
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 30,
    prioridade: 'alta',
    resumo: 'Painel criado com busca semântica, ideia por áudio e conversa com contexto. Falta conectar as fontes.',
    resumo_detalhado:
      'Next.js + Supabase + Tailwind. Funciona sem chaves (dados locais). Para ficar completo: criar as tabelas no Supabase, colocar a chave da Anthropic, um token do GitHub e publicar na Vercel.',
    tarefas: [
      t('Layout, cards, drawer e prateleira "No ar"', true),
      t('Nova ideia por áudio', true),
      t('Rodar supabase/schema.sql'),
      t('Configurar ANTHROPIC_API_KEY e GITHUB_TOKEN'),
      t('Publicar na Vercel'),
    ],
    url_produto: null,
    repo: 'patrikgonzaga2-tech/Obsidian',
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
  {
    id: 'seed-quiz',
    titulo: 'Quiz Efeito Lipo',
    categoria: 'Vendas / Marketing',
    status: 'no_ar',
    fase: 'fim',
    progresso: 90,
    prioridade: 'alta',
    resumo: 'Quiz no ar recebendo tráfego do Meta; acompanhar campanhas × vendas diariamente.',
    resumo_detalhado:
      'Funil quiz → oferta. Análise de anúncios × quiz × vendas segue docs/ANALISE_CAMPANHAS_QUIZ.md. Mudanças de oferta/checkout passam sempre pela revisão do Patrik.',
    tarefas: [
      t('Quiz publicado', true),
      t('Página de pós-compra levando ao grupo', true),
      t('Rotina diária de status das campanhas'),
    ],
    url_produto: 'https://www.laurarosapersonal.com/efeito-lipo-quiz',
    repo: 'patrikgonzaga2-tech/LR_LauraRosaPersonal',
    origem: 'manual',
  },
  {
    id: 'seed-loja-pix',
    titulo: 'Loja demo com checkout Pix',
    categoria: 'Vendas / Marketing',
    status: 'pausado',
    fase: 'inicio',
    progresso: 10,
    prioridade: 'baixa',
    resumo: 'Teste de loja virtual com Pix; parado até decidir se vira produto.',
    resumo_detalhado: 'Ideia de uma loja simples com pagamento via Pix. Só existe o esboço.',
    tarefas: [t('Esboço da ideia', true), t('Decidir se continua'), t('Escolher gateway Pix')],
    url_produto: null,
    repo: null,
    origem: 'manual',
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
