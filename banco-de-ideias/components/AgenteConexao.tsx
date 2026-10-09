'use client'
import { useEffect, useState } from 'react'
import { Check, Copy, LoaderCircle, Play, X } from 'lucide-react'
import type { Conexao } from '@/lib/tipos'
import { ICONE_CONEXAO, Icone3D, StatusConexao } from './ui'

/** "Agente de conexão": lista as pendências numeradas e roda a conexão passo a passo. */
export default function AgenteConexao({
  conexao,
  onFechar,
  onAtualizada,
}: {
  conexao: Conexao | null
  onFechar: () => void
  onAtualizada: (c: Conexao, importou: boolean) => void
}) {
  const [visivel, setVisivel] = useState<Conexao | null>(conexao)
  const [rodando, setRodando] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const [copiado, setCopiado] = useState<number | null>(null)

  useEffect(() => {
    if (conexao) setVisivel(conexao)
  }, [conexao])
  useEffect(() => {
    setLog([])
  }, [conexao?.id])

  const c = visivel
  const aberto = Boolean(conexao)
  if (!c) return null
  const ic = ICONE_CONEXAO[c.id]
  const abertas = c.pendencias.filter((p) => !p.resolvida).length

  const iniciar = async () => {
    setRodando(true)
    setLog([])
    try {
      const r = await fetch(`/api/conexoes/${c.id}`, { method: 'POST' })
      const dados = (await r.json()) as { conexao: Conexao; log: string[] }
      // mostra o log linha a linha, como um agente trabalhando
      for (const linha of dados.log) {
        setLog((l) => [...l, linha])
        await new Promise((res) => setTimeout(res, 220))
      }
      setVisivel(dados.conexao)
      onAtualizada(dados.conexao, dados.log.some((l) => l.startsWith('+ ')))
    } catch (e) {
      setLog((l) => [...l, `Erro: ${(e as Error).message}`])
    } finally {
      setRodando(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-[60] grid place-items-center p-4 transition-all duration-300 ${aberto ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div className="absolute inset-0 bg-tinta/40 backdrop-blur-sm" onClick={onFechar} />
      <div
        className={`relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-[#fbfdfb] shadow-2xl transition-all duration-500 ease-[var(--ease-mola)] ${
          aberto ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
        }`}
      >
        <div className="relative flex items-center gap-4 bg-gradient-to-br from-verde-100 via-white to-laranja-100 px-6 py-5">
          <Icone3D icone={ic.icone} de={ic.de} ate={ic.ate} tamanho={52} />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Agente de conexão</div>
            <h2 className="text-xl font-extrabold">{c.nome}</h2>
            <StatusConexao status={c.status} />
          </div>
          <button onClick={onFechar} className="self-start rounded-xl p-2 text-tinta-suave hover:bg-white" aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className="rolagem-fina flex-1 space-y-4 overflow-y-auto px-6 py-5">
          <div className="flex gap-2.5">
            <Icone3D categoria="ia" tamanho={28} />
            <div className="rounded-3xl rounded-tl-lg bg-white px-4 py-3 text-sm leading-relaxed shadow-sm ring-1 ring-verde-900/6">
              {c.descricao}{' '}
              {abertas
                ? `Encontrei ${abertas} pendência${abertas > 1 ? 's' : ''} para deixar tudo conectado:`
                : 'Está tudo certo por aqui. ✅'}
            </div>
          </div>

          <ol className="space-y-2">
            {c.pendencias.map((p, n) => (
              <li key={n} className={`rounded-2xl px-4 py-3 ring-1 ${p.resolvida ? 'bg-verde-50/70 ring-verde-200/70' : 'bg-white ring-laranja-200'}`}>
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
                      p.resolvida ? 'btn-verde' : 'bg-laranja-100 text-laranja-700'
                    }`}
                  >
                    {p.resolvida ? <Check size={12} strokeWidth={3} /> : n + 1}
                  </span>
                  <span className={`text-sm ${p.resolvida ? 'text-tinta-suave' : 'font-semibold'}`}>{p.texto}</span>
                </div>
                {p.ajuda && !p.resolvida && (
                  <div className="relative mt-2.5 ml-9">
                    <pre className="whitespace-pre-wrap rounded-xl bg-tinta px-3 py-2.5 pr-9 font-mono text-[11.5px] leading-relaxed text-verde-100">{p.ajuda}</pre>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(p.ajuda!)
                        setCopiado(n)
                        setTimeout(() => setCopiado(null), 1500)
                      }}
                      className="absolute right-2 top-2 rounded-md p-1 text-verde-200 hover:bg-white/10"
                      aria-label="Copiar"
                    >
                      {copiado === n ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ol>

          {log.length > 0 && (
            <div className="rounded-2xl bg-tinta p-4 font-mono text-xs leading-relaxed text-verde-100">
              {log.map((l, i) => (
                <div key={i} className={`animate-entrar ${l.startsWith('✗') ? 'text-laranja-300' : l.startsWith('+') ? 'text-verde-300' : ''}`}>
                  {l}
                </div>
              ))}
              {rodando && <span className="inline-block h-3.5 w-2 animate-pulse bg-verde-300 align-middle" />}
            </div>
          )}
        </div>

        <div className="border-t border-verde-900/6 bg-white px-6 py-4">
          <button onClick={iniciar} disabled={rodando} className="btn-verde flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold">
            {rodando ? <LoaderCircle size={17} className="animate-spin" /> : <Play size={16} fill="white" />}
            {rodando ? 'Conectando…' : c.pode_sincronizar ? 'Iniciar conexão e importar ideias' : 'Iniciar conexão'}
          </button>
          <p className="mt-2 text-center text-[11px] text-tinta-suave">
            Verificado {new Date(c.verificado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · as chaves ficam só no servidor (.env.local / Vercel)
          </p>
        </div>
      </div>
    </div>
  )
}
