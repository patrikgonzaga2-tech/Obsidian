import { NextResponse } from 'next/server'
import { listarSessoes } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(await listarSessoes())
  } catch (e) {
    return NextResponse.json({ erro: String(e) }, { status: 500 })
  }
}
