// Plano B para organizar uma ideia ditada quando não há chave da Anthropic.
import type { Prioridade } from './tipos'
import { norm } from './busca-local'

export interface IdeiaOrganizada {
  titulo: string
  categoria: string
  resumo: string
  resumo_detalhado: string
  prioridade: Prioridade
  tarefas: string[]
}

export const CATEGORIAS = [
  'Vídeo',
  'Site',
  'App',
  'Vendas / Marketing',
  'Curso / Conteúdo',
  'Automação / IA',
  'Código',
  'Finanças',
  'Saúde',
  'Outro',
] as const

const PISTAS: [string, string[]][] = [
  ['Vídeo', ['video', 'edicao', 'editar', 'reels', 'youtube', 'filmar', 'montagem', 'criativo']],
  ['Site', ['site', 'pagina', 'landing', 'dominio', 'blog']],
  ['App', ['app', 'aplicativo', 'painel', 'sistema', 'plataforma', 'dashboard']],
  ['Vendas / Marketing', ['venda', 'vender', 'oferta', 'funil', 'anuncio', 'campanha', 'loja', 'cliente', 'checkout']],
  ['Curso / Conteúdo', ['curso', 'aula', 'conteudo', 'ebook', 'desafio', 'mentoria', 'comunidade']],
  ['Automação / IA', ['automatizar', 'automacao', 'agente', 'ia', 'bot', 'robo', 'claude', 'gpt']],
  ['Código', ['codigo', 'api', 'script', 'biblioteca', 'github']],
  ['Finanças', ['dinheiro', 'financeiro', 'financas', 'gasto', 'orcamento', 'investimento']],
  ['Saúde', ['saude', 'treino', 'dieta', 'emagrecer', 'academia']],
]

const PASSOS: Record<string, string[]> = {
  Vídeo: ['Definir objetivo e público do vídeo', 'Escrever o roteiro', 'Separar material (filmagens, fotos, música)', 'Editar a primeira versão', 'Revisar e publicar'],
  Site: ['Definir objetivo da página e chamada principal', 'Escrever o texto (copy)', 'Montar o layout', 'Publicar e testar no celular'],
  App: ['Listar as 3 funções essenciais', 'Desenhar as telas principais', 'Montar a primeira versão funcionando', 'Testar com uso real', 'Publicar'],
  'Vendas / Marketing': ['Definir oferta e público', 'Montar a página/funil', 'Criar os primeiros anúncios ou posts', 'Medir resultados da primeira semana'],
  'Curso / Conteúdo': ['Definir a transformação prometida', 'Montar a estrutura dos módulos/dias', 'Gravar ou escrever o primeiro conteúdo', 'Testar com um grupo pequeno'],
  'Automação / IA': ['Descrever o processo manual de hoje', 'Escolher ferramentas e onde vai rodar', 'Automatizar o primeiro passo', 'Testar com um caso real'],
}
const PASSOS_PADRAO = ['Escrever em uma frase o que é a ideia', 'Definir o primeiro resultado visível', 'Fazer a primeira versão simples', 'Mostrar para alguém e coletar opinião']

export function organizarLocal(transcricao: string): IdeiaOrganizada {
  const limpo = transcricao.trim().replace(/\s+/g, ' ')
  const n = norm(limpo)
  let categoria = 'Outro'
  let melhor = 0
  for (const [cat, pistas] of PISTAS) {
    const hits = pistas.filter((p) => n.includes(p)).length
    if (hits > melhor) {
      melhor = hits
      categoria = cat
    }
  }
  const prioridade: Prioridade = /urgente|rapido|logo|essa semana|hoje|prioridade/.test(n)
    ? 'alta'
    : /um dia|futuro|talvez|quando der|sem pressa/.test(n)
      ? 'baixa'
      : 'media'

  // núcleo: primeira frase sem "então, tive uma ideia de / eu quero..."
  const primeira = limpo.split(/[.!?]/)[0] || limpo
  const nucleo = primeira
    .replace(/^((ent[aã]o|olha|bom|tipo|ah|é|cara)[,\s]+)+/i, '')
    .replace(/^(eu\s+)?(tive uma ideia( de| que| para| pra)?|quero( criar| fazer)?|queria( criar| fazer)?|preciso( criar| fazer)?|pensei em( criar| fazer)?|a ideia [eé])\s+/i, '')
    .replace(/^(um|uma|o|a)\s+/i, '')
  // título: até 6 palavras, sem terminar em palavra de ligação
  const palavras = nucleo.split(/[\s,;:]+/).filter(Boolean).slice(0, 6)
  while (palavras.length > 2 && /^(da|de|do|das|dos|e|que|o|a|os|as|um|uma|para|pra|com|no|na|em|por|já)$/i.test(palavras[palavras.length - 1]))
    palavras.pop()
  const titulo = palavras.join(' ').replace(/^./, (c) => c.toUpperCase()) || 'Nova ideia'
  const resto = limpo.slice(limpo.indexOf(primeira) + primeira.length).replace(/^[.!?\s]+/, '')
  const resumoBase = (nucleo.replace(/^./, (c) => c.toUpperCase()) + (resto ? `. ${resto}` : '')).trim()

  return {
    titulo,
    categoria,
    resumo: resumoBase.length > 160 ? resumoBase.slice(0, 157) + '…' : resumoBase,
    resumo_detalhado: limpo,
    prioridade,
    tarefas: PASSOS[categoria] ?? PASSOS_PADRAO,
  }
}
