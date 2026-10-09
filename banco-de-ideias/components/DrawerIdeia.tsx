'use client'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, GitBranch, MessagesSquare, Pencil, Plus, Trash, X } from 'lucide-react'
import type { Ideia, Prioridade, Status, Tarefa } from '@/lib/tipos'
import { FASE_LABEL, novoId, PRIORIDADE_LABEL, STATUS_LABEL } from '@/lib/tipos'
import type { Config } from './Hub'
import Conversa from './Conversa'
import { BarraProgresso, BolinhaStatus, Icone3D, IndicadorFase } from './ui'

export default function DrawerIdeia({
  ideia,
  abrirConversa,
  config,
  onFechar,
  onAtualizar,
  onExcluir,
}: {
  ideia: Ideia | null
  abrirConversa: boolean
  config: Config
  onFechar: () => void
  onAtualizar: (id: string, patch: Partial<Ideia>) => void
  onExcluir: (id: string) => void
}) {
  // mantém a última ideia durante a animação de saída
  const [visivel, setVisivel] = useState<Ideia | null>(ideia)
  const [conversa, setConversa] = useState(false)
  const [temHistorico, setTemHistorico] = useState(false)
  useEffect(() => {
    if (ideia) setVisivel(ideia)
  }, [ideia])
  useEffect(() => {
    setConversa(abrirConversa)
  }, [ideia?.id, abrirConversa])
  useEffect(() => {
    if (!ideia?.id) return
    setTemHistorico(false)
    fetch(`/api/ideias/${ideia.id}/historico`)
      .then((r) => (r.ok ? r.json() : []))
      .then((h: unknown[]) => setTemHistorico(Array.isArray(h) && h.length > 0))
      .catch(() => {})
  }, [ideia?.id])

  const aberto = Boolean(ideia)
  const i = visivel

  return (
    <>
      <div
        onClick={onFechar}
        className={`fixed inset-0 z-40 bg-tinta/25 backdrop-blur-[2px] transition-opacity duration-300 ${
          aberto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[560px] flex-col bg-[#fbfdfb] shadow-[-30px_0_60px_-30px_rgb(19_38_29/.45)] transition-transform duration-500 ease-[var(--ease-mola)] ${
          aberto ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!aberto}
      >
        {i && (
          <>
            {/* cabeçalho */}
            <div className="relative overflow-hidden px-6 pb-5 pt-6">
              <div className="absolute inset-0 -z-0 bg-gradient-to-br from-verde-100/80 via-white to-laranja-100/70" />
              <div className="relative flex items-start gap-4">
                <Icone3D categoria={i.categoria} tamanho={60} />
                <div className="min-w-0 flex-1">
                  <TituloEditavel valor={i.titulo} onSalvar={(titulo) => onAtualizar(i.id, { titulo })} />
                  <input
                    defaultValue={i.categoria}
                    key={`cat-${i.id}`}
                    onBlur={(e) => e.target.value !== i.categoria && onAtualizar(i.id, { categoria: e.target.value })}
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-tinta-suave outline-none focus:text-tinta"
                    aria-label="Categoria"
                  />
                </div>
                <button onClick={onFechar} className="rounded-xl p-2 text-tinta-suave hover:bg-white" aria-label="Fechar">
                  <X size={20} />
                </button>
              </div>
              <div className="relative mt-4 flex flex-wrap gap-2">
                {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => onAtualizar(i.id, { status: s })}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      i.status === s ? 'bg-white shadow ring-1 ring-verde-900/10' : 'text-tinta-suave hover:bg-white/60'
                    }`}
                  >
                    <BolinhaStatus status={s} /> {STATUS_LABEL[s]}
                  </button>
                ))}
                <select
                  value={i.prioridade}
                  onChange={(e) => onAtualizar(i.id, { prioridade: e.target.value as Prioridade })}
                  className="ml-auto rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-tinta-suave outline-none ring-1 ring-verde-900/8"
                  aria-label="Prioridade"
                >
                  {(Object.keys(PRIORIDADE_LABEL) as Prioridade[]).map((p) => (
                    <option key={p} value={p}>
                      Prioridade {PRIORIDADE_LABEL[p].toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative mt-4 flex rounded-2xl bg-white/70 p-1 ring-1 ring-verde-900/5">
                {[
                  ['Visão geral', false],
                  ['Conversa', true],
                ].map(([label, v]) => (
                  <button
                    key={String(label)}
                    onClick={() => setConversa(v as boolean)}
                    className={`flex-1 rounded-xl py-1.5 text-sm font-bold transition-all ${
                      conversa === v ? 'bg-white text-tinta shadow-sm' : 'text-tinta-suave'
                    }`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>
            </div>

            {conversa ? (
              <Conversa key={i.id} ideia={i} config={config} onHistorico={() => setTemHistorico(true)} />
            ) : (
              <>
                <div className="rolagem-fina flex-1 space-y-6 overflow-y-auto px-6 pb-6 pt-1">
                  {/* fase */}
                  <section className="rounded-3xl bg-white p-5 ring-1 ring-verde-900/6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Fase atual</h4>
                      <span className="text-sm font-extrabold text-laranja-600">{FASE_LABEL[i.fase]}</span>
                    </div>
                    <IndicadorFase fase={i.fase} onMudar={(fase) => onAtualizar(i.id, { fase })} />
                    <div className="mt-5 flex items-center gap-3">
                      <BarraProgresso valor={i.progresso} alto />
                      <span className="w-11 text-right text-sm font-extrabold text-verde-700">{i.progresso}%</span>
                    </div>
                  </section>

                  {/* resumo */}
                  <section>
                    <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Onde parei</h4>
                    <TextoEditavel
                      valor={i.resumo}
                      destaque
                      onSalvar={(resumo) => onAtualizar(i.id, { resumo })}
                      placeholder="Uma frase sobre o ponto atual…"
                    />
                    <div className="mt-3">
                      <TextoEditavel
                        valor={i.resumo_detalhado}
                        onSalvar={(resumo_detalhado) => onAtualizar(i.id, { resumo_detalhado })}
                        placeholder="Detalhes, decisões, contexto…"
                      />
                    </div>
                  </section>

                  {/* passo a passo */}
                  <Checklist tarefas={i.tarefas} onMudar={(tarefas) => onAtualizar(i.id, { tarefas })} />

                  {/* links */}
                  <section className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Links</h4>
                    <CampoLink
                      key={`url-${i.id}`}
                      label="Produto no ar"
                      valor={i.url_produto ?? ''}
                      placeholder="https://…"
                      onSalvar={(v) => onAtualizar(i.id, { url_produto: v || null })}
                    />
                    <CampoLink
                      key={`repo-${i.id}`}
                      label="Repositório"
                      valor={i.repo ?? ''}
                      placeholder="usuario/repositorio"
                      onSalvar={(v) => onAtualizar(i.id, { repo: v || null })}
                      icone={<GitBranch size={14} />}
                      href={i.repo ? `https://github.com/${i.repo}` : undefined}
                    />
                  </section>

                  <button
                    onClick={() => confirm(`Excluir “${i.titulo}”? Isso apaga também o histórico de conversa.`) && onExcluir(i.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500"
                  >
                    <Trash size={13} /> Excluir ideia
                  </button>
                </div>

                {/* ações */}
                <div className="flex gap-3 border-t border-verde-900/6 bg-white/80 px-6 py-4 backdrop-blur">
                  <button
                    onClick={() => setConversa(true)}
                    className="btn-verde flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold"
                  >
                    <MessagesSquare size={17} />
                    {temHistorico ? 'Continuar conversa' : 'Iniciar conversa'}
                  </button>
                  {i.status === 'no_ar' && (
                    <a
                      href={i.url_produto || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!i.url_produto}
                      className={`btn-laranja flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
                        i.url_produto ? '' : 'pointer-events-none opacity-50'
                      }`}
                      title={i.url_produto ? i.url_produto : 'Adicione o link do produto acima'}
                    >
                      Usar agora <ArrowUpRight size={17} />
                    </a>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </aside>
    </>
  )
}

function Checklist({ tarefas, onMudar }: { tarefas: Tarefa[]; onMudar: (t: Tarefa[]) => void }) {
  const [nova, setNova] = useState('')
  const pendentes = tarefas.filter((t) => !t.feito).length
  const adicionar = () => {
    const texto = nova.trim()
    if (!texto) return
    onMudar([...tarefas, { id: novoId(), texto, feito: false }])
    setNova('')
  }
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Passo a passo</h4>
        <span className="text-xs font-semibold text-tinta-suave">
          {pendentes ? `${pendentes} pendente${pendentes > 1 ? 's' : ''}` : 'tudo feito 🎉'}
        </span>
      </div>
      <ol className="space-y-1.5">
        {tarefas.map((t, n) => (
          <li
            key={t.id}
            className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 transition-all ${
              t.feito ? 'bg-verde-50/60 ring-verde-900/4' : 'bg-white ring-verde-900/8'
            }`}
          >
            <button
              onClick={() => onMudar(tarefas.map((x) => (x.id === t.id ? { ...x, feito: !x.feito } : x)))}
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-all duration-300 ${
                t.feito ? 'btn-verde' : 'bg-laranja-50 text-laranja-600 ring-1 ring-laranja-200 hover:bg-laranja-100'
              }`}
              aria-label={t.feito ? 'Desmarcar' : 'Marcar como feito'}
            >
              {t.feito ? <Check size={14} strokeWidth={3} /> : n + 1}
            </button>
            <span className={`flex-1 text-sm ${t.feito ? 'text-tinta-suave line-through decoration-verde-400' : 'font-medium'}`}>{t.texto}</span>
            <button
              onClick={() => onMudar(tarefas.filter((x) => x.id !== t.id))}
              className="rounded-lg p-1 text-slate-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
              aria-label="Remover tarefa"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-dashed border-verde-900/12 px-3 py-1.5">
        <Plus size={16} className="text-tinta-suave" />
        <input
          value={nova}
          onChange={(e) => setNova(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && adicionar()}
          placeholder="Adicionar passo…"
          className="flex-1 bg-transparent py-1 text-sm outline-none"
        />
      </div>
    </section>
  )
}

function TituloEditavel({ valor, onSalvar }: { valor: string; onSalvar: (v: string) => void }) {
  const [editando, setEditando] = useState(false)
  const [texto, setTexto] = useState(valor)
  useEffect(() => setTexto(valor), [valor])
  if (editando)
    return (
      <input
        autoFocus
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={() => {
          setEditando(false)
          if (texto.trim() && texto !== valor) onSalvar(texto.trim())
        }}
        onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        className="w-full rounded-lg bg-white px-2 py-0.5 text-xl font-extrabold outline-none ring-2 ring-laranja-300"
      />
    )
  return (
    <button onClick={() => setEditando(true)} className="group flex items-center gap-2 text-left">
      <h2 className="text-xl font-extrabold leading-tight tracking-tight">{valor}</h2>
      <Pencil size={14} className="shrink-0 text-tinta-suave opacity-0 group-hover:opacity-100" />
    </button>
  )
}

function TextoEditavel({
  valor,
  onSalvar,
  placeholder,
  destaque,
}: {
  valor: string
  onSalvar: (v: string) => void
  placeholder: string
  destaque?: boolean
}) {
  const [texto, setTexto] = useState(valor)
  useEffect(() => setTexto(valor), [valor])
  return (
    <textarea
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      onBlur={() => texto !== valor && onSalvar(texto)}
      placeholder={placeholder}
      rows={destaque ? 2 : 4}
      className={`w-full resize-none rounded-2xl px-4 py-3 text-sm leading-relaxed outline-none transition-shadow focus:ring-2 focus:ring-laranja-300 field-sizing-content ${
        destaque
          ? 'bg-gradient-to-br from-laranja-50 to-white font-semibold text-tinta ring-1 ring-laranja-200'
          : 'bg-white text-tinta-suave ring-1 ring-verde-900/8'
      }`}
    />
  )
}

function CampoLink({
  label,
  valor,
  placeholder,
  onSalvar,
  icone,
  href,
}: {
  label: string
  valor: string
  placeholder: string
  onSalvar: (v: string) => void
  icone?: React.ReactNode
  href?: string
}) {
  const [texto, setTexto] = useState(valor)
  const destino = href ?? (valor || undefined)
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-verde-900/8">
      <span className="flex w-28 shrink-0 items-center gap-1.5 text-xs font-bold text-tinta-suave">
        {icone}
        {label}
      </span>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={() => texto.trim() !== valor && onSalvar(texto.trim())}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
      {destino && (
        <a href={destino} target="_blank" rel="noopener noreferrer" className="text-verde-600 hover:text-verde-800" aria-label="Abrir">
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  )
}
