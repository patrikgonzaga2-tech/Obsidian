'use client'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  Clock,
  Copy,
  Flame,
  ListChecks,
  MessageSquarePlus,
  PanelRightOpen,
  Radio,
  RefreshCw,
  Rocket,
  Wrench,
  X,
} from 'lucide-react'
import type { Ideia, Prioridade, Sessao, SituacaoSessao, Tarefa } from '@/lib/tipos'
import { diasDesde, mexendoAgora, ritmo } from '@/lib/tipos'
import { destinoConversa, promptAtualizarSessao, promptAtualizarTudo, promptConversaNova, promptNovaConversaSessao, promptPendencia } from '@/lib/contexto'
import { BarraProgresso, PillStatus } from './ui'

/**
 * Painel de comando: a primeira coisa do Banco de Ideias.
 * Mostra o que está parado, a fila por prioridade e, para cada pendência,
 * o botão que prepara uma conversa nova no Claude para resolvê-la passo a passo.
 */

type Pedido = { ideia: Ideia; tarefa: Tarefa | null }

const FAIXAS: { prioridade: Prioridade; titulo: string; dica: string }[] = [
  { prioridade: 'alta', titulo: 'Fazer agora', dica: 'Mexe direto em venda ou está travando outra coisa.' },
  { prioridade: 'media', titulo: 'Em seguida', dica: 'Importa, mas pode esperar as de cima.' },
  { prioridade: 'baixa', titulo: 'Quando der', dica: 'Organização e limpeza.' },
]

const ordemDe = (i: Ideia) => i.analise?.ordem ?? 99
const pendentesDe = (i: Ideia) => i.tarefas.filter((t) => !t.feito)
const dataCurta = (iso?: string) => {
  const t = iso ? Date.parse(iso) : NaN
  return Number.isFinite(t) ? new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—'
}

