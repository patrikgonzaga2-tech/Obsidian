import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { listarHistorico, obterIdeia, salvarMensagens } from '@/lib/store'
import { cliente, iaConfigurada, MODELO } from '@/lib/ia'
import { systemDaConversa } from '@/lib/contexto'
import { lerJson } from '@/lib/regras'
import { novoId, type Mensagem } from '@/lib/tipos'

export const dynamic = 'force-dynamic'

// Conversa com a IA já com o contexto completo da ideia. Responde em texto corrido (stream).
export async function POST(req: Request) {
  const corpo0 = await lerJson(req)
  const ideiaId = typeof corpo0.ideiaId === 'string' ? corpo0.ideiaId : ''
  const mensagem = typeof corpo0.mensagem === 'string' ? corpo0.mensagem : ''
  if (!ideiaId || !mensagem?.trim()) return NextResponse.json({ erro: 'ideiaId e mensagem são obrigatórios' }, { status: 400 })
  if (!iaConfigurada()) {
    return NextResponse.json({ erro: 'ANTHROPIC_API_KEY não configurada', semIA: true }, { status: 503 })
  }
  const ideia = await obterIdeia(ideiaId)
  if (!ideia) return NextResponse.json({ erro: 'Ideia não encontrada' }, { status: 404 })

  const historico = await listarHistorico(ideiaId)
  // histórico alternado user/assistant, começando por user
  const anteriores: Anthropic.Beta.BetaMessageParam[] = []
  for (const m of historico.slice(-30)) {
    const ultimo = anteriores[anteriores.length - 1]
    if (!ultimo && m.papel !== 'user') continue
    if (ultimo?.role === m.papel) continue
    anteriores.push({ role: m.papel, content: m.conteudo })
  }
  if (anteriores[anteriores.length - 1]?.role === 'user') anteriores.pop()

  const msgUser: Mensagem = {
    id: novoId(),
    ideia_id: ideiaId,
    papel: 'user',
    conteudo: mensagem.trim(),
    criado_em: new Date().toISOString(),
  }

  const stream = cliente().beta.messages.stream({
    model: MODELO,
    max_tokens: 64000,
    output_config: { effort: 'medium' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: systemDaConversa(ideia, historico),
    messages: [...anteriores, { role: 'user', content: msgUser.conteudo }],
  })

  const encoder = new TextEncoder()
  const corpo = new ReadableStream<Uint8Array>({
    async start(controller) {
      let resposta = ''
      try {
        for await (const ev of stream) {
          if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') {
            resposta += ev.delta.text
            controller.enqueue(encoder.encode(ev.delta.text))
          }
        }
        const final = await stream.finalMessage()
        if (final.stop_reason === 'refusal') {
          const aviso = '\n\n(A IA recusou responder a este pedido. Tente reformular.)'
          resposta += aviso
          controller.enqueue(encoder.encode(aviso))
        }
        await salvarMensagens([
          msgUser,
          { id: novoId(), ideia_id: ideiaId, papel: 'assistant', conteudo: resposta, criado_em: new Date().toISOString() },
        ])
      } catch (e) {
        const msg =
          e instanceof Anthropic.AuthenticationError
            ? 'Chave da Anthropic inválida.'
            : e instanceof Anthropic.RateLimitError
              ? 'Limite de uso atingido — tente de novo em instantes.'
              : e instanceof Anthropic.APIError
                ? `Erro da API (${e.status}).`
                : 'Falha na conversa.'
        controller.enqueue(encoder.encode(`\n\n⚠️ ${msg}`))
        console.error('[chat]', e)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}
