'use client'
import { useState } from 'react'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

export default function FormEntrar({ destino }: { destino: string }) {
  const [senha, setSenha] = useState('')
  const [ver, setVer] = useState(false)
  const [lembrar, setLembrar] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function entrar(e: React.FormEvent) {
    e.preventDefault()
    if (!senha || enviando) return
    setEnviando(true)
    setErro('')
    try {
      const res = await fetch('/api/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha, lembrar }),
      })
      if (res.ok) {
        window.location.replace(destino)
        return
      }
      const dados = (await res.json().catch(() => ({}))) as { erro?: string }
      setErro(dados.erro || 'Não foi possível entrar.')
    } catch {
      setErro('Sem conexão. Tente de novo.')
    }
    setEnviando(false)
  }

  return (
    <form onSubmit={entrar} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-tinta">Senha</span>
        <div className="relative mt-1.5">
          <input
            type={ver ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-xl border border-verde-200 bg-white px-4 py-3 pr-11 text-base text-tinta outline-none transition focus:border-verde-500 focus:ring-4 focus:ring-verde-100"
          />
          <button
            type="button"
            onClick={() => setVer((v) => !v)}
            aria-label={ver ? 'Esconder senha' : 'Mostrar senha'}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-tinta-suave hover:text-tinta"
          >
            {ver ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      <label className="flex items-center gap-2 text-sm text-tinta-suave">
        <input
          type="checkbox"
          checked={lembrar}
          onChange={(e) => setLembrar(e.target.checked)}
          className="h-4 w-4 accent-verde-600"
        />
        Lembrar neste aparelho por 30 dias
      </label>

      {erro && <p className="rounded-xl bg-laranja-50 px-3 py-2 text-sm font-medium text-laranja-700">{erro}</p>}

      <button
        type="submit"
        disabled={!senha || enviando}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-verde-500 px-4 py-3 font-bold text-white transition hover:bg-verde-600 disabled:opacity-50"
      >
        {enviando && <LoaderCircle size={18} className="animate-spin" />}
        Entrar
      </button>
    </form>
  )
}
