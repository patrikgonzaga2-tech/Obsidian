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
  comandos?: Comando[]
  links?: LinkIdeia[]
  criado_em: string
  atualizado_em: string
}

export type ConexaoId = 'supabase' | 'github' | 'desktop' | 'chats'
export type ConexaoStatus = 'conectado' | 'pendente' | 'desconectado'

export interface Pendencia {
  texto: string
  ajuda?: string // instrução ou trecho para copiar
  resolvida: boolean
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
  arquivado: 'Arquivado',
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
