import type { Metadata } from 'next'
import FormEntrar from './FormEntrar'

export const metadata: Metadata = { title: 'Entrar · Banco de Ideias' }

export default async function Entrar({ searchParams }: { searchParams: Promise<{ volta?: string }> }) {
  const { volta } = await searchParams
  // Só caminhos do próprio painel: nada de mandar para outro site depois do login.
  const destino = volta && volta.startsWith('/') && !volta.startsWith('//') ? volta : '/'

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-verde-50 to-white px-4 py-10">
      <div className="w-full max-w-sm animate-entrar rounded-3xl border border-verde-100 bg-white p-7 shadow-xl shadow-verde-900/5">
        <img src="/icone.svg" alt="" className="mx-auto h-14 w-14" />
        <h1 className="mt-4 text-center text-2xl font-extrabold text-tinta">Banco de Ideias</h1>
        <p className="mt-1 text-center text-sm text-tinta-suave">Digite a senha do painel para entrar.</p>
        <FormEntrar destino={destino} />
      </div>
    </main>
  )
}
