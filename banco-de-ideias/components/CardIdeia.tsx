'use client'
import { useEffect, useRef, useState } from 'react'
import { Archive, ArrowRight, Ellipsis, MessagesSquare, Pause, Play, Sparkles, Trash } from 'lucide-react'
import type { Ideia, Status } from '@/lib/tipos'
import { BarraProgresso, Icone3D, IndicadorFase, PillPrioridade, PillStatus } from './ui'

export default function CardIdeia({
  ideia,
  motivo,
  destaque,
  indice = 0,
  onAbrir,
  onConversar,
  onStatus,
  onExcluir,
}: {
  ideia: Ideia
  motivo?: string
  destaque?: boolean
  indice?: number
  onAbrir: () => void
  onConversar?: () => void
  onStatus?: (s: Status) => void
  onExcluir?: () => void
}) {
  const proxima = ideia.tarefas.find((t) => !t.feito)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onAbrir}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onAbrir())}
      style={{ animationDelay: `${Math.min(indice, 10) * 45}ms` }}
      className={`cartao group relative flex animate-entrar cursor-pointer has-[[aria-expanded=true]]:z-30 flex-col rounded-3xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-laranja-400 ${
        destaque ? 'ring-2 ring-laranja-300' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <Icone3D categoria={ideia.categoria} tamanho={52} />
        <div className="flex items-start gap-1">
          <div className="flex flex-col items-end gap-1.5">
            <PillStatus status={ideia.status} />
            <PillPrioridade prioridade={ideia.prioridade} />
          </div>
          {onStatus && onExcluir && <MenuAcoes status={ideia.status} onStatus={onStatus} onExcluir={onExcluir} />}
        </div>
      </div>

      <h3 className="mt-4 text-[17px] font-extrabold leading-snug tracking-tight">{ideia.titulo}</h3>
      <div className="mt-0.5 text-xs font-semibold text-tinta-suave">{ideia.categoria}</div>

      {motivo && (
        <p className="mt-3 flex gap-1.5 rounded-xl bg-laranja-50 px-3 py-2 text-xs font-medium text-laranja-700">
          <Sparkles size={14} className="mt-px shrink-0" />
          {motivo}
        </p>
      )}

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-tinta-suave">{ideia.resumo}</p>

      <div className="mt-auto pt-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="w-28">
            <IndicadorFase fase={ideia.fase} compacto />
          </div>
          <span className="text-sm font-extrabold text-verde-700">{ideia.progresso}%</span>
        </div>
        <BarraProgresso valor={ideia.progresso} />
        {proxima && (
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-tinta">
            <ArrowRight size={14} className="shrink-0 text-laranja-500" />
            <span className="truncate">{proxima.texto}</span>
          </div>
        )}
      </div>

      {onConversar && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onConversar()
          }}
          className="absolute bottom-4 right-4 grid size-9 translate-y-1 place-items-center rounded-xl bg-white text-verde-700 opacity-0 shadow-md ring-1 ring-verde-900/8 transition-all group-hover:translate-y-0 group-hover:opacity-100"
          title="Continuar conversa"
          aria-label="Continuar conversa"
        >
          <MessagesSquare size={16} />
        </button>
      )}
    </div>
  )
}

/** Menu "⋯" do card: pausar (stand-by), retomar, arquivar (sai do painel) e excluir de vez. */
function MenuAcoes({ status, onStatus, onExcluir }: { status: Status; onStatus: (s: Status) => void; onExcluir: () => void }) {
  const [aberto, setAberto] = useState(false)
  const [confirmar, setConfirmar] = useState(false)
  const caixa = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberto) return
    const fora = (e: PointerEvent) => !caixa.current?.contains(e.target as Node) && fechar()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar()
    document.addEventListener('pointerdown', fora)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', fora)
      document.removeEventListener('keydown', esc)
    }
  }, [aberto])

  function fechar() {
    setAberto(false)
    setConfirmar(false)
  }
  const acao = (f: () => void) => () => {
    f()
    fechar()
  }

  const itens: { icone: typeof Pause; titulo: string; dica: string; f: () => void; cor?: string }[] = []
  if (status === 'em_andamento' || status === 'no_ar')
    itens.push({ icone: Pause, titulo: 'Pausar (stand-by)', dica: 'Fica em Pausadas, fora do foco', f: () => onStatus('pausado') })
  if (status === 'pausado' || status === 'arquivado')
    itens.push({ icone: Play, titulo: 'Retomar', dica: 'Volta para Em andamento', f: () => onStatus('em_andamento'), cor: 'text-verde-700' })
  if (status !== 'arquivado')
    itens.push({ icone: Archive, titulo: 'Arquivar', dica: 'Sai do painel; recupere em Arquivadas', f: () => onStatus('arquivado') })

  return (
    <div ref={caixa} className="relative" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      <button
        onClick={() => (aberto ? fechar() : setAberto(true))}
        className={`grid size-8 place-items-center rounded-xl text-tinta-suave transition-colors hover:bg-verde-50 hover:text-tinta ${
          aberto ? 'bg-verde-50 text-tinta' : ''
        }`}
        aria-label="Ações da ideia"
        aria-expanded={aberto}
      >
        <Ellipsis size={18} />
      </button>
      {aberto && (
        <div className="absolute right-0 top-9 z-20 w-64 animate-entrar rounded-2xl bg-white p-1.5 text-left shadow-[0_18px_40px_-12px_rgb(19_38_29/.35)] ring-1 ring-verde-900/8">
          {itens.map(({ icone: I, titulo, dica, f, cor }) => (
            <button key={titulo} onClick={acao(f)} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-verde-50">
              <I size={16} className={`mt-0.5 shrink-0 ${cor ?? 'text-tinta-suave'}`} />
              <span>
                <span className={`block text-sm font-bold ${cor ?? 'text-tinta'}`}>{titulo}</span>
                <span className="block text-xs text-tinta-suave">{dica}</span>
              </span>
            </button>
          ))}
          <div className="my-1 h-px bg-verde-900/6" />
          {confirmar ? (
            <div className="rounded-xl bg-red-50 px-3 py-2.5">
              <p className="text-xs font-semibold text-red-700">Apagar esta ideia e a conversa dela? Não dá para desfazer.</p>
              <div className="mt-2 flex gap-2">
                <button onClick={acao(onExcluir)} className="rounded-lg bg-red-600 px-3 py-1 text-xs font-bold text-white hover:bg-red-700">
                  Excluir
                </button>
                <button onClick={() => setConfirmar(false)} className="rounded-lg px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-100">
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirmar(true)} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-red-50">
              <Trash size={16} className="mt-0.5 shrink-0 text-red-500" />
              <span>
                <span className="block text-sm font-bold text-red-600">Excluir de vez</span>
                <span className="block text-xs text-tinta-suave">Apaga a ideia e o histórico</span>
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
