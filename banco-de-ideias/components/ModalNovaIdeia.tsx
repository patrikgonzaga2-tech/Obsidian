'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Keyboard, LoaderCircle, Mic, Square, X } from 'lucide-react'
import type { Ideia } from '@/lib/tipos'
import type { Config } from './Hub'
import { chaveIcone, Icone3D } from './ui'

// Web Speech API (Chrome/Edge/Safari) — não vem tipada no lib.dom
interface ReconhecimentoVoz {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}
type CtorReconhecimento = new () => ReconhecimentoVoz
function ctorReconhecimento(): CtorReconhecimento | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { SpeechRecognition?: CtorReconhecimento; webkitSpeechRecognition?: CtorReconhecimento }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

type Etapa = 'pronto' | 'gravando' | 'transcrevendo' | 'organizando' | 'feito' | 'erro' | 'digitar'

export default function ModalNovaIdeia({
  aberto,
  config,
  onFechar,
  onCriada,
}: {
  aberto: boolean
  config: Config
  onFechar: () => void
  onCriada: (i: Ideia) => void
}) {
  const [etapa, setEtapa] = useState<Etapa>('pronto')
  const [transcricao, setTranscricao] = useState('')
  const [parcial, setParcial] = useState('')
  const [erro, setErro] = useState('')
  const [segundos, setSegundos] = useState(0)
  const [niveis, setNiveis] = useState<number[]>(Array(24).fill(0.15))
  const [criada, setCriada] = useState<Ideia | null>(null)

  const gravador = useRef<MediaRecorder | null>(null)
  const pedacos = useRef<Blob[]>([])
  const reconhecimento = useRef<ReconhecimentoVoz | null>(null)
  const textoFinal = useRef('')
  const textoParcial = useRef('')
  const tentativa = useRef(0)
  const audioCtx = useRef<AudioContext | null>(null)
  const raf = useRef(0)
  const relogio = useRef<ReturnType<typeof setInterval> | null>(null)
  const stream = useRef<MediaStream | null>(null)

  const limpar = useCallback(() => {
    cancelAnimationFrame(raf.current)
    if (relogio.current) clearInterval(relogio.current)
    stream.current?.getTracks().forEach((t) => t.stop())
    audioCtx.current?.close().catch(() => {})
    audioCtx.current = null
    stream.current = null
    try {
      reconhecimento.current?.stop()
    } catch {}
    reconhecimento.current = null
  }, [])

  useEffect(() => {
    tentativa.current++ // respostas de uma tentativa anterior passam a ser ignoradas
    if (aberto) {
      setEtapa(config.microfone === false ? 'digitar' : 'pronto')
      setTranscricao('')
      setParcial('')
      setErro('')
      setCriada(null)
      setSegundos(0)
      textoFinal.current = ''
    } else {
      if (gravador.current?.state === 'recording') {
        gravador.current.onstop = null
        gravador.current.stop()
      }
      limpar()
    }
  }, [aberto, limpar, config.microfone])

  const organizar = useCallback(
    async (texto: string) => {
      const minha = ++tentativa.current
      setEtapa('organizando')
      setTranscricao(texto)
      try {
        const r = await fetch('/api/organizar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcricao: texto }),
        })
        const dados = await r.json()
        if (!r.ok) throw new Error(dados.erro || 'Não consegui organizar a ideia')
        if (minha !== tentativa.current) return // o modal foi fechado ou recomeçado
        setCriada(dados.ideia)
        setEtapa('feito')
        setTimeout(() => minha === tentativa.current && onCriada(dados.ideia), 1400)
      } catch (e) {
        if (minha !== tentativa.current) return
        setErro((e as Error).message)
        setEtapa(config.microfone === false ? 'digitar' : 'erro') // sem microfone, volta para o texto
      }
    },
    [onCriada, config.microfone]
  )

  const iniciar = async () => {
    setErro('')
    textoFinal.current = ''
    textoParcial.current = ''
    setParcial('')
    setTranscricao('')
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.current = s

      // grava o áudio (para o Whisper)
      const tipo = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((t) => MediaRecorder.isTypeSupported(t))
      const rec = new MediaRecorder(s, tipo ? { mimeType: tipo } : undefined)
      pedacos.current = []
      rec.ondataavailable = (e) => e.data.size && pedacos.current.push(e.data)
      rec.onstop = () => finalizar(rec.mimeType)
      rec.start(250)
      gravador.current = rec

      // transcrição ao vivo do navegador (plano B e prévia na tela)
      const Ctor = ctorReconhecimento()
      if (Ctor) {
        const r = new Ctor()
        r.lang = 'pt-BR'
        r.continuous = true
        r.interimResults = true
        r.onresult = (e) => {
          let interino = ''
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const res = e.results[i]
            if (res.isFinal) textoFinal.current += res[0].transcript + ' '
            else interino += res[0].transcript
          }
          textoParcial.current = textoFinal.current + interino
          setParcial(textoParcial.current)
        }
        r.onerror = () => {}
        r.onend = () => {
          // o Chrome encerra sozinho após silêncio; reinicia enquanto grava
          if (gravador.current?.state === 'recording' && reconhecimento.current === r) {
            try {
              r.start()
            } catch {}
          }
        }
        r.start()
        reconhecimento.current = r
      }

      // ondas de áudio
      const ctx = new AudioContext()
      const fonte = ctx.createMediaStreamSource(s)
      const analisador = ctx.createAnalyser()
      analisador.fftSize = 64
      fonte.connect(analisador)
      audioCtx.current = ctx
      const dados = new Uint8Array(analisador.frequencyBinCount)
      const loop = () => {
        analisador.getByteFrequencyData(dados)
        setNiveis(Array.from({ length: 24 }, (_, i) => Math.max(0.12, (dados[i + 2] ?? 0) / 255)))
        raf.current = requestAnimationFrame(loop)
      }
      loop()

      setSegundos(0)
      relogio.current = setInterval(() => setSegundos((n) => n + 1), 1000)
      setEtapa('gravando')
    } catch {
      limpar() // não deixa o microfone ligado se algo falhou no meio
      setErro('Não consegui acessar o microfone. Libere a permissão no navegador ou digite a ideia.')
      setEtapa('erro')
    }
  }

  const parar = () => {
    gravador.current?.stop()
  }

  const finalizar = async (mime: string) => {
    const doNavegador = (textoParcial.current || textoFinal.current).trim()
    limpar()
    setEtapa('transcrevendo')
    let texto = ''
    if (config.transcricaoServidor && pedacos.current.length) {
      try {
        const audio = new Blob(pedacos.current, { type: mime || 'audio/webm' })
        const form = new FormData()
        form.append('audio', audio, `ideia.${mime.includes('mp4') ? 'mp4' : 'webm'}`)
        const r = await fetch('/api/transcrever', { method: 'POST', body: form })
        if (r.ok) texto = ((await r.json()) as { texto: string }).texto
      } catch {}
    }
    texto = texto || doNavegador
    if (!texto) {
      setErro(
        ctorReconhecimento()
          ? 'Não captei nenhuma fala. Tente de novo, mais perto do microfone.'
          : 'Este navegador não transcreve voz e o Whisper não está configurado. Use o Chrome ou digite a ideia.'
      )
      setEtapa('erro')
      return
    }
    organizar(texto)
  }

  const mm = `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`

  return (
    <div className={`fixed inset-0 z-[60] grid place-items-center p-4 transition-all duration-300 ${aberto ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div className="absolute inset-0 bg-tinta/40 backdrop-blur-sm" onClick={etapa === 'gravando' ? undefined : onFechar} />
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all duration-500 ease-[var(--ease-mola)] ${
          aberto ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-laranja-100/80 via-verde-50/60 to-transparent" />
        <button onClick={onFechar} className="absolute right-4 top-4 z-10 rounded-xl p-2 text-tinta-suave hover:bg-white" aria-label="Fechar">
          <X size={20} />
        </button>

        <div className="relative px-8 pb-8 pt-9 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">Nova ideia</h2>
          <p className="mt-1 text-sm text-tinta-suave">
            {etapa !== 'digitar'
              ? 'Fale à vontade. Eu transcrevo, organizo e crio o card.'
              : config.microfone === false
                ? 'Toque no microfone do teclado (celular) ou use o ditado do sistema e fale — a IA organiza.'
                : 'Escreva do seu jeito — a IA organiza.'}
          </p>

          {etapa === 'digitar' ? (
            <div className="mt-6 text-left">
              <textarea
                autoFocus
                value={transcricao}
                onChange={(e) => setTranscricao(e.target.value)}
                rows={5}
                placeholder="Ex.: quero um app que pega meus vídeos brutos e já corta os silêncios e põe legenda…"
                className="w-full resize-none rounded-2xl bg-verde-50/50 p-4 text-sm outline-none ring-1 ring-verde-900/10 focus:ring-2 focus:ring-laranja-300"
              />
              {erro && <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{erro}</p>}
              <button
                onClick={() => organizar(transcricao)}
                disabled={transcricao.trim().length < 5}
                className="btn-laranja mt-3 w-full rounded-2xl py-3 text-sm font-bold"
              >
                Organizar e criar
              </button>
            </div>
          ) : (
            <>
              {/* microfone */}
              <div className="relative mx-auto mt-8 grid size-40 place-items-center">
                {etapa === 'gravando' && (
                  <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
                    {niveis.map((n, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-gradient-to-t from-verde-400 to-laranja-400 transition-[height] duration-75"
                        style={{ height: `${n * 100}%`, opacity: Math.abs(i - 11.5) < 4 ? 0 : 0.8 }}
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={etapa === 'gravando' ? parar : etapa === 'pronto' || etapa === 'erro' ? iniciar : undefined}
                  disabled={etapa === 'transcrevendo' || etapa === 'organizando' || etapa === 'feito'}
                  className={`relative grid size-24 place-items-center rounded-full transition-all duration-500 ${
                    etapa === 'gravando' ? 'btn-laranja animate-pulsar scale-105' : etapa === 'feito' ? 'btn-verde' : 'btn-laranja'
                  }`}
                  aria-label={etapa === 'gravando' ? 'Parar gravação' : 'Começar a gravar'}
                >
                  {etapa === 'gravando' ? (
                    <Square size={30} fill="white" />
                  ) : etapa === 'transcrevendo' || etapa === 'organizando' ? (
                    <LoaderCircle size={36} className="animate-spin" />
                  ) : etapa === 'feito' ? (
                    <Check size={40} strokeWidth={3} />
                  ) : (
                    <Mic size={38} />
                  )}
                </button>
              </div>

              <div className="mt-3 h-5 text-sm font-bold text-laranja-600">
                {etapa === 'gravando' && `Gravando ${mm} · toque para terminar`}
                {etapa === 'pronto' && <span className="text-tinta-suave">Toque no microfone para começar</span>}
                {etapa === 'transcrevendo' && 'Transcrevendo…'}
                {etapa === 'organizando' && (config.ia ? 'A IA está organizando sua ideia…' : 'Organizando sua ideia…')}
                {etapa === 'feito' && <span className="text-verde-700">Ideia criada!</span>}
              </div>

              {/* transcrição */}
              {(parcial || transcricao) && etapa !== 'feito' && (
                <p className="mx-auto mt-4 max-h-32 overflow-y-auto rounded-2xl bg-verde-50/70 px-4 py-3 text-left text-sm italic leading-relaxed text-tinta-suave">
                  “{transcricao || parcial}”
                </p>
              )}

              {etapa === 'feito' && criada && (
                <div className="mt-5 flex animate-entrar items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-lg ring-1 ring-verde-900/8">
                  <Icone3D categoria={chaveIcone(criada)} tamanho={44} />
                  <div className="min-w-0">
                    <div className="truncate font-extrabold">{criada.titulo}</div>
                    <div className="text-xs text-tinta-suave">
                      {criada.categoria} · Início · {criada.tarefas.length} passos
                    </div>
                  </div>
                </div>
              )}

              {etapa === 'erro' && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{erro}</p>}

              {(etapa === 'pronto' || etapa === 'erro') && (
                <button
                  onClick={() => setEtapa('digitar')}
                  className="mx-auto mt-6 flex items-center gap-1.5 text-xs font-semibold text-tinta-suave hover:text-tinta"
                >
                  <Keyboard size={14} /> prefere digitar?
                </button>
              )}
            </>
          )}
          <p className="mt-6 text-[11px] text-tinta-suave/80">
            Transcrição:{' '}
            {config.microfone === false
              ? 'ditado do teclado'
              : config.transcricaoServidor
                ? 'Whisper (servidor)'
                : 'reconhecimento de voz do navegador'} · Organização:{' '}
            {config.ia ? 'Claude' : 'automática (sem IA)'}
          </p>
        </div>
      </div>
    </div>
  )
}
