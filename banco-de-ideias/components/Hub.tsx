'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Lightbulb, Mic, PanelLeft, Plus, Rocket, Undo2, X } from 'lucide-react'
import type { Conexao, ConexaoId, Ideia, RespostaBusca, Status } from '@/lib/tipos'
import { faseDoProgresso, progressoDasTarefas } from '@/lib/tipos'
import { buscarLocal } from '@/lib/busca-local'
import BarraBusca from './BarraBusca'
import Sidebar from './Sidebar'
import PrateleiraNoAr from './PrateleiraNoAr'
import CardIdeia from './CardIdeia'
import DrawerIdeia from './DrawerIdeia'
import ModalNovaIdeia from './ModalNovaIdeia'
import AgenteConexao from './AgenteConexao'
import { Icone3D } from './ui'

export interface Config {
  ia: boolean
  transcricaoServidor: boolean
  /** false quando o navegador/host não libera o microfone (ex.: artifact no Claude) */
  microfone?: boolean
  /** false: a busca com IA só roda no Enter (cada busca gasta uso) */
  buscaIAAutomatica?: boolean
}

type Filtro = 'todas' | Status
type Ordem = 'prioridade' | 'progresso' | 'recentes'
const PESO_PRIORIDADE = { alta: 0, media: 1, baixa: 2 }

