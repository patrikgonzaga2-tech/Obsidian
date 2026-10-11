import { NextResponse } from 'next/server'
import { iaConfigurada } from '@/lib/ia'
import { transcricaoServidor } from '@/lib/conexoes'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ ia: iaConfigurada(), transcricaoServidor: transcricaoServidor() })
}
