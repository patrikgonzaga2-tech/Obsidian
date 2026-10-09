import { NextResponse } from 'next/server'
import { atualizarIdeia, excluirIdeia } from '@/lib/store'
import { faseDoProgresso, progressoDasTarefas, type Ideia } from '@/lib/tipos'

const EDITAVEIS: (keyof Ideia)[] = [
  'titulo', 'categoria', 'status', 'fase', 'progresso', 'prioridade',
  'resumo', 'resumo_detalhado', 'tarefas', 'url_produto', 'repo',
]

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const b = (await req.json()) as Partial<Ideia>
  const patch: Partial<Ideia> = {}
  for (const k of EDITAVEIS) if (k in b) (patch as Record<string, unknown>)[k] = b[k]
  if (patch.progresso != null) patch.progresso = Math.max(0, Math.min(100, Math.round(Number(patch.progresso))))
  // mesmas regras do painel: checklist define o progresso; "no ar" fecha em 100%
  if (patch.tarefas && patch.progresso == null && patch.status !== 'no_ar') {
    const p = progressoDasTarefas(patch.tarefas)
    if (p != null) {
      patch.progresso = p
      patch.fase ??= faseDoProgresso(p)
    }
  }
  if (patch.status === 'no_ar') {
    patch.progresso = 100
    patch.fase = 'fim'
  }
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
