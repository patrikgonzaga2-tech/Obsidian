import { NextResponse } from 'next/server'
import { registrarSinal } from '@/lib/store'
import { igual } from '@/lib/sessao'

// Recebe o gancho das conversas do Claude Code (.claude/hooks/banco-de-ideias.mjs).
// Fica fora do login do painel: a proteção é o token BANCO_IDEIAS_TOKEN, igual dos dois lados.
export async function POST(req: Request) {
  const token = (process.env.BANCO_IDEIAS_TOKEN || '').trim()
  const enviado = req.headers.get('x-banco-ideias-token') || ''
  if (!token || !igual(enviado, token)) return NextResponse.json({ erro: 'Token inválido' }, { status: 401 })

  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>
  const sessao_id = typeof b.sessao_id === 'string' ? b.sessao_id : ''
  const evento = b.evento === 'pergunta' || b.evento === 'resposta' ? b.evento : null
  if (!/^session_[A-Za-z0-9]{10,60}$/.test(sessao_id) || !evento) {
    return NextResponse.json({ erro: 'Sinal inválido' }, { status: 400 })
  }
  try {
    await registrarSinal({
      sessao_id,
      evento,
      texto: typeof b.texto === 'string' ? b.texto : '',
      ramo: typeof b.ramo === 'string' ? b.ramo : undefined,
      repo: typeof b.repo === 'string' ? b.repo : undefined,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