export default function PainelComando({
  ideias,
  sessoes,
  onAbrir,
  onAtualizar,
  onPararSessao,
}: {
  ideias: Ideia[]
  sessoes: Sessao[]
  onAbrir: (id: string) => void
  onAtualizar: (id: string, patch: Partial<Ideia>) => void
  onPararSessao: (id: string) => void
}) {
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [promptAberto, setPromptAberto] = useState<PedidoPrompt | null>(null)
  const [aberta, setAberta] = useState<string | null>(null)
  // relógio do "Mexendo agora": recalcula os "há X min" a cada minuto
  const [agora, setAgora] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 60_000)
    return () => clearInterval(t)
  }, [])

  const visiveis = useMemo(() => ideias.filter((i) => i.status !== 'arquivado'), [ideias])
  const comPendencia = useMemo(
    () => visiveis.filter((i) => pendentesDe(i).length).sort((a, b) => ordemDe(a) - ordemDe(b) || a.titulo.localeCompare(b.titulo)),
    [visiveis]
  )
  const semPendencia = useMemo(() => visiveis.filter((i) => !pendentesDe(i).length), [visiveis])

  const numeros = useMemo(() => {
    const paradas = comPendencia.filter((i) => ['parando', 'parado'].includes(ritmo(diasDesde(i.analise?.ultimo_avanco))))
    return {
      pendencias: comPendencia.reduce((n, i) => n + pendentesDe(i).length, 0),
      ideias: comPendencia.length,
      paradas: paradas.length,
      maisParada: paradas.reduce<Ideia | null>(
        (m, i) => (!m || (diasDesde(i.analise?.ultimo_avanco) ?? 0) > (diasDesde(m.analise?.ultimo_avanco) ?? 0) ? i : m),
        null
      ),
      alta: comPendencia.filter((i) => i.prioridade === 'alta').length,
      noAr: visiveis.filter((i) => i.status === 'no_ar').length,
    }
  }, [comPendencia, visiveis])

  const revisado = useMemo(() => {
    const datas = visiveis.map((i) => i.analise?.revisado_em).filter(Boolean) as string[]
    return datas.sort().pop()
  }, [visiveis])

  const comSessao = useMemo(() => new Set(sessoes.filter((s) => s.situacao !== 'encerrada').flatMap((s) => s.ideias)), [sessoes])
  const ativas = useMemo(
    () =>
      visiveis
        .filter((i) => mexendoAgora(i, agora) && !comSessao.has(i.id)) // a sessão já aparece com o nome dela
        .sort((a, b) => Date.parse(b.conversa_claude!.ultima_em) - Date.parse(a.conversa_claude!.ultima_em)),
    [visiveis, agora, comSessao]
  )
  const encerrar = (i: Ideia) => {
    if (i.conversa_claude) onAtualizar(i.id, { conversa_claude: { ...i.conversa_claude, ativa: false } })
  }

  const marcar = (i: Ideia, t: Tarefa) => {
    const tarefas = i.tarefas.map((x) => (x.id === t.id ? { ...x, feito: !x.feito } : x))
    const patch: Partial<Ideia> = { tarefas }
    // marcar como feita conta como avanço: a ideia sai de "parada"
    if (!t.feito && i.analise) patch.analise = { ...i.analise, ultimo_avanco: new Date().toISOString() }
    onAtualizar(i.id, patch)
  }

  return (
    <>
    <section className="animate-entrar" aria-labelledby="titulo-comando">
      {/* cabeçalho */}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-laranja-600">Painel de comando</p>
          <h2 id="titulo-comando" className="text-2xl font-extrabold tracking-tight text-balance">
            O que resolver agora
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-xs font-medium text-tinta-suave">
            {revisado ? `Revisado pelo Claude em ${dataCurta(revisado)}` : 'Ainda sem revisão do Claude'} · {numeros.pendencias} pendências em{' '}
            {numeros.ideias} ideias
          </p>
          <button
            onClick={() =>
              setPromptAberto({
                titulo: 'Atualizar tudo',
                explicacao:
                  'O Claude lê as sessões abertas, o GitHub, a Vercel e o CRM (só leitura) e atualiza todas as ideias, as sessões e o Meu trabalho aqui no painel. Cole numa sessão nova do Claude Code com o conector do Supabase.',
                prompt: promptAtualizarTudo(),
                url: 'https://claude.ai/code',
                destino: 'Claude Code (sessão nova)',
              })
            }
            className="btn-laranja inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold"
          >
            <RefreshCw size={13} /> Atualizar tudo
          </button>
        </div>
      </div>

      {/* sessões abertas agora no Claude Code */}
      <MexendoAgora sessoes={sessoes.filter((s) => s.situacao !== 'encerrada')} todas={visiveis} ideias={ativas} agora={agora} onAbrir={onAbrir} onEncerrar={encerrar} onPararSessao={onPararSessao} onPrompt={setPromptAberto} />

      {/* números */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Numero icone={<ListChecks size={16} />} valor={numeros.pendencias} rotulo="Pendências abertas" nota={`em ${numeros.ideias} ideias`} />
        <Numero
          icone={<Clock size={16} />}
          valor={numeros.paradas}
          rotulo="Paradas há 3+ dias"
          nota={numeros.maisParada ? `mais antiga: ${numeros.maisParada.titulo}` : 'nada parado'}
          alerta={numeros.paradas > 0}
        />
        <Numero icone={<Flame size={16} />} valor={numeros.alta} rotulo="Prioridade alta" nota="ideias com pendência" />
        <Numero icone={<Rocket size={16} />} valor={numeros.noAr} rotulo="No ar" nota="produtos funcionando" />
      </div>

      {/* como funciona */}
      <ol className="mt-4 grid gap-2 text-xs font-medium text-tinta-suave sm:grid-cols-3">
        {[
          ['Toque em', 'Chat novo', 'na pendência (ou em Resolver tudo).'],
          ['Toque em', 'Copiar o prompt', 'e depois em Abrir o Claude.'],
          ['No Claude, cole e envie.', '', 'Ele resolve passo a passo e marca aqui quando terminar.'],
        ].map(([a, b, c], n) => (
          <li key={n} className="flex items-start gap-2 rounded-2xl bg-white/70 px-3 py-2.5 ring-1 ring-verde-900/6">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-verde-100 text-[11px] font-extrabold text-verde-800">{n + 1}</span>
            <span>
              {a} {b && <b className="text-tinta">{b}</b>} {c}
            </span>
          </li>
        ))}
      </ol>

      {/* faixas de prioridade */}
      <div className="mt-6 space-y-6">
        {FAIXAS.map((f) => {
          const lista = comPendencia.filter((i) => i.prioridade === f.prioridade)
          if (!lista.length) return null
          return (
            <div key={f.prioridade}>
              <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-base font-extrabold">
                  {f.titulo} <span className="text-tinta-suave">· {lista.length}</span>
                </h3>
                <span className="text-xs text-tinta-suave">{f.dica}</span>
              </div>
              <div className="overflow-hidden rounded-3xl bg-white/85 ring-1 ring-verde-900/8">
                {lista.map((i, n) => (
                  <LinhaIdeia
                    key={i.id}
                    ideia={i}
                    numero={comPendencia.indexOf(i) + 1}
                    primeiraDaLista={n === 0}
                    aberta={aberta === i.id}
                    onAlternar={() => setAberta((a) => (a === i.id ? null : i.id))}
                    onPedido={(tarefa) => setPedido({ ideia: i, tarefa })}
                    onMarcar={(t) => marcar(i, t)}
                    onAbrir={() => onAbrir(i.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* sem pendência */}
      {semPendencia.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-base font-extrabold">
            Sem pendência <span className="text-tinta-suave">· {semPendencia.length}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {semPendencia.map((i) => (
              <button
                key={i.id}
                onClick={() => onAbrir(i.id)}
                className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-tinta ring-1 ring-verde-900/8 hover:bg-white"
              >
                <CircleCheck size={14} className="text-verde-600" /> {i.titulo}
              </button>
            ))}
          </div>
        </div>
      )}

    </section>
    {/* fora da seção animada: "fixed" dentro de um elemento com transform não cobre a tela */}
    <ModalPrompt pedido={promptAberto} onFechar={() => setPromptAberto(null)} />
    <ModalChatNovo pedido={pedido} onFechar={() => setPedido(null)} onRegistrar={(i) => onAtualizar(i.id, registroConversa(i, pedido?.tarefa?.texto))} />
    </>
  )
}

function registroConversa(i: Ideia, foco = ''): Partial<Ideia> {
  const agora = new Date().toISOString()
  const c = i.conversa_claude
  return {
    conversa_claude: {
      iniciada_em: agora,
      ultima_em: agora,
      retomadas: c ? c.retomadas : 0,
      tamanho: 'pequena',
      url: '',
      resumo: c?.resumo ?? '',
      ativa: true,
      foco: foco || 'Ajustes gerais',
    },
  }
}

function haQuanto(iso: string, agora: number) {
  const min = Math.max(0, Math.round((agora - Date.parse(iso)) / 60_000))
  if (min < 1) return 'agora'
  if (min < 60) return `há ${min} min`
  const h = Math.floor(min / 60)
  return `há ${h} h${min % 60 ? ` ${min % 60} min` : ''}`
}

const SITUACAO: Record<SituacaoSessao, { rotulo: string; cor: string }> = {
  trabalhando: { rotulo: 'Trabalhando', cor: 'bg-verde-500 text-white' },
  esperando: { rotulo: 'Esperando você', cor: 'bg-laranja-500 text-white' },
  parada: { rotulo: 'Parada', cor: 'bg-tinta-suave/15 text-tinta-suave' },
  encerrada: { rotulo: 'Encerrada', cor: 'bg-tinta-suave/15 text-tinta-suave' },
}

function MexendoAgora({
  sessoes,
  todas,
  ideias,
  agora,
  onAbrir,
  onEncerrar,
  onPararSessao,
  onPrompt,
}: {
  sessoes: Sessao[]
  todas: Ideia[]
  ideias: Ideia[]
  agora: number
  onAbrir: (id: string) => void
  onEncerrar: (i: Ideia) => void
  onPararSessao: (id: string) => void
  onPrompt: (p: PedidoPrompt) => void
}) {
  const total = sessoes.length + ideias.length
  const esperando = sessoes.filter((s) => s.situacao === 'esperando').length
  const nomeDa = (id: string) => todas.find((i) => i.id === id)?.titulo
  return (
    <div className="mt-4 rounded-3xl bg-white/85 p-4 ring-1 ring-verde-900/8">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-extrabold uppercase tracking-[0.14em] text-verde-700">
        <span className="relative flex h-2.5 w-2.5">
          {total > 0 && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde-400 opacity-75" />}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${total ? 'bg-verde-500' : 'bg-tinta-suave/40'}`} />
        </span>
        Mexendo agora · {total}
        {esperando > 0 && <span className="normal-case tracking-normal text-laranja-600">· {esperando} esperando você</span>}
      </div>
      {total === 0 ? (
        <p className="mt-2 text-sm text-tinta-suave">
          Nenhuma sessão aberta. Ao clicar em <b>Chat novo</b> ou <b>Iniciar conversa no Claude</b>, ela aparece aqui.
        </p>
      ) : (
        <ul className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {sessoes.map((s) => {
            const sit = SITUACAO[s.situacao] ?? SITUACAO.parada
            const ligadas = s.ideias.map((id) => [id, nomeDa(id)] as const).filter(([, n]) => n)
            const ideiasDa = s.ideias.map((id) => todas.find((i) => i.id === id)).filter(Boolean) as Ideia[]
            const pct = s.progresso ?? null // só o da própria conversa: a % da ideia pode estar em 100 e o trabalho novo não
            return (
              <li
                key={s.id}
                className={`flex min-w-0 flex-col gap-2 rounded-2xl px-3.5 py-3 ring-1 ${
                  s.situacao === 'esperando' ? 'bg-laranja-50 ring-laranja-200' : 'bg-verde-50 ring-verde-200'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 text-sm font-extrabold leading-snug text-tinta">{s.titulo || 'Sessão sem nome'}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${sit.cor}`}>{sit.rotulo}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2" title="Progresso desta conversa, gravado pela própria sessão">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-verde-500" style={{ width: `${pct ?? 0}%` }} />
                    </div>
                    <span className="text-[11px] font-extrabold tabular-nums text-tinta">{pct != null ? `${pct}%` : 'sem % ainda'}</span>
                  </div>
                  {s.detalhe && (
                    <p className="mt-1.5 line-clamp-2 text-xs text-tinta">
                      {s.situacao === 'esperando' && <b>Espera você: </b>}
                      {s.detalhe}
                    </p>
                  )}
                  {s.resumo && (
                    <details className="mt-1 text-xs text-tinta-suave">
                      <summary className="cursor-pointer font-bold text-verde-700">Resumo</summary>
                      <p className="mt-1 whitespace-pre-line leading-relaxed">{s.resumo}</p>
                    </details>
                  )}
                  <p className="mt-1 text-[11px] font-medium text-tinta-suave">
                    {ligadas.length ? (
                      <>
                        Ideia:{' '}
                        {ligadas.map(([id, nome], n) => (
                          <span key={id}>
                            {n > 0 && ' · '}
                            <button onClick={() => onAbrir(id)} className="font-bold text-verde-700 underline-offset-2 hover:underline">
                              {nome}
                            </button>
                          </span>
                        ))}
                      </>
                    ) : (
                      'Ideia nova, ainda sem card'
                    )}
                    {s.atividade_em && <> · ativa {haQuanto(s.atividade_em, agora)}</>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      onPrompt({
                        titulo: `Atualizar agora: ${s.titulo}`,
                        explicacao:
                          'Cole na própria sessão. Ela grava aqui o resumo, a porcentagem e o que espera de você, atualiza as ideias ligadas e continua de onde parou.',
                        prompt: promptAtualizarSessao(s, ideiasDa),
                        url: s.url || 'https://claude.ai/code',
                        destino: 'a sessão',
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-verde-600 px-3 py-1 text-xs font-bold text-white hover:bg-verde-700"
                  >
                    <RefreshCw size={12} /> Atualizar agora
                  </button>
                  <button
                    onClick={() =>
                      onPrompt({
                        titulo: `Nova conversa: ${s.titulo}`,
                        explicacao: 'Para continuar este trabalho numa conversa nova (mais barata), com o resumo e o contexto das ideias.',
                        prompt: promptNovaConversaSessao(s, ideiasDa),
                        url: 'https://claude.ai/code',
                        destino: 'Claude Code (sessão nova)',
                      })
                    }
                    className="rounded-full bg-white px-3 py-1 text-xs font-bold text-tinta ring-1 ring-verde-200 hover:bg-verde-100"
                  >
                    Prompt p/ nova conversa
                  </button>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-tinta ring-1 ring-verde-200 hover:bg-verde-100"
                    >
                      Abrir sessão <ArrowUpRight size={12} />
                    </a>
                  )}
                  <button
                    onClick={() => onPararSessao(s.id)}
                    className="rounded-full px-3 py-1 text-xs font-bold text-tinta-suave hover:bg-white"
                    title="Tirar do Mexendo agora"
                  >
                    Parar de acompanhar
                  </button>
                </div>
              </li>
            )
          })}
          {ideias.map((i) => {
            const c = i.conversa_claude!
            return (
              <li key={i.id} className="flex min-w-0 flex-col gap-2 rounded-2xl bg-verde-50 px-3.5 py-3 ring-1 ring-verde-200">
                <div className="flex min-w-0 items-start gap-2">
                  <Radio size={16} className="mt-0.5 shrink-0 text-verde-600" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-tinta" title={i.titulo}>
                      {i.titulo}
                    </p>
                    {c.foco && <p className="line-clamp-2 text-xs text-tinta-suave">{c.foco}</p>}
                    <p className="mt-0.5 text-[11px] font-medium text-tinta-suave">
                      Começou {haQuanto(c.iniciada_em, agora)} · último sinal {haQuanto(c.ultima_em, agora)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAbrir(i.id)}
                    className="rounded-full bg-white px-3 py-1 text-xs font-bold text-tinta ring-1 ring-verde-200 hover:bg-verde-100"
                  >
                    Abrir
                  </button>
                  <button
                    onClick={() => onEncerrar(i)}
                    className="rounded-full px-3 py-1 text-xs font-bold text-tinta-suave hover:bg-white"
                    title="Tirar do Mexendo agora (a sessão terminou)"
                  >
                    Encerrar
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function Numero({
  icone,
  valor,
  rotulo,
  nota,
  alerta = false,
}: {
  icone: ReactNode
  valor: number
  rotulo: string
  nota: string
  alerta?: boolean
}) {
  return (
    <div className={`min-w-0 rounded-3xl px-4 py-3.5 ring-1 ${alerta ? 'bg-laranja-50 ring-laranja-200' : 'bg-white/85 ring-verde-900/8'}`}>
      <div className={`flex items-center gap-1.5 text-xs font-bold ${alerta ? 'text-laranja-700' : 'text-tinta-suave'}`}>
        {icone} {rotulo}
      </div>
      <div className={`mt-1 text-[28px] font-extrabold leading-none tabular-nums ${alerta ? 'text-laranja-600' : 'text-tinta'}`}>{valor}</div>
      <div className="mt-1 truncate text-[11px] font-medium text-tinta-suave" title={nota}>
        {nota}
      </div>
    </div>
  )
}

function ChipRitmo({ ideia }: { ideia: Ideia }) {
  const dias = diasDesde(ideia.analise?.ultimo_avanco)
  const r = ritmo(dias)
  const estilo = {
    andando: 'bg-verde-50 text-verde-700 ring-verde-200',
    parando: 'bg-laranja-50 text-laranja-700 ring-laranja-200',
    parado: 'bg-red-50 text-red-700 ring-red-100',
    sem_data: 'bg-slate-50 text-slate-500 ring-slate-200',
  }[r]
  const texto =
    r === 'sem_data'
      ? 'sem data'
      : r === 'andando'
        ? dias === 0
          ? 'andou hoje'
          : `andou há ${dias} ${dias === 1 ? 'dia' : 'dias'}`
        : `parada há ${dias} dias`
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ${estilo}`}>
      <Clock size={11} /> {texto}
    </span>
  )
}

function LinhaIdeia({
  ideia: i,
  numero,
  primeiraDaLista,
  aberta,
  onAlternar,
  onPedido,
  onMarcar,
  onAbrir,
}: {
  ideia: Ideia
  numero: number
  primeiraDaLista: boolean
  aberta: boolean
  onAlternar: () => void
  onPedido: (t: Tarefa | null) => void
  onMarcar: (t: Tarefa) => void
  onAbrir: () => void
}) {
  const pendentes = pendentesDe(i)
  const a = i.analise
  return (
    <div className={primeiraDaLista ? '' : 'border-t border-verde-900/6'}>
      <button
        onClick={onAlternar}
        aria-expanded={aberta}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-verde-50/50 md:px-5"
      >
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-verde-900/6 text-xs font-extrabold tabular-nums text-tinta">
          {numero}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[15px] font-extrabold leading-snug">{i.titulo}</span>
            <PillStatus status={i.status} />
            <ChipRitmo ideia={i} />
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-tinta-suave">
            <b className="font-semibold text-tinta">
              {pendentes.length} {pendentes.length === 1 ? 'pendência' : 'pendências'}
            </b>
            {' · '}próxima: {pendentes[0]?.texto}
          </span>
          <span className="mt-2 flex max-w-xs items-center gap-2">
            <BarraProgresso valor={i.progresso} />
            <span className="w-9 text-right text-[11px] font-bold tabular-nums text-verde-700">{i.progresso}%</span>
          </span>
        </span>
        <ChevronDown size={18} className={`mt-1 shrink-0 text-tinta-suave transition-transform ${aberta ? 'rotate-180' : ''}`} />
      </button>

      {aberta && (
        <div className="grid gap-4 px-4 pb-5 md:grid-cols-2 md:px-5">
          {/* análise */}
          <div className="min-w-0 space-y-3">
            <Bloco titulo="Descrição">{i.resumo_detalhado || i.resumo || 'Sem descrição.'}</Bloco>
            {a?.situacao && <Bloco titulo="Como está">{a.situacao}</Bloco>}
            {a?.sugestao && (
              <Bloco titulo="Minha sugestão" destaque>
                {a.sugestao}
              </Bloco>
            )}
            {!!a?.corrigido?.length && (
              <div className="rounded-2xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-200">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-600">
                  <Wrench size={12} /> Corrigido nesta revisão
                </p>
                <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-600">
                  {a.corrigido.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-[11px] text-tinta-suave">
              Último avanço: <b className="text-tinta">{dataCurta(a?.ultimo_avanco)}</b>
              {a?.fonte ? ` (${a.fonte})` : ''}
            </p>
          </div>

          {/* pendências */}
          <div className="min-w-0">
            <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Pendências, na ordem</p>
            <ul className="space-y-2">
              {pendentes.map((t, n) => (
                <li key={t.id} className="flex items-start gap-2.5 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-verde-900/8">
                  <button
                    onClick={() => onMarcar(t)}
                    aria-label={`Marcar como feita: ${t.texto}`}
                    title="Marcar como feita"
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-white ring-2 ring-verde-900/15 hover:ring-verde-500"
                  />
                  <span className="min-w-0 flex-1 text-[13px] leading-snug">
                    <span className="mr-1 font-bold text-tinta-suave">{n + 1}.</span>
                    {t.texto}
                  </span>
                  <button
                    onClick={() => onPedido(t)}
                    className="flex shrink-0 items-center gap-1 rounded-xl bg-laranja-50 px-2.5 py-1.5 text-xs font-bold text-laranja-700 ring-1 ring-laranja-200 hover:bg-laranja-100"
                  >
                    <MessageSquarePlus size={13} /> Chat novo
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => onPedido(null)}
                className="btn-verde flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold"
              >
                <MessageSquarePlus size={16} /> Resolver tudo, item a item
              </button>
              <button
                onClick={onAbrir}
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-tinta ring-1 ring-verde-900/10 hover:bg-verde-50"
              >
                <PanelRightOpen size={15} /> Ficha completa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Bloco({ titulo, children, destaque = false }: { titulo: string; children: ReactNode; destaque?: boolean }) {
  return (
    <div className={destaque ? 'rounded-2xl bg-laranja-50/70 px-3.5 py-3 ring-1 ring-laranja-200' : ''}>
      <p className={`mb-0.5 text-[11px] font-extrabold uppercase tracking-[0.12em] ${destaque ? 'text-laranja-700' : 'text-tinta-suave'}`}>{titulo}</p>
      <p className="whitespace-pre-line text-[13px] leading-relaxed text-tinta">{children}</p>
    </div>
  )
}

/** Janela que prepara a conversa nova: copiar o prompt, abrir o Claude e colar. */
function ModalChatNovo({ pedido, onFechar, onRegistrar }: { pedido: Pedido | null; onFechar: () => void; onRegistrar: (i: Ideia) => void }) {
  const [copiado, setCopiado] = useState(false)
  const [verPrompt, setVerPrompt] = useState(false)
  const [falhou, setFalhou] = useState(false)
  const areaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCopiado(false)
    setVerPrompt(false)
    setFalhou(false)
  }, [pedido])

  useEffect(() => {
    if (!pedido) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pedido, onFechar])

  if (!pedido) return null
  const { ideia, tarefa } = pedido
  const prompt = tarefa ? promptPendencia(ideia, tarefa) : promptConversaNova(ideia)
  const destino = destinoConversa(ideia)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiado(true)
      setFalhou(false)
    } catch {
      setFalhou(true)
      setVerPrompt(true)
      setTimeout(() => areaRef.current?.select(), 50)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-tinta/40 p-4 backdrop-blur-[2px] sm:items-center" onClick={onFechar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-chat-novo"
        onClick={(e) => e.stopPropagation()}
        className="rolagem-fina max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-laranja-600">Conversa nova no Claude</p>
            <h3 id="titulo-chat-novo" className="mt-0.5 text-lg font-extrabold leading-snug">
              {tarefa ? tarefa.texto : `Resolver tudo de “${ideia.titulo}”`}
            </h3>
            {tarefa && <p className="mt-0.5 text-xs text-tinta-suave">{ideia.titulo}</p>}
          </div>
          <button onClick={onFechar} aria-label="Fechar" className="rounded-xl p-1.5 text-tinta-suave hover:bg-verde-50">
            <X size={18} />
          </button>
        </div>

        <ol className="mt-4 space-y-3">
          <Passo n={1} feito={copiado}>
            <button onClick={copiar} className="btn-laranja flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold">
              {copiado ? <Check size={16} /> : <Copy size={16} />} {copiado ? 'Prompt copiado' : 'Copiar o prompt'}
            </button>
            {falhou && <p className="mt-1.5 text-xs font-semibold text-laranja-700">Não consegui copiar sozinho. O prompt está selecionado abaixo: aperte Ctrl+C.</p>}
          </Passo>
          <Passo n={2}>
            <a
              href={destino.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onRegistrar(ideia)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-tinta px-4 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Abrir o {destino.nome} <ArrowUpRight size={16} />
            </a>
            <p className="mt-1.5 text-xs leading-relaxed text-tinta-suave">{destino.instrucao}</p>
          </Passo>
          <Passo n={3}>
            <p className="text-sm leading-relaxed">
              Cole com <b>Ctrl+V</b> (no celular: toque e segure → Colar) e envie. O Claude vai um passo por vez e espera a sua resposta.
            </p>
          </Passo>
        </ol>

        <button
          onClick={() => setVerPrompt((v) => !v)}
          className="mt-4 flex items-center gap-1 text-xs font-bold text-verde-700 hover:text-verde-800"
          aria-expanded={verPrompt}
        >
          <ChevronDown size={14} className={verPrompt ? 'rotate-180' : ''} /> {verPrompt ? 'Esconder o prompt' : 'Ver o prompt'}
        </button>
        {verPrompt && (
          <textarea
            ref={areaRef}
            id="prompt-chat-novo"
            readOnly
            value={prompt}
            onFocus={(e) => e.currentTarget.select()}
            className="rolagem-fina mt-2 h-48 w-full resize-y rounded-2xl bg-slate-50 p-3 font-mono text-[11px] leading-relaxed text-tinta ring-1 ring-slate-200 outline-none"
          />
        )}
      </div>
    </div>
  )
}

function Passo({ n, feito = false, children }: { n: number; feito?: boolean; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
          feito ? 'btn-verde' : 'bg-verde-100 text-verde-800'
        }`}
      >
        {feito ? <Check size={13} /> : n}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  )
}

type PedidoPrompt = { titulo: string; explicacao: string; prompt: string; url: string; destino: string }

/** Janela genérica: copia o prompt e abre o Claude (o site não roda o Claude sozinho). */
function ModalPrompt({ pedido, onFechar }: { pedido: PedidoPrompt | null; onFechar: () => void }) {
  const [copiado, setCopiado] = useState(false)
  const [ver, setVer] = useState(false)
  const areaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCopiado(false)
    setVer(false)
  }, [pedido])

  useEffect(() => {
    if (!pedido) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pedido, onFechar])

  if (!pedido) return null

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(pedido.prompt)
      setCopiado(true)
    } catch {
      setVer(true)
      setTimeout(() => areaRef.current?.select(), 50)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-tinta/40 p-4 backdrop-blur-[2px] sm:items-center" onClick={onFechar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-prompt"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[28px] bg-white p-5 shadow-2xl md:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 id="titulo-modal-prompt" className="text-lg font-extrabold leading-snug text-tinta">
            {pedido.titulo}
          </h3>
          <button onClick={onFechar} aria-label="Fechar" className="rounded-full p-1 text-tinta-suave hover:bg-verde-50">
            <X size={18} />
          </button>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-tinta-suave">{pedido.explicacao}</p>
        <ol className="mt-4 space-y-2 text-sm text-tinta">
          <li>
            <b>1.</b> Copie o prompt.
          </li>
          <li>
            <b>2.</b> Abra {pedido.destino}, cole (Ctrl+V) e envie.
          </li>
        </ol>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button onClick={copiar} className="btn-laranja flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold">
            {copiado ? <Check size={16} /> : <Copy size={16} />} {copiado ? 'Copiado!' : 'Copiar o prompt'}
          </button>
          <a
            href={pedido.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-tinta px-4 py-3 text-sm font-bold text-white hover:bg-tinta/90"
          >
            Abrir {pedido.destino} <ArrowUpRight size={16} />
          </a>
        </div>
        <button onClick={() => setVer((v) => !v)} className="mt-3 text-xs font-bold text-verde-700 hover:underline">
          {ver ? 'Esconder o prompt' : 'Ver o prompt'}
        </button>
        {ver && (
          <textarea
            ref={areaRef}
            readOnly
            value={pedido.prompt}
            className="mt-2 h-48 w-full resize-y rounded-2xl border border-verde-200 bg-verde-50/50 p-3 font-mono text-[11px] leading-relaxed text-tinta"
          />
        )}
      </div>
    </div>
  )
}
