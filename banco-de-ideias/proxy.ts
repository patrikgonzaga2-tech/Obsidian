// Senha do painel (Basic Auth do navegador). Protege as páginas e as rotas /api/*,
// que usam a chave service_role do Supabase e a da Anthropic.
// - PAINEL_SENHA definida: pede a senha (qualquer usuário serve).
// - Sem PAINEL_SENHA na Vercel: bloqueia tudo, para nunca ficar aberto por esquecimento.
// - Sem PAINEL_SENHA no computador (npm run dev): libera, como antes.
import { timingSafeEqual } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'

function igual(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

function senhaEnviada(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || ''
  if (!auth.startsWith('Basic ')) return null
  const texto = Buffer.from(auth.slice(6), 'base64').toString('utf8')
  const i = texto.indexOf(':')
  return i === -1 ? null : texto.slice(i + 1)
}

export function proxy(req: NextRequest) {
  const senha = (process.env.PAINEL_SENHA || '').trim()
  if (!senha) {
    if (!process.env.VERCEL) return NextResponse.next()
    return new NextResponse('Painel bloqueado: cadastre PAINEL_SENHA na Vercel.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
  const enviada = senhaEnviada(req)
  if (enviada !== null && igual(enviada, senha)) return NextResponse.next()
  return new NextResponse('Senha necessária.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Banco de Ideias", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
