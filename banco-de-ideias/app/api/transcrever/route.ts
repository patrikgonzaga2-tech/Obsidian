import { NextResponse } from 'next/server'

// Encaminha o áudio para um endpoint compatível com Whisper (/v1/audio/transcriptions):
// OpenAI, Groq, faster-whisper-server, whisper.cpp server...
export async function POST(req: Request) {
  const url = process.env.WHISPER_URL
  if (!url) {
    return NextResponse.json(
      { erro: 'Transcrição no servidor não configurada (WHISPER_URL).', usarNavegador: true },
      { status: 501 }
    )
  }
  const form = await req.formData()
  const audio = form.get('audio')
  if (!(audio instanceof Blob)) return NextResponse.json({ erro: 'Envie o campo "audio".' }, { status: 400 })

  const envio = new FormData()
  envio.append('file', audio, (audio as File).name || 'ideia.webm')
  envio.append('model', process.env.WHISPER_MODEL || 'whisper-1')
  envio.append('language', 'pt')
  envio.append('response_format', 'json')

  const r = await fetch(url, {
    method: 'POST',
    headers: process.env.WHISPER_API_KEY ? { Authorization: `Bearer ${process.env.WHISPER_API_KEY}` } : {},
    body: envio,
  })
  if (!r.ok) return NextResponse.json({ erro: `Whisper respondeu ${r.status}: ${await r.text()}` }, { status: 502 })
  const { text } = (await r.json()) as { text?: string }
  return NextResponse.json({ texto: (text || '').trim() })
}
