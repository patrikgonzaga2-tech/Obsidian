import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PAINEL = (process.env.PAINEL_OFICIAL_URL || 'https://www.laurarosapersonal.com').replace(/\/+$/, '')
const LINK_ALERTAS = `${PAINEL}/paineloficialcorpofeliz#alertas`

type Alerta = { nivel: string; texto: string; link?: string }

/** Alertas do Painel Oficial (laurarosapersonal.com), lidos com o mesmo BANCO_IDEIAS_TOKEN. */
export async function GET() {
  const token = (process.env.BANCO_IDEIAS_TOKEN || '').trim()
  const base = { link: LINK_ALERTAS }
  if (!token) return NextResponse.json({ ...base, ok: false, motivo: 'sem token', alertas: [] })
  try {
    const r = await fetch(`${PAINEL}/api/painel/oficial/alertas`, {
      headers: { 'x-banco-ideias-token': token },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) return NextResponse.json({ ...base, ok: false, motivo: `Painel Oficial respondeu ${r.status}`, alertas: [] })
    const d = (await r.json()) as { atualizado_em?: string; alertas?: Alerta[] }
    const alertas = (Array.isArray(d.alertas) ? d.alertas : [])
      .filter((a) => a && typeof a.texto === 'string')
      .map((a) => ({ nivel: String(a.nivel || 'aviso'), texto: a.texto.slice(0, 300), link: typeof a.link === 'string' ? a.link : undefined }))
    return NextResponse.json({ ...base, ok: true, atualizado_em: d.atualizado_em ?? null, alertas })
  } catch (e) {
    return NextResponse.json({ ...base, ok: false, motivo: String(e), alertas: [] })
  }
}
