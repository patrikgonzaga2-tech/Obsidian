'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUp, Check, ChevronDown, Copy, ExternalLink, LoaderCircle, Sparkles } from 'lucide-react'
import type { Ideia, Mensagem } from '@/lib/tipos'
import { contextoDaIdeia, promptRetomada } from '@/lib/contexto'
import type { Config } from './Hub'
import { Icone3D } from './ui'

const ABERTURA = 'Vamos retomar de onde parei. Qual é o próximo passo e por onde começo agora?'

/** Conversa com a IA já com todo o contexto da ideia injetado. */
export default function Conversa({ ideia, config, onHistorico }: { ideia: Ideia; config: Config; onHistorico: () => void }) {
  const [msgs, setMsgs] = useState<Pick<Mensagem, 'id' | 'papel' | 'conteudo'>[]>([])
  const [carregado, setCarregado] = useState(false)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [verContexto, setVerContexto] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const fim = useRef<HTMLDivElement>(null)
  const iniciou = useRef(false)

  const enviar = useCallback(
    async (mensagem: string) => {
      if (!mensagem.trim() || enviando) return
      const idResp = `r-${Date.now()}`
      setMsgs((m) => [...m, { id: `u-${Date.now()}`, papel: 'user', conteudo: mensagem }, { id: idResp, papel: 'assistant', conteudo: '' }])
      setTexto('')
      setEnviando(true)
      try {
        const r = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ideiaId: ideia.id, mensagem }),
        })
        if (!r.ok || !r.body) {
          const erro = await r.json().catch(() => ({ erro: 'Falha na conversa' }))
          throw new Error(erro.erro)
        }
        const leitor = r.body.getReader()
        const dec = new TextDecoder()
        for (;;) {
          const { value, done } = await leitor.read()
          if (done) break
          const pedaco = dec.decode(value, { stream: true })
          setMsgs((m) => m.map((x) => (x.id === idResp ? { ...x, conteudo: x.conteudo + pedaco } : x)))
        }
        onHistorico()
      } catch (e) {
        setMsgs((m) => m.map((x) => (x.id === idResp ? { ...x, conteudo: `⚠️ ${(e as Error).message}` } : x)))
      } finally {
        setEnviando(false)
      }
    },
    [enviando, ideia.id, onHistorico]
  )

  // carrega o histórico; se não houver, a IA já abre retomando o contexto
  useEffect(() => {
    let vivo = true
    fetch(`/api/ideias/${ideia.id}/historico`)
      .then((r) => (r.ok ? r.json() : []))
      .then((h: Mensagem[]) => {
        if (!vivo) return
        setMsgs(Array.isArray(h) ? h : [])
        setCarregado(true)
        if (config.ia && (!Array.isArray(h) || h.length === 0) && !iniciou.current) {
          iniciou.current = true
          enviar(ABERTURA)
        }
      })
      .catch(() => setCarregado(true))
    return () => {
      vivo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ideia.id])

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [msgs])

  const prompt = promptRetomada(ideia)
  const copiar = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }
  // claude.ai aceita o texto inicial via ?q= (links muito longos são cortados pelo navegador)
  const linkClaude = `https://claude.ai/new?q=${encodeURIComponent(prompt.slice(0, 6000))}`

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="rolagem-fina flex-1 space-y-4 overflow-y-auto px-6 pb-4">
        {/* contexto injetado */}
        <div className="rounded-2xl bg-verde-50/70 ring-1 ring-verde-200/70">
          <button onClick={() => setVerContexto((v) => !v)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-bold text-verde-800">
            <Sparkles size={14} />
            Contexto da ideia injetado na conversa
            <ChevronDown size={14} className={`ml-auto transition-transform ${verContexto ? 'rotate-180' : ''}`} />
          </button>
          {verContexto && (
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap px-4 pb-3 font-sans text-xs leading-relaxed text-tinta-suave">{contextoDaIdeia(ideia)}</pre>
          )}
          <div className="flex flex-wrap gap-2 border-t border-verde-200/70 px-4 py-2.5">
            <button onClick={copiar} className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-tinta-suave ring-1 ring-verde-900/8 hover:text-tinta">
              {copiado ? <Check size={13} /> : <Copy size={13} />} {copiado ? 'Copiado' : 'Copiar contexto'}
            </button>
            <a
              href={linkClaude}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-tinta-suave ring-1 ring-verde-900/8 hover:text-tinta"
            >
              <ExternalLink size={13} /> Abrir no Claude.ai
            </a>
          </div>
        </div>

        {!config.ia && (
          <div className="rounded-2xl bg-laranja-50 px-4 py-3 text-sm text-laranja-800 ring-1 ring-laranja-200">
            A conversa dentro do painel precisa da <b>ANTHROPIC_API_KEY</b> (veja a conexão “Chats no cloud”). Enquanto isso, use
            <b> Abrir no Claude.ai</b> — o contexto completo vai junto.
          </div>
        )}

        {!carregado && (
          <div className="flex justify-center py-6 text-tinta-suave">
            <LoaderCircle className="animate-spin" size={20} />
          </div>
        )}

        {msgs.map((m) =>
          m.papel === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-3xl rounded-br-lg bg-gradient-to-br from-laranja-400 to-laranja-600 px-4 py-2.5 text-sm font-medium text-white shadow-md">
                {m.conteudo}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex gap-2.5">
              <Icone3D categoria="ia" tamanho={30} />
              <div className="max-w-[85%] whitespace-pre-wrap rounded-3xl rounded-tl-lg bg-white px-4 py-3 text-sm leading-relaxed shadow-sm ring-1 ring-verde-900/6">
                {m.conteudo || (
                  <span className="flex gap-1 py-1">
                    {[0, 1, 2].map((n) => (
                      <span key={n} className="size-1.5 animate-bounce rounded-full bg-verde-400" style={{ animationDelay: `${n * 120}ms` }} />
                    ))}
                  </span>
                )}
              </div>
            </div>
          )
        )}
        <div ref={fim} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          enviar(texto)
        }}
        className="border-t border-verde-900/6 bg-white/80 px-6 py-4 backdrop-blur"
      >
        <div className="flex items-end gap-2 rounded-2xl bg-white p-2 ring-1 ring-verde-900/10 focus-within:ring-2 focus-within:ring-laranja-300">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                enviar(texto)
              }
            }}
            disabled={!config.ia}
            rows={1}
            placeholder={config.ia ? 'Escreva para a IA…' : 'Configure a chave da IA para conversar aqui'}
            className="field-sizing-content max-h-40 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={!config.ia || enviando || !texto.trim()}
            className="btn-laranja grid size-9 shrink-0 place-items-center rounded-xl"
            aria-label="Enviar"
          >
            {enviando ? <LoaderCircle size={17} className="animate-spin" /> : <ArrowUp size={17} />}
          </button>
        </div>
      </form>
    </div>
  )
}
