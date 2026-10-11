// Chamadas ao Claude. SOMENTE servidor.
import 'server-only'
import Anthropic from '@anthropic-ai/sdk'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'
import { z } from 'zod'
import type { Ideia, RespostaBusca } from './tipos'
import { CATEGORIAS, type IdeiaOrganizada } from './organizar-local'

export const MODELO = 'claude-opus-5-5'
// Se o modelo recusar por segurança, a API refaz a chamada no modelo recomendado (server-side).
const FALLBACK = { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const }

export function iaConfigurada() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN)
}

let _cliente: Anthropic | null = null
export function cliente() {
  if (!_cliente) _cliente = new Anthropic()
  return _cliente
}

// ---------- busca semântica ----------
const BuscaSchema = z.object({
  intencao: z.string().describe('O que a pessoa quer fazer, em uma frase curta'),
  resultados: z
    .array(z.object({ id: z.string(), motivo: z.string().describe('Por que esta ideia responde ao pedido, 1 frase') }))
    .describe('Ideias relevantes, da mais para a menos relevante. Vazio se nada combinar.'),
})

export async function buscarComIA(consulta: string, ideias: Ideia[]): Promise<RespostaBusca> {
  const catalogo = ideias.map((i) => ({
    id: i.id,
    titulo: i.titulo,
    categoria: i.categoria,
    status: i.status,
    fase: i.fase,
    progresso: i.progresso,
    prioridade: i.prioridade,
    resumo: i.resumo,
    proximas_tarefas: i.tarefas.filter((t) => !t.feito).slice(0, 4).map((t) => t.texto),
  }))
  const resp = await cliente().beta.messages.parse({
    model: MODELO,
    max_tokens: 4000,
    output_config: { effort: 'low', format: betaZodOutputFormat(BuscaSchema) },
    ...FALLBACK,
    system:
      'Você é o buscador do Banco de Ideias. Recebe um pedido em linguagem natural (português) e o catálogo de ideias em JSON. ' +
      'Entenda a intenção (ex.: "quero terminar hoje" = priorizar ideias em andamento e mais perto do fim; "usar" = ideias no ar) ' +
      'e o assunto (ex.: "edição de vídeo" casa com ideias de vídeo, montagem, criativos). ' +
      'Devolva só ideias que realmente combinam, usando os ids exatos do catálogo. O motivo deve citar o próximo passo quando ajudar.',
    messages: [
      {
        role: 'user',
        content: `Pedido: ${consulta}\n\nCatálogo:\n${JSON.stringify(catalogo)}`,
      },
    ],
  })
  if (resp.stop_reason === 'refusal' || !resp.parsed_output) throw new Error('Busca IA sem resposta utilizável')
  const validos = new Set(ideias.map((i) => i.id))
  return {
    modo: 'ia',
    intencao: resp.parsed_output.intencao,
    resultados: resp.parsed_output.resultados.filter((r) => validos.has(r.id)),
  }
}

// ---------- organizar ideia ditada ----------
const OrganizarSchema = z.object({
  titulo: z.string().describe('Título curto e claro, até 6 palavras'),
  categoria: z.enum(CATEGORIAS),
  resumo: z.string().describe('Ponto atual em 1–2 frases (a ideia acabou de nascer)'),
  resumo_detalhado: z.string().describe('A ideia organizada em um parágrafo: o que é, para quem, por quê'),
  prioridade: z.enum(['alta', 'media', 'baixa']),
  tarefas: z.array(z.string()).describe('Passo a passo inicial: 4 a 7 tarefas concretas, na ordem, começando por verbo'),
})

export async function organizarComIA(transcricao: string): Promise<IdeiaOrganizada> {
  const resp = await cliente().beta.messages.parse({
    model: MODELO,
    max_tokens: 8000,
    output_config: { effort: 'low', format: betaZodOutputFormat(OrganizarSchema) },
    ...FALLBACK,
    system:
      'Você organiza ideias ditadas por áudio (transcrição crua, com vícios de fala) em um card de projeto. ' +
      'Escreva em português do Brasil, simples e direto. Prioridade alta só se a pessoa indicar urgência ou dinheiro em jogo; baixa se disser que é para o futuro.',
    messages: [{ role: 'user', content: `Transcrição:\n"""${transcricao}"""` }],
  })
  if (resp.stop_reason === 'refusal' || !resp.parsed_output) throw new Error('Organização IA sem resposta utilizável')
  return resp.parsed_output
}
