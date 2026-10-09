// Regras de edição aplicadas no servidor e na versão artifact.
import type { Comando, Fase, Ideia, LinkIdeia, Prioridade, Status, Tarefa } from './tipos'
import { FASES, faseDoProgresso, novoId, progressoDasTarefas, STATUS_LABEL } from './tipos'

export const EDITAVEIS: (keyof Ideia)[] = [
  'titulo', 'categoria', 'status', 'fase', 'progresso', 'prioridade',
  'resumo', 'resumo_detalhado', 'tarefas', 'url_produto', 'repo',
  'como_usar', 'comandos', 'links',
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
