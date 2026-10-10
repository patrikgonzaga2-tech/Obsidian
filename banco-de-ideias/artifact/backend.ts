// Backend da versão que roda dentro do Claude (artifact).
// Atende as mesmas rotas /api/* do app Next.js, mas:
// - ideias e histórico ficam no banco do próprio artifact (capability `db`);
// - busca, organização e conversa usam o Claude da conta de quem abre (capability `sample`),
//   sem chave de API.
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Conexao, ConexaoId, EstadoConexao, Ideia, Mensagem, Pendencia, Perfil, RespostaBusca } from '@/lib/tipos'
import { normalizarPerfil } from '@/lib/perfil'
import { novoId } from '@/lib/tipos'
import { aplicarRegras, normalizarIdeia } from '@/lib/regras'
import { buscarLocal } from '@/lib/busca-local'
import { CATEGORIAS, organizarLocal, type IdeiaOrganizada } from '@/lib/organizar-local'
import { systemDaConversa } from '@/lib/contexto'
import type { Config } from '@/components/Hub'

type Sample = ((input: unknown, opts?: Record<string, unknown>) => Promise<{ text: string; truncated: boolean }>) & {
  json: <T>(input: unknown, opts?: Record<string, unknown>) => Promise<T>
}
interface Db {
  doc(path: string): any
  collection(path: string): any
}

let db: Db | null = null
let sample: Sample | null = null
let iaPermitida = true // vira false se a pessoa recusar o uso do Claude
const ideias = new Map<string, Ideia>()
const ouvintes = new Set<(l: Ideia[]) => void>()
const memoriaHistorico = new Map<string, Mensagem[]>() // quando não há db

const lista = () => [...ideias.values()].sort((a, b) => b.atualizado_em.localeCompare(a.atualizado_em))
const avisarOuvintes = () => ouvintes.forEach((f) => f(lista()))
const resposta = (dados: unknown, status = 200) =>
  new Response(dados === null ? null : JSON.stringify(dados), { status, headers: { 'Content-Type': 'application/json' } })

const MSG_ERRO: Record<string, string> = {
  not_granted: 'O uso do Claude não foi permitido neste painel. Recarregue e clique em Permitir para conversar aqui.',
  sampling_disabled: 'O Claude não está disponível para esta conta.',
  rate_limited: 'Limite de uso atingido. Tente de novo daqui a pouco.',
  refused: 'O Claude não respondeu a este pedido. Tente escrever de outro jeito.',
  session_expired: 'Sua sessão expirou. Entre de novo no Claude.',
}
function erroAmigavel(e: any) {
  if (e?.code === 'not_granted' || e?.code === 'sampling_disabled') iaPermitida = false
  return MSG_ERRO[e?.code] ?? 'Falha ao falar com o Claude. Tente de novo.'
}
const iaDisponivel = () => Boolean(sample) && iaPermitida

// ---------- inicialização ----------
export async function iniciarBackend(): Promise<{
  ideias: Ideia[]
  conexoes: Conexao[]
  config: Config
  perfil: Perfil | null
  erro: string
  assinar: (f: (l: Ideia[]) => void) => () => void
}> {
  const claude = (window as any).claude
  const [d, s] = await Promise.all([
    claude?.use?.('db').catch(() => null) ?? null,
    claude?.use?.('sample').catch(() => null) ?? null,
  ])
  db = d
  sample = s
  let erro = ''
  if (db) {
    // uma assinatura só, mantida enquanto a página estiver aberta
    await new Promise<void>((pronto) => {
      let primeira = true
      db!.collection('ideias').onSnapshot(
        (snap: any) => {
          ideias.clear()
          for (const doc of snap.docs) if (doc.exists) ideias.set(doc.id, normalizar({ ...doc.data(), id: doc.id }))
          avisarOuvintes()
          if (primeira) {
            primeira = false
            pronto()
          }
        },
        (e: any) => {
          erro = `Não consegui ler o banco de ideias (${e?.code ?? 'erro'}).`
          pronto()
        }
      )
    })
  } else {
    erro = 'Banco indisponível nesta visualização: as mudanças não serão salvas.'
  }
  let perfil: Perfil | null = null
  if (db) {
    try {
      const snap = await db.doc('perfil/atual').get()
      if (snap.exists) perfil = normalizarPerfil(snap.data())
    } catch {
      /* sem perfil ainda */
    }
  }
  await carregarEstadosConexao()
  instalarFetch()
  return {
    perfil,
    ideias: lista(),
    conexoes: conexoes(),
    config: { ia: Boolean(sample), transcricaoServidor: false, microfone: false, buscaIAAutomatica: false },
    erro,
    assinar: (f) => {
      ouvintes.add(f)
      return () => ouvintes.delete(f)
    },
  }
}

