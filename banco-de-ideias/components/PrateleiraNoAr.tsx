'use client'
import { ArrowUpRight, Info, Radio } from 'lucide-react'
import type { Ideia } from '@/lib/tipos'
import { chaveIcone, Icone3D } from './ui'

const host = (u: string) => {
  try {
    const h = new URL(u).host.replace(/^www\./, '')
    return h === 'claude.ai' ? 'painel no Claude' : h
  } catch {
    return u
  }
}

/** Prateleira horizontal com o que já está publicado: clique abre o produto. */
export default function PrateleiraNoAr({ ideias, onDetalhes }: { ideias: Ideia[]; onDetalhes: (id: string) => void }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="relative grid size-6 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-verde-400/40" />
          <Radio size={16} className="relative text-verde-600" />
        </span>
        <h2 className="text-lg font-extrabold">No ar</h2>
        <span className="text-xs font-semibold text-tinta-suave">clique para usar</span>
      </div>
      {ideias.length === 0 ? (
        <div className="rounded-3xl bg-white/60 px-5 py-6 text-sm text-tinta-suave ring-1 ring-verde-900/5">
          Quando uma ideia for publicada, mude o status para “No ar” e ela aparece aqui.
        </div>
      ) : (
        <div className="sem-rolagem -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 pt-1 md:-mx-8 md:px-8">
          {ideias.map((i, n) => {
            const temUrl = Boolean(i.url_produto)
            return (
              <div
                key={i.id}
                style={{ animationDelay: `${n * 60}ms` }}
                className="group relative w-72 shrink-0 animate-entrar snap-start overflow-hidden rounded-3xl p-[1.5px] transition-transform duration-500 ease-[var(--ease-mola)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-verde-300 via-verde-500 to-laranja-400" />
                {(() => {
                  const classe =
                    'relative flex h-full w-full flex-col rounded-[22px] bg-gradient-to-br from-white via-white to-verde-50 p-4 text-left shadow-[0_18px_30px_-18px_rgb(5_150_81/.6)]'
                  const conteudo = (
                    <>
                  <div className="flex items-center gap-3 pr-7">
                    <Icone3D categoria={chaveIcone(i)} tamanho={44} />
                    <div className="min-w-0">
                      <div className="truncate text-[15px] font-extrabold">{i.titulo}</div>
                      <div className="truncate text-xs font-semibold text-verde-700">
                        {temUrl ? host(i.url_produto!) : 'sem link — clique para adicionar'}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-tinta-suave">{i.resumo}</p>
                  {!!i.comandos?.length && (
                    <span className="mt-2 text-[11px] font-bold text-verde-700">{i.comandos.length} {i.comandos.length === 1 ? 'comando' : 'comandos'} · toque em ⓘ para ver</span>
                  )}
                  <span
                    className={`mt-3 inline-flex w-fit items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold ${
                      temUrl ? 'btn-verde' : 'bg-laranja-100 text-laranja-700'
                    }`}
                  >
                    {temUrl ? (
                      <>
                        Usar agora <ArrowUpRight size={14} />
                      </>
                    ) : (
                      'Adicionar link'
                    )}
                  </span>
                    </>
                  )
                  return temUrl ? (
                    <a href={i.url_produto!} target="_blank" rel="noopener noreferrer" className={classe}>
                      {conteudo}
                    </a>
                  ) : (
                    <button onClick={() => onDetalhes(i.id)} className={classe}>
                      {conteudo}
                    </button>
                  )
                })()}
                <button
                  onClick={() => onDetalhes(i.id)}
                  className="absolute right-3 top-3 grid size-7 place-items-center rounded-lg bg-white/90 text-tinta-suave opacity-0 shadow ring-1 ring-verde-900/8 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                  title="Detalhes"
                  aria-label="Detalhes"
                >
                  <Info size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
