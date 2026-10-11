// Gera artifact/dist/banco-de-ideias.html: o painel inteiro num arquivo só,
// para abrir dentro do Claude (artifact). Rode da pasta banco-de-ideias:
//   node artifact/build.mjs
import fs from 'node:fs/promises'
import path from 'node:path'
import * as esbuild from 'esbuild'
import postcss from 'postcss'
import tailwind from '@tailwindcss/postcss'

const raiz = process.cwd()

// 'react' e 'react-dom/client' viram os globais do React 18 carregado do cdnjs
const SHIMS = {
  react: 'artifact/react-shim.ts',
  'react/jsx-runtime': 'artifact/react-jsx-shim.ts',
  'react-dom/client': 'artifact/react-dom-shim.ts',
}
const reactDoCdn = {
  name: 'react-do-cdn',
  setup(b) {
    b.onResolve({ filter: /^react(\/jsx-runtime)?$|^react-dom\/client$/ }, (a) => ({ path: path.join(raiz, SHIMS[a.path]) }))
  },
}
const saida = path.join(raiz, 'artifact', 'dist', 'banco-de-ideias.html')

const js = await esbuild.build({
  entryPoints: ['artifact/main.tsx'],
  bundle: true,
  write: false,
  minify: true,
  format: 'iife',
  target: 'es2020',
  jsx: 'automatic',
  plugins: [reactDoCdn],
  define: { 'process.env.NODE_ENV': '"production"' },
  tsconfig: 'tsconfig.json',
  logLevel: 'warning',
})

const entradaCss = path.join(raiz, 'artifact', 'entrada.css')
const css = await postcss([tailwind({ base: raiz, optimize: { minify: true } })]).process(await fs.readFile(entradaCss, 'utf8'), {
  from: entradaCss,
})

const codigo = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')
const html = `<title>Banco de Ideias</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
<style>${css.css}</style>
<div id="raiz" class="font-sans antialiased"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${codigo}</script>
`
await fs.mkdir(path.dirname(saida), { recursive: true })
await fs.writeFile(saida, html)
console.log(`ok: ${path.relative(raiz, saida)} (${(html.length / 1024).toFixed(0)} KB)`)
