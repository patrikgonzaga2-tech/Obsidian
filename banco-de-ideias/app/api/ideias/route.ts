import { NextResponse } from 'next/server'
import { criarIdeia, listarIdeias } from '@/lib/store'
import { faseDoProgresso, novoId, type Ideia } from '@/lib/tipos'
import { aplicarRegras, lerJson } from '@/lib/regras'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(await listarIdeias())
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const b = await lerJson(req)
  const v = aplicarRegras({ status: 'em_andamento', prioridade: 'media', ...b })
  if (!v.titulo) return NextResponse.json({ erro: 'Título obrigatório' }, { status: 400 })
  const agora = new Date().toISOString()
  const progresso = v.progresso ?? 0
  const origens = ['manual', 'audio', 'github', 'desktop', 'chat']
  const ideia: Ideia = {
    id: novoId('id-'),
    titulo: v.titulo,
    categoria: v.categoria || 'Outro',
    status: v.status ?? 'em_andamento',
    fase: v.fase ?? faseDoProgresso(progresso),
    progresso,
    prioridade: v.prioridade ?? 'media',
    resumo: v.resumo ?? '',
    resumo_detalhado: v.resumo_detalhado ?? '',
    tarefas: v.tarefas ?? [],
    url_produto: v.url_produto ?? null,
    repo: v.repo ?? null,
    origem: origens.includes(String(b.origem)) ? (b.origem as Ideia['origem']) : 'manual',
    origem_ref: typeof b.origem_ref === 'string' ? b.origem_ref : null,
    como_usar: v.como_usar ?? '',
    comandos: v.comandos ?? [],
    links: v.links ?? [],
    criado_em: agora,
    atualizado_em: agora,
  }
  try {
    return NextResponse.json(await criarIdeia(ideia), { status: 201 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