export default function Hub({
  ideiasIniciais,
  conexoesIniciais,
  config,
  erroInicial,
  assinar,
}: {
  ideiasIniciais: Ideia[]
  conexoesIniciais: Conexao[]
  config: Config
  erroInicial?: string
  /** atualizações ao vivo vindas do armazenamento (retorna o cancelamento) */
  assinar?: (aoMudar: (ideias: Ideia[]) => void) => () => void
}) {
  const [ideias, setIdeias] = useState(ideiasIniciais)
  const [conexoes, setConexoes] = useState(conexoesIniciais)
  const [selecionadaId, setSelecionadaId] = useState<string | null>(null)
  const [abrirConversa, setAbrirConversa] = useState(false)
  const [consulta, setConsulta] = useState('')
  const [busca, setBusca] = useState<RespostaBusca | null>(null)
  const [buscandoIA, setBuscandoIA] = useState(false)
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [ordem, setOrdem] = useState<Ordem>('prioridade')
  const [novaIdeia, setNovaIdeia] = useState(false)
  const [conexaoAberta, setConexaoAberta] = useState<ConexaoId | null>(null)
  const [sidebarMobile, setSidebarMobile] = useState(false)
  const [aviso, setAviso] = useState<{ texto: string; desfazer?: () => void } | null>(
    erroInicial ? { texto: `Erro ao carregar ideias: ${erroInicial}` } : null
  )
  const timerBusca = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ultimaConsulta = useRef('')

  useEffect(() => assinar?.(setIdeias), [assinar])

  const selecionada = ideias.find((i) => i.id === selecionadaId) ?? null

  const avisar = useCallback((texto: string, desfazer?: () => void) => {
    const novo = { texto, desfazer }
    setAviso(novo)
    setTimeout(() => setAviso((a) => (a === novo ? null : a)), desfazer ? 7000 : 4000)
  }, [])

  const recarregar = useCallback(async () => {
    const r = await fetch('/api/ideias', { cache: 'no-store' })
    if (r.ok) setIdeias(await r.json())
  }, [])

  // ---------- edição ----------
  const ideiasRef = useRef(ideias)
  ideiasRef.current = ideias

  const atualizar = useCallback(
    async (id: string, mudanca: Partial<Ideia>) => {
      const atual = ideiasRef.current.find((i) => i.id === id)
      if (!atual) return
      const patch = { ...mudanca }
      // progresso e fase acompanham o checklist automaticamente
      if (patch.tarefas) {
        const p = progressoDasTarefas(patch.tarefas)
        if ((patch.status ?? atual.status) === 'no_ar' || p == null) {
          patch.progresso ??= atual.progresso // já publicado: o checklist não derruba os 100%
        } else {
          patch.progresso = p
          patch.fase = faseDoProgresso(p)
        }
      }
      if (patch.status === 'no_ar') {
        patch.progresso = 100
        patch.fase = 'fim'
      }
      setIdeias((lista) => lista.map((i) => (i.id === id ? { ...i, ...patch, atualizado_em: new Date().toISOString() } : i)))
      const r = await fetch(`/api/ideias/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!r.ok) {
        avisar('Não consegui salvar a alteração.')
        recarregar()
      }
    },
    [avisar, recarregar]
  )

  const excluir = useCallback(
    async (id: string) => {
      setSelecionadaId(null)
      setIdeias((l) => l.filter((i) => i.id !== id))
      const r = await fetch(`/api/ideias/${id}`, { method: 'DELETE' })
      if (!r.ok) {
        avisar('Não consegui excluir.')
        recarregar()
      }
    },
    [avisar, recarregar]
  )

  // ações rápidas do card: pausar, arquivar, retomar (com "Desfazer")
  const mudarStatus = useCallback(
    (id: string, status: Status) => {
      const atual = ideiasRef.current.find((i) => i.id === id)
      if (!atual || atual.status === status) return
      const anterior = { status: atual.status, progresso: atual.progresso, fase: atual.fase }
      atualizar(id, { status })
      const texto =
        status === 'arquivado'
          ? `“${atual.titulo}” arquivada — saiu do painel.`
          : status === 'pausado'
            ? `“${atual.titulo}” em stand-by (Pausadas).`
            : `“${atual.titulo}” de volta ao andamento.`
      avisar(texto, () => atualizar(id, anterior))
    },
    [atualizar, avisar]
  )

  const excluirComAviso = useCallback(
    (i: Ideia) => {
      excluir(i.id)
      avisar(`“${i.titulo}” excluída.`)
    },
    [excluir, avisar]
  )

  const abrir = useCallback((id: string, conversa = false) => {
    setSelecionadaId(id)
    setAbrirConversa(conversa)
    setSidebarMobile(false)
  }, [])

  // ---------- busca ----------
  const buscar = useCallback(
    (q: string, imediato = false) => {
      setConsulta(q)
      if (timerBusca.current) clearTimeout(timerBusca.current)
      const limpa = q.trim()
      if (!limpa) {
        setBusca(null)
        setBuscandoIA(false)
        return
      }
      setBusca(buscarLocal(limpa, ideias.filter((i) => i.status !== 'arquivado'))) // instantâneo
      if (!config.ia) return
      const disparar = async () => {
        ultimaConsulta.current = limpa
        setBuscandoIA(true)
        try {
          const r = await fetch('/api/busca', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: limpa }),
          })
          const res = (await r.json()) as RespostaBusca
          if (ultimaConsulta.current === limpa) setBusca(res)
        } finally {
          if (ultimaConsulta.current === limpa) setBuscandoIA(false)
        }
      }
      if (imediato) disparar()
      else if (config.buscaIAAutomatica !== false) timerBusca.current = setTimeout(disparar, 900)
    },
    [config.ia, config.buscaIAAutomatica, ideias]
  )

  // atalhos: "/" foca a busca (no componente), "Esc" fecha o que estiver aberto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (conexaoAberta) setConexaoAberta(null)
      else if (novaIdeia) setNovaIdeia(false)
      else if (selecionadaId) setSelecionadaId(null)
      else if (consulta) buscar('')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [novaIdeia, conexaoAberta, selecionadaId, consulta, buscar])

  // ---------- listas ----------
  const noAr = useMemo(() => ideias.filter((i) => i.status === 'no_ar'), [ideias])
  const contagem = useMemo(
    () => ({
      em_andamento: ideias.filter((i) => i.status === 'em_andamento').length,
      no_ar: noAr.length,
      pausado: ideias.filter((i) => i.status === 'pausado').length,
      arquivado: ideias.filter((i) => i.status === 'arquivado').length,
    }),
    [ideias, noAr]
  )
  const grade = useMemo(() => {
    const lista = ideias.filter((i) =>
      filtro === 'todas' ? i.status === 'em_andamento' || i.status === 'pausado' : i.status === filtro
    )
    return [...lista].sort((a, b) => {
      if (ordem === 'progresso') return b.progresso - a.progresso
      if (ordem === 'recentes') return b.atualizado_em.localeCompare(a.atualizado_em)
      return PESO_PRIORIDADE[a.prioridade] - PESO_PRIORIDADE[b.prioridade] || b.progresso - a.progresso
    })
  }, [ideias, filtro, ordem])

  const resultados = useMemo(() => {
    if (!busca) return []
    const porId = new Map(ideias.map((i) => [i.id, i]))
    return busca.resultados.flatMap((r) => {
      const i = porId.get(r.id)
      return i ? [{ ideia: i, motivo: r.motivo }] : []
    })
  }, [busca, ideias])

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      {/* ---------- topo ---------- */}
      <header className="vidro sticky top-0 z-30 border-x-0 border-t-0">
        <div className="flex items-center gap-3 px-4 py-3 md:px-6">
          <button
            className="rounded-xl p-2 text-tinta-suave hover:bg-verde-50 lg:hidden"
            onClick={() => setSidebarMobile((v) => !v)}
            aria-label="Abrir menu"
          >
            <PanelLeft size={20} />
          </button>
          <div className="flex items-center gap-2.5">
            <Icone3D icone={Lightbulb} tamanho={38} de="#34d483" ate="#059651" />
            <div className="hidden whitespace-nowrap leading-tight md:block">
              <div className="text-[15px] font-extrabold tracking-tight">Banco de Ideias</div>
              <div className="text-[11px] font-medium text-tinta-suave">centro de comando</div>
            </div>
          </div>
          <div className="mx-auto w-full min-w-0 max-w-2xl">
            <BarraBusca valor={consulta} onMudar={buscar} carregando={buscandoIA} ia={config.ia} />
          </div>
          <button
            onClick={() => setNovaIdeia(true)}
            className="btn-laranja flex shrink-0 items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-bold sm:px-4"
          >
            <Mic size={17} />
            <span className="hidden sm:inline">Nova ideia</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ---------- sidebar ---------- */}
        <Sidebar
          ideias={ideias}
          conexoes={conexoes}
          selecionadaId={selecionadaId}
          aberta={sidebarMobile}
          onFechar={() => setSidebarMobile(false)}
          onAbrirIdeia={(id) => abrir(id)}
          onAbrirConexao={setConexaoAberta}
        />

        {/* ---------- área central ---------- */}
        <main className="min-w-0 flex-1 px-4 pb-16 pt-5 md:px-8">
          {busca ? (
            <section className="animate-entrar">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-extrabold">Resultados para “{consulta}”</h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    busca.modo === 'ia' ? 'bg-laranja-100 text-laranja-700' : 'bg-verde-100 text-verde-700'
                  }`}
                >
                  {busca.modo === 'ia'
                    ? 'busca semântica (IA)'
                    : buscandoIA
                      ? 'refinando com IA…'
                      : config.ia && config.buscaIAAutomatica === false
                        ? 'busca local · Enter para a IA'
                        : 'busca local'}
                </span>
                <button onClick={() => buscar('')} className="ml-auto flex items-center gap-1 text-sm font-semibold text-tinta-suave hover:text-tinta">
                  <X size={15} /> limpar
                </button>
              </div>
              {busca.intencao && (
                <p className="mb-5 rounded-2xl bg-white/70 px-4 py-3 text-sm text-tinta-suave ring-1 ring-verde-900/5">
                  <b className="text-tinta">Entendi:</b> {busca.intencao}
                </p>
              )}
              {resultados.length ? (
                <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                  {resultados.map(({ ideia, motivo }, n) => (
                    <CardIdeia
                      key={ideia.id}
                      ideia={ideia}
                      motivo={motivo}
                      destaque={n === 0}
                      onAbrir={() => abrir(ideia.id)}
                      onStatus={(s) => mudarStatus(ideia.id, s)}
                      onExcluir={() => excluirComAviso(ideia)}
                      indice={n}
                    />
                  ))}
                </div>
              ) : (
                <Vazio texto="Nada encontrado. Tente descrever de outro jeito ou dite uma nova ideia." />
              )}
            </section>
          ) : (
            <>
              <PrateleiraNoAr ideias={noAr} onDetalhes={(id) => abrir(id)} />

              <section className="mt-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <h2 className="mr-2 text-lg font-extrabold">Ideias</h2>
                  {(
                    [
                      ['todas', `Ativas · ${contagem.em_andamento + contagem.pausado}`],
                      ['em_andamento', `Em andamento · ${contagem.em_andamento}`],
                      ['pausado', `Pausadas · ${contagem.pausado}`],
                      ['no_ar', `No ar · ${contagem.no_ar}`],
                      ...(contagem.arquivado || filtro === 'arquivado'
                        ? [['arquivado', `Arquivadas · ${contagem.arquivado}`]]
                        : []),
                    ] as [Filtro, string][]
                  ).map(([f, label]) => (
                    <button
                      key={f}
                      onClick={() => setFiltro(f)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                        filtro === f ? 'btn-verde' : 'bg-white/80 text-tinta-suave ring-1 ring-verde-900/8 hover:bg-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                  <select
                    value={ordem}
                    onChange={(e) => setOrdem(e.target.value as Ordem)}
                    className="ml-auto rounded-xl bg-white/80 px-3 py-1.5 text-xs font-semibold text-tinta-suave ring-1 ring-verde-900/8 outline-none"
                    aria-label="Ordenar"
                  >
                    <option value="prioridade">Ordenar: prioridade</option>
                    <option value="progresso">Ordenar: progresso</option>
                    <option value="recentes">Ordenar: recentes</option>
                  </select>
                </div>
                {grade.length ? (
                  <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                    {grade.map((i, n) => (
                      <CardIdeia
                        key={i.id}
                        ideia={i}
                        onAbrir={() => abrir(i.id)}
                        onConversar={() => abrir(i.id, true)}
                        onStatus={(s) => mudarStatus(i.id, s)}
                        onExcluir={() => excluirComAviso(i)}
                        indice={n}
                      />
                    ))}
                    {filtro !== 'arquivado' && (
                    <button
                      onClick={() => setNovaIdeia(true)}
                      className="group flex min-h-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-verde-900/12 text-tinta-suave transition-colors hover:border-laranja-300 hover:bg-white/50 hover:text-laranja-600"
                    >
                      <Icone3D icone={Plus} tamanho={52} de="#fdba74" ate="#f97316" />
                      <span className="text-sm font-bold">Ditar uma nova ideia</span>
                    </button>
                    )}
                  </div>
                ) : (
                  <Vazio
                    texto={
                      filtro === 'arquivado'
                        ? 'Nenhuma ideia arquivada.'
                        : 'Nenhuma ideia aqui ainda.'
                    }
                  />
                )}
              </section>
            </>
          )}
        </main>
      </div>

      <DrawerIdeia
        ideia={selecionada}
        abrirConversa={abrirConversa}
        config={config}
        onFechar={() => setSelecionadaId(null)}
        onAtualizar={atualizar}
        onExcluir={excluir}
      />

      <ModalNovaIdeia
        aberto={novaIdeia}
        config={config}
        onFechar={() => setNovaIdeia(false)}
        onCriada={(ideia) => {
          setIdeias((l) => [ideia, ...l.filter((x) => x.id !== ideia.id)])
          setNovaIdeia(false)
          setConsulta('')
          setBusca(null)
          setFiltro('todas')
          abrir(ideia.id)
          avisar(`Ideia “${ideia.titulo}” criada.`)
        }}
      />

      <AgenteConexao
        conexao={conexoes.find((c) => c.id === conexaoAberta) ?? null}
        onFechar={() => setConexaoAberta(null)}
        onAtualizada={(c, importou) => {
          setConexoes((l) => l.map((x) => (x.id === c.id ? c : x)))
          if (importou) recarregar()
        }}
      />

      {/* aviso */}
      <div
        className={`fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 transition-all duration-300 ${
          aviso ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex w-max max-w-[min(calc(100vw-32px),34rem)] items-center gap-2 rounded-2xl bg-tinta px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          <Rocket size={16} className="shrink-0 text-laranja-300" />
          <span className="min-w-0">{aviso?.texto}</span>
          {aviso?.desfazer && (
            <button
              onClick={() => {
                aviso.desfazer?.()
                setAviso(null)
              }}
              className="ml-2 flex shrink-0 items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-laranja-200 hover:bg-white/20"
            >
              <Undo2 size={13} /> Desfazer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Vazio({ texto }: { texto: string }) {
  return <div className="rounded-3xl bg-white/60 px-6 py-14 text-center text-sm font-medium text-tinta-suave ring-1 ring-verde-900/5">{texto}</div>
}
