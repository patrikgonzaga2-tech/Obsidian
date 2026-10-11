import { NextResponse } from 'next/server'
import { pararDeAcompanhar } from '@/lib/store'

/** Só uma ação: parar de acompanhar a sessão no "Mexendo agora". */
export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await pararDeAcompanhar(id)
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
