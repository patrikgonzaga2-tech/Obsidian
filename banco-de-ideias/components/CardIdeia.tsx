'use client'
import { ArrowRight, MessagesSquare, Sparkles } from 'lucide-react'
import type { Ideia } from '@/lib/tipos'
import { BarraProgresso, Icone3D, IndicadorFase, PillPrioridade, PillStatus } from './ui'

export default function CardIdeia({
  ideia,
  motivo,
  destaque,
  indice = 0,
  onAbrir,
  onConversar,
}: {
  ideia: Ideia
  motivo?: string
  destaque?: boolean
  indice?: number
  onAbrir: () => void
  onConversar?: () => void
}) {
  const proxima = ideia.tarefas.find((t) => !t.feito)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onAbrir}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onAbrir())}
      style={{ animationDelay: `${Math.min(indice, 10) * 45}ms` }}
      className={`cartao group relative flex animate-entrar cursor-pointer flex-col rounded-3xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-laranja-400 ${
        destaque ? 'ring-2 ring-laranja-300' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <Icone3D categoria={ideia.categoria} tamanho={52} />
        <div className="flex flex-col items-end gap-1.5">
          <PillStatus status={ideia.status} />
          <PillPrioridade prioridade={ideia.prioridade} />
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
