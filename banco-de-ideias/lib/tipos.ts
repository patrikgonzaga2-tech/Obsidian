// Tipos compartilhados entre servidor e cliente.

export type Status = 'em_andamento' | 'no_ar' | 'pausado' | 'arquivado'
export type Fase = 'inicio' | 'meio' | 'fim'
export type Prioridade = 'alta' | 'media' | 'baixa'
export type Origem = 'manual' | 'audio' | 'github' | 'desktop' | 'chat'

export interface Tarefa {
  id: string
  texto: string
  feito: boolean
}

/** Um pedido pronto para entregar ao agente/projeto. */
export interface Comando {
  titulo: string // o que o comando faz
  texto: string // o que digitar ou colar
  onde: string // onde usar: "Claude Code (LR_LauraRosaPersonal)", "Chat do painel", ...
  dica?: string
}

/** Algo que a pessoa precisa fazer FORA do Claude antes de começar a conversa (conector, chave, clique). */
export interface Preparo {
  id: string
  texto: string
  como?: string // onde clicar, passo a passo curto
  link?: string
  feito: boolean
}

/** A conversa de verdade no Claude (Claude Code ou chat) usada para configurar esta ideia/agente. */
export interface ConversaClaude {
  iniciada_em: string
  ultima_em: string
  retomadas: number
  url?: string // link da conversa, colado pela pessoa ('' = sem link)
  tamanho?: 'pequena' | 'media' | 'grande' | '' // até 10, 10–20, mais de 20 mensagens ('' = não informado)
  resumo?: string // "RESUMO PARA NOVA CONVERSA" colado da conversa anterior
  ativa?: boolean // sessão aberta agora (o Claude Code grava ao começar e desliga ao terminar)
  foco?: string // em poucas palavras, o que a sessão está fazendo
}

/** Sessão do Claude Code acompanhada no "Mexendo agora" (tabela hub_sessoes). */
export type SituacaoSessao = 'trabalhando' | 'esperando' | 'parada' | 'encerrada'
export interface Sessao {
  id: string // session_... do Claude Code
  titulo: string // nome da sessão no Claude (atualizado pela própria sessão ou pelo "Sincronizar agora")
  url: string
  situacao: SituacaoSessao
  detalhe: string // o que a sessão espera de você / o que está fazendo
  ideias: string[] // ids das ideias ligadas
  acompanhar: boolean
  atividade_em: string | null
  sincronizado_em: string
  resumo?: string // o que já foi feito e o que falta (gravado pela própria sessão)
  progresso?: number | null // 0–100, pelo plano da conversa
  ultima_resposta?: string // o fim da última resposta do Claude (chega sozinho pelo gancho)
  ultimo_pedido?: string // a última mensagem do Patrik na conversa
  ramo?: string
  repo?: string
  fixada?: boolean // fixada no topo do "Mexendo agora" (como na barra lateral do Claude)
}

/** Sem sinal por mais que isso, a sessão some do "Mexendo agora" (fechou sem avisar). */
export const SESSAO_EXPIRA_MS = 6 * 60 * 60 * 1000

export function mexendoAgora(i: Ideia, agora = Date.now()): boolean {
  const c = i.conversa_claude
  if (!c?.ativa) return false
  const t = Date.parse(c.ultima_em)
  return Number.isFinite(t) && agora - t < SESSAO_EXPIRA_MS
}

/** Revisão do Claude: como a ideia está, o que sugiro e há quanto tempo não anda. */
export interface Analise {
  situacao: string // como está hoje, em 1–3 frases
  sugestao: string // o próximo movimento que eu recomendo
  ordem: number // posição na fila de prioridade (1 = primeiro)
  ultimo_avanco: string // data ISO do último avanço real (commit, publicação, tarefa marcada)
  fonte?: string // de onde veio essa data
  corrigido?: string[] // dados que estavam errados no painel e foram corrigidos nesta revisão
  revisado_em: string
}

export interface LinkIdeia {
  rotulo: string
  url: string
}

export interface Ideia {
  id: string
  titulo: string
  categoria: string
  status: Status
  fase: Fase
  progresso: number // 0–100
  prioridade: Prioridade
  resumo: string // ponto atual, 1–2 frases
  resumo_detalhado: string
  tarefas: Tarefa[]
  url_produto: string | null // link para "Usar agora" (ideias no ar)
  repo: string | null // owner/repo no GitHub, quando houver
  origem: Origem
  origem_ref: string | null // id na fonte (repo, caminho da nota...) para não importar duas vezes
  como_usar?: string // para agentes e painéis: como funciona no dia a dia
  passos_uso?: string[] // passo a passo do que a pessoa faz para usar
  objetivo_conversa?: string // o que a conversa no Claude deve configurar/ajustar
  onde_conversa?: 'code' | 'chat' // Claude Code (repositório + conectores) ou chat do claude.ai
  preparos?: Preparo[]
  conversa_claude?: ConversaClaude | null
  comandos?: Comando[]
  links?: LinkIdeia[]
  analise?: Analise | null
  criado_em: string
  atualizado_em: string
}

