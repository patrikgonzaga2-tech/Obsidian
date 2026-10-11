// Senha do painel. Protege as páginas e as rotas /api/*, que usam a chave service_role
// do Supabase e a da Anthropic. Quem não tem a sessão vai para a tela /entrar.
// - PAINEL_SENHA definida: exige login (cookie de sessão).
// - Sem PAINEL_SENHA na Vercel: bloqueia tudo, para nunca ficar aberto por esquecimento.
// - Sem PAINEL_SENHA no computador (npm run dev): libera, como antes.
import { NextResponse, type NextRequest } from 'next/server'
import { COOKIE_SESSAO, senhaPainel, sessaoValida } from './lib/sessao'

const LIVRES = ['/entrar', '/api/entrar']

export function proxy(req: NextRequest) {
  const senha = senhaPainel()
  if (!senha) {
    if (!process.env.VERCEL) return NextResponse.next()
    return new NextResponse('Painel bloqueado: cadastre PAINEL_SENHA na Vercel.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const { pathname, search } = req.nextUrl
  if (LIVRES.includes(pathname)) return NextResponse.next()
  if (sessaoValida(req.cookies.get(COOKIE_SESSAO)?.value, senha)) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ erro: 'Senha necessária' }, { status: 401 })
  }
  const destino = new URL('/entrar', req.url)
  if (pathname !== '/') destino.searchParams.set('volta', pathname + search)
  return NextResponse.redirect(destino)
}

export const config = {
  // Arquivos do próprio Next e o ícone ficam de fora: a tela de login precisa deles.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icone.svg).*)'],
}
