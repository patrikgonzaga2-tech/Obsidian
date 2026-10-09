import { NextResponse } from 'next/server'
import { criarIdeia, listarIdeias } from '@/lib/store'
import { faseDoProgresso, novoId, type Ideia } from '@/lib/tipos'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(await listarIdeias())
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const b = (await req.json()) as Partial<Ideia> & { tarefas?: (string | Ideia['tarefas'][number])[] }
  if (!b.titulo?.trim()) return NextResponse.json({ erro: 'Título obrigatório' }, { status: 400 })
  const agora = new Date().toISOString()
  const progresso = Math.max(0, Math.min(100, Number(b.progresso) || 0))
  const ideia: Ideia = {
    id: novoId('id-'),
    titulo: b.titulo.trim(),
    categoria: b.categoria || 'Outro',
    status: b.status || 'em_andamento',
    fase: b.fase || faseDoProgresso(progresso),
    progresso,
    prioridade: b.prioridade || 'media',
    resumo: b.resumo || '',
    resumo_detalhado: b.resumo_detalhado || '',
    tarefas: (b.tarefas || []).map((t) =>
      typeof t === 'string' ? { id: novoId(), texto: t, feito: false } : { ...t, id: t.id || novoId() }
    ),
    url_produto: b.url_produto || null,
    repo: b.repo || null,
    origem: b.origem || 'manual',
    origem_ref: b.origem_ref || null,
    criado_em: agora,
    atualizado_em: agora,
  }
  try {
    return NextResponse.json(await criarIdeia(ideia), { status: 201 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