export type ConexaoId = 'supabase' | 'github' | 'desktop' | 'chats'
export type ConexaoStatus = 'conectado' | 'pendente' | 'desconectado'

export interface OpcaoPendencia {
  valor: string
  rotulo: string
  dica?: string
}

export interface Pendencia {
  id?: string // estável: guarda o "Resolvido" e a escolha
  texto: string
  ajuda?: string // instrução ou trecho para copiar
  link?: string // onde resolver (abre em outra aba)
  fora?: boolean // depende de você, fora do Claude: tem botão "Resolvido"
  depois?: boolean // marcar depois da conversa (não bloqueia o botão de iniciar)
  opcoes?: OpcaoPendencia[] // é uma decisão: botões de escolha
  escolha?: string
  resolvida: boolean
}

/** O que você marcou no agente de conexão (Resolvido e escolhas). */
export interface EstadoConexao {
  resolvidos: string[]
  escolhas: Record<string, string>
}

export interface Conexao {
  id: ConexaoId
  nome: string
  descricao: string
  status: ConexaoStatus
  detalhe: string // linha curta exibida no card
  pendencias: Pendencia[]
  pode_sincronizar: boolean // "Iniciar conexão" também importa ideias da fonte
  verificado_em: string
  /** o que o botão principal faz: abrir a conversa no Claude, testar aqui, ou nada (já está ok) */
  acao?: 'conversa' | 'teste' | 'nenhuma' | 'verificar'
  prompt?: string // prompt para começar a conexão no Claude, item a item
  destino?: string // onde a conversa acontece (ex.: https://claude.ai/code)
  destino_instrucao?: string
}

export interface Mensagem {
  id: string
  ideia_id: string
  papel: 'user' | 'assistant'
  conteudo: string
  criado_em: string
}

export interface ResultadoBusca {
  id: string
  motivo: string
}

export interface RespostaBusca {
  modo: 'ia' | 'local'
  intencao: string
  resultados: ResultadoBusca[]
}

export const STATUS_LABEL: Record<Status, string> = {
  em_andamento: 'Em andamento',
  no_ar: 'No ar',
  pausado: 'Pausado',
  arquivado: 'Na lixeira', // status interno 'arquivado' = Lixeira (recuperável)
}

export const FASE_LABEL: Record<Fase, string> = {
  inicio: 'Início',
  meio: 'Meio',
  fim: 'Fim',
}

export const PRIORIDADE_LABEL: Record<Prioridade, string> = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
}

export const FASES: Fase[] = ['inicio', 'meio', 'fim']

/** Fase sugerida a partir do progresso. */
export function faseDoProgresso(p: number): Fase {
  if (p >= 67) return 'fim'
  if (p >= 34) return 'meio'
  return 'inicio'
}

/** Progresso calculado pelas tarefas (null quando não há tarefas). */
export function progressoDasTarefas(tarefas: Tarefa[]): number | null {
  if (!tarefas.length) return null
  return Math.round((tarefas.filter((t) => t.feito).length / tarefas.length) * 100)
}

export function novoId(prefixo = ''): string {
  const r =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36)
  return prefixo + r
}

/** "Meu trabalho": o mapa do que o Patrik está montando, para o painel e para o Claude. */
export interface Funcao {
  nome: string
  descricao: string
  ideias: string[] // ids das ideias desta função
}

export interface Perfil {
  montando: string // o que estou montando
  meta: string // a meta de agora
  funcoes: Funcao[]
  preciso: string[] // o que preciso resolver/decidir
  atualizado_em: string
}

/** Dias inteiros desde uma data ISO (0 = hoje). */
export function diasDesde(iso: string | undefined | null, agora = new Date()): number | null {
  if (!iso) return null
  const t = Date.parse(iso)
  if (!Number.isFinite(t)) return null
  // conta dias de calendário (ontem à noite = 1 dia), não blocos de 24 horas
  const meiaNoite = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  return Math.max(0, Math.round((meiaNoite(agora) - meiaNoite(new Date(t))) / 86_400_000))
}

/** Situação do ritmo: andando (até 2 dias), parando (3 a 6) ou parado (7 ou mais). */
export function ritmo(dias: number | null): 'andando' | 'parando' | 'parado' | 'sem_data' {
  if (dias == null) return 'sem_data'
  if (dias >= 7) return 'parado'
  if (dias >= 3) return 'parando'
  return 'andando'
}
