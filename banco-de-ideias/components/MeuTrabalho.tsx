'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, CircleAlert, ClipboardCopy, Compass, Pencil, Target } from 'lucide-react'
import type { Ideia, Perfil } from '@/lib/tipos'
import { instrucoesParaClaude, pendenciasForaDoClaude, trabalhandoAgora } from '@/lib/perfil'
import { BolinhaStatus, chaveIcone, Icone3D } from './ui'

/**
 * "Meu trabalho": o que estou montando, a meta, minhas funções, no que estou trabalhando agora
 * (com o próximo passo), o que preciso resolver — e o texto para a Personalização do Claude.
 */
export default function MeuTrabalho({
  perfil,
  ideias,
  linkPainel,
  onSalvar,
  onAbrir,
}: {
  perfil: Perfil | null
  ideias: Ideia[]
  linkPainel?: string
  onSalvar: (p: Perfil) => Promise<boolean>
  onAbrir: (id: string, aba?: 'descricao' | 'geral' | 'conversa') => void
}) {
  const [aberto, setAberto] = useState(true)
  const [editando, setEditando] = useState(false)
  const [copiado, setCopiado] = useState<'' | 'ok' | 'falhou'>('')
  const [verTexto, setVerTexto] = useState(false)
  useEffect(() => {
    try {
      if (localStorage.getItem('meu-trabalho-fechado') === '1') setAberto(false)
    } catch {}
  }, [])
  const alternar = () => {
    setAberto((v) => {
      try {
        localStorage.setItem('meu-trabalho-fechado', v ? '1' : '0')
      } catch {}
      return !v
    })
  }

  const agora = trabalhandoAgora(ideias)
  const travas = pendenciasForaDoClaude(ideias)
  const porId = new Map(ideias.map((i) => [i.id, i]))
  const texto = perfil ? instrucoesParaClaude(perfil, ideias, linkPainel) : ''

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado('ok')
    } catch {
      setCopiado('falhou')
      setVerTexto(true)
    }
    setTimeout(() => setCopiado(''), 5000)
  }

  return (
    <section className="mb-8 overflow-hidden rounded-[28px] bg-white/80 ring-1 ring-verde-900/6 shadow-[0_18px_40px_-28px_rgb(19_38_29/.45)]">
      <button onClick={alternar} className="flex w-full items-center gap-3 px-5 py-4 text-left">
        <Icone3D icone={Compass} tamanho={36} de="#fdba74" ate="#10b964" />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-extrabold leading-tight">Meu trabalho</h2>
          <p className="truncate text-xs font-semibold text-tinta-suave">
            {perfil ? perfil.meta || 'o que estou montando, funções e próximos passos' : 'monte o mapa do seu trabalho'}
          </p>
        </div>
        <ChevronDown size={18} className={`shrink-0 text-tinta-suave transition-transform ${aberto ? 'rotate-180' : ''}`} />
      </button>

      {aberto && (
        <div className="space-y-5 border-t border-verde-900/6 px-5 pb-5 pt-4">
          {editando || !perfil ? (
            <EditorPerfil
              perfil={perfil}
              ideias={ideias}
              onCancelar={perfil ? () => setEditando(false) : undefined}
              onSalvar={async (p) => {
                if (await onSalvar(p)) setEditando(false)
              }}
            />
          ) : (
            <>
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">O que estou montando</div>
                    <p className="mt-1 text-sm leading-relaxed">{perfil.montando}</p>
                  </div>
                  {perfil.meta && (
                    <p className="flex gap-2 rounded-2xl bg-laranja-50 px-3 py-2.5 text-sm font-semibold text-laranja-800 ring-1 ring-laranja-200">
                      <Target size={16} className="mt-0.5 shrink-0" />
                      {perfil.meta}
                    </p>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">No que estou trabalhando agora</div>
                  <ol className="mt-1.5 space-y-1.5">
                    {agora.map(({ ideia, proximo }) => (
                      <li key={ideia.id}>
                        <button
                          onClick={() => onAbrir(ideia.id, 'geral')}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left hover:bg-verde-50"
                        >
                          <Icone3D categoria={chaveIcone(ideia)} tamanho={26} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold">
                              {ideia.titulo} <span className="font-semibold text-verde-700">· {ideia.progresso}%</span>
                            </span>
                            <span className="flex items-center gap-1 truncate text-xs text-tinta-suave">
                              <ArrowRight size={12} className="shrink-0 text-laranja-500" /> {proximo}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                    {agora.length === 0 && <li className="text-sm text-tinta-suave">Nada em andamento.</li>}
                  </ol>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Minhas funções</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {perfil.funcoes.map((f) => {
                    const lista = f.ideias.map((id) => porId.get(id)).filter((i): i is Ideia => Boolean(i && i.status !== 'arquivado'))
                    return (
                      <div key={f.nome} className="rounded-2xl bg-verde-50/60 px-3 py-2.5 ring-1 ring-verde-900/5">
                        <div className="text-sm font-extrabold">{f.nome}</div>
                        <div className="text-xs text-tinta-suave">{f.descricao}</div>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {lista.map((i) => (
                            <button
                              key={i.id}
                              onClick={() => onAbrir(i.id)}
                              className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold ring-1 ring-verde-900/8 hover:ring-laranja-300"
                            >
                              <BolinhaStatus status={i.status} /> {i.titulo}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">O que preciso resolver</div>
                  <ul className="mt-1.5 space-y-1">
                    {perfil.preciso.map((p) => (
                      <li key={p} className="flex gap-2 text-sm">
                        <CircleAlert size={15} className="mt-0.5 shrink-0 text-laranja-500" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">
                    Para liberar fora do Claude · {travas.length}
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {travas.slice(0, 6).map((t, n) => (
                      <li key={n}>
                        <button onClick={() => onAbrir(t.ideia.id, 'conversa')} className="text-left text-sm hover:text-laranja-700">
                          <b>{t.ideia.titulo}:</b> {t.texto}
                        </button>
                      </li>
                    ))}
                    {travas.length > 6 && <li className="text-xs text-tinta-suave">… e mais {travas.length - 6} na aba Conversa de cada ideia.</li>}
                    {travas.length === 0 && <li className="text-sm text-verde-700">Tudo liberado.</li>}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-tinta px-4 py-3 text-white">
                <div className="min-w-0 flex-1 text-sm">
                  <b>Organize o Claude com isso:</b> copie o texto e cole em <b>Personalização</b> (menu da esquerda do Claude) ou nas
                  instruções de um Projeto. Toda conversa nova já começa sabendo o que você está montando.
                </div>
                <button onClick={copiar} className="btn-laranja inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold">
                  {copiado === 'ok' ? <Check size={14} /> : <ClipboardCopy size={14} />}
                  {copiado === 'ok' ? 'Copiado' : 'Copiar para o Claude'}
                </button>
                <button onClick={() => setVerTexto((v) => !v)} className="rounded-xl px-2 py-2 text-xs font-bold text-verde-200 hover:bg-white/10">
                  {verTexto ? 'Esconder texto' : 'Ver texto'}
                </button>
                <button onClick={() => setEditando(true)} className="inline-flex items-center gap-1 rounded-xl px-2 py-2 text-xs font-bold text-verde-200 hover:bg-white/10">
                  <Pencil size={13} /> Editar
                </button>
              </div>
              {copiado === 'falhou' && <p className="text-xs font-semibold text-laranja-700">Não consegui copiar sozinho: selecione o texto abaixo e copie.</p>}
              {verTexto && (
                <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-white px-4 py-3 font-sans text-xs leading-relaxed text-tinta ring-1 ring-verde-900/8 select-all">
                  {texto}
                </pre>
              )}
            </>
          )}
        </div>
      )}
    </section>
  )
}

function EditorPerfil({
  perfil,
  ideias,
  onSalvar,
  onCancelar,
}: {
  perfil: Perfil | null
  ideias: Ideia[]
  onSalvar: (p: Perfil) => void
  onCancelar?: () => void
}) {
  const [montando, setMontando] = useState(perfil?.montando ?? '')
  const [meta, setMeta] = useState(perfil?.meta ?? '')
  const [preciso, setPreciso] = useState((perfil?.preciso ?? []).join('\n'))
  const [funcoes, setFuncoes] = useState(
    (perfil?.funcoes ?? []).map((f) => `${f.nome}: ${f.descricao}`).join('\n')
  )
  const campo = 'mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm outline-none ring-1 ring-verde-900/10 focus:ring-2 focus:ring-laranja-300'
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        // funções: "Nome: descrição", uma por linha; mantém as ideias já ligadas a cada nome
        const antigas = new Map((perfil?.funcoes ?? []).map((f) => [f.nome.toLowerCase(), f.ideias]))
        onSalvar({
          montando: montando.trim(),
          meta: meta.trim(),
          preciso: preciso.split('\n').map((x) => x.trim()).filter(Boolean),
          funcoes: funcoes
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean)
            .map((l) => {
              const [nome, ...resto] = l.split(':')
              return { nome: nome.trim(), descricao: resto.join(':').trim(), ideias: antigas.get(nome.trim().toLowerCase()) ?? [] }
            }),
          atualizado_em: new Date().toISOString(),
        })
      }}
    >
      {!perfil && (
        <p className="rounded-2xl bg-laranja-50 px-3 py-2.5 text-sm text-laranja-800 ring-1 ring-laranja-200">
          Ainda não há um mapa do seu trabalho. Preencha abaixo ou peça no Claude Code: “No Banco de Ideias, monte o Meu trabalho.”
        </p>
      )}
      <label className="block">
        <span className="text-xs font-bold text-tinta-suave">O que estou montando</span>
        <textarea id="mt-montando" value={montando} onChange={(e) => setMontando(e.target.value)} rows={3} className={campo} />
      </label>
      <label className="block">
        <span className="text-xs font-bold text-tinta-suave">Meta de agora</span>
        <input id="mt-meta" value={meta} onChange={(e) => setMeta(e.target.value)} className={campo} />
      </label>
      <label className="block">
        <span className="text-xs font-bold text-tinta-suave">Minhas funções (uma por linha, “Nome: o que faço”)</span>
        <textarea id="mt-funcoes" value={funcoes} onChange={(e) => setFuncoes(e.target.value)} rows={5} className={campo} />
      </label>
      <label className="block">
        <span className="text-xs font-bold text-tinta-suave">O que preciso resolver (um por linha)</span>
        <textarea id="mt-preciso" value={preciso} onChange={(e) => setPreciso(e.target.value)} rows={4} className={campo} />
      </label>
      <p className="text-[11px] text-tinta-suave">
        As ideias de cada função ({ideias.length} no painel) continuam ligadas pelo nome da função.
      </p>
      <div className="flex gap-2">
        <button type="submit" className="btn-verde rounded-xl px-4 py-2 text-sm font-bold">
          Salvar
        </button>
        {onCancelar && (
          <button type="button" onClick={onCancelar} className="rounded-xl px-3 py-2 text-sm font-bold text-tinta-suave hover:bg-verde-50">
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
