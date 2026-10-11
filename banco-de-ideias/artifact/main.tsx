// Entrada da versão artifact: monta o mesmo painel do app, com o backend do Claude.
import { createRoot } from 'react-dom/client'
import Hub from '@/components/Hub'
import { iniciarBackend } from './backend'

const raiz = createRoot(document.getElementById('raiz')!)

raiz.render(
  <div className="grid min-h-dvh place-items-center">
    <div className="flex flex-col items-center gap-3 text-sm font-semibold text-tinta-suave">
      <div className="icone3d size-14 rounded-2xl bg-gradient-to-br from-verde-400 to-verde-600" />
      Abrindo o Banco de Ideias…
    </div>
  </div>
)

iniciarBackend().then(({ ideias, conexoes, config, perfil, erro, assinar }) => {
  raiz.render(
    <Hub
      ideiasIniciais={ideias}
      conexoesIniciais={conexoes}
      config={config}
      perfilInicial={perfil}
      linkPainel="https://claude.ai/artifact/TZyEtoYKaRR9qPUe3NWU4U"
      erroInicial={erro}
      assinar={assinar}
    />
  )
})
