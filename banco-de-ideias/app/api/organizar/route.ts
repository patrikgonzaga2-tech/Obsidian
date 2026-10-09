import { NextResponse } from 'next/server'
import { criarIdeia } from '@/lib/store'
import { iaConfigurada, organizarComIA } from '@/lib/ia'
import { organizarLocal } from '@/lib/organizar-local'
import { novoId, type Ideia } from '@/lib/tipos'

// Recebe a transcrição do áudio, organiza (IA ou plano B) e já cria a ideia.
export async function POST(req: Request) {
  const { transcricao } = (await req.json()) as { transcricao?: string }
  const texto = (transcricao || '').trim()
  if (texto.length < 5) return NextResponse.json({ erro: 'Não entendi a ideia — tente falar de novo.' }, { status: 400 })

  let org = organizarLocal(texto)
  let modo: 'ia' | 'local' = 'local'
  if (iaConfigurada()) {
    try {
      org = await organizarComIA(texto)
      modo = 'ia'
    } catch (e) {
      console.error('[organizar] IA falhou, usando plano B:', e)
    }
  }
  const agora = new Date().toISOString()
  const ideia: Ideia = {
    id: novoId('au-'),
    titulo: org.titulo,
    categoria: org.categoria,
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 0,
    prioridade: org.prioridade,
    resumo: org.resumo,
    resumo_detalhado: modo === 'ia' ? `${org.resumo_detalhado}\n\nTranscrição original: "${texto}"` : org.resumo_detalhado,
    tarefas: org.tarefas.map((t) => ({ id: novoId(), texto: t, feito: false })),
    url_produto: null,
    repo: null,
    origem: 'audio',
    origem_ref: null,
    criado_em: agora,
    atualizado_em: agora,
  }
  try {
    return NextResponse.json({ ideia: await criarIdeia(ideia), modo }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
