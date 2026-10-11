// Sessão do painel: um cookie assinado com a PAINEL_SENHA. Trocar a senha na Vercel
// desconecta todo mundo. SOMENTE servidor (proxy.ts e /api/entrar).
import { createHmac, timingSafeEqual } from 'node:crypto'

export const COOKIE_SESSAO = 'painel_sessao'
export const TRINTA_DIAS = 60 * 60 * 24 * 30

export function senhaPainel() {
  return (process.env.PAINEL_SENHA || '').trim()
}

export function igual(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function tokenSessao(senha: string) {
  return createHmac('sha256', senha).update('banco-de-ideias:sessao:v1').digest('base64url')
}

export function sessaoValida(cookie: string | undefined, senha: string) {
  return Boolean(cookie) && igual(cookie as string, tokenSessao(senha))
}
