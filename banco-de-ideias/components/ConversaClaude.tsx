'use client'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, CircleAlert, Copy, MessageCircleQuestion, RotateCcw, Sparkles } from 'lucide-react'
import type { ConversaClaude as Conv, Ideia } from '@/lib/tipos'
import {
  destinoConversa,
  LIMITE_RESPOSTAS,
  promptConversaNova,
  promptRetomarConversa,
  recomendarConversa,
} from '@/lib/contexto'
import type { Config } from './Hub'
import Conversa from './Conversa'

/**
 * Aba Conversa: prepara e abre a conversa DE VERDADE no Claude (Claude Code ou chat) para configurar
 * a ideia/agente item a item. Antes, mostra o que precisa ser feito fora do Claude (com "Resolvido"),
 * e decide se vale continuar a conversa atual ou começar outra (conversas longas ficam caras).
 */
export default function ConversaClaude({
  ideia: i,
  config,
  onAtualizar,
  onHistorico,
}: {
  ideia: Ideia
  config: Config
  onAtualizar: (patch: Partial<Ideia>) => void
  onHistorico: () => void
}) {
  const preparos = i.preparos ?? []
  const pendentes = preparos.filter((p) => !p.feito)
  const conv = i.conversa_claude ?? null
  const rec = recomendarConversa(i)
  const destino = destinoConversa(i)
  const [ignorarPreparos, setIgnorarPreparos] = useState(false)
  const [verPrompt, setVerPrompt] = useState(false)
  const [aviso, setAviso] = useState('')
  const [rapida, setRapida] = useState(false)
  const [link, setLink] = useState(conv?.url ?? '')
  const [resumo, setResumo] = useState(conv?.resumo ?? '')
  useEffect(() => setLink(conv?.url ?? ''), [conv?.url])
  useEffect(() => setResumo(conv?.resumo ?? ''), [conv?.resumo])

  const liberado = pendentes.length === 0 || ignorarPreparos
  const promptNovo = promptConversaNova(i)
  const promptRetomar = promptRetomarConversa(i)
  const agora = () => new Date().toISOString()
  const salvarConversa = (c: Partial<Conv> | null) =>
    onAtualizar({ conversa_claude: c === null ? null : ({ ...(conv ?? {}), ...c } as Conv) })

  const copiar = async (texto: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(texto)
      setAviso(msg)
    } catch {
      setVerPrompt(true)
      setAviso('Não consegui copiar sozinho: o prompt está aberto abaixo, selecione e copie.')
    }
    setTimeout(() => setAviso(''), 6000)
  }

  // começar conversa nova: copia o prompt, registra e abre o Claude (o link abre numa aba nova)
  const iniciarNova = () => {
    copiar(promptNovo, `Prompt copiado. No ${destino.nome}, cole com Ctrl+V (ou toque e segure → Colar) e envie.`)
    salvarConversa({ iniciada_em: agora(), ultima_em: agora(), retomadas: 0, tamanho: 'pequena', url: '', resumo: '' })
  }
  const continuar = () => {
    copiar(promptRetomar, 'Mensagem de retomada copiada. Cole na conversa e envie.')
    salvarConversa({ ultima_em: agora(), retomadas: (conv?.retomadas ?? 0) + 1 })
  }
  const urlNova = destino.url

  return (
    <div className="rolagem-fina flex-1 space-y-5 overflow-y-auto px-6 pb-8 pt-1">
      <section>
        <h4 className="mb-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">Configurar com o Claude</h4>
        <p className="text-sm leading-relaxed text-tinta">
          {i.objetivo_conversa ||
            'Abre uma conversa no Claude já com todo o contexto desta ideia, para ajustarmos item a item, passo a passo.'}
        </p>
        <p className="mt-1.5 text-xs text-tinta-suave">
          Onde: <b className="text-tinta">{destino.nome}</b>
          {i.repo && destino.nome === 'Claude Code' ? (
            <>
              {' '}
              · repositório <b className="text-tinta">{i.repo.split('/').pop()}</b>
            </>
          ) : null}
        </p>
      </section>

      {/* 1. antes de começar */}
      <section className="rounded-3xl bg-white p-4 ring-1 ring-verde-900/8">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">1 · Antes de começar (fora do Claude)</h4>
          <span className={`text-xs font-bold ${pendentes.length ? 'text-laranja-600' : 'text-verde-700'}`}>
            {preparos.length ? `${preparos.length - pendentes.length} de ${preparos.length} resolvidos` : 'nada a fazer'}
          </span>
        </div>
        {preparos.length === 0 ? (
          <p className="text-sm text-tinta-suave">Nada para preparar: pode ir direto para a conversa.</p>
        ) : (
          <ol className="space-y-2">
            {preparos.map((p, n) => (
              <li key={p.id} className={`rounded-2xl px-3 py-2.5 ring-1 ${p.feito ? 'bg-verde-50/70 ring-verde-200/70' : 'bg-laranja-50/50 ring-laranja-200'}`}>
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
                      p.feito ? 'btn-verde' : 'bg-white text-laranja-700 ring-1 ring-laranja-200'
                    }`}
                  >
                    {p.feito ? <Check size={12} strokeWidth={3} /> : n + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm ${p.feito ? 'text-tinta-suave line-through decoration-verde-400' : 'font-semibold'}`}>{p.texto}</div>
                    {p.como && !p.feito && <div className="mt-1 whitespace-pre-line text-xs leading-relaxed text-tinta-suave">{p.como}</div>}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.link && !p.feito && (
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
                        onClick={() => onAtualizar({ preparos: preparos.map((x) => (x.id === p.id ? { ...x, feito: !x.feito } : x)) })}
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                          p.feito ? 'text-tinta-suave hover:bg-white' : 'btn-verde'
                        }`}
                      >
                        {p.feito ? (
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
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 2. conversa: nova ou continuar */}
      <section className="rounded-3xl bg-gradient-to-br from-verde-50 to-white p-4 ring-1 ring-verde-200/70">
        <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-verde-800">2 · Conversa no Claude</h4>
        <p className="flex gap-2 text-sm leading-relaxed text-tinta">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-laranja-500" />
          {rec.motivo}
        </p>
        {conv && (
          <p className="mt-2 text-xs text-tinta-suave">
            Conversa atual: começou em {new Date(conv.iniciada_em).toLocaleDateString('pt-BR')}
            {conv.retomadas ? ` · retomada ${conv.retomadas} ${conv.retomadas === 1 ? 'vez' : 'vezes'}` : ''}
          </p>
        )}

        {conv && (
          <div className="mt-3">
            <div className="mb-1.5 text-xs font-bold text-tinta-suave">Quantas mensagens a conversa atual já tem?</div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['pequena', 'até 10'],
                  ['media', `10 a ${LIMITE_RESPOSTAS}`],
                  ['grande', `mais de ${LIMITE_RESPOSTAS}`],
                ] as [NonNullable<Conv['tamanho']>, string][]
              ).map(([t, label]) => (
                <button
                  key={t}
                  onClick={() => salvarConversa({ tamanho: t })}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    conv.tamanho === t ? 'btn-verde' : 'bg-white text-tinta-suave ring-1 ring-verde-900/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {!liberado && (
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-laranja-50 px-3 py-2.5 text-xs font-semibold text-laranja-800 ring-1 ring-laranja-200">
            <CircleAlert size={15} className="mt-px shrink-0" />
            <span>
              Falta resolver {pendentes.length} {pendentes.length === 1 ? 'item' : 'itens'} acima antes de começar.{' '}
              <button onClick={() => setIgnorarPreparos(true)} className="underline">
                Começar mesmo assim
              </button>
            </span>
          </div>
        )}

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          {rec.acao === 'continuar' && conv?.url ? (
            <>
              <a
                href={conv.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={continuar}
                className={`btn-laranja flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${liberado ? '' : 'pointer-events-none opacity-50'}`}
              >
                Continuar a conversa <ArrowUpRight size={16} />
              </a>
              <a
                href={urlNova}
                target="_blank"
                rel="noopener noreferrer"
                onClick={iniciarNova}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-tinta ring-1 ring-verde-900/10 ${liberado ? '' : 'pointer-events-none opacity-50'}`}
              >
                Começar outra
              </a>
            </>
          ) : (
            <a
              href={urlNova}
              target="_blank"
              rel="noopener noreferrer"
              onClick={iniciarNova}
              className={`btn-laranja flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${liberado ? '' : 'pointer-events-none opacity-50'}`}
            >
              {conv ? 'Começar conversa nova' : 'Iniciar conversa no Claude'} <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-tinta-suave">{destino.instrucao}</p>
        {aviso && <p className="mt-2 rounded-xl bg-tinta px-3 py-2 text-xs font-semibold text-white">{aviso}</p>}

        {conv && (
          <div className="mt-4 space-y-3 border-t border-verde-900/6 pt-3">
            <label className="block">
              <span className="text-xs font-bold text-tinta-suave">Link da conversa atual (cole depois de abrir no Claude)</span>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onBlur={() => link.trim() !== (conv.url ?? '') && salvarConversa({ url: link.trim() })}
                placeholder="https://claude.ai/code/session_…"
                className="mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm outline-none ring-1 ring-verde-900/10 focus:ring-2 focus:ring-laranja-300"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-tinta-suave">
                Resumo para nova conversa (cole aqui o bloco que o Claude entrega na resposta {LIMITE_RESPOSTAS})
              </span>
              <textarea
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                onBlur={() => resumo.trim() !== (conv.resumo ?? '') && salvarConversa({ resumo: resumo.trim() })}
                rows={3}
                placeholder="RESUMO PARA NOVA CONVERSA: decidido… falta… próximo passo…"
                className="mt-1 w-full resize-y rounded-xl bg-white px-3 py-2 text-sm outline-none ring-1 ring-verde-900/10 focus:ring-2 focus:ring-laranja-300"
              />
            </label>
            <p className="text-[11px] leading-relaxed text-tinta-suave">
              Com o resumo colado, “Começar conversa nova” já leva ele junto e o Claude continua de onde parou, sem reler a conversa
              antiga.
            </p>
          </div>
        )}
      </section>

      {/* 3. o prompt */}
      <section className="rounded-3xl bg-white ring-1 ring-verde-900/8">
        <button onClick={() => setVerPrompt((v) => !v)} className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.12em] text-tinta-suave">
          3 · Ver o prompt que vai para o Claude
          <ChevronDown size={14} className={`ml-auto transition-transform ${verPrompt ? 'rotate-180' : ''}`} />
        </button>
        {verPrompt && (
          <div className="relative px-4 pb-4">
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-tinta px-3 py-3 pr-10 font-mono text-[11.5px] leading-relaxed text-verde-100 select-all">
              {promptNovo}
            </pre>
            <button
              onClick={() => copiar(promptNovo, 'Prompt copiado.')}
              className="absolute right-6 top-2 rounded-md p-1 text-verde-200 hover:bg-white/10"
              aria-label="Copiar prompt"
            >
              <Copy size={14} />
            </button>
          </div>
        )}
      </section>

      {/* pergunta rápida dentro do painel (sem mensagem automática) */}
      <section className="rounded-3xl bg-white ring-1 ring-verde-900/8">
        <button onClick={() => setRapida((v) => !v)} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold text-tinta-suave">
          <MessageCircleQuestion size={16} /> Pergunta rápida aqui no painel
          <ChevronDown size={14} className={`ml-auto transition-transform ${rapida ? 'rotate-180' : ''}`} />
        </button>
        {rapida && (
          <div className="flex h-[480px] flex-col border-t border-verde-900/6">
            <Conversa key={i.id} ideia={i} config={config} onHistorico={onHistorico} />
          </div>
        )}
      </section>
    </div>
  )
}
