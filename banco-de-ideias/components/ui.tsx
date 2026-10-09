'use client'
import {
  Bot,
  Clapperboard,
  CodeXml,
  Database,
  GraduationCap,
  GitBranch,
  Globe,
  HardDrive,
  HeartPulse,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  Smartphone,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import type { ConexaoId, ConexaoStatus, Fase, Prioridade, Status } from '@/lib/tipos'
import { FASES, FASE_LABEL, PRIORIDADE_LABEL, STATUS_LABEL } from '@/lib/tipos'
import { norm } from '@/lib/busca-local'

// ---------- ícone 3D por categoria ----------
const TEMAS: { chaves: string[]; icone: LucideIcon; de: string; ate: string; sombra: string }[] = [
  { chaves: ['video', 'edicao', 'reels'], icone: Clapperboard, de: '#fb923c', ate: '#ea580c', sombra: 'rgb(234 88 12 / .55)' },
  { chaves: ['site', 'pagina', 'landing'], icone: Globe, de: '#34d483', ate: '#047843', sombra: 'rgb(4 120 67 / .55)' },
  { chaves: ['app', 'painel', 'sistema'], icone: Smartphone, de: '#4ade80', ate: '#059651', sombra: 'rgb(5 150 81 / .55)' },
  { chaves: ['venda', 'marketing', 'oferta', 'funil'], icone: Megaphone, de: '#fdba74', ate: '#f97316', sombra: 'rgb(249 115 22 / .55)' },
  { chaves: ['curso', 'conteudo', 'aula', 'desafio'], icone: GraduationCap, de: '#6ee7a8', ate: '#10b964', sombra: 'rgb(16 185 100 / .55)' },
  { chaves: ['automa', 'ia', 'agente', 'bot'], icone: Bot, de: '#34d399', ate: '#065f38', sombra: 'rgb(6 95 56 / .55)' },
  { chaves: ['codigo', 'code', 'api'], icone: CodeXml, de: '#86efac', ate: '#047843', sombra: 'rgb(4 120 67 / .5)' },
  { chaves: ['financ', 'dinheiro'], icone: Wallet, de: '#fcd34d', ate: '#f59e0b', sombra: 'rgb(245 158 11 / .55)' },
  { chaves: ['saude', 'treino'], icone: HeartPulse, de: '#fda4af', ate: '#f97316', sombra: 'rgb(249 115 22 / .5)' },
]
const PADRAO = { icone: Lightbulb, de: '#fdba74', ate: '#ea580c', sombra: 'rgb(234 88 12 / .5)' }

export function temaDaCategoria(categoria: string) {
  // casa pelo começo de cada palavra ("ia" não pode casar com "ideia")
  const palavras = norm(categoria).split(/[^a-z0-9]+/).filter(Boolean)
  return TEMAS.find((t) => t.chaves.some((c) => palavras.some((w) => w.startsWith(c)))) ?? PADRAO
}

export function Icone3D({
  categoria,
  icone,
  tamanho = 48,
  de,
  ate,
}: {
  categoria?: string
  icone?: LucideIcon
  tamanho?: number
  de?: string
  ate?: string
}) {
  const t = temaDaCategoria(categoria ?? '')
  const Icone = icone ?? t.icone
  return (
    <div
      className="icone3d shrink-0"
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: tamanho * 0.3,
        background: `linear-gradient(145deg, ${de ?? t.de}, ${ate ?? t.ate})`,
        ['--sombra' as string]: t.sombra,
      }}
    >
      <Icone color="white" size={tamanho * 0.5} strokeWidth={2.2} />
    </div>
  )
}

export const ICONE_CONEXAO: Record<ConexaoId, { icone: LucideIcon; de: string; ate: string }> = {
  supabase: { icone: Database, de: '#4ade80', ate: '#047843' },
  github: { icone: GitBranch, de: '#64748b', ate: '#1e293b' },
  desktop: { icone: HardDrive, de: '#fdba74', ate: '#ea580c' },
  chats: { icone: MessagesSquare, de: '#34d483', ate: '#f97316' },
}

