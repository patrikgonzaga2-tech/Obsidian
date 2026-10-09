// Armazenamento das ideias e do histórico de conversas. SOMENTE servidor.
// - Com SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY: usa as tabelas hub_* via REST (PostgREST).
// - Sem isso: arquivo local .data/banco.json (bom para rodar no computador).
import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { Ideia, Mensagem } from './tipos'
import { sementes } from './seed'
import { normalizarIdeia } from './regras'

const SB_URL = (process.env.SUPABASE_URL || '').replace(/\s/g, '').replace(/\/+$/, '')
const SB_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').replace(/\s/g, '')

export function supabaseConfigurado() {
  return Boolean(SB_URL && SB_KEY)
}

function sbUrl(tabela: string, query = '') {
  const base = /^https?:\/\//i.test(SB_URL) ? SB_URL : `https://${SB_URL}`
  return `${base}/rest/v1/${tabela}${query ? `?${query}` : ''}`
}

async function sb<T>(tabela: string, query = '', init: RequestInit = {}): Promise<T> {
  const res = await fetch(sbUrl(tabela, query), {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  if (!res.ok) throw new Error(`Supabase ${tabela}: ${res.status} ${await res.text()}`)
  if (res.status === 204) return undefined as T
  const txt = await res.text()
  return (txt ? JSON.parse(txt) : undefined) as T
}

/** Testa se as tabelas existem. Usado pelo painel de conexões. */
export async function testarSupabase(): Promise<{ ok: boolean; erro?: string; tabelasFaltando?: boolean }> {
  if (!supabaseConfigurado()) return { ok: false, erro: 'Variáveis não configuradas' }
  try {
    await sb('hub_ideias', 'select=id&limit=1')
    await sb('hub_historico', 'select=id&limit=1')
    return { ok: true }
  } catch (e) {
    const msg = String(e)
    return { ok: false, erro: msg, tabelasFaltando: /404|PGRST205|does not exist|schema cache/i.test(msg) }
  }
}

// ---------- arquivo local ----------
const ARQ = path.join(process.cwd(), '.data', 'banco.json')
interface BancoLocal {
  ideias: Ideia[]
  historico: Mensagem[]
}
let memoria: BancoLocal | null = null
let carregando: Promise<BancoLocal> | null = null

async function lerLocal(): Promise<BancoLocal> {
  if (memoria) return memoria
  carregando ??= (async () => {
    let raw: string | null = null
    try {
      raw = await fs.readFile(ARQ, 'utf8')
    } catch {
      /* arquivo ainda não existe: primeira vez */
    }
    if (raw == null) {
      memoria = { ideias: sementes(), historico: [] }
      await gravarLocal()
    } else {
      try {
        const b = JSON.parse(raw) as BancoLocal
        memoria = { ideias: (b.ideias ?? []).map(normalizar), historico: b.historico ?? [] }
      } catch {
        // arquivo corrompido: guarda uma cópia e NÃO sobrescreve com as sementes
        await fs.copyFile(ARQ, `${ARQ}.corrompido-${Date.now()}`).catch(() => {})
        throw new Error('O arquivo .data/banco.json está corrompido. Foi feita uma cópia ao lado; corrija ou apague o arquivo.')
      }
    }
    return memoria!
  })().finally(() => {
    carregando = null
  })
  return carregando
}

// gravações em fila, sempre em arquivo temporário + rename (nunca deixa o JSON pela metade)
let fila: Promise<void> = Promise.resolve()
function gravarLocal(): Promise<void> {
  fila = fila.then(async () => {
    if (!memoria) return
    try {
      await fs.mkdir(path.dirname(ARQ), { recursive: true })
      const tmp = `${ARQ}.${process.pid}.tmp`
      await fs.writeFile(tmp, JSON.stringify(memoria, null, 2))
      await fs.rename(tmp, ARQ)
    } catch {
      // disco somente leitura (ex.: Vercel sem Supabase) — fica só em memória
    }
  })
  return fila
}

const normalizar = (i: Ideia) => normalizarIdeia(i)

// ---------- ideias ----------
export async function listarIdeias(): Promise<Ideia[]> {
  if (supabaseConfigurado()) {
    const rows = await sb<Ideia[]>('hub_ideias', 'select=*&order=atualizado_em.desc')
    if (rows.length === 0) {
      // instalação nova (nenhuma verificação de conexão registrada ainda): popula com as sementes.
      // Se você apagou tudo depois, o painel continua vazio.
      const marcas = await sb<unknown[]>('hub_conexoes', 'select=id&limit=1').catch(() => [1])
      if (marcas.length > 0) return []
      const s = sementes()
      await sb('hub_ideias', 'on_conflict=id', {
        method: 'POST',
        body: JSON.stringify(s),
        headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
      })
      return s
    }
    return rows.map(normalizar)
  }
  const b = await lerLocal()
  return [...b.ideias].sort((a, c) => c.atualizado_em.localeCompare(a.atualizado_em))
}

export async function obterIdeia(id: string): Promise<Ideia | null> {
  if (supabaseConfigurado()) {
    const rows = await sb<Ideia[]>('hub_ideias', `select=*&id=eq.${encodeURIComponent(id)}`)
    return rows[0] ? normalizar(rows[0]) : null
  }
  return (await lerLocal()).ideias.find((i) => i.id === id) ?? null
}

export async function criarIdeia(ideia: Ideia): Promise<Ideia> {
  if (supabaseConfigurado()) {
    const rows = await sb<Ideia[]>('hub_ideias', '', {
      method: 'POST',
      body: JSON.stringify(ideia),
      headers: { Prefer: 'return=representation' },
    })
    return normalizar(rows[0])
  }
  const b = await lerLocal()
  b.ideias.unshift(ideia)
  await gravarLocal()
  return ideia
}

export async function atualizarIdeia(id: string, patch: Partial<Ideia>): Promise<Ideia | null> {
  const dados = { ...patch, atualizado_em: new Date().toISOString() }
  delete (dados as Partial<Ideia>).id
  if (supabaseConfigurado()) {
    const rows = await sb<Ideia[]>('hub_ideias', `id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(dados),
      headers: { Prefer: 'return=representation' },
    })
    return rows[0] ? normalizar(rows[0]) : null
  }
  const b = await lerLocal()
  const i = b.ideias.findIndex((x) => x.id === id)
  if (i < 0) return null
  b.ideias[i] = { ...b.ideias[i], ...dados }
  await gravarLocal()
  return b.ideias[i]
}

export async function excluirIdeia(id: string): Promise<void> {
  if (supabaseConfigurado()) {
    await sb('hub_ideias', `id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' })
    return
  }
  const b = await lerLocal()
  b.ideias = b.ideias.filter((x) => x.id !== id)
  b.historico = b.historico.filter((m) => m.ideia_id !== id)
  await gravarLocal()
}

// ---------- histórico de conversas ----------
export async function listarHistorico(ideiaId: string): Promise<Mensagem[]> {
  if (supabaseConfigurado()) {
    return sb<Mensagem[]>('hub_historico', `select=*&ideia_id=eq.${encodeURIComponent(ideiaId)}&order=criado_em.asc`)
  }
  return (await lerLocal()).historico.filter((m) => m.ideia_id === ideiaId)
}

export async function salvarMensagens(msgs: Mensagem[]): Promise<void> {
  if (!msgs.length) return
  if (supabaseConfigurado()) {
    await sb('hub_historico', '', { method: 'POST', body: JSON.stringify(msgs), headers: { Prefer: 'return=minimal' } })
    return
  }
  const b = await lerLocal()
  b.historico.push(...msgs)
  await gravarLocal()
}

// ---------- registro de verificações de conexão ----------
export async function registrarConexao(id: string, status: string, detalhe: string): Promise<void> {
  if (!supabaseConfigurado()) return
  try {
    await sb('hub_conexoes', 'on_conflict=id', {
      method: 'POST',
      body: JSON.stringify({ id, status, detalhe, verificado_em: new Date().toISOString() }),
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    })
  } catch {
    // tabela opcional — não derruba a verificação
  }
}
