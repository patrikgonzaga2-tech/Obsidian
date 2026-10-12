import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PAINEL = (process.env.PAINEL_OFICIAL_URL || 'https://www.laurarosapersonal.com').replace(/\/+$/, '')
const LINK_ALERTAS = `${PAINEL}/paineloficialcorpofeliz#alertas`

type Alerta = { nivel: string; texto: string; link?: string | null }

// A rota do Painel Oficial confere ~50 links ao vivo (1 a 8 s): guardamos a última resposta por 1 minuto.
let cache: { em: number; corpo: unknown } | null = null
const CACHE_MS = 60_000

/** Alertas do Painel Oficial (laurarosapersonal.com), lidos com o mesmo BANCO_IDEIAS_TOKEN. */
export async function GET() {
  const token = (process.env.BANCO_IDEIAS_TOKEN || '').trim()
  const base = { link: LINK_ALERTAS }
  if (!token) return NextResponse.json({ ...base, ok: false, motivo: 'sem token', alertas: [] })
  if (cache && Date.now() - cache.em < CACHE_MS) return NextResponse.json(cache.corpo)
  try {
    const r = await fetch(`${PAINEL}/api/painel/oficial/alertas`, {
      headers: { 'x-banco-ideias-token': token },
      cache: 'no-store',
      signal: AbortSignal.timeout(18_000),
    })
    if (!r.ok) {
      const motivo = r.status === 503 ? 'falta a chave BANCO_IDEIAS_TOKEN na Vercel do laurarosapersonal.com' : r.status === 401 ? 'a chave é diferente nos dois projetos da Vercel' : `Painel Oficial respondeu ${r.status}`
      return NextResponse.json({ ...base, ok: false, motivo, alertas: [] })
    }
    const d = (await r.json()) as { atualizado_em?: string; alertas?: Alerta[] }
    const alertas = (Array.isArray(d.alertas) ? d.alertas : [])
      .filter((a) => a && typeof a.texto === 'string')
      .map((a) => ({ nivel: String(a.nivel || 'aviso'), texto: a.texto.slice(0, 300), link: typeof a.link === 'string' ? a.link : undefined }))
    const corpo = { ...base, ok: true, atualizado_em: d.atualizado_em ?? null, alertas }
    cache = { em: Date.now(), corpo }
    return NextResponse.json(corpo)
  } catch (e) {
    return NextResponse.json({ ...base, ok: false, motivo: String(e), alertas: [] })
  }
}
