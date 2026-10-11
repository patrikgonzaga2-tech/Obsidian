import { NextResponse } from 'next/server'
import { iniciarConexao } from '@/lib/conexoes'
import type { ConexaoId } from '@/lib/tipos'

const IDS: ConexaoId[] = ['supabase', 'github', 'desktop', 'chats']

// "Iniciar conexão": verifica cada pendência e importa ideias quando a fonte permite.
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!IDS.includes(id as ConexaoId)) return NextResponse.json({ erro: 'Conexão desconhecida' }, { status: 404 })
  return NextResponse.json(await iniciarConexao(id as ConexaoId))
}
