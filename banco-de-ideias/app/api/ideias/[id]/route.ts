import { NextResponse } from 'next/server'
import { atualizarIdeia, excluirIdeia } from '@/lib/store'
import { aplicarRegras, lerJson } from '@/lib/regras'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const patch = aplicarRegras(await lerJson(req))
  if (!Object.keys(patch).length) return NextResponse.json({ erro: 'Nada para alterar' }, { status: 400 })
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
