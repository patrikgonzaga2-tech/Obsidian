import { NextResponse } from 'next/server'
import { listarIdeias } from '@/lib/store'
import { buscarComIA, iaConfigurada } from '@/lib/ia'
import { buscarLocal } from '@/lib/busca-local'
import { lerJson } from '@/lib/regras'

export async function POST(req: Request) {
  const consulta = String((await lerJson(req)).q ?? '').trim()
  if (!consulta) return NextResponse.json({ modo: 'local', intencao: '', resultados: [] })
  const ideias = (await listarIdeias()).filter((i) => i.status !== 'arquivado')
  if (iaConfigurada()) {
    try {
      return NextResponse.json(await buscarComIA(consulta, ideias))
    } catch (e) {
      console.error('[busca] IA falhou, usando busca local:', e)
    }
  }
  return NextResponse.json(buscarLocal(consulta, ideias))
}
