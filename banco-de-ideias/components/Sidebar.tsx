'use client'
import type { Conexao, ConexaoId, Ideia } from '@/lib/tipos'
import { BarraProgresso, BolinhaStatus, ICONE_CONEXAO, Icone3D, StatusConexao } from './ui'

const ORDEM_STATUS = { em_andamento: 0, pausado: 1, no_ar: 2 }

export default function Sidebar({
  ideias,
  conexoes,
  selecionadaId,
  aberta,
  onFechar,
  onAbrirIdeia,
  onAbrirConexao,
}: {
  ideias: Ideia[]
  conexoes: Conexao[]
  selecionadaId: string | null
  aberta: boolean
  onFechar: () => void
  onAbrirIdeia: (id: string) => void
  onAbrirConexao: (id: ConexaoId) => void
}) {
  const lista = [...ideias].sort((a, b) => ORDEM_STATUS[a.status] - ORDEM_STATUS[b.status] || b.progresso - a.progresso)
  return (
    <>
      <div
        onClick={onFechar}
        className={`fixed inset-0 z-30 bg-tinta/30 backdrop-blur-[2px] transition-opacity lg:hidden ${
          aberta ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`vidro rolagem-fina max-lg:bg-white/95 fixed bottom-0 left-0 top-[61px] z-40 w-[300px] overflow-y-auto border-y-0 border-l-0 transition-transform duration-500 ease-[var(--ease-mola)] lg:sticky lg:z-10 lg:h-[calc(100dvh-61px)] lg:translate-x-0 ${
          aberta ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* conexões */}
        <section className="p-4">
          <h3 className="mb-2.5 px-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Conexões</h3>
          <div className="grid grid-cols-2 gap-2">
            {conexoes.map((c) => {
              const ic = ICONE_CONEXAO[c.id]
              const abertas = c.pendencias.filter((p) => !p.resolvida).length
              return (
                <button
                  key={c.id}
                  onClick={() => onAbrirConexao(c.id)}
                  className="cartao group relative flex flex-col items-start gap-2 rounded-2xl p-2.5 text-left"
                  title={c.detalhe}
                >
                  <Icone3D icone={ic.icone} de={ic.de} ate={ic.ate} tamanho={30} />
                  <div className="w-full min-w-0">
                    <div className="truncate text-[13px] font-bold">{c.nome}</div>
                    <StatusConexao status={c.status} />
                  </div>
                  {abertas > 0 && (
                    <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-laranja-500 text-[10px] font-bold text-white shadow">
                      {abertas}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* ideias */}
        <section className="px-3 pb-6">
          <h3 className="mb-1.5 flex items-center px-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-tinta-suave">
            Ideias <span className="ml-auto rounded-full bg-verde-100 px-2 py-0.5 text-verde-700">{ideias.length}</span>
          </h3>
          <ul className="space-y-0.5">
            {lista.map((i) => (
              <li key={i.id}>
                <button
                  onClick={() => onAbrirIdeia(i.id)}
                  className={`group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors ${
                    selecionadaId === i.id ? 'bg-white shadow-sm ring-1 ring-laranja-200' : 'hover:bg-white/70'
                  }`}
                >
                  <Icone3D categoria={i.categoria} tamanho={28} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[13px] font-semibold">{i.titulo}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <BarraProgresso valor={i.progresso} />
                      <span className="w-8 shrink-0 text-right text-[10px] font-bold text-tinta-suave">{i.progresso}%</span>
                    </div>
                  </div>
                  <BolinhaStatus status={i.status} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  )
}
