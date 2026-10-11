import Hub from '@/components/Hub'
import { lerPerfil, listarIdeias } from '@/lib/store'
import type { Perfil } from '@/lib/tipos'
import { verificarConexoes, transcricaoServidor } from '@/lib/conexoes'
import { iaConfigurada } from '@/lib/ia'
import type { Ideia } from '@/lib/tipos'

export const dynamic = 'force-dynamic'

export default async function Pagina() {
  let ideias: Ideia[] = []
  let erro = ''
  try {
    ideias = await listarIdeias()
  } catch (e) {
    erro = String(e)
  }
  const conexoes = await verificarConexoes()
  const perfil: Perfil | null = await lerPerfil().catch(() => null)
  return (
    <Hub
      ideiasIniciais={ideias}
      conexoesIniciais={conexoes}
      config={{ ia: iaConfigurada(), transcricaoServidor: transcricaoServidor() }}
      perfilInicial={perfil}
      erroInicial={erro}
    />
  )
}
