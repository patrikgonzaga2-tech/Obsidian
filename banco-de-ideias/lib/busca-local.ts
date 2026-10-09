// Busca "semântica" sem IA: entende sinônimos e intenção ("terminar hoje", "usar agora").
// Roda no cliente (resultado instantâneo) e é o plano B do servidor quando não há chave da Anthropic.
import type { Ideia, RespostaBusca } from './tipos'

const STOP = new Set(
  'a o as os um uma uns umas de do da dos das em no na nos nas por para pra com sem sobre e ou mas que se ao aos como mais menos muito ja nao sim ser estar ter fazer quero queria preciso vou vamos isso esse essa este esta aquele aquela aqui ali la tambem so ainda meu minha meus minhas eu me hoje agora dia projeto ideia coisa aquilo'.split(
    ' '
  )
)

// Grupos de sinônimos: qualquer palavra do grupo casa com todas as outras.
const SINONIMOS: string[][] = [
  ['video', 'edicao', 'editar', 'editor', 'montagem', 'montar', 'corte', 'cortar', 'reels', 'criativo', 'filmagem', 'ffmpeg', 'estudio', 'aula'],
  ['site', 'pagina', 'landing', 'web', 'lp', 'dominio'],
  ['app', 'aplicativo', 'painel', 'dashboard', 'sistema', 'plataforma'],
  ['venda', 'vender', 'checkout', 'oferta', 'funil', 'loja', 'pix', 'pagamento', 'quiz', 'campanha', 'anuncio', 'marketing'],
  ['curso', 'aula', 'conteudo', 'desafio', 'jornada', 'treino', 'comunidade'],
  ['ia', 'agente', 'automacao', 'automatizar', 'bot', 'claude', 'robo', 'cerebro', 'obsidian'],
  ['ideia', 'banco', 'hub', 'nota', 'notas'],
]

// Intenções: palavras que mudam a ordenação, não o filtro.
const INTENCOES = {
  terminar: ['terminar', 'finalizar', 'concluir', 'acabar', 'fechar', 'entregar', 'completar', 'hoje', 'continuar', 'retomar', 'seguir'],
  usar: ['usar', 'abrir', 'acessar', 'entrar', 'publicado', 'publicada', 'ar', 'online', 'funcionando'],
  pausado: ['pausado', 'pausada', 'parado', 'parada', 'esquecido', 'abandonado', 'travado'],
  urgente: ['urgente', 'prioridade', 'importante', 'primeiro', 'rapido'],
}

export const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

/** Radical simples para português: tira plural e algumas terminações. */
function radical(w: string) {
  return w
    .replace(/(coes|cao|coes)$/, 'c')
    .replace(/(mente)$/, '')
    .replace(/(ndo|ar|er|ir|ado|ada|idos|idas)$/, '')
    .replace(/s$/, '')
}

const palavras = (s: string) =>
  norm(s)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2 && !STOP.has(w))

function expandir(w: string): string[] {
  const out = new Set([w, radical(w)])
  for (const g of SINONIMOS) {
    if (g.some((x) => x === w || radical(x) === radical(w))) g.forEach((x) => out.add(radical(x)))
  }
  return [...out].filter((x) => x.length >= 2)
}

function texto(i: Ideia) {
  return {
    titulo: palavras(i.titulo).map(radical),
    categoria: palavras(i.categoria).map(radical),
    corpo: palavras(`${i.resumo} ${i.resumo_detalhado} ${i.tarefas.map((t) => t.texto).join(' ')} ${i.repo ?? ''}`).map(radical),
  }
}

export function buscarLocal(consulta: string, ideias: Ideia[]): RespostaBusca {
  const brutas = norm(consulta).split(/[^a-z0-9]+/).filter(Boolean)
  const tem = (lista: string[]) => brutas.some((w) => lista.includes(w))
  const intencao = {
    terminar: tem(INTENCOES.terminar),
    usar: tem(INTENCOES.usar),
    pausado: tem(INTENCOES.pausado),
    urgente: tem(INTENCOES.urgente),
  }
  const todasIntencoes = new Set(Object.values(INTENCOES).flat())
  const termos = palavras(consulta).filter((w) => !todasIntencoes.has(w))

  const pontuadas = ideias.map((i) => {
    const t = texto(i)
    let score = 0
    const casou: string[] = []
    for (const termo of termos) {
      const exp = expandir(termo)
      const direto = radical(termo)
      const hit = (arr: string[], peso: number) => {
        let s = 0
        for (const w of arr) {
          if (w === direto || (direto.length >= 4 && w.startsWith(direto))) s = Math.max(s, peso)
          else if (exp.includes(w)) s = Math.max(s, peso * 0.6)
        }
        return s
      }
      const s = hit(t.titulo, 5) + hit(t.categoria, 3) + hit(t.corpo, 1.5)
      if (s > 0) casou.push(termo)
      score += s
    }
    // intenção ajusta a ordem
    if (intencao.terminar) {
      if (i.status === 'em_andamento') score += 2 + i.progresso / 40
      if (i.status === 'no_ar') score -= 1.5
    }
    if (intencao.usar && i.status === 'no_ar') score += 3
    if (intencao.pausado && i.status === 'pausado') score += 3
    if (intencao.urgente && i.prioridade === 'alta') score += 2
    return { i, score, casou }
  })

  const soIntencao = termos.length === 0
  const resultados = pontuadas
    .filter((p) => (soIntencao ? p.score > 0 : p.casou.length > 0))
    .sort((a, b) => b.score - a.score)
    .map((p) => ({
      id: p.i.id,
      motivo: motivo(p.i, p.casou, intencao),
    }))

  const partes: string[] = []
  if (intencao.terminar) partes.push('quer avançar/terminar algo')
  if (intencao.usar) partes.push('quer usar algo que já está no ar')
  if (intencao.pausado) partes.push('procura algo parado')
  if (intencao.urgente) partes.push('prioriza o que é urgente')
  if (termos.length) partes.push(`sobre: ${termos.join(', ')}`)

  return { modo: 'local', intencao: partes.join(' · ') || 'busca por palavras', resultados }
}

function motivo(i: Ideia, casou: string[], intencao: Record<string, boolean>) {
  const pend = i.tarefas.find((t) => !t.feito)
  const base = casou.length ? `Casa com "${casou.join('", "')}"` : 'Combina com a intenção'
  if (intencao.terminar && i.status === 'em_andamento')
    return `${base}. Está em ${i.progresso}%${pend ? ` — próximo passo: ${pend.texto}` : ''}.`
  if (intencao.usar && i.status === 'no_ar') return `${base}. Já está no ar, pronto para usar.`
  return `${base}.`
}
