// Regras de edição aplicadas no servidor e na versão artifact.
import type { Comando, ConversaClaude, Fase, Ideia, LinkIdeia, Preparo, Prioridade, Status, Tarefa } from './tipos'
import { FASES, faseDoProgresso, novoId, progressoDasTarefas, STATUS_LABEL } from './tipos'

export const EDITAVEIS: (keyof Ideia)[] = [
  'titulo', 'categoria', 'status', 'fase', 'progresso', 'prioridade',
  'resumo', 'resumo_detalhado', 'tarefas', 'url_produto', 'repo',
  'como_usar', 'passos_uso', 'comandos', 'links',
  'objetivo_conversa', 'onde_conversa', 'preparos', 'conversa_claude',
]

const STATUS = Object.keys(STATUS_LABEL) as Status[]
const PRIORIDADES: Prioridade[] = ['alta', 'media', 'baixa']
const texto = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v))

/** Link digitado sem protocolo ("meusite.com") vira https://meusite.com. */
export function normalizarUrl(v: unknown): string | null {
  const s = texto(v).trim()
  if (!s) return null
  return /^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`
}

function tarefas(v: unknown): Tarefa[] {
  if (!Array.isArray(v)) return []
  return v
    .map((t) =>
      typeof t === 'string'
        ? { id: novoId(), texto: t, feito: false }
        : t && typeof t === 'object'
          ? { id: texto((t as Tarefa).id) || novoId(), texto: texto((t as Tarefa).texto), feito: Boolean((t as Tarefa).feito) }
          : null
    )
    .filter((t): t is Tarefa => Boolean(t && t.texto.trim()))
}

function listaTexto(v: unknown): string[] {
  return Array.isArray(v) ? v.map(texto).map((x) => x.trim()).filter(Boolean) : []
}

function preparos(v: unknown): Preparo[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      id: texto(p.id) || novoId(),
      texto: texto(p.texto),
      ...(p.como ? { como: texto(p.como) } : {}),
      ...(p.link ? { link: normalizarUrl(p.link) ?? undefined } : {}),
      feito: Boolean(p.feito),
    }))
    .filter((p) => p.texto.trim())
}

function conversaClaude(v: unknown): ConversaClaude | null {
  if (!v || typeof v !== 'object') return null
  const c = v as Record<string, unknown>
  const agora = new Date().toISOString()
  const tamanhos = ['pequena', 'media', 'grande']
  return {
    iniciada_em: texto(c.iniciada_em) || agora,
    ultima_em: texto(c.ultima_em) || texto(c.iniciada_em) || agora,
    retomadas: Math.max(0, Math.round(Number(c.retomadas) || 0)),
    // campos sempre presentes (vazios quando não há): o banco do artifact junta objetos ao atualizar,
    // então omitir um campo manteria o valor antigo
    url: normalizarUrl(c.url) ?? '',
    tamanho: tamanhos.includes(c.tamanho as string) ? (c.tamanho as ConversaClaude['tamanho']) : '',
    resumo: texto(c.resumo).trim(),
  }
}

function comandos(v: unknown): Comando[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((c) => c && typeof c === 'object')
    .map((c) => ({ titulo: texto(c.titulo), texto: texto(c.texto), onde: texto(c.onde), ...(c.dica ? { dica: texto(c.dica) } : {}) }))
    .filter((c) => c.texto.trim())
}

function links(v: unknown): LinkIdeia[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((l) => l && typeof l === 'object')
    .map((l) => ({ rotulo: texto(l.rotulo) || 'Abrir', url: normalizarUrl(l.url) ?? '' }))
    .filter((l) => l.url)
}

/**
 * Filtra e valida os campos editáveis e aplica as regras:
 * checklist define o progresso; "no ar" fecha em 100%. Valores inválidos são descartados.
 */
export function aplicarRegras(entrada: unknown): Partial<Ideia> {
  const b = (entrada && typeof entrada === 'object' ? entrada : {}) as Record<string, unknown>
  const patch: Partial<Ideia> = {}
  if ('titulo' in b && texto(b.titulo).trim()) patch.titulo = texto(b.titulo).trim()
  for (const k of ['categoria', 'resumo', 'resumo_detalhado', 'como_usar'] as const) if (k in b) patch[k] = texto(b[k])
  if (STATUS.includes(b.status as Status)) patch.status = b.status as Status
  if (FASES.includes(b.fase as Fase)) patch.fase = b.fase as Fase
  if (PRIORIDADES.includes(b.prioridade as Prioridade)) patch.prioridade = b.prioridade as Prioridade
  if ('progresso' in b && Number.isFinite(Number(b.progresso))) patch.progresso = Math.max(0, Math.min(100, Math.round(Number(b.progresso))))
  if ('tarefas' in b) patch.tarefas = tarefas(b.tarefas)
  if ('comandos' in b) patch.comandos = comandos(b.comandos)
  if ('passos_uso' in b) patch.passos_uso = listaTexto(b.passos_uso)
  if ('objetivo_conversa' in b) patch.objetivo_conversa = texto(b.objetivo_conversa)
  if (b.onde_conversa === 'code' || b.onde_conversa === 'chat') patch.onde_conversa = b.onde_conversa
  if ('preparos' in b) patch.preparos = preparos(b.preparos)
  if ('conversa_claude' in b) patch.conversa_claude = conversaClaude(b.conversa_claude)
  if ('links' in b) patch.links = links(b.links)
  if ('url_produto' in b) patch.url_produto = normalizarUrl(b.url_produto)
  if ('repo' in b) patch.repo = texto(b.repo).trim() || null

  if (patch.tarefas && patch.progresso == null && patch.status !== 'no_ar') {
    const p = progressoDasTarefas(patch.tarefas)
    if (p != null) {
      patch.progresso = p
      patch.fase ??= faseDoProgresso(p)
    }
  }
  if (patch.status === 'no_ar') {
    patch.progresso = 100
    patch.fase = 'fim'
  }
  return patch
}

/** Garante que uma ideia lida do banco tem todos os campos no formato certo. */
export function normalizarIdeia(d: Partial<Ideia>): Ideia {
  return {
    ...(d as Ideia),
    status: STATUS.includes(d.status as Status) ? (d.status as Status) : 'em_andamento',
    fase: FASES.includes(d.fase as Fase) ? (d.fase as Fase) : 'inicio',
    prioridade: PRIORIDADES.includes(d.prioridade as Prioridade) ? (d.prioridade as Prioridade) : 'media',
    tarefas: tarefas(d.tarefas),
    comandos: comandos(d.comandos),
    passos_uso: listaTexto(d.passos_uso),
    preparos: preparos(d.preparos),
    conversa_claude: conversaClaude(d.conversa_claude),
    links: links(d.links),
    progresso: Number(d.progresso) || 0,
    titulo: texto(d.titulo) || 'Sem título',
    categoria: texto(d.categoria) || 'Outro',
    resumo: texto(d.resumo),
    resumo_detalhado: texto(d.resumo_detalhado),
  }
}

/** Lê o corpo JSON de uma requisição sem lançar erro (corpo inválido vira {}). */
export async function lerJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const b = await req.json()
    return b && typeof b === 'object' ? b : {}
  } catch {
    return {}
  }
}