const normalizar = (d: any): Ideia => normalizarIdeia({ ...d, id: d?.id })

// ---------- roteador /api/* ----------
function instalarFetch() {
  const original = window.fetch.bind(window)
  window.fetch = async (entrada: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof entrada === 'string' ? entrada : entrada instanceof URL ? entrada.href : entrada.url
    const caminho = url.startsWith('/api/') ? url : null
    if (!caminho) return original(entrada, init)
    const metodo = (init?.method || 'GET').toUpperCase()
    let corpo: any = null
    if (typeof init?.body === 'string') {
      try {
        corpo = JSON.parse(init.body)
      } catch {}
    }
    try {
      return await rotear(metodo, caminho.split('?')[0], corpo)
    } catch (e) {
      return resposta({ erro: String((e as any)?.message ?? e) }, 500)
    }
  }
}

async function rotear(metodo: string, caminho: string, corpo: any): Promise<Response> {
  const p = caminho.split('/').filter(Boolean) // ['api', ...]
  const [, rota, id, sub] = p
  if (rota === 'ideias' && !id && metodo === 'GET') return resposta(lista())
  if (rota === 'ideias' && !id && metodo === 'POST') return resposta(await criar(corpo), 201)
  if (rota === 'ideias' && id && sub === 'historico') return resposta(await historico(id))
  if (rota === 'ideias' && id && metodo === 'PATCH') {
    const nova = await atualizar(id, corpo)
    return nova ? resposta(nova) : resposta({ erro: 'Ideia não encontrada' }, 404)
  }
  if (rota === 'ideias' && id && metodo === 'DELETE') return excluir(id)
  if (rota === 'busca') return resposta(await buscar(String(corpo?.q ?? '')))
  if (rota === 'organizar') return organizar(String(corpo?.transcricao ?? ''))
  if (rota === 'chat') return conversar(String(corpo?.ideiaId ?? ''), String(corpo?.mensagem ?? ''))
  if (rota === 'transcrever') return resposta({ erro: 'Sem transcrição de áudio no Claude.', usarNavegador: true }, 501)
  if (rota === 'conexoes' && !id) return resposta(conexoes())
  if (rota === 'conexoes' && id && metodo === 'POST') return resposta(await iniciarConexao(id as ConexaoId))
  if (rota === 'conexoes' && id && metodo === 'PATCH') return resposta(await marcarConexao(id as ConexaoId, corpo))
  if (rota === 'perfil' && metodo === 'GET') {
    const snap = db ? await db.doc('perfil/atual').get() : null
    return resposta(snap?.exists ? normalizarPerfil(snap.data()) : null)
  }
  if (rota === 'perfil' && metodo === 'PUT') {
    const p = normalizarPerfil(corpo)
    if (!p) return resposta({ erro: 'Perfil inválido' }, 400)
    p.atualizado_em = new Date().toISOString()
    if (db) await db.doc('perfil/atual').set(JSON.parse(JSON.stringify(p)))
    return resposta(p)
  }
  if (rota === 'config') return resposta({ ia: Boolean(sample), transcricaoServidor: false })
  return resposta({ erro: 'Rota desconhecida' }, 404)
}

