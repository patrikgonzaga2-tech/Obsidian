import { NextResponse } from 'next/server'
import { fixarSessao, pararDeAcompanhar } from '@/lib/store'
import { lerJson } from '@/lib/regras'

/** Ações no "Mexendo agora": parar de acompanhar (padrão), fixar ou desafixar a conversa. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { acao } = (await lerJson(req).catch(() => ({}))) as { acao?: string }
  try {
    if (acao === 'fixar' || acao === 'desafixar') await fixarSessao(id, acao === 'fixar')
    else await pararDeAcompanhar(id)
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
