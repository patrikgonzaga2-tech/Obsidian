import { NextResponse } from 'next/server'
import { COOKIE_SESSAO, TRINTA_DIAS, igual, senhaPainel, tokenSessao } from '@/lib/sessao'

export async function POST(req: Request) {
  const senha = senhaPainel()
  if (!senha) return NextResponse.json({ erro: 'Senha do painel não configurada.' }, { status: 503 })

  const corpo = (await req.json().catch(() => ({}))) as { senha?: unknown; lembrar?: unknown }
  const enviada = typeof corpo.senha === 'string' ? corpo.senha : ''
  if (!igual(enviada, senha)) {
    await new Promise((r) => setTimeout(r, 700)) // freia tentativas em sequência
    return NextResponse.json({ erro: 'Senha incorreta.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_SESSAO, tokenSessao(senha), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(corpo.lembrar === false ? {} : { maxAge: TRINTA_DIAS }),
  })
  return res
}

/** Sair: apaga a sessão. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_SESSAO, '', { path: '/', maxAge: 0 })
  return res
}
