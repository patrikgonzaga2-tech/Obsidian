import { NextResponse } from 'next/server'
import { verificarConexoes } from '@/lib/conexoes'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(await verificarConexoes())
}
