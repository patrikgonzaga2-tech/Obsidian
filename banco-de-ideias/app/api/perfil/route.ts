import { NextResponse } from 'next/server'
import { lerPerfil, salvarPerfil } from '@/lib/store'
import { normalizarPerfil } from '@/lib/perfil'
import { lerJson } from '@/lib/regras'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(await lerPerfil())
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const perfil = normalizarPerfil(await lerJson(req))
  if (!perfil) return NextResponse.json({ erro: 'Perfil inválido' }, { status: 400 })
  try {
    return NextResponse.json(await salvarPerfil(perfil))
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
