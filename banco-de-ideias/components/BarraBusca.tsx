'use client'
import { useEffect, useRef, useState } from 'react'
import { LoaderCircle, Search, Sparkles, X } from 'lucide-react'

const EXEMPLOS = [
  'quero terminar hoje o de edição de vídeo',
  'o que está no ar pra eu usar agora?',
  'ideias paradas que eu esqueci',
  'o que é mais urgente?',
]

export default function BarraBusca({
  valor,
  onMudar,
  carregando,
  ia,
}: {
  valor: string
  onMudar: (q: string, imediato?: boolean) => void
  carregando: boolean
  ia: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [foco, setFoco] = useState(false)
  const [exemplo, setExemplo] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement
      if (e.key === '/' && !/input|textarea|select/i.test(alvo.tagName)) {
        e.preventDefault()
        ref.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const t = setInterval(() => setExemplo((n) => (n + 1) % EXEMPLOS.length), 3500)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearInterval(t)
    }
  }, [])

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 ring-1 transition-all duration-300 ${
          foco ? 'shadow-[0_10px_30px_-12px_rgb(249_115_22/.45)] ring-laranja-300' : 'shadow-sm ring-verde-900/8'
        }`}
      >
        {carregando ? (
          <LoaderCircle size={18} className="shrink-0 animate-spin text-laranja-500" />
        ) : ia ? (
          <Sparkles size={18} className="shrink-0 text-laranja-500" />
        ) : (
          <Search size={18} className="shrink-0 text-tinta-suave" />
        )}
        <input
          ref={ref}
          value={valor}
          onChange={(e) => onMudar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onMudar(valor, true)
            if (e.key === 'Escape') {
              onMudar('')
              ref.current?.blur()
            }
          }}
          onFocus={() => setFoco(true)}
          onBlur={() => setFoco(false)}
          placeholder={`Ex.: ${EXEMPLOS[exemplo]}`}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-tinta-suave/60"
          aria-label="Buscar ideias"
        />
        {valor ? (
          <button onClick={() => onMudar('')} className="rounded-lg p-0.5 text-tinta-suave hover:bg-verde-50" aria-label="Limpar busca">
            <X size={16} />
          </button>
        ) : (
          <kbd className="hidden rounded-md bg-verde-50 px-1.5 py-0.5 text-[11px] font-bold text-verde-700 md:block">/</kbd>
        )}
      </div>
    </div>
  )
}
