import { NextResponse } from 'next/server'
import { atualizarIdeia, excluirIdeia } from '@/lib/store'
import { aplicarRegras } from '@/lib/regras'
import type { Ideia } from '@/lib/tipos'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const b = (await req.json()) as Partial<Ideia>
  const patch = aplicarRegras(b)
  try {
    const ideia = await atualizarIdeia(id, patch)
    return ideia ? NextResponse.json(ideia) : NextResponse.json({ erro: 'Não encontrada' }, { status: 404 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await excluirIdeia(id)
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