// ---------- ideias ----------
async function gravar(i: Ideia) {
  if (db) await db.collection('ideias').doc(i.id).set(JSON.parse(JSON.stringify(i)))
  ideias.set(i.id, i) // só depois de salvo no banco
}

async function criar(b: any): Promise<Ideia> {
  const agora = new Date().toISOString()
  const v = aplicarRegras({ status: 'em_andamento', prioridade: 'media', ...b })
  const progresso = v.progresso ?? 0
  const i: Ideia = {
    id: novoId('id-'),
    titulo: v.titulo || 'Nova ideia',
    categoria: v.categoria || 'Outro',
    status: v.status ?? 'em_andamento',
    fase: v.fase ?? (b?.fase as Ideia['fase']) ?? 'inicio',
    progresso,
    prioridade: v.prioridade ?? 'media',
    resumo: v.resumo ?? '',
    resumo_detalhado: v.resumo_detalhado ?? '',
    tarefas: v.tarefas ?? [],
    url_produto: v.url_produto ?? null,
    repo: v.repo ?? null,
    origem: ['manual', 'audio', 'github', 'desktop', 'chat'].includes(b?.origem) ? b.origem : 'manual',
    origem_ref: typeof b?.origem_ref === 'string' ? b.origem_ref : null,
    como_usar: v.como_usar ?? '',
    comandos: v.comandos ?? [],
    links: v.links ?? [],
    criado_em: agora,
    atualizado_em: agora,
  }
  await gravar(i)
  avisarOuvintes()
  return i
}

async function atualizar(id: string, b: unknown) {
  const atual = ideias.get(id)
  if (!atual) return null
  const patch = { ...aplicarRegras(b), atualizado_em: new Date().toISOString() }
  if (db) await db.collection('ideias').doc(id).update(JSON.parse(JSON.stringify(patch)))
  const nova = { ...(ideias.get(id) ?? atual), ...patch } // só depois de salvo no banco
  ideias.set(id, nova)
  return nova
}

async function excluir(id: string) {
  ideias.delete(id)
  memoriaHistorico.delete(id)
  if (db) {
    await db.collection('ideias').doc(id).delete()
    await db.collection('historico').doc(id).delete()
  }
  avisarOuvintes()
  return new Response(null, { status: 204 })
}

// ---------- histórico (um documento por ideia, últimas 60 mensagens) ----------
async function historico(id: string): Promise<Mensagem[]> {
  if (!db) return memoriaHistorico.get(id) ?? []
  const snap = await db.collection('historico').doc(id).get()
  return snap.exists ? ((snap.data()?.mensagens as Mensagem[]) ?? []) : []
}
async function anexarHistorico(id: string, novas: Mensagem[]) {
  const todas = [...(await historico(id)), ...novas].slice(-60)
  if (db) await db.collection('historico').doc(id).set({ mensagens: todas })
  else memoriaHistorico.set(id, todas)
}

