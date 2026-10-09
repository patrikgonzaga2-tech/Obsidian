import { NextResponse } from 'next/server'
import { listarHistorico } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    return NextResponse.json(await listarHistorico(id))
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