// ---------- status ----------
const COR_STATUS: Record<Status, string> = {
  em_andamento: 'bg-laranja-500',
  no_ar: 'bg-verde-500',
  pausado: 'bg-slate-400',
}
const PILL_STATUS: Record<Status, string> = {
  em_andamento: 'bg-laranja-100 text-laranja-700',
  no_ar: 'bg-verde-100 text-verde-700',
  pausado: 'bg-slate-100 text-slate-600',
}

export function BolinhaStatus({ status, className = '' }: { status: Status; className?: string }) {
  return (
    <span className={`relative inline-flex size-2.5 shrink-0 ${className}`} title={STATUS_LABEL[status]}>
      {status === 'no_ar' && <span className="absolute inset-0 animate-ping rounded-full bg-verde-400 opacity-60" />}
      <span className={`relative inline-flex size-2.5 rounded-full ${COR_STATUS[status]} ring-2 ring-white`} />
    </span>
  )
}

export function PillStatus({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${PILL_STATUS[status]}`}>
      <BolinhaStatus status={status} />
      {STATUS_LABEL[status]}
    </span>
  )
}

const COR_CONEXAO: Record<ConexaoStatus, { dot: string; texto: string; label: string }> = {
  conectado: { dot: 'bg-verde-500', texto: 'text-verde-700', label: 'Conectado' },
  pendente: { dot: 'bg-laranja-500', texto: 'text-laranja-700', label: 'Pendências' },
  desconectado: { dot: 'bg-slate-300', texto: 'text-slate-500', label: 'Não conectado' },
}
export function StatusConexao({ status }: { status: ConexaoStatus }) {
  const c = COR_CONEXAO[status]
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${c.texto}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

const COR_PRIORIDADE: Record<Prioridade, string> = {
  alta: 'text-laranja-600 bg-laranja-50 ring-laranja-200',
  media: 'text-verde-700 bg-verde-50 ring-verde-200',
  baixa: 'text-slate-500 bg-slate-50 ring-slate-200',
}
export function PillPrioridade({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ring-1 ${COR_PRIORIDADE[prioridade]}`}>
      {PRIORIDADE_LABEL[prioridade]}
    </span>
  )
}

// ---------- progresso e fase ----------
export function BarraProgresso({ valor, alto = false }: { valor: number; alto?: boolean }) {
  return (
    <div className={`barra-progresso w-full overflow-hidden rounded-full bg-verde-900/8 ${alto ? 'h-2.5' : 'h-1.5'}`}>
      <span className="block h-full rounded-full" style={{ width: `${Math.max(3, valor)}%` }} />
    </div>
  )
}

/** Indicador Início → Meio → Fim. */
export function IndicadorFase({ fase, compacto = false, onMudar }: { fase: Fase; compacto?: boolean; onMudar?: (f: Fase) => void }) {
  const atual = FASES.indexOf(fase)
  return (
    <div className="flex items-center">
      {FASES.map((f, i) => {
        const feita = i < atual
        const ativa = i === atual
        return (
          <div key={f} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              disabled={!onMudar}
              onClick={() => onMudar?.(f)}
              className={`flex items-center gap-1.5 ${onMudar ? 'cursor-pointer' : 'cursor-default'}`}
              title={onMudar ? `Mudar para ${FASE_LABEL[f]}` : FASE_LABEL[f]}
            >
              <span
                className={`grid place-items-center rounded-full font-bold transition-all duration-500 ${
                  compacto ? 'size-4 text-[9px]' : 'size-8 text-xs'
                } ${
                  ativa
                    ? 'btn-laranja scale-110'
                    : feita
                      ? 'btn-verde'
                      : 'bg-white text-tinta-suave ring-1 ring-verde-900/10'
                }`}
              >
                {feita ? '✓' : compacto ? '' : i + 1}
              </span>
              {!compacto && (
                <span className={`text-xs font-semibold ${ativa ? 'text-laranja-600' : feita ? 'text-verde-700' : 'text-tinta-suave'}`}>
                  {FASE_LABEL[f]}
                </span>
              )}
            </button>
            {i < FASES.length - 1 && (
              <span className={`mx-1.5 h-0.5 flex-1 rounded-full ${i < atual ? 'bg-verde-400' : 'bg-verde-900/10'} ${compacto ? 'min-w-3' : 'min-w-4'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
