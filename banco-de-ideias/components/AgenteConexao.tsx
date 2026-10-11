'use client'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, CircleAlert, Copy, LoaderCircle, Play, RotateCcw, X } from 'lucide-react'
import type { Conexao, Pendencia } from '@/lib/tipos'
import { ICONE_CONEXAO, Icone3D, StatusConexao } from './ui'

/**
 * "Agente de conexão": as pendências numeradas (com onde clicar, "Resolvido" e escolhas)
 * e o botão que abre a conversa no Claude para fazer a conexão item a item.
 */
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
  const [aviso, setAviso] = useState('')
  const [verPrompt, setVerPrompt] = useState(false)
  const [ignorar, setIgnorar] = useState(false)

  useEffect(() => {
    if (conexao) setVisivel(conexao)
  }, [conexao])
  useEffect(() => {
    setLog([])
    setAviso('')
    setVerPrompt(false)
    setIgnorar(false)
  }, [conexao?.id])

  const c = visivel
  const aberto = Boolean(conexao)
  if (!c) return null
  const ic = ICONE_CONEXAO[c.id]
  const abertas = c.pendencias.filter((p) => !p.resolvida)
  const foraPendentes = c.pendencias.filter((p) => !p.resolvida && ((p.fora && !p.depois) || p.opcoes))
  const acao = c.acao ?? 'verificar'
  const liberado = foraPendentes.length === 0 || ignorar

  // guarda "Resolvido" / escolha da pendência
  const marcar = async (p: Pendencia, dados: { resolvida?: boolean; escolha?: string | null }) => {
    if (!p.id) return
    // otimista: atualiza a tela na hora
    const otimista: Conexao = {
      ...c,
      pendencias: c.pendencias.map((x) =>
        x.id === p.id
          ? { ...x, resolvida: dados.resolvida ?? (dados.escolha ? true : x.resolvida), escolha: dados.escolha ?? x.escolha }
          : x
      ),
    }
    setVisivel(otimista)
    try {
      const r = await fetch(`/api/conexoes/${c.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pendencia: p.id, ...dados }),
      })
      if (r.ok) {
        const nova = (await r.json()) as Conexao
        setVisivel(nova)
        onAtualizada(nova, false)
      }
    } catch {
      /* fica o otimista; na próxima abertura recarrega */
    }
  }

  const copiarPrompt = async () => {
    if (!c.prompt) return
    try {
      await navigator.clipboard.writeText(c.prompt)
      setAviso('Prompt copiado. No Claude, cole com Ctrl+V (ou toque e segure → Colar) e envie.')
    } catch {
      setVerPrompt(true)
      setAviso('Não consegui copiar sozinho: o prompt está aberto abaixo, selecione e copie.')
    }
  }

  // "Testar agora" / "Verificar": roda aqui mesmo e mostra o resultado
  const verificar = async () => {
    setRodando(true)
    setLog([])
    try {
      const r = await fetch(`/api/conexoes/${c.id}`, { method: 'POST' })
      const dados = (await r.json()) as { conexao: Conexao; log: string[] }
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
              {abertas.length
                ? `Falta ${abertas.length} ${abertas.length === 1 ? 'passo' : 'passos'} para deixar tudo conectado:`
                : 'Está tudo certo por aqui.'}
            </div>
          </div>

          <ol className="space-y-2">
            {c.pendencias.map((p, n) => (
              <li key={p.id ?? n} className={`rounded-2xl px-4 py-3 ring-1 ${p.resolvida ? 'bg-verde-50/70 ring-verde-200/70' : 'bg-white ring-laranja-200'}`}>
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
                      p.resolvida ? 'btn-verde' : 'bg-laranja-100 text-laranja-700'
                    }`}
                  >
                    {p.resolvida ? <Check size={12} strokeWidth={3} /> : n + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className={`text-sm ${p.resolvida && !p.opcoes ? 'text-tinta-suave' : 'font-semibold'}`}>{p.texto}</span>

                    {/* decisão: botões de escolha */}
                    {p.opcoes && (
                      <div className="mt-2 grid gap-2">
                        {p.opcoes.map((o) => {
                          const sel = p.escolha === o.valor
                          return (
                            <button
                              key={o.valor}
                              onClick={() => marcar(p, { escolha: o.valor })}
                              className={`rounded-xl px-3 py-2 text-left text-sm ring-1 transition-all ${
                                sel ? 'btn-verde ring-transparent' : 'bg-white text-tinta ring-verde-900/10 hover:ring-laranja-300'
                              }`}
                            >
                              <span className="flex items-center gap-2 font-bold">
                                {sel && <Check size={14} strokeWidth={3} />} {o.rotulo}
                              </span>
                              {o.dica && <span className={`block text-xs ${sel ? 'text-white/85' : 'text-tinta-suave'}`}>{o.dica}</span>}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {p.ajuda && !(p.resolvida && !p.opcoes) && (
                      <div className="relative mt-2">
                        <p className="whitespace-pre-line rounded-xl bg-verde-50/60 px-3 py-2 pr-9 text-xs leading-relaxed text-tinta-suave">{p.ajuda}</p>
                        <button
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(p.ajuda!)
                            } catch {
                              return
                            }
                            setCopiado(n)
                            setTimeout(() => setCopiado(null), 1500)
                          }}
                          className="absolute right-2 top-2 rounded-md p-1 text-tinta-suave hover:bg-white"
                          aria-label="Copiar"
                        >
                          {copiado === n ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                      </div>
                    )}

                    {/* passo fora do Claude: abrir + Resolvido */}
                    {p.fora && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.link && !p.resolvida && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-verde-700 ring-1 ring-verde-900/10"
                          >
                            Abrir <ArrowUpRight size={12} />
                          </a>
                        )}
                        <button
                          onClick={() => marcar(p, { resolvida: !p.resolvida })}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                            p.resolvida ? 'text-tinta-suave hover:bg-white' : 'btn-verde'
                          }`}
                        >
                          {p.resolvida ? (
                            <>
                              <RotateCcw size={12} /> Desfazer
                            </>
                          ) : (
                            <>
                              <Check size={12} strokeWidth={3} /> Resolvido
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {acao === 'conversa' && c.prompt && (
            <section className="rounded-2xl bg-white ring-1 ring-verde-900/8">
              <button
                onClick={() => setVerPrompt((v) => !v)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave"
              >
                Ver o prompt que vai para o Claude
                <ChevronDown size={14} className={`ml-auto transition-transform ${verPrompt ? 'rotate-180' : ''}`} />
              </button>
              {verPrompt && (
                <pre className="mx-4 mb-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-tinta px-3 py-3 font-mono text-[11.5px] leading-relaxed text-verde-100 select-all">
                  {c.prompt}
                </pre>
              )}
            </section>
          )}

          {log.length > 0 && (
            <div className="rounded-2xl bg-tinta p-4 font-mono text-xs leading-relaxed text-verde-100">
              {log.map((l, k) => (
                <div key={k} className={`animate-entrar ${l.startsWith('✗') ? 'text-laranja-300' : l.startsWith('+') ? 'text-verde-300' : ''}`}>
                  {l}
                </div>
              ))}
              {rodando && <span className="inline-block h-3.5 w-2 animate-pulse bg-verde-300 align-middle" />}
            </div>
          )}
        </div>

        <div className="border-t border-verde-900/6 bg-white px-6 py-4">
          {acao === 'conversa' && (
            <>
              {!liberado && (
                <div className="mb-3 flex items-start gap-2 rounded-2xl bg-laranja-50 px-3 py-2.5 text-xs font-semibold text-laranja-800 ring-1 ring-laranja-200">
                  <CircleAlert size={15} className="mt-px shrink-0" />
                  <span>
                    Falta resolver {foraPendentes.length} {foraPendentes.length === 1 ? 'item' : 'itens'} acima.{' '}
                    <button onClick={() => setIgnorar(true)} className="underline">
                      Começar mesmo assim
                    </button>
                  </span>
                </div>
              )}
              {c.destino ? (
                <a
                  href={c.destino}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={copiarPrompt}
                  className={`btn-laranja flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold ${liberado ? '' : 'pointer-events-none opacity-50'}`}
                >
                  Iniciar conexão no Claude <ArrowUpRight size={16} />
                </a>
              ) : (
                <button
                  onClick={copiarPrompt}
                  disabled={!liberado}
                  className="btn-laranja flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold"
                >
                  <Copy size={16} /> Copiar o prompt
                </button>
              )}
              <p className="mt-2 text-center text-[11px] leading-relaxed text-tinta-suave">{c.destino_instrucao}</p>
              {aviso && <p className="mt-2 rounded-xl bg-tinta px-3 py-2 text-xs font-semibold text-white">{aviso}</p>}
            </>
          )}

          {acao === 'nenhuma' && (
            <>
              <button onClick={onFechar} className="btn-verde flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold">
                <Check size={16} strokeWidth={3} /> {abertas.length ? 'Escolha uma opção acima' : 'Tudo certo, fechar'}
              </button>
              {!abertas.length && <p className="mt-2 text-center text-[11px] text-tinta-suave">Nada para fazer no Claude nesta conexão.</p>}
            </>
          )}

          {(acao === 'teste' || acao === 'verificar') && (
            <>
              <button onClick={verificar} disabled={rodando} className="btn-verde flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold">
                {rodando ? <LoaderCircle size={17} className="animate-spin" /> : <Play size={16} fill="white" />}
                {rodando ? 'Testando…' : acao === 'teste' ? 'Testar agora' : c.pode_sincronizar ? 'Verificar e importar ideias' : 'Verificar de novo'}
              </button>
              <p className="mt-2 text-center text-[11px] text-tinta-suave">
                Verificado {new Date(c.verificado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