// ---------- busca ----------
async function buscar(q: string): Promise<RespostaBusca> {
  const visiveis = lista().filter((i) => i.status !== 'arquivado')
  const local = buscarLocal(q, visiveis)
  if (!q.trim() || !iaDisponivel()) return local
  const catalogo = visiveis.map((i) => ({
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
  try {
    const r = await sample!.json<{ intencao?: unknown; resultados?: unknown }>(
      'Você é o buscador do "Banco de Ideias". Recebe um pedido em português e o catálogo de ideias (JSON).\n' +
        'Entenda a intenção (ex.: "quero terminar hoje" = priorizar ideias em andamento mais perto do fim; "usar" = ideias no ar) ' +
        'e o assunto (ex.: "edição de vídeo" casa com vídeo, montagem, criativos).\n' +
        'Responda só com JSON: {"intencao": "frase curta", "resultados": [{"id": "id exato do catálogo", "motivo": "1 frase, cite o próximo passo quando ajudar"}]}. ' +
        'Inclua só ideias que combinam, da mais para a menos relevante; lista vazia se nada combinar.\n\n' +
        `Pedido: ${q}\n\nCatálogo:\n${JSON.stringify(catalogo)}`,
      { modelTier: 'quick' }
    )
    const validos = new Set(visiveis.map((i) => i.id))
    const resultados = (Array.isArray(r?.resultados) ? r.resultados : [])
      .map((x: any) => ({ id: String(x?.id ?? ''), motivo: String(x?.motivo ?? '') }))
      .filter((x) => validos.has(x.id))
    return { modo: 'ia', intencao: String(r?.intencao ?? ''), resultados }
  } catch (e) {
    erroAmigavel(e)
    return local
  }
}

// ---------- organizar ideia ditada ----------
async function organizar(transcricao: string) {
  const texto = transcricao.trim()
  if (texto.length < 5) return resposta({ erro: 'Não entendi a ideia — escreva ou dite de novo.' }, 400)
  let org: IdeiaOrganizada = organizarLocal(texto)
  let modo: 'ia' | 'local' = 'local'
  if (iaDisponivel()) {
    try {
      const r = await sample!.json<any>(
        'Organize esta ideia (ditada, com vícios de fala) em um card de projeto. Português do Brasil, simples e direto.\n' +
          `Categoria: uma de ${JSON.stringify(CATEGORIAS)}. Prioridade "alta" só com urgência ou dinheiro em jogo; "baixa" se for para o futuro; senão "media".\n` +
          'Responda só com JSON: {"titulo": "até 6 palavras", "categoria": "...", "resumo": "ponto atual em 1-2 frases", ' +
          '"resumo_detalhado": "um parágrafo: o que é, para quem, por quê", "prioridade": "alta|media|baixa", ' +
          '"tarefas": ["4 a 7 passos concretos, na ordem, começando por verbo"]}\n\n' +
          `Ideia:\n"""${texto}"""`,
        { modelTier: 'quick', cache: false }
      )
      if (r && typeof r.titulo === 'string' && Array.isArray(r.tarefas) && r.tarefas.length) {
        org = {
          titulo: r.titulo,
          categoria: (CATEGORIAS as readonly string[]).includes(r.categoria) ? r.categoria : org.categoria,
          resumo: String(r.resumo || org.resumo),
          resumo_detalhado: `${String(r.resumo_detalhado || '')}\n\nO que você disse: "${texto}"`.trim(),
          prioridade: ['alta', 'media', 'baixa'].includes(r.prioridade) ? r.prioridade : org.prioridade,
          tarefas: r.tarefas.map(String).filter(Boolean).slice(0, 8),
        }
        modo = 'ia'
      }
    } catch (e) {
      erroAmigavel(e)
    }
  }
  const ideia = await criar({
    titulo: org.titulo,
    categoria: org.categoria,
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 0,
    prioridade: org.prioridade,
    resumo: org.resumo,
    resumo_detalhado: org.resumo_detalhado,
    tarefas: org.tarefas as any,
    origem: 'audio',
  })
  return resposta({ ideia, modo }, 201)
}

// ---------- conversa (stream) ----------
async function conversar(ideiaId: string, mensagem: string) {
  const ideia = ideias.get(ideiaId)
  if (!ideia || !mensagem.trim()) return resposta({ erro: 'Ideia não encontrada' }, 404)
  if (!iaDisponivel()) return resposta({ erro: MSG_ERRO.not_granted, semIA: true }, 503)
  const anteriores = await historico(ideiaId)
  const turnos = [
    { role: 'user', content: systemDaConversa(ideia, anteriores) },
    ...anteriores.slice(-20).map((m) => ({ role: m.papel, content: m.conteudo })),
    { role: 'user', content: mensagem.trim() },
  ]
  const enc = new TextEncoder()
  const corpo = new ReadableStream<Uint8Array>({
    async start(ctl) {
      let texto = ''
      try {
        const r = await sample!(turnos, {
          cache: false,
          onText: ({ delta }: { delta: string }) => {
            texto += delta
            ctl.enqueue(enc.encode(delta))
          },
        })
        texto = r.text
        const agora = new Date().toISOString()
        await anexarHistorico(ideiaId, [
          { id: novoId(), ideia_id: ideiaId, papel: 'user', conteudo: mensagem.trim(), criado_em: agora },
          { id: novoId(), ideia_id: ideiaId, papel: 'assistant', conteudo: texto, criado_em: agora },
        ])
      } catch (e) {
        ctl.enqueue(enc.encode(`${texto ? '\n\n' : ''}⚠️ ${erroAmigavel(e)}`))
      } finally {
        ctl.close()
      }
    },
  })
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

// ---------- conexões (o que vale dentro do Claude) ----------
// O "Resolvido" e as escolhas de cada pendência ficam em conexoes_estado/<id>.
const PAINEL = 'https://claude.ai/artifact/TZyEtoYKaRR9qPUe3NWU4U'
const CODE = 'https://claude.ai/code'
const CONECTORES = 'https://claude.ai/settings/connectors'
const estados = new Map<string, EstadoConexao>()
const estadoDe = (id: string): EstadoConexao => estados.get(id) ?? { resolvidos: [], escolhas: {} }

export async function carregarEstadosConexao() {
  if (!db) return
  for (const id of ['supabase', 'github', 'desktop', 'chats']) {
    try {
      const snap = await db.doc(`conexoes_estado/${id}`).get()
      if (snap.exists) {
        const d = snap.data() ?? {}
        estados.set(id, {
          resolvidos: Array.isArray(d.resolvidos) ? d.resolvidos.map(String) : [],
          escolhas: d.escolhas && typeof d.escolhas === 'object' ? d.escolhas : {},
        })
      }
    } catch {}
  }
}

async function marcarConexao(id: ConexaoId, b: any) {
  const e = estadoDe(id)
  const pend = String(b?.pendencia ?? '')
  const resolvidos = new Set(e.resolvidos)
  if (typeof b?.resolvida === 'boolean' && pend) (b.resolvida ? resolvidos.add(pend) : resolvidos.delete(pend))
  const escolhas = { ...e.escolhas }
  if (pend && typeof b?.escolha === 'string') escolhas[pend] = b.escolha
  if (pend && b?.escolha === null) delete escolhas[pend]
  const novo = { resolvidos: [...resolvidos], escolhas }
  if (db) await db.doc(`conexoes_estado/${id}`).set(novo)
  estados.set(id, novo)
  return conexoes().find((c) => c.id === id)!
}

const COMO_TRABALHAR = `Trabalhe um passo por vez: diga o que vai fazer, faça UMA pergunta ou proponha UMA ação e espere a minha resposta. Responda em português do Brasil, com frases curtas. Se algo depender de mim fora do Claude, diga exatamente onde clicar. Numere as respostas [n] e, na resposta 20, me entregue um "RESUMO PARA NOVA CONVERSA".`

function conexoes(): Conexao[] {
  const agora = new Date().toISOString()
  const temDb = Boolean(db)
  const temIa = iaDisponivel()

  // marca resolvidas as pendências guardadas e aplica as escolhas
  const montar = (id: ConexaoId, lista: Pendencia[]) => {
    const e = estadoDe(id)
    return lista.map((p) => {
      const escolha = p.id ? e.escolhas[p.id] : undefined
      return { ...p, escolha, resolvida: p.resolvida || Boolean(p.id && (e.resolvidos.includes(p.id) || (p.opcoes && escolha))) }
    })
  }
  const status = (ps: Pendencia[], base: boolean) => (!base ? 'desconectado' : ps.every((x) => x.resolvida) ? 'conectado' : 'pendente') as Conexao['status']

  // ----- Supabase
  const escolhaSb = estadoDe('supabase').escolhas['onde-ficam'] // 'claude' | 'separado'
  const sbPend = montar('supabase', [
    { id: 'banco-claude', texto: 'Ideias guardadas no banco do painel, dentro do Claude', resolvida: temDb },
    {
      id: 'onde-ficam',
      texto: 'Onde as ideias vão ficar daqui para frente?',
      ajuda: 'O painel já salva tudo no banco do Claude, de graça. Um projeto Supabase separado serve para a versão fora do Claude e como cópia de segurança; sua organização já tem 2 projetos, então um 3º pode ter custo mensal.',
      opcoes: [
        { valor: 'claude', rotulo: 'Ficar no banco do Claude (grátis)', dica: 'Recomendado agora' },
        { valor: 'separado', rotulo: 'Criar projeto Supabase separado', dica: 'O Claude mostra o custo antes de criar' },
      ],
      resolvida: false,
    },
    ...(escolhaSb === 'separado'
      ? [
          {
            id: 'conector-supabase',
            texto: 'Conector do Supabase ligado no claude.ai',
            ajuda: 'claude.ai → Configurações → Conectores → Supabase precisa aparecer como conectado.',
            link: CONECTORES,
            fora: true,
            resolvida: false,
          },
          {
            id: 'custo-supabase',
            texto: 'Ver no Supabase o plano da organização (vaga ou custo de um 3º projeto)',
            ajuda: 'Supabase → organização "Corpo Feliz Org" → Billing. Se não quiser olhar agora, o Claude confere e te mostra antes de criar.',
            link: 'https://supabase.com/dashboard/org/rveqkmgggberknagjexp/billing',
            fora: true,
            resolvida: false,
          },
          {
            id: 'projeto-criado',
            texto: 'Projeto criado e dados copiados (marque quando o Claude terminar)',
            fora: true,
            depois: true,
            resolvida: false,
          },
        ]
      : []),
  ])
  const supabase: Conexao = {
    id: 'supabase',
    nome: 'Supabase',
    descricao: 'Onde ficam as ideias, o histórico e o Meu trabalho.',
    status: escolhaSb === 'claude' && temDb ? 'conectado' : status(sbPend, temDb),
    detalhe:
      escolhaSb === 'claude'
        ? 'Ideias no banco do Claude (grátis)'
        : escolhaSb === 'separado'
          ? sbPend.every((x) => x.resolvida)
            ? 'Projeto separado criado'
            : 'Projeto separado: falta criar'
          : 'Ideias salvas no Claude · decidir',
    pendencias: sbPend,
    pode_sincronizar: false,
    verificado_em: agora,
    acao: escolhaSb === 'separado' ? 'conversa' : 'nenhuma',
    destino: CODE,
    destino_instrucao: 'Abre o Claude Code: clique em "Novo", escolha o repositório Obsidian e cole o prompt (já copiado).',
    prompt: `Vamos criar o banco separado do Banco de Ideias no Supabase. ${COMO_TRABALHAR}

1. Use o conector do Supabase. Organização: "Corpo Feliz Org". ANTES de criar, me diga se ela tem vaga no plano grátis ou quanto vai custar por mês, e espere eu dizer "pode criar".
2. Crie o projeto "Banco de Ideias" na região sa-east-1 (São Paulo).
3. Aplique o arquivo banco-de-ideias/supabase/schema.sql do repositório Obsidian (branch claude/inspiring-edison-7q8bco).
4. Copie as ideias (coleção "ideias") e o Meu trabalho (documento perfil/atual) do painel ${PAINEL} para as tabelas hub_ideias e hub_perfil, usando a ferramenta ArtifactData.
5. Me diga o que fica pendente para a versão fora do Claude (por exemplo, onde cadastrar as chaves), sem colar nenhuma chave no chat.
Nunca mexa nos projetos "Projeto Corpo Feliz" e "CRM Corpo Feliz".`,
  }

  // ----- GitHub
  const ghPend = montar('github', [
    { id: 'acesso-github', texto: 'Claude Code com acesso aos seus repositórios', ajuda: 'Já funciona: é por ele que este painel foi feito.', resolvida: true },
    {
      id: 'quais-repos',
      texto: 'Dar uma olhada nos seus repositórios e pensar quais entram',
      ajuda: 'São 10. Arquivados e cópias (forks) podem ficar de fora. O Claude vai listar e perguntar antes de criar qualquer ideia.',
      link: 'https://github.com/patrikgonzaga2-tech?tab=repositories',
      fora: true,
      resolvida: false,
    },
    { id: 'repos-importados', texto: 'Repositórios escolhidos importados (marque quando o Claude terminar)', fora: true, depois: true, resolvida: false },
  ])
  const github: Conexao = {
    id: 'github',
    nome: 'GitHub',
    descricao: 'Repositórios viram ideias, com descrição, passo a passo, comandos e pré-requisitos.',
    status: ghPend.every((x) => x.resolvida) ? 'conectado' : 'pendente',
    detalhe: 'Importação pelo Claude Code',
    pendencias: ghPend,
    pode_sincronizar: false,
    verificado_em: agora,
    acao: 'conversa',
    destino: CODE,
    destino_instrucao: 'Abre o Claude Code: clique em "Novo", escolha o repositório Obsidian e cole o prompt (já copiado).',
    prompt: `Vamos trazer meus repositórios do GitHub para o Banco de Ideias (painel: ${PAINEL}). ${COMO_TRABALHAR}

1. Liste meus repositórios (nome, última atualização, se está arquivado ou é cópia) e me pergunte quais entram. Não crie nada antes da minha resposta.
2. Leia as ideias que já existem no painel (ferramenta ArtifactData, coleção "ideias") e não duplique: compare pelo campo repo.
3. Para cada repositório escolhido, leia o README e o CLAUDE.md e monte a ideia no mesmo formato das que já existem (título, categoria, status, fase, progresso, resumo, passo a passo de uso, comandos, pré-requisitos fora do Claude e o objetivo da conversa). Me mostre antes de gravar.
4. No fim, ligue cada ideia nova a uma das minhas funções no Meu trabalho (documento perfil/atual).`,
  }

  // ----- Desktop
  const caminho = estadoDe('desktop').escolhas['caminho'] // 'github' | 'local'
  const dkPend = montar('desktop', [
    {
      id: 'caminho',
      texto: 'Como trazer as pastas do computador?',
      ajuda: 'Pelo GitHub Desktop é grátis e rápido: as pastas viram repositórios e eu leio pelo GitHub. O Claude no computador lê qualquer arquivo, mas o computador precisa estar ligado.',
      opcoes: [
        { valor: 'github', rotulo: 'Publicar pelo GitHub Desktop', dica: 'Recomendado' },
        { valor: 'local', rotulo: 'Usar o Claude no computador' },
      ],
      resolvida: false,
    },
    ...(caminho === 'github'
      ? [
          {
            id: 'push-pastas',
            texto: 'Publicar as pastas pelo GitHub Desktop',
            ajuda: 'GitHub Desktop → File → Add local repository (escolha a pasta) → Publish repository (deixe "privado" marcado). Pasta que já é repositório: Repository → Push.',
            fora: true,
            resolvida: false,
          },
          { id: 'pastas-importadas', texto: 'Pastas importadas como ideias (marque quando o Claude terminar)', fora: true, depois: true, resolvida: false },
        ]
      : caminho === 'local'
        ? [
            {
              id: 'claude-local',
              texto: 'Abrir o Claude Code no computador, dentro da pasta das notas/projetos',
              ajuda: 'App Claude Desktop → aba Code → escolha a pasta. Ou no terminal, dentro da pasta: claude',
              fora: true,
              resolvida: false,
            },
            { id: 'pastas-importadas', texto: 'Pastas importadas como ideias (marque quando o Claude terminar)', fora: true, depois: true, resolvida: false },
          ]
        : []),
  ])
  const desktop: Conexao = {
    id: 'desktop',
    nome: 'Desktop',
    descricao: 'Pastas e notas que estão só no seu computador.',
    status: !caminho ? 'desconectado' : dkPend.every((x) => x.resolvida) ? 'conectado' : 'pendente',
    detalhe: caminho === 'github' ? 'Pelo GitHub Desktop' : caminho === 'local' ? 'Pelo Claude no computador' : 'Escolher o caminho',
    pendencias: dkPend,
    pode_sincronizar: false,
    verificado_em: agora,
    acao: caminho ? 'conversa' : 'nenhuma',
    destino: caminho === 'local' ? undefined : CODE,
    destino_instrucao:
      caminho === 'local'
        ? 'Cole o prompt (já copiado) no Claude Code aberto no seu computador.'
        : 'Abre o Claude Code: clique em "Novo", escolha o repositório Obsidian e cole o prompt (já copiado).',
    prompt:
      caminho === 'local'
        ? `Estou no Claude Code no meu computador. Vamos trazer meus projetos locais para o Banco de Ideias (painel: ${PAINEL}). ${COMO_TRABALHAR}

1. Liste as pastas desta pasta que parecem projetos (com README, package.json, .md de anotações) e me pergunte quais entram.
2. Para cada uma, monte a ideia no mesmo formato das que já existem no painel (ferramenta ArtifactData, coleção "ideias"): título, resumo, passo a passo de uso, comandos e pré-requisitos. Mostre antes de gravar e não duplique.
3. No fim, ligue cada ideia nova a uma das minhas funções no Meu trabalho (documento perfil/atual).`
        : `Publiquei pastas do meu computador pelo GitHub Desktop. Vamos trazê-las para o Banco de Ideias (painel: ${PAINEL}). ${COMO_TRABALHAR}

1. Liste os repositórios publicados ou atualizados nos últimos dias e me pergunte quais são projetos.
2. Para cada um escolhido, leia o README e monte a ideia no mesmo formato das que já existem (ferramenta ArtifactData, coleção "ideias"). Mostre antes de gravar e não duplique (compare pelo campo repo).
3. Se uma pasta que eu citar não estiver no GitHub, me ensine a publicar pelo GitHub Desktop (File → Add local repository → Publish repository, privado).
4. No fim, ligue cada ideia nova a uma das minhas funções no Meu trabalho (documento perfil/atual).`,
  }

  // ----- Chats (o Claude da sua conta dentro do painel)
  const chPend = montar('chats', [
    {
      id: 'permitir-claude',
      texto: 'Permitir que o painel use o Claude da sua conta',
      ajuda: temIa ? undefined : 'Recarregue o painel e clique em Permitir quando o Claude perguntar.',
      resolvida: temIa,
    },
  ])
  const chats: Conexao = {
    id: 'chats',
    nome: 'Chats no cloud',
    descricao: 'Busca com IA, organização das ideias e a Pergunta rápida usam o Claude da sua conta, sem chave de API.',
    status: temIa ? 'conectado' : 'desconectado',
    detalhe: temIa ? 'Claude da sua conta' : 'Claude não liberado',
    pendencias: chPend,
    pode_sincronizar: false,
    verificado_em: agora,
    acao: 'teste',
  }

  return [supabase, github, desktop, chats]
}

async function iniciarConexao(id: ConexaoId) {
  const log: string[] = []
  if (id === 'chats' && sample && iaPermitida) {
    log.push('Testando o Claude da sua conta…')
    try {
      await sample('Responda apenas: ok', { modelTier: 'quick', cache: false })
      log.push('✓ Claude respondeu. Busca com IA, organização e Pergunta rápida liberadas.')
    } catch (e) {
      log.push(`✗ ${erroAmigavel(e)}`)
    }
  }
  const c = conexoes().find((x) => x.id === id)!
  return { conexao: c, log }
}
